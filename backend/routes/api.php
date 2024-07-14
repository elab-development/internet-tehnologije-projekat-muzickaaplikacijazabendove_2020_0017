<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SongController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BandController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FavoriteBandController;
use App\Http\Controllers\FavoriteSongController;
use App\Http\Controllers\BandRatingController;
use App\Http\Resources\SongResource;
use App\Models\User;
use App\Http\Controllers\ForgotPasswordController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/bands', [BandController::class, 'index']);
Route::get('/bands/{id}', [BandController::class, 'show']);
Route::get('/songs', [SongController::class, 'index']);
Route::get('/songs/{id}', [SongController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/adminRegister', [AuthController::class, 'adminRegister']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/adminLogout', [AuthController::class, 'adminLogout']);
    Route::post('/comments', [CommentController::class, 'store']);
    
    Route::get('/favoriteBands', [FavoriteBandController::class, 'index']);
    Route::post('/favoriteBands', [FavoriteBandController::class, 'store']);
    Route::delete('favoriteBands/{bandId}', [FavoriteBandController::class, 'destroy']);
    
    Route::get('/favoriteSongs', [FavoriteSongController::class, 'index']);
    Route::post('/favoriteSongs', [FavoriteSongController::class, 'store']);
    Route::delete('favoriteSongs/{songId}', [FavoriteSongController::class, 'destroy']);

    Route::get('/bandRatings', [BandRatingController::class, 'index']);
    Route::post('/bandRatings', [BandRatingController::class, 'store']);

    //Rute za admina
    Route::post('/bands', [BandController::class, 'store']);
    Route::delete('/bands/{id}', [BandController::class, 'destroy']);

    Route::delete('/songs/{id}', [SongController::class, 'destroy']);
});

Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/search', [SearchController::class, 'search']);

Route::post('/login', [AuthController::class, 'login']);

// Ruta za logovanje administratora
Route::post('/adminLogin', [AuthController::class, 'adminLogin']);


//Ovo je ostalo od proslog puta
Route::post('/forgotPassword',[ForgotPasswordController::class, 'sendResetLinkEmail']);

