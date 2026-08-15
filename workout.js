(function () {
  'use strict';

  const STORAGE_KEY = 'personal-tools.workout.v3';
  const VALID_VIEWS = new Set(['today', 'a', 'b', 'core', 'bar', 'quick']);
  const LEGACY_VIEWS = { min: 'quick', regular: 'core', full: 'a' };
  const HARD_BAR_IDS = ['assisted-pullup', 'negative-pullup', 'strict-pullup'];

  function localDayKey(date) {
    const value = date || new Date();
    return [
      value.getFullYear(),
      String(value.getMonth() + 1).padStart(2, '0'),
      String(value.getDate()).padStart(2, '0')
    ].join('-');
  }

  const SOURCES = {
    hprc: {
      label: 'HPRC · первое подтягивание',
      url: 'https://www.hprc-online.org/physical-fitness/training-performance/train-above-bar-achieving-your-first-pull'
    },
    ukk: {
      label: 'UKK Institute · упражнения для бегунов',
      url: 'https://ukkinstituutti.fi/wp-content/uploads/2024/06/TheRunRCTHipAndCoreProgram.pdf'
    },
    pike: {
      label: 'NASM · отжимание уголком',
      url: 'https://www.nasm.org/resource-center/exercise-library/pike-push-up'
    },
    squat: {
      label: 'NASM · присед на одной ноге',
      url: 'https://www.nasm.org/resource-center/exercise-library/single-leg-squat'
    },
    walkout: {
      label: 'Physitrack · выходы пятками',
      url: 'https://us.physitrack.com/home-exercise-video/hamstring-walkout'
    },
    bear: {
      label: 'Physitrack · медвежья планка',
      url: 'https://au.physitrack.com/home-exercise-video/shoulder-taps-in-bear-crawl'
    },
    side: {
      label: 'Physitrack · боковая планка с ногой',
      url: 'https://ca.physitrack.com/home-exercise-video/side-plank-with-arm-and-leg-lift'
    },
    hollow: {
      label: 'Physitrack · hollow hold',
      url: 'https://us.physitrack.com/home-exercise-video/hollow-body-hold-with-arms-overhead'
    },
    deadbug: {
      label: 'NASM · Dead bug',
      url: 'https://www.nasm.org/resource-center/exercise-library/dead-bug'
    }
  };

  const EXERCISES = {
    'warm-flow': {
      name: 'Короткая разминка',
      en: 'Travel warm-up flow',
      category: 'mobility',
      diagram: 'warm-flow',
      trackResult: false,
      sets: 1,
      dose: '4 минуты',
      rest: 'без отдыха',
      cues: ['Круги кистями → кошка-корова → выпад с поворотом.', 'Двигаться спокойно и не тянуться через боль.'],
      mistake: 'Превращать разминку в отдельную утомительную тренировку.',
      easier: 'По 3 медленных повтора каждого движения.',
      harder: 'Не нужно: цель — разогреться, а не устать.'
    },
    'split-squat': {
      name: 'Сплит-присед 1½',
      en: '1½-rep split squat',
      category: 'legs',
      diagram: 'split-squat',
      sets: 3,
      dose: '3 × 6–8 / сторона',
      rest: '75 с после пары',
      cues: ['Вся передняя стопа прижата к полу.', 'Вниз → наполовину вверх → снова вниз → вверх.'],
      mistake: 'Отталкиваться задней ногой или заваливать колено внутрь.',
      easier: 'Обычный обратный выпад, 3 × 8 / сторона.',
      harder: 'Скейтер-присед к сложенному коврику.',
      source: SOURCES.ukk
    },
    'archer-pushup': {
      name: 'Отжимание лучника',
      en: 'Archer push-up',
      category: 'push',
      diagram: 'archer-pushup',
      sets: 3,
      dose: '3 × 4–8 / сторона',
      rest: '75 с после пары',
      cues: ['Грудь движется к рабочей ладони.', 'Корпус и таз остаются одной линией.'],
      mistake: 'Разворачивать таз или сокращать амплитуду ради повторения.',
      easier: 'Обычные медленные отжимания или вариант с колен.',
      harder: 'Сильнее разгружать прямую руку: переносить больше веса на сгибающуюся, сохраняя полную амплитуду.',
      source: {
        label: 'NASM · Archer Push-up',
        url: 'https://www.nasm.org/resource-center/exercise-library/archer-push-up'
      }
    },
    'hamstring-walkout': {
      name: 'Выходы пятками из моста',
      en: 'Hamstring walkout',
      category: 'posterior',
      diagram: 'hamstring-walkout',
      sets: 3,
      dose: '3 × 6–10 выходов',
      rest: '60 с',
      cues: ['Один повтор — короткими шагами наружу и обратно.', 'Удерживать таз высоко, пока пятки шагают наружу и обратно.'],
      mistake: 'Проваливать таз или шагать слишком далеко сразу.',
      easier: 'Ягодичный мост с пятками дальше от таза, 3 × 10.',
      harder: 'В дальней точке задержись на 2 секунды, удерживая таз высоким.',
      source: SOURCES.walkout
    },
    'calf-raise': {
      name: 'Подъём на носок · прямая нога',
      en: 'Single-leg calf raise',
      category: 'calves',
      diagram: 'calf-raise',
      sets: 3,
      dose: '3 × 12–20 / сторона',
      rest: '45 с',
      cues: ['Подниматься через большой палец, не наружный край.', 'Полная амплитуда, опускание 2–3 секунды.'],
      mistake: 'Пружинить внизу или заваливать голеностоп наружу.',
      easier: 'Две ноги; рукой лишь слегка держаться за стену.',
      harder: 'Одна нога, пауза 2 секунды наверху.'
    },
    'rkc-plank': {
      name: 'Жёсткая планка',
      en: 'RKC / long-lever plank',
      category: 'core',
      diagram: 'rkc-plank',
      sets: 3,
      dose: '3 × 15–30 с',
      seconds: 20,
      rest: '45 с',
      cues: ['Локти тянутся к стопам, стопы — к локтям.', 'Выдыхать, не прогибая поясницу и не поднимая таз.'],
      mistake: 'Держать дольше после того, как поясница начала провисать.',
      easier: 'Обычная планка на предплечьях.',
      harder: 'Поставить локти чуть дальше вперёд, сохранив прежнее время удержания.'
    },
    'side-plank-leg': {
      name: 'Боковая планка + верхняя нога',
      en: 'Side plank with leg lift',
      category: 'core',
      diagram: 'side-plank-leg',
      sets: 2,
      dose: '2 × 15–25 с / сторона',
      seconds: 20,
      rest: '30–45 с',
      cues: ['Таз слегка подан вперёд.', 'Верхнюю пятку тянуть вдаль, а не высоко.'],
      mistake: 'Разворачивать грудь к полу или проседать в плече.',
      easier: 'Нижнее колено на коврике.',
      harder: 'Вытянуть верхнюю руку над головой, не опуская верхнюю ногу.',
      source: SOURCES.side
    },
    'reverse-crunch': {
      name: 'Обратное скручивание',
      en: 'Reverse crunch',
      category: 'core',
      diagram: 'reverse-crunch',
      sets: 2,
      dose: '2 × 8–12',
      rest: '45 с',
      cues: ['Подкручивать таз к рёбрам.', 'Опускать крестец медленно, без маха ногами.'],
      mistake: 'Раскачиваться или просто подтягивать колени без подкручивания таза.',
      easier: 'Сильнее согнуть колени и уменьшить амплитуду.',
      harder: 'Опускание 3 секунды, руки не давят в пол.',
      source: {
        label: 'ACE · Reverse crunch',
        url: 'https://www.acefitness.org/resources/everyone/exercise-library/76/reverse-crunch/'
      }
    },
    'pogo': {
      name: 'Низкие пружинящие прыжки',
      en: 'Low pogo hops',
      category: 'run',
      diagram: 'pogo',
      sets: 3,
      dose: '3 × 10 с',
      seconds: 10,
      rest: '40–50 с',
      cues: ['Сначала 1–2 минуты марша, подъёмов на носки и пробных прыжков.', 'Прыгать низко, тихо и упруго; колени остаются мягкими.'],
      mistake: 'Добавлять прыжки при боли в ахилле, стопе или голени.',
      easier: 'Пропустить прыжки или заменить их быстрыми подъёмами на носки: передняя часть стопы остаётся на полу.',
      harder: 'Сначала добавить ещё один 10-секундный подход; высоту прыжка не увеличивать.',
      source: {
        label: 'Scientific Reports · исследование пружинящих прыжков',
        url: 'https://www.nature.com/articles/s41598-023-30798-3'
      }
    },
    'skater-squat': {
      name: 'Скейтер-присед к коврику',
      en: 'Skater squat',
      category: 'legs',
      diagram: 'skater-squat',
      sets: 3,
      dose: '3 × 5–8 / сторона',
      rest: '75 с после пары',
      cues: ['Садиться назад-вниз на одной ноге.', 'Касаться сложенного коврика задним коленом мягко.'],
      mistake: 'Падать на опору или терять контакт большого пальца с полом.',
      easier: 'Обратный выпад с подъёмом колена.',
      harder: 'Уменьшить высоту опоры или задержать заднее колено в 1–2 см над ней.',
      source: SOURCES.squat
    },
    'pike-pushup': {
      name: 'Отжимание уголком',
      en: 'Pike push-up',
      category: 'push',
      diagram: 'pike-pushup',
      sets: 3,
      dose: '3 × 5–10',
      rest: '75 с после пары',
      cues: ['Макушка идёт между ладонями, не перед ними.', 'Локти направлены назад по диагонали.'],
      mistake: 'Превращать движение в обычное отжимание с опущенным тазом.',
      easier: 'Меньше амплитуда или руки на устойчивой низкой опоре.',
      harder: 'Опускание 4 секунды или стопы ближе к ладоням.',
      source: SOURCES.pike
    },
    'single-leg-rdl': {
      name: 'Румынская тяга на одной ноге',
      en: 'Single-leg RDL',
      category: 'posterior',
      diagram: 'single-leg-rdl',
      sets: 3,
      dose: '3 × 8–12 / сторона',
      rest: '60 с',
      cues: ['Макушка и поднятая пятка расходятся в разные стороны.', 'Не разворачивать таз: обе тазовые кости направлены к полу.'],
      mistake: 'Скручиваться или приседать вместо движения тазом назад.',
      easier: 'Оставить носок второй ноги на полу для равновесия.',
      harder: 'В нижней точке медленно раскрыть таз в сторону, затем снова выровнять его к полу.'
    },
    'soleus-raise': {
      name: 'Подъём на носок · согнутое колено',
      en: 'Bent-knee soleus raise',
      category: 'calves',
      diagram: 'soleus-raise',
      sets: 3,
      dose: '3 × 15–25 / сторона',
      rest: '45 с',
      cues: ['Колено остаётся согнутым во всём повторении.', 'Подъём высокий, опускание контролируемое.'],
      mistake: 'Выпрямлять колено или пружинить в нижней точке.',
      easier: 'Две ноги одновременно.',
      harder: 'Пауза 2 секунды наверху на одной ноге.'
    },
    'bear-tap': {
      name: 'Медвежья планка + касания плеч',
      en: 'Bear plank shoulder taps',
      category: 'core',
      diagram: 'bear-tap',
      sets: 3,
      dose: '3 × 6–10 / сторона',
      rest: '45 с',
      cues: ['Колени в 2–3 см от пола.', 'Касаться плеча, не двигая тазом.'],
      mistake: 'Раскачиваться из стороны в сторону или задерживать дыхание.',
      easier: 'Расставить стопы шире.',
      harder: 'Сузить постановку стоп или задержать ладонь на противоположном плече на 1–2 секунды.',
      source: SOURCES.bear
    },
    'side-plank-dip': {
      name: 'Боковая планка с опусканием таза',
      en: 'Side plank hip dip',
      category: 'core',
      diagram: 'side-plank-dip',
      sets: 2,
      dose: '2 × 8–12 / сторона',
      rest: '30–45 с',
      cues: ['Плечо остаётся над локтем.', 'Двигать тазом, не проваливаясь в плечо.'],
      mistake: 'Разворачивать корпус вместо того, чтобы опускать и поднимать таз.',
      easier: 'Нижнее колено на коврике.',
      harder: 'Верхняя нога поднята.',
      source: SOURCES.ukk
    },
    'dead-bug': {
      name: 'Мёртвый жук',
      en: 'Dead bug',
      category: 'core',
      diagram: 'dead-bug',
      sets: 2,
      dose: '2 × 6–10 / сторона',
      rest: '30–45 с',
      cues: ['Прижимать поясницу к коврику.', 'Полностью выдыхать, выпрямляя руку и ногу.'],
      mistake: 'Опускать руку и ногу так низко, что поясница отрывается от пола.',
      easier: 'Двигать только ногами: колени согнуты, пятки поочерёдно касаются пола, руки остаются над грудью.',
      harder: 'Пауза 3 секунды в вытянутом положении.',
      source: SOURCES.deadbug
    },
    'side-plank-reach': {
      name: 'Боковая планка с проносом руки',
      en: 'Side plank reach-through',
      category: 'core',
      diagram: 'side-plank-reach',
      sets: 3,
      dose: '3 × 6–10 / сторона',
      rest: '30–45 с',
      cues: ['Повернуть грудную клетку, держа таз высоким.', 'Вернуться и потянуться рукой к потолку.'],
      mistake: 'Вращаться только плечом, теряя линию таза.',
      easier: 'Нижнее колено на полу.',
      harder: 'Ноги вместе и более медленный пронос.',
      source: SOURCES.ukk
    },
    'hollow-hold': {
      name: 'Лодочка',
      en: 'Hollow body hold',
      category: 'core',
      diagram: 'hollow-hold',
      sets: 3,
      dose: '3 × 15–30 с',
      seconds: 20,
      rest: '45 с',
      cues: ['Прижать поясницу и поднять лопатки.', 'Выбрать высоту ног, на которой спина не отрывается.'],
      mistake: 'Опускать ноги так низко, что поясница отрывается от коврика.',
      easier: 'Согнуть колени или держать руки вдоль тела.',
      harder: 'Опустить прямые ноги чуть ниже или добавить небольшие перекаты всем телом, не теряя форму «лодочки».',
      source: SOURCES.hollow
    },
    'reverse-plank': {
      name: 'Обратная планка',
      en: 'Reverse plank',
      category: 'core',
      diagram: 'reverse-plank',
      sets: 2,
      dose: '2 × 20–30 с',
      seconds: 25,
      rest: '45 с',
      cues: ['Толкать пол ладонями и раскрывать грудь.', 'Сжать ягодицы и держать длинную линию тела.'],
      mistake: 'Запрокидывать голову или проваливаться между плечами вместо активного толчка ладонями.',
      easier: 'Согнуть колени — получится обратный стол.',
      harder: 'Поочерёдно отрывать одну стопу от пола, не разворачивая таз.'
    },
    'reverse-lunge': {
      name: 'Обратный выпад + колено вверх',
      en: 'Reverse lunge to knee drive',
      category: 'legs',
      diagram: 'reverse-lunge',
      sets: 2,
      dose: '2 × 8 / сторона',
      rest: '30 с',
      cues: ['Шагнуть назад и толкнуть пол всей передней стопой.', 'Наверху — секундная пауза на одной ноге.'],
      mistake: 'Падать вперёд или отталкиваться носком задней ноги.',
      easier: 'Обычный обратный выпад без баланса наверху.',
      harder: 'Опускание 3 секунды.',
      source: SOURCES.ukk
    },
    'pushup': {
      name: 'Сложный вариант отжиманий',
      en: 'Push-up progression',
      category: 'push',
      diagram: 'pushup',
      sets: 2,
      dose: '2 × 6–12',
      rest: '45 с',
      cues: ['Выбрать вариант и остановиться, пока в запасе остаются 1–3 чистых повтора.', 'Грудь и таз поднимаются вместе.'],
      mistake: 'Делать короткую амплитуду ради числа повторений.',
      easier: 'Руки на устойчивой опоре или колени на коврике.',
      harder: 'Отжимание лучника, ладони ближе к тазу или опускание 4 секунды.',
      source: {
        label: 'NASM · Push-up',
        url: 'https://www.nasm.org/resource-center/exercise-library/push-up'
      }
    },
    'active-hang': {
      name: 'Активный вис',
      en: 'Active hang',
      category: 'bar',
      diagram: 'active-hang',
      sets: 4,
      dose: '4 × 10–20 с',
      seconds: 15,
      rest: '60 с',
      cues: ['Локти прямые; плечи мягко опущены от ушей.', 'Без прогиба и раскачивания.'],
      mistake: 'Сгибать локти или продолжать вис при резкой боли в плече.',
      easier: 'Оставить носки на земле и разгрузить часть веса.',
      harder: 'Постепенно увеличивать вис, не превышая 20–30 секунд с чистой техникой.',
      source: SOURCES.hprc
    },
    'scap-pull': {
      name: 'Лопаточное подтягивание',
      en: 'Scapular pull-up',
      category: 'bar',
      diagram: 'scap-pull',
      sets: 4,
      dose: '4 × 5–8',
      rest: '60–75 с',
      cues: ['Руки прямые: двигаются только лопатки.', 'Опустить плечи и чуть поднять грудь.'],
      mistake: 'Превращать движение в короткое подтягивание локтями.',
      easier: 'Носки на полу, часть веса остаётся на ногах.',
      harder: 'Пауза 2 секунды с плечами, опущенными от ушей.',
      source: SOURCES.hprc
    },
    'assisted-pullup': {
      name: 'Подтягивание с опорой ног',
      en: 'Foot-assisted pull-up',
      category: 'bar',
      diagram: 'assisted-pullup',
      sets: 4,
      dose: '4 × 4–6',
      rest: '90 с',
      cues: ['Тянуться вертикально; ноги помогают ровно настолько, насколько нужно.', 'Начинать лопатками и опускаться 3 секунды.'],
      mistake: 'Превращать движение в горизонтальную тягу или резко отталкиваться ногами.',
      easier: 'Выше опора ног, больше помощи.',
      harder: 'Меньше помощи ног при той же полной амплитуде.',
      source: SOURCES.hprc
    },
    'negative-pullup': {
      name: 'Удержание + медленный спуск',
      en: 'Top hold + negative pull-up',
      category: 'bar',
      diagram: 'negative-pullup',
      sets: 3,
      dose: '3 × 1–2 спуска по 5–8 с',
      seconds: 6,
      rest: '90–120 с',
      cues: ['Использовать низкую перекладину или устойчивую ступень, чтобы занять верхнее положение без прыжка.', 'Опускаться равномерно; закончить подход, если следующий спуск уже нельзя контролировать хотя бы 3 секунды.'],
      mistake: 'Запрыгивать на высокую перекладину или после всех медленных спусков добавлять попытки обычных подтягиваний.',
      easier: 'Спуск 3 секунды с лёгкой опорой ног.',
      harder: 'До 8 секунд; затем переход к чистым одиночным.',
      source: SOURCES.hprc
    },
    'strict-pullup': {
      name: 'Чистые одиночные подтягивания',
      en: 'Strict pull-up single',
      category: 'bar',
      diagram: 'strict-pullup',
      sets: 5,
      dose: '3–5 × 1 чистое повторение',
      rest: '2–3 минуты',
      cues: ['Старт из активного виса, без раскачки.', 'Подбородок над перекладиной; остановиться, пока следующий повтор ещё получается чисто.'],
      mistake: 'Считать неудачные попытки рабочими одиночными или помогать киппингом.',
      easier: 'Если сегодня получаются только 1–2 чистых подтягивания — выполнить их и закончить 2–3 подходами с опорой ног.',
      harder: 'До 5 одинаково чистых одиночных с полным отдыхом.',
      source: SOURCES.hprc
    }
  };

  const BASE_PLANS = {
    a: {
      id: 'a',
      kicker: 'Силовая A',
      name: 'Ноги, отжимания и планки',
      desc: 'Сплит-приседы, выходы из моста, отжимания, икры и три упражнения на пресс.',
      duration: '35–40 мин',
      load: 'нагрузка на ноги: высокая',
      sections: [
        { id: 'warm', title: 'Разминка', meta: '4 минуты', items: ['warm-flow'] },
        { id: 'pair-one', title: 'Силовая пара 1', meta: 'A1 → A2 → 75 с · 3 круга', flow: 'rounds', rest: '10–15 с переход · 75 с после пары', items: ['split-squat', 'archer-pushup'] },
        { id: 'pair-two', title: 'Силовая пара 2', meta: 'B1 → B2 → 60 с · 3 круга', flow: 'rounds', rest: '10–15 с переход · 60 с после пары', items: ['hamstring-walkout', 'calf-raise'] },
        { id: 'core', title: 'Пресс и планки', meta: '2 круга · 10–15 с переход · 45–60 с после круга', flow: 'rounds', rest: '10–15 с переход · 45–60 с после круга', items: [{ id: 'rkc-plank', sets: 2, dose: '2 × 15–30 с' }, 'side-plank-leg', 'reverse-crunch'] }
      ]
    },
    b: {
      id: 'b',
      kicker: 'Силовая B',
      name: 'Ноги, плечи и боковые планки',
      desc: 'Скейтер-приседы, тяга на одной ноге, отжимания уголком, икры и боковые планки.',
      duration: '35–42 мин',
      load: 'нагрузка на ноги: высокая',
      sections: [
        { id: 'warm', title: 'Разминка', meta: '4 минуты', items: ['warm-flow'] },
        { id: 'elastic', title: 'Прыжки для бега', meta: 'только если стопа и ахилл спокойны', items: ['pogo'] },
        { id: 'pair-one', title: 'Силовая пара 1', meta: 'A1 → A2 → 75 с · 3 круга', flow: 'rounds', rest: '10–15 с переход · 75 с после пары', items: ['skater-squat', 'pike-pushup'] },
        { id: 'pair-two', title: 'Силовая пара 2', meta: 'B1 → B2 → 60 с · 3 круга', flow: 'rounds', rest: '10–15 с переход · 60 с после пары', items: ['single-leg-rdl', 'soleus-raise'] },
        { id: 'core', title: 'Пресс и планки', meta: '2 круга · 10–15 с переход · 45–60 с после круга', flow: 'rounds', rest: '10–15 с переход · 45–60 с после круга', items: [{ id: 'bear-tap', sets: 2, dose: '2 × 6–10 / сторона' }, 'side-plank-dip', 'dead-bug'] }
      ]
    },
    core: {
      id: 'core',
      kicker: 'Короткая тренировка',
      name: 'Пресс и планки',
      desc: 'Планки и упражнения на пресс, почти без нагрузки на ноги.',
      duration: '15–18 мин',
      load: 'нагрузка на ноги: низкая',
      sections: [
        { id: 'warm', title: 'Разминка', meta: '2 минуты', items: [{ id: 'warm-flow', sets: 1, dose: '2 минуты' }] },
        { id: 'circuit', title: 'Основной круг', meta: '3 круга · 10–15 с переход · 45–60 с после круга', flow: 'rounds', rest: '10–15 с переход · 45–60 с после круга', items: ['rkc-plank', 'side-plank-reach', 'hollow-hold', { id: 'reverse-crunch', sets: 3, dose: '3 × 8–12' }, 'bear-tap'] },
        { id: 'finish', title: 'В конце', meta: '2 подхода', items: ['reverse-plank'] }
      ]
    },
    quick: {
      id: 'quick',
      kicker: 'На 20 минут',
      name: 'Короткая силовая',
      desc: 'Ноги, отжимания, задняя поверхность бедра и планки — два круга.',
      duration: '18–22 мин',
      load: 'нагрузка на ноги: средняя',
      sections: [
        { id: 'warm', title: 'Разминка', meta: '2 минуты', items: [{ id: 'warm-flow', sets: 1, dose: '2 минуты' }] },
        { id: 'circuit', title: 'Основной круг', meta: '2 круга · 10–15 с переход · 45 с после круга', flow: 'rounds', rest: '10–15 с переход · 45 с после круга', items: ['reverse-lunge', 'pushup', { id: 'hamstring-walkout', sets: 2, dose: '2 × 6–8 выходов' }, { id: 'bear-tap', sets: 2, dose: '2 × 6–8 / сторона' }, { id: 'rkc-plank', sets: 2, dose: '2 × 20–25 с' }, { id: 'side-plank-leg', sets: 2, dose: '2 × 20 с / сторона' }] }
      ]
    }
  };

  const PULL_LEVELS = [
    { id: 'hang', number: '01', title: 'Активный вис', criterion: '3 × 20 секунд на двух тренировках', main: 'active-hang' },
    { id: 'scap', number: '02', title: 'Работа лопаток', criterion: '3 × 8 с прямыми локтями на двух тренировках', main: 'scap-pull' },
    { id: 'assisted', number: '03', title: 'С опорой ног', criterion: '4 × 6 с небольшой помощью ног на двух тренировках', main: 'assisted-pullup' },
    { id: 'negative', number: '04', title: 'Медленные спуски', criterion: '3 спуска по 8 секунд на двух тренировках', main: 'negative-pullup' },
    { id: 'single', number: '05', title: 'Чистые одиночные', criterion: 'первое подтягивание без раскачки', main: 'strict-pullup' }
  ];

  const DEFAULT_STATE = {
    schema: 3,
    prefs: {
      energy: 'normal',
      time: '40',
      tomorrow: 'easy',
      pullLevel: 'hang',
      nextStrength: 'a',
      lastBarAt: null,
      lastHardBarAt: null,
      lastHeavyNegativeAt: null
    },
    barAccess: {
      date: localDayKey(),
      available: false
    },
    active: {},
    history: [],
    lastResults: {},
    timer: null
  };

  let state = loadState();
  let currentView = readInitialView();
  let focusState = null;
  let focusReturn = null;
  let focusScroll = 0;
  let focusPushed = false;
  let closingViaBack = false;
  let pendingFocusRestore = null;
  let pendingCompleteAfterBack = false;
  let timerInterval = null;
  let toastTimeout = null;

  const app = document.getElementById('workoutApp');
  const focus = document.getElementById('workoutFocus');
  const toast = document.getElementById('workoutToast');
  const announcer = document.getElementById('workoutAnnouncer');
  const backgroundRegions = [
    document.querySelector('.wo-skip'),
    document.querySelector('.topbar'),
    document.querySelector('.wo-header'),
    document.querySelector('.wo-tabs'),
    document.getElementById('workoutMain')
  ].filter(Boolean);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isValidHistoryEntry(entry) {
    return Boolean(entry) && typeof entry === 'object' &&
      typeof entry.plan === 'string' &&
      Number.isFinite(entry.done) &&
      Number.isFinite(entry.total);
  }

  function mergeState(saved) {
    if (!saved || saved.schema !== 3) return clone(DEFAULT_STATE);
    const prefs = Object.assign({}, DEFAULT_STATE.prefs, saved.prefs || {});
    const today = localDayKey();
    const savedBarAccess = saved.barAccess && typeof saved.barAccess === 'object'
      ? saved.barAccess
      : null;
    delete prefs.barAvailable;
    return {
      schema: 3,
      prefs: prefs,
      barAccess: savedBarAccess && savedBarAccess.date === today
        ? { date: today, available: Boolean(savedBarAccess.available) }
        : { date: today, available: false },
      active: saved.active && typeof saved.active === 'object' ? saved.active : {},
      history: Array.isArray(saved.history) ? saved.history.filter(isValidHistoryEntry).slice(-40) : [],
      lastResults: saved.lastResults && typeof saved.lastResults === 'object' ? saved.lastResults : {},
      timer: isValidTimer(saved.timer) ? saved.timer : null
    };
  }

  function isValidTimer(timer) {
    return Boolean(timer) && typeof timer === 'object' &&
      typeof timer.key === 'string' &&
      ['running', 'paused', 'done'].includes(timer.status) &&
      Number.isFinite(timer.durationMs) &&
      (timer.status === 'running' ? Number.isFinite(timer.endsAt) : Number.isFinite(timer.remainingMs));
  }

  function loadState() {
    try {
      return mergeState(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    } catch (error) {
      return clone(DEFAULT_STATE);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // The app remains usable when storage is unavailable.
    }
  }

  async function requestPersistentStorage() {
    if (!navigator.storage || typeof navigator.storage.persisted !== 'function') return;
    try {
      if (await navigator.storage.persisted()) return;
      if (typeof navigator.storage.persist === 'function') await navigator.storage.persist();
    } catch (error) {
      // Saving in localStorage still works when persistent mode is unavailable.
    }
  }

  function barAvailableToday() {
    return Boolean(
      state.barAccess &&
      state.barAccess.date === localDayKey() &&
      state.barAccess.available
    );
  }

  function setBarAvailableToday(available) {
    state.barAccess = {
      date: localDayKey(),
      available: Boolean(available)
    };
    saveState();
  }

  function resetBarAccessOnNewDay() {
    const today = localDayKey();
    if (state.barAccess && state.barAccess.date === today) return false;
    state.barAccess = { date: today, available: false };
    if (state.timer && state.timer.key.startsWith('bar:') && state.timer.status === 'running') {
      state.timer.remainingMs = getTimerRemaining(state.timer);
      state.timer.status = 'paused';
      state.timer.endsAt = null;
      ensureTimerLoop();
    }
    saveState();
    return true;
  }

  function sessionLastActivityAt(session) {
    return latestIso([session.lastActivityAt, session.lastHardBarAt, session.lastHeavyNegativeAt, session.startedAt]);
  }

  function resultExerciseId(slot) {
    const matches = Object.keys(EXERCISES).filter(function (id) { return slot.includes(id); });
    matches.sort(function (a, b) { return b.length - a.length; });
    return matches[0] || null;
  }

  function keepSessionResults(session) {
    if (!session.results || typeof session.results !== 'object') return;
    Object.entries(session.results).forEach(function (entry) {
      const value = String(entry[1] || '').trim();
      const exerciseId = resultExerciseId(entry[0]);
      if (value && exerciseId) state.lastResults[exerciseId] = value;
    });
  }

  function settleSession(planId, session) {
    const storedDone = completedStoredSets(session);
    const done = storedDone.reduce(function (sum, entry) { return sum + entry[1].filter(Boolean).length; }, 0);
    keepSessionResults(session);
    if (done > 0) {
      const completedAt = sessionLastActivityAt(session) || new Date().toISOString();
      const total = planId === 'bar'
        ? Object.values(session.sets && typeof session.sets === 'object' ? session.sets : {}).reduce(function (sum, arr) {
            return sum + (Array.isArray(arr) ? arr.length : 0);
          }, 0)
        : flattenPlan(getPlan(planId)).reduce(function (sum, exercise) { return sum + exercise.sets; }, 0);
      const entry = {
        plan: planId,
        completedAt: completedAt,
        done: done,
        total: Math.max(done, total),
        bar: storedDone.some(function (setEntry) { return setEntry[0].startsWith('bar-'); }),
        strengthDone: ['a', 'b'].includes(planId) ? done : null
      };
      // Keep history ordered by completedAt: a settled session is older than entries completed after it.
      const settledTime = new Date(completedAt).getTime();
      const insertAt = state.history.findIndex(function (item) {
        return new Date(item.completedAt).getTime() > settledTime;
      });
      if (insertAt === -1) state.history.push(entry);
      else state.history.splice(insertAt, 0, entry);
      state.history = state.history.slice(-40);
      const newerStrengthExists = state.history.some(function (item) {
        return item !== entry && ['a', 'b'].includes(item.plan) &&
          new Date(item.completedAt).getTime() > settledTime;
      });
      if (!newerStrengthExists) {
        if (planId === 'a') state.prefs.nextStrength = 'b';
        if (planId === 'b') state.prefs.nextStrength = 'a';
      }
      if (planId === 'bar') {
        state.prefs.lastBarAt = latestIso([state.prefs.lastBarAt, completedAt]);
        state.prefs.lastHardBarAt = latestIso([state.prefs.lastHardBarAt, session.lastHardBarAt]);
        state.prefs.lastHeavyNegativeAt = latestIso([state.prefs.lastHeavyNegativeAt, session.lastHeavyNegativeAt]);
      }
    }
    delete state.active[planId];
    if (state.timer && state.timer.key.startsWith(planId + ':')) state.timer = null;
  }

  function settleExpiredSessions() {
    const today = localDayKey();
    let settled = false;
    Object.entries(state.active || {}).forEach(function (entry) {
      const session = entry[1];
      if (!session || typeof session !== 'object') {
        delete state.active[entry[0]];
        settled = true;
        return;
      }
      const lastIso = sessionLastActivityAt(session);
      if (lastIso && localDayKey(new Date(lastIso)) === today) return;
      settleSession(entry[0], session);
      settled = true;
    });
    return settled;
  }

  function handleDayRollover() {
    const settled = settleExpiredSessions();
    if (settled) saveState();
    return resetBarAccessOnNewDay() || settled;
  }

  function readInitialView() {
    const params = new URLSearchParams(location.search);
    if (params.get('short') === '1') return 'quick';
    const legacy = params.get('t');
    if (legacy && Object.prototype.hasOwnProperty.call(LEGACY_VIEWS, legacy)) return LEGACY_VIEWS[legacy];
    const requested = params.get('w');
    return VALID_VIEWS.has(requested) ? requested : 'today';
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  function localDateTime(iso) {
    try {
      return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(new Date(iso));
    } catch (error) {
      return '';
    }
  }

  function uid(prefix) {
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  function setBackgroundInert(active) {
    backgroundRegions.forEach(function (region) {
      region.inert = active;
    });
  }

  function pullLevelIndex() {
    const index = PULL_LEVELS.findIndex(function (level) {
      return level.id === state.prefs.pullLevel;
    });
    return index >= 0 ? index : 0;
  }

  function hoursSince(iso) {
    if (!iso) return null;
    const timestamp = new Date(iso).getTime();
    const hours = (Date.now() - timestamp) / 3600000;
    return Number.isFinite(hours) && hours >= 0 ? hours : null;
  }

  function latestIso(values) {
    const valid = values.filter(Boolean).map(function (value) {
      return { value: value, time: new Date(value).getTime() };
    }).filter(function (item) {
      return Number.isFinite(item.time);
    });
    if (!valid.length) return null;
    valid.sort(function (a, b) { return b.time - a.time; });
    return valid[0].value;
  }

  function activeBarWorkAt(kind) {
    const timestamps = Object.entries(state.active || {}).map(function (activeEntry) {
      const planId = activeEntry[0];
      const session = activeEntry[1];
      if (!session || !session.sets) return null;
      const matches = Object.entries(session.sets).some(function (setEntry) {
        const slot = setEntry[0];
        const sets = setEntry[1];
        const rightExercise = kind === 'negative'
          ? slot.includes('negative-pullup')
          : HARD_BAR_IDS.some(function (id) { return slot.includes(id); });
        return rightExercise && Array.isArray(sets) && sets.some(Boolean);
      });
      if (!matches) return null;
      const timestamp = kind === 'negative'
        ? (session.lastHeavyNegativeAt || session.lastHardBarAt || session.startedAt)
        : (session.lastHardBarAt || session.startedAt);
      const date = new Date(timestamp);
      if (!Number.isFinite(date.getTime())) return null;
      if (planId === 'bar' && localDayKey(date) === localDayKey()) return null;
      return timestamp;
    });
    return latestIso(timestamps);
  }

  function lastHardBarWorkAt() {
    return latestIso([
      state.prefs.lastHardBarAt,
      state.prefs.lastHeavyNegativeAt,
      activeBarWorkAt('hard')
    ]);
  }

  function lastHeavyNegativeWorkAt() {
    return latestIso([
      state.prefs.lastHeavyNegativeAt,
      activeBarWorkAt('negative')
    ]);
  }

  function hardBarReady() {
    const hours = hoursSince(lastHardBarWorkAt());
    return hours === null || hours >= 48;
  }

  function barDoneToday() {
    if (!state.prefs.lastBarAt) return false;
    const date = new Date(state.prefs.lastBarAt);
    return Number.isFinite(date.getTime()) && localDayKey(date) === localDayKey();
  }

  function barBlockIsLight() {
    const level = PULL_LEVELS[pullLevelIndex()];
    return ['assisted', 'negative', 'single'].includes(level.id) && !hardBarReady();
  }

  function makeBarItems() {
    const level = PULL_LEVELS[pullLevelIndex()];
    if (['assisted', 'negative', 'single'].includes(level.id) && !hardBarReady()) {
      return [
        { id: 'active-hang', sets: 2, dose: '2 × 10–15 с легко' },
        { id: 'scap-pull', sets: 2, dose: '2 × 5 чисто' }
      ];
    }
    if (level.id === 'hang') {
      return [{ id: 'active-hang', sets: 4, dose: '4 × 10–20 с' }];
    }

    const mainSets = level.id === 'negative' ? 3 : (level.id === 'single' ? 5 : 4);
    const mainItem = { id: level.main, sets: mainSets };
    if (level.id === 'single') {
      mainItem.dose = '3–5 × 1 чистое повторение';
    }
    return [
      { id: 'active-hang', sets: 2, dose: '2 × 15–20 с' },
      ...(level.id === 'scap' ? [] : [{ id: 'scap-pull', sets: 2, dose: '2 × 5–8' }]),
      mainItem
    ];
  }

  function makeBarPlan() {
    const level = PULL_LEVELS[pullLevelIndex()];
    return {
      id: 'bar',
      kicker: 'Ступень ' + level.number,
      name: level.title,
      desc: 'Короткая тренировка — только когда есть надёжный турник.',
      duration: '10–15 мин',
      load: 'хват и подтягивание',
      sections: [
        {
          id: 'bar',
          title: 'Сегодня',
          meta: 'полный отдых · без отказа',
          items: makeBarItems()
        }
      ]
    };
  }

  function getPlan(planId) {
    if (planId === 'bar') return normalizePlan(makeBarPlan());
    const base = BASE_PLANS[planId] || BASE_PLANS.a;
    return normalizePlan(clone(base));
  }

  function normalizePlan(plan) {
    plan.sections = plan.sections.map(function (section) {
      return Object.assign({}, section, {
        items: section.items.map(function (raw, index) {
          const override = typeof raw === 'string' ? { id: raw } : raw;
          const exercise = EXERCISES[override.id];
          if (!exercise) return null;
          return Object.assign({}, exercise, override, {
            id: override.id,
            slot: override.slot || section.id + '-' + override.id + '-' + index,
            sectionId: section.id,
            rest: override.rest || section.rest || exercise.rest
          });
        }).filter(Boolean)
      });
    });
    return plan;
  }

  function flattenPlan(plan) {
    return plan.sections.flatMap(function (section) {
      return section.items;
    });
  }

  function focusSteps(plan) {
    return plan.sections.flatMap(function (section) {
      if (section.flow === 'rounds') {
        const maxSets = Math.max.apply(null, section.items.map(function (exercise) {
          return exercise.sets;
        }));
        const rounds = [];
        for (let setIndex = 0; setIndex < maxSets; setIndex += 1) {
          section.items.forEach(function (exercise) {
            if (setIndex < exercise.sets) rounds.push({ exercise: exercise, setIndex: setIndex });
          });
        }
        return rounds;
      }
      return section.items.flatMap(function (exercise) {
        return Array.from({ length: exercise.sets }, function (_, setIndex) {
          return { exercise: exercise, setIndex: setIndex };
        });
      });
    });
  }

  function ensureSession(planId) {
    if (!state.active[planId]) {
      state.active[planId] = {
        id: uid(planId),
        startedAt: new Date().toISOString(),
        sets: {},
        results: {}
      };
    }
    if (!state.active[planId].sets) state.active[planId].sets = {};
    if (!state.active[planId].results) state.active[planId].results = {};
    return state.active[planId];
  }

  function readSetState(planId, exercise) {
    const session = state.active[planId];
    const stored = session && session.sets && Array.isArray(session.sets[exercise.slot])
      ? session.sets[exercise.slot]
      : [];
    return Array.from({ length: exercise.sets }, function (_, index) {
      return Boolean(stored[index]);
    });
  }

  function completedStoredSets(session) {
    if (!session || !session.sets || typeof session.sets !== 'object') return [];
    return Object.entries(session.sets).filter(function (entry) {
      return Array.isArray(entry[1]) && entry[1].some(Boolean);
    });
  }

  function completedBarSets(session) {
    return completedStoredSets(session).filter(function (setEntry) {
      return setEntry[0].startsWith('bar-');
    });
  }

  function completedBarSetCount(session) {
    return completedBarSets(session).reduce(function (sum, setEntry) {
      return sum + setEntry[1].filter(Boolean).length;
    }, 0);
  }

  function hasActiveBarWork() {
    return completedBarSetCount(state.active.bar) > 0;
  }

  function recordActiveBarLoad(planId, session, slot, markedNow) {
    if (planId !== 'bar') return;
    const hardSlot = HARD_BAR_IDS.some(function (id) { return slot.includes(id); });
    const negativeSlot = slot.includes('negative-pullup');
    if (markedNow && hardSlot) session.lastHardBarAt = new Date().toISOString();
    if (markedNow && negativeSlot) session.lastHeavyNegativeAt = new Date().toISOString();

    const completed = completedStoredSets(session);
    const hasHard = completed.some(function (entry) {
      return HARD_BAR_IDS.some(function (id) { return entry[0].includes(id); });
    });
    const hasNegative = completed.some(function (entry) {
      return entry[0].includes('negative-pullup');
    });
    if (!hasHard) delete session.lastHardBarAt;
    if (!hasNegative) delete session.lastHeavyNegativeAt;
  }

  function planProgress(planId, plan) {
    const all = flattenPlan(plan);
    const total = all.reduce(function (sum, exercise) {
      return sum + exercise.sets;
    }, 0);
    const done = all.reduce(function (sum, exercise) {
      return sum + readSetState(planId, exercise).filter(Boolean).length;
    }, 0);
    return {
      done: done,
      total: total,
      pct: total ? Math.round(done / total * 100) : 0
    };
  }

  function recommendPlan() {
    if (state.prefs.energy === 'low') {
      return {
        id: 'core',
        reason: 'Мало сил: сегодня пресс и планки.'
      };
    }
    if (['quality', 'long'].includes(state.prefs.tomorrow)) {
      return {
        id: 'core',
        reason: 'Завтра интервалы или длительная: сегодня пресс и планки.'
      };
    }
    const recentStrength = state.history.slice().reverse().find(function (item) {
      const strengthDone = Number.isFinite(item.strengthDone) ? item.strengthDone : item.done;
      return ['a', 'b'].includes(item.plan) && strengthDone > 0 && hoursSince(item.completedAt) !== null;
    });
    const hasStrengthHistory = Boolean(recentStrength);
    const strengthHours = recentStrength ? hoursSince(recentStrength.completedAt) : null;
    if (strengthHours !== null && strengthHours < 48) {
      return {
        id: 'core',
        reason: 'После силовой прошло только ' + Math.max(1, Math.floor(strengthHours)) + ' ч. Сегодня — пресс и планки.'
      };
    }
    if (state.prefs.time === '20') {
      return {
        id: 'quick',
        reason: 'Есть 20 минут: короткая силовая.'
      };
    }
    const nextStrength = hasStrengthHistory && state.prefs.nextStrength === 'b' ? 'b' : 'a';
    return {
      id: nextStrength,
      reason: hasStrengthHistory ? 'Следующая — ' + nextStrength.toUpperCase() + '.' : 'Первая тренировка — A.'
    };
  }

  function barRecoveryNote() {
    const level = PULL_LEVELS[pullLevelIndex()];
    const hardHours = hoursSince(lastHardBarWorkAt());
    const heavyHours = hoursSince(lastHeavyNegativeWorkAt());
    if (['assisted', 'negative', 'single'].includes(level.id) && hardHours !== null && hardHours < 48) {
      return 'После тяжёлой тренировки на турнике прошло ' + Math.max(1, Math.floor(hardHours)) + ' ч. Сегодня только лёгкие висы и работа лопаток.';
    }
    if (level.id === 'negative') {
      if (heavyHours === null) return 'Если медленные спуски новые, лучше начать с одного за подход.';
      return 'После медленных спусков прошло ' + Math.floor(heavyHours) + ' ч. Можно делать полную тренировку.';
    }
    if (hardHours !== null) {
      return 'После тяжёлой тренировки на турнике прошло ' + Math.floor(hardHours) + ' ч. Можно делать полную тренировку.';
    }
    const barHours = hoursSince(state.prefs.lastBarAt);
    if (barHours === null) return '';
    return 'Прошлая тренировка на турнике была ' + Math.max(1, Math.floor(barHours)) + ' ч назад. Подходы — не до отказа.';
  }

  function planLabel(planId) {
    const labels = {
      a: 'Силовая A',
      b: 'Силовая B',
      core: 'Пресс и планки',
      bar: 'Турник',
      quick: 'Короткая силовая'
    };
    return labels[planId] || planId;
  }

  function renderChoiceGroup(key, label, options) {
    const current = state.prefs[key];
    return '<fieldset class="wo-control-group">' +
      '<legend>' + escapeHtml(label) + '</legend>' +
      '<div class="wo-choice-row">' +
      options.map(function (option) {
        const selected = option.value === current;
        return '<button class="wo-choice' + (selected ? ' is-active' : '') + '" type="button" ' +
          'data-action="pref" data-key="' + key + '" data-value="' + option.value + '" ' +
          'aria-pressed="' + selected + '">' + escapeHtml(option.label) + '</button>';
      }).join('') +
      '</div></fieldset>';
  }

  function renderToday() {
    const recommendation = recommendPlan();
    const plan = getPlan(recommendation.id);
    const hasBar = barAvailableToday();
    const didBarToday = barDoneToday();
    const lightBar = barBlockIsLight();
    const level = PULL_LEVELS[pullLevelIndex()];
    const barText = hasBar ? 'Турник есть' : 'Турника нет';
    const recent = state.history.slice(-4).reverse();

    return '<div class="wo-dashboard">' +
      '<section class="wo-recommend" aria-labelledby="todayTitle">' +
        '<div class="wo-recommend-top">' +
          '<div>' +
            '<div class="wo-view-kicker">Сегодня</div>' +
            '<h2 class="wo-recommend-title" id="todayTitle" tabindex="-1">' + escapeHtml(planLabel(recommendation.id)) + '</h2>' +
          '</div>' +
          '<span class="wo-pill">' + escapeHtml(plan.duration) + '</span>' +
        '</div>' +
        '<p class="wo-recommend-note">' + escapeHtml(recommendation.reason) + '</p>' +
        '<div class="wo-controls">' +
          renderChoiceGroup('energy', 'Сколько сил', [
            { value: 'normal', label: 'нормально' },
            { value: 'low', label: 'мало' }
          ]) +
          renderChoiceGroup('time', 'Время', [
            { value: '40', label: '35–45 мин' },
            { value: '20', label: '20 мин' }
          ]) +
          renderChoiceGroup('tomorrow', 'Бег завтра', [
            { value: 'easy', label: 'лёгкий' },
            { value: 'quality', label: 'темп / интервалы' },
            { value: 'long', label: 'длительный' },
            { value: 'rest', label: 'отдых' }
          ]) +
          '<fieldset class="wo-control-group">' +
            '<legend>Турник сегодня</legend>' +
            '<button class="wo-toggle' + (hasBar ? ' is-on' : '') + '" type="button" ' +
              'data-action="toggle-bar" aria-pressed="' + hasBar + '">' +
              '<span aria-hidden="true"></span>' + escapeHtml(barText) +
            '</button>' + (hasBar
              ? '<small class="wo-control-note">' + (didBarToday
                  ? 'На сегодня с турником всё.'
                  : (lightBar ? 'Сегодня только висы и лопатки.' : 'Можно добавить 10–15 минут на турнике.')) + '</small>'
              : '<small class="wo-control-note">Основная тренировка — на коврике.</small>') +
          '</fieldset>' +
        '</div>' +
        '<div class="wo-actions">' +
          '<button class="wo-primary" type="button" data-action="start-focus" data-plan="' + recommendation.id + '">Начать по шагам</button>' +
          '<button class="wo-secondary" type="button" data-action="open-plan" data-plan="' + recommendation.id + '">Посмотреть целиком</button>' +
        '</div>' +
      '</section>' +

      '<section aria-labelledby="chooseTitle">' +
        '<div class="wo-section-head"><div><h2 class="wo-section-title" id="chooseTitle">Все тренировки</h2></div></div>' +
        '<div class="wo-quick-grid">' +
          renderQuickCard('a', '35–40 мин', 'Ноги, отжимания, икры и планки') +
          renderQuickCard('b', '35–42 мин', 'Баланс, плечи, икры и боковые планки') +
          renderQuickCard('core', '15–18 мин', 'Пресс и планки, почти без нагрузки на ноги') +
          renderQuickCard('quick', '18–22 мин', 'Два круга: ноги, отжимания и планки') +
        '</div>' +
      '</section>' +

      (hasBar && !didBarToday
        ? '<section class="wo-banner wo-banner-good">' +
            '<strong>Турник · ' + escapeHtml(level.title) + '</strong>' +
            '<p>' + (lightBar ? escapeHtml(barRecoveryNote()) : 'Можно сделать 10–15 минут на турнике перед силовой.') + '</p>' +
            '<button class="wo-secondary" type="button" data-action="open-plan" data-plan="bar">Открыть тренировку</button>' +
          '</section>'
        : '') +

      '<section class="wo-week" aria-labelledby="weekTitle">' +
        '<div class="wo-section-head"><div><div class="wo-view-kicker">Пример недели</div><h2 class="wo-section-title" id="weekTitle">Силовые и бег</h2></div></div>' +
        '<div class="wo-timeline" role="group" aria-label="Пример недели">' +
          '<span class="wo-phase">лёгкий бег + A</span><span class="wo-phase">восстановление</span><span class="wo-phase">интервалы</span>' +
          '<span class="wo-phase">пресс</span><span class="wo-phase">B</span><span class="wo-phase">отдых</span><span class="wo-phase">длительный</span>' +
        '</div>' +
        '<p>A и B лучше ставить после лёгкого бега или в отдельный день. Между ними — хотя бы 48 часов; не ставить накануне темпа, интервалов или длительной.</p>' +
      '</section>' +

      '<section aria-labelledby="historyTitle">' +
        '<div class="wo-section-head"><div><h2 class="wo-section-title" id="historyTitle">Последние тренировки</h2></div></div>' +
        (recent.length
          ? '<div class="wo-quick-grid">' + recent.map(function (item) {
              return '<div class="wo-quick-card is-static"><strong>' + escapeHtml(planLabel(item.plan)) + '</strong><span>' +
                escapeHtml(localDateTime(item.completedAt)) + ' · ' + escapeHtml(item.done + '/' + item.total) + ' подходов</span></div>';
            }).join('') + '</div>'
          : '<div class="wo-empty">Пока здесь пусто.</div>') +
      '</section>' +

      '<details class="wo-details wo-sources">' +
        '<summary>Откуда взяты упражнения</summary>' +
        '<div class="wo-details-grid">' +
          '<a class="wo-source" href="' + SOURCES.hprc.url + '" target="_blank" rel="noopener">HPRC: первое подтягивание ↗</a>' +
          '<a class="wo-source" href="' + SOURCES.ukk.url + '" target="_blank" rel="noopener">UKK: упражнения для бегунов ↗</a>' +
          '<p>По ссылкам — подробная техника.</p>' +
        '</div>' +
      '</details>' +
    '</div>';
  }

  function renderQuickCard(planId, time, description) {
    return '<button class="wo-quick-card" type="button" data-action="open-plan" data-plan="' + planId + '">' +
      '<span class="wo-quick-card-top"><strong>' + escapeHtml(planLabel(planId)) + '</strong><span>' + escapeHtml(time) + '</span></span>' +
      '<span>' + escapeHtml(description) + '</span>' +
    '</button>';
  }

  function renderPlan(planId) {
    const plan = getPlan(planId);
    const progress = planProgress(planId, plan);
    const hasBar = barAvailableToday();
    const didBarToday = barDoneToday();
    const lightBar = barBlockIsLight();
    const completeLabel = progress.done ? 'Закончить сейчас' : 'Завершить тренировку';

    return '<div class="wo-plan-view">' +
      '<header class="wo-view-head">' +
        '<div>' +
          '<div class="wo-view-kicker">' + escapeHtml(plan.kicker) + '</div>' +
          '<h2 class="wo-view-title">' + escapeHtml(plan.name) + '</h2>' +
          '<p class="wo-view-desc">' + escapeHtml(plan.desc) + '</p>' +
          '<div class="wo-meta"><span class="wo-pill">' + escapeHtml(plan.duration) + '</span><span class="wo-pill">' + escapeHtml(plan.load) + '</span></div>' +
        '</div>' +
        '<div class="wo-actions">' +
          '<button class="wo-primary" type="button" data-action="start-focus" data-plan="' + planId + '">Начать</button>' +
        '</div>' +
      '</header>' +

      '<div class="wo-plan-notes">' +
        (hasBar && !didBarToday && ['a', 'b', 'core', 'quick'].includes(planId)
          ? '<div class="wo-banner wo-banner-good">' +
              '<strong>' + (lightBar ? 'Сегодня только висы и лопатки.' : 'Турник сегодня есть.') + '</strong>' +
              '<p>' + (lightBar ? escapeHtml(barRecoveryNote()) : 'Если удобно, можно добавить 10–15 минут на турнике перед силовой.') + '</p>' +
              '<button class="wo-secondary" type="button" data-action="open-plan" data-plan="bar">Открыть тренировку</button>' +
            '</div>'
          : '') +

        (['a', 'b'].includes(planId)
          ? '<div class="wo-banner wo-banner-warn"><strong>Силовая и бег.</strong><p>Эту тренировку лучше не ставить накануне темпа, интервалов или длительной. Если ноги ещё не восстановились, подойдут «Пресс» или сокращённый вариант.' + (planId === 'b' ? ' Прыжки стоит пропустить при дискомфорте в стопе, голени, колене или ахилле.' : '') + '</p></div>'
          : '') +
      '</div>' +

      '<div class="wo-timeline" role="group" aria-label="Блоки тренировки">' +
        plan.sections.map(function (section) {
          return '<span class="wo-phase">' + escapeHtml(section.title) + '<small>' + escapeHtml(section.meta) + '</small></span>';
        }).join('') +
      '</div>' +

      renderProgress(planId, progress) +
      plan.sections.map(function (section, sectionIndex) {
        return renderSection(planId, section, sectionIndex);
      }).join('') +

      '<section class="wo-banner wo-banner-good">' +
        '<strong>Когда усложнять</strong>' +
        '<p>Если два раза подряд получилось верхнее число повторов и в запасе оставались ещё 1–3, в следующий раз стоит взять более сложный вариант. Планка держится 30–40 секунд без потери формы — тоже повод усложнить, а не добавлять время.</p>' +
      '</section>' +

      '<div class="wo-actions wo-finish-actions">' +
        '<button class="wo-primary" type="button" data-action="complete-plan" data-plan="' + planId + '">' + completeLabel + '</button>' +
        '<button class="wo-secondary" type="button" data-action="open-plan" data-plan="today">Вернуться к выбору</button>' +
      '</div>' +
    '</div>';
  }

  function renderProgress(planId, progress) {
    return '<div class="wo-progress" data-plan-progress="' + planId + '">' +
      '<div class="wo-progress-copy"><span>Подходы</span><strong data-progress-label>' + progress.done + ' / ' + progress.total + '</strong></div>' +
      '<div class="wo-progress-bar" aria-hidden="true"><span data-progress-fill style="width:' + progress.pct + '%"></span></div>' +
    '</div>';
  }

  function renderSection(planId, section, sectionIndex) {
    return '<section class="wo-section" aria-labelledby="section-' + planId + '-' + section.id + '">' +
      '<div class="wo-section-head">' +
        '<div><div class="wo-view-kicker">' + String(sectionIndex + 1).padStart(2, '0') + '</div>' +
        '<h3 class="wo-section-title" id="section-' + planId + '-' + section.id + '">' + escapeHtml(section.title) + '</h3></div>' +
        '<span class="wo-section-meta">' + escapeHtml(section.meta) + '</span>' +
      '</div>' +
      '<div class="wo-exercise-list">' +
        section.items.map(function (exercise, index) {
          return renderExerciseCard(planId, exercise, index, false);
        }).join('') +
      '</div>' +
    '</section>';
  }

  function renderExerciseCard(planId, exercise, index, focusMode, activeSet) {
    const setState = readSetState(planId, exercise);
    const done = setState.every(Boolean);
    const session = state.active[planId];
    const currentResult = session && session.results ? (session.results[exercise.slot] || '') : '';
    const previousResult = state.lastResults[exercise.id] || '';
    const timerKey = planId + ':' + exercise.slot;
    const timer = getTimerView(timerKey, exercise.seconds);
    const diagram = window.WorkoutDiagrams
      ? window.WorkoutDiagrams.render(exercise.diagram, exercise.name, exercise.cues.join(' '))
      : '<div class="wo-empty">Схема движения</div>';
    const source = exercise.source
      ? '<a class="wo-source" href="' + exercise.source.url + '" target="_blank" rel="noopener">' + escapeHtml(exercise.source.label) + ' ↗</a>'
      : '';

    return '<article class="wo-exercise' + (done ? ' is-done' : '') + (focusMode ? ' is-focus' : '') + '" data-exercise="' + exercise.slot + '">' +
      '<div class="wo-ex-top">' +
        '<span class="wo-ex-index">' + String(index + 1).padStart(2, '0') + '</span>' +
        '<div class="wo-ex-copy">' +
          '<h4 class="wo-ex-name">' + escapeHtml(exercise.name) + '</h4>' +
          '<div class="wo-ex-en">' + escapeHtml(exercise.en) + '</div>' +
          '<div class="wo-ex-badges"><span class="wo-badge wo-badge-' + exercise.category + '">' + escapeHtml(categoryLabel(exercise.category)) + '</span>' +
            (focusMode ? '<span class="wo-badge is-warm">подход ' + (activeSet + 1) + ' из ' + exercise.sets + '</span>' : '') +
          '</div>' +
        '</div>' +
        (!focusMode
          ? '<button class="wo-secondary wo-card-focus" type="button" data-action="open-focus" data-plan="' + planId + '" data-slot="' + exercise.slot + '">По шагам</button>'
          : '') +
      '</div>' +

      '<div class="wo-diagram">' + diagram + '</div>' +

      '<div class="wo-dose-row">' +
        '<strong class="wo-dose">' + escapeHtml(exercise.dose) + '</strong>' +
        '<span class="wo-rest">отдых · ' + escapeHtml(exercise.rest) + '</span>' +
      '</div>' +

      '<ul class="wo-cues">' +
        exercise.cues.slice(0, 2).map(function (cue) {
          return '<li>' + escapeHtml(cue) + '</li>';
        }).join('') +
      '</ul>' +
      '<p class="wo-mistake"><span>Частая ошибка</span>' + escapeHtml(exercise.mistake) + '</p>' +

      (exercise.seconds
        ? '<div class="wo-timer is-' + timer.status + '">' +
            '<span class="wo-timer-value mono" data-timer-display="' + timerKey + '">' + timer.display + '</span>' +
            '<button type="button" data-action="timer-toggle" data-plan="' + planId + '" data-slot="' + exercise.slot + '" data-seconds="' + exercise.seconds + '">' + timer.action + '</button>' +
            '<button type="button" data-action="timer-reset" data-plan="' + planId + '" data-slot="' + exercise.slot + '" data-seconds="' + exercise.seconds + '">Сброс</button>' +
          '</div>'
        : '') +

      '<fieldset class="wo-set-field">' +
        '<legend>Подходы</legend>' +
        setState.map(function (checked, setIndex) {
          const setKey = planId + '|' + exercise.slot + '|' + setIndex;
          return '<button class="wo-set-check' + (checked ? ' is-done' : '') + (focusMode && setIndex === activeSet ? ' is-current' : '') + '" type="button" data-action="toggle-set" ' +
            'data-plan="' + planId + '" data-slot="' + exercise.slot + '" data-set="' + setIndex + '" data-set-key="' + setKey + '" ' +
            'aria-pressed="' + checked + '" aria-label="Подход ' + (setIndex + 1) + (checked ? ' выполнен' : ' не выполнен') + '">' +
            '<span aria-hidden="true">' + (checked ? '✓' : (setIndex + 1)) + '</span>' +
          '</button>';
        }).join('') +
      '</fieldset>' +

      (exercise.trackResult === false ? '' : '<div class="wo-result">' +
        '<label>Результат сегодня' +
          '<input type="text" autocomplete="off" data-result-input data-plan="' + planId + '" data-slot="' + exercise.slot + '" ' +
            'value="' + escapeHtml(currentResult) + '" placeholder="' + (exercise.seconds ? 'например: 20 / 20 / 18 с' : 'например: 8 / 7 / 6') + '">' +
        '</label>' +
        '<small>' + (previousResult ? 'прошлый раз · ' + escapeHtml(previousResult) : 'прошлого результата пока нет') + '</small>' +
      '</div>') +

      '<details class="wo-details">' +
        '<summary>Варианты и техника</summary>' +
        '<div class="wo-details-grid">' +
          '<p><strong>Проще</strong>' + escapeHtml(exercise.easier) + '</p>' +
          '<p><strong>Сложнее</strong>' + escapeHtml(exercise.harder) + '</p>' +
          source +
        '</div>' +
      '</details>' +
    '</article>';
  }

  function categoryLabel(category) {
    const labels = {
      mobility: 'разминка',
      legs: 'ноги',
      push: 'отжимания',
      posterior: 'бедро и ягодицы',
      calves: 'для бега',
      core: 'пресс',
      run: 'для бега',
      bar: 'турник'
    };
    return labels[category] || category;
  }

  function renderBar() {
    const plan = getPlan('bar');
    const progress = planProgress('bar', plan);
    const current = pullLevelIndex();
    const hasBar = barAvailableToday();
    const didBarToday = barDoneToday();
    const markedSets = completedBarSetCount(state.active.bar);
    const legacySets = Math.max(0, markedSets - progress.done);
    const canTrain = hasBar && (!didBarToday || markedSets > 0);
    const recoveryNote = barRecoveryNote();

    return '<div class="wo-plan-view">' +
      '<header class="wo-view-head">' +
        '<div><div class="wo-view-kicker">Турник</div><h2 class="wo-view-title">К первому подтягиванию</h2>' +
        '<p class="wo-view-desc">Начинать стоит со ступени, на которой все подходы получаются чисто. Условие для перехода написано под ней.</p></div>' +
        (canTrain
          ? '<div class="wo-actions"><button class="wo-primary" type="button" data-action="start-focus" data-plan="bar">' + (markedSets ? 'Продолжить' : 'Начать · 10–15 мин') + '</button></div>'
          : '') +
      '</header>' +

      (!hasBar
        ? '<section class="wo-banner"><strong>Сегодня без турника.</strong><p>Здесь можно посмотреть ступени. Текущая никуда не денется.</p>' +
            '<button class="wo-secondary" type="button" data-action="toggle-bar">Отметить, что турник есть</button></section>' +
          (markedSets
            ? '<section class="wo-banner wo-banner-good"><strong>Часть тренировки уже сделана.</strong><p>Отмечено подходов: ' + markedSets + '. Можно закончить на сегодня.</p>' +
                '<div class="wo-actions wo-finish-actions"><button class="wo-primary" type="button" data-action="complete-plan" data-plan="bar">Закончить на сегодня</button></div></section>'
            : '')
        : (didBarToday && !markedSets
          ? '<section class="wo-banner wo-banner-good"><strong>На сегодня с турником всё.</strong><p>Ступень и результаты сохранены.</p>' +
              '<div class="wo-actions"><button class="wo-primary" type="button" data-action="open-plan" data-plan="today">К тренировкам</button>' +
              '<button class="wo-secondary" type="button" data-action="toggle-bar">Турника уже нет</button></div></section>'
          : '')) +

      '<ol class="wo-ladder" aria-label="Ступени к подтягиванию">' +
        PULL_LEVELS.map(function (level, index) {
          const stateClass = index < current ? ' is-passed' : (index === current ? ' is-current' : '');
          return '<li class="wo-level-item"><button class="wo-level' + stateClass + '" type="button" data-action="select-level" data-level="' + level.id + '" aria-pressed="' + (index === current) + '">' +
            '<span class="wo-level-number">' + level.number + '</span>' +
            '<span class="wo-level-copy"><strong>' + escapeHtml(level.title) + '</strong><small>' + (index === PULL_LEVELS.length - 1 ? 'цель: ' : 'для перехода: ') + escapeHtml(level.criterion) + '</small></span>' +
            '<span class="wo-level-state">' + (index < current ? '✓' : (index === current ? 'сейчас' : 'позже')) + '</span>' +
          '</button></li>';
        }).join('') +
      '</ol>' +

      (canTrain
        ? '<div class="wo-banner wo-banner-warn"><strong>Сначала — проверка опоры.</strong><p>Для медленных спусков нужна низкая перекладина или устойчивая ступень. Не запрыгивать на высокий турник. При резкой боли, онемении или потере контроля над спуском — остановиться.' + (recoveryNote ? ' ' + escapeHtml(recoveryNote) : '') + '</p>' +
            '<button class="wo-secondary" type="button" data-action="toggle-bar">Турника больше нет</button></div>' +
          (legacySets
            ? '<section class="wo-banner"><strong>Предыдущие отметки сохранены.</strong><p>Подходов из прежней версии: ' + legacySets + '. Они останутся в истории.</p></section>'
            : '') +
          (PULL_LEVELS[current].id === 'negative'
            ? '<section class="wo-banner wo-banner-good"><strong>Проверка первого подтягивания.</strong><p>Раз в неделю вместо спусков — 1–3 попытки в начале тренировки. Затем 3 × 4–6 подтягиваний с опорой ног. Спуски в этот день пропустить.</p></section>'
            : '') +
          renderProgress('bar', progress) +
          plan.sections.map(function (section, index) {
            return renderSection('bar', section, index);
          }).join('') +
          '<section class="wo-banner wo-banner-good"><strong>После первого подтягивания</strong><p>3–5 одиночных подтягиваний с полным отдыхом. Остановиться до того, как начнёт портиться техника.</p>' +
            '<a class="wo-source" href="' + SOURCES.hprc.url + '" target="_blank" rel="noopener">Фото по шагам · HPRC ↗</a></section>' +
          '<div class="wo-actions wo-finish-actions"><button class="wo-primary" type="button" data-action="complete-plan" data-plan="bar">Завершить тренировку</button></div>'
        : '') +
    '</div>';
  }

  function renderApp() {
    updateTabs();
    app.innerHTML = currentView === 'today'
      ? renderToday()
      : (currentView === 'bar' ? renderBar() : renderPlan(currentView));
    updateTimerNodes();
  }

  function updateTabs() {
    document.querySelectorAll('.wo-tab').forEach(function (button) {
      const tabView = button.dataset.view;
      const active = tabView === currentView || (currentView === 'quick' && tabView === 'today');
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }

  function updateURL(mode) {
    const params = new URLSearchParams();
    if (currentView !== 'today') params.set('w', currentView);
    if (focusState) {
      params.set('focus', '1');
      params.set('plan', focusState.plan);
      const plan = getPlan(focusState.plan);
      const step = focusSteps(plan)[focusState.index];
      if (step) {
        params.set('ex', step.exercise.slot);
        params.set('step', String(focusState.index));
      }
    }
    const url = location.pathname + (params.toString() ? '?' + params.toString() : '');
    const entryState = { view: currentView, focusPushed: Boolean(focusState) && focusPushed };
    if (mode === 'push') history.pushState(entryState, '', url);
    else history.replaceState(entryState, '', url);
  }

  function setView(view, push) {
    const next = VALID_VIEWS.has(view) ? view : 'today';
    if (next === currentView) {
      if (focusState) {
        closeFocus(true);
        return;
      }
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      return;
    }
    if (focusState) closeFocus(false);
    currentView = next;
    renderApp();
    // Tabs are light navigation: they replace the current entry. Only the
    // step-by-step dialog pushes history (and consumes it on close).
    updateURL('replace');
    document.getElementById('workoutMain').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  function firstIncompleteIndex(planId, plan) {
    const steps = focusSteps(plan);
    const index = steps.findIndex(function (step) {
      return !readSetState(planId, step.exercise)[step.setIndex];
    });
    return index >= 0 ? index : 0;
  }

  function leaveUnavailableBarFocus() {
    focusState = null;
    focus.hidden = true;
    focus.innerHTML = '';
    document.body.classList.remove('wo-focus-open');
    setBackgroundInert(false);
    currentView = 'bar';
    renderApp();
    updateURL('replace');
    showToast('Сегодня турник не отмечен.');
    announce('Для этой тренировки нужен надёжный турник.');
    document.getElementById('workoutMain').focus({ preventScroll: true });
  }

  function leaveCompletedBarFocus() {
    focusState = null;
    focus.hidden = true;
    focus.innerHTML = '';
    document.body.classList.remove('wo-focus-open');
    setBackgroundInert(false);
    currentView = 'bar';
    renderApp();
    updateURL('replace');
    showToast('На сегодня с турником всё.');
    announce('Вторая тренировка на турнике сегодня не начата.');
    document.getElementById('workoutMain').focus({ preventScroll: true });
  }

  function openFocus(planId, slot, push, requestedStep) {
    if (planId === 'bar' && !barAvailableToday()) {
      leaveUnavailableBarFocus();
      return false;
    }
    if (planId === 'bar' && barDoneToday() && completedBarSetCount(state.active.bar) === 0) {
      leaveCompletedBarFocus();
      return false;
    }
    const plan = getPlan(planId);
    const steps = focusSteps(plan);
    if (!steps.length) return;
    const requestedMatches = Number.isInteger(requestedStep) && requestedStep >= 0 && requestedStep < steps.length &&
      (!slot || steps[requestedStep].exercise.slot === slot);
    let index = requestedMatches
      ? requestedStep
      : (slot
        ? steps.findIndex(function (step) { return step.exercise.slot === slot; })
        : firstIncompleteIndex(planId, plan));
    if (index < 0) index = 0;
    ensureSession(planId);
    saveState();
    focusReturn = document.activeElement;
    focusScroll = window.scrollY;
    focusState = { plan: planId, index: index };
    setBackgroundInert(true);
    renderFocus(true);
    if (push !== false) focusPushed = true;
    updateURL(push === false ? 'replace' : 'push');
    return true;
  }

  function renderFocus(moveFocus) {
    if (!focusState) return;
    if (focusState.plan === 'bar' && !barAvailableToday()) {
      leaveUnavailableBarFocus();
      return;
    }
    const plan = getPlan(focusState.plan);
    const steps = focusSteps(plan);
    const step = steps[focusState.index];
    if (!step) return closeFocus(false);
    const exercise = step.exercise;

    focus.hidden = false;
    document.body.classList.add('wo-focus-open');
    focus.innerHTML = '<div class="wo-focus-head">' +
        '<button class="wo-secondary" type="button" data-action="focus-close">← Вся тренировка</button>' +
        '<div class="wo-focus-progress"><span>' + escapeHtml(planLabel(focusState.plan)) + '</span><strong>' + (focusState.index + 1) + ' / ' + steps.length + '</strong></div>' +
      '</div>' +
      '<div class="wo-focus-body">' +
        '<h2 class="wo-sr-only" id="focusTitle" tabindex="-1">' + escapeHtml(exercise.name) + '</h2>' +
        renderExerciseCard(focusState.plan, exercise, focusState.index, true, step.setIndex) +
      '</div>' +
      '<div class="wo-focus-footer">' +
        '<button class="wo-secondary" type="button" data-action="focus-nav" data-direction="-1" ' + (focusState.index === 0 ? 'disabled' : '') + '>Назад</button>' +
        '<button class="wo-focus-next" type="button" data-action="focus-skip">Пропустить</button>' +
        '<button class="wo-primary" type="button" data-action="focus-done">' + (focusState.index + 1 < steps.length ? 'Готово →' : 'Завершить') + '</button>' +
      '</div>';
    updateTimerNodes();
    if (moveFocus) {
      requestAnimationFrame(function () {
        const title = document.getElementById('focusTitle');
        if (title) title.focus({ preventScroll: true });
      });
    }
  }

  function navigateFocus(direction, markDone) {
    if (!focusState) return;
    if (focusState.plan === 'bar' && !barAvailableToday()) {
      leaveUnavailableBarFocus();
      return;
    }
    const plan = getPlan(focusState.plan);
    const steps = focusSteps(plan);
    const currentStep = steps[focusState.index];
    if (markDone && currentStep) {
      const session = ensureSession(focusState.plan);
      const sets = readSetState(focusState.plan, currentStep.exercise);
      sets[currentStep.setIndex] = true;
      session.sets[currentStep.exercise.slot] = sets;
      session.lastActivityAt = new Date().toISOString();
      recordActiveBarLoad(focusState.plan, session, currentStep.exercise.slot, true);
      saveState();
      updateProgressUI(focusState.plan);
    }
    const last = steps.length - 1;
    const next = focusState.index + direction;
    if (next > last) {
      completePlan(focusState.plan);
      return;
    }
    focusState.index = Math.max(0, Math.min(last, next));
    renderFocus(true);
    updateURL('replace');
    if (typeof focus.scrollTo === 'function') focus.scrollTo({ top: 0, behavior: 'auto' });
    else focus.scrollTop = 0;
  }

  function closeFocus(push) {
    if (!focusState) return;
    focusState = null;
    focus.hidden = true;
    focus.innerHTML = '';
    document.body.classList.remove('wo-focus-open');
    setBackgroundInert(false);
    const viaBack = push !== false && focusPushed;
    focusPushed = false;
    if (viaBack) {
      // Consume the entry pushed by openFocus so Back never reopens the dialog.
      // Focus is restored in the popstate handler, after its renderApp.
      closingViaBack = true;
      pendingFocusRestore = focusReturn && focusReturn.dataset && focusReturn.dataset.action ? {
        action: focusReturn.dataset.action,
        plan: focusReturn.dataset.plan || null,
        slot: focusReturn.dataset.slot || null
      } : null;
      history.back();
      window.scrollTo({ top: focusScroll, behavior: 'auto' });
      return;
    }
    updateURL('replace');
    window.scrollTo({ top: focusScroll, behavior: 'auto' });
    const returnTarget = focusReturn && focusReturn !== document.body && focusReturn.isConnected
      ? focusReturn
      : document.getElementById('workoutMain');
    if (returnTarget && typeof returnTarget.focus === 'function') returnTarget.focus({ preventScroll: true });
  }

  function toggleSet(planId, slot, setIndex, clickedInFocus) {
    if (planId === 'bar' && !barAvailableToday()) {
      showToast('Здесь нужен турник.');
      announce('Подход не отмечен: для него нужен турник.');
      return;
    }
    const plan = getPlan(planId);
    const exercise = flattenPlan(plan).find(function (item) { return item.slot === slot; });
    if (!exercise) return;
    const session = ensureSession(planId);
    const sets = readSetState(planId, exercise);
    sets[setIndex] = !sets[setIndex];
    session.sets[slot] = sets;
    session.lastActivityAt = new Date().toISOString();
    recordActiveBarLoad(planId, session, slot, sets[setIndex]);
    saveState();

    const key = planId + '|' + slot + '|' + setIndex;
    document.querySelectorAll('[data-set-key]').forEach(function (button) {
      if (button.dataset.setKey !== key) return;
      button.classList.toggle('is-done', sets[setIndex]);
      button.setAttribute('aria-pressed', String(sets[setIndex]));
      button.setAttribute('aria-label', 'Подход ' + (setIndex + 1) + (sets[setIndex] ? ' выполнен' : ' не выполнен'));
      button.querySelector('span').textContent = sets[setIndex] ? '✓' : String(setIndex + 1);
      if (clickedInFocus === focus.contains(button)) button.focus();
    });
    updateProgressUI(planId);
  }

  function updateProgressUI(planId) {
    const plan = getPlan(planId);
    const progress = planProgress(planId, plan);
    document.querySelectorAll('[data-plan-progress="' + planId + '"]').forEach(function (node) {
      const label = node.querySelector('[data-progress-label]');
      const fill = node.querySelector('[data-progress-fill]');
      if (label) label.textContent = progress.done + ' / ' + progress.total;
      if (fill) fill.style.width = progress.pct + '%';
    });
  }

  function completePlan(planId) {
    const plan = getPlan(planId);
    const exercises = flattenPlan(plan);
    const progress = planProgress(planId, plan);
    const session = state.active[planId];
    const storedDone = completedStoredSets(session);
    const currentSlots = new Set(exercises.map(function (exercise) { return exercise.slot; }));
    const orphanedBar = storedDone.filter(function (entry) {
      return entry[0].startsWith('bar-') && !currentSlots.has(entry[0]);
    });
    const finalProgress = {
      done: progress.done + orphanedBar.reduce(function (sum, entry) { return sum + entry[1].filter(Boolean).length; }, 0),
      total: progress.total + orphanedBar.reduce(function (sum, entry) { return sum + entry[1].length; }, 0)
    };
    const didAnyBar = storedDone.some(function (entry) {
      return entry[0].startsWith('bar-');
    });
    const didHeavyNegative = storedDone.some(function (entry) {
      return entry[0].includes('negative-pullup');
    });
    const didHardBar = storedDone.some(function (entry) {
      return ['assisted-pullup', 'negative-pullup', 'strict-pullup'].some(function (id) { return entry[0].includes(id); });
    });
    if (session && session.results) {
      // Slot-based resolve first (covers orphaned bar slots), then the exact current-plan mapping.
      keepSessionResults(session);
      exercises.forEach(function (exercise) {
        const result = String(session.results[exercise.slot] || '').trim();
        if (result) state.lastResults[exercise.id] = result;
      });
    }
    const completedAt = new Date().toISOString();
    state.history.push({
      plan: planId,
      completedAt: completedAt,
      done: finalProgress.done,
      total: finalProgress.total,
      bar: didAnyBar,
      strengthDone: ['a', 'b'].includes(planId) ? progress.done : null
    });
    state.history = state.history.slice(-40);
    delete state.active[planId];
    if (progress.done > 0 && planId === 'a') state.prefs.nextStrength = 'b';
    if (progress.done > 0 && planId === 'b') state.prefs.nextStrength = 'a';
    if (didAnyBar) state.prefs.lastBarAt = completedAt;
    if (didHardBar) state.prefs.lastHardBarAt = (session && session.lastHardBarAt) || completedAt;
    if (didHeavyNegative) state.prefs.lastHeavyNegativeAt = (session && session.lastHeavyNegativeAt) || completedAt;
    if (state.timer && state.timer.key.startsWith(planId + ':')) state.timer = null;
    saveState();
    const consumeFocusEntry = Boolean(focusState) && focusPushed;
    if (focusState) {
      focusState = null;
      focus.hidden = true;
      focus.innerHTML = '';
      document.body.classList.remove('wo-focus-open');
      setBackgroundInert(false);
    }
    focusPushed = false;
    currentView = 'today';
    showToast('Записано: ' + finalProgress.done + ' из ' + finalProgress.total + ' подходов');
    announce('Записано: ' + finalProgress.done + ' из ' + finalProgress.total + ' подходов');
    if (consumeFocusEntry) {
      // Consume the entry pushed by openFocus; popstate lands the page on Сегодня.
      pendingCompleteAfterBack = true;
      history.back();
      return;
    }
    renderApp();
    updateURL('replace');
    window.scrollTo({ top: 0, behavior: 'auto' });
    const todayTitle = document.getElementById('todayTitle');
    if (todayTitle) todayTitle.focus({ preventScroll: true });
  }

  function getTimerRemaining(timer) {
    if (!timer) return 0;
    if (timer.status === 'running') return Math.max(0, timer.endsAt - Date.now());
    return Math.max(0, timer.remainingMs || 0);
  }

  function formatMs(ms) {
    const total = Math.ceil(Math.max(0, ms) / 1000);
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return minutes + ':' + String(seconds).padStart(2, '0');
  }

  function getTimerView(key, seconds) {
    const active = state.timer && state.timer.key === key ? state.timer : null;
    if (!active) return { display: formatMs(seconds * 1000), action: 'Старт', status: 'idle' };
    const remaining = getTimerRemaining(active);
    const status = remaining <= 0 ? 'done' : active.status;
    const action = status === 'running' ? 'Пауза' : (status === 'paused' ? 'Продолжить' : (status === 'done' ? 'Ещё раз' : 'Старт'));
    return { display: status === 'done' ? 'готово' : formatMs(remaining), action: action, status: status };
  }

  function toggleTimer(planId, slot, seconds) {
    const key = planId + ':' + slot;
    const durationMs = seconds * 1000;
    if (!state.timer || state.timer.key !== key || getTimerRemaining(state.timer) <= 0) {
      state.timer = {
        key: key,
        durationMs: durationMs,
        remainingMs: durationMs,
        endsAt: Date.now() + durationMs,
        status: 'running'
      };
      announce('Таймер запущен на ' + seconds + ' секунд');
    } else if (state.timer.status === 'running') {
      state.timer.remainingMs = getTimerRemaining(state.timer);
      state.timer.status = 'paused';
      state.timer.endsAt = null;
      announce('Таймер на паузе');
    } else {
      state.timer.endsAt = Date.now() + state.timer.remainingMs;
      state.timer.status = 'running';
      announce('Таймер продолжен');
    }
    saveState();
    ensureTimerLoop();
    updateTimerNodes();
  }

  function resetTimer(planId, slot, seconds) {
    const key = planId + ':' + slot;
    state.timer = {
      key: key,
      durationMs: seconds * 1000,
      remainingMs: seconds * 1000,
      endsAt: null,
      status: 'paused'
    };
    saveState();
    updateTimerNodes();
    announce('Таймер сброшен');
  }

  function ensureTimerLoop() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    if (state.timer && state.timer.status === 'running') {
      timerInterval = setInterval(timerTick, 250);
    }
  }

  function timerTick() {
    if (!state.timer || state.timer.status !== 'running') {
      ensureTimerLoop();
      return;
    }
    if (getTimerRemaining(state.timer) <= 0) {
      state.timer.status = 'done';
      state.timer.remainingMs = 0;
      state.timer.endsAt = null;
      saveState();
      ensureTimerLoop();
      announce('Время вышло');
      showToast('Таймер · готово');
    }
    updateTimerNodes();
  }

  function updateTimerNodes() {
    document.querySelectorAll('[data-timer-display]').forEach(function (node) {
      const key = node.dataset.timerDisplay;
      const active = state.timer && state.timer.key === key ? state.timer : null;
      const wrap = node.closest('.wo-timer');
      const toggle = wrap ? wrap.querySelector('[data-action="timer-toggle"]') : null;
      if (!active) {
        const seconds = toggle ? Number(toggle.dataset.seconds) : 0;
        node.textContent = formatMs(Math.max(0, seconds) * 1000);
        if (wrap) wrap.classList.remove('is-running', 'is-paused', 'is-done');
        if (toggle) toggle.textContent = 'Старт';
        return;
      }
      const remaining = getTimerRemaining(active);
      const status = remaining <= 0 ? 'done' : active.status;
      node.textContent = status === 'done' ? 'готово' : formatMs(remaining);
      if (wrap) {
        wrap.classList.toggle('is-running', status === 'running');
        wrap.classList.toggle('is-paused', status === 'paused');
        wrap.classList.toggle('is-done', status === 'done');
        if (toggle) toggle.textContent = status === 'running' ? 'Пауза' : (status === 'done' ? 'Ещё раз' : 'Продолжить');
      }
    });
  }

  function announce(message) {
    announcer.textContent = '';
    requestAnimationFrame(function () {
      announcer.textContent = message;
    });
  }

  function showToast(message) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toast.classList.remove('is-leaving');
    toast.textContent = message;
    toast.hidden = false;
    toastTimeout = setTimeout(function () {
      toast.classList.add('is-leaving');
      toastTimeout = setTimeout(function () {
        toast.hidden = true;
        toast.classList.remove('is-leaving');
      }, 200);
    }, 1800);
  }

  function restoreControlFocus(predicate) {
    const target = Array.from(document.querySelectorAll('[data-action]')).find(predicate);
    if (target) target.focus({ preventScroll: true });
  }

  function setPreference(key, value) {
    if (!Object.prototype.hasOwnProperty.call(DEFAULT_STATE.prefs, key)) return;
    state.prefs[key] = value;
    saveState();
    renderApp();
    restoreControlFocus(function (control) {
      return control.dataset.action === 'pref' && control.dataset.key === key && control.dataset.value === value;
    });
  }

  document.addEventListener('click', function (event) {
    // A tap on stale UI (page left open across midnight) refreshes instead of acting.
    if (handleDayRollover()) {
      renderApp();
      if (focusState) renderFocus(false);
      showToast('Наступил новый день — отметки обновлены.');
      announce('Наступил новый день, страница обновлена.');
      return;
    }
    const tab = event.target.closest('.wo-tab');
    if (tab) {
      setView(tab.dataset.view);
      return;
    }

    const control = event.target.closest('[data-action]');
    if (!control) return;
    const action = control.dataset.action;

    if (action === 'pref') {
      setPreference(control.dataset.key, control.dataset.value);
    } else if (action === 'toggle-bar') {
      const available = !barAvailableToday();
      setBarAvailableToday(available);
      if (!available && state.timer && state.timer.key.startsWith('bar:') && state.timer.status === 'running') {
        state.timer.remainingMs = getTimerRemaining(state.timer);
        state.timer.status = 'paused';
        state.timer.endsAt = null;
        saveState();
        ensureTimerLoop();
      }
      renderApp();
      if (focusState) renderFocus(false);
      announce(available ? 'Турник отмечен.' : 'Сегодня без турника.');
      const barStart = available && currentView === 'bar'
        ? document.querySelector('[data-action="start-focus"][data-plan="bar"]')
        : null;
      if (barStart) barStart.focus({ preventScroll: true });
      else restoreControlFocus(function (candidate) { return candidate.dataset.action === 'toggle-bar'; });
    } else if (action === 'open-plan') {
      setView(control.dataset.plan);
    } else if (action === 'start-focus') {
      openFocus(control.dataset.plan, null, true);
    } else if (action === 'open-focus') {
      openFocus(control.dataset.plan, control.dataset.slot, true);
    } else if (action === 'focus-close') {
      closeFocus(true);
    } else if (action === 'focus-nav') {
      navigateFocus(Number(control.dataset.direction), false);
    } else if (action === 'focus-skip') {
      navigateFocus(1, false);
    } else if (action === 'focus-done') {
      navigateFocus(1, true);
    } else if (action === 'toggle-set') {
      toggleSet(control.dataset.plan, control.dataset.slot, Number(control.dataset.set), focus.contains(control));
    } else if (action === 'complete-plan') {
      completePlan(control.dataset.plan);
    } else if (action === 'select-level') {
      if (control.dataset.level !== state.prefs.pullLevel && hasActiveBarWork()) {
        showToast('Сначала нужно закончить тренировку на турнике.');
        announce('Ступень можно поменять после этой тренировки.');
        return;
      }
      state.prefs.pullLevel = control.dataset.level;
      saveState();
      renderApp();
      showToast('Текущая ступень: ' + PULL_LEVELS[pullLevelIndex()].title);
      announce('Текущая ступень: ' + PULL_LEVELS[pullLevelIndex()].title);
      restoreControlFocus(function (candidate) {
        return candidate.dataset.action === 'select-level' && candidate.dataset.level === control.dataset.level;
      });
    } else if (action === 'timer-toggle') {
      if (control.dataset.plan === 'bar' && !barAvailableToday()) {
        showToast('Здесь нужен турник.');
        announce('Таймер не запущен: для него нужен турник.');
        return;
      }
      toggleTimer(control.dataset.plan, control.dataset.slot, Number(control.dataset.seconds));
    } else if (action === 'timer-reset') {
      if (control.dataset.plan === 'bar' && !barAvailableToday()) {
        showToast('Здесь нужен турник.');
        announce('Таймер не сброшен: для него нужен турник.');
        return;
      }
      resetTimer(control.dataset.plan, control.dataset.slot, Number(control.dataset.seconds));
    }
  });

  document.addEventListener('input', function (event) {
    const input = event.target.closest('[data-result-input]');
    if (!input) return;
    if (handleDayRollover()) {
      renderApp();
      if (focusState) renderFocus(false);
      showToast('Наступил новый день — отметки обновлены.');
      announce('Наступил новый день, страница обновлена.');
      return;
    }
    if (input.dataset.plan === 'bar' && !barAvailableToday()) return;
    const session = ensureSession(input.dataset.plan);
    session.results[input.dataset.slot] = input.value.slice(0, 80);
    session.lastActivityAt = new Date().toISOString();
    saveState();
  });

  window.addEventListener('popstate', function () {
    const fromFocusClose = closingViaBack;
    closingViaBack = false;
    const completeAfterBack = pendingCompleteAfterBack;
    pendingCompleteAfterBack = false;
    const entryPushed = Boolean(history.state && history.state.focusPushed);
    handleDayRollover();
    if (focusState) {
      focusState = null;
      focus.hidden = true;
      focus.innerHTML = '';
      document.body.classList.remove('wo-focus-open');
      setBackgroundInert(false);
    }
    focusPushed = false;
    if (completeAfterBack) {
      currentView = 'today';
      renderApp();
      updateURL('replace');
      window.scrollTo({ top: 0, behavior: 'auto' });
      const todayTitle = document.getElementById('todayTitle');
      if (todayTitle) todayTitle.focus({ preventScroll: true });
      return;
    }
    const params = new URLSearchParams(location.search);
    const nextView = params.get('short') === '1'
      ? 'quick'
      : (VALID_VIEWS.has(params.get('w')) ? params.get('w') : 'today');
    currentView = nextView;
    renderApp();
    const requestedPlan = params.get('plan');
    const focusPlan = VALID_VIEWS.has(requestedPlan) && requestedPlan !== 'today'
      ? requestedPlan
      : (currentView !== 'today' ? currentView : null);
    let openedFocus = false;
    if (params.get('focus') === '1' && focusPlan && !fromFocusClose) {
      const rawStep = params.get('step');
      const step = rawStep === null ? null : Number(rawStep);
      focusPushed = entryPushed;
      openedFocus = openFocus(focusPlan, params.get('ex'), false, Number.isInteger(step) ? step : null) === true;
      if (!openedFocus) focusPushed = false;
    }
    if (openedFocus) return;
    if (fromFocusClose) {
      const restore = pendingFocusRestore;
      pendingFocusRestore = null;
      let target = null;
      if (restore) {
        target = Array.from(document.querySelectorAll('[data-action]')).find(function (control) {
          return control.dataset.action === restore.action &&
            (control.dataset.plan || null) === restore.plan &&
            (control.dataset.slot || null) === restore.slot;
        });
      }
      if (target) { target.focus({ preventScroll: true }); return; }
    }
    document.getElementById('workoutMain').focus({ preventScroll: true });
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) return;
    if (handleDayRollover()) {
      renderApp();
      if (focusState) renderFocus(false);
    }
    timerTick();
  });

  window.addEventListener('storage', function (event) {
    if (event.key !== STORAGE_KEY) return;
    try {
      state = mergeState(event.newValue ? JSON.parse(event.newValue) : null);
    } catch (error) {
      state = clone(DEFAULT_STATE);
    }
    ensureTimerLoop();
    if (document.activeElement && document.activeElement.matches && document.activeElement.matches('[data-result-input]')) {
      // Re-rendering would destroy the field mid-word; the next local input wins anyway.
      updateTimerNodes();
      return;
    }
    renderApp();
    if (focusState) renderFocus(false);
    updateTimerNodes();
  });

  document.addEventListener('keydown', function (event) {
    if (!focusState) return;
    if (event.key === 'Escape') {
      closeFocus(true);
      return;
    }
    if (event.key === 'Tab') {
      const focusables = Array.from(focus.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
      )).filter(function (element) {
        return element.getClientRects().length > 0;
      });
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && (document.activeElement === first || !focus.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !focus.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  if (state.timer && state.timer.status === 'running' && getTimerRemaining(state.timer) <= 0) {
    state.timer.status = 'done';
    state.timer.remainingMs = 0;
    state.timer.endsAt = null;
    saveState();
  }

  const initialParams = new URLSearchParams(location.search);
  const initialEntryPushed = Boolean(history.state && history.state.focusPushed);
  handleDayRollover();
  saveState();
  requestPersistentStorage();
  renderApp();
  ensureTimerLoop();
  updateURL('replace');

  const initialRequestedPlan = initialParams.get('plan');
  const initialFocusPlan = VALID_VIEWS.has(initialRequestedPlan) && initialRequestedPlan !== 'today'
    ? initialRequestedPlan
    : (currentView !== 'today' ? currentView : null);
  if (initialParams.get('focus') === '1' && initialFocusPlan) {
    const rawStep = initialParams.get('step');
    const step = rawStep === null ? null : Number(rawStep);
    focusPushed = initialEntryPushed;
    if (openFocus(initialFocusPlan, initialParams.get('ex'), false, Number.isInteger(step) ? step : null) !== true) {
      focusPushed = false;
    }
  }
})();
