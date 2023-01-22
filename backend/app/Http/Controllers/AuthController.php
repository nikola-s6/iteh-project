<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Rules\HasNumbers;
use App\Rules\PasswordMatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'username' => 'required|string|unique:users',
            'email' => 'required|string|email|unique:users',
            'password_check' => 'required|string',
            'password' => ['required', 'string', new HasNumbers, new PasswordMatch],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::create(['name' => $request->name, 'username' => $request->username, 'password' => Hash::make($request->password), 'email' => $request->email]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['registered_user' => $user, 'auth_token' => $token, 'token_type' => 'Bearer'], 200);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('username', 'password'))) {
            return response()->json(["Login_failed" => "Unauthorized"], 401);
        }

        $user = User::where('username', $request['username'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['Message' => $user->username . ', you have successfully logged in!', 'access_token' => $token, 'token_type' => 'Bearer'], 200);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['Message' => 'You have successfully loged out!'], 200);
    }
}
