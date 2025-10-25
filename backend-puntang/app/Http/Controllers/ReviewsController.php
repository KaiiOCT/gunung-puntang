<?php

namespace App\Http\Controllers;

use App\Models\Reviews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            $reviews = Reviews::with(['user', 'point'])->where('point_id', $pointId)->orderBy('rating', 'DESC')->get();
        } else {
            $reviews = Reviews::with(['user', 'point'])->orderBy('rating', 'DESC')->get();
        }

        return response()->json([
            'success' => true,
            'data' => $reviews
        ]);
    }

    public function countReviews()
    {
        $count = Reviews::count();
        return response()->json([
            'success' => true,
            'data' => $count
        ]);
    }

    public function avgRating($pointId)
    {
        $avgRating = Reviews::where('point_id', $pointId)->avg('rating');

        return response()->json([
            'success' => true,
            'data' => $avgRating
        ]);
    }

    public function avgAllRatings()
    {
        $averageRating = Reviews::avg('rating') ?? 0;

        return response()->json([
            'success' => true,
            'data' => [
                'average_rating' => round($averageRating ?? 0, 1)
            ]
        ]);
    }

    public function topVisitors()
    {
        // Ambil 3 point dengan total pengunjung terbanyak
        $visitors = Reviews::select('points.name', 'reviews.point_id', DB::raw('COUNT(reviews.comment) as total_visitors'))
            ->join('points', 'reviews.point_id', '=', 'points.id')
            ->groupBy('reviews.point_id', 'points.name')
            ->orderByDesc('total_visitors')
            ->limit(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $visitors
        ]);
    }

    public function ratingTrend()
    {
        $trend = Reviews::selectRaw('MONTHNAME(created_at) as month, ROUND(AVG(rating), 1) as avg_rating')
            ->groupByRaw('MONTH(created_at), MONTHNAME(created_at)')
            ->orderByRaw('MIN(created_at)')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $trend
        ]);
    }

    public function top3Visitors()
    {
        $visitors = Reviews::select('point_id', DB::raw('COUNT(*) as total_visitors'))
            ->groupBy('point_id')
            ->orderByDesc('total_visitors')
            ->limit(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $visitors
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
