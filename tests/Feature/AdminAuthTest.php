<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_admin_login_page(): void
    {
        $response = $this->get('/admin/login');

        $response->assertOk();
    }

    public function test_admin_can_login_access_dashboard_and_logout(): void
    {
        $user = User::factory()->create([
            'password' => 'password123',
        ]);

        $loginResponse = $this->post('/admin/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $loginResponse->assertRedirect('/admin/dashboard');
        $this->assertAuthenticatedAs($user);

        $dashboardResponse = $this->get('/admin/dashboard');
        $dashboardResponse->assertOk();

        $logoutResponse = $this->post('/admin/logout');
        $logoutResponse->assertRedirect('/admin/login');
        $this->assertGuest();
    }
}
