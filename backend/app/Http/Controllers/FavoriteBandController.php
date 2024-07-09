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
        // Preuzimanje prijavljenog korisnika
        $user = Auth::user();

        // Preuzimanje omiljenih bendova za prijavljenog korisnika
        $favoriteBands = FavoriteBand::with('band')->where('user_id', $user->id)->get();

        // Vraćanje podataka kao JSON odgovor
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
        // Validacija zahteva
        $request->validate([
            'band_id' => 'required|exists:bands,id', // Proverava da li band_id postoji u tabeli bands
        ]);

        // Preuzimanje prijavljenog korisnika
        $user = Auth::user();

        // Provera da li je bend već dodat u omiljene
        $existingFavorite = FavoriteBand::where('user_id', $user->id)
                                        ->where('band_id', $request->band_id)
                                        ->first();

        if ($existingFavorite) {
            return response()->json([
                'success' => false,
                'message' => 'Band is already in favorites',
            ], 409); // 409 Conflict
        }

        try {
            // Kreiranje novog omiljenog benda
            $favoriteBand = new FavoriteBand();
            $favoriteBand->user_id = $user->id; // Postavljanje ID-ja prijavljenog korisnika
            $favoriteBand->band_id = (int) $request->band_id; // Konvertovanje band_id u integer

            // Čuvanje omiljenog benda u bazi podataka
            $favoriteBand->save();

            // Vraćanje uspešnog odgovora kao JSON
            return response()->json([
                'success' => true,
                'favoriteBand' => $favoriteBand,
            ], 201);
        } catch (\Exception $e) {
            // Logovanje greške
            \Log::error('Error storing favorite band: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'There was an error adding the favorite band',
            ], 500); // 500 Internal Server Error
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
        // Preuzimanje prijavljenog korisnika
        $user = Auth::user();
    
        // Pronalaženje omiljenog benda za datog korisnika i sa datim band_id
        $favoriteBand = FavoriteBand::where('user_id', $user->id)
                                    ->where('band_id', $id)
                                    ->first();
    
        // Provera da li je omiljeni bend pronađen
        if (!$favoriteBand) {
            return response()->json(['error' => 'Favorite band not found'], 404);
        }
    
        // Brisanje omiljenog benda iz baze podataka
        $favoriteBand->delete();
    
        // Vraćanje uspešnog odgovora kao JSON
        return response()->json(['success' => true, 'favBandId' => $favoriteBand->id], 200);
    }

}
