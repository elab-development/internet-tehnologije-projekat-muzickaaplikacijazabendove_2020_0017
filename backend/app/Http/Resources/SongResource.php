<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Controllers\SongController;

class SongResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = 'song';

    public function toArray($request)
    {
        
        return[
           'id' => $this->resource->id,
           'title' => $this->resource->title,
           'artist' => $this->resource->artist,
           'genre' => $this->resource->genre,
           'duration' => $this->resource->duration,
           'release_date' => $this->resource->release_date,
           'bend' => $this->resource->bend

        ];


        
    }
}
