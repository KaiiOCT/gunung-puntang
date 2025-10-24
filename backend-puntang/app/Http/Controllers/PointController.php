<?php

namespace App\Http\Controllers;

use App\Models\Point;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PointController extends Controller
{
    public function index()
    {
        $points = Point::all();
        return response()->json([
            'success' => true,
            'data' => $points
        ]);
    }

    public function show($id)
    {
        $point = Point::with('reviews.user')->find($id);
        if (!$point) {
            return response()->json([
                'success' => false,
                'message' => 'Point not found'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $point
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
            'address' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'description' => 'nullable|string',
        ]);

        $imagePath = null;

        if ($request->file('image')) {
            $imagePath = $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('', $imagePath, 'public');
        }

        $point = Point::create([
            'name' => $request->name,
            'lat' => $request->lat,
            'lon' => $request->lon,
            'address' => $request->address,
            'image' => $imagePath ?? null,
            'description' => $request->description,
        ]);

        return response()->json([
            'success' => true,
            'data' => $point
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $point = Point::find($id);
        if (!$point) {
            return response()->json([
                'success' => false,
                'message' => 'Point not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
            'address' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'description' => 'nullable|string',
        ]);

        $imagePath = $point->image;

        if ($request->hasFile('image')) {
            if ($point->image && Storage::disk('public')->exists($point->image)) {
                Storage::disk('public')->delete($point->image);
            }

            $imageName = $request->file('image')->getClientOriginalName();

            $request->file('image')->storeAs('', $imageName, 'public');

            $imagePath = $imageName;
        }

        $point->update([
            'name' => $request->name,
            'lat' => $request->lat,
            'lon' => $request->lon,
            'address' => $request->address,
            'image' => $imagePath,
            'description' => $request->description,
        ]);

        return response()->json([
            'success' => true,
            'data' => $point
        ]);
    }


    public function destroy($id)
    {
        $point = Point::find($id);
        if (!$point) {
            return response()->json([
                'success' => false,
                'message' => 'Point not found'
            ], 404);
        }

        if ($point->image) {
            Storage::disk('public')->delete($point->image);
        }

        $point->delete();

        return response()->json([
            'success' => true,
            'message' => 'Point deleted successfully'
        ]);
    }
}
