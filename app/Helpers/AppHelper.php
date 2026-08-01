<?php

declare(strict_types=1);

namespace App\Helpers;

final class AppHelper
{
    private function __construct()
    {
    }

    public static function normalizeWhitespace(string $value): string
    {
        return preg_replace('/\s+/', ' ', trim($value)) ?? trim($value);
    }
}
