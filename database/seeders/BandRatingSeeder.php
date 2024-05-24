<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BandRating;
use App\Models\User;
use App\Models\Band;

class BandRatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $bands = Band::take(4)->get();

        foreach($users as $user) {
            foreach($bands as $band) {
                BandRating::factory()->create([
                    'user_id' => $user->id,
                    'band_id' => $band->id,
                ]);
                
            }
        }
    }
}
