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
        Schema::create('user_bend', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user-id')->nullable();
            $table->unsignedBigInteger('bend-id')->nullable();
            $table->timestamps();

            //spoljni kljucevi ka tabelama users i bends
            $table->foreignId('userid');
            $table->foreignId('bendid');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_bend');
    }
};
