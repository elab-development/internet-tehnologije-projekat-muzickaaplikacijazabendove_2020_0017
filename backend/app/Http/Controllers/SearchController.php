<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Band;
use App\Models\Song;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('query');

        $result = Band::where(function ($queryBuilder) use ($query){
            $queryBuilder->where('name','like','%'.$query.'%')
                         ->orWhere('genre','like','%'.$query.'%');
        })->get();
        
        return response()->json($result);
    }


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
