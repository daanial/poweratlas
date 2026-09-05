import type { GlossaryTerm } from "./types";

export const glossary: GlossaryTerm[] = [
  {
    id: "separation-of-powers",
    termFa: "تفکیک قوا",
    termEn: "Separation of powers",
    shortDefFa:
      "تقسیم اختیار میان قوهٔ مقننه، مجریه و قضائیه برای جلوگیری از تمرکز قدرت در یک نهاد.",
    relatedConceptIds: ["parliament", "government", "courts"],
  },
  {
    id: "federalism",
    termFa: "فدرالیسم",
    termEn: "Federalism",
    shortDefFa:
      "تقسیم رسمی اختیار میان دولت مرکزی و واحدهای منطقه‌ای که هرکدام حوزهٔ مستقل تصمیم‌گیری دارند.",
  },
  {
    id: "proportional-representation",
    termFa: "نظام تناسبی",
    termEn: "Proportional representation",
    shortDefFa:
      "سیستم انتخاباتی که کرسی‌های مجلس را متناسب با سهم آرای هر حزب تقسیم می‌کند.",
    relatedConceptIds: ["elections", "parties"],
  },
  {
    id: "fptp",
    termFa: "نظام اکثریتی (اکثریت نسبی)",
    termEn: "First-past-the-post",
    shortDefFa:
      "کاندیدای دارای بیشترین رأی در هر حوزه برنده می‌شود، حتی بدون اکثریت مطلق.",
    relatedConceptIds: ["elections"],
  },
  {
    id: "no-confidence-vote",
    termFa: "رأی عدم اعتماد",
    termEn: "Vote of no confidence",
    shortDefFa: "ابزار پارلمانی برای برکناری دولت با رأی اکثریت نمایندگان.",
    relatedConceptIds: ["parliament", "government"],
  },
  {
    id: "judicial-review",
    termFa: "بازبینی قضایی",
    termEn: "Judicial review",
    shortDefFa:
      "اختیار دادگاه برای باطل کردن قانون یا اقدام دولتی مغایر با قانون اساسی.",
    relatedConceptIds: ["courts", "constitution"],
  },
  {
    id: "veto-player",
    termFa: "بازیگر وتو",
    termEn: "Veto player",
    shortDefFa:
      "هر نهاد یا فرد که می‌تواند مانع تغییر وضع موجود شود؛ افزایش شمار این بازیگران، تغییر سیاست را دشوارتر می‌کند.",
  },
  {
    id: "executive-aggrandizement",
    termFa: "تمرکزگرایی اجرایی",
    termEn: "Executive aggrandizement",
    shortDefFa:
      "تضعیف تدریجی نظارت‌ها توسط قوهٔ مجریهٔ منتخب، بدون کودتا یا لغو رسمی انتخابات.",
    relatedConceptIds: ["government", "president"],
  },
  {
    id: "competitive-authoritarianism",
    termFa: "اقتدارگرایی رقابتی",
    termEn: "Competitive authoritarianism",
    shortDefFa:
      "نظامی با انتخابات چندحزبی واقعی که میدان رقابت به‌شدت به نفع حزب حاکم کج است.",
    relatedConceptIds: ["elections", "parties"],
  },
  {
    id: "democratic-backsliding",
    termFa: "افول دموکراتیک",
    termEn: "Democratic backsliding",
    shortDefFa:
      "کاهش تدریجی کیفیت دموکراسی از درون، معمولاً با حفظ ظاهر نهادهای انتخاباتی.",
  },
  {
    id: "ceremonial-head-of-state",
    termFa: "رئیس تشریفاتی",
    termEn: "Ceremonial head of state",
    shortDefFa: "مقامی با کارکرد نمادین که اختیار اجرایی روزمره ندارد.",
    relatedConceptIds: ["president"],
  },
  {
    id: "minority-government",
    termFa: "دولت اقلیت",
    termEn: "Minority government",
    shortDefFa:
      "دولتی که بدون اکثریت مطلق در پارلمان، با تحمل ضمنی احزاب دیگر ادامه می‌یابد.",
    relatedConceptIds: ["government", "parliament"],
  },
  {
    id: "governing-coalition",
    termFa: "ائتلاف حاکم",
    termEn: "Governing coalition",
    shortDefFa: "اتحاد چند حزب برای تشکیل اکثریت پارلمانی و دولت مشترک.",
    relatedConceptIds: ["parties", "government"],
  },
  {
    id: "dissolution-of-parliament",
    termFa: "انحلال مجلس",
    termEn: "Dissolution of parliament",
    shortDefFa: "پایان زودهنگام دورهٔ مجلس و فراخوان انتخابات جدید.",
    relatedConceptIds: ["parliament", "elections"],
  },
  {
    id: "impeachment",
    termFa: "استیضاح",
    termEn: "Impeachment",
    shortDefFa:
      "فرایند رسمی اتهام و برکناری یک مقام (اغلب رئیس‌جمهور) توسط مجلس یا نهاد ویژه.",
    relatedConceptIds: ["parliament", "president"],
  },
  {
    id: "executive-decree",
    termFa: "حکم اجرایی",
    termEn: "Executive order / decree",
    shortDefFa:
      "دستور رئیس کشور یا دولت که بدون تصویب مجلس اجرا می‌شود؛ حدودش نظام به نظام فرق دارد.",
    relatedConceptIds: ["government"],
  },
  {
    id: "electoral-threshold",
    termFa: "آستانهٔ انتخاباتی",
    termEn: "Electoral threshold",
    shortDefFa:
      "حداقل درصد آرای لازم برای ورود حزب به مجلس در نظام تناسبی.",
    relatedConceptIds: ["elections", "parties"],
  },
  {
    id: "alternation-in-power",
    termFa: "جابه‌جایی قدرت",
    termEn: "Alternation in power",
    shortDefFa:
      "انتقال واقعی قدرت اجرایی از یک حزب/فرد به رقیب از طریق انتخابات.",
    relatedConceptIds: ["elections"],
  },
  {
    id: "independent-oversight-body",
    termFa: "نهاد ناظر مستقل",
    termEn: "Independent oversight body",
    shortDefFa:
      "سازمان تخصصی (کمیسیون انتخابات، دیوان محاسبات، نهاد ضدفساد) که باید فارغ از فشار سیاسی روزمره کار کند.",
  },
  {
    id: "state-vs-public-media",
    termFa: "رسانهٔ دولتی در برابر رسانهٔ عمومی",
    termEn: "State media vs. public broadcaster",
    shortDefFa:
      "رسانهٔ دولتی مستقیماً زیر کنترل دولت است؛ رسانهٔ عمومی با تأمین مالی مستقل و هیئت نظارتی بی‌طرف اداره می‌شود.",
    relatedConceptIds: ["media"],
  },
  {
    id: "civilian-control",
    termFa: "کنترل غیرنظامی بر ارتش",
    termEn: "Civilian control of the military",
    shortDefFa:
      "اصل اینکه تصمیم نهایی دربارهٔ کاربرد نیروی مسلح با مقام‌های منتخب غیرنظامی باشد.",
    relatedConceptIds: ["military"],
  },
  {
    id: "self-coup",
    termFa: "کودتای خزنده",
    termEn: "Self-coup (autogolpe)",
    shortDefFa:
      "تصرف قدرت فوق‌قانونی توسط مقامی که خودش از مسیر قانونی به قدرت رسیده، مثلاً منحل‌کردن غیرقانونی مجلس.",
    relatedConceptIds: ["president", "parliament"],
  },
  {
    id: "legitimacy",
    termFa: "مشروعیت",
    termEn: "Legitimacy",
    shortDefFa:
      "پذیرش عمومی حق حکومت‌کردن یک نهاد یا فرد، فارغ از مسیر رسیدنش به قدرت.",
    relatedConceptIds: ["people"],
  },
  {
    id: "rule-of-law",
    termFa: "حاکمیت قانون",
    termEn: "Rule of law",
    shortDefFa:
      "اصل اینکه هیچ فرد یا نهادی — از جمله حکومت — بالاتر از قانون نیست.",
    relatedConceptIds: ["courts", "constitution"],
  },
  {
    id: "ethnic-federalism",
    termFa: "فدرالیسم قومی",
    termEn: "Ethnic federalism",
    shortDefFa:
      "تقسیم واحدهای فدرال بر اساس مرزهای قومی/زبانی به‌جای مرزهای اداری صرف.",
  },
  {
    id: "bicameral",
    termFa: "قوهٔ مقننهٔ دو مجلسی",
    termEn: "Bicameral legislature",
    shortDefFa:
      "مجلسی متشکل از دو اتاق که معمولاً هرکدام اختیارات متفاوتی دارند.",
    relatedConceptIds: ["parliament"],
  },
  {
    id: "parliamentary-immunity",
    termFa: "مصونیت پارلمانی",
    termEn: "Parliamentary immunity",
    shortDefFa:
      "حفاظت قانونی نمایندگان از پیگرد قضایی برای اقدامات مرتبط با وظیفهٔ نمایندگی.",
    relatedConceptIds: ["parliament"],
  },
  {
    id: "referendum",
    termFa: "رفراندوم",
    termEn: "Referendum",
    shortDefFa:
      "رأی‌گیری مستقیم مردم روی یک پرسش سیاستی یا قانون اساسی مشخص، جدا از انتخاب نماینده.",
    relatedConceptIds: ["people", "constitution"],
  },
  {
    id: "intra-party-competition",
    termFa: "رقابت درون‌حزبی",
    termEn: "Intra-party competition",
    shortDefFa:
      "رقابت جناح‌ها یا کاندیداهای مختلف درون یک حزب واحد برای کسب مقام یا نامزدی.",
    relatedConceptIds: ["parties"],
  },
  {
    id: "institutional-capture",
    termFa: "مصادرهٔ نهادی",
    termEn: "Institutional capture",
    shortDefFa:
      "روندی که در آن نهاد ناظر (دادگاه، رسانه، کمیسیون انتخابات) عملاً کنترلش به دست بازیگری می‌افتد که باید نظارتش کند.",
    relatedConceptIds: ["courts", "media", "elections"],
  },
  {
    id: "absolutism",
    termFa: "استبدادگرایی",
    termEn: "Absolutism",
    shortDefFa:
      "اصل قدرت مطلق و محدود‌نشدهٔ دولت در حکومت. همچنین به کل‌نگری سیاسی معروف است.",
  },
  {
    id: "agrarianism",
    termFa: "روستایی‌گرایی",
    termEn: "Agrarianism",
    shortDefFa:
      "نظریهٔ سیاسی که جامعهٔ روستایی و کشاورزی را برتر از جامعهٔ شهری می‌داند و کشاورزی را سبک‌زندگی‌ای مؤثر بر ارزش‌های اجتماعی می‌بیند.",
  },
  {
    id: "anarchism",
    termFa: "آنارشیسم",
    termEn: "Anarchism",
    shortDefFa:
      "لغو اقتدار دولتی، در صورت لزوم از طریق خشونت، و تبدیل جامعه به مبنای همکاری‌های داوطلبانه.",
  },
  {
    id: "apartheid",
    termFa: "اپارتاید",
    termEn: "Apartheid",
    shortDefFa:
      "سیاستی از تفکیک نژادی که پس از پیروزی حزب ملی در افریقای جنوبی سال ۱۹۴۸ اجرا شد.",
  },
  {
    id: "apparatchik",
    termFa: "دستگیر حزبی",
    termEn: "Apparatchik",
    shortDefFa:
      "عضو دستگاه حزب کمونیست که بدون نقادی از دستورات پیروی می‌کند. امروزه این واژه به‌عنوان توصیفی تحقیرآمیز برای متعصب حزبی استفاده می‌شود.",
  },
  {
    id: "autocracy",
    termFa: "خودکامگی",
    termEn: "Autocracy",
    shortDefFa:
      "جامعه یا دولتی که قدرت نامحدود در دست یک فرد منفرد است.",
  },
  {
    id: "bipartisan",
    termFa: "دو‌حزبی",
    termEn: "Bipartisan",
    shortDefFa:
      "رویکرد به وضعیت یا موضوعی که احزاب سیاسی معمولاً مخالف یکدیگر بر سر آن توافق دارند.",
  },
  {
    id: "bolshevik",
    termFa: "بلشویک",
    termEn: "Bolshevik",
    shortDefFa:
      "واژهٔ روسی به معنای «اکثریت»؛ جناحی از حزب سوسیالئ‌دموکراتی روس که در ۱۹۰۳ از جناح منشویک جدا شد و پس از ۱۹۱۷ به حزب کمونیست شوروی تبدیل شد.",
  },
  {
    id: "bourgeoisie",
    termFa: "طبقهٔ سرمایه‌داری",
    termEn: "Bourgeoisie",
    shortDefFa:
      "در مارکسیسم، طبقه‌ای که مالک وسایل تولید است و درآمد خود را از مالکیت این وسایل، نه از دستمزد کار، کسب می‌کند.",
  },
  {
    id: "capitalism",
    termFa: "سرمایه‌داری",
    termEn: "Capitalism",
    shortDefFa:
      "نظام اقتصادی مبتنی بر نیروهای بازار، با سرمایه‌گذاری خصوصی و مالکیت خصوصی از وسایل تولید و توزیع یک کشور.",
  },
  {
    id: "collectivism",
    termFa: "جمع‌گرایی",
    termEn: "Collectivism",
    shortDefFa:
      "نظریهٔ سیاسی که کنترل جمعی یا اجتماعی بر نهادهای اقتصادی و وسایل تولید را بر مالکیت فردی ترجیح می‌دهد.",
  },
  {
    id: "colonialism",
    termFa: "استعمار",
    termEn: "Colonialism",
    shortDefFa:
      "ادعای دولتی برای حاکمیت بر سرزمین‌های جدید. با رابطهٔ نابرابر قدرت بین استعماركنندگان و جمعیت محلی مشخص می‌شود.",
  },
  {
    id: "common-law",
    termFa: "حقوق عرفی",
    termEn: "Common law",
    shortDefFa:
      "نظام حقوقی که نه بر اساس متون قانونی و نه قانون اساسی، بلکه بر اساس سوابق دادرسی و اجماع فقهی تاریخی استوار است.",
  },
  {
    id: "communism",
    termFa: "کمونیسم",
    termEn: "Communism",
    shortDefFa:
      "ایدئولوژی‌ای که حذف مالکیت خصوصی در برابر مالکیت جمعی را پیشنهاد می‌کند، بر پایهٔ منشور سیاسی کارل مارکس و فریدریش انگلس سال ۱۸۴۸.",
  },
  {
    id: "confucianism",
    termFa: "کنفوشیوسی",
    termEn: "Confucianism",
    shortDefFa:
      "سیستمی فلسفی مبتنی بر آموزه‌های کنفوشیوس که بر اهمیت سلسله‌مراتب، وفاداری خاندگی و شخصی، و ارتقای اخلاقی فردی تأکید می‌کند.",
  },
  {
    id: "conservatism",
    termFa: "محافظه‌کاری",
    termEn: "Conservatism",
    shortDefFa:
      "موضع سیاسی که تغییرات رادیکال در جامعه را مخالف است. محافظه‌کاران می‌توانند سیاست‌های گسترده‌ای از جمله حفظ آزادی اقتصادی، کارآفرینی، بازارهای آزاد، مالکیت خصوصی، خصوصی‌سازی و کاهش دخالت دولت را دنبال کنند.",
  },
  {
    id: "constitutionalism",
    termFa: "قانون‌اساسی‌گرایی",
    termEn: "Constitutionalism",
    shortDefFa:
      "نظام حکومتی که از قانون اساسی پیروی می‌کند—مجموعه‌ای نوشتاری از اصول و قوانین بنیادی یک ملت.",
  },
  {
    id: "democracy",
    termFa: "دموکراسی",
    termEn: "Democracy",
    shortDefFa:
      "شکل حکومتی که در آن قدرت عالی در دست مردم یا نمایندگان انتخاب‌شدهٔ آن‌ها است.",
  },
  {
    id: "dependency-theory",
    termFa: "نظریهٔ وابستگی",
    termEn: "Dependency theory",
    shortDefFa:
      "نظریه‌ای که کشورهای ثروتمند در نیمکرهٔ شمالی رابطهٔ استعماری جدیدی با کشورهای نیمکرهٔ جنوبی برقرار کردند و کشورهای کم‌توسعه‌یافته را در وابستگی نگاه داشتند.",
  },
  {
    id: "despot",
    termFa: "ستمگر",
    termEn: "Despot",
    shortDefFa:
      "حاکمی با قدرت مطلق که معمولاً آن را به طور ظالمانه و سوء‌استفاده‌آمیز اعمال می‌کند.",
  },
  {
    id: "dictator",
    termFa: "دیکتاتور",
    termEn: "Dictator",
    shortDefFa:
      "حاکم مطلق، به‌خصوص کسی که کنترل مطلق را بدون رضایت آزادانهٔ مردم به دست می‌گیرد و ممکن است قدرت را سرکوب‌کننده اعمال کند.",
  },
  {
    id: "direct-democracy",
    termFa: "دموکراسی مستقیم",
    termEn: "Direct democracy",
    shortDefFa:
      "حکومت توسط مردم در واقع، نه صرفاً در اصل—شهروندان در هر مسئله‌ای که آن‌ها را تأثیر می‌دهد رأی می‌دهند—همانطور که در آتن باستان اجرا می‌شد.",
  },
  {
    id: "divine-right-kings",
    termFa: "حق الهی پادشاهان",
    termEn: "Divine right of kings",
    shortDefFa:
      "نظریه‌ای که معتقد است پادشاه مشروعیت خود را از خدا کسب می‌کند و تابع هیچ اقتدار زمینی نیست.",
  },
  {
    id: "dystopia",
    termFa: "دیستوپیا",
    termEn: "Dystopia",
    shortDefFa:
      "جامعهٔ فرضی‌ای که با شرایط بدبختی، سرکوب و ناکارآمدی اساسی مشخص می‌شود. بر خلاف یوتوپیا که جامعه‌ای ایده‌آل است.",
  },
  {
    id: "economic-structuralism",
    termFa: "ساختارگرایی اقتصادی",
    termEn: "Economic structuralism",
    shortDefFa:
      "باور این‌که سیاست جهانی بر اساس ساختار اقتصادی و نحوهٔ سازماندهی درآمدها و منابع تعیین می‌شود.",
  },
  {
    id: "ecosophy",
    termFa: "ایکو‌فلسفه",
    termEn: "Ecosophy",
    shortDefFa:
      "در سیاست سبز، فلسفهٔ ایکولوژیکی آرنه نیس که هماهنگی یا تعادل ایکولوژیکی را پیشنهاد می‌کند.",
  },
  {
    id: "egalitarianism",
    termFa: "برابرپسندی",
    termEn: "Egalitarianism",
    shortDefFa:
      "فلسفه‌ای که برابری اجتماعی، سیاسی و اقتصادی را دنبال می‌کند.",
  },
  {
    id: "elitism",
    termFa: "نخبه‌گرایی",
    termEn: "Elitism",
    shortDefFa:
      "باور این‌که جامعه باید توسط گروهی نخبه از افراد حکومت‌شود.",
  },
  {
    id: "enlightenment",
    termFa: "روشن‌فکری",
    termEn: "Enlightenment, The",
    shortDefFa:
      "همچنین به عنوان «عصر تعقل» شناخته می‌شود؛ دورهٔ پیشرفت‌های فکری در قرن هجدهم که شامل پرسش‌های درباب درک‌های مذهبی جهان و اعمال عقل بود.",
  },
  {
    id: "extremism",
    termFa: "افراط‌گرایی",
    termEn: "Extremism",
    shortDefFa:
      "هرگونه نظریهٔ سیاسی که سیاست‌های یا اقدامات سازش‌ناپذیر را ترجیح می‌دهد.",
  },
  {
    id: "fabian-society",
    termFa: "انجمن فابی",
    termEn: "Fabian Society",
    shortDefFa:
      "جنبش بریتانیایی که معتقد بود سوسیالیسم باید به‌تدریج از طریق تعلیم و پذیرش تغییرات قانونی تدریجی معرفی شود.",
  },
  {
    id: "fascism",
    termFa: "فاشیسم",
    termEn: "Fascism",
    shortDefFa:
      "ایدئولوژی ملی‌گرایانه‌ای که با رهبری قوی، تأکید بر هویت جمعی و استفاده از خشونت یا جنگ برای پیشبرد منافع دولت مشخص می‌شود. اصطلاح از کلمهٔ ایتالیایی fascio—بسته‌ای از چوب‌ها—برای نشان دادن هویت جمعی ناشی می‌شود.",
  },
  {
    id: "feudal-system",
    termFa: "نظام فئودالی",
    termEn: "Feudal system",
    shortDefFa:
      "نظام سیاسی قرون وسطایی که از واحدهای جغرافیایی کوچک—مانند امارات یا دوکی‌ها—که توسط اشراف حکومت می‌شدند، تشکیل می‌شد.",
  },
  {
    id: "fourth-estate",
    termFa: "سردیِ چهارم",
    termEn: "Fourth estate",
    shortDefFa:
      "نهاد نظری‌ای متشکل از رسانه و سایر اشکال مطبوعات. اصطلاح از سه «سردی»—طبقات مردم—ناشی می‌شود که تا اواخر قرن هجدهم توسط مجمع تشریعی فرانسه شناخته می‌شد: کلیسا، اشراف و شهری‌ها.",
  },
  {
    id: "fundamentalism",
    termFa: "بنیادگرایی",
    termEn: "Fundamentalism",
    shortDefFa:
      "پایبندی سختگیرانه به و ایمان به اصول مذهبی.",
  },
  {
    id: "glasnost",
    termFa: "گلاسنوست",
    termEn: "Glasnost",
    shortDefFa:
      "واژهٔ روسی به معنای «شفافیت»؛ سیاستی که توسط میخائیل گورباچف در اتحاد جماهیر شوروی معرفی شد که دولت را به مسئولیت‌پذیری و بررسی بیشتر متعهد کرد.",
  },
  {
    id: "green-politics",
    termFa: "سیاست‌های سبز",
    termEn: "Green politics",
    shortDefFa:
      "ایدئولوژی متمرکز بر ساخت جامعه‌ای پایدار از نظر ایکولوژیکی.",
  },
  {
    id: "habeas-corpus",
    termFa: "حق حاضری در دادگاه",
    termEn: "Habeas corpus",
    shortDefFa:
      "حق فردی متهم برای حضور شخصی در دادگاه و شنیدن دلایل بازداشت و محاکمه، قبل از هرگونه مجازات یا حبس دراز‌مدت.",
  },
  {
    id: "imperialism",
    termFa: "امپریالیسم",
    termEn: "Imperialism",
    shortDefFa:
      "سیاست گسترش حاکمیت یک ملت از طریق دخالت مستقیم در امور کشورهای دیگر و تصرف سرزمین و تسخیر ملل در ساخت امپراتوری.",
  },
  {
    id: "isolationism",
    termFa: "جدایی‌گرایی",
    termEn: "Isolationism",
    shortDefFa:
      "سیاست خروج یک ملت از اتحادهای نظامی، توافق‌های بین‌المللی و گاهی اوقات حتی تجارت بین‌المللی.",
  },
  {
    id: "junta",
    termFa: "خونتا",
    termEn: "Junta",
    shortDefFa:
      "دسته، جناح یا گروه، اغلب نظامی، که پس از سرنگونی حکومت به قدرت می‌رسد.",
  },
  {
    id: "just-war-theory",
    termFa: "نظریهٔ جنگ عادلانه",
    termEn: "Just war theory",
    shortDefFa:
      "دستورالعمل اخلاقی نظامی متشکل از «Jus ad bellum»—لاتین به معنای «حق برای جنگ»—نیاز به مبنای اخلاقی و قانونی برای جنگ، و «Jus in bello»—لاتین به معنای «عدالت در جنگ»—نیاز به رفتار اخلاقی در جنگ.",
  },
  {
    id: "kleptocracy",
    termFa: "دزدسالاری",
    termEn: "Kleptocracy",
    shortDefFa:
      "فساد سیاسی و دولتی که در آن سیاستمداران، بوروکرات‌ها و دوستان محافظت‌شده آن‌ها قدرت را برای منفعت شخصی خود اعمال می‌کنند. از یونانی به معنای «سلطهٔ دزدان».",
  },
  {
    id: "leftism",
    termFa: "چپ‌گرایی",
    termEn: "Leftism, left wing",
    shortDefFa:
      "ایدئولوژی «چپ» سیاسی. با رویکرد مداخله‌جویانه در رفاه اجتماعی و دیدگاه جهانی‌ مشخص می‌شود. مفهوم در قرن هجدهم فرانسه نشأت گرفت، زمانی که اشرافی که می‌خواستند شرایط دهقانان را بهتر کنند در سمت چپ پادشاه نشستند.",
  },
  {
    id: "legalism",
    termFa: "قانون‌گرایی",
    termEn: "Legalism",
    shortDefFa:
      "فلسفهٔ سیاسی منطقی‌گرایی که در چین در دورهٔ ایالت‌های جنگجو پذیرفته شد و بر اهمیت حفظ حقوق و نظم، در صورت لزوم با استفاده از تنبیه سخت تأکید می‌کرد.",
  },
  {
    id: "liberalism",
    termFa: "لیبرالیسم",
    termEn: "Liberalism",
    shortDefFa:
      "ایدئولوژی سیاسی که بر حقوق و آزادی‌های افراد تأکید می‌کند. لیبرال‌ها می‌توانند طیف گسترده‌ای از سیاست‌ها از جمله دفاع از تجارت آزاد، آزادی بیان و آزادی انجمن مذهبی را پذیرا شوند.",
  },
  {
    id: "liberalism-classic",
    termFa: "لیبرالیسم کلاسیک",
    termEn: "Liberalism, classic",
    shortDefFa:
      "فلسفه‌ای که از قرن هجدهم نشأت می‌گیرد و حقوق فرد را بر حقوق دولت یا کلیسا ترجیح می‌دهد، مخالف استبدادگرایی و حق الهی پادشاهان.",
  },
  {
    id: "libertarianism",
    termFa: "آزادی‌خواهی",
    termEn: "Libertarianism",
    shortDefFa:
      "حمایت از آزادی و اراده آزاد. می‌تواند در چپ و راست سیاسی یافت شود و شامل باورهایی مانند خود‌اتکایی، تعقل و عدم‌تدخل دولت در امور اقتصادی و شخصی است.",
  },
  {
    id: "machiavellian",
    termFa: "ماکیاولی‌گری",
    termEn: "Machiavellian",
    shortDefFa:
      "فعالیت سیاسی که هوشیارانه، آمیخته با تشکک و فرصت‌طلبانه است. از نیکولو ماکیاولی، نظریه‌پرداز سیاسی فلورنسی قرن شانزدهم.",
  },
  {
    id: "maoism",
    termFa: "مائویسم",
    termEn: "Maoism",
    shortDefFa:
      "شکل‌ی از مارکسیسم-لنینیسم برگرفته از آموزه‌های مائو زدونگ. مرکزی‌ترین اصل این است که دهقانی کشاورزی می‌تواند جای طبقهٔ کارگری را برای حمایت از انقلاب بگیرد.",
  },
  {
    id: "marxian-socialism",
    termFa: "سوسیالیسم مارکسی",
    termEn: "Marxian socialism",
    shortDefFa:
      "مرحله‌ای از توسعهٔ اقتصادی که مارکس معتقد بود مرحله‌ای ضروری در انتقال از سرمایه‌داری به کمونیسم است.",
  },
  {
    id: "marxism",
    termFa: "مارکسیسم",
    termEn: "Marxism",
    shortDefFa:
      "فلسفه‌ای زیربنایی نوشته‌های کارل مارکس که پیشنهاد می‌کند ترتیب اقتصادی جامعه روابط سیاسی و اجتماعی را در آن تعیین می‌کند.",
  },
  {
    id: "marxism-leninism",
    termFa: "مارکسیسم-لنینیسم",
    termEn: "Marxism-Leninism",
    shortDefFa:
      "ایدئولوژی‌ای مبتنی بر نظریات کارل مارکس و ولادیمیر لنین که برای ایجاد جامعهٔ کمونیستی بین‌المللی فراخوان می‌کند.",
  },
  {
    id: "meritocracy",
    termFa: "شایستگی‌سالاری",
    termEn: "Meritocracy",
    shortDefFa:
      "باور این‌که حاکمان باید بر اساس توانایی، نه ثروت یا تبار انتخاب شوند.",
  },
  {
    id: "moral-absolutism",
    termFa: "مطلق‌گرایی اخلاقی",
    termEn: "Moral absolutism",
    shortDefFa:
      "فلسفه‌ای مبتنی بر تصور این‌که اخلاقیات باید راهنمای مطلق کنش‌های انسانی، به‌خصوص در حقوق بین‌الملل باشد.",
  },
  {
    id: "multilateralism",
    termFa: "چندجانبه‌گری",
    termEn: "Multilateralism",
    shortDefFa:
      "همکاری کشورهای متعدد در روابط بین‌المللی. نقطه مقابل یک‌جانبه‌گری.",
  },
  {
    id: "nationalism",
    termFa: "ملی‌گرایی",
    termEn: "Nationalism",
    shortDefFa:
      "وفاداری و اختصاص به ملت میهن و باور سیاسی این‌که منافع آن باید هدف بنیادی سیاست باشد.",
  },
  {
    id: "natural-law",
    termFa: "حقوق طبیعی",
    termEn: "Natural law",
    shortDefFa:
      "مفهومی که قوانین مثبت و عادلانه بر «قانون برتر» استوار هستند—در اصل توسط توماس آکویناس به عنوان منعکس‌کنندهٔ قانون‌های جاودانی خدا که جهان را راهنمایی می‌کند تعریف شد—که توسط عقل مشترک در اکثر مردم شهادت می‌شود.",
  },
  {
    id: "negritude",
    termFa: "نگریتود",
    termEn: "Négritude",
    shortDefFa:
      "موضع ایدئولوژیکی همبستگی بر مبنای هویت مشترک سیاه‌فریقایی که توسط روشن‌فکران فرانسوی در دهلوی ۱۹۳۰ در پاسخ به نژادپرستی استعمار فرانسه توسعه یافت.",
  },
  {
    id: "oligarchy",
    termFa: "نخبه‌سالاری",
    termEn: "Oligarchy",
    shortDefFa:
      "شکل حکومتی که در آن قدرت در دست گروهی کوچک است و معمولاً برای منفعت آن‌ها اعمال می‌شود، معمولاً به ضرر جمعیت عام.",
  },
  {
    id: "pacifism",
    termFa: "صلح‌طلبی",
    termEn: "Pacifism",
    shortDefFa:
      "مخالفت و کمپین علیه جنگ و خشونت به‌عنوان ابزار حل منازعات، معمولاً بر مبنای دلایل مذهبی یا اخلاقی. اصطلاح توسط فعال صلح فرانسوی امیل آرنود ایجاد شد.",
  },
  {
    id: "partisan",
    termFa: "حزب‌گرا",
    termEn: "Partisan",
    shortDefFa:
      "طرفدار کامل رهبر، حزب یا موضوع سیاسی خاصی که معمولاً وفاداری بی‌پرسش از خود نشان می‌دهد.",
  },
  {
    id: "perestroika",
    termFa: "پرستروئیکا",
    termEn: "Perestroika",
    shortDefFa:
      "بازسازی سیاسی، بوروکراتیک یا اقتصادی نظام یا سازمان. از روسی به معنای «بازسازی»؛ ابتدا توسط میخائیل گورباچف برای توصیف اصلاحات سیستم کمونیستی استفاده شد.",
  },
  {
    id: "pluralism",
    termFa: "چندسویه‌گری",
    termEn: "Pluralism",
    shortDefFa:
      "باور در جامعه‌ای که گروه‌های اجتماعی و نژادی متنوع می‌توانند فرهنگ‌های سنتی و منافع خود را درکنار یکدیگر و به آزادی بیان کنند.",
  },
  {
    id: "plutocracy",
    termFa: "ثروت‌سالاری",
    termEn: "Plutocracy",
    shortDefFa:
      "حکومتی که توسط یا تا حد زیادی تحت تأثیر ثروتمندان جامعه است.",
  },
  {
    id: "popular-sovereignty",
    termFa: "حاکمیت مردمی",
    termEn: "Popular sovereignty",
    shortDefFa:
      "نظریه‌ای که اقتدار سیاسی حاکم در دست و برابر میان شهروندان یک دولت است که این اقتدار را به دولت، حکومت آن و رهبران سیاسی ارائه می‌دهند.",
  },
  {
    id: "progressivism",
    termFa: "پیش‌روی‌گری",
    termEn: "Progressivism",
    shortDefFa:
      "دکتری پیشرفت سیاسی میانه رو به سمت شرایط بهتر در حکومت و جامعه.",
  },
  {
    id: "proletariat",
    termFa: "پرولتاریا",
    termEn: "Proletariat",
    shortDefFa:
      "در نظریهٔ مارکسی، کارگران یک ملت که مالکیتی ندارند و باید برای زندگی کار خود را بفروشند. مارکس معتقد بود که حتمی است که پرولتاریا برخاسته و سرمایه‌داران را سرنگون کند و سیستم کمونیستی برپا کند.",
  },
  {
    id: "radicalism",
    termFa: "رادیکالیسم",
    termEn: "Radicalism",
    shortDefFa:
      "حمایت از تغییرات بنیادی و شدید برای دستیابی به اهداف سیاسی. همچنین به باورهایی اشاره می‌کند که انحراف قابل‌توجهی از باورهای رایج یا موضعات سنتی دارند.",
  },
  {
    id: "reactionism",
    termFa: "واکنش‌گرایی",
    termEn: "Reactionism",
    shortDefFa:
      "جهتگیری سیاسی که مخالف تغییرات اجتماعی رادیکال است و به جای آن بازگشت به نظام سیاسی یا اجتماعی پیشین را ترجیح می‌دهد.",
  },
  {
    id: "realpolitik",
    termFa: "سیاست‌واقع‌گرایانه",
    termEn: "Realpolitik",
    shortDefFa:
      "سیاست عملی و واقع‌گرایانه که بر اساس منافع ملی تعریف‌شده است، بیشتر از آن‌که توسط ایدئولوژی یا اهداف اخلاقی حاکم شود.",
  },
  {
    id: "republicanism",
    termFa: "جمهوری‌خواهی",
    termEn: "Republicanism",
    shortDefFa:
      "باور این‌که جمهوری—دولتی بدون پادشاه که قدرت در دست مردم قرار دارد و توسط نمایندگان انتخاب‌شدهٔ آن‌ها اعمال می‌شود—بهترین شکل حکومت است.",
  },
  {
    id: "rightism",
    termFa: "راست‌گرایی",
    termEn: "Rightism, right wing",
    shortDefFa:
      "ایدئولوژی «راست» سیاسی که به‌طور کلی به نفع نگرش محافظه‌کار و طرفدار بازار تعریف می‌شود، ترجیح برای حقوق فردی بر حکومت مداخله‌جو، و ملی‌گرایی.",
  },
  {
    id: "segregationism",
    termFa: "تفکیک‌گرایی",
    termEn: "Segregationism",
    shortDefFa:
      "باور در ضرورت جدایی نژادهای مختلف، طبقات یا گروه‌های قومی از یکدیگر.",
  },
  {
    id: "sharia-law",
    termFa: "حقوق شریعت",
    termEn: "Sharia law",
    shortDefFa:
      "مجموعهٔ قوانین الهی در اسلام که زندگی مذهبی و سکولار مسلمانان را حاکم می‌کند. برخی مسلمانان استدلال می‌کنند که شریعت تنها مبنای قانونی مشروع است.",
  },
  {
    id: "social-contract",
    termFa: "قرارداد اجتماعی",
    termEn: "Social contract",
    shortDefFa:
      "توافق واقعی یا نظری بین افراد برای تشکیل جامعهٔ سازمان‌یافته، یا بین افراد و حاکم برای تعریف محدودیت، حقوق و وظایف هرکدام.",
  },
  {
    id: "social-democracy",
    termFa: "دموکراسی اجتماعی",
    termEn: "Social democracy",
    shortDefFa:
      "جنبشی سیاسی اصلاحی که انتقال تدریجی از سرمایه‌داری به سوسیالیسم از طریق روش‌های صلح‌آمیز و دموکراتیک را پیشنهاد می‌کند.",
  },
  {
    id: "socialism",
    termFa: "سوسیالیسم",
    termEn: "Socialism",
    shortDefFa:
      "ایدئولوژی و روش حکومتی که مالکیت و تنظیم دولتی صنعت و کنترل مرکزی بر تخصیص منابع را به جای اجازه دادن به نیروهای بازار پیشنهاد می‌کند.",
  },
  {
    id: "sovereignty",
    termFa: "حاکمیت",
    termEn: "Sovereignty",
    shortDefFa:
      "قدرت عالی همانطور که توسط دولتی خودمختار یا حاکم مستقل اعمال می‌شود، فارغ از هرگونه نفوذ یا کنترل خارجی.",
  },
  {
    id: "state-of-nature",
    termFa: "حالت طبیعی",
    termEn: "State of nature",
    shortDefFa:
      "در نظریهٔ قرارداد اجتماعی، شرط فرضی که پیش از ظهور حکومت سازمان‌یافته وجود داشت.",
  },
  {
    id: "suffrage",
    termFa: "حق رأی",
    termEn: "Suffrage",
    shortDefFa:
      "حق رأی دادن در انتخابات یا رفراندوم. حق رأی جهانی به حق رأی شهروندان صرف‌نظر از جنسیت، نژاد، وضعیت اجتماعی یا ثروت اشاره می‌کند.",
  },
  {
    id: "syndicalism",
    termFa: "تشکل‌گرایی",
    termEn: "Syndicalism",
    shortDefFa:
      "ایدئولوژی اوایل قرن بیستم که تصرف وسایل تولید از طریق اعتصاب عمومی کارگران و سازماندهی تولید درون فدراسیون تشکل‌های محلی را پیشنهاد می‌کرد. به‌خصوص در فرانسه و اسپانیا محبوب بود.",
  },
  {
    id: "theocracy",
    termFa: "دین‌سالاری",
    termEn: "Theocracy",
    shortDefFa:
      "نظام حکومتی که توسط کاهنان یا یک فرد خود‌خوانده‌ای «خدای زنده» سازمان‌یافته و رهبری می‌شود، معمولاً بر اساس نظریهٔ مذهبی یا ادعای مداخلهٔ الهی.",
  },
  {
    id: "totalitarianism",
    termFa: "کل‌نگری سیاسی",
    termEn: "Totalitarianism",
    shortDefFa:
      "رژیمی که حقوق فرد را به نفع منافع دولت تابع می‌کند، از طریق کنترل امور سیاسی و اقتصادی و تجویز نگرش‌ها، ارزش‌ها و باورهای جمعیت.",
  },
  {
    id: "unilateralism",
    termFa: "یک‌جانبه‌گری",
    termEn: "Unilateralism",
    shortDefFa:
      "هرگونه اقدام انجام‌شده به طریقی یک‌طرفه. در سیاست، اغلب کشورهایی را توصیف می‌کند که امور خارجی را به طریقی فردی برگزار می‌کنند، با مشورهٔ کمینه با دیگر کشورها.",
  },
  {
    id: "utilitarianism",
    termFa: "سودمندارایی",
    termEn: "Utilitarianism",
    shortDefFa:
      "شاخه‌ای از فلسفهٔ اجتماعی توسط جرمی بنتام توسعه یافت که بهترین سیاست در هر لحظه‌ای سیاستی است که بیشترین خوشبختی را برای بیشترین تعداد مردم فراهم می‌کند.",
  },
  {
    id: "utopia",
    termFa: "جهان‌ایده‌آل",
    termEn: "Utopia",
    shortDefFa:
      "مکان ایده‌آلی کاملاً بهتر. در سیاست، «یوتوپیا» برای هر سیستم که هدف آن ایجاد جامعه‌ای ایده‌آل است اعمال می‌شود.",
  },
  {
    id: "womens-suffrage",
    termFa: "حق رأی زنان",
    termEn: "Women's suffrage",
    shortDefFa:
      "حق رأی دادن زنان بر بنیاد برابر با مردان، همانطور که در اوایل قرن بیستم توسط فعالانی مانند «suffragettes» تبلیغ می‌شد.",
  },
];

export const glossaryById: Record<string, GlossaryTerm> = Object.fromEntries(
  glossary.map((t) => [t.id, t]),
);
