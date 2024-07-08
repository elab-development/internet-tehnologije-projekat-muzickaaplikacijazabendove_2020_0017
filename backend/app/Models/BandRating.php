<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BandRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'band_id',
        'user_id',
        'rating',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function band() {
        return $this->belongsTo(Band::class);
    }
}
