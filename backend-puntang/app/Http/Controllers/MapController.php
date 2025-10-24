<?php

namespace App\Http\Controllers;

use App\Models\Point;
use Illuminate\Http\Request;

class MapController extends Controller
{
    public function index()
    {
        return view('map');
    }

    public function getPoints() {
        return response()->json(Point::all());
    }
}
