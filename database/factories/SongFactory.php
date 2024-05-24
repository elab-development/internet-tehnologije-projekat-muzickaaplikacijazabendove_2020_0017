<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Band;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Song>
 */
class SongFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $minutes = $this->faker->numberBetween(1,10);
        $seconds = $this->faker->numberBetween(0,59);

        return [
            'title' => $this->faker->sentence(3),
            'duration' => sprintf('%02d:%02d', $minutes,$seconds),
            'band_id' => Band::factory(),
        ];
    }
}
