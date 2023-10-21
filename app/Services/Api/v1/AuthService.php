<?php

namespace App\Services\Api\v1;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;

/**
 * Class AuthService.
 */
class AuthService
{
    use HttpResponses;

    public function signup($userInfo)
    {
        $user = User::create([
            'name' => $userInfo->name,
            'email' => $userInfo->email,
            'password' => Hash::make($userInfo->password),
        ]);
        $this->login($userInfo);
        $response = $this->success([
            'user' => $user
        ], 'New admin user created successfully', 201);
        return $response;
    }

    public function login($request)
    {
        if (Auth::guard()->attempt(['email' => $request->email, 'password' => $request->password, 'active' => 1])) {
            $request->session()->regenerate();
            return $this->success([], 'User is authenticated', 200);
        }
        return $this->error([], 'Invalid credentials', 401);
    }


    public function logout($request)
    {
        Auth::guard()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return $this->success([], 'User logged out successfuly', 204);
    }
}
