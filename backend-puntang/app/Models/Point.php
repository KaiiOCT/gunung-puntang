<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Reviews;

class Point extends Model
{
    protected $table = 'points';
    protected $fillable = [
        'name', 
        'lat', 
        'lon', 
        'address', 
        'image', 
        'description'
    ];
    public $timestamps = false;

    public $casts = [
        'lat' => 'float',
        'long' => 'float',
    ];

    public function reviews()
    {
        return $this->hasMany(Reviews::class, 'point_id');
    }
}
