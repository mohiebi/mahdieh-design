<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function login(Request $request): Response
    {
        $redirect = $this->resolveRedirect($request);

        return Inertia::render('auth/login', [
            'redirect' => $redirect,
            'locale' => $this->resolveLocale($redirect),
        ]);
    }

    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            $locale = $this->resolveLocale($this->resolveRedirect($request));
            $message = match ($locale) {
                'fa' => 'ایمیل یا رمز عبور وارد شده صحیح نیست.',
                'de' => 'Diese Zugangsdaten stimmen nicht mit unseren Einträgen überein.',
                default => 'These credentials do not match our records.',
            };

            return back()->withErrors(['email' => $message])->onlyInput('email');
        }

        $request->session()->regenerate();

        return redirect()->intended($request->input('redirect') ?: route('home'));
    }

    public function register(Request $request): Response
    {
        $redirect = $this->resolveRedirect($request);

        return Inertia::render('auth/register', [
            'redirect' => $redirect,
            'locale' => $this->resolveLocale($redirect),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $locale = $this->resolveLocale($this->resolveRedirect($request));

        $messages = match ($locale) {
            'fa' => [
                'name.required' => 'وارد کردن نام الزامی است.',
                'email.required' => 'وارد کردن ایمیل الزامی است.',
                'email.email' => 'لطفاً یک ایمیل معتبر وارد کنید.',
                'email.unique' => 'این ایمیل قبلاً ثبت شده است.',
                'password.required' => 'وارد کردن رمز عبور الزامی است.',
                'password.confirmed' => 'تکرار رمز عبور مطابقت ندارد.',
            ],
            'de' => [
                'name.required' => 'Bitte geben Sie Ihren Namen ein.',
                'email.required' => 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
                'email.email' => 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
                'email.unique' => 'Diese E-Mail-Adresse ist bereits registriert.',
                'password.required' => 'Bitte geben Sie ein Passwort ein.',
                'password.confirmed' => 'Die Passwortbestätigung stimmt nicht überein.',
            ],
            default => [],
        };

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ], $messages);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended($request->input('redirect') ?: route('brief.show'));
    }

    /**
     * Resolve the post-login destination from the query string, falling back
     * to the path Laravel stashed when redirecting a guest away from a
     * protected route (e.g. a direct visit to /brief/fa while logged out).
     */
    private function resolveRedirect(Request $request): string
    {
        $redirect = $request->string('redirect')->toString();

        if ($redirect !== '') {
            return $redirect;
        }

        $intended = $request->session()->get('url.intended');

        return $intended ? (string) parse_url($intended, PHP_URL_PATH) : '';
    }

    private function resolveLocale(string $redirect): string
    {
        if (str_starts_with($redirect, '/brief/fa')) {
            return 'fa';
        }

        if (str_starts_with($redirect, '/brief/de') || str_starts_with($redirect, '/de/')) {
            return 'de';
        }

        return 'en';
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
