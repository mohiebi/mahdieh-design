<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('page_views', function (Blueprint $table): void {
            $table->string('visitor_hash', 64)->nullable()->after('resource_slug');
            $table->unique(['visitor_hash'], 'page_views_visitor_hash_unique');
        });
    }

    public function down(): void
    {
        Schema::table('page_views', function (Blueprint $table): void {
            $table->dropUnique('page_views_visitor_hash_unique');
            $table->dropColumn('visitor_hash');
        });
    }
};
