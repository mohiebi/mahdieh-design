<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BriefQuestion extends Model
{
    protected $fillable = [
        'label',
        'label_fa',
        'label_de',
        'hint',
        'hint_fa',
        'hint_de',
        'type',
        'placeholder',
        'placeholder_fa',
        'placeholder_de',
        'is_required',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_required' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
