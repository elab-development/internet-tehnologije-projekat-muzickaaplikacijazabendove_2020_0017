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


        Song::truncate();
        User::truncate();
        Bend::truncate();

       
    
        $user = User::factory()->create();


        $bend1 = Bend::factory()->create();
        
        $user->bend()->attach($bend1);


      
    }
}
