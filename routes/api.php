<?php

use Illuminate\Support\Facades\Route;

Route::prefix(config('api.version', 'v1'))->group(function (): void {
    require base_path('routes/api/v1.php');
});
