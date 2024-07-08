<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function index()
    {
       $admins = Admin::all();
       return $admins;
    }

    public function show($id) 
    {
        $admin = Admin::find($id);

        if(is_null($admin)) {
            return response() -> json(['error' => 'Admin not found'], 404);
        }

        return response() -> json($admin);
    }

    
}
