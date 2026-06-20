<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->string('title_fa')->nullable();
            $table->string('title_de')->nullable();
            $table->text('summary')->nullable();
            $table->text('summary_fa')->nullable();
            $table->text('summary_de')->nullable();
            $table->json('deliverables')->comment('Array of deliverable strings (en)');
            $table->json('deliverables_fa')->nullable();
            $table->json('deliverables_de')->nullable();
            $table->decimal('price', 15, 0)->nullable()->comment('Price in IRR (Toman)');
            $table->string('currency', 20)->default('Toman');
            $table->unsignedSmallInteger('duration_days')->nullable();
            $table->string('payment_terms')->nullable()->comment('e.g. 50% start · 50% delivery');
            $table->string('payment_terms_fa')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true)->index();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });

        Schema::create('package_service', function (Blueprint $table): void {
            $table->foreignId('package_id')->constrained()->cascadeOnDelete();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->primary(['package_id', 'service_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_service');
        Schema::dropIfExists('packages');
    }
};
