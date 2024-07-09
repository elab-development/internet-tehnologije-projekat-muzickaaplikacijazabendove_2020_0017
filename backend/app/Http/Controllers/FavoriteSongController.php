<?php

namespace App\Http\Controllers;

use App\Models\FavoriteSong;
use App\Http\Requests\StoreFavoriteSongRequest;
use App\Http\Requests\UpdateFavoriteSongRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class FavoriteSongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Preuzimanje prijavljenog korisnika
        $user = Auth::user();

        // Preuzimanje omiljenih pesama za prijavljenog korisnika
        $favoriteSongs= FavoriteSong::with('song')->where('user_id', $user->id)->get();

        // Vraćanje podataka kao JSON odgovor
        return response()->json($favoriteSongs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validacija zahteva
        $request->validate([
            'song_id' => 'required|exists:songs,id', 
        ]);

        // Preuzimanje prijavljenog korisnika
        $user = Auth::user();

        $existingFavorite = FavoriteSong::where('user_id', $user->id)
                                        ->where('song_id', $request->song_id)
                                        ->first();

        if ($existingFavorite) {
            return response()->json([
                'success' => false,
                'message' => 'Song is already in favorites',
            ], 409); // 409 Conflict
        }

        try {
            $favoriteSong = new FavoriteSong();
            $favoriteSong->user_id = $user->id; 
            $favoriteSong->song_id = (int) $request->song_id;

            $favoriteSong->save();

            return response()->json([
                'success' => true,
                'favoriteSong' => $favoriteSong,
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Error storing favorite song: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'There was an error adding the favorite song',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(FavoriteSong $favoriteSong)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FavoriteSong $favoriteSong)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFavoriteSongRequest $request, FavoriteSong $favoriteSong)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        
        $favoriteSong = FavoriteSong::where('user_id', $user->id)
                                    ->where('song_id', $id)
                                    ->first();
    
        
        if (!$favoriteSong) {
            return response()->json(['error' => 'Favorite song not found'], 404);
        }
    
        $favoriteSong->delete();
    
        return response()->json(['success' => true, 'favSongId' => $favoriteSong->id], 200);
    }

}
