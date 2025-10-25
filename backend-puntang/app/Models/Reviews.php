<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    protected $table = 'reviews';
    protected $fillable = [
        'comment',
        'rating',
        'point_id',
        'user_id'
    ];
    public $timestamps = true;

    public function point()
    {
        return $this->belongsTo(Point::class, 'point_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
