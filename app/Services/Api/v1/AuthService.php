<?php

namespace App\Services\Api\v1;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Traits\HttpResponses;
use Carbon\Carbon;
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
        Auth::login($user);
        return $this->success([
            'user' => $user
        ], 'New admin user created successfully', 201);
    }

    public function login($request)
    {
        if (Auth::guard()->attempt($request->only('email', 'password'))) {
            $user = $request->user();
            if ($user->active == 0) {
                return $this->error([], 'Access to this resourse on server is denied', 403);
            } else {
                $user->update(['last_login' => Carbon::now()]);
                $request->session()->regenerate();
                return $this->success(['user' => $user], 'User is authenticated', 200);
            }
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
