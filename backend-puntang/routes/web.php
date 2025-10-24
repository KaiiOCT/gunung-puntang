<?php

use App\Http\Controllers\MapController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MapController::class, 'index']);
Route::get('/get_points', [MapController::class, 'getPoints']);
