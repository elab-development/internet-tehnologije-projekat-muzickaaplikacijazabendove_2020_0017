<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Song;
use App\Models\FavoriteSong;

class FavoriteSongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $songs = Song::take(5)->get();

        foreach($users as $user) {
            foreach($songs as $song) {
                FavoriteSong::factory()->create([
                    'user_id' => $user->id,
                    'song_id' => $song->id,
                ]);
                
            }
        }
    }
}
