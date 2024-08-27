<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $users = User::all();
       return $users;
    }


    /**
     * Display the specified resource.
     */
    public function show($id) 
    {
        $user = User::find($id);
        if(is_null($user)) {
            return response() -> json(['error' => 'User not found'], 404);
        }
        return response() -> json($user);
    }


}