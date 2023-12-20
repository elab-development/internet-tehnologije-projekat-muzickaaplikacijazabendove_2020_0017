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
        return $this->hasMany(User::class);        
    }

    public function song() {
        return $this->hasMany(Song::class);        
    }



}
