<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json([
    'ok' => true,
    'version' => 'v1',
]));

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
