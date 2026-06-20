<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('page_views', function (Blueprint $table): void {
            $table->string('resource_type', 20)->nullable()->after('locale'); // 'project' | 'package'
            $table->string('resource_slug')->nullable()->after('resource_type');
        });
    }

    public function down(): void
    {
        Schema::table('page_views', function (Blueprint $table): void {
            $table->dropColumn(['resource_type', 'resource_slug']);
        });
    }
};
