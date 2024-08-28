<?php

namespace App\Http\Controllers;

use App\Models\Band;
use App\Http\Requests\StoreBandRequest;
use App\Http\Requests\UpdateBandRequest;

class BandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bands = Band::with(['songs', 'comments'])->paginate(10);
        return response()->json($bands);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBandRequest $request)
    {

        // Provera role korisnika
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validated();
        $band = Band::create([
            'name' => $validated['name'],
            'genre' => $validated['genre'],
            'description' => $validated['description'],
        ]);
        return response()->json($band, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $band = Band::with(['songs', 'comments'])->find($id);
        return response()->json($band);
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

        $band = Band::findOrFail($id);
        foreach ($band->songs as $song) {
            $song->favoriteSong()->delete();
            $song->delete();
        }
        foreach ($band->comments as $comment) {
            $comment->delete();
        }
        $band->favoriteBands()->delete();
        $band->delete();
        return response()->json(['success' => true, 'bandId' => $band->id]);
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
    public function edit(Band $band)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBandRequest $request, Band $band)
    {
        //
    }
}
