<?php

declare(strict_types=1);

namespace App\Actions;

abstract class BaseAction
{
    /**
     * Execute the action.
     */
    abstract public function execute(mixed ...$payload): mixed;
}
