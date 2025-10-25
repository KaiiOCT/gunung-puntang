<?php

namespace App\Http\Controllers;

use App\Models\Reviews;
use Illuminate\Http\Request;

class ReviewsController extends Controller
{
    public function index($id)
    {
        $reviews = Reviews::with(['user', 'point'])
            ->where('point_id', $id)
            ->orderBy('rating', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reviews
        ]);
    }

    public function allReviews(Request $request)
    {
        $pointId = $request->input('point_id');

        if ($pointId) {
            $reviews = Reviews::where('point_id', $pointId)->get();
        } else {
            $reviews = Reviews::all();
        }

        return response()->json([
            'success' => true,
            'data' => $reviews
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required|string',
            'rating' => 'required|numeric|min:1|max:5',
            'point_id' => 'required|exists:point,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $review = Reviews::create([
            'comment' => $request->comment,
            'rating' => $request->rating,
            'point_id' => $request->point_id,
            'user_id' => $request->user_id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $review
        ], 201);
    }

    public function destroy($id)
    {
        $review = Reviews::find($id);

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ]);
    }
}
