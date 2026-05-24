<?php

use App\Http\Controllers\Admin\BriefQuestionController as AdminBriefQuestionController;
use App\Http\Controllers\Admin\BriefSubmissionController as AdminBriefSubmissionController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BriefController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/projects', [PortfolioController::class, 'index'])->name('projects.index');
Route::get('/projects/{project:slug}', [PortfolioController::class, 'show'])->name('projects.show');

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'authenticate'])->name('login.store');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'store'])->name('register.store');
});

Route::post('/logout', [AuthController::class, 'destroy'])->middleware('auth')->name('logout');

Route::middleware('auth')->group(function (): void {
    Route::get('/brief', [BriefController::class, 'show'])->name('brief.show');
    Route::post('/brief', [BriefController::class, 'store'])->name('brief.store');
});

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function (): void {
        Route::get('/', DashboardController::class)->name('dashboard');
        Route::resource('projects', AdminProjectController::class)->except('show');
        Route::resource('brief-questions', AdminBriefQuestionController::class)->except('show');
        Route::get('brief-submissions', [AdminBriefSubmissionController::class, 'index'])->name('brief-submissions.index');
        Route::get('brief-submissions/{briefSubmission}', [AdminBriefSubmissionController::class, 'show'])->name('brief-submissions.show');
        Route::patch('brief-submissions/{briefSubmission}', [AdminBriefSubmissionController::class, 'update'])->name('brief-submissions.update');
    });
