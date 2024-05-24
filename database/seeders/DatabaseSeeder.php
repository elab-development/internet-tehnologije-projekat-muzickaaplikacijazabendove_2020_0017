<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = $this->call(UserSeeder::class);
        $bands = $this->call(BandSeeder::class);

        $this->call(CommentSeeder::class);

        $this->call(FavoriteBandSeeder::class);
        
        $this->call(BandRatingSeeder::class);

        $this->call(SongSeeder::class);

        $this->call(FavoriteSongSeeder::class);

    }
}
