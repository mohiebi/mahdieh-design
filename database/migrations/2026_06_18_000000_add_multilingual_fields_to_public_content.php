<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table): void {
            $table->string('title_de')->nullable()->after('title');
            $table->string('category_de')->nullable()->after('category');
            $table->text('description_de')->nullable()->after('description');
            $table->string('location_de')->nullable()->after('location');
            $table->string('credit_de')->nullable()->after('credit');
        });

        Schema::table('project_sections', function (Blueprint $table): void {
            $table->text('body_de')->nullable()->after('body');
        });

        Schema::table('project_services', function (Blueprint $table): void {
            $table->string('label_de')->nullable()->after('label');
        });

        Schema::table('recommendations', function (Blueprint $table): void {
            $table->string('role_de')->nullable()->after('role');
            $table->string('company_de')->nullable()->after('company');
            $table->text('quote_de')->nullable()->after('quote');
        });

        Schema::table('brief_questions', function (Blueprint $table): void {
            $table->string('label_de')->nullable()->after('label_fa');
            $table->text('hint_de')->nullable()->after('hint_fa');
            $table->string('placeholder_de')->nullable()->after('placeholder_fa');
        });
    }

    public function down(): void
    {
        Schema::table('brief_questions', function (Blueprint $table): void {
            $table->dropColumn(['label_de', 'hint_de', 'placeholder_de']);
        });

        Schema::table('recommendations', function (Blueprint $table): void {
            $table->dropColumn(['role_de', 'company_de', 'quote_de']);
        });

        Schema::table('project_services', function (Blueprint $table): void {
            $table->dropColumn(['label_de']);
        });

        Schema::table('project_sections', function (Blueprint $table): void {
            $table->dropColumn(['body_de']);
        });

        Schema::table('projects', function (Blueprint $table): void {
            $table->dropColumn([
                'title_de',
                'category_de',
                'description_de',
                'location_de',
                'credit_de',
            ]);
        });
    }
};
