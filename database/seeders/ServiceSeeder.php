<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'slug' => 'brand-strategy',
                'number' => '01',
                'title' => 'Brand Strategy',
                'title_fa' => 'استراتژی برند',
                'title_de' => 'Brand Strategy',
                'summary' => 'Strategic foundations for brands that need direction before design.',
                'summary_fa' => 'بنیان‌های استراتژیک برای برندهایی که پیش از طراحی به جهت نیاز دارند.',
                'summary_de' => 'Strategische Grundlagen für Marken, die vor dem Design Richtung brauchen.',
                'description' => [
                    'Brand strategy clarifies what a brand stands for, who it is speaking to, and how it should behave before the visual system begins.',
                    'This work can include positioning, naming, narrative, brand architecture, campaign concepts, and the creative compass that keeps every touchpoint aligned.',
                ],
                'description_fa' => [
                    'استراتژی برند روشن می‌کند برند چه چیزی را نمایندگی می‌کند، با چه کسی حرف می‌زند و پیش از آغاز سیستم بصری چگونه باید رفتار کند.',
                    'این کار می‌تواند شامل جایگاه‌یابی، نام‌گذاری، روایت، معماری برند، کانسپت کمپین و قطب‌نمای خلاقی باشد که همه نقاط تماس را هم‌راستا نگه می‌دارد.',
                ],
                'description_de' => [
                    'Brand Strategy klärt, wofür eine Marke steht, mit wem sie spricht und wie sie sich verhalten soll, bevor das visuelle System beginnt.',
                    'Dazu gehören Positionierung, Naming, Narrative, Markenarchitektur, Kampagnenkonzepte und ein kreativer Kompass für konsistente Touchpoints.',
                ],
                'focus' => ['Positioning', 'Naming', 'Narrative', 'Brand architecture', 'Campaign concept'],
                'focus_fa' => ['جایگاه‌یابی', 'نام‌گذاری', 'روایت', 'معماری برند', 'کانسپت کمپین'],
                'focus_de' => ['Positionierung', 'Naming', 'Narrative', 'Markenarchitektur', 'Kampagnenkonzept'],
                'match_labels' => ['Brand strategy', 'Brand naming', 'Brand design', 'Personal brand', 'Campaign concept'],
                'sort_order' => 0,
                'is_active' => true,
            ],
            [
                'slug' => 'visual-identity',
                'number' => '02',
                'title' => 'Visual Identity',
                'title_fa' => 'هویت بصری',
                'title_de' => 'Visual Identity',
                'summary' => 'Logo, type, color, and visual systems that can scale across real brand use.',
                'summary_fa' => 'لوگو، تایپ، رنگ و سیستم‌های بصری که در استفاده واقعی برند مقیاس‌پذیرند.',
                'summary_de' => 'Logo, Typografie, Farbe und visuelle Systeme für reale Markennutzung.',
                'description' => [
                    'Visual identity turns strategy into a recognizable system. The goal is not only a mark, but a visual language that can move across print, digital, packaging, and spatial moments.',
                    'Each system is designed for consistency and flexibility, with enough structure to support future teams, campaigns, and content.',
                ],
                'description_fa' => [
                    'هویت بصری استراتژی را به سیستمی قابل تشخیص تبدیل می‌کند. هدف فقط یک نشانه نیست، بلکه زبان بصری‌ای است که در چاپ، دیجیتال، بسته‌بندی و فضا حرکت می‌کند.',
                    'هر سیستم برای ثبات و انعطاف طراحی می‌شود، با ساختاری کافی برای پشتیبانی از تیم‌ها، کمپین‌ها و محتوای آینده.',
                ],
                'description_de' => [
                    'Visual Identity verwandelt Strategie in ein wiedererkennbares System - nicht nur ein Zeichen, sondern eine visuelle Sprache für Print, Digital, Packaging und Raum.',
                    'Jedes System ist konsistent und flexibel genug, um Teams, Kampagnen und Inhalte langfristig zu tragen.',
                ],
                'focus' => ['Logo design', 'Visual language', 'Typography', 'Color systems', 'Identity guidelines'],
                'focus_fa' => ['طراحی لوگو', 'زبان بصری', 'تایپوگرافی', 'سیستم رنگ', 'راهنمای هویت'],
                'focus_de' => ['Logo Design', 'Visuelle Sprache', 'Typografie', 'Farbsysteme', 'Identity Guidelines'],
                'match_labels' => ['Visual identity', 'Logo design', 'Logo system', 'Brand design'],
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'packaging-design',
                'number' => '03',
                'title' => 'Packaging Design',
                'title_fa' => 'طراحی بسته‌بندی',
                'title_de' => 'Packaging Design',
                'summary' => 'Packaging systems that make products clear, memorable, and shelf-ready.',
                'summary_fa' => 'سیستم‌های بسته‌بندی که محصول را روشن، ماندگار و آماده قفسه می‌کنند.',
                'summary_de' => 'Verpackungssysteme, die Produkte klar, merkfähig und regalbereit machen.',
                'description' => [
                    'Packaging design translates a brand into product moments people can hold, compare, purchase, and remember.',
                    'The work focuses on shelf clarity, hierarchy, material behavior, product family systems, and the details that make packaging feel both practical and distinctive.',
                ],
                'description_fa' => [
                    'طراحی بسته‌بندی برند را به لحظه‌هایی از محصول تبدیل می‌کند که مردم می‌توانند لمس، مقایسه، خرید و به خاطر بسپارند.',
                    'تمرکز کار بر وضوح در قفسه، سلسله‌مراتب، رفتار متریال، سیستم خانواده محصول و جزئیاتی است که بسته‌بندی را کاربردی و متمایز می‌کند.',
                ],
                'description_de' => [
                    'Packaging Design übersetzt eine Marke in Produktmomente, die Menschen halten, vergleichen, kaufen und erinnern können.',
                    'Der Fokus liegt auf Klarheit im Regal, Hierarchie, Materialverhalten, Produktfamilien und Details, die praktisch und markant wirken.',
                ],
                'focus' => ['Packaging systems', 'Product hierarchy', 'Shelf impact', 'Material direction', 'Product line rules'],
                'focus_fa' => ['سیستم بسته‌بندی', 'سلسله‌مراتب محصول', 'اثرگذاری در قفسه', 'جهت متریال', 'قواعد خط محصول'],
                'focus_de' => ['Packaging Systeme', 'Produkthierarchie', 'Shelf Impact', 'Materialrichtung', 'Produktlinien-Regeln'],
                'match_labels' => ['Packaging design', 'Product line system'],
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'environmental-design',
                'number' => '04',
                'title' => 'Environmental Design',
                'title_fa' => 'طراحی محیطی',
                'title_de' => 'Environmental Design',
                'summary' => 'Spatial graphics and branded environments that carry identity into the physical world.',
                'summary_fa' => 'گرافیک فضایی و محیط‌های برندمحور که هویت را وارد جهان فیزیکی می‌کنند.',
                'summary_de' => 'Räumliche Grafik und Markenräume, die Identität in die physische Welt tragen.',
                'description' => [
                    'Environmental design brings the identity system into physical space, from signage and wall graphics to branded touchpoints that shape how people navigate and feel a place.',
                    'The work connects spatial rhythm, material context, and brand recognition so the environment feels coherent without becoming decorative noise.',
                ],
                'description_fa' => [
                    'طراحی محیطی سیستم هویت را وارد فضا می‌کند؛ از تابلو و گرافیک دیواری تا نقاط تماس برند که مسیر حرکت و حس افراد نسبت به مکان را شکل می‌دهند.',
                    'این کار ریتم فضایی، زمینه متریال و شناخت برند را به هم وصل می‌کند تا محیط منسجم باشد، بدون آنکه به تزئینات اضافه تبدیل شود.',
                ],
                'description_de' => [
                    'Environmental Design bringt das Identitätssystem in den Raum - von Signage und Wandgrafik bis zu Touchpoints, die Orientierung und Gefühl prägen.',
                    'Die Arbeit verbindet räumlichen Rhythmus, Materialkontext und Wiedererkennung, damit der Ort kohärent wirkt, ohne dekorativ zu rauschen.',
                ],
                'focus' => ['Environmental graphics', 'Signage', 'Spatial identity', 'Wayfinding', 'Branded touchpoints'],
                'focus_fa' => ['گرافیک محیطی', 'تابلو و نشانه‌گذاری', 'هویت فضایی', 'مسیریابی', 'نقاط تماس برند'],
                'focus_de' => ['Environmental Graphics', 'Signage', 'Räumliche Identität', 'Wayfinding', 'Brand Touchpoints'],
                'match_labels' => ['Environmental graphics'],
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($services as $data) {
            Service::updateOrCreate(['slug' => $data['slug']], $data);
        }
    }
}
