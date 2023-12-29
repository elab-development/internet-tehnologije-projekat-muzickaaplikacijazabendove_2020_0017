<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Song;
use App\Models\Bend;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


       
    
        $user = User::factory()->create();
        $bend1 = Bend::factory()->create();
        $user->bend()->attach($bend1);




        $user2 = User::factory()->create();
        $bend2 = Bend::factory()->create();
        $user2->bend()->attach($bend2);


        $song1 = Song::factory()->create([
            'bend_id'=>$bend1->id,
        ]);

        $song1->user()->attach($user);


      
    }
}
