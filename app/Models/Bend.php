<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bend extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'genre',
        'description',
    ];

    public function user() {
        return $this->belongsToMany(User::class);        
    }

    public function song() {
        return $this->belongsToMany(Song::class);        
    }



}
