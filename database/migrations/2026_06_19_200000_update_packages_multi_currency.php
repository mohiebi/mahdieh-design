<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('packages', function (Blueprint $table): void {
            $table->dropColumn(['price', 'currency']);
            $table->decimal('price_toman', 15, 0)->nullable()->after('deliverables_de');
            $table->decimal('price_eur', 10, 2)->nullable()->after('price_toman');
            $table->decimal('price_usd', 10, 2)->nullable()->after('price_eur');
            $table->string('payment_terms_de')->nullable()->after('payment_terms_fa');
        });
    }

    public function down(): void
    {
        Schema::table('packages', function (Blueprint $table): void {
            $table->dropColumn(['price_toman', 'price_eur', 'price_usd', 'payment_terms_de']);
            $table->decimal('price', 15, 0)->nullable();
            $table->string('currency', 20)->default('Toman');
        });
    }
};
