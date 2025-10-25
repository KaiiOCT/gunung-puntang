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

    public function countPoints()
    {
        $count = Point::count();
        return response()->json([
            'success' => true,
            'data' => $count
        ]);
    }

    public function show($id)
    {
        $point = Point::with('reviews')->find($id);
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
            'image.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'description' => 'nullable|string',
        ]);

        $imagePath = null;

        if ($request->file('image')) {
            foreach ($request->file('image') as $image) {
                $imageName = $image->getClientOriginalName();
                $image->storeAs('', $imageName, 'public');
                $imagePath[] = $imageName;
            }
        }

        $point = Point::create([
            'name' => $request->name,
            'lat' => $request->lat,
            'lon' => $request->lon,
            'address' => $request->address,
            'image' => json_encode($imagePath),
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
            'image.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'description' => 'nullable|string',
        ]);

        $oldImages = json_decode($point->image, true) ?? [];
        $newImages = $oldImages; // default: pertahankan gambar lama

        // Jika ada file baru dikirim
        if ($request->hasFile('image')) {
            foreach ($request->file('image') as $index => $file) {
                if ($file) {
                    // Jika ada gambar lama di index ini, hapus
                    if (isset($oldImages[$index]) && Storage::disk('public')->exists($oldImages[$index])) {
                        Storage::disk('public')->delete($oldImages[$index]);
                    }
        
                    // Simpan file baru dengan nama aslinya
                    $imageName = $file->getClientOriginalName();
                    $file->storeAs('', $imageName, 'public');
        
                    // Ganti posisi gambar lama di index tersebut dengan yang baru
                    $newImages[$index] = $imageName;
                }
            }
        }
        

        $point->update([
            'name' => $request->name,
            'lat' => $request->lat,
            'lon' => $request->lon,
            'address' => $request->address,
            'image' => json_encode($newImages),
            'description' => $request->description,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Point updated successfully!',
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
            $images = json_decode($point->image, true);

            if (is_array($images)) {
                foreach ($images as $img) {
                    Storage::disk('public')->delete($img);
                }
            } else {
                Storage::disk('public')->delete($point->image);
            }
        }

        $point->delete();

        return response()->json([
            'success' => true,
            'message' => 'Point deleted successfully'
        ]);
    }
}
