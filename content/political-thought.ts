import type {
  PoliticalEra,
  PoliticalTradition,
  TraditionComparisonRow,
} from "./types";

/** Companion essay on the atlas page: where political ideas came from, and the
 *  fault line between "politics as ethics" and "politics as power" that still
 *  runs under every institution modeled elsewhere on the site. */

export const politicalTraditions: PoliticalTradition[] = [
  {
    id: "moralism",
    eyebrowFa: "سنت اول",
    titleFa: "آرمان‌گرایی سیاسی",
    titleEn: "Political Moralism",
    bodyFa: [
      "آرمان‌گرایان سیاست را شاخه‌ای از اخلاق می‌دانند: نظم سیاسی باید در خدمت هدف‌های ماندگاری چون عدالت، برابری و آزادی باشد، نه صرفاً بقا.",
      "ارسطو این نگاه را بنیان نهاد: سیاست تنها وقتی معنا می‌یابد که جامعه‌ای پیچیده شکل گرفته باشد؛ آن‌گاه انسان‌ها فراتر از بقا، دربارهٔ هدف‌های مشترکشان تصمیم می‌گیرند.",
      "در اوج خود، آرمان‌گرایی به آرمان‌شهر می‌رسد — جمهوری افلاطون، آرمان‌شهر تامس مور — الگوهایی برای سنجیدن وضع موجود با آنچه باید باشد.",
    ],
    quote: {
      id: "plato-philosophers-kings",
      personFa: "افلاطون",
      personEn: "Plato",
      quoteFa: "تا فیلسوفان به پادشاهی نرسند، شهرها هرگز از شرهایشان آسوده نمی‌شوند.",
      quoteEn:
        "Until philosophers are kings, cities will never have rest from their evils.",
    },
    riskLabelFa: "خطر کاربردی: از آرمان تا استبداد",
    riskFa:
      "وقتی یک هدف اخلاقی ضرورتی مطلق قلمداد شود، همان زبان می‌تواند توجیه‌گر خشونت تمامیت‌خواه شود. آرمان‌شهر بدون بازبینی و توافق جمعی، به اهرم سرکوب بدل می‌شود.",
  },
  {
    id: "realism",
    eyebrowFa: "سنت دوم",
    titleFa: "واقع‌گرایی سیاسی",
    titleEn: "Political Realism",
    bodyFa: [
      "واقع‌گرایان می‌گویند سیاست موظف به تحویل ارزش اخلاقی نیست؛ سیاست دربارهٔ قدرت است — ابزاری که با آن هدف‌ها به دست می‌آیند، دشمنان شکست می‌خورند و مصالحه‌ها پایدار می‌مانند.",
      "ماکیاولی، در روزگار بی‌نظمی، انسان‌ها را «دروغگویانی ناسپاس» توصیف کرد؛ بنابراین فرمانروا باید کارآمدی را بر صداقت ترجیح دهد.",
      "هابز «وضع طبیعی» را جنگ همه علیه همه دانست؛ تنها قراردادی اجتماعی که اقتدار مطلق به یک حاکم می‌دهد، جامعه را از این وضع بدوی نجات می‌دهد.",
      "چاناکیا همین عمل‌گرایی را در بنای امپراتوری موریه به کار بست: با اولویت دادن به نظم و امنیت مادی بر رفاه اخلاقی، دولت‌های پراکنده را در امپراتوری واحدی یکپارچه کرد.",
    ],
    quote: {
      id: "machiavelli-prudent-ruler",
      personFa: "نیکولو ماکیاولی",
      personEn: "Niccolò Machiavelli",
      quoteFa: "فرمانروای محتاط نه می‌تواند و نه باید به قول خود پایبند بماند.",
      quoteEn: "A prudent ruler cannot, and must not, honor his word.",
    },
    riskLabelFa: "خطر کاربردی: ارزش بی‌پشتوانه",
    riskFa:
      "ارزش‌ها بدون سازوکاری برای اجرا بی‌فایده‌اند. سیاستی که فقط بر نیت اخلاقی تکیه کند و واقعیت رقابت را نادیده بگیرد، شکننده است — طرحی بدون سازوکار قدرت، خیال است، نه برنامه.",
  },
  {
    id: "ideology",
    eyebrowFa: "سنت سوم",
    titleFa: "اندیشهٔ ایدئولوژیک",
    titleEn: "Ideological Thinking",
    bodyFa: [
      "این رویکرد بر خاص‌بودگی تاریخی ایده‌های سیاسی تأکید می‌کند: هگل و مارکس نشان دادند که آنچه در یک دوره «عقل سلیم» به‌شمار می‌رود، در دورهٔ دیگر بدعتی خطرناک بوده است.",
      "دموکراسی را افلاطون و ارسطو نظامی فاسد و خطرناک می‌دانستند؛ امروز مترقی‌ترین شکل حکمرانی قلمداد می‌شود. برده‌داری زمانی «وضعیتی طبیعی» توجیه می‌شد؛ امروز نقض آشکار حقوق بشر است.",
      "مارکس فراتر رفت: «ایسم»های سیاسی — کمونیسم، سوسیالیسم، محافظه‌کاری — را بازتاب منافع طبقات اجتماعی گوناگون دانست، نه حقیقتی جهان‌شمول.",
    ],
    quote: {
      id: "marx-riddle-of-history",
      personFa: "کارل مارکس",
      personEn: "Karl Marx",
      quoteFa: "فیلسوفان تنها جهان را تفسیر کرده‌اند؛ نکته اما تغییر آن است.",
      quoteEn: "The philosophers have only interpreted the world… the point is to change it.",
    },
    riskLabelFa: "خطر کاربردی: شور جانشین خرد می‌شود",
    riskFa:
      "وقتی رقابت ایدئولوژیک به بازی حاصل‌جمع‌صفر میان «اردوگاه‌های رقیب و آشتی‌ناپذیر» بدل شود، شور بر خرد چیره می‌شود و بدترین افراط‌های واقع‌گرایی — هر ابزاری به‌نام هدف — توجیه می‌شود.",
  },
];

export const politicalEras: PoliticalEra[] = [
  {
    id: "ancient",
    periodFa: "۸۰۰ پیش از میلاد – ۳۰ پس از میلاد",
    labelFa: "باستان",
    labelEn: "Ancient",
    themesFa: "فضیلت، سنت و «زندگی نیک» در چین و یونان؛ واقع‌گرایی در هند",
    figuresFa: "کنفوسیوس، افلاطون، ارسطو، چاناکیا، سون تزو",
  },
  {
    id: "medieval",
    periodFa: "۳۰ – ۱۵۱۵",
    labelFa: "قرون‌وسطی",
    labelEn: "Medieval",
    themesFa: "نقش کلیسا، نظریهٔ جنگ عادلانه، محدودیت‌های نخستین قدرت شاهانه",
    figuresFa: "آگوستین قدیس، توماس آکویناس، ابن‌خلدون",
  },
  {
    id: "enlightenment",
    periodFa: "۱۵۱۵ – ۱۷۷۰",
    labelFa: "روشنگری",
    labelEn: "Enlightenment",
    themesFa: "حاکمیت، حقوق طبیعی، قرارداد اجتماعی، بنیان قانون بشری",
    figuresFa: "تامس هابز، جان لاک، مونتسکیو",
  },
  {
    id: "revolutionary",
    periodFa: "۱۷۷۰ – ۱۸۴۸",
    labelFa: "عصر انقلاب‌ها",
    labelEn: "Revolutionary",
    themesFa: "آزادی، برابری، هویت ملی، حقوق فرد",
    figuresFa: "روسو، تامس پین، مری ولستون‌کرافت",
  },
  {
    id: "mass-politics",
    periodFa: "۱۸۴۸ – ۱۹۱۰",
    labelFa: "ظهور توده‌ها",
    labelEn: "Rise of the Masses",
    themesFa: "سوسیالیسم، آنارشیسم، مبارزه برای حق رأی زنان",
    figuresFa: "کارل مارکس، جان استوارت میل، امیلین پنکهرست",
  },
  {
    id: "ideological-clash",
    periodFa: "۱۹۱۰ – ۱۹۴۵",
    labelFa: "رویارویی ایدئولوژی‌ها",
    labelEn: "Clash of Ideologies",
    themesFa: "فاشیسم در برابر کمونیسم؛ نافرمانی مدنی در برابر کنترل تام‌گرایانه",
    figuresFa: "گاندی، لنین، استالین، موسولینی، مائو تسه‌تونگ",
  },
  {
    id: "postwar",
    periodFa: "۱۹۴۵ – امروز",
    labelFa: "پس از جنگ",
    labelEn: "Postwar",
    themesFa: "استعمارزدایی، نظریهٔ عدالت، حقوق مدنی، جهانی‌شدن",
    figuresFa: "نلسون ماندلا، جان رالز، میشل فوکو",
  },
];

export const traditionComparison: TraditionComparisonRow[] = [
  {
    id: "goal",
    featureFa: "هدف اصلی",
    moralismFa: "دستیابی به «کنش‌های نیک» — عدالت، برابری",
    realismFa: "کسب و اعمال قدرت",
  },
  {
    id: "human-nature",
    featureFa: "طبیعت انسان",
    moralismFa: "در جوامع پیچیده ظرفیت نجابت دارد",
    realismFa: "«دروغگویانی ناسپاس» در وضع جنگ همه علیه همه",
  },
  {
    id: "conflict",
    featureFa: "نگاه به تعارض",
    moralismFa: "مسئله‌ای که با دغدغهٔ عمومی و کنش جمعی حل می‌شود",
    realismFa: "واقعیتی دائمی که باید با قدرت مدیریت شود",
  },
  {
    id: "scarcity",
    featureFa: "نگاه به کمیابی",
    moralismFa: "تمرکز بر دستیابی جمعی به «زندگی نیک»",
    realismFa: "رقابت بر سر منابع محدود",
  },
  {
    id: "ethics",
    featureFa: "جایگاه اخلاق",
    moralismFa: "سیاست شاخه‌ای از فلسفهٔ اخلاق است",
    realismFa: "اخلاق در ردهٔ دوم، پس از امنیت مادی و نظم",
  },
];

export const politicalQuotes = [
  {
    id: "sun-tzu",
    personFa: "سون تزو",
    personEn: "Sun Tzu",
    quoteFa: "هنر جنگ برای دولت مسئله‌ای حیاتی است.",
    quoteEn: "The art of war is of vital importance to the state.",
  },
  {
    id: "augustine",
    personFa: "آگوستین قدیس",
    personEn: "Augustine of Hippo",
    quoteFa: "اگر عدالت را از حکومت‌ها بگیریم، جز باندهای بزرگ راهزنی چه می‌ماند؟",
    quoteEn: "If justice be taken away, what are governments but great bands of robbers?",
  },
  {
    id: "locke",
    personFa: "جان لاک",
    personEn: "John Locke",
    quoteFa: "غایت قانون، پاسداری و گسترش آزادی است.",
    quoteEn: "The end of law is to preserve and enlarge freedom.",
  },
  {
    id: "rousseau",
    personFa: "ژان-ژاک روسو",
    personEn: "Jean-Jacques Rousseau",
    quoteFa: "چشم‌پوشی از آزادی، چشم‌پوشی از انسان‌بودن است.",
    quoteEn: "To renounce liberty is to renounce being a man.",
  },
  {
    id: "jefferson",
    personFa: "توماس جفرسون",
    personEn: "Thomas Jefferson",
    quoteFa: "همهٔ انسان‌ها برابر آفریده شده‌اند.",
    quoteEn: "All men are created equal.",
  },
  {
    id: "mill",
    personFa: "جان استوارت میل",
    personEn: "John Stuart Mill",
    quoteFa: "این‌که تنها عدهٔ کمی جسارت متفاوت‌بودن دارند، بزرگ‌ترین خطر این روزگار است.",
    quoteEn: "That so few dare to be eccentric marks the chief danger of the time.",
  },
  {
    id: "proudhon",
    personFa: "پیر-ژوزف پرودون",
    personEn: "Pierre-Joseph Proudhon",
    quoteFa: "مالکیت، دزدی است.",
    quoteEn: "Property is theft.",
  },
  {
    id: "mao",
    personFa: "مائو تسه‌تونگ",
    personEn: "Mao Zedong",
    quoteFa: "قدرت سیاسی از لولهٔ تفنگ بیرون می‌آید.",
    quoteEn: "Political power grows out of the barrel of a gun.",
  },
  {
    id: "hayek",
    personFa: "فریدریش هایک",
    personEn: "Friedrich Hayek",
    quoteFa: "بزرگ‌ترین شرارت، حکومتِ بی‌حد و مرز است.",
    quoteEn: "The chief evil is unlimited government.",
  },
  {
    id: "guevara",
    personFa: "چه گوارا",
    personEn: "Che Guevara",
    quoteFa: "رهاننده‌ای وجود ندارد؛ مردم خود را رها می‌کنند.",
    quoteEn: "Liberators do not exist. The people liberate themselves.",
  },
  {
    id: "rawls",
    personFa: "جان رالز",
    personEn: "John Rawls",
    quoteFa: "عدالت، نخستین فضیلت نهادهای اجتماعی است.",
    quoteEn: "Justice is the first virtue of social institutions.",
  },
] as const;
