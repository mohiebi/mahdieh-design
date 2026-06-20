<?php
namespace Database\Seeders;

use App\Models\Package;
use App\Models\Service;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        $vi = Service::where('slug', 'visual-identity')->first()?->id;
        $bs = Service::where('slug', 'brand-strategy')->first()?->id;
        $pk = Service::where('slug', 'packaging-design')->first()?->id;
        $ed = Service::where('slug', 'environmental-design')->first()?->id;

        $packages = [
            [
                'data' => [
                    'slug' => 'logo-package',
                    'title' => 'Logo Package',
                    'title_fa' => 'پکیج لوگو',
                    'summary' => 'A complete logo and visual mark system with guidelines.',
                    'summary_fa' => 'سیستم لوگو و نشانه بصری کامل همراه با راهنما.',
                    'deliverables' => [
                        'Sign / Logo Design — 2 final concepts + logo guidelines',
                        'Logotype Design (En/Fa) — 2 final concepts + logo guidelines',
                        'Color Code — 2 final concepts + color guide',
                    ],
                    'deliverables_fa' => [
                        'طراحی ساین / لوگو — ۲ اتود نهایی + راهنمای لوگو',
                        'طراحی لوگوتایپ (فارسی/انگلیسی) — ۲ اتود نهایی + راهنمای لوگو',
                        'کد رنگ — ۲ اتود نهایی + راهنمای رنگ',
                    ],
                    'price_toman' => 47000000,
                    'price_eur' => null,
                    'price_usd' => null,
                    'duration_days' => 14,
                    'payment_terms' => '50% project start · 50% delivery',
                    'payment_terms_fa' => '۵۰٪ شروع پروژه · ۵۰٪ تحویل',
                    'payment_terms_de' => '50 % bei Projektstart · 50 % bei Ablieferung',
                    'is_featured' => false,
                    'is_active' => true,
                    'sort_order' => 0,
                ],
                'services' => array_filter([$vi]),
            ],
            [
                'data' => [
                    'slug' => 'branding-package',
                    'title' => 'Branding Package',
                    'title_fa' => 'پکیج برندینگ',
                    'summary' => 'Full visual identity system without the brand book.',
                    'summary_fa' => 'سیستم هویت بصری کامل بدون برندبوک.',
                    'deliverables' => [
                        'Sign / Logo Design — 2 final concepts + logo guidelines',
                        'Logotype Design (En/Fa) — 2 final concepts + logo guidelines',
                        'Color Code — 2 final concepts + color guide',
                        'Identifier Design — 10 brand pattern slides',
                        'Social Design — Post / Story / Cover guidelines',
                        'Stationery — 7 administrative items & guides',
                    ],
                    'deliverables_fa' => [
                        'طراحی ساین / لوگو — ۲ اتود نهایی + راهنمای لوگو',
                        'طراحی لوگوتایپ (فارسی/انگلیسی) — ۲ اتود نهایی',
                        'کد رنگ — ۲ اتود نهایی + راهنمای رنگ',
                        'طراحی آیدنتیفایر — ۱۰ اسلاید پترن و تصویرگری برند',
                        'طراحی سوشال — راهنمای پست / استوری / کاور',
                        'ست اوراق اداری — ۷ قلم اوراق اداری از قبیل سربرگ و ...',
                    ],
                    'price_toman' => 99000000,
                    'price_eur' => null,
                    'price_usd' => null,
                    'duration_days' => 30,
                    'payment_terms' => '50% project start · 50% delivery',
                    'payment_terms_fa' => '۵۰٪ شروع پروژه · ۵۰٪ تحویل',
                    'payment_terms_de' => '50 % bei Projektstart · 50 % bei Ablieferung',
                    'is_featured' => false,
                    'is_active' => true,
                    'sort_order' => 1,
                ],
                'services' => array_filter([$vi, $bs]),
            ],
            [
                'data' => [
                    'slug' => 'full-branding-package',
                    'title' => 'Full Branding Package',
                    'title_fa' => 'پکیج برندینگ کامل',
                    'summary' => 'The complete brand identity system including a full brand book.',
                    'summary_fa' => 'سیستم هویت برند کامل همراه با برندبوک جامع.',
                    'deliverables' => [
                        'Sign / Logo Design — 2 final concepts + logo guidelines',
                        'Logotype Design (En/Fa) — 2 final concepts + logo guidelines',
                        'Color Code — 2 final concepts + color guide',
                        'Identifier Design — 10 brand pattern slides',
                        'Social Design — Post / Story / Cover guidelines',
                        'Stationery — 7 administrative items & guides',
                        'Brand Book — +80 pages comprehensive brand manual',
                    ],
                    'deliverables_fa' => [
                        'طراحی ساین / لوگو — ۲ اتود نهایی + راهنمای لوگو',
                        'طراحی لوگوتایپ (فارسی/انگلیسی) — ۲ اتود نهایی',
                        'کد رنگ — ۲ اتود نهایی + راهنمای رنگ',
                        'طراحی آیدنتیفایر — ۱۰ اسلاید پترن و تصویرگری برند',
                        'طراحی سوشال — راهنمای پست / استوری / کاور',
                        'ست اوراق اداری — ۷ قلم اوراق اداری',
                        'برندبوک — بیش از ۸۰ صفحه راهنمای جامع برند',
                    ],
                    'price_toman' => null,
                    'price_eur' => null,
                    'price_usd' => null,
                    'duration_days' => 45,
                    'payment_terms' => '50% project start · 50% delivery',
                    'payment_terms_fa' => '۵۰٪ شروع پروژه · ۵۰٪ تحویل',
                    'payment_terms_de' => '50 % bei Projektstart · 50 % bei Ablieferung',
                    'is_featured' => true,
                    'is_active' => true,
                    'sort_order' => 2,
                ],
                'services' => array_filter([$vi, $bs, $pk, $ed]),
            ],
        ];

        foreach ($packages as $item) {
            $pkg = Package::updateOrCreate(['slug' => $item['data']['slug']], $item['data']);
            if (!empty($item['services'])) {
                $pkg->services()->sync($item['services']);
            }
        }
    }
}
