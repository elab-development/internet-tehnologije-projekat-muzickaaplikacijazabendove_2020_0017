<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Song;
use App\Models\Band;

class SongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bands = Band::all();

        foreach ($bands as $band) {
            Song::factory(10)->create(['band_id' => $band->id]);
        }


    }
}
