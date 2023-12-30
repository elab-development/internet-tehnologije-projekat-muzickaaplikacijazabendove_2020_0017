<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SongController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BendController;

use App\Http\Resources\SongResource;

use App\Http\Controllers\API\AuthController;

use App\Models\User;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/users',[UserController::class, 'index']);

Route::get('/users/{id}', [UserController::class, 'show']);



// Route::get('/songs', [SongController::class, 'index']);

// Route::get('/songs/{id}', [songController::class, 'show']);


Route::get('/bends', [BendController::class, 'index']);

Route::get('/bends/{id}', [BendController::class, 'show']);


Route::resource('songs', SongController::class);

Route::post('/register', [AuthController::class, 'register']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::resource('posts', SongController::class)->only(['update','store','destroy']);

});

Route::post('/logout', [AuthController::class, 'logout']);


Route::post('/login', [AuthController::class, 'login']);
