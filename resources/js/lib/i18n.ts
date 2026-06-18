export type Locale = 'en' | 'fa' | 'de';

export const locales: Locale[] = ['en', 'fa', 'de'];
export const publicLocales: Locale[] = ['en', 'de'];

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  fa: 'FA',
  de: 'DE',
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fa: 'فارسی',
  de: 'Deutsch',
};

export const defaultLocale: Locale = 'en';

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (locales as string[]).includes(value);

export const isRtl = (locale: Locale) => locale === 'fa';

const splitPath = (path: string) => {
  const [withoutHash, hash = ''] = path.split('#');
  const [pathname, query = ''] = withoutHash.split('?');

  return {
    pathname: pathname || '/',
    query: query ? `?${query}` : '',
    hash: hash ? `#${hash}` : '',
  };
};

export const stripLocaleFromPath = (path: string) => {
  const { pathname, query, hash } = splitPath(path);
  const legacyBrief = pathname.match(/^\/brief\/(fa|de)(\/thanks)?$/);

  if (legacyBrief) {
    return `/brief${legacyBrief[2] ?? ''}${query}${hash}`;
  }

  const stripped = pathname.replace(/^\/(fa|de)(?=\/|$)/, '') || '/';

  return `${stripped}${query}${hash}`;
};

export const localizedPath = (path: string, locale: Locale) => {
  if (/^(https?:|mailto:|tel:)/.test(path)) {
    return path;
  }

  if (path.startsWith('#')) {
    return locale === 'de' ? `/${locale}/${path}` : `/${path}`;
  }

  const cleanPath = stripLocaleFromPath(path.startsWith('/') ? path : `/${path}`);

  if (locale === 'fa') {
    if (cleanPath === '/brief') {
      return '/brief/fa';
    }

    if (cleanPath === '/brief/thanks') {
      return '/brief/fa/thanks';
    }

    return cleanPath;
  }

  if (locale === 'en') {
    return cleanPath;
  }

  return cleanPath === '/' ? `/${locale}` : `/${locale}${cleanPath}`;
};

export const localeFromPath = (path: string): Locale => {
  const match = splitPath(path).pathname.match(/^\/(fa|de)(?=\/|$)/);

  return isLocale(match?.[1]) ? match[1] : 'en';
};

export const switchLocalePath = (path: string, locale: Locale) =>
  localizedPath(stripLocaleFromPath(path), locale);

export const pageClass = (locale: Locale) =>
  `min-h-screen bg-background text-foreground${locale === 'fa' ? ' lang-fa' : ''}`;

export const pageDir = (locale: Locale) => (isRtl(locale) ? 'rtl' : 'ltr');

export const siteCopy = {
  en: {
    nav: {
      projects: 'Projects',
      about: 'About',
      services: 'Services',
      process: 'Process',
      brief: 'Brief',
      contact: 'Contact',
      startBrief: 'Start a brief',
      signOut: 'Sign out',
      hi: (name: string) => `Hi, ${name}`,
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      homeLabel: 'Mahdieh - Home',
      language: 'Language',
    },
    hero: {
      eyebrow: (year: number) => `Available for select projects · ${year}`,
      headline: 'Mahdieh',
      subhead: 'Designing brands with clarity, character, and cultural depth',
      intro:
        "I'm Mahdieh Baghoolizadeh - a brand strategist and visual identity designer working with international studios and clients across Canada, the UK and the Middle East. I help ambitious teams turn ideas into clear, memorable, and quietly powerful visual systems.",
      name: 'Mahdieh Baghoolizadeh',
      stats: [
        ['8+', 'Years of practice'],
        ['80+', 'Brands shaped'],
        ['3', 'Continents'],
        ['7', 'Studio collaborations'],
      ] as [string, string][],
    },
    work: {
      eyebrow: 'Selected Projects - 2022 / 2026',
      title: 'Case Studies.',
      intro:
        'A curated archive of identities, campaigns and product work. From early concept and naming through to systems and rollout.',
      popular: 'Popular',
      recent: 'Recent',
      projectScope: 'Project scope',
      viewCaseStudy: 'View Case Study',
      moreProjects: 'More projects',
    },
    services: {
      eyebrow: '✦ Services',
      title: 'A practice for ambitious brands.',
      view: 'View service',
      items: [
        {
          n: '01',
          slug: 'brand-strategy',
          t: 'Brand Strategy',
          d: 'Positioning, naming, narrative and verbal identity that gives a brand its compass.',
        },
        {
          n: '02',
          slug: 'visual-identity',
          t: 'Visual Identity',
          d: 'Logos, marks, typography and visual systems built to scale across every touchpoint.',
        },
        {
          n: '03',
          slug: 'packaging-design',
          t: 'Packaging Design',
          d: 'Packaging systems that make products clear, memorable and shelf-ready.',
        },
        {
          n: '04',
          slug: 'environmental-design',
          t: 'Environmental Design',
          d: 'Spatial graphics and branded environments that carry identity into the physical world.',
        },
      ],
    },
    testimonials: {
      eyebrow: '✦ Recommendations',
      title: 'What clients say.',
      readMore: '...(read more)',
      previous: 'Previous recommendation',
      next: 'Next recommendation',
      goTo: (index: number) => `Go to recommendation ${index}`,
    },
    about: {
      eyebrow: '✦ About',
      titleBefore: 'Strategy meets',
      titleAccent: 'aesthetics',
      titleAfter: 'in service of growth.',
      intro:
        'My approach combines strategic thinking, aesthetics and user-centered design - to create identities and digital products that connect with audiences and support real business growth.',
      availability:
        'Open to remote opportunities, freelance projects and international collaborations.',
      experienceTitle: 'Experience',
      educationTitle: 'Education',
      philosophy: '✦ Philosophy',
      quoteBefore: 'Design is the quiet structure',
      quoteAccent: 'behind every brand',
      quoteAfter: 'that lasts.',
      capabilitiesTitle: '✦ Capabilities',
      portraitCaption: '✦ Mahdieh Baghoolizadeh',
      experience: [
        ['2024 - 2026', 'Founder · Brand Strategy', 'Nexa Studio · Turkey, Istanbul'],
        ['2023', 'Brand Designer', 'Milan Studio · Canada, North York, Ontario'],
        ['2023', 'Art Director', 'Wilma Studio · Iran, Tehran'],
        ['2022 - 2023', 'Senior Designer', 'Freelance · International'],
        ['2019 - 2022', 'Head Designer', 'Narvan Agency · Iran, Isfahan'],
      ] as [string, string, string][],
      education: [
        ['2026', 'UI/UX Product Design', 'Zero to Mastery'],
        ['2020 - 2022', 'Master of Handi Crafts', 'Art University of Isfahan'],
        ['2021', 'Brand Design Certification', 'Vand International'],
        ['2014 - 2019', 'Bachelor of Graphic Design', 'Art University of Isfahan'],
      ] as [string, string, string][],
      capabilities: [
        'Brand Strategy',
        'Visual Identity',
        'Art Direction',
        'Editorial Design',
        'Design Systems',
        'Packaging',
        'Creative Leadership',
      ],
    },
    contact: {
      eyebrow: "Let's collaborate",
      line1: 'Have a brand',
      line2: 'worth building?',
      bookCall: 'Book a call',
      reply: 'Avg. reply within 24h',
      elsewhere: 'Elsewhere',
      channels: '04 - Channels',
      ariaExternal: (label: string, handle: string) => `${label}: @${handle} (opens in a new tab)`,
    },
    footer: {
      rights: (year: number) => `© ${year} Mahdieh Baghoolizadeh - All rights reserved`,
      studio: 'Nexa Studio · Create · Be · Inspire',
    },
    process: {
      headTitle: 'Process',
      description:
        'How a project unfolds with Mahdieh Baghoolizadeh - fourteen steps from the first conversation to a finished brand identity.',
      eyebrow: '✦ Process',
      title: 'Fourteen steps to a brand that lasts',
      intro:
        'Every identity we build follows the same disciplined path - from a first conversation about your goals to a fully realized brand system, ready to launch. Here is exactly how that journey unfolds.',
      readyTitle: 'Ready to begin',
      readyText:
        'Every project starts with a conversation. Tell us about your brand and we will take it from there.',
      startBrief: 'Start a brief',
      steps: [
        ['01', 'Phase 01 - Discovery', 'Kickoff meeting', ['Brand introduction and project walkthrough', 'Client explains goals and expectations', 'Initial brand identity diagnosis', 'Needs assessment and prioritization', 'Budget and timeline alignment']],
        ['02', undefined, 'Order registration', ['Contract signed', 'Deposit payment']],
        ['03', undefined, 'Briefing', ['Client completes the visual identity questionnaire to build initial familiarity with the brand']],
        ['04', undefined, 'Brand discovery workshop', ['Two 3-hour sessions with key brand stakeholders', 'Exercises to surface brand self-awareness']],
        ['05', 'Phase 02 - Strategy', 'Brand identity & personality', ['Finalize core values and competitor list', 'Define brand personality', 'Map similarities and differences vs. competitors', 'Define brand touchpoints']],
        ['06', undefined, 'Visual identity kickoff', ['Think-tank sessions translating strategy into design direction', 'Early logo concepts and mood boards', 'Assess expansion possibilities across the system']],
        ['07', undefined, 'Strategy presentation', ['Review summary of workshops and exercises', 'Present the finalized brand identity', 'Summarize the brand strategy']],
        ['08', 'Phase 03 - Design', 'Logo presentation', ['Present the core visual identity concept', 'Preview logo mood boards', 'Show the logo applied across media']],
        ['09', undefined, 'Logo review', ['Revisions and redesign based on feedback from the presentation']],
        ['10', undefined, 'Pattern review', ['Revisions and redesign of supporting patterns based on feedback']],
        ['11', undefined, 'Pattern design', ['Expand the visual language', 'Design supporting patterns and graphic elements']],
        ['12', undefined, 'Visual identity components', ['Complete remaining identity assets per contract', 'Stationery and administrative items', 'Launch page design', 'Environmental graphics']],
        ['13', 'Phase 04 - Delivery', 'Wrap-up session', ['Present and summarize all delivered work']],
        ['14', undefined, 'Final delivery', ['Settle the remaining balance', 'Deliver all contracted assets', 'Hand off the brand book']],
      ] as [string, string | undefined, string, string[]][],
    },
    project: {
      allProjects: '<- All projects',
      client: 'Client',
      year: 'Year',
      category: 'Category',
      location: 'Location',
      credit: 'Credit',
      about: 'About the project',
      services: 'Services',
      media: 'Project media',
      previous: 'Previous project',
      next: 'Next project',
      imageAlt: (title: string, category: string) => `${title} - ${category}`,
      galleryAlt: (title: string, index: number) => `${title} project image ${index}`,
    },
    servicePage: {
      back: '<- Services',
      label: 'Service',
      focus: 'Focus',
      related: 'Related projects',
      title: 'Work with this service.',
      projectCount: (count: number) => `${count} ${count === 1 ? 'project' : 'projects'}`,
      view: 'View',
      empty: 'Related work for this service will be added soon.',
    },
    brief: {
      headTitle: 'Project Brief',
      meta:
        'Tell me about your project. Answer 15 short questions to start a brand or identity collaboration.',
      eyebrow: (total: number) => `The Brief · ${total} questions`,
      titleLine1: 'Tell me about',
      titleAccent: 'your project',
      titleLine2: '',
      intro:
        'A short, considered brief helps us shape ideas into clear, memorable, and quietly powerful visual systems. Take your time - there are no wrong answers.',
      review: 'Review',
      finalCheck: 'Final check',
      reviewTitle: 'Review your answers.',
      reviewSubtitle: 'Make sure everything looks right before sending. You can edit any answer below.',
      noAnswer: 'No answer provided',
      edit: 'Edit',
      question: (step: number) => `Question ${step}`,
      previous: 'Previous',
      nextQuestion: 'Next question',
      reviewAnswers: 'Review answers',
      submitBrief: 'Submit brief',
      submitting: 'Submitting',
      required: 'This question is required.',
      email: 'Please enter a valid email address.',
      comingSoon: 'Brief questions are coming soon.',
      arrows: { prev: '←', next: '→' },
    },
    thanks: {
      headTitle: 'Brief received',
      meta: "Thanks for sharing your project brief. I'll be in touch within 24 hours.",
      eyebrow: 'Brief received',
      line1: 'Thank you.',
      line2Before: "I'll be in touch",
      line2Accent: 'within 24 hours',
      line2After: '.',
      body:
        'Your answers help me understand the shape of the project before we talk. I read every brief personally and will follow up with next steps soon.',
      sooner: 'Want to talk sooner?',
      book: 'Book a meeting',
      fallback:
        'A scheduling link will be available here shortly. In the meantime, feel free to reach out via the contact details below.',
      back: '← Back home',
    },
    auth: {
      loginTitle: 'Login',
      loginEyebrow: 'Client access',
      loginHeading: 'Welcome back',
      registerTitle: 'Start a brief',
      registerEyebrow: 'Project brief',
      registerHeading: 'Start with access',
      email: 'Email',
      password: 'Password',
      remember: 'Remember me',
      logIn: 'Log in',
      loggingIn: 'Logging in...',
      newHere: 'New here?',
      createAccount: 'Create an account',
      name: 'Name',
      confirmPassword: 'Confirm password',
      already: 'Already have access?',
      continue: 'Continue',
      invalid: 'These credentials do not match our records.',
    },
  },
  fa: {
    nav: {
      projects: 'نمونه‌کارها',
      about: 'درباره',
      services: 'خدمات',
      process: 'فرآیند',
      brief: 'بریف',
      contact: 'تماس',
      startBrief: 'شروع بریف',
      signOut: 'خروج',
      hi: (name: string) => `سلام، ${name}`,
      openMenu: 'باز کردن منو',
      closeMenu: 'بستن منو',
      homeLabel: 'مهدیه - صفحه اصلی',
      language: 'زبان',
    },
    hero: {
      eyebrow: (year: number) => `پذیرای پروژه‌های منتخب · ${year}`,
      headline: 'مهدیه',
      subhead: 'طراحی برندهایی با وضوح، شخصیت و عمق فرهنگی',
      intro:
        'من مهدیه باغولی‌زاده هستم؛ استراتژیست برند و طراح هویت بصری که با استودیوها و مشتریان بین‌المللی در کانادا، بریتانیا و خاورمیانه همکاری می‌کنم. به تیم‌های جاه‌طلب کمک می‌کنم ایده‌ها را به سیستم‌های بصری شفاف، ماندگار و آرام قدرتمند تبدیل کنند.',
      name: 'مهدیه باغولی‌زاده',
      stats: [
        ['+۸', 'سال تجربه'],
        ['+۸۰', 'برند شکل‌گرفته'],
        ['۳', 'قاره'],
        ['۷', 'همکاری استودیویی'],
      ] as [string, string][],
    },
    work: {
      eyebrow: 'پروژه‌های منتخب - ۲۰۲۲ / ۲۰۲۶',
      title: 'مطالعه‌های موردی.',
      intro:
        'آرشیوی گزیده از هویت‌ها، کمپین‌ها و کارهای محصول؛ از ایده اولیه و نام‌گذاری تا سیستم‌سازی و اجرا.',
      popular: 'محبوب',
      recent: 'جدیدترین',
      projectScope: 'فیلتر پروژه',
      viewCaseStudy: 'دیدن مطالعه موردی',
      moreProjects: 'پروژه‌های بیشتر',
    },
    services: {
      eyebrow: '✦ خدمات',
      title: 'تمرینی برای برندهای جاه‌طلب.',
      view: 'دیدن خدمت',
      items: [
        { n: '01', slug: 'brand-strategy', t: 'استراتژی برند', d: 'جایگاه‌یابی، نام‌گذاری، روایت و هویت کلامی که به برند جهت می‌دهد.' },
        { n: '02', slug: 'visual-identity', t: 'هویت بصری', d: 'لوگو، نشانه، تایپوگرافی و سیستم‌های بصری که در همه نقاط تماس مقیاس‌پذیرند.' },
        { n: '03', slug: 'packaging-design', t: 'طراحی بسته‌بندی', d: 'سیستم‌های بسته‌بندی که محصول را روشن، ماندگار و آماده قفسه می‌کنند.' },
        { n: '04', slug: 'environmental-design', t: 'طراحی محیطی', d: 'گرافیک فضایی و محیط‌های برندمحور که هویت را وارد جهان فیزیکی می‌کنند.' },
      ],
    },
    testimonials: {
      eyebrow: '✦ توصیه‌ها',
      title: 'مشتری‌ها چه می‌گویند.',
      readMore: '...(بیشتر بخوانید)',
      previous: 'توصیه قبلی',
      next: 'توصیه بعدی',
      goTo: (index: number) => `رفتن به توصیه ${index}`,
    },
    about: {
      eyebrow: '✦ درباره',
      titleBefore: 'استراتژی با',
      titleAccent: 'زیبایی‌شناسی',
      titleAfter: 'در خدمت رشد همراه می‌شود.',
      intro:
        'رویکرد من تفکر استراتژیک، زیبایی‌شناسی و طراحی کاربرمحور را ترکیب می‌کند تا هویت‌ها و محصولات دیجیتال با مخاطب ارتباط بگیرند و از رشد واقعی کسب‌وکار پشتیبانی کنند.',
      availability: 'آماده همکاری ریموت، پروژه‌های فریلنس و همکاری‌های بین‌المللی.',
      experienceTitle: 'تجربه',
      educationTitle: 'تحصیلات',
      philosophy: '✦ فلسفه',
      quoteBefore: 'طراحی، ساختار آرامی است',
      quoteAccent: 'پشت هر برندی',
      quoteAfter: 'که ماندگار می‌شود.',
      capabilitiesTitle: '✦ توانایی‌ها',
      portraitCaption: '✦ مهدیه باغولی‌زاده',
      experience: [
        ['۲۰۲۴ - ۲۰۲۶', 'بنیان‌گذار · استراتژی برند', 'نکسا استودیو · ترکیه، استانبول'],
        ['۲۰۲۳', 'طراح برند', 'میلان استودیو · کانادا، نورث‌یورک، انتاریو'],
        ['۲۰۲۳', 'آرت دایرکتور', 'ویلما استودیو · ایران، تهران'],
        ['۲۰۲۲ - ۲۰۲۳', 'طراح ارشد', 'فریلنس · بین‌المللی'],
        ['۲۰۱۹ - ۲۰۲۲', 'طراح ارشد', 'آژانس نارون · ایران، اصفهان'],
      ] as [string, string, string][],
      education: [
        ['۲۰۲۶', 'طراحی محصول UI/UX', 'Zero to Mastery'],
        ['۲۰۲۰ - ۲۰۲۲', 'کارشناسی ارشد صنایع دستی', 'دانشگاه هنر اصفهان'],
        ['۲۰۲۱', 'گواهی طراحی برند', 'وند اینترنشنال'],
        ['۲۰۱۴ - ۲۰۱۹', 'کارشناسی طراحی گرافیک', 'دانشگاه هنر اصفهان'],
      ] as [string, string, string][],
      capabilities: ['استراتژی برند', 'هویت بصری', 'آرت دایرکشن', 'طراحی ادیتوریال', 'سیستم طراحی', 'بسته‌بندی', 'رهبری خلاق'],
    },
    contact: {
      eyebrow: 'بیایید همکاری کنیم',
      line1: 'برندی دارید',
      line2: 'که ارزش ساختن دارد؟',
      bookCall: 'رزرو تماس',
      reply: 'میانگین پاسخ‌گویی در ۲۴ ساعت',
      elsewhere: 'جاهای دیگر',
      channels: '۰۴ - کانال‌ها',
      ariaExternal: (label: string, handle: string) => `${label}: @${handle} (در برگه جدید باز می‌شود)`,
    },
    footer: {
      rights: (year: number) => `© ${year} مهدیه باغولی‌زاده - تمامی حقوق محفوظ است`,
      studio: 'نکسا استودیو · خلق · باش · الهام بگیر',
    },
    process: {
      headTitle: 'فرآیند',
      description: 'مسیر شکل‌گیری پروژه با مهدیه باغولی‌زاده؛ چهارده قدم از گفت‌وگوی اول تا هویت برند نهایی.',
      eyebrow: '✦ فرآیند',
      title: 'چهارده قدم تا برندی ماندگار',
      intro:
        'هر هویتی که می‌سازیم از مسیری منظم عبور می‌کند؛ از نخستین گفت‌وگو درباره اهداف شما تا یک سیستم برند کامل و آماده اجرا. این مسیر دقیقاً این‌گونه پیش می‌رود.',
      readyTitle: 'آماده شروع هستید',
      readyText: 'هر پروژه با یک گفت‌وگو شروع می‌شود. درباره برندتان بگویید و ادامه مسیر با ما.',
      startBrief: 'شروع بریف',
      steps: [
        ['01', 'فاز ۰۱ - کشف', 'جلسه آغاز پروژه', ['معرفی برند و مرور پروژه', 'توضیح اهداف و انتظارات مشتری', 'ارزیابی اولیه هویت برند', 'نیازسنجی و اولویت‌بندی', 'هم‌راستاسازی بودجه و زمان‌بندی']],
        ['02', undefined, 'ثبت سفارش', ['امضای قرارداد', 'پرداخت پیش‌پرداخت']],
        ['03', undefined, 'بریفینگ', ['تکمیل پرسشنامه هویت بصری برای آشنایی اولیه با برند']],
        ['04', undefined, 'کارگاه کشف برند', ['دو جلسه سه‌ساعته با ذی‌نفعان کلیدی برند', 'تمرین‌هایی برای روشن شدن خودآگاهی برند']],
        ['05', 'فاز ۰۲ - استراتژی', 'هویت و شخصیت برند', ['نهایی‌سازی ارزش‌های اصلی و فهرست رقبا', 'تعریف شخصیت برند', 'نقشه‌برداری شباهت‌ها و تفاوت‌ها با رقبا', 'تعریف نقاط تماس برند']],
        ['06', undefined, 'شروع هویت بصری', ['جلسه‌های فکر برای تبدیل استراتژی به جهت طراحی', 'کانسپت‌های اولیه لوگو و مودبوردها', 'بررسی امکان توسعه در سراسر سیستم']],
        ['07', undefined, 'ارائه استراتژی', ['مرور خلاصه کارگاه‌ها و تمرین‌ها', 'ارائه هویت نهایی برند', 'جمع‌بندی استراتژی برند']],
        ['08', 'فاز ۰۳ - طراحی', 'ارائه لوگو', ['ارائه کانسپت اصلی هویت بصری', 'نمایش مودبوردهای لوگو', 'نمایش کاربرد لوگو در رسانه‌ها']],
        ['09', undefined, 'بازبینی لوگو', ['اصلاح و بازطراحی بر اساس بازخورد ارائه']],
        ['10', undefined, 'بازبینی پترن', ['اصلاح و بازطراحی پترن‌های پشتیبان بر اساس بازخورد']],
        ['11', undefined, 'طراحی پترن', ['گسترش زبان بصری', 'طراحی پترن‌ها و عناصر گرافیکی پشتیبان']],
        ['12', undefined, 'اجزای هویت بصری', ['تکمیل دارایی‌های هویتی طبق قرارداد', 'اقلام اداری و ست اوراق', 'طراحی صفحه لانچ', 'گرافیک محیطی']],
        ['13', 'فاز ۰۴ - تحویل', 'جلسه جمع‌بندی', ['ارائه و جمع‌بندی تمام کارهای تحویل‌شده']],
        ['14', undefined, 'تحویل نهایی', ['تسویه مانده قرارداد', 'تحویل تمام دارایی‌های قراردادی', 'تحویل برندبوک']],
      ] as [string, string | undefined, string, string[]][],
    },
    project: {
      allProjects: 'بازگشت به همه پروژه‌ها',
      client: 'مشتری',
      year: 'سال',
      category: 'دسته',
      location: 'موقعیت',
      credit: 'اعتبار',
      about: 'درباره پروژه',
      services: 'خدمات',
      media: 'رسانه‌های پروژه',
      previous: 'پروژه قبلی',
      next: 'پروژه بعدی',
      imageAlt: (title: string, category: string) => `${title} - ${category}`,
      galleryAlt: (title: string, index: number) => `${title} تصویر پروژه ${index}`,
    },
    servicePage: {
      back: 'بازگشت به خدمات',
      label: 'خدمت',
      focus: 'تمرکز',
      related: 'پروژه‌های مرتبط',
      title: 'کارهای مرتبط با این خدمت.',
      projectCount: (count: number) => `${count} پروژه`,
      view: 'دیدن',
      empty: 'کار مرتبط با این خدمت به‌زودی اضافه می‌شود.',
    },
    brief: {
      headTitle: 'بریف پروژه',
      meta: 'درباره پروژه‌تان به ما بگویید. برای شروع همکاری برندینگ به ۱۵ سوال کوتاه پاسخ دهید.',
      eyebrow: (total: number) => `بریف · ${total} سوال`,
      titleLine1: 'بیایید درباره‌ی',
      titleAccent: 'پروژه‌ی شما',
      titleLine2: 'صحبت کنیم.',
      intro:
        'یک بریف کوتاه و دقیق به ما کمک می‌کند ایده‌ها را به سیستم‌های بصری شفاف، به‌یادماندنی و قدرتمند تبدیل کنیم. وقت بگذارید - پاسخ اشتباهی وجود ندارد.',
      review: 'بازبینی',
      finalCheck: 'بررسی نهایی',
      reviewTitle: 'پاسخ‌های خود را بازبینی کنید.',
      reviewSubtitle: 'قبل از ارسال، از درستی همه‌ی موارد مطمئن شوید. می‌توانید هر پاسخ را ویرایش کنید.',
      noAnswer: 'پاسخی ثبت نشده',
      edit: 'ویرایش',
      question: (step: number) => `سوال ${step}`,
      previous: 'قبلی',
      nextQuestion: 'سوال بعدی',
      reviewAnswers: 'بازبینی پاسخ‌ها',
      submitBrief: 'ارسال بریف',
      submitting: 'در حال ارسال',
      required: 'پاسخ به این سوال الزامی است.',
      email: 'لطفاً یک ایمیل معتبر وارد کنید.',
      comingSoon: 'سوالات بریف به‌زودی اضافه می‌شوند.',
      arrows: { prev: '→', next: '←' },
    },
    thanks: {
      headTitle: 'بریف دریافت شد',
      meta: 'از بریف شما متشکریم. ظرف ۲۴ ساعت آینده با شما تماس خواهیم گرفت.',
      eyebrow: 'بریف دریافت شد',
      line1: 'متشکریم.',
      line2Before: 'ظرف',
      line2Accent: '۲۴ ساعت',
      line2After: 'با شما تماس می‌گیریم.',
      body:
        'پاسخ‌های شما به ما کمک می‌کند پیش از گفت‌وگو، شکل کلی پروژه را درک کنیم. هر بریف را شخصاً می‌خوانیم و به‌زودی برای مراحل بعدی با شما در تماس خواهیم بود.',
      sooner: 'می‌خواهید زودتر صحبت کنیم؟',
      book: 'رزرو جلسه',
      fallback: 'لینک رزرو وقت به‌زودی در دسترس قرار می‌گیرد. در این فاصله می‌توانید از طریق اطلاعات تماس زیر با ما در ارتباط باشید.',
      back: 'بازگشت به صفحه اصلی',
    },
    auth: {
      loginTitle: 'ورود',
      loginEyebrow: 'دسترسی مشتری',
      loginHeading: 'خوش آمدید',
      registerTitle: 'ساخت حساب کاربری',
      registerEyebrow: 'بریف پروژه',
      registerHeading: 'شروع با دسترسی',
      email: 'ایمیل',
      password: 'رمز عبور',
      remember: 'مرا به خاطر بسپار',
      logIn: 'ورود',
      loggingIn: 'در حال ورود...',
      newHere: 'تازه وارد هستید؟',
      createAccount: 'ساخت حساب کاربری',
      name: 'نام',
      confirmPassword: 'تکرار رمز عبور',
      already: 'قبلاً حساب دارید؟',
      continue: 'ادامه',
      invalid: 'ایمیل یا رمز عبور وارد شده صحیح نیست.',
    },
  },
  de: {
    nav: {
      projects: 'Projekte',
      about: 'Über mich',
      services: 'Leistungen',
      process: 'Prozess',
      brief: 'Briefing',
      contact: 'Kontakt',
      startBrief: 'Briefing starten',
      signOut: 'Abmelden',
      hi: (name: string) => `Hallo, ${name}`,
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
      homeLabel: 'Mahdieh - Startseite',
      language: 'Sprache',
    },
    hero: {
      eyebrow: (year: number) => `Verfügbar für ausgewählte Projekte · ${year}`,
      headline: 'Mahdieh',
      subhead: 'Brand Design mit Klarheit, Charakter und kultureller Tiefe',
      intro:
        'Ich bin Mahdieh Baghoolizadeh - Brand Strategist und Visual Identity Designerin. Ich arbeite mit internationalen Studios und Kund:innen in Kanada, Großbritannien und dem Nahen Osten und helfe ambitionierten Teams, Ideen in klare, einprägsame und leise kraftvolle visuelle Systeme zu verwandeln.',
      name: 'Mahdieh Baghoolizadeh',
      stats: [
        ['8+', 'Jahre Praxis'],
        ['80+', 'Geformte Marken'],
        ['3', 'Kontinente'],
        ['7', 'Studio-Kollaborationen'],
      ] as [string, string][],
    },
    work: {
      eyebrow: 'Ausgewählte Projekte - 2022 / 2026',
      title: 'Case Studies.',
      intro:
        'Ein kuratiertes Archiv aus Identitäten, Kampagnen und Produktarbeit - von Konzept und Naming bis zu Systemen und Rollout.',
      popular: 'Beliebt',
      recent: 'Neu',
      projectScope: 'Projektfilter',
      viewCaseStudy: 'Case Study ansehen',
      moreProjects: 'Mehr Projekte',
    },
    services: {
      eyebrow: '✦ Leistungen',
      title: 'Eine Praxis für ambitionierte Marken.',
      view: 'Leistung ansehen',
      items: [
        { n: '01', slug: 'brand-strategy', t: 'Brand Strategy', d: 'Positionierung, Naming, Narrative und verbale Identität als Kompass der Marke.' },
        { n: '02', slug: 'visual-identity', t: 'Visual Identity', d: 'Logos, Zeichen, Typografie und visuelle Systeme für jeden Touchpoint.' },
        { n: '03', slug: 'packaging-design', t: 'Packaging Design', d: 'Verpackungssysteme, die Produkte klar, merkfähig und bereit für das Regal machen.' },
        { n: '04', slug: 'environmental-design', t: 'Environmental Design', d: 'Räumliche Grafik und Markenräume, die Identität in die physische Welt übertragen.' },
      ],
    },
    testimonials: {
      eyebrow: '✦ Empfehlungen',
      title: 'Was Kund:innen sagen.',
      readMore: '...(mehr lesen)',
      previous: 'Vorherige Empfehlung',
      next: 'Nächste Empfehlung',
      goTo: (index: number) => `Zur Empfehlung ${index}`,
    },
    about: {
      eyebrow: '✦ Über mich',
      titleBefore: 'Strategie trifft',
      titleAccent: 'Ästhetik',
      titleAfter: 'im Dienst von Wachstum.',
      intro:
        'Mein Ansatz verbindet strategisches Denken, Ästhetik und nutzerzentriertes Design, um Identitäten und digitale Produkte zu schaffen, die Zielgruppen erreichen und reales Wachstum unterstützen.',
      availability: 'Offen für Remote-Rollen, freie Projekte und internationale Kollaborationen.',
      experienceTitle: 'Erfahrung',
      educationTitle: 'Ausbildung',
      philosophy: '✦ Philosophie',
      quoteBefore: 'Design ist die stille Struktur',
      quoteAccent: 'hinter jeder Marke',
      quoteAfter: 'die bleibt.',
      capabilitiesTitle: '✦ Fähigkeiten',
      portraitCaption: '✦ Mahdieh Baghoolizadeh',
      experience: [
        ['2024 - 2026', 'Gründerin · Brand Strategy', 'Nexa Studio · Türkei, Istanbul'],
        ['2023', 'Brand Designerin', 'Milan Studio · Kanada, North York, Ontario'],
        ['2023', 'Art Director', 'Wilma Studio · Iran, Teheran'],
        ['2022 - 2023', 'Senior Designerin', 'Freelance · International'],
        ['2019 - 2022', 'Head Designerin', 'Narvan Agency · Iran, Isfahan'],
      ] as [string, string, string][],
      education: [
        ['2026', 'UI/UX Product Design', 'Zero to Mastery'],
        ['2020 - 2022', 'Master of Handicrafts', 'Art University of Isfahan'],
        ['2021', 'Brand Design Certification', 'Vand International'],
        ['2014 - 2019', 'Bachelor of Graphic Design', 'Art University of Isfahan'],
      ] as [string, string, string][],
      capabilities: ['Brand Strategy', 'Visual Identity', 'Art Direction', 'Editorial Design', 'Design Systems', 'Packaging', 'Creative Leadership'],
    },
    contact: {
      eyebrow: 'Lass uns zusammenarbeiten',
      line1: 'Eine Marke,',
      line2: 'die es wert ist?',
      bookCall: 'Call buchen',
      reply: 'Antwort meist innerhalb von 24h',
      elsewhere: 'Anderswo',
      channels: '04 - Kanäle',
      ariaExternal: (label: string, handle: string) => `${label}: @${handle} (öffnet in neuem Tab)`,
    },
    footer: {
      rights: (year: number) => `© ${year} Mahdieh Baghoolizadeh - Alle Rechte vorbehalten`,
      studio: 'Nexa Studio · Create · Be · Inspire',
    },
    process: {
      headTitle: 'Prozess',
      description:
        'Wie ein Projekt mit Mahdieh Baghoolizadeh entsteht - vierzehn Schritte vom ersten Gespräch bis zur fertigen Brand Identity.',
      eyebrow: '✦ Prozess',
      title: 'Vierzehn Schritte zu einer Marke, die bleibt',
      intro:
        'Jede Identität folgt demselben disziplinierten Weg - vom ersten Gespräch über Ziele bis zu einem vollständig realisierten Markensystem, bereit für den Launch.',
      readyTitle: 'Bereit zu starten',
      readyText: 'Jedes Projekt beginnt mit einem Gespräch. Erzählen Sie von Ihrer Marke, danach übernehmen wir den Weg.',
      startBrief: 'Briefing starten',
      steps: [
        ['01', 'Phase 01 - Discovery', 'Kickoff-Meeting', ['Einführung in Marke und Projekt', 'Ziele und Erwartungen klären', 'Erste Diagnose der Markenidentität', 'Bedarfe erfassen und priorisieren', 'Budget und Timing abstimmen']],
        ['02', undefined, 'Auftragserfassung', ['Vertrag unterschrieben', 'Anzahlung geleistet']],
        ['03', undefined, 'Briefing', ['Der Kunde füllt den Fragebogen zur visuellen Identität aus']],
        ['04', undefined, 'Brand Discovery Workshop', ['Zwei dreistündige Sessions mit zentralen Stakeholdern', 'Übungen zur Markenselbstwahrnehmung']],
        ['05', 'Phase 02 - Strategie', 'Markenidentität & Persönlichkeit', ['Kernwerte und Wettbewerber finalisieren', 'Markenpersönlichkeit definieren', 'Ähnlichkeiten und Unterschiede zum Wettbewerb kartieren', 'Brand Touchpoints definieren']],
        ['06', undefined, 'Start der visuellen Identität', ['Think-Tank-Sessions zur Designrichtung', 'Erste Logokonzepte und Moodboards', 'Erweiterungsmöglichkeiten im System prüfen']],
        ['07', undefined, 'Strategie-Präsentation', ['Workshops und Übungen zusammenfassen', 'Finalisierte Markenidentität präsentieren', 'Markenstrategie verdichten']],
        ['08', 'Phase 03 - Design', 'Logo-Präsentation', ['Kernkonzept der visuellen Identität präsentieren', 'Logo-Moodboards zeigen', 'Logo in Anwendungen zeigen']],
        ['09', undefined, 'Logo-Review', ['Revisionen und Redesign nach Feedback']],
        ['10', undefined, 'Pattern-Review', ['Revisionen unterstützender Muster nach Feedback']],
        ['11', undefined, 'Pattern-Design', ['Visuelle Sprache erweitern', 'Unterstützende Muster und grafische Elemente gestalten']],
        ['12', undefined, 'Komponenten der visuellen Identität', ['Vertragliche Assets fertigstellen', 'Geschäftsausstattung', 'Launchpage-Design', 'Environmental Graphics']],
        ['13', 'Phase 04 - Übergabe', 'Abschluss-Session', ['Alle gelieferten Arbeiten präsentieren und zusammenfassen']],
        ['14', undefined, 'Finale Übergabe', ['Restbetrag ausgleichen', 'Alle vertraglichen Assets übergeben', 'Brand Book übergeben']],
      ] as [string, string | undefined, string, string[]][],
    },
    project: {
      allProjects: '<- Alle Projekte',
      client: 'Kunde',
      year: 'Jahr',
      category: 'Kategorie',
      location: 'Ort',
      credit: 'Credit',
      about: 'Über das Projekt',
      services: 'Leistungen',
      media: 'Projektmedien',
      previous: 'Vorheriges Projekt',
      next: 'Nächstes Projekt',
      imageAlt: (title: string, category: string) => `${title} - ${category}`,
      galleryAlt: (title: string, index: number) => `${title} Projektbild ${index}`,
    },
    servicePage: {
      back: '<- Leistungen',
      label: 'Leistung',
      focus: 'Fokus',
      related: 'Ähnliche Projekte',
      title: 'Arbeiten mit dieser Leistung.',
      projectCount: (count: number) => `${count} ${count === 1 ? 'Projekt' : 'Projekte'}`,
      view: 'Ansehen',
      empty: 'Ähnliche Arbeiten für diese Leistung werden bald ergänzt.',
    },
    brief: {
      headTitle: 'Projektbriefing',
      meta: 'Erzählen Sie von Ihrem Projekt. Beantworten Sie 15 kurze Fragen, um eine Brand- oder Identity-Zusammenarbeit zu starten.',
      eyebrow: (total: number) => `Briefing · ${total} Fragen`,
      titleLine1: 'Erzählen Sie mir von',
      titleAccent: 'Ihrem Projekt',
      titleLine2: '',
      intro:
        'Ein kurzes, durchdachtes Briefing hilft uns, Ideen in klare, einprägsame und leise kraftvolle visuelle Systeme zu verwandeln. Nehmen Sie sich Zeit - es gibt keine falschen Antworten.',
      review: 'Review',
      finalCheck: 'Finaler Check',
      reviewTitle: 'Antworten prüfen.',
      reviewSubtitle: 'Bitte prüfen Sie vor dem Senden alles. Jede Antwort kann noch bearbeitet werden.',
      noAnswer: 'Keine Antwort angegeben',
      edit: 'Bearbeiten',
      question: (step: number) => `Frage ${step}`,
      previous: 'Zurück',
      nextQuestion: 'Nächste Frage',
      reviewAnswers: 'Antworten prüfen',
      submitBrief: 'Briefing senden',
      submitting: 'Wird gesendet',
      required: 'Diese Frage ist erforderlich.',
      email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      comingSoon: 'Briefing-Fragen werden bald ergänzt.',
      arrows: { prev: '←', next: '→' },
    },
    thanks: {
      headTitle: 'Briefing erhalten',
      meta: 'Danke für Ihr Projektbriefing. Ich melde mich innerhalb von 24 Stunden.',
      eyebrow: 'Briefing erhalten',
      line1: 'Vielen Dank.',
      line2Before: 'Ich melde mich',
      line2Accent: 'innerhalb von 24 Stunden',
      line2After: '.',
      body:
        'Ihre Antworten helfen mir, die Form des Projekts vor unserem Gespräch zu verstehen. Ich lese jedes Briefing persönlich und melde mich bald mit den nächsten Schritten.',
      sooner: 'Möchten Sie früher sprechen?',
      book: 'Termin buchen',
      fallback:
        'Ein Buchungslink wird hier bald verfügbar sein. Bis dahin können Sie mich über die Kontaktdaten unten erreichen.',
      back: '← Zur Startseite',
    },
    auth: {
      loginTitle: 'Login',
      loginEyebrow: 'Kundenzugang',
      loginHeading: 'Willkommen zurück',
      registerTitle: 'Briefing starten',
      registerEyebrow: 'Projektbriefing',
      registerHeading: 'Mit Zugang starten',
      email: 'E-Mail',
      password: 'Passwort',
      remember: 'Angemeldet bleiben',
      logIn: 'Einloggen',
      loggingIn: 'Einloggen...',
      newHere: 'Neu hier?',
      createAccount: 'Konto erstellen',
      name: 'Name',
      confirmPassword: 'Passwort bestätigen',
      already: 'Schon Zugang?',
      continue: 'Weiter',
      invalid: 'Diese Zugangsdaten stimmen nicht mit unseren Einträgen überein.',
    },
  },
} as const;

export const servicePathBySlug = (slug: string, locale: Locale) =>
  localizedPath(`/services/${slug}`, locale);
