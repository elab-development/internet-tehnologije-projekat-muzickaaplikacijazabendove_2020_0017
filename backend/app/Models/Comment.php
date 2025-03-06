<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'content', 
        'band_id', 
        'user_id'
    ];

    public $timestamps = true; // Obezbeđuje automatsko postavljanje vremenskih oznaka

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function band() {
        return $this->belongsTo(Band::class);
    }
}
