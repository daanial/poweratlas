import type {
  ConfusionCard,
  CountryExample,
  DeJureScenario,
  ExecutiveSystem,
  RuleCategory,
} from "./types";

export const ruleCategories: RuleCategory[] = [
  {
    id: "people",
    titleFa: "مردم",
    titleEn: "People",
    questionAnsweredFa: "منبع مشروعیت عمومی کجاست؟",
    questionNotAnsweredFa: "قدرت واقعی در عمل چقدر پخش یا متمرکز است؟",
    shortFa: "رأی، نمایندگی و فشار عمومی می‌توانند مسیر مشروعیت باشند.",
    combineNoteFa:
      "حتی جایی که «مردم» روی کاغذ منبع‌اند، نهادهای دیگر ممکن است مسیر اثر را محدود کنند.",
  },
  {
    id: "personalist",
    titleFa: "یک فرد",
    titleEn: "Personalist rule",
    questionAnsweredFa: "آیا قدرت حول شخص واحد متمرکز شده است؟",
    questionNotAnsweredFa: "این تمرکز رسمی است یا از تضعیف نهادهای موازی ناشی می‌شود؟",
    shortFa: "تصمیم‌گیری به شبکه و وفاداری شخصی وابسته می‌شود.",
    combineNoteFa: "شخص‌محوری می‌تواند با انتخابات، حزب یا ارتش هم‌زمان دیده شود.",
  },
  {
    id: "monarchy",
    titleFa: "خاندان",
    titleEn: "Monarchy",
    questionAnsweredFa: "رئیس کشور چگونه به مقام می‌رسد؟",
    questionNotAnsweredFa: "پادشاه یا ملکه چقدر اختیار سیاسی واقعی دارد؟",
    shortFa: "انتقال مقام از مسیر موروثی تعریف می‌شود.",
    combineNoteFa:
      "پادشاهی شکل تصدی است، نه اندازهٔ قدرت. می‌تواند تشریفاتی یا مطلق باشد.",
  },
  {
    id: "oligarchy",
    titleFa: "گروه کوچک",
    titleEn: "Oligarchy",
    questionAnsweredFa: "آیا دایرهٔ تصمیم‌گیرندگان محدود است؟",
    questionNotAnsweredFa: "این گروه چگونه خود را بازتولید و محدود می‌کند؟",
    shortFa: "دسترسی به قدرت در حلقه‌ای بسته می‌ماند.",
    combineNoteFa: "الیگارشی می‌تواند اقتصادی، حزبی، نظامی یا ترکیبی باشد.",
  },
  {
    id: "party",
    titleFa: "حزب",
    titleEn: "Party rule",
    questionAnsweredFa: "آیا حزب مسیر اصلی گزینش و انضباط قدرت است؟",
    questionNotAnsweredFa: "آیا رقابت درون‌حزبی یا چندحزبی وجود دارد؟",
    shortFa: "سازمان حزبی می‌تواند دولت، مجلس و کادرها را هم‌راستا کند.",
    combineNoteFa: "حزب می‌تواند ابزار رقابت باشد یا کانال انحصاری قدرت.",
  },
  {
    id: "military",
    titleFa: "ارتش",
    titleEn: "Military rule",
    questionAnsweredFa: "نهاد قهری چه نقشی در سیاست دارد؟",
    questionNotAnsweredFa: "کنترل غیرنظامی بر نیروی مسلح چقدر عملی است؟",
    shortFa: "نیروی مسلح می‌تواند نگهبان نظم یا بازیگر سیاسی باشد.",
    combineNoteFa:
      "نفوذ نظامی در طیف گسترده‌ای از نظام‌ها دیده می‌شود، نه فقط حکومت نظامی آشکار.",
  },
  {
    id: "theocratic",
    titleFa: "نهاد دینی",
    titleEn: "Theocratic rule",
    questionAnsweredFa: "آیا مرجع دینی مسیر مشروعیت یا وتو دارد؟",
    questionNotAnsweredFa: "حدود اختیارات نهاد دینی در قانون و عمل چیست؟",
    shortFa: "مرجع دینی می‌تواند بر قانون‌گذاری یا گزینش اثر بگذارد.",
    combineNoteFa: "نقش دینی با جمهوریت، پارلمان یا پادشاهی قابل ترکیب است.",
  },
];

export const executiveSystems: ExecutiveSystem[] = [
  {
    id: "presidential",
    titleFa: "ریاستی",
    titleEn: "Presidential",
    flows: [
      { from: "people", to: "president" },
      { from: "president", to: "government" },
      { from: "parliament", to: "president", bidirectional: true },
      { from: "courts", to: "government", bidirectional: true },
    ],
    explanationFa:
      "رئیس‌جمهور مستقیماً یا از مسیر جدا از مجلس مشروعیت اجرایی می‌گیرد و دولت را رهبری می‌کند. بقای دولت معمولاً به رأی اعتماد مداوم پارلمان وابسته نیست.",
    tradeoffs: [
      {
        id: "pres-speed",
        choiceFa: "قوهٔ اجرایی مستقل",
        strengthFa: "تصمیم‌گیری اجرایی می‌تواند سریع‌تر پیش برود.",
        vulnerabilityFa: "تمرکز اختیار در رأس اجرایی افزایش می‌یابد.",
      },
      {
        id: "pres-deadlock",
        choiceFa: "مشروعیت دوگانه",
        strengthFa: "مجلس و رئیس‌جمهور هر دو مسیر نمایندگی دارند.",
        vulnerabilityFa: "بن‌بست میان قوا محتمل‌تر می‌شود.",
      },
    ],
  },
  {
    id: "parliamentary",
    titleFa: "پارلمانی",
    titleEn: "Parliamentary",
    flows: [
      { from: "people", to: "parliament" },
      { from: "parliament", to: "primeMinister" },
      { from: "primeMinister", to: "government" },
      { from: "parliament", to: "government", bidirectional: true },
    ],
    explanationFa:
      "دولت از اکثریت پارلمان شکل می‌گیرد و معمولاً با از دست دادن حمایت مجلس می‌تواند سقوط کند. رابطهٔ اصلی، وابستگی اجرایی به قانون‌گذاری است.",
    tradeoffs: [
      {
        id: "parl-account",
        choiceFa: "وابستگی به مجلس",
        strengthFa: "مسیر برکناری دولت در قواعد عادی روشن‌تر است.",
        vulnerabilityFa: "دولت‌های ائتلافی ممکن است ناپایدار شوند.",
      },
      {
        id: "parl-fuse",
        choiceFa: "پیوند قوا",
        strengthFa: "هماهنگی قانون و اجرا در اکثریت‌های پایدار آسان‌تر است.",
        vulnerabilityFa: "اکثریت قوی می‌تواند نظارت مجلس را تضعیف کند.",
      },
    ],
  },
  {
    id: "semi-presidential",
    titleFa: "نیمه‌ریاستی",
    titleEn: "Semi-presidential",
    flows: [
      { from: "people", to: "president" },
      { from: "people", to: "parliament" },
      { from: "president", to: "primeMinister", bidirectional: true },
      { from: "parliament", to: "government", bidirectional: true },
    ],
    explanationFa:
      "هم رئیس‌جمهور منتخب و هم دولتی وابسته به پارلمان وجود دارد. توزیع واقعی قدرت به قواعد قانون اساسی و ترکیب اکثریت‌ها بستگی دارد.",
    tradeoffs: [
      {
        id: "semi-dual",
        choiceFa: "دوگانهٔ اجرایی",
        strengthFa: "انعطاف در تقسیم نقش‌ها میان ریاست و دولت.",
        vulnerabilityFa: "هم‌زیستی یا تعارض میان رئیس‌جمهور و نخست‌وزیر.",
      },
      {
        id: "semi-clarity",
        choiceFa: "مشروعیت موازی",
        strengthFa: "چند مسیر پاسخ‌گویی ممکن است.",
        vulnerabilityFa:
          "تشخیص «چه کسی تصمیم می‌گیرد» برای شهروند سخت‌تر می‌شود.",
      },
    ],
  },
];

export const monarchyModels = [
  {
    id: "absolute",
    titleFa: "پادشاهی مطلق",
    titleEn: "Absolute monarchy",
    flows: [
      { from: "monarch", to: "government" },
      { from: "monarch", to: "legislature" },
      { from: "monarch", to: "executive" },
    ],
    explanationFa:
      "مقام موروثی، محور اصلی تصمیم‌گیری است و محدودیت‌های نهادی بر پادشاه ضعیف یا تشریفاتی‌اند.",
  },
  {
    id: "constitutional",
    titleFa: "پادشاهی مشروطه",
    titleEn: "Constitutional monarchy",
    flows: [
      { from: "constitution", to: "monarch" },
      { from: "parliament", to: "government" },
      { from: "monarch", to: "constrained" },
    ],
    explanationFa:
      "قانون اساسی حدود مقام سلطنت را تعریف می‌کند؛ حکومت معمولاً از مسیر پارلمان شکل می‌گیرد.",
  },
  {
    id: "parliamentary-democratic",
    titleFa: "پادشاهی پارلمانی",
    titleEn: "Parliamentary democratic monarchy",
    flows: [
      { from: "people", to: "parliament" },
      { from: "parliament", to: "government" },
      { from: "monarch", to: "headOfState" },
    ],
    explanationFa:
      "پادشاه رئیس کشور است؛ قدرت سیاسی روزمره نزد دولت برآمده از پارلمان می‌ماند.",
  },
] as const;

export const republicExamples: CountryExample[] = [
  {
    id: "us",
    nameFa: "ایالات متحده",
    nameEn: "United States",
    noteFa: "جمهوری ریاستی فدرال؛ رئیس‌جمهور هم رئیس کشور است هم محور اجرایی.",
  },
  {
    id: "germany",
    nameFa: "آلمان",
    nameEn: "Germany",
    noteFa: "جمهوری پارلمانی فدرال؛ صدراعظم به اعتماد بوندستاگ وابسته است.",
  },
  {
    id: "france",
    nameFa: "فرانسه",
    nameEn: "France",
    noteFa:
      "جمهوری نیمه‌ریاستی؛ رئیس‌جمهور و نخست‌وزیر هر دو در صحنهٔ اجرایی حضور دارند.",
  },
  {
    id: "iran",
    nameFa: "ایران",
    nameEn: "Iran",
    noteFa:
      "جمهوری با نهادهای به ظاهر انتخابی و نهادهای غیر انتخابی موازی؛ توزیع قدرت و اختیار در چند لایه تعریف شده است.",
  },
  {
    id: "china",
    nameFa: "چین",
    nameEn: "China",
    noteFa:
      "جمهوری خلق با رهبری حزب واحد؛ ساختار رسمی دولتی زیر سازمان حزبی کار می‌کند.",
  },
];

export const confusions: ConfusionCard[] = [
  {
    id: "republic-not-democracy",
    statementFa: "جمهوری ≠ دموکراسی",
    revealFa:
      "جمهوری شکل تصدی رئیس کشور را توصیف می‌کند (غیرموروثی بودن مقام). میزان رقابت، گردش قدرت و محدودیت نهادها را به‌تنهایی مشخص نمی‌کند.",
    visualHintFa: "دو ستون جدا: «شکل مقام» در برابر «مسیر پاسخ‌گویی».",
  },
  {
    id: "monarchy-not-dictatorship",
    statementFa: "پادشاهی ≠ دیکتاتوری",
    revealFa:
      "پادشاهی می‌تواند تشریفاتی یا بسیار متمرکز باشد. سؤال کلیدی این است که چه نهادی می‌تواند تصمیم پادشاه را محدود کند.",
    visualHintFa: "طیف قدرت سلطنت از تشریفات تا تمرکز کامل.",
  },
  {
    id: "election-not-democracy",
    statementFa: "انتخابات ≠ دموکراسی",
    revealFa:
      "رأی‌گیری وقتی معنا پیدا می‌کند که رقابت واقعی، اطلاعات قابل دسترس و امکان گردش قدرت وجود داشته باشد.",
    visualHintFa: "صندوق رأی داخل شبکهٔ نهادها، نه به‌تنهایی.",
  },
  {
    id: "constitution-not-constraint",
    statementFa: "قانون اساسی ≠ محدودیت واقعی قدرت",
    revealFa:
      "متن قواعد را می‌نویسد؛ محدودیت وقتی واقعی است که دادگاه، مجلس یا بازیگران دیگر بتوانند آن را اجرا کنند.",
    visualHintFa: "کاغذ در برابر اهرم‌های اجرایی شدن.",
  },
  {
    id: "parliament-not-people",
    statementFa: "پارلمان ≠ حاکمیت مردم",
    revealFa:
      "مجلس می‌تواند قوی، ضعیف، وابسته یا مستقل باشد. وجود ساختمان پارلمان تضمین اختیار نمایندگی نیست.",
    visualHintFa: "اندازهٔ گرهٔ پارلمان روی نقشهٔ قدرت متغیر است.",
  },
  {
    id: "president-not-strongest",
    statementFa: "رئیس‌جمهور ≠ قدرتمندترین فرد کشور",
    revealFa:
      "عنوان مقام، توزیع واقعی اختیار را نشان نمی‌دهد. نخست‌وزیر، حزب، ارتش یا نهاد ناظر ممکن است محور تصمیم باشند.",
    visualHintFa: "عنوان در برابر جریان‌های واقعی اختیار.",
  },
  {
    id: "federal-not-weak",
    statementFa: "فدرال ≠ حکومت مرکزی ضعیف",
    revealFa:
      "فدرالیسم یعنی تقسیم رسمی اختیار میان مرکز و واحدهای منطقه‌ای، نه لزوماً ضعف دولت مرکزی. آلمان و ایالات متحده فدرال‌اند و دولت مرکزی‌شان در حوزه‌های تعیین‌شده کاملاً قدرتمند عمل می‌کند.",
    visualHintFa: "دایرهٔ اختیار مشترک در برابر دایرهٔ اختیار منحصر به مرکز یا واحدها.",
  },
  {
    id: "referendum-not-direct-democracy",
    statementFa: "رفراندوم ≠ دموکراسی مستقیم پایدار",
    revealFa:
      "رفراندوم رأی‌گیری روی یک پرسش مشخص است، نه جایگزین دائمی نمایندگی. چه کسی پرسش را طرح می‌کند و زمان‌بندی را تعیین می‌کند، خودش یک تصمیم قدرت است.",
    visualHintFa: "یک پرسش منزوی در برابر ساختار دائمی نمایندگی.",
  },
  {
    id: "ruling-party-not-one-party-state",
    statementFa: "حزب حاکم قوی ≠ نظام تک‌حزبی",
    revealFa:
      "یک حزب می‌تواند سال‌ها با اکثریت قوی حکومت کند در حالی که رقابت رسمی و امکان قانونی شکست هنوز وجود دارد. تفاوت اصلی این است که آیا مسیر قانونی جایگزینی در عمل بسته شده یا نه.",
    visualHintFa: "طیف از تک‌حزبی رسمی تا حزب حاکم مسلط در نظامی رقابتی.",
  },
  {
    id: "coup-not-only-military",
    statementFa: "کودتا ≠ فقط تصرف نظامی کاخ",
    revealFa:
      "برخی کودتاها را رئیس‌جمهور منتخب علیه نهادهای خودش انجام می‌دهد؛ مثلاً با منحل‌کردن غیرقانونی مجلس یا دادگاه قانون اساسی. به این «خودکودتا» می‌گویند.",
    visualHintFa: "پیکان کودتا از بیرون نظام در برابر پیکانی که از داخل رأس اجرایی می‌آید.",
  },
  {
    id: "lobbying-not-corruption",
    statementFa: "لابی‌گری ≠ فساد",
    revealFa:
      "لابی‌گری یعنی تلاش سازمان‌یافته برای اثرگذاری بر تصمیم‌گیرندگان؛ در بسیاری نظام‌ها قانونی و ثبت‌شده است. فساد وقتی شروع می‌شود که این اثرگذاری با رشوه، تهدید یا نقض قانون همراه شود.",
    visualHintFa: "کانال شفاف ثبت‌شده در برابر کانال پنهان و غیرقانونی.",
  },
  {
    id: "boycott-not-apathy",
    statementFa: "تحریم انتخابات ≠ بی‌تفاوتی مردم",
    revealFa:
      "تحریم می‌تواند یک استراتژی آگاهانهٔ سیاسی برای رد مشروعیت یک رقابت نابرابر باشد، نه نشانهٔ بی‌علاقگی به سیاست. باید پرسید چرا گروهی تصمیم به تحریم گرفته‌اند.",
    visualHintFa: "صندوق خالی از روی انتخاب آگاهانه در برابر خالی از روی بی‌تفاوتی.",
  },
];

export const deJureScenarios: DeJureScenario[] = [
  {
    id: "courts",
    titleFa: "دادگاه‌ها",
    paperClaimFa: "دادگاه مستقل است.",
    practiceFactsFa: [
      "انتصاب قضات عمدتاً در اختیار قوهٔ اجرایی است.",
      "بودجهٔ دستگاه قضا از مسیر دولت کنترل می‌شود.",
      "امکان عزل یا فشار اداری بر قضات وجود دارد.",
    ],
    independenceAtPractice: 0.25,
  },
  {
    id: "elections",
    titleFa: "انتخابات",
    paperClaimFa: "انتخابات آزاد برگزار می‌شود.",
    practiceFactsFa: [
      "صلاحیت نامزدها پیش از رقابت غربال می‌شود.",
      "دسترسی به رسانه برای رقبا نامتوازن است.",
      "نهاد برگزارکننده زیر نفوذ اجرایی کار می‌کند.",
    ],
    independenceAtPractice: 0.3,
  },
  {
    id: "parliament",
    titleFa: "پارلمان",
    paperClaimFa: "پارلمان قانون می‌گذارد و دولت را نظارت می‌کند.",
    practiceFactsFa: [
      "دستور کار مجلس عملاً از دولت می‌آید.",
      "ابزار استیضاح یا رأی عدم اعتماد به‌ندرت قابل استفاده است.",
      "انضباط حزبی شدید، رأی نمایندگان را پیش‌بینی‌پذیر می‌کند.",
    ],
    independenceAtPractice: 0.35,
  },
  {
    id: "media",
    titleFa: "رسانه",
    paperClaimFa: "آزادی بیان تضمین شده است.",
    practiceFactsFa: [
      "مجوز و فرکانس زیر کنترل دولت است.",
      "تبلیغات دولتی بازار رسانه را شکل می‌دهد.",
      "پیگرد یا فشار اداری هزینهٔ انتقاد را بالا می‌برد.",
    ],
    independenceAtPractice: 0.2,
  },
  {
    id: "military",
    titleFa: "ارتش",
    paperClaimFa: "نیروهای مسلح تابع مقام غیرنظامی‌اند.",
    practiceFactsFa: [
      "ارتش در انتصابات امنیتی حق وتو دارد.",
      "بودجهٔ دفاعی از نظارت شفاف مجلس خارج است.",
      "شبکه‌های نظامی در اقتصاد سیاسی نفوذ دارند.",
    ],
    independenceAtPractice: 0.4,
  },
  {
    id: "constitutionalCourt",
    titleFa: "دادگاه قانون اساسی",
    paperClaimFa: "دادگاه قانون اساسی می‌تواند قوانین را باطل کند.",
    practiceFactsFa: [
      "ترکیب دادگاه با اکثریت سیاسی هم‌راستا چیده می‌شود.",
      "حکم‌ها با تأخیر یا بی‌توجهی اجرایی می‌شوند.",
      "اختیارات اضطراری مسیر دور زدن رأی دادگاه را باز می‌کند.",
    ],
    independenceAtPractice: 0.28,
  },
  {
    id: "centralBank",
    titleFa: "بانک مرکزی",
    paperClaimFa: "بانک مرکزی مستقل از دولت سیاست پولی تعیین می‌کند.",
    practiceFactsFa: [
      "رئیس بانک مرکزی با میل دولت منصوب و پیش از پایان دوره برکنار می‌شود.",
      "دولت آشکارا برای کاهش نرخ بهره پیش از انتخابات فشار می‌آورد.",
      "ذخایر ارزی و سیاست پولی برای تأمین هزینه‌های بودجه‌ای دولت به کار می‌رود.",
    ],
    independenceAtPractice: 0.3,
  },
  {
    id: "auditBody",
    titleFa: "دیوان محاسبات / نهاد ضدفساد",
    paperClaimFa: "نهاد نظارت مالی می‌تواند هزینه‌کرد دولت را بازرسی و افشا کند.",
    practiceFactsFa: [
      "گزارش‌های حسابرسی با تأخیر طولانی یا هرگز منتشر نمی‌شوند.",
      "رئیس نهاد از میان وفاداران سیاسی انتخاب می‌شود.",
      "پروندهٔ فساد علیه مقام‌های نزدیک به دولت به‌ندرت به دادگاه می‌رسد.",
    ],
    independenceAtPractice: 0.25,
  },
  {
    id: "electionCommission",
    titleFa: "کمیسیون برگزاری انتخابات",
    paperClaimFa: "نهاد مستقل برگزاری و شمارش انتخابات را تضمین می‌کند.",
    practiceFactsFa: [
      "اعضای کمیسیون با پیشنهاد مستقیم قوهٔ اجرایی منصوب می‌شوند.",
      "مرزبندی حوزه‌های انتخاباتی به‌طور دوره‌ای به نفع حزب حاکم تغییر می‌کند.",
      "شکایت دربارهٔ تخلف در شمارش آرا مسیر رسیدگی مؤثر ندارد.",
    ],
    independenceAtPractice: 0.32,
  },
  {
    id: "localGovernment",
    titleFa: "دولت‌های محلی",
    paperClaimFa: "شهرداری‌ها و استان‌ها در حوزهٔ خود اختیار تصمیم‌گیری دارند.",
    practiceFactsFa: [
      "بودجهٔ محلی مشروط به تأیید سالانهٔ مرکز است.",
      "شهردار یا استاندار منتخب را مرکز می‌تواند بدون رأی محلی برکنار کند.",
      "مناطق مخالف دولت مرکزی در تخصیص بودجه از اولویت آخر برخوردارند.",
    ],
    independenceAtPractice: 0.35,
  },
];
