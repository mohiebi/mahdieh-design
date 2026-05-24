<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('projects')) {
            Schema::create('projects', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('client');
            $table->string('year', 20);
            $table->string('category');
            $table->text('description');
            $table->string('location')->nullable();
            $table->string('credit')->nullable();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->boolean('is_published')->default(true)->index();
            $table->timestamps();
            });
        }

        if (! Schema::hasTable('project_sections')) {
            Schema::create('project_sections', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->text('body');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            });
        }

        if (! Schema::hasTable('project_services')) {
            Schema::create('project_services', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('label');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            });
        }

        if (! Schema::hasTable('project_media')) {
            Schema::create('project_media', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('type', 20);
            $table->string('url', 2048);
            $table->string('alt_text')->nullable();
            $table->boolean('is_cover')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            });
        }

        if (! Schema::hasTable('brief_questions')) {
            Schema::create('brief_questions', function (Blueprint $table): void {
            $table->id();
            $table->string('label');
            $table->text('hint')->nullable();
            $table->string('type', 20);
            $table->string('placeholder')->nullable();
            $table->boolean('is_required')->default(true);
            $table->boolean('is_active')->default(true)->index();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
            });
        }

        if (! Schema::hasTable('brief_submissions')) {
            Schema::create('brief_submissions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('status', 20)->default('new')->index();
            $table->timestamp('submitted_at')->nullable()->index();
            $table->timestamps();
            });
        }

        if (! Schema::hasTable('brief_answers')) {
            Schema::create('brief_answers', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('brief_submission_id')->constrained()->cascadeOnDelete();
            $table->foreignId('brief_question_id')->nullable()->constrained()->nullOnDelete();
            $table->string('question_label');
            $table->text('question_hint')->nullable();
            $table->string('question_type', 20);
            $table->boolean('question_required')->default(true);
            $table->text('answer')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('brief_answers');
        Schema::dropIfExists('brief_submissions');
        Schema::dropIfExists('brief_questions');
        Schema::dropIfExists('project_media');
        Schema::dropIfExists('project_services');
        Schema::dropIfExists('project_sections');
        Schema::dropIfExists('projects');
    }
};
