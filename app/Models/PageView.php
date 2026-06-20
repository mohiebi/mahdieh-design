<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageView extends Model
{
    public $timestamps = false;

    protected $fillable = ['path', 'locale', 'resource_type', 'resource_slug', 'visited_at'];

    protected $casts = [
        'visited_at' => 'datetime',
    ];
}
