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
        Schema::table('songs', function (Blueprint $table) {
            $table->string('title');
            $table->string('artist');
            $table->string('genre');
            $table->time('duration');
            $table->year('release_date');
            $table->integer('rate');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('songs', function (Blueprint $table) {
            $table->dropColumn('title');
            $table->dropColumn('genre');
            $table->dropColumn('artist');
            $table->dropColumn('duration');
            $table->dropColumn('release_date');
            $table->dropColumn('rate');
        });
    }
};
