<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'duration',
        'band_id',
    ];

    public function band() {
        return $this->belongsTo(Band::class);
    }


    public function favoriteSongs() {
        return $this->hasMany(FavoriteSong::class);
    }
}
