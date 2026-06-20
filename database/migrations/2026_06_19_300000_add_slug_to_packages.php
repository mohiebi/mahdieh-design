compo<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasColumn('packages', 'slug')) {
            Schema::table('packages', function (Blueprint $table): void {
                $table->string('slug')->nullable()->after('id');
            });
        }

        $map = [
            'Logo Package'         => 'logo-package',
            'Branding Package'     => 'branding-package',
            'Full Branding Package' => 'full-branding-package',
        ];

        foreach ($map as $title => $slug) {
            DB::table('packages')
                ->where('title', $title)
                ->where(static function ($q) {
                    $q->whereNull('slug')->orWhere('slug', '');
                })
                ->update(['slug' => $slug]);
        }

        // Safety net: any still-blank rows get a generated slug so the unique index can be added
        DB::statement("UPDATE packages SET slug = CONCAT('pkg-', id) WHERE slug IS NULL OR slug = ''");

        Schema::table('packages', function (Blueprint $table): void {
            $table->unique('slug');
        });
    }

    public function down(): void
    {
        Schema::table('packages', function (Blueprint $table): void {
            $table->dropUnique('packages_slug_unique');
            $table->dropColumn('slug');
        });
    }
};
