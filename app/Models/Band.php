<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Band extends Model
{
    use HasFactory;

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function favoriteBands() {
        return $this->hasMany(FavoriteBand::class);
    }

    public function bandRatings() {
        return $this->hasMany(BandRating::class);
    }

    public function favoriteSongs() {
        return $this->hasMany(FavoriteSong::class);
    }

    public function songs() {
        return $this->hasMany(Song::class);
    }



}
