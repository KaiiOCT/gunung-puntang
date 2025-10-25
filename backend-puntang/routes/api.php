<?php

use App\Http\Controllers\PointController;
use App\Http\Controllers\ReviewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('points')->group(function () {
    Route::get('/', [PointController::class, 'index']);
    Route::get('/{id}', [PointController::class, 'show']);
    Route::get('/for-filter', [PointController::class, 'forFilter']);
    Route::post('/store', [PointController::class, 'store']);
    Route::post('/update/{id}', [PointController::class, 'update']);
    Route::delete('/delete/{id}', [PointController::class, 'destroy']);
});

Route::prefix('reviews')->group(function () {
    Route::get('/', [ReviewsController::class, 'allReviews']);   
    Route::get('/{id}', [ReviewsController::class, 'index']);
    Route::post('/store', [ReviewsController::class, 'store']);
    Route::delete('/delete/{id}', [ReviewsController::class, 'destroy']);
});