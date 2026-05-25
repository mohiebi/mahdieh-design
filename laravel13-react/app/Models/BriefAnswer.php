<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BriefAnswer extends Model
{
    protected $fillable = [
        'brief_question_id',
        'question_label',
        'question_hint',
        'question_type',
        'question_required',
        'answer',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'question_required' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function submission(): BelongsTo
    {
        return $this->belongsTo(BriefSubmission::class, 'brief_submission_id');
    }
}
