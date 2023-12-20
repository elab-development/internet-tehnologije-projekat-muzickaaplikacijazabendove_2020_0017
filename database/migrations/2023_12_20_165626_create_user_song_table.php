<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_song', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userr_id');
            $table->unsignedBigInteger('bendd_id');
            $table->timestamps();

            //spoljni kljucevi ka tabelama users i songs
            $table->foreignId('userrr_id');
            $table->foreignId('songgg_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_song');
    }
};
