<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('number', 4)->default('01');
            $table->string('title');
            $table->string('title_fa')->nullable();
            $table->string('title_de')->nullable();
            $table->text('summary');
            $table->text('summary_fa')->nullable();
            $table->text('summary_de')->nullable();
            $table->json('description')->comment('Array of paragraphs (en)');
            $table->json('description_fa')->nullable();
            $table->json('description_de')->nullable();
            $table->json('focus')->comment('Array of focus tags (en)');
            $table->json('focus_fa')->nullable();
            $table->json('focus_de')->nullable();
            $table->json('match_labels')->comment('Labels for matching related projects');
            $table->string('icon_path', 2048)->nullable();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
