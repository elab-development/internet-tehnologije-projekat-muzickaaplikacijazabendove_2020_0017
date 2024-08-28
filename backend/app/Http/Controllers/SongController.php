<?php

namespace App\Http\Controllers;

use App\Models\Song;
use App\Http\Requests\StoreSongRequest;
use App\Http\Requests\UpdateSongRequest;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $songs = Song::all();
        return $songs;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSongRequest $request)
    {

        // Provera role korisnika
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validated();
        $song = Song::create([
            'title' => $validated['title'],
            'duration' => $validated['duration'],
            'band_id' => $validated['band_id'],
        ]);
        return response()->json(['success' => true, 'song' => $song], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $song = Song::find($id);
        if (is_null($song)) {
            return response()->json(['error' => 'Song not found'], 404);
        }
        return response()->json($song, 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        // Provera role korisnika
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $song = Song::findOrFail($id);
        if (!$song) {
            return response()->json(['success' => false, 'message' => 'Song not found'], 404);
        }
        $song->favoriteSongs()->delete();
        $song->delete();
        return response()->json(['success' => true, 'songId' => $song->id]);
    }

    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Song $song)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSongRequest $request, Song $song)
    {
        //
    }
}
