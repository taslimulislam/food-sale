<?php

declare(strict_types=1);

namespace App\Traits;

trait HasDtoMapping
{
    /**
     * Map an array payload into a typed constructor payload.
     *
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     */
    protected static function mapDtoPayload(array $data): array
    {
        return $data;
    }
}
