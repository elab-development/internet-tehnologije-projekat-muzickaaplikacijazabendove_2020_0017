<?php

namespace App\Http\Controllers;

use App\Models\FavoriteSong;
use App\Http\Requests\StoreFavoriteSongRequest;
use App\Http\Requests\UpdateFavoriteSongRequest;

class FavoriteSongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreFavoriteSongRequest $request)
    {
        //
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
    public function destroy(FavoriteSong $favoriteSong)
    {
        //
    }
}
