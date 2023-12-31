<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SongController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BendController;




/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/',function() {
 return view('welcome');

});

Route::get('/users', [UserController::class, 'index']);


Route::get('/songs', [SongController::class, 'index']);

Route::get('/songs/{id}', [songController::class, 'show']);

Route::get('/bends', [BendController::class, 'index']);

Route::get('/bends/{id}', [BendController::class, 'show']);


