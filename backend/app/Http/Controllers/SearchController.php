<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Band;
use App\Models\Song;

class SearchController extends Controller
{

    public function search(Request $request)
    {
        $query = strtolower($request->input('query'));

        $bands = Band::whereRaw('LOWER(name) LIKE ?', ["%$query%"])->get();

        $songs = Song::whereRaw('LOWER(title) LIKE ?', ["%$query%"])
                    ->with(['band' => function($query) {
                        $query->select('id', 'name');
                    }])->get();
        return response()->json([
            'bands' => $bands,
            'songs' => $songs,
        ]);
    }


}
