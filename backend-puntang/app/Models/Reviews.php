<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    protected $table = 'reviews';
    protected $fillable = [
        'name',
        'comment',
        'rating',
        'point_id',
    ];
    public $timestamps = true;

    public function point()
    {
        return $this->belongsTo(Point::class, 'point_id');
    }
}
