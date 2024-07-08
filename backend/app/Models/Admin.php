<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{

    use HasApiTokens, Notifiable; 

    protected $fillable = [
        'name',
        'email',
        'password',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

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

}
