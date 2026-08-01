<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\CustomerAuthController;

Route::get('/health', fn () => response()->json([
    'ok' => true,
    'version' => 'v1',
]));

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('customer')->group(function (): void {
    Route::post('/register', [CustomerAuthController::class, 'register']);
    Route::post('/login', [CustomerAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::post('/logout', [CustomerAuthController::class, 'logout']);
        Route::post('/refresh-token', [CustomerAuthController::class, 'refreshToken']);
    });
});
