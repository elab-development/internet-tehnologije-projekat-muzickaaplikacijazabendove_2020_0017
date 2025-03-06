<?php

namespace App\Http\Controllers;

use App\Models\BandRating;
use App\Http\Requests\StoreBandRatingRequest;
use App\Http\Requests\UpdateBandRatingRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class BandRatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $ratings = BandRating::where('user_id', $user->id)->get();
        return response()->json($ratings);
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
        $user = Auth::user();

        $rating = BandRating::updateOrCreate(
            ['band_id' => $request->band_id, 'user_id' => $user->id],
            ['rating' => $request->rating]
        );

        return response()->json($rating);
    }

    /**
     * Display the specified resource.
     */
    public function show(BandRating $bandRating)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BandRating $bandRating)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBandRatingRequest $request, BandRating $bandRating)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BandRating $bandRating)
    {
        //
    }
}
