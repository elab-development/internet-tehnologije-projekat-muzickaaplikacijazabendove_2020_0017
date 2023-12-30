<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use App\Http\Resources\SongResource;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $songs = Song::all();
        return $songs;
    }

    

    /**
     * Display the specified resource.
     */
    public function show(Song $song)
    {
        //
        return new SongResource($song);
    }




    

}
