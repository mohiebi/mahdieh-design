<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('recommendations', function (Blueprint $table): void {
            if (! Schema::hasColumn('recommendations', 'role_de')) {
                $table->string('role_de')->nullable()->after('role');
            }

            if (! Schema::hasColumn('recommendations', 'company_de')) {
                $table->string('company_de')->nullable()->after('company');
            }

            if (! Schema::hasColumn('recommendations', 'quote_de')) {
                $table->text('quote_de')->nullable()->after('quote');
            }
        });
    }

    public function down(): void
    {
        Schema::table('recommendations', function (Blueprint $table): void {
            $columns = collect(['role_de', 'company_de', 'quote_de'])
                ->filter(fn (string $column): bool => Schema::hasColumn('recommendations', $column))
                ->all();

            if ($columns !== []) {
                $table->dropColumn($columns);
            }
        });
    }
};
