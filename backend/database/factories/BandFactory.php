<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Band>
 */
class BandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $genre = $this->faker->randomElement(['rock','popular music','pop music','electronic music']);


        return [
            'name' => $this->faker->name(),
            'genre' => $genre,
            'description' => $this->faker->text(100),
        ];
    }
}
