<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'slug', 'number', 'title', 'title_fa', 'title_de',
        'summary', 'summary_fa', 'summary_de',
        'description', 'description_fa', 'description_de',
        'focus', 'focus_fa', 'focus_de',
        'match_labels', 'icon_path', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'description' => 'array',
        'description_fa' => 'array',
        'description_de' => 'array',
        'focus' => 'array',
        'focus_fa' => 'array',
        'focus_de' => 'array',
        'match_labels' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
