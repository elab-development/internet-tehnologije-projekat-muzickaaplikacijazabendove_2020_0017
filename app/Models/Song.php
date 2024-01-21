<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'artist',
        'genre',
        'duration',
        'release_date',
    ];

    public function bend() {
        return $this->belongsTo(Bend::class);        
    }

    public function user() {
        return $this->belongsToMany(User::class);        
    }
}
