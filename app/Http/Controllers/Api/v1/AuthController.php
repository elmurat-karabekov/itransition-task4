<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use App\Services\Api\v1\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
    * @param AuthService $authService
    */
    public function __construct(private AuthService $authService) 
    {}

    public function signup(SignupRequest $request)
    {
        $userInfo = $request->validated();
        $response = $this->authService->signup($userInfo);
        return $response;
    }

    public function login(LoginRequest $request)
    {
        $request->validated();
        $response = $this->authService->signup($request);
        return $response;
    }

    public function logout(Request $request)
    {
        $response = $this->authService->logout($request);
        return $response;
    }
}