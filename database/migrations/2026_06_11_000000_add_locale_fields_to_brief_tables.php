<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('brief_questions', function (Blueprint $table): void {
            $table->string('label_fa')->nullable()->after('label');
            $table->text('hint_fa')->nullable()->after('hint');
            $table->string('placeholder_fa')->nullable()->after('placeholder');
        });

        Schema::table('brief_submissions', function (Blueprint $table): void {
            $table->string('locale', 5)->default('en')->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('brief_questions', function (Blueprint $table): void {
            $table->dropColumn(['label_fa', 'hint_fa', 'placeholder_fa']);
        });

        Schema::table('brief_submissions', function (Blueprint $table): void {
            $table->dropColumn('locale');
        });
    }
};
