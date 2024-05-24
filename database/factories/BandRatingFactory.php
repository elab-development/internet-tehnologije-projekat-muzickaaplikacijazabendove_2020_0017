<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Band;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BandRating>
 */
class BandRatingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'band_id' => Band::factory(),
            'user_id' => User::factory(),
            'rating' => $this->faker->numberBetween(1,5),
        ];
    }
}
