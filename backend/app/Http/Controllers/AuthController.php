<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Admin;

class AuthController extends Controller
{
    
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json(['success' => false], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->CreateToken('auth_token')->plainTextToken;

        return response()->json(['success' => true, 'access_token' => $token, 'token_type'=>'Bearer', ]);
    }

    public function adminLogin(Request $request)
    {
        if (!Auth::guard('admin')->attempt($request->only('email', 'password'))) {
            return response()->json(['success' => false], 401);
        }

        $admin = Auth::guard('admin')->user();
        $token = $admin->createToken('auth_token')->plainTextToken;

        return response()->json(['success' => true, 'access_token' => $token, 'token_type' => 'Bearer']);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['data' => $user,'access_token' => $token, 'token_type' => 'Bearer', ]);

    }

    public function adminRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins', // Pretpostavlja se da postoji 'admins' tabela za administratore
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $admin->createToken('auth_token')->plainTextToken;

        return response()->json(['data' => $admin, 'access_token' => $token, 'token_type' => 'Bearer']);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'You have successfully logged out and token was successfully deleted'
        ];
    }

    // public function adminLogout()
    // {
    //     auth()->user()->tokens()->delete();
    //     return [
    //         'message' => 'You have successfully logged out and token was successfully deleted'
    //     ];
    // }

    public function adminLogout(Request $request)
    {
        auth()->guard('admin')->user()->tokens()->delete();

        return [
            'message' => 'Admin successfully logged out and all tokens were deleted'
        ];
    }




}

