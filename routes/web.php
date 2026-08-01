<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\SidebarController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Auth\AdminNewPasswordController;
use App\Http\Controllers\Auth\AdminPasswordResetLinkController;
use App\Http\Controllers\Auth\AdminAuthenticatedSessionController;

Route::get('/', function () {
    return redirect()->route('admin.dashboard');
});

Route::get('/login', function () {
    return redirect()->route('admin.login');
})->name('login');

Route::prefix('admin')->name('admin.')->group(function (): void {
    Route::middleware('guest')->group(function (): void {
        Route::get('/login', [AdminAuthenticatedSessionController::class, 'create'])->name('login');
        Route::post('/login', [AdminAuthenticatedSessionController::class, 'store'])->name('login.store');

        Route::get('/forgot-password', [AdminPasswordResetLinkController::class, 'create'])->name('password.request');
        Route::post('/forgot-password', [AdminPasswordResetLinkController::class, 'store'])->name('password.email');

        Route::get('/reset-password/{token}', [AdminNewPasswordController::class, 'create'])->name('password.reset');
        Route::post('/reset-password', [AdminNewPasswordController::class, 'store'])->name('password.update');
    });

    Route::middleware('auth')->group(function (): void {
        Route::post('/logout', [AdminAuthenticatedSessionController::class, 'destroy'])->name('logout');

        Route::get('/dashboard', DashboardController::class)->name('dashboard');
        Route::get('/sidebar', SidebarController::class)->name('sidebar');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
    });
});
