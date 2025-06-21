<?php

use App\Http\Controllers\ScoreController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Route is working']);
});

Route::post('/score', [ScoreController::class, 'checkScore']);
Route::get('/statistics', [ScoreController::class, 'scoreReport']);
Route::get('/top-ten', [ScoreController::class, 'topTen']);
