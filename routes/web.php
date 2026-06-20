<?php

use App\Http\Controllers\Admin\BriefQuestionController as AdminBriefQuestionController;
use App\Http\Controllers\Admin\BriefSubmissionController as AdminBriefSubmissionController;
use App\Http\Controllers\Admin\AutoTranslationController as AdminAutoTranslationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PackageController as AdminPackageController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\RecommendationController as AdminRecommendationController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BriefController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/process', [PortfolioController::class, 'process'])->name('process');
Route::get('/services', [PortfolioController::class, 'services'])->name('services.index');
Route::get('/services/fa', [PortfolioController::class, 'servicesFa'])->name('services.index.fa');
Route::get('/services/{service}/fa', [PortfolioController::class, 'serviceFa'])->name('services.show.fa');
Route::get('/services/{service}', [PortfolioController::class, 'service'])->name('services.show');
Route::get('/packages/{slug}', [PortfolioController::class, 'package'])->name('packages.show');
Route::get('/packages/{slug}/fa', [PortfolioController::class, 'packageFa'])->name('packages.show.fa');
Route::get('/projects', [PortfolioController::class, 'index'])->name('projects.index');
Route::get('/projects/{project:slug}', [PortfolioController::class, 'show'])->name('projects.show');

Route::prefix('{locale}')
    ->whereIn('locale', ['de'])
    ->group(function (): void {
        Route::get('/', [PortfolioController::class, 'homeLocalized'])->name('localized.home');
        Route::get('/process', [PortfolioController::class, 'processLocalized'])->name('localized.process');
        Route::get('/services', [PortfolioController::class, 'servicesLocalized'])->name('localized.services.index');
        Route::get('/services/{service}', [PortfolioController::class, 'serviceLocalized'])->name('localized.services.show');
        Route::get('/packages/{slug}', [PortfolioController::class, 'packageShowLocalized'])->name('localized.packages.show');
        Route::get('/projects', [PortfolioController::class, 'indexLocalized'])->name('localized.projects.index');
        Route::get('/projects/{project:slug}', [PortfolioController::class, 'showLocalized'])->name('localized.projects.show');
    });

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'authenticate'])->name('login.store');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'store'])->name('register.store');
});

Route::post('/logout', [AuthController::class, 'destroy'])->middleware('auth')->name('logout');

Route::middleware('auth')->group(function (): void {
    Route::get('/brief', [BriefController::class, 'show'])->name('brief.show');
    Route::get('/brief/fa', [BriefController::class, 'showFa'])->name('brief.show.fa');
    Route::get('/brief/de', [BriefController::class, 'showDe'])->name('brief.show.de');
    Route::get('/de/brief', [BriefController::class, 'showDe'])->name('localized.brief.show.de');
    Route::post('/brief', [BriefController::class, 'store'])->name('brief.store');
    Route::post('/de/brief', [BriefController::class, 'store'])->name('localized.brief.store.de');
    Route::get('/brief/thanks', [BriefController::class, 'thanks'])->name('brief.thanks');
    Route::get('/brief/fa/thanks', [BriefController::class, 'thanksFa'])->name('brief.thanks.fa');
    Route::get('/brief/de/thanks', [BriefController::class, 'thanksDe'])->name('brief.thanks.de');
    Route::get('/de/brief/thanks', [BriefController::class, 'thanksDe'])->name('localized.brief.thanks.de');
});

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function (): void {
        Route::get('/', DashboardController::class)->name('dashboard');
        Route::post('translations/autofill', AdminAutoTranslationController::class)->name('translations.autofill');
        Route::resource('projects', AdminProjectController::class)->except('show');
        Route::resource('brief-questions', AdminBriefQuestionController::class)->except('show');
        Route::get('brief-submissions', [AdminBriefSubmissionController::class, 'index'])->name('brief-submissions.index');
        Route::get('brief-submissions/{briefSubmission}', [AdminBriefSubmissionController::class, 'show'])->name('brief-submissions.show');
        Route::patch('brief-submissions/{briefSubmission}', [AdminBriefSubmissionController::class, 'update'])->name('brief-submissions.update');
        Route::resource('recommendations', AdminRecommendationController::class)->except('show');
        Route::patch('recommendations/{recommendation}/move', [AdminRecommendationController::class, 'move'])->name('recommendations.move');
        Route::resource('services', AdminServiceController::class)->except('show');
        Route::patch('services/{service}/move', [AdminServiceController::class, 'move'])->name('services.move');
        Route::resource('packages', AdminPackageController::class)->except('show');
        Route::patch('packages/{package}/move', [AdminPackageController::class, 'move'])->name('packages.move');
    });
