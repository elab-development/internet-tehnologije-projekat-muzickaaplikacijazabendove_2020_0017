<?php

namespace App\Http\Controllers;

use App\Models\Bend;
use Illuminate\Http\Request;

class BendController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bends = Bend::all();
        return $bends;
    }

    
    

    public function show(Bend $bend)
    {
        $bend = Bend::find($id);
        return $bend;
    }


   

   
}
