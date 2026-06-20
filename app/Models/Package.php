<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Package extends Model
{
    protected $fillable = [
        'slug',
        'title', 'title_fa', 'title_de',
        'summary', 'summary_fa', 'summary_de',
        'deliverables', 'deliverables_fa', 'deliverables_de',
        'price_toman', 'price_eur', 'price_usd',
        'duration_days', 'payment_terms', 'payment_terms_fa', 'payment_terms_de',
        'is_featured', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'deliverables' => 'array',
        'deliverables_fa' => 'array',
        'deliverables_de' => 'array',
        'price_toman' => 'decimal:0',
        'price_eur' => 'decimal:2',
        'price_usd' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'duration_days' => 'integer',
    ];

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
