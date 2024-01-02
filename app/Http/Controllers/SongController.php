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


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'genre' => 'required|string|max:100',
            'duration' => 'required',
            'release_date' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $song = Song::create([
            'title' => $request->title,
            'artist' => $request->artist,
            'genre' => $request->genre,
            'duration' => $request->duration,
            'release_date' => $request->release_date
        ]);

        return response()->json(['Song created successfully.', new SongResource($song)]);

    }

    public function update(Request $request, Song $song)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'genre' => 'required|string|max:100',
            'duration' => 'required',
            'release_date' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $song->title = $request->title;
        $song->artist = $request->artist;
        $song->genre = $request->genre;
        $song->duration = $request->duration;
        $song->release_date = $request->release_date;

        $song->save();

        return response()->json(['Song updated successfully.', new SongResource($song)]);
    }


    public function destroy(Song $song)
    {
        $song->delete();
        return response()->json('Post deleted successfully');
    }






    

}
