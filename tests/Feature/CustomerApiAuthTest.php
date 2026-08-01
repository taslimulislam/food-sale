<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerApiAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_register_and_receive_access_token(): void
    {
        $response = $this->postJson('/api/v1/customer/register', [
            'name' => 'Customer One',
            'email' => 'customer@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertCreated()->assertJsonStructure([
            'message',
            'user' => ['id', 'name', 'email'],
            'token_type',
            'access_token',
        ]);
    }

    public function test_customer_login_fails_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'customer@example.com',
            'password' => 'password123',
        ]);

        $response = $this->postJson('/api/v1/customer/login', [
            'email' => 'customer@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertUnauthorized()->assertJson([
            'message' => 'Invalid credentials.',
        ]);
    }

    public function test_customer_can_refresh_and_logout_token(): void
    {
        User::factory()->create([
            'email' => 'customer@example.com',
            'password' => 'password123',
        ]);

        $loginResponse = $this->postJson('/api/v1/customer/login', [
            'email' => 'customer@example.com',
            'password' => 'password123',
        ]);

        $loginResponse->assertOk();
        $oldToken = $loginResponse->json('access_token');

        $user = User::where('email', 'customer@example.com')->firstOrFail();
        $this->assertSame(1, $user->tokens()->count());

        $refreshResponse = $this->withHeader('Authorization', 'Bearer '.$oldToken)
            ->postJson('/api/v1/customer/refresh-token');

        $refreshResponse->assertOk()->assertJsonStructure([
            'message',
            'token_type',
            'access_token',
        ]);

        $newToken = $refreshResponse->json('access_token');
        $this->assertNotSame($oldToken, $newToken);

        $user->refresh();
        $this->assertSame(1, $user->tokens()->count());

        $this->withHeader('Authorization', 'Bearer '.$newToken)
            ->postJson('/api/v1/customer/logout')
            ->assertOk()
            ->assertJson([
                'message' => 'Customer logged out successfully.',
            ]);

        $user->refresh();
        $this->assertSame(0, $user->tokens()->count());
    }
}
