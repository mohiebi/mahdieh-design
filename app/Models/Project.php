<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'title_de',
        'client',
        'year',
        'category',
        'category_de',
        'description',
        'description_de',
        'location',
        'location_de',
        'credit',
        'credit_de',
        'sort_order',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function scopePopularOrder(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    public function scopeRecentOrder(Builder $query): Builder
    {
        return $query->orderByDesc('created_at')->orderByDesc('id');
    }

    public function sections(): HasMany
    {
        return $this->hasMany(ProjectSection::class)->orderBy('sort_order');
    }

    public function services(): HasMany
    {
        return $this->hasMany(ProjectService::class)->orderBy('sort_order');
    }

    public function media(): HasMany
    {
        return $this->hasMany(ProjectMedia::class)->orderByDesc('is_cover')->orderBy('sort_order');
    }
}
