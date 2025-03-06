<?php

namespace App\Http\Controllers;

use App\Models\FavoriteBand;
use App\Http\Requests\StoreFavoriteBandRequest;
use App\Http\Requests\UpdateFavoriteBandRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class FavoriteBandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $favoriteBands = FavoriteBand::with('band')->where('user_id', $user->id)->get();

        return response()->json($favoriteBands);
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
        $request->validate([
            'band_id' => 'required|exists:bands,id', 
        ]);

        $user = Auth::user();

        $existingFavorite = FavoriteBand::where('user_id', $user->id)
                                        ->where('band_id', $request->band_id)
                                        ->first();

        if ($existingFavorite) {
            return response()->json([
                'success' => false,
                'message' => 'Band is already in favorites',
            ], 409); 
        }

        try {
            $favoriteBand = new FavoriteBand();
            $favoriteBand->user_id = $user->id; 
            $favoriteBand->band_id = (int) $request->band_id; 

            $favoriteBand->save();

            return response()->json([
                'success' => true,
                'favoriteBand' => $favoriteBand,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'There was an error adding the favorite band',
            ], 500); 
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(FavoriteBand $favoriteBand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FavoriteBand $favoriteBand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFavoriteBandRequest $request, FavoriteBand $favoriteBand)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();
    
        $favoriteBand = FavoriteBand::where('user_id', $user->id)
                                    ->where('band_id', $id)
                                    ->first();
    
        if (!$favoriteBand) {
            return response()->json(['error' => 'Favorite band not found'], 404);
        }
    
        $favoriteBand->delete();
    
        return response()->json(['success' => true, 'favBandId' => $favoriteBand->id], 200);
    }

}
