/* ========================================
   Dutch Textbook — Data Layer
   All content, navigation, groups
   ======================================== */

/* ========== CANONICAL GROUPS ========== */
const GROUPS={
  overview:{ru:'Сводка',en:'Overview'},
  rule:{ru:'Правило',en:'Rule'},
  formation:{ru:'Как устроено',en:'Formation'},
  types:{ru:'Разновидности',en:'Types'},
  watchout:{ru:'Осторожно',en:'Watch Out'},
  reference:{ru:'Справочник',en:'Reference'},
};

/* ========== NAV STRUCTURE — 5 blocks ========== */
const BLOCK_ICONS={
  basis:'<svg viewBox="0 0 22 22" width="16" height="16"><text x="2" y="9" font-family="Manrope,sans-serif" font-size="9" font-weight="600" fill="currentColor">A</text><text x="7" y="16" font-family="Manrope,sans-serif" font-size="9" font-weight="600" fill="currentColor">B</text><text x="12" y="9" font-family="Manrope,sans-serif" font-size="9" font-weight="600" fill="currentColor">C</text></svg>',
  woorden:'<svg viewBox="0 0 22 22" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="5" r="3.5"/><path d="M13 2l3 3-3 3-3-3z"/><path d="M2 15h10l3 3-3 3H2z"/></svg>',
  werkwoord:'<svg viewBox="0 0 22 22" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="8" r="6"/><path d="M11 5v3l2.5 1.5"/><path d="M3 18h10"/><path d="M3 21h10"/></svg>',
  zinsbouw:'<svg viewBox="0 0 22 22" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="12" width="5" height="6" rx="1"/><rect x="8" y="12" width="5" height="6" rx="1"/><rect x="15" y="12" width="5" height="6" rx="1"/><path d="M3.5 9C3.5 5 17.5 5 17.5 9"/><path d="M15.5 7.5l2 2 2-2"/></svg>',
  naslagwerk:'<svg viewBox="0 0 22 22" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="14" height="18" rx="2"/><path d="M6 6h6"/><path d="M6 10h4"/><path d="M6 14h6"/><path d="M18 5h2v4h-2"/><path d="M18 11h2v4h-2"/></svg>',
};
const BLOCKS=[
  {id:'basis',name:{ru:'Основы',en:'Basics'},color:'var(--blue)',guides:[
    {id:'basics',title:{ru:'Базовые основы',en:'Basics'},sub:'De basis',level:'A1-A2'},
  ]},
  {id:'woorden',name:{ru:'Слова',en:'Words'},color:'var(--purple)',guides:[
    {id:'adjectives',title:{ru:'Прилагательные',en:'Adjectives'},sub:'Bijvoeglijke naamwoorden',level:'A2-B1'},
    {id:'pronouns',title:{ru:'Местоимения',en:'Pronouns'},sub:'Voornaamwoorden',level:'A2-B1'},
    {id:'prepositions',title:{ru:'Предлоги',en:'Prepositions'},sub:'Voorzetsels',level:'A2-B1'},
  ]},
  {id:'werkwoord',name:{ru:'Глагол',en:'Verb'},color:'var(--green)',guides:[
    {id:'conjugation',title:{ru:'Спряжение',en:'Conjugation'},sub:'Vervoeging',level:'A1-A2'},
    {id:'verbs',title:{ru:'Глаголы: формы',en:'Verb Forms'},sub:'Werkwoorden',level:'A2-B1'},
    {id:'tenses',title:{ru:'Времена',en:'Tenses'},sub:'Tijden',level:'A2-B2'},
    {id:'modal',title:{ru:'Модальные',en:'Modal Verbs'},sub:'Modale werkwoorden',level:'A2-B1'},
    {id:'hebben_zijn',title:{ru:'Hebben of zijn?',en:'Hebben of zijn?'},sub:'Вспомогательный',level:'A2'},
  ]},
  {id:'zinsbouw',name:{ru:'Предложение',en:'Sentence'},color:'var(--orange)',guides:[
    {id:'word_order',title:{ru:'Порядок слов',en:'Word Order'},sub:'Woordvolgorde',level:'A2-B1'},
    {id:'prefixes',title:{ru:'Приставки',en:'Prefixes'},sub:'Scheidbare werkwoorden',level:'A2-B1'},
    {id:'passive',title:{ru:'Пассив',en:'Passive'},sub:'Lijdende vorm',level:'B1'},
  ]},
  {id:'naslagwerk',name:{ru:'Справочник',en:'Reference'},color:'var(--teal)',guides:[
    {id:'numerals',title:{ru:'Числительные',en:'Numerals'},sub:'Telwoorden',level:'A1-A2'},
    {id:'vocabulary',title:{ru:'Словообразование',en:'Word Formation'},sub:'Woordenschat',level:'A2-B2'},
    {id:'phrasebook',title:{ru:'Разговорник',en:'Phrasebook'},sub:'Praktische zinnen',level:'A1-A2'},
  ]},
];
function getBlockForGuide(id){for(const b of BLOCKS){const g=b.guides.find(x=>x.id===id);if(g)return{block:b,guide:g};}return null;}

/* ========== HELPERS ========== */
function det(id,label,html){return`<button class="det-btn" onclick="toggleDet('${id}',this)"><span class="arr">›</span> ${label}</button><div class="det-body" id="dt-${id}">${html}</div>`;}

/* ========================================
   GUIDE DATA
   ======================================== */

const GUIDES={

/* ──────────────────────────────────────────
   BASICS — Базовые основы
   ────────────────────────────────────────── */
basics:{
  title:{ru:'Базовые основы',en:'Basics'},subtitle:'De basis',level:'A1-A2',
  summary(l){const R=l==='ru';return[
    R?'Артикли: <span class="smono">de</span> (75%) и <span class="smono">het</span> (25%)':'Articles: <span class="smono">de</span> (75%) and <span class="smono">het</span> (25%)',
    R?'Множественное: <span class="smono">-en</span> (большинство) или <span class="smono">-s</span>':'Plural: <span class="smono">-en</span> (most) or <span class="smono">-s</span>',
    R?'Уменьшительные → всегда <span class="smono">het</span>':'Diminutives → always <span class="smono">het</span>',
    R?'Отрицание: <span class="smono">geen</span> + сущ., <span class="smono">niet</span> + всё остальное':'Negation: <span class="smono">geen</span> + noun, <span class="smono">niet</span> + everything else',
  ];},
  sections:[
    {id:'pronunciation',group:'reference',title:{ru:'Произношение',en:'Pronunciation'},content(l){const R=l==='ru';return`
      <div class="subsection"><div class="ss-title">${R?'Согласные':'Consonants'}</div>
      <table class="dtable"><thead><tr><th>${R?'Буква':'Letter'}</th><th>${R?'Звук':'Sound'}</th><th>${R?'Примеры':'Examples'}</th><th></th></tr></thead><tbody>
        <tr><td class="pron-letter">g</td><td class="pron-sound">${R?'гортанный х':'guttural h'}</td><td class="pron-examples">goed, gaan, zeggen</td><td class="pron-note">${R?'На юге мягче':'Softer in the south'}</td></tr>
        <tr><td class="pron-letter">ch</td><td class="pron-sound">${R?'х (твёрже русского)':'h (harder)'}</td><td class="pron-examples">acht, noch, lachen</td><td class="pron-note">${R?'Мягче чем g':'Softer than g'}</td></tr>
        <tr><td class="pron-letter">sch</td><td class="pron-sound">s + g</td><td class="pron-examples">school, schip</td><td class="pron-note"></td></tr>
        <tr><td class="pron-letter">r</td><td class="pron-sound">${R?'картавый / раскатистый':'uvular / rolled'}</td><td class="pron-examples">rood, drie, waar</td><td class="pron-note">${R?'Зависит от региона':'Regional'}</td></tr>
        <tr><td class="pron-letter">w</td><td class="pron-sound">${R?'между в и у':'between v and w'}</td><td class="pron-examples">wat, water, week</td><td class="pron-note"></td></tr>
        <tr><td class="pron-letter">v</td><td class="pron-sound">${R?'ближе к ф':'closer to f'}</td><td class="pron-examples">van, vragen, vijf</td><td class="pron-note"></td></tr>
      </tbody></table></div>

      <div class="subsection"><div class="ss-title">${R?'Сочетания гласных':'Vowel Combinations'}</div>
      <table class="dtable"><thead><tr><th>${R?'Буквы':'Letters'}</th><th>${R?'Звук':'Sound'}</th><th>${R?'Примеры':'Examples'}</th><th></th></tr></thead><tbody>
        <tr><td class="pron-letter">ij / ei</td><td class="pron-sound">${R?'между ай и эй':'between ai and ei'}</td><td class="pron-examples">ijs, mijn / trein, klein</td><td class="pron-note">${R?'Одинаково!':'Same sound!'}</td></tr>
        <tr><td class="pron-letter">oe</td><td class="pron-sound">${R?'у (долгий)':'oo (long)'}</td><td class="pron-examples">boek, goed, moet</td><td class="pron-note">${R?'Не о-э!':'Not o-e!'}</td></tr>
        <tr><td class="pron-letter">ui</td><td class="pron-sound">${R?'нет аналога':'no equivalent'}</td><td class="pron-examples">huis, uit, ui</td><td class="pron-note">${R?'Округлите губы':'Round lips'}</td></tr>
        <tr><td class="pron-letter">eu</td><td class="pron-sound">${R?'как нем. ö':'like German ö'}</td><td class="pron-examples">neus, deur, leuk</td><td class="pron-note"></td></tr>
        <tr><td class="pron-letter">ou / au</td><td class="pron-sound">${R?'ау':'ow'}</td><td class="pron-examples">oud, koud / blauw</td><td class="pron-note">${R?'Одинаково':'Same'}</td></tr>
      </tbody></table></div>`;
    }},

    {id:'vowels',group:'rule',title:{ru:'Долгие и короткие гласные',en:'Long & Short Vowels'},content(l){const R=l==='ru';return`
      <div class="rule-box">
        <div class="rule-text">${R?'Тип слога определяет длину гласной':'Syllable type determines vowel length'}</div>
        <div class="rule-note">${R?'Открытый слог → долгая · Закрытый → короткая':'Open syllable → long · Closed → short'}</div>
      </div>
      <table class="dtable"><thead><tr><th>${R?'Короткая':'Short'}</th><th>${R?'Звук':'Sound'}</th><th>${R?'Долгая':'Long'}</th><th>${R?'Звук':'Sound'}</th></tr></thead><tbody>
        <tr><td class="mc">man</td><td>${R?'а краткий':'short a'}</td><td class="mc">maan</td><td>${R?'аа долгий':'long aa'}</td></tr>
        <tr><td class="mc">bed</td><td>${R?'э краткий':'short e'}</td><td class="mc">been</td><td>${R?'эй долгий':'long ee'}</td></tr>
        <tr><td class="mc">bos</td><td>${R?'о краткий':'short o'}</td><td class="mc">boom</td><td>${R?'оо долгий':'long oo'}</td></tr>
        <tr><td class="mc">bus</td><td>${R?'ü краткий':'short ü'}</td><td class="mc">buur</td><td>${R?'ü долгий':'long ü'}</td></tr>
      </tbody></table>
      ${det('vow_spell',R?'Как влияет на написание':'Spelling rules',`
        <div class="tip">${R?'Два слога, первый открытый → пишем одну букву: <strong>maan → manen</strong>. Сохраняем короткую → удваиваем согласную: <strong>man → mannen</strong>.':'Two syllables, open first → single letter: <strong>maan → manen</strong>. Keep short → double consonant: <strong>man → mannen</strong>.'}</div>
        <div class="comparison pairs">
          <div class="cmp"><div class="pair-word">maan → manen</div><div class="pair-label">aa → a</div></div>
          <div class="cmp"><div class="pair-word">man → mannen</div><div class="pair-label">nn</div></div>
          <div class="cmp"><div class="pair-word">boom → bomen</div><div class="pair-label">oo → o</div></div>
          <div class="cmp"><div class="pair-word">kat → katten</div><div class="pair-label">tt</div></div>
        </div>
      `)}`;
    }},

    {id:'articles',group:'rule',title:{ru:'Артикли de и het',en:'Articles de & het'},content(l){const R=l==='ru';return`
      <div class="rule-box">
        <div class="rule-text">${R?'~75% слов — de, ~25% — het':'~75% are de, ~25% are het'}</div>
        <div class="rule-note">${R?'Если не уверены — угадывайте de!':'When unsure — guess de!'}</div>
      </div>
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">${R?'Всегда de':'Always de'}</div>
          <div class="cmp-ex cmp-note cmp-note--dim">${R?'Мн. число · Люди · Деревья, фрукты · Горы, реки':'Plurals · People · Trees, fruits · Mountains, rivers'}</div></div>
        <div class="cmp"><div class="cmp-label">${R?'Всегда het':'Always het'}</div>
          <div class="cmp-ex cmp-note cmp-note--dim">${R?'Уменьш. (-je) · Инфинитив · Языки, спорт · Металлы · ge- слова':'Dimin. (-je) · Infinitives · Languages, sports · Metals · ge- words'}</div></div>
      </div>
      ${det('art_het',R?'Частые het-слова':'Common het-words',`
        <div class="tip" style="font-style:normal"><span class="mc">het huis · het kind · het meisje · het water · het boek · het jaar · het hoofd · het werk · het woord · het land · het geld · het eten · het probleem</span></div>
      `)}`;
    }},

    {id:'plural',group:'formation',title:{ru:'Множественное число',en:'Plural'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th>${R?'Окончание':'Ending'}</th><th>${R?'Когда':'When'}</th><th>${R?'Пример':'Example'}</th></tr></thead><tbody>
        <tr><td class="mc">-en</td><td>${R?'Большинство':'Most words'}</td><td>boek → boeken</td></tr>
        <tr><td class="mc">-en</td><td>${R?'aa→a, oo→o (слог открылся)':'aa→a, oo→o (open syllable)'}</td><td>maan → manen</td></tr>
        <tr><td class="mc">-en</td><td>${R?'Удвоение согласной (сохраняем краткую)':'Double consonant (keep short)'}</td><td>man → mannen</td></tr>
        <tr><td class="mc">-s</td><td>${R?'После -el, -em, -en, -er, -je':'After -el, -em, -en, -er, -je'}</td><td>tafels, meisjes</td></tr>
        <tr><td class="mc">-'s</td><td>${R?'После гласной':'After vowel'}</td><td>auto's, taxi's</td></tr>
      </tbody></table>
      ${det('pl_irr',R?'Неправильные':'Irregular',`
        <div class="examples">
          <div class="ex"><div class="ex-nl">kind → kinderen · ei → eieren · stad → steden</div></div>
        </div>
      `)}
      <div class="trap"><div class="trap-title">f → v, s → z</div>
        <div class="trap-row trap-ok">brief → brie<span class="hi">v</span>en · huis → hui<span class="hi">z</span>en</div>
        <div class="trap-row trap-bad">${R?'Но НЕ с короткой гласной: stof → stoffen, tas → tassen':'But NOT with short vowel: stof → stoffen, tas → tassen'}</div>
      </div>`;
    }},

    {id:'diminutives',group:'formation',title:{ru:'Уменьшительные',en:'Diminutives'},content(l){const R=l==='ru';return`
      <div class="rule-box">
        <div class="rule-text">${R?'Уменьшительные → всегда het':'Diminutives → always het'}</div>
        <div class="rule-note">${R?'Не только размер, но и симпатия!':'Not just size, but affection!'}</div>
      </div>
      <table class="dtable"><thead><tr><th>${R?'Окончание':'Ending'}</th><th>${R?'После':'After'}</th><th>${R?'Пример':'Example'}</th></tr></thead><tbody>
        <tr><td class="mc">-je</td><td>t, k, p, f, ch, s</td><td>boot → bootje</td></tr>
        <tr><td class="mc">-tje</td><td>${R?'долгая гл., -l, -n, -r':'long vowel, -l, -n, -r'}</td><td>stoel → stoeltje</td></tr>
        <tr><td class="mc">-pje</td><td>-m</td><td>boom → boompje</td></tr>
        <tr><td class="mc">-etje</td><td>${R?'-l, -n, -r + краткая гл.':'-l, -n, -r + short vowel'}</td><td>bal → balletje</td></tr>
      </tbody></table>
      <div class="tip">${R?'<strong>een beetje</strong> = немного, <strong>een kopje koffie</strong> = чашечка кофе — очень частые!':'<strong>een beetje</strong> = a little, <strong>een kopje koffie</strong> = a cup of coffee — very common!'}</div>`;
    }},

    {id:'negation',group:'rule',title:{ru:'Отрицание: niet и geen',en:'Negation: niet & geen'},content(l){const R=l==='ru';return`
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">geen</div>
          <div class="cmp-ex cmp-note">${R?'Отрицает <strong>существительное</strong><br>Вместо een / без артикля':'Negates <strong>noun</strong><br>Replaces een / no article'}</div>
          <div class="cmp-ex" style="margin-top:6px"><span class="mc">geen</span> auto, <span class="mc">geen</span> geld</div></div>
        <div class="cmp"><div class="cmp-label">niet</div>
          <div class="cmp-ex cmp-note">${R?'<strong>Всё остальное</strong><br>Глаголы, прилаг., наречия, с de/het':'<strong>Everything else</strong><br>Verbs, adj., adv., with de/het'}</div>
          <div class="cmp-ex" style="margin-top:6px">Ik werk <span class="mc">niet</span></div></div>
      </div>

      <div class="list-card"><div class="lc-head">${R?'Где ставить niet?':'Where to place niet?'}</div>
        <div class="lc-item"><span class="lc-w">${R?'Глагол':'Verb'}</span><span class="lc-e">${R?'В конце':'End'}: Ik werk <strong>niet</strong>.</span></div>
        <div class="lc-item"><span class="lc-w">${R?'Прилаг.':'Adj.'}</span><span class="lc-e">${R?'Перед ним':'Before it'}: Hij is <strong>niet</strong> ziek.</span></div>
        <div class="lc-item"><span class="lc-w">${R?'Предлог':'Prep.'}</span><span class="lc-e">${R?'Перед ним':'Before it'}: Ik ga <strong>niet</strong> naar school.</span></div>
        <div class="lc-item"><span class="lc-w">${R?'Сост. время':'Compound'}</span><span class="lc-e">${R?'Перед прич.':'Before part.'}: Ik heb <strong>niet</strong> gewerkt.</span></div>
        <div class="lc-item"><span class="lc-w">${R?'Придаточн.':'Subord.'}</span><span class="lc-e">${R?'Перед глаг.':'Before verb'}: ...dat ik <strong>niet</strong> werk.</span></div>
      </div>`;
    }},
  ]
},

/* ──────────────────────────────────────────
   WORD ORDER — Порядок слов (restructured)
   ────────────────────────────────────────── */
word_order:{
  title:{ru:'Порядок слов',en:'Word Order'},subtitle:'Woordvolgorde',level:'A2-B1',
  summary(l){const R=l==='ru';return[
    R?'Главное: глагол на <span class="smono">2-м месте</span>':'Main: verb in <span class="smono">2nd position</span>',
    R?'Придаточное: глагол(ы) <span class="smono">в конец</span>':'Subordinate: verb(s) <span class="smono">to the end</span>',
    R?'want = V2, omdat = V-конец':'want = V2, omdat = V-end',
    R?'Середина: <span class="smono">TMP</span> — время → способ → место':'Middle: <span class="smono">TMP</span> — time → manner → place',
  ];},
  sections:[
    {id:'main_clause',group:'rule',title:{ru:'Главное предложение',en:'Main Clause'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'Глагол ВСЕГДА на 2-м месте':'Verb is ALWAYS in 2nd position'}</div><div class="rule-note">${R?'Неважно, что стоит первым':'No matter what comes first'}</div></div>
      <div class="formula">[X] + <span class="v1">${R?'ГЛАГ':'VERB'}</span> + [${R?'ост.':'rest'}] + [<span class="v2">${R?'конец':'end'}</span>]</div>
      <div class="examples">
        <div class="ex"><div class="ex-nl"><span class="subj">Ik</span> <span class="v1">werk</span> thuis.</div><div class="ex-ru">${R?'Я работаю дома.':'I work at home.'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="subj">Vandaag</span> <span class="v1">werk</span> ik thuis.</div><div class="ex-ru">${R?'Сегодня я работаю дома.':'Today I work at home.'}</div><div class="ex-note">${R?'инверсия':'inversion'}</div></div>
      </div>
      ${det('mc_m',R?'Ещё примеры':'More',`<div class="examples"><div class="ex"><div class="ex-nl"><span class="subj">Thuis</span> <span class="v1">werk</span> ik het beste.</div><div class="ex-ru">${R?'Дома я работаю лучше всего.':'At home I work the best.'}</div></div></div><div class="tip">${R?'Первое слово не подлежащее? Подлежащее после глагола = <strong>инверсия</strong>.':'First word not subject? Subject after verb = <strong>inversion</strong>.'}</div>`)}
      <div class="subsection"><div class="ss-title">${R?'Два глагола':'Two Verbs'}</div>
        <div class="formula">[X] + <span class="v1">V₁</span> + [...] + <span class="v2">v₂</span></div>
        <div class="examples"><div class="ex"><div class="ex-nl">Ik <span class="v1">wil</span> morgen <span class="v2">komen</span>.</div><div class="ex-ru">${R?'Я хочу завтра прийти.':'I want to come tomorrow.'}</div></div></div>
        ${det('mc_c',R?'Ещё':'More',`<div class="examples"><div class="ex"><div class="ex-nl">Hij <span class="v1">heeft</span> een boek <span class="v2">gelezen</span>.</div><div class="ex-ru">${R?'Он прочитал книгу.':'He read a book.'}</div></div></div>`)}
      </div>
      <div class="list-card"><div class="lc-head">${R?'Что уходит в конец':'End position'}</div>
        <div class="lc-item"><span class="lc-w">${R?'Инфинитив':'Infinitive'}</span><span class="lc-e">Ik wil <span class="v2">komen</span>.</span></div>
        <div class="lc-item"><span class="lc-w">${R?'Причастие':'Participle'}</span><span class="lc-e">Ik heb <span class="v2">gewerkt</span>.</span></div>
        <div class="lc-item"><span class="lc-w">${R?'Приставка':'Prefix'}</span><span class="lc-e">Ik sta vroeg <span class="v2">op</span>.</span></div>
        <div class="lc-item"><span class="lc-w">${R?'Прил./сущ.':'Adj./noun'}</span><span class="lc-e">Hij is <span class="v2">ziek</span>.</span></div>
      </div>`;}},
    {id:'questions',group:'rule',title:{ru:'Вопросы',en:'Questions'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'Да/нет → V1 · Вопр. слово → V2':'Yes/no → V1 · Q-word → V2'}</div></div>
      <div class="examples">
        <div class="ex"><div class="ex-nl"><span class="v1">Kom</span> je morgen?</div><div class="ex-note">${R?'да/нет — V1':'yes/no — V1'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="subj">Wanneer</span> <span class="v1">kom</span> je?</div><div class="ex-note">${R?'вопр. слово — V2':'q-word — V2'}</div></div>
      </div>`;}},
    {id:'tmp',group:'rule',title:{ru:'TMP',en:'TMP'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">Tijd → Manier → Plaats</div><div class="rule-note">${R?'Время → Способ → Место':'Time → Manner → Place'}</div></div>
      <div class="examples"><div class="ex"><div class="ex-nl">Ik ga <span class="subj">morgen</span> <span class="conj">met de trein</span> <span class="v2">naar Amsterdam</span>.</div><div class="ex-ru">${R?'Я еду завтра на поезде в Амстердам.':'I go tomorrow by train to Amsterdam.'}</div></div></div>`;}},
    {id:'subordinate',group:'rule',title:{ru:'Придаточное',en:'Subordinate'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'ВСЕ глаголы → в КОНЕЦ':'ALL verbs → to the END'}</div><div class="rule-note">${R?'После подчинительного союза':'After subordinating conjunction'}</div></div>
      <div class="formula"><span class="conj">${R?'союз':'conj.'}</span> + [S] + [...] + <span class="v1">${R?'ГЛАГ(Ы)':'VERB(S)'}</span></div>
      <div class="examples">
        <div class="ex"><div class="ex-nl">...<span class="conj">dat</span> ik morgen <span class="v1">kom</span>.</div><div class="ex-ru">${R?'...что я завтра приду.':'...that I come tomorrow.'}</div></div>
        <div class="ex"><div class="ex-nl">...<span class="conj">omdat</span> hij ziek <span class="v1">is</span>.</div><div class="ex-ru">${R?'...потому что он болен.':'...because he is ill.'}</div></div>
      </div>
      <div class="subsection"><div class="ss-title">${R?'Сравните':'Compare'}</div>
        <div class="comparison"><div class="cmp"><div class="cmp-label">${R?'Главное (V2)':'Main (V2)'}</div><div class="cmp-ex">Ik <span class="v1">kan</span> niet <span class="v2">komen</span>.</div></div><div class="cmp"><div class="cmp-label">${R?'Придаточное':'Subordinate'}</div><div class="cmp-ex">...<span class="conj">dat</span> ik niet <span class="v1">kan komen</span>.</div></div></div>
      </div>
      ${det('sub_m',R?'Ещё':'More',`<div class="examples"><div class="ex"><div class="ex-nl">...<span class="conj">dat</span> ik niet <span class="v1">kan komen</span>.</div><div class="ex-ru">${R?'...что я не могу прийти.':'...that I cannot come.'}</div></div></div>`)}`;}},
    {id:'conjunctions',group:'types',title:{ru:'Союзы',en:'Conjunctions'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th>${R?'Тип':'Type'}</th><th>${R?'Союзы':'Conj.'}</th><th>${R?'Эффект':'Effect'}</th></tr></thead><tbody>
        <tr><td style="font-weight:500">${R?'Сочинит.':'Coord.'}</td><td class="mc">en, maar, of, want</td><td>${R?'V2 (обычный)':'V2 (normal)'}</td></tr>
        <tr><td style="font-weight:500">${R?'Подчинит.':'Subord.'}</td><td class="mc">dat, omdat, als...</td><td>${R?'V → конец':'V → end'}</td></tr>
        <tr><td style="font-weight:500">${R?'Наречия':'Adverb.'}</td><td class="mc">daarom, toch, dus...</td><td>${R?'Инверсия':'Inversion'}</td></tr>
      </tbody></table>
      <div class="examples">
        <div class="ex"><div class="ex-nl">...<span class="conj">want</span> ik <span class="v1">ben</span> ziek.</div><div class="ex-note">${R?'сочин. → V2':'coord. → V2'}</div></div>
        <div class="ex"><div class="ex-nl">...<span class="conj">omdat</span> ik ziek <span class="v1">ben</span>.</div><div class="ex-note">${R?'подчин. → V-конец':'subord. → V-end'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="conj">Daarom</span> <span class="v1">blijf</span> ik thuis.</div><div class="ex-note">${R?'наречие → инверсия':'adverb → inversion'}</div></div>
      </div>`;}},
    {id:'traps',group:'watchout',title:{ru:'Ловушки',en:'Traps'},content(l){const R=l==='ru';return`
      <div class="trap"><div class="trap-title">want vs omdat</div><div class="trap-desc">${R?'want — V2, omdat — V-конец':'want — V2, omdat — V-end'}</div>
        <div class="trap-row trap-ok">✓ ...want ik <span class="v1">ben</span> ziek.</div><div class="trap-row trap-ok">✓ ...omdat ik ziek <span class="v1">ben</span>.</div>
        <div class="trap-row trap-bad">✗ ...want ik ziek ben.</div><div class="trap-row trap-bad">✗ ...omdat ik ben ziek.</div></div>
      <div class="trap"><div class="trap-title">dus</div>
        <div class="trap-row">...dus ik <span class="v1">blijf</span> thuis <span style="opacity:.3;font-size:10px">${R?'серед.':'mid.'}</span></div>
        <div class="trap-row"><span class="conj">Dus</span> <span class="v1">blijf</span> ik thuis <span style="opacity:.3;font-size:10px">${R?'начало':'start'}</span></div></div>
      <div class="trap"><div class="trap-title">toen / wanneer / als</div>
        <div class="trap-row"><span class="conj">toen</span> — ${R?'однократное прошлое':'one-time past'}</div>
        <div class="trap-row"><span class="conj">wanneer</span> — ${R?'вопрос / повтор.':'question / recurring'}</div>
        <div class="trap-row"><span class="conj">als</span> — ${R?'условие / повтор.':'condition / recurring'}</div></div>`;}},
    {id:'conjunction_table',group:'reference',title:{ru:'Все союзы',en:'All Conjunctions'},content(l){const R=l==='ru';
      function grp(t,items){return`<div class="conj-group"><div class="cg-title">${t}</div>${items.map(r=>`<div class="cr"><span class="cr-nl">${r[0]}</span><span class="cr-ru">${r[1]}</span><span class="cr-ex">${r[2]}</span></div>`).join('')}</div>`;}
      return`
        ${grp(R?'Сочинительные':'Coordinating',[['en',R?'и':'and','...en hij <span class="v1">studeert</span>.'],['maar',R?'но':'but','...maar ik <span class="v1">heb</span> geen tijd.'],['of',R?'или':'or','...of <span class="v1">blijf</span> je?'],['want',R?'потому что':'because','...want ik <span class="v1">ben</span> ziek.']])}
        ${grp(R?'Подчинит. — время':'Sub. — time',[['toen',R?'когда (прошл.)':'when (past)','...toen ik <span class="v1">was</span>.'],['als',R?'когда/если':'when/if','...als het <span class="v1">regent</span>.'],['voordat',R?'до того как':'before','...voordat ik <span class="v1">vertrek</span>.'],['nadat',R?'после':'after','...nadat hij <span class="v1">gekomen</span> is.'],['terwijl',R?'пока':'while','...terwijl ik <span class="v1">werk</span>.']])}
        ${det('ct_m',R?'Ещё союзы':'More',`
          ${grp(R?'Причина':'Reason',[['omdat',R?'потому что':'because','...omdat ik ziek <span class="v1">ben</span>.'],['doordat',R?'из-за':'due to','...doordat hij <span class="v1">kwam</span>.']])}
          ${grp(R?'Условие':'Condition',[['als',R?'если':'if','...als je <span class="v1">wilt</span>.'],['tenzij',R?'если не':'unless','...tenzij het <span class="v1">regent</span>.']])}
          ${grp(R?'Другие':'Other',[['dat',R?'что':'that','...dat hij <span class="v1">komt</span>.'],['hoewel',R?'хотя':'although','...hoewel ik <span class="v1">ben</span>.'],['zodat',R?'чтобы':'so that','...zodat ik <span class="v1">kan</span> komen.']])}
          ${grp(R?'Наречия (инверсия!)':'Adverbs (inversion!)',[['daarom',R?'поэтому':'therefore','Daarom <span class="v1">blijf</span> ik.'],['toch',R?'всё же':'yet','Toch <span class="v1">ga</span> ik.'],['dus',R?'итак':'so','Dus <span class="v1">gaan</span> we?']])}
        `)}`;}},
  ]
},

/* ──────────────────────────────────────────
   STUBS — remaining 12 guides (structure only)
   ────────────────────────────────────────── */
adjectives:{title:{ru:'Прилагательные',en:'Adjectives'},subtitle:'Bijvoeglijke naamwoorden',level:'A2-B1',
  summary(l){const R=l==='ru';return[R?'Почти всегда <span class="smono">-e</span>':'Almost always <span class="smono">-e</span>',R?'Исключение: het + een + ед.ч. → без -e':'Exception: het + een + sg → no -e',R?'Степени: <span class="smono">-er</span>, <span class="smono">-st</span>':'Degrees: <span class="smono">-er</span>, <span class="smono">-st</span>'];},
  sections:[
    {id:'rule',group:'rule',title:{ru:'Правило + дерево решений',en:'Rule + Decision Tree'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'Почти всегда +e':'Almost always +e'}</div><div class="rule-note">${R?'Единственное исключение: het-слово + een (или без артикля) + ед.ч.':'Only exception: het-word + een (or no article) + sg.'}</div></div>
      <div class="tree">
        <div class="tree-node">
          <div class="tree-q">${R?'Это het-слово?':'Is it a het-word?'}</div>
          <div class="tree-branches">
            <div class="tree-b tree-b-no"><span class="tree-b-label">${R?'нет →':'no →'}</span><span class="tree-b-exit">${R?'всегда -e':'always -e'}</span></div>
            <div class="tree-b tree-b-yes"><span class="tree-b-label">${R?'да ↓':'yes ↓'}</span></div>
          </div>
          <div class="tree-child">
            <div class="tree-node">
              <div class="tree-q">${R?'Определённый артикль (het, dit, dat)?':'Definite article (het, dit, dat)?'}</div>
              <div class="tree-branches">
                <div class="tree-b tree-b-yes"><span class="tree-b-label">${R?'да →':'yes →'}</span><span class="tree-b-exit">-e</span></div>
                <div class="tree-b tree-b-no"><span class="tree-b-label">${R?'нет ↓':'no ↓'}</span></div>
              </div>
              <div class="tree-child">
                <div class="tree-node">
                  <div class="tree-q">${R?'Единственное число?':'Singular?'}</div>
                  <div class="tree-branches">
                    <div class="tree-b tree-b-no"><span class="tree-b-label">${R?'нет →':'no →'}</span><span class="tree-b-exit">${R?'-e (мн.ч. всегда)':'-e (plural always)'}</span></div>
                    <div class="tree-b tree-b-yes"><span class="tree-b-label">${R?'да →':'yes →'}</span><span class="tree-b-exit" style="color:#c53030">${R?'без -e ✓':'no -e ✓'}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="examples">
        <div class="ex"><div class="ex-nl">een <span class="hi">groot</span> huis</div><div class="ex-ru">${R?'het + een + ед.ч. → без -e':'het + een + sg → no -e'}</div></div>
        <div class="ex"><div class="ex-nl">het <span class="hi">grote</span> huis</div><div class="ex-ru">${R?'het + определённый → -e':'het + definite → -e'}</div></div>
        <div class="ex"><div class="ex-nl">een <span class="hi">grote</span> man</div><div class="ex-ru">${R?'de-слово → всегда -e':'de-word → always -e'}</div></div>
      </div>`;}},
    {id:'table',group:'formation',title:{ru:'Полная таблица',en:'Full Table'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th></th><th>de-${R?'слова':'words'}</th><th>het-${R?'слова':'words'}</th></tr></thead><tbody>
        <tr><td>${R?'Определённый':'Definite'} (de/het)</td><td class="mc">de grot<span class="hi">e</span> man</td><td class="mc">het grot<span class="hi">e</span> huis</td></tr>
        <tr><td>${R?'Неопределённый':'Indefinite'} (een)</td><td class="mc">een grot<span class="hi">e</span> man</td><td class="mc">een groot huis <span style="color:var(--v1)">✓</span></td></tr>
        <tr><td>${R?'Без артикля ед.ч.':'No article sg.'}</td><td class="mc">lekker<span class="hi">e</span> koffie</td><td class="mc">koud water <span style="color:var(--v1)">✓</span></td></tr>
        <tr><td>${R?'Мн. число':'Plural'}</td><td class="mc">grot<span class="hi">e</span> mannen</td><td class="mc">grot<span class="hi">e</span> huizen</td></tr>
      </tbody></table>
      ${det('adj_spell',R?'Написание при +e':'Spelling with +e',`
        <div class="list-card"><div class="lc-head">${R?'Правила':'Rules'}</div>
          <div class="lc-item"><span class="lc-w">aa → a</span><span class="lc-e">groot → grot<span class="hi">e</span></span></div>
          <div class="lc-item"><span class="lc-w">${R?'удвоение':'double'}</span><span class="lc-e">dik → dikk<span class="hi">e</span></span></div>
          <div class="lc-item"><span class="lc-w">f → v</span><span class="lc-e">lief → liev<span class="hi">e</span></span></div>
          <div class="lc-item"><span class="lc-w">s → z</span><span class="lc-e">boos → boz<span class="hi">e</span></span></div>
        </div>
      `)}`;}},
    {id:'comparison',group:'formation',title:{ru:'Степени сравнения',en:'Comparison'},content(l){const R=l==='ru';return`
      <div class="formula">${R?'сравнит.':'comp.'}: + <span class="hi">-er</span> &nbsp;&nbsp;|&nbsp;&nbsp; ${R?'превосх.':'superl.'}: + <span class="hi">-st</span></div>
      <table class="dtable"><thead><tr><th></th><th>-er</th><th>-st</th></tr></thead><tbody>
        <tr><td class="mc">klein</td><td class="mc">kleiner</td><td class="mc">kleinst</td></tr>
        <tr><td class="mc">groot</td><td class="mc">groter</td><td class="mc">grootst</td></tr>
        <tr><td class="mc">mooi</td><td class="mc">mooier</td><td class="mc">mooist</td></tr>
        <tr><td class="mc">duur</td><td class="mc">duur<span class="hi">der</span></td><td class="mc">duurst</td></tr>
      </tbody></table>
      <div class="examples">
        <div class="ex"><div class="ex-nl">Jan is <span class="hi">ouder</span> <span class="conj">dan</span> Piet.</div><div class="ex-ru">${R?'Ян старше Пита.':'Jan is older than Piet.'}</div></div>
        <div class="ex"><div class="ex-nl">net zo groot <span class="conj">als</span>...</div><div class="ex-ru">${R?'такой же большой как...':'just as big as...'}</div></div>
        <div class="ex"><div class="ex-nl">Hij is <span class="hi">het</span> snelst.</div><div class="ex-ru">${R?'Он самый быстрый. (het + без -e)':'He is the fastest.'}</div></div>
      </div>`;}},
    {id:'adverbs',group:'types',title:{ru:'Наречия',en:'Adverbs'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'Наречие = прилагательное без -e':'Adverb = adjective without -e'}</div><div class="rule-note">${R?'Никакого специального суффикса (не как -ly в англ.)':'No special suffix (unlike -ly in English)'}</div></div>
      <div class="examples">
        <div class="ex"><div class="ex-nl">Hij is <span class="hi">snel</span>. → Hij loopt <span class="hi">snel</span>.</div><div class="ex-ru">${R?'Он быстрый. → Он бежит быстро.':'He is fast. → He runs fast.'}</div></div>
        <div class="ex"><div class="ex-nl">Zij is <span class="hi">mooi</span>. → Zij zingt <span class="hi">mooi</span>.</div><div class="ex-ru">${R?'Она красивая. → Она красиво поёт.':'She is beautiful. → She sings beautifully.'}</div></div>
      </div>
      <div class="tip">${R?'Степени сравнения наречий — те же: <strong>sneller, het snelst</strong>.':'Adverb comparison — same: <strong>sneller, het snelst</strong>.'}</div>`;}},
    {id:'irregular',group:'watchout',title:{ru:'Неправильные и исключения',en:'Irregular & Exceptions'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th></th><th>-er</th><th>-st</th></tr></thead><tbody>
        <tr><td class="mc">goed</td><td class="mc"><span class="hi">beter</span></td><td class="mc"><span class="hi">best</span></td></tr>
        <tr><td class="mc">veel</td><td class="mc"><span class="hi">meer</span></td><td class="mc"><span class="hi">meest</span></td></tr>
        <tr><td class="mc">weinig</td><td class="mc"><span class="hi">minder</span></td><td class="mc"><span class="hi">minst</span></td></tr>
        <tr><td class="mc">graag</td><td class="mc"><span class="hi">liever</span></td><td class="mc"><span class="hi">liefst</span></td></tr>
      </tbody></table>
      <div class="list-card"><div class="lc-head">${R?'Никогда не склоняются':'Never inflect'}</div>
        <div class="lc-item"><span class="lc-w">${R?'Материалы':'Materials'}</span><span class="lc-e">een <span class="hi">houten</span> tafel, een <span class="hi">gouden</span> ring</span></div>
        <div class="lc-item"><span class="lc-w">${R?'На -en':'Ending -en'}</span><span class="lc-e">een <span class="hi">open</span> deur, een <span class="hi">eigen</span> kamer</span></div>
        <div class="lc-item"><span class="lc-w">${R?'Заимств.':'Borrowed'}</span><span class="lc-e">een <span class="hi">oranje</span> jas, een <span class="hi">plastic</span> tas</span></div>
      </div>
      <div class="tip">${R?'После iets/niets/wat → <strong>+s</strong> (не -e!): iets mooi<strong>s</strong>, niets nieuw<strong>s</strong>':'After iets/niets/wat → <strong>+s</strong> (not -e!): iets mooi<strong>s</strong>, niets nieuw<strong>s</strong>'}</div>`;}},
  ]
},
pronouns:{title:{ru:'Местоимения',en:'Pronouns'},subtitle:'Voornaamwoorden',level:'A2-B1',
  summary(l){const R=l==='ru';return[R?'Личные: ik/mij, jij/jou, hij/hem...':'Personal: ik/mij, jij/jou, hij/hem...',R?'Возвратные: <span class="smono">zich</span> — только 3-е лицо и u':'Reflexive: <span class="smono">zich</span> — only 3rd person & u',R?'<span class="smono">er</span> — три функции!':'<span class="smono">er</span> — three functions!'];},
  sections:[
    {id:'overview',group:'overview',title:{ru:'Сводная таблица',en:'Overview Table'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th>${R?'Субъ.':'Subj.'}</th><th>${R?'Объ.':'Obj.'}</th><th>${R?'Прит.':'Poss.'}</th><th>${R?'Возвр.':'Refl.'}</th><th></th></tr></thead><tbody>
        <tr><td class="mc">ik</td><td class="mc">mij/me</td><td class="mc">mijn</td><td class="mc">me</td><td>${R?'я':'I'}</td></tr>
        <tr><td class="mc">jij/je</td><td class="mc">jou/je</td><td class="mc">jouw/je</td><td class="mc">je</td><td>${R?'ты':'you'}</td></tr>
        <tr><td class="mc">u</td><td class="mc">u</td><td class="mc">uw</td><td class="mc">zich</td><td>${R?'Вы':'you (formal)'}</td></tr>
        <tr><td class="mc">hij</td><td class="mc">hem</td><td class="mc">zijn</td><td class="mc">zich</td><td>${R?'он':'he'}</td></tr>
        <tr><td class="mc">zij/ze</td><td class="mc">haar</td><td class="mc">haar</td><td class="mc">zich</td><td>${R?'она':'she'}</td></tr>
        <tr><td class="mc">het</td><td class="mc">het</td><td class="mc">zijn</td><td class="mc">zich</td><td>${R?'оно':'it'}</td></tr>
        <tr><td class="mc">wij/we</td><td class="mc">ons</td><td class="mc">ons/onze</td><td class="mc">ons</td><td>${R?'мы':'we'}</td></tr>
        <tr><td class="mc">jullie</td><td class="mc">jullie</td><td class="mc">jullie</td><td class="mc">je</td><td>${R?'вы':'you pl.'}</td></tr>
        <tr><td class="mc">zij/ze</td><td class="mc">hen/hun</td><td class="mc">hun</td><td class="mc">zich</td><td>${R?'они':'they'}</td></tr>
      </tbody></table>
      <div class="tip">${R?'Через / — безударные формы. <strong>ons</strong> + het-слово, <strong>onze</strong> + de-слово/мн.ч.':'After / — unstressed forms. <strong>ons</strong> + het-word, <strong>onze</strong> + de-word/pl.'}</div>
      <div class="trap"><div class="trap-title">hen vs hun vs ze</div>
        <div class="trap-row"><span class="mc">hen</span> — ${R?'прямое доп. + после предлога':'direct obj. + after prep.'}: Ik zie <span class="hi">hen</span>. Met <span class="hi">hen</span>.</div>
        <div class="trap-row"><span class="mc">hun</span> — ${R?'косвенное доп.':'indirect obj.'}: Ik geef <span class="hi">hun</span> een boek.</div>
        <div class="trap-row"><span class="mc">ze</span> — ${R?'разговорная замена обоих':'colloquial replacement'}</div>
      </div>`;}},
    {id:'reflexive',group:'types',title:{ru:'Возвратные',en:'Reflexive'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'zich — только 3-е лицо и u':'zich — only 3rd person & u'}</div><div class="rule-note">${R?'Остальные = обычное объектное местоимение':'Rest = normal object pronoun'}</div></div>
      <table class="dtable conj-grid"><thead><tr><th></th><th>${R?'Возвр.':'Refl.'}</th><th>${R?'Пример':'Example'}</th></tr></thead><tbody>
        <tr><td>ik</td><td class="mc">me</td><td>Ik was <span class="hi">me</span>.</td></tr>
        <tr><td>jij</td><td class="mc">je</td><td>Jij wast <span class="hi">je</span>.</td></tr>
        <tr><td>u / hij / zij</td><td class="mc">zich</td><td>Hij wast <span class="hi">zich</span>.</td></tr>
        <tr><td>wij</td><td class="mc">ons</td><td>Wij wassen <span class="hi">ons</span>.</td></tr>
      </tbody></table>
      ${det('refl_v',R?'Возвратные глаголы':'Reflexive verbs',`
        <div class="list-card"><div class="lc-head">${R?'Частые':'Common'}</div>
          <div class="cr"><span class="cr-nl">zich wassen</span><span class="cr-ru">${R?'мыться':'to wash'}</span></div>
          <div class="cr"><span class="cr-nl">zich voelen</span><span class="cr-ru">${R?'чувствовать себя':'to feel'}</span></div>
          <div class="cr"><span class="cr-nl">zich herinneren</span><span class="cr-ru">${R?'вспоминать':'to remember'}</span></div>
          <div class="cr"><span class="cr-nl">zich voorstellen</span><span class="cr-ru">${R?'представляться':'to introduce'}</span></div>
          <div class="cr"><span class="cr-nl">zich vergissen</span><span class="cr-ru">${R?'ошибаться':'to be mistaken'}</span></div>
        </div>
        <div class="tip">${R?'Позиция: <strong>сразу после глагола</strong>. В придаточном — сразу после подлежащего.':'Position: <strong>right after verb</strong>. In subordinate — right after subject.'}</div>
      `)}`;}},
    {id:'demonstrative',group:'types',title:{ru:'Указательные',en:'Demonstrative'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th></th><th>de-${R?'слово':'word'}</th><th>het-${R?'слово':'word'}</th><th>${R?'мн.ч.':'pl.'}</th></tr></thead><tbody>
        <tr><td>${R?'Близко (этот)':'Near (this)'}</td><td class="mc">deze</td><td class="mc">dit</td><td class="mc">deze</td></tr>
        <tr><td>${R?'Далеко (тот)':'Far (that)'}</td><td class="mc">die</td><td class="mc">dat</td><td class="mc">die</td></tr>
      </tbody></table>
      <div class="examples">
        <div class="ex"><div class="ex-nl"><span class="hi">Deze</span> man / <span class="hi">dit</span> boek / <span class="hi">die</span> vrouw / <span class="hi">dat</span> huis</div></div>
        <div class="ex"><div class="ex-nl"><span class="hi">Dit</span> is mijn boek. <span class="hi">Dat</span> is mooi.</div><div class="ex-ru">${R?'Это моя книга. Это красиво.':'This is my book. That is nice.'}</div></div>
      </div>`;}},
    {id:'relative',group:'types',title:{ru:'Относительные',en:'Relative'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th>${R?'Антецедент':'Antecedent'}</th><th>${R?'Мест.':'Pron.'}</th><th>${R?'Пример':'Example'}</th></tr></thead><tbody>
        <tr><td>de-${R?'слово':'word'}</td><td class="mc">die</td><td>de man <span class="hi">die</span> daar staat</td></tr>
        <tr><td>het-${R?'слово':'word'}</td><td class="mc">dat</td><td>het boek <span class="hi">dat</span> ik lees</td></tr>
        <tr><td>${R?'человек + предлог':'person + prep.'}</td><td class="mc">prep + wie</td><td>de man met <span class="hi">wie</span> ik sprak</td></tr>
        <tr><td>${R?'вещь + предлог':'thing + prep.'}</td><td class="mc">waar + prep</td><td>het boek <span class="hi">waarover</span> ik las</td></tr>
        <tr><td>alles/iets/niets</td><td class="mc">wat</td><td>alles <span class="hi">wat</span> ik weet</td></tr>
      </tbody></table>
      <div class="tip">${R?'В придаточном глагол идёт в конец! De vrouw <strong>die</strong> hier <strong>woont</strong>, is arts.':'In the clause verb goes to end! De vrouw <strong>die</strong> hier <strong>woont</strong>, is arts.'}</div>`;}},
    {id:'er',group:'reference',title:{ru:'Er — три функции',en:'Er — Three Functions'},content(l){const R=l==='ru';return`
      <div class="list-card"><div class="lc-head">${R?'Три значения':'Three meanings'}</div>
        <div class="lc-item"><span class="lc-w">${R?'Место':'Place'}</span><span class="lc-e">${R?'= там':'= there'}: Ik ben <span class="hi">er</span>.</span></div>
        <div class="lc-item"><span class="lc-w">${R?'+ предлог':'+ prep.'}</span><span class="lc-e">${R?'= об этом, с этим...':'= about it...'}: Ik denk <span class="hi">eraan</span>.</span></div>
        <div class="lc-item"><span class="lc-w">${R?'+ число':'+ number'}</span><span class="lc-e">${R?'= их (количество)':'= of them'}: Ik heb <span class="hi">er</span> drie.</span></div>
      </div>
      <div class="examples">
        <div class="ex"><div class="ex-nl">Ik denk <span class="hi">eraan</span>.</div><div class="ex-ru">${R?'Я думаю об этом. (denken aan)':'I think about it.'}</div></div>
        <div class="ex"><div class="ex-nl">Ik hou <span class="hi">ervan</span>.</div><div class="ex-ru">${R?'Я это люблю. (houden van)':'I love it.'}</div></div>
        <div class="ex"><div class="ex-nl">Hoeveel appels? — Ik heb <span class="hi">er</span> drie.</div><div class="ex-ru">${R?'Сколько яблок? — У меня их три.':'How many? — I have three.'}</div></div>
      </div>
      ${det('er_forms',R?'Все формы: er/daar/hier/waar':'All forms',`
        <table class="dtable"><thead><tr><th>er-</th><th>daar-</th><th>hier-</th><th>waar-?</th><th></th></tr></thead><tbody>
          <tr><td class="mc">eraan</td><td class="mc">daaraan</td><td class="mc">hieraan</td><td class="mc">waaraan</td><td>aan</td></tr>
          <tr><td class="mc">erop</td><td class="mc">daarop</td><td class="mc">hierop</td><td class="mc">waarop</td><td>op</td></tr>
          <tr><td class="mc">erin</td><td class="mc">daarin</td><td class="mc">hierin</td><td class="mc">waarin</td><td>in</td></tr>
          <tr><td class="mc">ermee</td><td class="mc">daarmee</td><td class="mc">hiermee</td><td class="mc">waarmee</td><td>met</td></tr>
          <tr><td class="mc">erover</td><td class="mc">daarover</td><td class="mc">hierover</td><td class="mc">waarover</td><td>over</td></tr>
        </tbody></table>
        <div class="trap"><div class="trap-title">${R?'Нельзя':'Cannot say'}: *aan het, *met dat</div><div class="trap-row">${R?'Только: <strong>eraan</strong>, <strong>daarmee</strong>':'Only: <strong>eraan</strong>, <strong>daarmee</strong>'}</div></div>
      `)}`;}},
  ]
},
verbs:{title:{ru:'Глаголы: формы',en:'Verb Forms'},subtitle:'Werkwoorden',level:'A2-B1',
  summary(l){const R=l==='ru';return[R?'Правильные: <span class="smono">\'t kofschip</span> → -te, остальные → -de':'Regular: <span class="smono">\'t kofschip</span> → -te, rest → -de',R?'Причастие: <span class="smono">ge-</span> + основа + -t/-d/-en':'Participle: <span class="smono">ge-</span> + stem + -t/-d/-en',R?'Неправильные: паттерны гласных (ij→ee→e...)':'Irregular: vowel patterns (ij→ee→e...)'];},
  sections:[
    {id:'regular',group:'rule',title:{ru:'Правильные: \'t kofschip',en:'Regular: \'t kofschip'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'Последняя буква основы в \'t kofschip → -te(n)':'Last letter of stem in \'t kofschip → -te(n)'}</div><div class="rule-note">${R?'Остальные → -de(n)':'Rest → -de(n)'}</div></div>
      <div class="formula">t · k · f · s · ch · p → <span class="v1">-te / -ten</span> &nbsp;&nbsp;|&nbsp;&nbsp; ${R?'остальные':'rest'} → <span class="v2">-de / -den</span></div>
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">-te (kofschip)</div><div class="cmp-ex"><span class="mc">werken → werk<span class="v1">te</span></span></div><div class="cmp-ex"><span class="mc">maken → maak<span class="v1">te</span></span></div></div>
        <div class="cmp"><div class="cmp-label">-de (${R?'остальные':'rest'})</div><div class="cmp-ex"><span class="mc">wonen → woon<span class="v2">de</span></span></div><div class="cmp-ex"><span class="mc">leven → leef<span class="v2">de</span></span></div></div>
      </div>
      <div class="tip">${R?'Мнемоника: <strong>\'t kofschip</strong> — запомни это «слово», в нём все нужные буквы.':'Mnemonic: <strong>\'t kofschip</strong> — remember this "word", it contains all the letters.'}</div>
    `;}},
    {id:'participle',group:'rule',title:{ru:'Причастие (ge-)',en:'Participle (ge-)'},content(l){const R=l==='ru';return`
      <div class="formula"><span class="v1">ge-</span> + ${R?'основа':'stem'} + <span class="v1">-t/-d</span> &nbsp; (${R?'правильные':'regular'}) &nbsp;|&nbsp; <span class="v1">ge-</span> + ... + <span class="v1">-en</span> &nbsp; (${R?'неправильные':'irregular'})</div>
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">'t kofschip → -t</div><div class="cmp-ex"><span class="mc">werken → <span class="v1">ge</span>werk<span class="v1">t</span></span></div></div>
        <div class="cmp"><div class="cmp-label">${R?'остальные':'rest'} → -d</div><div class="cmp-ex"><span class="mc">wonen → <span class="v1">ge</span>woon<span class="v1">d</span></span></div></div>
      </div>
      <div class="list-card"><div class="lc-head">${R?'Без ge-':'No ge-'}</div>
        <div class="lc-item"><span class="lc-w">be-</span><span class="lc-e">betalen → betaald</span></div>
        <div class="lc-item"><span class="lc-w">ver-</span><span class="lc-e">vergeten → vergeten</span></div>
        <div class="lc-item"><span class="lc-w">ont-</span><span class="lc-e">ontmoeten → ontmoet</span></div>
        <div class="lc-item"><span class="lc-w">her-</span><span class="lc-e">herhalen → herhaald</span></div>
        <div class="lc-item"><span class="lc-w">ge-</span><span class="lc-e">gebruiken → gebruikt</span></div>
        <div class="lc-item"><span class="lc-w">-eren</span><span class="lc-e">studeren → ge<span class="hi">studeerd</span></span></div>
      </div>
    `;}},
    {id:'patterns',group:'types',title:{ru:'Паттерны гласных',en:'Vowel Patterns'},content(l){const R=l==='ru';
      function vp(name,verbs){return`<div class="vp-group"><div class="vp-name">${name}</div><table class="vp-table"><tbody>${verbs.map(v=>`<tr><td class="vp-inf">${v[0]}</td><td class="vp-form">${v[1]}</td><td class="vp-form">${v[2]}</td><td class="vp-ru">${v[3]}</td></tr>`).join('')}</tbody></table></div>`;}
      return`
        <div class="tip">${R?'Неправильные глаголы меняют гласную по паттернам. Запоминайте группами!':'Irregular verbs change vowels in patterns. Memorize by group!'}</div>
        ${vp('ij → ee → e',[['blijven','bleef/bleven','gebleven',R?'оставаться':'to stay'],['schrijven','schreef/schreven','geschreven',R?'писать':'to write'],['rijden','reed/reden','gereden',R?'ехать':'to drive'],['kijken','keek/keken','gekeken',R?'смотреть':'to look']])}
        ${vp('i → o → o',[['drinken','dronk/dronken','gedronken',R?'пить':'to drink'],['vinden','vond/vonden','gevonden',R?'находить':'to find'],['beginnen','begon/begonnen','begonnen',R?'начинать':'to begin'],['zingen','zong/zongen','gezongen',R?'петь':'to sing']])}
        ${det('vp_more',R?'Ещё паттерны':'More patterns',`
          ${vp('ie → oo → o',[['kiezen','koos/kozen','gekozen',R?'выбирать':'to choose'],['vliegen','vloog/vlogen','gevlogen',R?'летать':'to fly'],['verliezen','verloor/verloren','verloren',R?'терять':'to lose']])}
          ${vp('e → a → e',[['geven','gaf/gaven','gegeven',R?'давать':'to give'],['lezen','las/lazen','gelezen',R?'читать':'to read'],['eten','at/aten','gegeten',R?'есть':'to eat']])}
          ${vp('a → oe → a',[['dragen','droeg/droegen','gedragen',R?'носить':'to carry'],['slaan','sloeg/sloegen','geslagen',R?'бить':'to hit']])}
        `)}
      `;}},
    {id:'groups',group:'types',title:{ru:'По группам',en:'By Group'},content(l){const R=l==='ru';
      function vp(name,verbs){return`<div class="vp-group"><div class="vp-name">${name}</div><table class="vp-table"><tbody>${verbs.map(v=>`<tr><td class="vp-inf">${v[0]}</td><td class="vp-form">${v[1]}</td><td class="vp-form">${v[2]}</td><td class="vp-ru">${v[3]}</td></tr>`).join('')}</tbody></table></div>`;}
      return`
        ${vp(R?'🚶 Движение':'🚶 Movement',[['gaan','ging/gingen','gegaan',R?'идти (zijn)':'to go'],['komen','kwam/kwamen','gekomen',R?'приходить (zijn)':'to come'],['lopen','liep/liepen','gelopen',R?'ходить':'to walk'],['rijden','reed/reden','gereden',R?'ехать':'to drive'],['vliegen','vloog/vlogen','gevlogen',R?'летать':'to fly']])}
        ${vp(R?'💬 Коммуникация':'💬 Communication',[['zeggen','zei/zeiden','gezegd',R?'говорить':'to say'],['spreken','sprak/spraken','gesproken',R?'разговаривать':'to speak'],['schrijven','schreef/schreven','geschreven',R?'писать':'to write'],['lezen','las/lazen','gelezen',R?'читать':'to read']])}
        ${det('grp_more',R?'Ещё группы':'More groups',`
          ${vp(R?'👁 Восприятие':'👁 Perception',[['zien','zag/zagen','gezien',R?'видеть':'to see'],['kijken','keek/keken','gekeken',R?'смотреть':'to look'],['denken','dacht/dachten','gedacht',R?'думать':'to think'],['weten','wist/wisten','geweten',R?'знать':'to know']])}
          ${vp(R?'🤲 Действия':'🤲 Actions',[['nemen','nam/namen','genomen',R?'брать':'to take'],['geven','gaf/gaven','gegeven',R?'давать':'to give'],['krijgen','kreeg/kregen','gekregen',R?'получать':'to get'],['brengen','bracht/brachten','gebracht',R?'приносить':'to bring']])}
        `)}
      `;}},
    {id:'important',group:'reference',title:{ru:'20 важных глаголов',en:'20 Important Verbs'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th>Inf.</th><th>Presens (ik/jij/hij)</th><th>Imperf.</th><th>Part.</th><th>${R?'':'Meaning'}</th></tr></thead><tbody>
        <tr><td class="mc">zijn</td><td class="mc">ben/bent/is</td><td class="mc">was/waren</td><td class="mc">geweest</td><td>${R?'быть':'to be'}</td></tr>
        <tr><td class="mc">hebben</td><td class="mc">heb/hebt/heeft</td><td class="mc">had/hadden</td><td class="mc">gehad</td><td>${R?'иметь':'to have'}</td></tr>
        <tr><td class="mc">worden</td><td class="mc">word/wordt</td><td class="mc">werd/werden</td><td class="mc">geworden</td><td>${R?'становиться':'to become'}</td></tr>
        <tr><td class="mc">kunnen</td><td class="mc">kan/kunt/kan</td><td class="mc">kon/konden</td><td class="mc">gekund</td><td>${R?'мочь':'can'}</td></tr>
        <tr><td class="mc">moeten</td><td class="mc">moet</td><td class="mc">moest</td><td class="mc">gemoeten</td><td>${R?'должен':'must'}</td></tr>
        <tr><td class="mc">gaan</td><td class="mc">ga/gaat</td><td class="mc">ging/gingen</td><td class="mc">gegaan</td><td>${R?'идти':'to go'}</td></tr>
        <tr><td class="mc">komen</td><td class="mc">kom/komt</td><td class="mc">kwam/kwamen</td><td class="mc">gekomen</td><td>${R?'приходить':'to come'}</td></tr>
        <tr><td class="mc">doen</td><td class="mc">doe/doet</td><td class="mc">deed/deden</td><td class="mc">gedaan</td><td>${R?'делать':'to do'}</td></tr>
        <tr><td class="mc">zien</td><td class="mc">zie/ziet</td><td class="mc">zag/zagen</td><td class="mc">gezien</td><td>${R?'видеть':'to see'}</td></tr>
        <tr><td class="mc">weten</td><td class="mc">weet</td><td class="mc">wist/wisten</td><td class="mc">geweten</td><td>${R?'знать':'to know'}</td></tr>
      </tbody></table>
      ${det('imp_more',R?'Ещё 10 глаголов':'10 more verbs',`
        <table class="dtable"><tbody>
          <tr><td class="mc">denken</td><td class="mc">denk/denkt</td><td class="mc">dacht</td><td class="mc">gedacht</td><td>${R?'думать':'to think'}</td></tr>
          <tr><td class="mc">zeggen</td><td class="mc">zeg/zegt</td><td class="mc">zei</td><td class="mc">gezegd</td><td>${R?'говорить':'to say'}</td></tr>
          <tr><td class="mc">staan</td><td class="mc">sta/staat</td><td class="mc">stond</td><td class="mc">gestaan</td><td>${R?'стоять':'to stand'}</td></tr>
          <tr><td class="mc">zitten</td><td class="mc">zit</td><td class="mc">zat</td><td class="mc">gezeten</td><td>${R?'сидеть':'to sit'}</td></tr>
          <tr><td class="mc">liggen</td><td class="mc">lig/ligt</td><td class="mc">lag</td><td class="mc">gelegen</td><td>${R?'лежать':'to lie'}</td></tr>
          <tr><td class="mc">nemen</td><td class="mc">neem/neemt</td><td class="mc">nam</td><td class="mc">genomen</td><td>${R?'брать':'to take'}</td></tr>
          <tr><td class="mc">houden</td><td class="mc">houd/houdt</td><td class="mc">hield</td><td class="mc">gehouden</td><td>${R?'держать':'to hold'}</td></tr>
          <tr><td class="mc">brengen</td><td class="mc">breng/brengt</td><td class="mc">bracht</td><td class="mc">gebracht</td><td>${R?'приносить':'to bring'}</td></tr>
          <tr><td class="mc">laten</td><td class="mc">laat</td><td class="mc">liet</td><td class="mc">gelaten</td><td>${R?'позволять':'to let'}</td></tr>
          <tr><td class="mc">mogen</td><td class="mc">mag</td><td class="mc">mocht</td><td class="mc">gemogen</td><td>${R?'можно':'may'}</td></tr>
        </tbody></table>
      `)}
    `;}},
  ]
},
conjugation:{title:{ru:'Спряжение',en:'Conjugation'},subtitle:'Vervoeging',level:'A1-A2',
  summary(l){const R=l==='ru';return[R?'<span class="smono">zijn</span>: ben, bent, is, zijn':'<span class="smono">zijn</span>: ben, bent, is, zijn',R?'<span class="smono">hebben</span>: heb, hebt, heeft, hebben':'<span class="smono">hebben</span>: heb, hebt, heeft, hebben',R?'Инверсия jij: <span class="smono">-t</span> отпадает':'Inversion jij: <span class="smono">-t</span> drops'];},
  sections:[
    {id:'zijn',group:'reference',title:{ru:'Zijn — быть',en:'Zijn — to be'},content(l){const R=l==='ru';
      function cg(hdr,rows){return`<table class="dtable conj-grid"><thead><tr>${hdr.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${i>0?' class="mc"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}
      return`
        ${cg(['',(R?'Форма':'Form')],[['ik','ben'],['jij/je','bent'],['u','bent'],['hij/zij/het','is'],['wij/we','zijn'],['jullie','zijn'],['zij/ze','zijn']])}
        <div class="tip">${R?'При инверсии: <strong>ben jij?</strong> → ben je?':'Inversion: <strong>ben jij?</strong> → ben je?'}</div>
        ${cg(['',(R?'Ед.ч.':'Sg.'),(R?'Мн.ч.':'Pl.')],[['Imperfectum','was','waren']])}
        ${det('zijn_t',R?'Все времена':'All tenses',`
          <div class="examples">
            <div class="ex"><div class="ex-nl"><span class="hi">Perfectum:</span> zijn + geweest</div><div class="ex-ru">${R?'Ik ben ziek geweest. — Я был болен.':'Ik ben ziek geweest.'}</div></div>
            <div class="ex"><div class="ex-nl"><span class="hi">Futurum:</span> zullen + zijn</div><div class="ex-ru">${R?'Ik zal er zijn. — Я буду там.':'Ik zal er zijn.'}</div></div>
            <div class="ex"><div class="ex-nl"><span class="hi">Conditionalis:</span> zou(den) + zijn</div><div class="ex-ru">${R?'Ik zou blij zijn. — Я был бы рад.':'Ik zou blij zijn.'}</div></div>
            <div class="ex"><div class="ex-nl"><span class="hi">Imperativ:</span> Wees!</div><div class="ex-ru">${R?'Wees rustig! — Будь спокоен!':'Wees rustig!'}</div></div>
          </div>`)}
      `;}},
    {id:'hebben',group:'reference',title:{ru:'Hebben — иметь',en:'Hebben — to have'},content(l){const R=l==='ru';
      function cg(hdr,rows){return`<table class="dtable conj-grid"><thead><tr>${hdr.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${i>0?' class="mc"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}
      return`
        ${cg(['',(R?'Форма':'Form')],[['ik','heb'],['jij/je','hebt'],['u','hebt / heeft'],['hij/zij/het','heeft'],['wij/we','hebben'],['jullie','hebben'],['zij/ze','hebben']])}
        <div class="tip">${R?'При инверсии: <strong>heb jij?</strong> (u hebt и u heeft — оба правильны)':'Inversion: <strong>heb jij?</strong> (u hebt and u heeft — both correct)'}</div>
        ${cg(['',(R?'Ед.ч.':'Sg.'),(R?'Мн.ч.':'Pl.')],[['Imperfectum','had','hadden']])}
        ${det('heb_t',R?'Все времена':'All tenses',`
          <div class="examples">
            <div class="ex"><div class="ex-nl"><span class="hi">Perfectum:</span> hebben + gehad</div><div class="ex-ru">${R?'Ik heb geluk gehad. — Мне повезло.':'Ik heb geluk gehad.'}</div></div>
            <div class="ex"><div class="ex-nl"><span class="hi">Futurum:</span> zullen + hebben</div><div class="ex-ru">${R?'U zult geen problemen hebben.':'U zult geen problemen hebben.'}</div></div>
            <div class="ex"><div class="ex-nl"><span class="hi">Conditionalis:</span> zou(den) + hebben</div><div class="ex-ru">${R?'Ik zou graag meer tijd hebben.':'Ik zou graag meer tijd hebben.'}</div></div>
            <div class="ex"><div class="ex-nl"><span class="hi">Imperativ:</span> Heb geduld!</div><div class="ex-ru">${R?'Имей терпение!':'Have patience!'}</div></div>
          </div>`)}
      `;}},
    {id:'worden',group:'reference',title:{ru:'Worden — становиться',en:'Worden — to become'},content(l){const R=l==='ru';
      function cg(hdr,rows){return`<table class="dtable conj-grid"><thead><tr>${hdr.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${i>0?' class="mc"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}
      return`
        ${cg(['',(R?'Форма':'Form')],[['ik','word'],['jij/je','wordt'],['u','wordt'],['hij/zij/het','wordt'],['wij/we','worden'],['jullie','worden'],['zij/ze','worden']])}
        <div class="tip">${R?'При инверсии: <strong>word jij?</strong> Также используется для пассива: Het huis <strong>wordt</strong> gebouwd.':'Inversion: <strong>word jij?</strong> Also used for passive: Het huis <strong>wordt</strong> gebouwd.'}</div>
        ${cg(['',(R?'Ед.ч.':'Sg.'),(R?'Мн.ч.':'Pl.')],[['Imperfectum','werd','werden']])}
        ${det('word_t',R?'Все времена':'All tenses',`
          <div class="examples">
            <div class="ex"><div class="ex-nl"><span class="hi">Perfectum:</span> zijn + geworden</div><div class="ex-ru">${R?'Hij is arts geworden. — Он стал врачом.':'Hij is arts geworden.'}</div></div>
            <div class="ex"><div class="ex-nl"><span class="hi">Futurum:</span> zullen + worden</div><div class="ex-ru">${R?'Het zal beter worden. — Станет лучше.':'Het zal beter worden.'}</div></div>
            <div class="ex"><div class="ex-nl"><span class="hi">Imperativ:</span> Word wakker!</div><div class="ex-ru">${R?'Проснись!':'Wake up!'}</div></div>
          </div>`)}
      `;}},
    {id:'zullen',group:'reference',title:{ru:'Zullen — будущее',en:'Zullen — future'},content(l){const R=l==='ru';
      function cg(hdr,rows){return`<table class="dtable conj-grid"><thead><tr>${hdr.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${i>0?' class="mc"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}
      return`
        ${cg(['',(R?'Форма':'Form')],[['ik','zal'],['jij/je','zult / zal'],['u','zult'],['hij/zij/het','zal'],['wij/we','zullen'],['jullie','zullen'],['zij/ze','zullen']])}
        <div class="tip">${R?'В разговорной речи <strong>jij zal</strong> вместо jij zult. Zou/zouden — для условного наклонения.':'Colloquially <strong>jij zal</strong> instead of jij zult. Zou/zouden — for conditional.'}</div>
        ${cg(['',(R?'Ед.ч.':'Sg.'),(R?'Мн.ч.':'Pl.')],[['Imperfectum','zou','zouden']])}
        <div class="examples">
          <div class="ex"><div class="ex-nl">Ik <span class="hi">zal</span> het doen.</div><div class="ex-ru">${R?'Я сделаю это.':'I will do it.'}</div></div>
          <div class="ex"><div class="ex-nl">Ik <span class="hi">zou</span> graag willen...</div><div class="ex-ru">${R?'Я хотел бы...':'I would like...'}</div></div>
        </div>
      `;}},
  ]
},
tenses:{title:{ru:'Времена',en:'Tenses'},subtitle:'Tijden',level:'A2-B2',
  summary(l){const R=l==='ru';return[R?'Разговорное прошедшее = <span class="smono">perfectum</span>':'Spoken past = <span class="smono">perfectum</span>',R?'Будущее: <span class="smono">zullen</span> (формально) / <span class="smono">gaan</span> (разг.)':'Future: <span class="smono">zullen</span> (formal) / <span class="smono">gaan</span> (casual)',R?'Условные: 3 типа (реальное, нереальное, прошлое)':'Conditionals: 3 types (real, unreal, past)'];},
  sections:[
    {id:'overview',group:'overview',title:{ru:'Сводная таблица',en:'Overview'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th>${R?'Время':'Tense'}</th><th>${R?'Формула':'Formula'}</th><th>${R?'Пример':'Example'}</th></tr></thead><tbody>
        <tr><td>Presens</td><td class="mc">${R?'основа':'stem'} + -t/-en</td><td>Ik werk</td></tr>
        <tr><td>Perfectum</td><td class="mc">hebben/zijn + part.</td><td>Ik heb gewerkt</td></tr>
        <tr><td>Imperfectum</td><td class="mc">${R?'основа':'stem'} + -te/-de</td><td>Ik werkte</td></tr>
        <tr><td>Plusquamperf.</td><td class="mc">had/was + part.</td><td>Ik had gewerkt</td></tr>
        <tr><td>Futurum</td><td class="mc">zullen/gaan + inf.</td><td>Ik zal werken</td></tr>
        <tr><td>Continuous</td><td class="mc">zijn + aan het + inf.</td><td>Ik ben aan het werken</td></tr>
        <tr><td>Conditionalis</td><td class="mc">zou(den) + inf.</td><td>Ik zou werken</td></tr>
      </tbody></table>`;}},
    {id:'presens',group:'formation',title:{ru:'Presens',en:'Presens'},content(l){const R=l==='ru';return`
      <table class="dtable conj-grid"><thead><tr><th></th><th>${R?'Правило':'Rule'}</th><th>${R?'Пример':'Example'}</th></tr></thead><tbody>
        <tr><td>ik</td><td class="mc">${R?'основа':'stem'}</td><td>ik werk</td></tr>
        <tr><td>jij/u/hij</td><td class="mc">${R?'основа':'stem'} + t</td><td>jij werk<span class="hi">t</span></td></tr>
        <tr><td>wij/jullie/zij</td><td class="mc">${R?'инфинитив':'infinitive'}</td><td>wij werk<span class="hi">en</span></td></tr>
      </tbody></table>
      <div class="trap"><div class="trap-title">${R?'Инверсия jij':'Inversion jij'}</div>
        <div class="trap-row">Jij werk<span class="hi">t</span>. → Werk<span style="opacity:.3">—</span> jij?</div>
        <div class="trap-row trap-ok">${R?'-t отпадает при инверсии!':'-t drops with inversion!'}</div>
      </div>`;}},
    {id:'perfectum',group:'formation',title:{ru:'Perfectum',en:'Perfectum'},content(l){const R=l==='ru';return`
      <div class="formula"><span class="v1">hebben/zijn</span> + <span class="v2">ge- + ${R?'основа':'stem'} + -t/-d/-en</span></div>
      <div class="examples">
        <div class="ex"><div class="ex-nl">Ik <span class="v1">heb</span> <span class="v2">gewerkt</span>.</div><div class="ex-ru">${R?'Я работал / поработал.':'I worked / have worked.'}</div></div>
        <div class="ex"><div class="ex-nl">Hij <span class="v1">is</span> <span class="v2">gekomen</span>.</div><div class="ex-ru">${R?'Он пришёл.':'He came.'}</div></div>
      </div>
      <div class="tip">${R?'В разговорной речи — <strong>основное прошедшее время</strong>! Imperfectum используют реже.':'In speech — <strong>the main past tense</strong>! Imperfectum is used less.'}</div>`;}},
    {id:'imperfectum',group:'formation',title:{ru:'Imperfectum',en:'Imperfectum'},content(l){const R=l==='ru';return`
      <div class="formula">${R?'основа':'stem'} + <span class="v1">-te(n)</span> ('t kofschip) / <span class="v2">-de(n)</span> (${R?'остальные':'rest'})</div>
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">'t kofschip → -te</div><div class="cmp-ex"><span class="mc">werken → werk<span class="v1">te</span></span></div></div>
        <div class="cmp"><div class="cmp-label">${R?'остальные':'rest'} → -de</div><div class="cmp-ex"><span class="mc">wonen → woon<span class="v2">de</span></span></div></div>
      </div>
      <div class="examples">
        <div class="ex"><div class="ex-nl">Ik <span class="hi">woonde</span> in Amsterdam.</div><div class="ex-ru">${R?'Я жил в Амстердаме.':'I lived in Amsterdam.'}</div></div>
        <div class="ex"><div class="ex-nl">Het <span class="hi">was</span> koud. De zon <span class="hi">scheen</span>.</div><div class="ex-ru">${R?'Было холодно. Солнце светило.':'It was cold. The sun was shining.'}</div></div>
      </div>`;}},
    {id:'perf_vs_imperf',group:'watchout',title:{ru:'Perfectum vs Imperfectum',en:'Perfectum vs Imperfectum'},content(l){const R=l==='ru';return`
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">Perfectum</div>
          <div class="cmp-ex" style="font-size:12px;color:var(--dim)">${R?'Результат, завершённое, разговор':'Result, completed, conversation'}</div>
          <div class="cmp-ex">Ik heb gegeten.</div></div>
        <div class="cmp"><div class="cmp-label">Imperfectum</div>
          <div class="cmp-ex" style="font-size:12px;color:var(--dim)">${R?'Фон, описание, рассказ':'Background, description, narrative'}</div>
          <div class="cmp-ex">Ik at elke dag om 12 uur.</div></div>
      </div>
      <div class="list-card"><div class="lc-head">${R?'Когда что':'When which'}</div>
        <div class="lc-item"><span class="lc-w">Perfectum</span><span class="lc-e">${R?'Результат виден сейчас: Ik heb mijn haar geverfd.':'Result visible now'}</span></div>
        <div class="lc-item"><span class="lc-w">Perfectum</span><span class="lc-e">${R?'Разговор о прошлом: Heb je al gegeten?':'Conversation about past'}</span></div>
        <div class="lc-item"><span class="lc-w">Imperfectum</span><span class="lc-e">${R?'Описание/фон: Het was mooi weer.':'Description/background'}</span></div>
        <div class="lc-item"><span class="lc-w">Imperfectum</span><span class="lc-e">${R?'Привычка: Elke dag werkte hij hard.':'Habit'}</span></div>
        <div class="lc-item"><span class="lc-w">Imperfectum</span><span class="lc-e">${R?'Рассказ / нарратив':'Story / narrative'}</span></div>
      </div>
      <div class="tip">${R?'В сомнении — <strong>perfectum</strong>. Нидерландцы в разговоре используют его чаще.':'When in doubt — <strong>perfectum</strong>. Dutch speakers use it more in conversation.'}</div>`;}},
    {id:'other_tenses',group:'formation',title:{ru:'Остальные времена',en:'Other Tenses'},content(l){const R=l==='ru';return`
      <div class="subsection"><div class="ss-title">Plusquamperfectum</div>
        <div class="formula">had/was + <span class="v2">${R?'причастие':'participle'}</span></div>
        <div class="examples"><div class="ex"><div class="ex-nl">Ik <span class="hi">had</span> al <span class="v2">gegeten</span> toen hij kwam.</div><div class="ex-ru">${R?'Я уже поел, когда он пришёл.':'I had eaten when he came.'}</div></div></div>
      </div>
      <div class="subsection"><div class="ss-title">Futurum</div>
        <div class="comparison">
          <div class="cmp"><div class="cmp-label">zullen (${R?'формальн.':'formal'})</div><div class="cmp-ex">Ik <span class="hi">zal</span> komen.</div></div>
          <div class="cmp"><div class="cmp-label">gaan (${R?'разг.':'casual'})</div><div class="cmp-ex">Ik <span class="hi">ga</span> werken.</div></div>
        </div>
        <div class="tip">${R?'Часто просто presens + время: <strong>Morgen werk ik thuis.</strong>':'Often just presens + time: <strong>Morgen werk ik thuis.</strong>'}</div>
      </div>
      <div class="subsection"><div class="ss-title">Continuous</div>
        <div class="formula">zijn + <span class="hi">aan het</span> + ${R?'инфинитив':'infinitive'}</div>
        <div class="examples"><div class="ex"><div class="ex-nl">Ik <span class="hi">ben aan het</span> werken.</div><div class="ex-ru">${R?'Я (сейчас) работаю.':'I am working (right now).'}</div></div></div>
      </div>`;}},
    {id:'conditionals',group:'watchout',title:{ru:'Условные предложения',en:'Conditionals'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th>${R?'Тип':'Type'}</th><th>als-${R?'часть':'clause'}</th><th>${R?'Главная':'Main'}</th></tr></thead><tbody>
        <tr><td>${R?'1 (реальное)':'1 (real)'}</td><td class="mc">als + presens</td><td class="mc">presens / zullen</td></tr>
        <tr><td>${R?'2 (нереальное)':'2 (unreal)'}</td><td class="mc">als + imperf.</td><td class="mc">zou(den) + inf.</td></tr>
        <tr><td>${R?'3 (прошлое)':'3 (past)'}</td><td class="mc">als + plusquam.</td><td class="mc">zou + part.</td></tr>
      </tbody></table>
      <div class="examples">
        <div class="ex"><div class="ex-nl"><span class="conj">Als</span> het regent, blijf ik thuis.</div><div class="ex-ru">${R?'Тип 1: Если будет дождь, останусь дома.':'Type 1'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="conj">Als</span> ik rijk <span class="hi">was</span>, <span class="hi">zou</span> ik een huis kopen.</div><div class="ex-ru">${R?'Тип 2: Если бы я был богат...':'Type 2'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="conj">Als</span> ik dat <span class="hi">geweten had</span>, <span class="hi">zou</span> ik anders <span class="hi">gehandeld hebben</span>.</div><div class="ex-ru">${R?'Тип 3: Если бы я знал...':'Type 3'}</div></div>
      </div>
      <div class="tip">${R?'Тип 2: imperfectum НЕ означает прошлое — это сослагательное!':'Type 2: imperfectum does NOT mean past — it is subjunctive!'}</div>`;}},
    {id:'infinitive',group:'reference',title:{ru:'Инфинитив: с te и без',en:'Infinitive: with/without te'},content(l){const R=l==='ru';return`
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">${R?'Без te':'Without te'}</div>
          <div class="cmp-ex" style="font-size:12px;color:var(--dim)">${R?'Модальные, zullen, gaan, komen, blijven, zien, horen, laten':'Modals, zullen, gaan, komen, blijven, zien, horen, laten'}</div>
          <div class="cmp-ex">Ik <span class="hi">kan</span> zwemmen.</div></div>
        <div class="cmp"><div class="cmp-label">${R?'С te':'With te'}</div>
          <div class="cmp-ex" style="font-size:12px;color:var(--dim)">${R?'proberen, beginnen, vergeten, beloven, hoeven':'proberen, beginnen, vergeten, beloven, hoeven'}</div>
          <div class="cmp-ex">Ik probeer <span class="hi">te</span> slapen.</div></div>
      </div>
      <div class="list-card"><div class="lc-head">${R?'Конструкции с te':'Constructions with te'}</div>
        <div class="lc-item"><span class="lc-w">om ... te</span><span class="lc-e">${R?'чтобы':'in order to'}: om brood te kopen</span></div>
        <div class="lc-item"><span class="lc-w">zonder ... te</span><span class="lc-e">${R?'не делая':'without doing'}: zonder te kijken</span></div>
        <div class="lc-item"><span class="lc-w">door ... te</span><span class="lc-e">${R?'благодаря':'by doing'}: door te oefenen</span></div>
        <div class="lc-item"><span class="lc-w">in plaats van ... te</span><span class="lc-e">${R?'вместо':'instead of'}: in plaats van te wachten</span></div>
      </div>
      <div class="trap"><div class="trap-title">${R?'Отделяемые глаголы + te':'Separable verbs + te'}</div>
        <div class="trap-row">opstaan → om <span class="hi">op te staan</span></div>
        <div class="trap-row">meenemen → om <span class="hi">mee te nemen</span></div>
      </div>`;}},
  ]
},
modal:{title:{ru:'Модальные',en:'Modal Verbs'},subtitle:'Modale werkwoorden',level:'A2-B1',
  summary(l){const R=l==='ru';return[R?'После модальных — инфинитив <span class="smono">без te</span>':'After modals — infinitive <span class="smono">without te</span>',R?'Исключение: <span class="smono">hoeven + te</span>':'Exception: <span class="smono">hoeven + te</span>',R?'В перфекте: IPP (двойной инфинитив)':'In perfect: IPP (double infinitive)'];},
  sections:[
    {id:'overview',group:'overview',title:{ru:'Сводка',en:'Overview'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th>${R?'Глагол':'Verb'}</th><th>${R?'Значение':'Meaning'}</th><th>${R?'Пример':'Example'}</th></tr></thead><tbody>
        <tr><td class="mc">kunnen</td><td>${R?'мочь, уметь':'can, to be able'}</td><td>Ik <span class="hi">kan</span> zwemmen.</td></tr>
        <tr><td class="mc">moeten</td><td>${R?'должен':'must'}</td><td>Ik <span class="hi">moet</span> werken.</td></tr>
        <tr><td class="mc">mogen</td><td>${R?'можно':'may'}</td><td><span class="hi">Mag</span> ik binnenkomen?</td></tr>
        <tr><td class="mc">willen</td><td>${R?'хотеть':'to want'}</td><td>Ik <span class="hi">wil</span> slapen.</td></tr>
        <tr><td class="mc">hoeven</td><td>${R?'нужно (отриц.)':'need (neg.)'}</td><td>Je <span class="hi">hoeft</span> niet te komen.</td></tr>
        <tr><td class="mc">zullen</td><td>${R?'буду, бы':'will, would'}</td><td>Ik <span class="hi">zal</span> het doen.</td></tr>
      </tbody></table>
      <div class="rule-box"><div class="rule-text">${R?'После модальных — инфинитив без te':'After modals — infinitive without te'}</div><div class="rule-note">${R?'Кроме hoeven: hoeven + te + inf.':'Except hoeven: hoeven + te + inf.'}</div></div>`;}},
    {id:'kunnen',group:'types',title:{ru:'Kunnen — мочь',en:'Kunnen'},content(l){const R=l==='ru';return`
      <table class="dtable conj-grid"><thead><tr><th></th><th>Presens</th></tr></thead><tbody>
        <tr><td>ik</td><td class="mc">kan</td></tr><tr><td>jij/je</td><td class="mc">kunt / kan</td></tr><tr><td>hij/zij/het</td><td class="mc">kan</td></tr><tr><td>wij/jullie/zij</td><td class="mc">kunnen</td></tr>
      </tbody></table>
      <div class="examples">
        <div class="ex"><div class="ex-nl">Ik <span class="hi">kan</span> goed zwemmen.</div><div class="ex-ru">${R?'Умение: Я хорошо плаваю.':'Ability: I swim well.'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="hi">Kunt</span> u mij helpen?</div><div class="ex-ru">${R?'Возможность: Можете помочь?':'Possibility: Can you help?'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="hi">Kan</span> ik hier zitten?</div><div class="ex-ru">${R?'Разрешение (разг.)':'Permission (coll.)'}</div></div>
      </div>
      <div class="tip">${R?'Imperfectum: <strong>kon / konden</strong>':'Imperfectum: <strong>kon / konden</strong>'}</div>`;}},
    {id:'moeten',group:'types',title:{ru:'Moeten — должен',en:'Moeten'},content(l){const R=l==='ru';return`
      <table class="dtable conj-grid"><thead><tr><th></th><th>Presens</th></tr></thead><tbody>
        <tr><td>ik/jij/hij</td><td class="mc">moet</td></tr><tr><td>wij/jullie/zij</td><td class="mc">moeten</td></tr>
      </tbody></table>
      <div class="examples">
        <div class="ex"><div class="ex-nl">Ik <span class="hi">moet</span> morgen werken.</div><div class="ex-ru">${R?'Обязанность':'Obligation'}</div></div>
        <div class="ex"><div class="ex-nl">Je <span class="hi">moet</span> die film zien!</div><div class="ex-ru">${R?'Совет':'Advice'}</div></div>
        <div class="ex"><div class="ex-nl">Hij <span class="hi">moet</span> wel ziek zijn.</div><div class="ex-ru">${R?'Предположение: Должно быть, болен.':'Assumption: Must be ill.'}</div></div>
      </div>
      <div class="tip">${R?'Imperfectum: <strong>moest / moesten</strong>':'Imperfectum: <strong>moest / moesten</strong>'}</div>`;}},
    {id:'mogen',group:'types',title:{ru:'Mogen — можно',en:'Mogen'},content(l){const R=l==='ru';return`
      <table class="dtable conj-grid"><thead><tr><th></th><th>Presens</th></tr></thead><tbody>
        <tr><td>ik/jij/hij</td><td class="mc">mag</td></tr><tr><td>wij/jullie/zij</td><td class="mc">mogen</td></tr>
      </tbody></table>
      <div class="examples">
        <div class="ex"><div class="ex-nl"><span class="hi">Mag</span> ik binnenkomen?</div><div class="ex-ru">${R?'Разрешение: Можно войти?':'Permission: May I enter?'}</div></div>
        <div class="ex"><div class="ex-nl">Hier <span class="hi">mag</span> u niet roken.</div><div class="ex-ru">${R?'Запрет':'Prohibition'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="hi">Mag</span> ik iets vragen?</div><div class="ex-ru">${R?'Вежливая просьба':'Polite request'}</div></div>
      </div>
      <div class="tip">${R?'Imperfectum: <strong>mocht / mochten</strong>':'Imperfectum: <strong>mocht / mochten</strong>'}</div>`;}},
    {id:'willen',group:'types',title:{ru:'Willen — хотеть',en:'Willen'},content(l){const R=l==='ru';return`
      <table class="dtable conj-grid"><thead><tr><th></th><th>Presens</th></tr></thead><tbody>
        <tr><td>ik/hij</td><td class="mc">wil</td></tr><tr><td>jij/u</td><td class="mc">wilt</td></tr><tr><td>wij/jullie/zij</td><td class="mc">willen</td></tr>
      </tbody></table>
      <div class="examples">
        <div class="ex"><div class="ex-nl">Ik <span class="hi">wil</span> naar huis.</div><div class="ex-ru">${R?'Желание (gaan опущен)':'Wish (gaan omitted)'}</div></div>
        <div class="ex"><div class="ex-nl">Hij <span class="hi">wil</span> arts worden.</div><div class="ex-ru">${R?'Намерение':'Intention'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="hi">Wilt</span> u even wachten?</div><div class="ex-ru">${R?'Вежливая просьба':'Polite request'}</div></div>
      </div>
      <div class="tip">${R?'Imperfectum: <strong>wilde / wilden</strong> (разг. <strong>wou</strong>)':'Imperfectum: <strong>wilde / wilden</strong> (coll. <strong>wou</strong>)'}</div>`;}},
    {id:'hoeven',group:'watchout',title:{ru:'Hoeven + te',en:'Hoeven + te'},content(l){const R=l==='ru';return`
      <div class="trap"><div class="trap-title">${R?'Единственный модальный с te!':'Only modal with te!'}</div>
        <div class="trap-row trap-ok">Je hoeft niet <span class="hi">te</span> komen.</div>
        <div class="trap-row trap-bad">Je hoeft niet komen.</div>
      </div>
      <div class="rule-box"><div class="rule-text">${R?'Только в отрицании и вопросах':'Only in negation and questions'}</div></div>
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">moeten (+)</div><div class="cmp-ex">Ik <span class="hi">moet</span> komen.</div><div class="cmp-ex" style="font-size:11px;color:var(--dim)">${R?'Я должен прийти.':'I must come.'}</div></div>
        <div class="cmp"><div class="cmp-label">hoeven (−)</div><div class="cmp-ex">Ik <span class="hi">hoef</span> niet te komen.</div><div class="cmp-ex" style="font-size:11px;color:var(--dim)">${R?'Мне не нужно.':'I don\'t need to.'}</div></div>
      </div>`;}},
    {id:'ipp',group:'watchout',title:{ru:'IPP в перфекте',en:'IPP in Perfect'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'В перфекте: инфинитив вместо причастия':'In perfect: infinitive replaces participle'}</div><div class="rule-note">Infinitivus pro participio</div></div>
      <div class="examples">
        <div class="ex"><div class="ex-nl">Ik heb niet <span class="hi">kunnen komen</span>.</div><div class="ex-ru">${R?'Я не смог прийти.':'I couldn\'t come.'}</div><div class="ex-note">${R?'НЕ: heb gekund komen':'NOT: heb gekund komen'}</div></div>
        <div class="ex"><div class="ex-nl">Hij heeft moeten werken.</div><div class="ex-ru">${R?'Ему пришлось работать.':'He had to work.'}</div></div>
        <div class="ex"><div class="ex-nl">Ze heeft altijd willen reizen.</div><div class="ex-ru">${R?'Она всегда хотела путешествовать.':'She always wanted to travel.'}</div></div>
      </div>
      <div class="tip">${R?'Без второго глагола — обычное причастие: Dat heb ik niet <strong>gewild</strong>.':'Without second verb — normal participle: Dat heb ik niet <strong>gewild</strong>.'}</div>`;}},
  ]
},
hebben_zijn:{title:{ru:'Hebben of zijn?',en:'Hebben of zijn?'},subtitle:'Вспомогательный',level:'A2',
  summary(l){const R=l==='ru';return[R?'Движение куда-то → <span class="smono">zijn</span>':'Movement somewhere → <span class="smono">zijn</span>',R?'Изменение состояния → <span class="smono">zijn</span>':'State change → <span class="smono">zijn</span>',R?'Всё остальное → <span class="smono">hebben</span>':'Everything else → <span class="smono">hebben</span>'];},
  sections:[
    {id:'rule',group:'rule',title:{ru:'Правило + дерево',en:'Rule + Decision Tree'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'По умолчанию = hebben':'Default = hebben'}</div><div class="rule-note">${R?'Zijn только для движения, изменения состояния и особых глаголов':'Zijn only for movement, state change and special verbs'}</div></div>
      <div class="tree">
        <div class="tree-node">
          <div class="tree-q">${R?'Глагол переходный? (есть прямое дополнение)':'Transitive? (has direct object)'}</div>
          <div class="tree-branches">
            <div class="tree-b tree-b-yes"><span class="tree-b-label">${R?'да →':'yes →'}</span><span class="tree-b-exit">hebben</span></div>
            <div class="tree-b tree-b-no"><span class="tree-b-label">${R?'нет ↓':'no ↓'}</span></div>
          </div>
          <div class="tree-child">
            <div class="tree-node">
              <div class="tree-q">${R?'Перемещение куда-то?':'Movement somewhere?'}</div>
              <div class="tree-branches">
                <div class="tree-b tree-b-yes"><span class="tree-b-label">${R?'да →':'yes →'}</span><span class="tree-b-exit" style="color:var(--v1)">zijn</span></div>
                <div class="tree-b tree-b-no"><span class="tree-b-label">${R?'нет ↓':'no ↓'}</span></div>
              </div>
              <div class="tree-child">
                <div class="tree-node">
                  <div class="tree-q">${R?'Изменение состояния?':'State change?'}</div>
                  <div class="tree-branches">
                    <div class="tree-b tree-b-yes"><span class="tree-b-label">${R?'да →':'yes →'}</span><span class="tree-b-exit" style="color:var(--v1)">zijn</span></div>
                    <div class="tree-b tree-b-no"><span class="tree-b-label">${R?'нет →':'no →'}</span><span class="tree-b-exit">hebben</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;}},
    {id:'zijn_verbs',group:'types',title:{ru:'Глаголы с zijn',en:'Zijn Verbs'},content(l){const R=l==='ru';
      function vl(title,verbs){return`<div class="list-card"><div class="lc-head">${title}</div>${verbs.map(v=>`<div class="cr"><span class="cr-nl">${v[0]}</span><span class="cr-ru">${v[1]}</span></div>`).join('')}</div>`;}
      return`
        ${vl(R?'Движение':'Movement',[['gaan',R?'идти':'to go'],['komen',R?'приходить':'to come'],['vertrekken',R?'уезжать':'to leave'],['vallen',R?'падать':'to fall'],['aankomen',R?'прибывать':'to arrive'],['verhuizen',R?'переезжать':'to move']])}
        ${vl(R?'Изменение состояния':'State change',[['worden',R?'становиться':'to become'],['sterven',R?'умирать':'to die'],['groeien',R?'расти':'to grow'],['beginnen',R?'начинаться':'to begin'],['stoppen',R?'останавливаться':'to stop'],['verdwijnen',R?'исчезать':'to disappear'],['verschijnen',R?'появляться':'to appear']])}
        ${vl(R?'Особые':'Special',[['zijn',R?'быть':'to be'],['blijven',R?'оставаться':'to stay'],['gebeuren',R?'происходить':'to happen'],['lukken',R?'удаваться':'to succeed']])}
      `;}},
    {id:'both',group:'watchout',title:{ru:'Оба варианта',en:'Both Options'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'zijn = с направлением · hebben = без направления':'zijn = with direction · hebben = without direction'}</div></div>
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">zijn (${R?'куда':'where to'})</div>
          <div class="cmp-ex">Hij <span class="hi">is</span> naar huis gereden.</div>
          <div class="cmp-ex" style="font-size:11px;color:var(--dim)">${R?'Он поехал домой.':'He drove home.'}</div></div>
        <div class="cmp"><div class="cmp-label">hebben (${R?'действие':'action'})</div>
          <div class="cmp-ex">Hij <span class="hi">heeft</span> de hele dag gereden.</div>
          <div class="cmp-ex" style="font-size:11px;color:var(--dim)">${R?'Он ездил весь день.':'He drove all day.'}</div></div>
      </div>
      ${det('both_more',R?'Ещё глаголы':'More verbs',`
        <div class="comparison">
          <div class="cmp"><div class="cmp-label">lopen + zijn</div><div class="cmp-ex">Hij <span class="hi">is</span> naar school gelopen.</div></div>
          <div class="cmp"><div class="cmp-label">lopen + hebben</div><div class="cmp-ex">Hij <span class="hi">heeft</span> twee uur gelopen.</div></div>
        </div>
        <div class="comparison">
          <div class="cmp"><div class="cmp-label">fietsen + zijn</div><div class="cmp-ex">We <span class="hi">zijn</span> naar het park gefietst.</div></div>
          <div class="cmp"><div class="cmp-label">fietsen + hebben</div><div class="cmp-ex">We <span class="hi">hebben</span> gefietst.</div></div>
        </div>
      `)}
      <div class="trap"><div class="trap-title">${R?'Переходный = всегда hebben':'Transitive = always hebben'}</div>
        <div class="trap-row trap-ok">We <span class="hi">zijn</span> verhuisd. (${R?'без доп.':'no object'})</div>
        <div class="trap-row trap-ok">Ik <span class="hi">heb</span> mijn meubels verhuisd. (${R?'с доп.':'with object'})</div>
      </div>`;}},
  ]
},
passive:{title:{ru:'Пассив',en:'Passive'},subtitle:'Lijdende vorm',level:'B1',
  summary(l){const R=l==='ru';return[R?'Процесс: <span class="smono">worden</span> + причастие':'Process: <span class="smono">worden</span> + participle',R?'Результат: <span class="smono">zijn</span> + причастие':'Result: <span class="smono">zijn</span> + participle',R?'Безличный: <span class="smono">Er wordt</span>...':'Impersonal: <span class="smono">Er wordt</span>...'];},
  sections:[
    {id:'basics',group:'rule',title:{ru:'Worden vs zijn',en:'Worden vs zijn'},content(l){const R=l==='ru';return`
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">worden (${R?'процесс':'process'})</div>
          <div class="cmp-ex">Het huis <span class="hi">wordt</span> gebouwd.</div>
          <div class="cmp-ex" style="font-size:11px;color:var(--dim)">${R?'Дом строится (сейчас).':'House is being built.'}</div></div>
        <div class="cmp"><div class="cmp-label">zijn (${R?'результат':'result'})</div>
          <div class="cmp-ex">Het huis <span class="hi">is</span> gebouwd.</div>
          <div class="cmp-ex" style="font-size:11px;color:var(--dim)">${R?'Дом построен.':'House is built.'}</div></div>
      </div>
      <div class="formula">${R?'Дополнение актива':'Object'} → ${R?'подлежащее':'subject'} + <span class="v1">worden/zijn</span> + <span class="v2">${R?'причастие':'participle'}</span> + (door ...)</div>
      <div class="examples">
        <div class="ex"><div class="ex-nl">De kok maakt het eten. → Het eten <span class="v1">wordt</span> <span class="v2">gemaakt</span>.</div><div class="ex-ru">${R?'Повар готовит → Еда готовится.':'Cook makes food → Food is made.'}</div></div>
      </div>
      ${det('pas_door',R?'door vs met':'door vs met',`
        <div class="comparison">
          <div class="cmp"><div class="cmp-label">door (${R?'кем':'by whom'})</div><div class="cmp-ex cmp-note">geschreven <span class="hi">door</span> een auteur</div></div>
          <div class="cmp"><div class="cmp-label">met (${R?'чем':'with what'})</div><div class="cmp-ex cmp-note">geschreven <span class="hi">met</span> een pen</div></div>
        </div>
      `)}`;}},
    {id:'tenses',group:'formation',title:{ru:'По временам',en:'By Tense'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th>${R?'Время':'Tense'}</th><th>${R?'Формула':'Formula'}</th><th>${R?'Пример':'Example'}</th></tr></thead><tbody>
        <tr><td>Presens</td><td class="mc">word(t) + part.</td><td>Het boek <span class="hi">wordt</span> gelezen.</td></tr>
        <tr><td>Imperfectum</td><td class="mc">werd(en) + part.</td><td>Het boek <span class="hi">werd</span> gelezen.</td></tr>
        <tr><td>Perfectum</td><td class="mc">zijn + part.</td><td>Het boek <span class="hi">is</span> gelezen.</td></tr>
        <tr><td>Plusquam.</td><td class="mc">was/waren + part.</td><td>Het boek <span class="hi">was</span> gelezen.</td></tr>
        <tr><td>Futurum</td><td class="mc">zullen + part. + worden</td><td>Het boek <span class="hi">zal</span> gelezen <span class="hi">worden</span>.</td></tr>
      </tbody></table>
      <div class="tip">${R?'В perfectum пассива <strong>geen geworden</strong>! Просто <strong>zijn + participium</strong>.':'In passive perfect <strong>no geworden</strong>! Just <strong>zijn + participle</strong>.'}</div>
      ${det('pas_modal',R?'С модальными':'With modals',`
        <div class="examples">
          <div class="ex"><div class="ex-nl">Het <span class="v1">moet</span> gedaan <span class="v2">worden</span>.</div><div class="ex-ru">${R?'Это должно быть сделано.':'It must be done.'}</div></div>
          <div class="ex"><div class="ex-nl">Dit <span class="v1">kan</span> niet veranderd <span class="v2">worden</span>.</div><div class="ex-ru">${R?'Это нельзя изменить.':'This cannot be changed.'}</div></div>
        </div>
      `)}`;}},
    {id:'impersonal',group:'watchout',title:{ru:'Безличный пассив',en:'Impersonal Passive'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'Нет дополнения → er wordt...':'No object → er wordt...'}</div><div class="rule-note">${R?'Для действий без конкретного объекта':'For actions without a specific object'}</div></div>
      <div class="examples">
        <div class="ex"><div class="ex-nl"><span class="hi">Er wordt</span> hier gewerkt.</div><div class="ex-ru">${R?'Здесь работают.':'Work is done here.'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="hi">Er werd</span> veel gelachen.</div><div class="ex-ru">${R?'Много смеялись.':'There was lots of laughing.'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="hi">Er wordt</span> niet gerookt.</div><div class="ex-ru">${R?'Здесь не курят.':'No smoking here.'}</div></div>
      </div>
      <div class="tip">${R?'При инверсии <strong>er</strong> исчезает: <strong>Hier wordt gewerkt.</strong>':'With inversion <strong>er</strong> drops: <strong>Hier wordt gewerkt.</strong>'}</div>`;}},
  ]
},
prefixes:{title:{ru:'Приставки',en:'Prefixes'},subtitle:'Scheidbare werkwoorden',level:'A2-B1',
  summary(l){const R=l==='ru';return[R?'Отделяемые: <span class="smono">aan, op, uit...</span> — ударение на приставке':'Separable: <span class="smono">aan, op, uit...</span> — stress on prefix',R?'Неотделяемые: <span class="smono">be-, ver-, ont-...</span>':'Inseparable: <span class="smono">be-, ver-, ont-...</span>',R?'<span class="smono">door, over, om</span> — и так, и так!':'<span class="smono">door, over, om</span> — both!'];},
  sections:[
    {id:'overview',group:'overview',title:{ru:'Сводка трёх типов',en:'Three Types'},content(l){const R=l==='ru';return`
      <div class="comparison" style="grid-template-columns:1fr 1fr 1fr">
        <div class="cmp"><div class="cmp-label">${R?'Отделяемые':'Separable'}</div><div class="cmp-ex cmp-note"><span class="mc">aan, af, op, uit, mee, terug...</span></div><div class="cmp-ex" style="font-size:11px;color:var(--dim);margin-top:4px">${R?'Ударение на приставке':'Stress on prefix'}<br><span class="hi">ÓP</span>staan</div></div>
        <div class="cmp"><div class="cmp-label">${R?'Неотделяемые':'Inseparable'}</div><div class="cmp-ex cmp-note"><span class="mc">be-, ver-, ont-, ge-, her-</span></div><div class="cmp-ex" style="font-size:11px;color:var(--dim);margin-top:4px">${R?'Ударение на корне':'Stress on root'}<br>be<span class="hi">GRIJ</span>pen</div></div>
        <div class="cmp"><div class="cmp-label">${R?'Оба':'Both'}</div><div class="cmp-ex cmp-note"><span class="mc">door, over, om, onder, voor</span></div><div class="cmp-ex" style="font-size:11px;color:var(--dim);margin-top:4px">${R?'Значение меняется!':'Meaning changes!'}</div></div>
      </div>
      <table class="dtable"><thead><tr><th>${R?'Конструкция':'Construction'}</th><th>${R?'Отделяемый':'Separable'}</th><th>${R?'Неотделяемый':'Inseparable'}</th></tr></thead><tbody>
        <tr><td>Presens</td><td class="mc">Ik bel <span class="v2">op</span>.</td><td class="mc">Ik betaal.</td></tr>
        <tr><td>Perfectum</td><td class="mc">Ik heb <span class="v2">op</span>gebeld.</td><td class="mc">Ik heb betaald.</td></tr>
        <tr><td>${R?'С модальным':'With modal'}</td><td class="mc">Ik wil opbellen.</td><td class="mc">Ik wil betalen.</td></tr>
        <tr><td>${R?'Придаточное':'Subordinate'}</td><td class="mc">...dat ik opbel.</td><td class="mc">...dat ik betaal.</td></tr>
        <tr><td>te + inf.</td><td class="mc">om <span class="v2">op</span> te bellen</td><td class="mc">om te betalen</td></tr>
      </tbody></table>`;}},
    {id:'separable',group:'types',title:{ru:'Отделяемые',en:'Separable'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'Приставка отделяется и уходит в конец':'Prefix separates and goes to the end'}</div><div class="rule-note">${R?'В presens и imperfectum главного предложения':'In presens and imperfectum of main clause'}</div></div>
      <div class="prefix-row"><span class="prefix-name">aan-</span><span class="prefix-meaning">${R?'к, при-':'to, at'}</span><span class="prefix-ex">aankomen, aantrekken</span></div>
      <div class="prefix-row"><span class="prefix-name">af-</span><span class="prefix-meaning">${R?'от-, с-':'off, down'}</span><span class="prefix-ex">afmaken, afwassen</span></div>
      <div class="prefix-row"><span class="prefix-name">op-</span><span class="prefix-meaning">${R?'вверх, на':'up, on'}</span><span class="prefix-ex">opstaan, opbellen</span></div>
      <div class="prefix-row"><span class="prefix-name">uit-</span><span class="prefix-meaning">${R?'из, вы-':'out'}</span><span class="prefix-ex">uitgaan, uitnodigen</span></div>
      <div class="prefix-row"><span class="prefix-name">mee-</span><span class="prefix-meaning">${R?'с собой':'along'}</span><span class="prefix-ex">meenemen, meegaan</span></div>
      <div class="prefix-row"><span class="prefix-name">terug-</span><span class="prefix-meaning">${R?'обратно':'back'}</span><span class="prefix-ex">terugkomen, terugbellen</span></div>
      <div class="examples" style="margin-top:10px">
        <div class="ex"><div class="ex-nl">Ik <span class="v1">sta</span> om 7 uur <span class="v2">op</span>.</div><div class="ex-ru">${R?'Я встаю в 7.':'I get up at 7.'}</div></div>
        <div class="ex"><div class="ex-nl">Ik <span class="v1">stond</span> vroeg <span class="v2">op</span>.</div><div class="ex-ru">${R?'Я вставал рано.':'I got up early.'}</div></div>
      </div>
      ${det('sep_te',R?'te + инфинитив':'te + infinitive',`
        <div class="rule-box"><div class="rule-text">${R?'te ставится МЕЖДУ приставкой и глаголом':'te goes BETWEEN prefix and verb'}</div></div>
        <div class="examples">
          <div class="ex"><div class="ex-nl">om <span class="v2">op</span> te staan</div><div class="ex-ru">${R?'чтобы встать':'to get up'}</div></div>
          <div class="ex"><div class="ex-nl">om <span class="v2">mee</span> te nemen</div><div class="ex-ru">${R?'чтобы взять с собой':'to take along'}</div></div>
        </div>
      `)}`;}},
    {id:'inseparable',group:'types',title:{ru:'Неотделяемые',en:'Inseparable'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'Приставка ВСЕГДА с глаголом. Причастие без ge-!':'Prefix ALWAYS stays. Participle without ge-!'}</div></div>
      <div class="prefix-row"><span class="prefix-name">be-</span><span class="prefix-meaning">${R?'делает переходным':'makes transitive'}</span><span class="prefix-ex">begrijpen, betalen</span></div>
      <div class="prefix-row"><span class="prefix-name">ver-</span><span class="prefix-meaning">${R?'изменение':'change'}</span><span class="prefix-ex">verkopen, vergeten</span></div>
      <div class="prefix-row"><span class="prefix-name">ont-</span><span class="prefix-meaning">${R?'отделение':'separation'}</span><span class="prefix-ex">ontmoeten, ontdekken</span></div>
      <div class="prefix-row"><span class="prefix-name">ge-</span><span class="prefix-meaning">${R?'часть корня':'part of root'}</span><span class="prefix-ex">gebruiken, gebeuren</span></div>
      <div class="prefix-row"><span class="prefix-name">her-</span><span class="prefix-meaning">${R?'повторение':'repetition'}</span><span class="prefix-ex">herhalen, herinneren</span></div>
      <div class="examples" style="margin-top:10px">
        <div class="ex"><div class="ex-nl">betalen → <span class="hi">betaald</span></div><div class="ex-note">${R?'НЕ gebetaald!':'NOT gebetaald!'}</div></div>
        <div class="ex"><div class="ex-nl">begrijpen → <span class="hi">begrepen</span></div><div class="ex-note">${R?'НЕ gebegrepen!':'NOT gebegrepen!'}</div></div>
      </div>`;}},
    {id:'ge_participle',group:'formation',title:{ru:'Ge- в причастиях',en:'Ge- in Participles'},content(l){const R=l==='ru';return`
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">${R?'Отделяемые':'Separable'}</div><div class="cmp-ex"><span class="mc">op + ge + staan</span></div><div class="cmp-ex">= <span class="hi">opgestaan</span></div></div>
        <div class="cmp"><div class="cmp-label">${R?'Неотделяемые':'Inseparable'}</div><div class="cmp-ex"><span class="mc">be + taald</span></div><div class="cmp-ex">= <span class="hi">betaald</span> (${R?'без ge!':'no ge!'})</div></div>
      </div>
      <div class="examples">
        <div class="ex"><div class="ex-nl">Ik ben om 7 uur <span class="hi">opgestaan</span>.</div><div class="ex-ru">${R?'Я встал в 7.':'I got up at 7.'}</div></div>
        <div class="ex"><div class="ex-nl">Hij heeft haar <span class="hi">opgebeld</span>.</div><div class="ex-ru">${R?'Он ей позвонил.':'He called her.'}</div></div>
        <div class="ex"><div class="ex-nl">Zij heeft hem <span class="hi">ontmoet</span>.</div><div class="ex-ru">${R?'Она его встретила.':'She met him.'}</div></div>
      </div>`;}},
    {id:'both',group:'watchout',title:{ru:'И так, и так',en:'Both Ways'},content(l){const R=l==='ru';return`
      <div class="tip">${R?'Ударение решает значение! Одно слово — два глагола.':'Stress determines meaning! Same word — two verbs.'}</div>
      <div class="trap"><div class="trap-title">door-</div>
        <div class="trap-row trap-ok"><span class="hi">DOOR</span>lopen — ${R?'идти дальше':'to continue'}: Hij loopt <span class="v2">door</span>.</div>
        <div class="trap-row trap-ok">door<span class="hi">LO</span>pen — ${R?'пройти насквозь':'to go through'}: Ik doorloop het programma.</div>
      </div>
      <div class="trap"><div class="trap-title">over-</div>
        <div class="trap-row trap-ok"><span class="hi">O</span>VERdoen — ${R?'переделать':'to redo'}: Ik doe het examen <span class="v2">over</span>.</div>
        <div class="trap-row trap-ok">over<span class="hi">LE</span>ven — ${R?'пережить':'to survive'}: Hij overleeft de ziekte.</div>
      </div>
      <div class="trap"><div class="trap-title">voor-</div>
        <div class="trap-row trap-ok"><span class="hi">VOOR</span>komen — ${R?'случаться':'to occur'}: Dat komt vaak <span class="v2">voor</span>.</div>
        <div class="trap-row trap-ok">voor<span class="hi">KO</span>men — ${R?'предотвращать':'to prevent'}: We moeten dat voorkomen.</div>
      </div>`;}},
  ]
},
prepositions:{title:{ru:'Предлоги',en:'Prepositions'},subtitle:'Voorzetsels',level:'A2-B1',
  summary(l){const R=l==='ru';return[R?'Место: <span class="smono">in, op, aan, bij</span>':'Place: <span class="smono">in, op, aan, bij</span>',R?'Время: <span class="smono">om, in, op</span>':'Time: <span class="smono">om, in, op</span>',R?'Направление: <span class="smono">naar, uit, door</span>':'Direction: <span class="smono">naar, uit, door</span>'];},
  sections:[
    {id:'place',group:'types',title:{ru:'Место',en:'Place'},content(l){const R=l==='ru';return`
      <div class="prefix-row"><span class="prefix-name">in</span><span class="prefix-meaning">${R?'в, внутри':'in, inside'}</span><span class="prefix-ex">in de kamer, in Amsterdam</span></div>
      <div class="prefix-row"><span class="prefix-name">op</span><span class="prefix-meaning">${R?'на (поверхн.)':'on (surface)'}</span><span class="prefix-ex">op de tafel, op straat</span></div>
      <div class="prefix-row"><span class="prefix-name">aan</span><span class="prefix-meaning">${R?'у, при, на':'at, on'}</span><span class="prefix-ex">aan de muur, aan tafel</span></div>
      <div class="prefix-row"><span class="prefix-name">bij</span><span class="prefix-meaning">${R?'у, рядом':'near, at'}</span><span class="prefix-ex">bij het station, bij mij</span></div>
      ${det('pl_more',R?'Ещё предлоги места':'More place prepositions',`
        <div class="prefix-row"><span class="prefix-name">voor</span><span class="prefix-meaning">${R?'перед':'in front'}</span><span class="prefix-ex">voor het huis</span></div>
        <div class="prefix-row"><span class="prefix-name">achter</span><span class="prefix-meaning">${R?'за, позади':'behind'}</span><span class="prefix-ex">achter het huis</span></div>
        <div class="prefix-row"><span class="prefix-name">onder</span><span class="prefix-meaning">${R?'под':'under'}</span><span class="prefix-ex">onder de tafel</span></div>
        <div class="prefix-row"><span class="prefix-name">boven</span><span class="prefix-meaning">${R?'над':'above'}</span><span class="prefix-ex">boven de deur</span></div>
        <div class="prefix-row"><span class="prefix-name">tussen</span><span class="prefix-meaning">${R?'между':'between'}</span><span class="prefix-ex">tussen de bomen</span></div>
        <div class="prefix-row"><span class="prefix-name">naast</span><span class="prefix-meaning">${R?'рядом':'next to'}</span><span class="prefix-ex">naast de bank</span></div>
      `)}
      <div class="trap"><div class="trap-title">op vs aan</div>
        <div class="trap-row">op de tafel — ${R?'на столе':'on the table'}</div>
        <div class="trap-row">aan de muur — ${R?'на стене (висит)':'on the wall (hung)'}</div>
        <div class="trap-row">op zee — ${R?'в море (на корабле)':'at sea'}</div>
        <div class="trap-row">aan zee — ${R?'у моря (берег)':'by the sea'}</div>
        <div class="trap-row">op het werk — ${R?'на работе':'at work'}</div>
        <div class="trap-row">aan het werk — ${R?'за работой':'working'}</div>
      </div>`;}},
    {id:'time',group:'types',title:{ru:'Время',en:'Time'},content(l){const R=l==='ru';return`
      <div class="prefix-row"><span class="prefix-name">in</span><span class="prefix-meaning">${R?'год, месяц, сезон':'year, month, season'}</span><span class="prefix-ex">in 2024, in mei, in de winter</span></div>
      <div class="prefix-row"><span class="prefix-name">op</span><span class="prefix-meaning">${R?'день, дата':'day, date'}</span><span class="prefix-ex">op maandag, op 5 mei</span></div>
      <div class="prefix-row"><span class="prefix-name">om</span><span class="prefix-meaning">${R?'точное время':'exact time'}</span><span class="prefix-ex">om 8 uur, om half drie</span></div>
      <div class="prefix-row"><span class="prefix-name">na</span><span class="prefix-meaning">${R?'после':'after'}</span><span class="prefix-ex">na het eten, na de les</span></div>
      <div class="prefix-row"><span class="prefix-name">voor</span><span class="prefix-meaning">${R?'до, перед':'before'}</span><span class="prefix-ex">voor 6 uur</span></div>
      <div class="prefix-row"><span class="prefix-name">sinds</span><span class="prefix-meaning">${R?'с (момента)':'since'}</span><span class="prefix-ex">sinds gisteren</span></div>
      <div class="prefix-row"><span class="prefix-name">over</span><span class="prefix-meaning">${R?'через':'in (time)'}</span><span class="prefix-ex">over een uur</span></div>
      <div class="prefix-row"><span class="prefix-name">geleden</span><span class="prefix-meaning">${R?'назад (ПОСЛЕ!)':'ago (AFTER!)'}</span><span class="prefix-ex">een uur <span class="hi">geleden</span></span></div>`;}},
    {id:'direction',group:'types',title:{ru:'Направление',en:'Direction'},content(l){const R=l==='ru';return`
      <div class="prefix-row"><span class="prefix-name">naar</span><span class="prefix-meaning">${R?'в, к (куда)':'to'}</span><span class="prefix-ex">naar huis, naar school</span></div>
      <div class="prefix-row"><span class="prefix-name">uit</span><span class="prefix-meaning">${R?'из':'from, out of'}</span><span class="prefix-ex">uit het huis, uit de trein</span></div>
      <div class="prefix-row"><span class="prefix-name">door</span><span class="prefix-meaning">${R?'через, сквозь':'through'}</span><span class="prefix-ex">door het bos, door de stad</span></div>
      <div class="prefix-row"><span class="prefix-name">over</span><span class="prefix-meaning">${R?'через (поверх)':'over, across'}</span><span class="prefix-ex">over de brug</span></div>
      <div class="prefix-row"><span class="prefix-name">langs</span><span class="prefix-meaning">${R?'мимо, вдоль':'along, past'}</span><span class="prefix-ex">langs de rivier</span></div>
      <div class="prefix-row"><span class="prefix-name">van</span><span class="prefix-meaning">${R?'от, из':'from'}</span><span class="prefix-ex">van huis, van het station</span></div>
      <div class="trap"><div class="trap-title">naar vs in</div>
        <div class="trap-row">Ik ga <span class="hi">naar</span> Amsterdam. — ${R?'направление':'direction'}</div>
        <div class="trap-row">Ik spring <span class="hi">in</span> het water. — ${R?'внутрь':'into'}</div>
      </div>`;}},
    {id:'with_verbs',group:'reference',title:{ru:'С глаголами',en:'With Verbs'},content(l){const R=l==='ru';
      function vg(prep,items){return`<div class="conj-group"><div class="cg-title">${prep}</div>${items.map(v=>`<div class="cr"><span class="cr-nl">${v[0]}</span><span class="cr-ru">${v[1]}</span><span class="cr-ex">${v[2]}</span></div>`).join('')}</div>`;}
      return`
        <div class="tip">${R?'Глагол + предлог — надо запоминать! Нельзя угадать по логике.':'Verb + preposition — memorize! Cannot guess logically.'}</div>
        ${vg('aan',[['denken aan',R?'думать о':'to think about','Ik denk aan jou.'],['wennen aan',R?'привыкать к':'to get used to','Ik wen aan het weer.'],['beginnen aan',R?'приступать к':'to start on','Ik begin aan mijn werk.']])}
        ${vg('op',[['wachten op',R?'ждать':'to wait for','Ik wacht op de bus.'],['lijken op',R?'быть похожим':'to look like','Hij lijkt op zijn vader.'],['letten op',R?'обращать вним.':'to pay attention','Let op de auto\'s!']])}
        ${det('vb_more',R?'Ещё предлоги':'More prepositions',`
          ${vg('van',[['houden van',R?'любить':'to love','Ik hou van je.'],['dromen van',R?'мечтать о':'to dream of','Ik droom van een reis.'],['genieten van',R?'наслаждаться':'to enjoy','Ik geniet van de zon.']])}
          ${vg('over',[['praten over',R?'говорить о':'to talk about','We praten over het weer.'],['nadenken over',R?'размышлять о':'to think about','Ik denk na over je voorstel.']])}
          ${vg('met',[['beginnen met',R?'начинать с':'to start with','Ik begin met hoofdstuk 1.'],['stoppen met',R?'прекращать':'to stop','Ik stop met roken.'],['trouwen met',R?'жениться на':'to marry','Hij trouwt met Anna.']])}
          ${vg('naar',[['luisteren naar',R?'слушать':'to listen to','Ik luister naar muziek.'],['kijken naar',R?'смотреть на':'to look at','Ik kijk naar de film.'],['zoeken naar',R?'искать':'to search for','Ik zoek naar mijn sleutels.']])}
        `)}
      `;}},
  ]
},
numerals:{title:{ru:'Числительные',en:'Numerals'},subtitle:'Telwoorden',level:'A1-A2',
  summary(l){const R=l==='ru';return[R?'21 = <span class="smono">eenentwintig</span> (один-и-двадцать)':'21 = <span class="smono">eenentwintig</span> (one-and-twenty)',R?'half drie = <span class="smono">2:30</span> (не 3:30!)':'half drie = <span class="smono">2:30</span> (not 3:30!)',R?'Порядковые: <span class="smono">-de/-ste</span>':'Ordinal: <span class="smono">-de/-ste</span>'];},
  sections:[
    {id:'cardinals',group:'formation',title:{ru:'Количественные',en:'Cardinals'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'21–99: единицы + en + десятки':'21–99: units + en + tens'}</div><div class="rule-note">${R?'Как в немецком! Пишется слитно.':'Like German! Written as one word.'}</div></div>
      <div class="list-card"><div class="lc-head">0–12</div>
        <div class="num-row"><span class="num-val">0</span><span class="num-nl">nul</span></div>
        <div class="num-row"><span class="num-val">1</span><span class="num-nl">een / één</span><span class="num-note">${R?'één = с ударением':'één = stressed'}</span></div>
        <div class="num-row"><span class="num-val">2</span><span class="num-nl">twee</span></div>
        <div class="num-row"><span class="num-val">3</span><span class="num-nl">drie</span></div>
        <div class="num-row"><span class="num-val">4</span><span class="num-nl">vier</span></div>
        <div class="num-row"><span class="num-val">5</span><span class="num-nl">vijf</span></div>
        <div class="num-row"><span class="num-val">6</span><span class="num-nl">zes</span></div>
        <div class="num-row"><span class="num-val">7</span><span class="num-nl">zeven</span></div>
        <div class="num-row"><span class="num-val">8</span><span class="num-nl">acht</span></div>
        <div class="num-row"><span class="num-val">9</span><span class="num-nl">negen</span></div>
        <div class="num-row"><span class="num-val">10</span><span class="num-nl">tien</span></div>
        <div class="num-row"><span class="num-val">11</span><span class="num-nl">elf</span></div>
        <div class="num-row"><span class="num-val">12</span><span class="num-nl">twaalf</span></div>
      </div>
      <div class="list-card"><div class="lc-head">${R?'Десятки':'Tens'}</div>
        <div class="num-row"><span class="num-val">20</span><span class="num-nl">twintig</span></div>
        <div class="num-row"><span class="num-val">30</span><span class="num-nl">dertig</span></div>
        <div class="num-row"><span class="num-val">40</span><span class="num-nl">veertig</span></div>
        <div class="num-row"><span class="num-val">50</span><span class="num-nl">vijftig</span></div>
        <div class="num-row"><span class="num-val">60</span><span class="num-nl">zestig</span></div>
        <div class="num-row"><span class="num-val">70</span><span class="num-nl">zeventig</span></div>
        <div class="num-row"><span class="num-val">80</span><span class="num-nl">tachtig</span></div>
        <div class="num-row"><span class="num-val">90</span><span class="num-nl">negentig</span></div>
      </div>
      <div class="examples">
        <div class="ex"><div class="ex-nl"><span class="num-val" style="min-width:auto">21</span> <span class="hi">eenentwintig</span></div><div class="ex-ru">${R?'один-и-двадцать':'one-and-twenty'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="num-val" style="min-width:auto">47</span> <span class="hi">zevenenveertig</span></div><div class="ex-ru">${R?'семь-и-сорок':'seven-and-forty'}</div></div>
        <div class="ex"><div class="ex-nl"><span class="num-val" style="min-width:auto">99</span> <span class="hi">negenennegentig</span></div></div>
      </div>
      ${det('num_big',R?'Сотни, тысячи':'Hundreds, thousands',`
        <div class="examples">
          <div class="ex"><div class="ex-nl"><span class="mc">100</span> honderd · <span class="mc">200</span> tweehonderd · <span class="mc">500</span> vijfhonderd</div></div>
          <div class="ex"><div class="ex-nl"><span class="mc">1000</span> duizend · <span class="mc">1.000.000</span> een miljoen</div></div>
          <div class="ex"><div class="ex-nl"><span class="mc">123</span> honderddrieëntwintig</div></div>
          <div class="ex"><div class="ex-nl"><span class="mc">2024</span> tweeduizend vierentwintig</div></div>
        </div>
        <div class="tip">${R?'Точка — разделитель тысяч, запятая — десятичный знак! <strong>3,14</strong> = drie komma veertien':'Dot = thousands separator, comma = decimal! <strong>3,14</strong> = drie komma veertien'}</div>
      `)}`;}},
    {id:'ordinals',group:'formation',title:{ru:'Порядковые',en:'Ordinals'},content(l){const R=l==='ru';return`
      <div class="comparison">
        <div class="cmp"><div class="cmp-label">1–19 → -de</div><div class="cmp-ex"><span class="mc">vierde, vijfde, zesde</span></div></div>
        <div class="cmp"><div class="cmp-label">20+ → -ste</div><div class="cmp-ex"><span class="mc">twintigste, honderdste</span></div></div>
      </div>
      <div class="trap"><div class="trap-title">${R?'Неправильные':'Irregular'}</div>
        <div class="trap-row"><span class="hi">eerste</span> (${R?'не eende':'not eende'})</div>
        <div class="trap-row"><span class="hi">derde</span> (${R?'не driede':'not driede'})</div>
        <div class="trap-row"><span class="hi">achtste</span> (${R?'не achtde':'not achtde'})</div>
      </div>
      <div class="tip">${R?'Сокращение: цифра + <strong>e</strong>: 1e, 2e, 3e, 21e':'Abbreviation: digit + <strong>e</strong>: 1e, 2e, 3e, 21e'}</div>`;}},
    {id:'time_dates',group:'types',title:{ru:'Время и даты',en:'Time & Dates'},content(l){const R=l==='ru';return`
      <table class="dtable"><thead><tr><th>${R?'Время':'Time'}</th><th>${R?'Нидерландский':'Dutch'}</th></tr></thead><tbody>
        <tr><td>1:00</td><td class="mc">een uur</td></tr>
        <tr><td>2:15</td><td class="mc">kwart over twee</td></tr>
        <tr><td>2:30</td><td class="mc"><span class="hi">half drie</span></td></tr>
        <tr><td>2:45</td><td class="mc">kwart voor drie</td></tr>
        <tr><td>3:10</td><td class="mc">tien over drie</td></tr>
        <tr><td>3:20</td><td class="mc">tien voor half vier</td></tr>
        <tr><td>3:40</td><td class="mc">tien over half vier</td></tr>
        <tr><td>3:50</td><td class="mc">tien voor vier</td></tr>
      </tbody></table>
      ${det('dates_more',R?'Даты':'Dates',`
        <div class="examples">
          <div class="ex"><div class="ex-nl">${R?'Дата:':'Date:'} 5 januari 2024 = <span class="mc">vijf januari tweeduizend vierentwintig</span></div></div>
          <div class="ex"><div class="ex-nl">${R?'День:':'Day:'} op maandag, op dinsdag...</div></div>
        </div>
        <div class="tip">${R?'Дроби: <strong>anderhalf</strong> = полтора, <strong>driekwart</strong> uur = 45 мин':'Fractions: <strong>anderhalf</strong> = one and a half, <strong>driekwart</strong> uur = 45 min'}</div>
      `)}`;}},
    {id:'traps',group:'watchout',title:{ru:'Half drie = 2:30!',en:'Half drie = 2:30!'},content(l){const R=l==='ru';return`
      <div class="trap"><div class="trap-title">${R?'Half = половина СЛЕДУЮЩЕГО часа':'Half = half of the NEXT hour'}</div>
        <div class="trap-row trap-ok">half drie = <span class="hi">2:30</span></div>
        <div class="trap-row trap-bad">half drie ≠ 3:30</div>
        <div class="trap-row trap-ok">half acht = <span class="hi">7:30</span></div>
        <div class="trap-row trap-bad">half acht ≠ 8:30</div>
      </div>
      <div class="tip">${R?'Как в немецком и русском! Половина третьего = 2:30.':'Like German and Russian! Half three = 2:30.'}</div>`;}},
    {id:'reference',group:'reference',title:{ru:'Полный список',en:'Full List'},content(l){const R=l==='ru';return`
      <div class="list-card"><div class="lc-head">13–19</div>
        <div class="num-row"><span class="num-val">13</span><span class="num-nl">dertien</span></div>
        <div class="num-row"><span class="num-val">14</span><span class="num-nl">veertien</span></div>
        <div class="num-row"><span class="num-val">15</span><span class="num-nl">vijftien</span></div>
        <div class="num-row"><span class="num-val">16</span><span class="num-nl">zestien</span></div>
        <div class="num-row"><span class="num-val">17</span><span class="num-nl">zeventien</span></div>
        <div class="num-row"><span class="num-val">18</span><span class="num-nl">achttien</span></div>
        <div class="num-row"><span class="num-val">19</span><span class="num-nl">negentien</span></div>
      </div>
      <div class="list-card"><div class="lc-head">${R?'Порядковые':'Ordinals'}</div>
        <div class="num-row"><span class="num-val">1e</span><span class="num-nl">eerste</span></div>
        <div class="num-row"><span class="num-val">2e</span><span class="num-nl">tweede</span></div>
        <div class="num-row"><span class="num-val">3e</span><span class="num-nl">derde</span></div>
        <div class="num-row"><span class="num-val">4e</span><span class="num-nl">vierde</span></div>
        <div class="num-row"><span class="num-val">5e</span><span class="num-nl">vijfde</span></div>
        <div class="num-row"><span class="num-val">8e</span><span class="num-nl">achtste</span></div>
        <div class="num-row"><span class="num-val">20e</span><span class="num-nl">twintigste</span></div>
      </div>`;}},
  ]
},
vocabulary:{title:{ru:'Словообразование',en:'Word Formation'},subtitle:'Woordenschat',level:'A2-B2',
  summary(l){const R=l==='ru';return[R?'Сложные слова: последнее = главное':'Compounds: last word = head word',R?'Род = по последнему слову':'Gender = from last word',R?'Суффиксы: <span class="smono">-heid, -ing, -lijk</span>...':'Suffixes: <span class="smono">-heid, -ing, -lijk</span>...'];},
  sections:[
    {id:'compounds',group:'rule',title:{ru:'Сложные слова',en:'Compound Words'},content(l){const R=l==='ru';return`
      <div class="rule-box"><div class="rule-text">${R?'Основное слово — ПОСЛЕДНЕЕ':'Head word is LAST'}</div><div class="rule-note">${R?'Род определяется последним словом':'Gender comes from the last word'}</div></div>
      <div class="examples"><div class="ex"><div class="ex-nl"><span class="hi">de</span> boeken<span class="hi">kast</span> (<span class="hi">de</span> kast)</div><div class="ex-ru">${R?'книжный шкаф — род от kast':'bookcase — gender from kast'}</div></div></div>
      <div class="tip">${R?'Часто добавляется <strong>-e(n)-</strong> или <strong>-s-</strong> между частями: boek+en+kast, koning+s+huis':'Often <strong>-e(n)-</strong> or <strong>-s-</strong> inserted: boek+en+kast, koning+s+huis'}</div>
      <div class="compound-row"><div class="compound-top"><span class="compound-word">ziekenhuis</span><span class="compound-arrow">→</span><span class="compound-meaning">${R?'больница':'hospital'}</span></div><div class="compound-parts">ziek (${R?'больной':'sick'}) + huis (${R?'дом':'house'})</div></div>
      <div class="compound-row"><div class="compound-top"><span class="compound-word">hoofdpijn</span><span class="compound-arrow">→</span><span class="compound-meaning">${R?'головная боль':'headache'}</span></div><div class="compound-parts">hoofd (${R?'голова':'head'}) + pijn (${R?'боль':'pain'})</div></div>
      <div class="compound-row"><div class="compound-top"><span class="compound-word">koelkast</span><span class="compound-arrow">→</span><span class="compound-meaning">${R?'холодильник':'fridge'}</span></div><div class="compound-parts">koel (${R?'прохладный':'cool'}) + kast (${R?'шкаф':'cupboard'})</div></div>
      <div class="compound-row"><div class="compound-top"><span class="compound-word">stofzuiger</span><span class="compound-arrow">→</span><span class="compound-meaning">${R?'пылесос':'vacuum'}</span></div><div class="compound-parts">stof (${R?'пыль':'dust'}) + zuiger (${R?'сосун':'sucker'})</div></div>
      ${det('comp_more',R?'Ещё слова':'More words',`
        <div class="compound-row"><div class="compound-top"><span class="compound-word">tandenborstel</span><span class="compound-arrow">→</span><span class="compound-meaning">${R?'зубная щётка':'toothbrush'}</span></div><div class="compound-parts">tand + borstel</div></div>
        <div class="compound-row"><div class="compound-top"><span class="compound-word">vliegtuig</span><span class="compound-arrow">→</span><span class="compound-meaning">${R?'самолёт':'airplane'}</span></div><div class="compound-parts">vlieg + tuig</div></div>
        <div class="compound-row"><div class="compound-top"><span class="compound-word">rijbewijs</span><span class="compound-arrow">→</span><span class="compound-meaning">${R?'водительские права':'drivers license'}</span></div><div class="compound-parts">rij + bewijs</div></div>
        <div class="compound-row"><div class="compound-top"><span class="compound-word">handschoenen</span><span class="compound-arrow">→</span><span class="compound-meaning">${R?'перчатки':'gloves'}</span></div><div class="compound-parts">hand + schoenen</div></div>
        <div class="compound-row"><div class="compound-top"><span class="compound-word">huisarts</span><span class="compound-arrow">→</span><span class="compound-meaning">${R?'семейный врач':'family doctor'}</span></div><div class="compound-parts">huis + arts</div></div>
        <div class="compound-row"><div class="compound-top"><span class="compound-word">buitenlander</span><span class="compound-arrow">→</span><span class="compound-meaning">${R?'иностранец':'foreigner'}</span></div><div class="compound-parts">buiten + land + er</div></div>
      `)}`;}},
    {id:'suffixes',group:'formation',title:{ru:'Суффиксы',en:'Suffixes'},content(l){const R=l==='ru';return`
      <div class="subsection"><div class="ss-title">${R?'Существительные':'Nouns'}</div>
      <div class="prefix-row"><span class="prefix-name">-heid</span><span class="prefix-meaning"><span class="gender">de</span> ${R?'качество':'quality'}</span><span class="prefix-ex">gezondheid, vrijheid</span></div>
      <div class="prefix-row"><span class="prefix-name">-ing</span><span class="prefix-meaning"><span class="gender">de</span> ${R?'процесс':'process'}</span><span class="prefix-ex">vergadering, oefening</span></div>
      <div class="prefix-row"><span class="prefix-name">-schap</span><span class="prefix-meaning"><span class="gender">het</span> ${R?'состояние':'state'}</span><span class="prefix-ex">landschap, vriendschap</span></div>
      <div class="prefix-row"><span class="prefix-name">-te</span><span class="prefix-meaning"><span class="gender">de</span> ${R?'от прилаг.':'from adj.'}</span><span class="prefix-ex">hoogte, warmte</span></div>
      <div class="prefix-row"><span class="prefix-name">-er/-aar</span><span class="prefix-meaning"><span class="gender">de</span> ${R?'деятель':'agent'}</span><span class="prefix-ex">leraar, schrijver</span></div>
      <div class="prefix-row"><span class="prefix-name">-sel</span><span class="prefix-meaning"><span class="gender">het</span> ${R?'результат':'result'}</span><span class="prefix-ex">voedsel, raadsel</span></div>
      </div>
      ${det('suf_adj',R?'Суффиксы прилагательных':'Adjective suffixes',`
        <div class="prefix-row"><span class="prefix-name">-lijk</span><span class="prefix-meaning">${R?'подобный':'like'}</span><span class="prefix-ex">vriendelijk, mogelijk</span></div>
        <div class="prefix-row"><span class="prefix-name">-ig</span><span class="prefix-meaning">${R?'обладающий':'having'}</span><span class="prefix-ex">belangrijk, rustig</span></div>
        <div class="prefix-row"><span class="prefix-name">-baar</span><span class="prefix-meaning">${R?'как -able':'-able'}</span><span class="prefix-ex">draagbaar, eetbaar</span></div>
        <div class="prefix-row"><span class="prefix-name">-loos</span><span class="prefix-meaning">${R?'как -less':'-less'}</span><span class="prefix-ex">werkloos, hopeloos</span></div>
        <div class="prefix-row"><span class="prefix-name">-vol</span><span class="prefix-meaning">${R?'полный':'full of'}</span><span class="prefix-ex">waardevol, respectvol</span></div>
      `)}`;}},
    {id:'borrowings',group:'types',title:{ru:'Заимствования',en:'Borrowings'},content(l){const R=l==='ru';return`
      <div class="tip">${R?'Нидерландский дал миру: <strong>boss, cookie, dollar, landscape, yacht, coleslaw, Santa Claus</strong>':'Dutch gave the world: <strong>boss, cookie, dollar, landscape, yacht, coleslaw, Santa Claus</strong>'}</div>
      ${det('borrow_more',R?'Ещё связи':'More connections',`
        <div class="subsection"><div class="ss-title">${R?'NL → русский':'NL → Russian'}</div>
          <div class="examples">
            <div class="ex"><div class="ex-nl">zeil → ${R?'зейл (парус)':'zeil (sail)'} · apotheek → ${R?'аптека':'apteka'} · bus → ${R?'бус':'bus'}</div></div>
          </div>
        </div>
        <div class="subsection"><div class="ss-title">${R?'Французские':'French borrowings'}</div>
          <div class="examples">
            <div class="ex"><div class="ex-nl">paraplu (${R?'зонт':'umbrella'}) · bureau · etage · trottoir · cadeau</div></div>
          </div>
        </div>
      `)}`;}},
    {id:'idioms',group:'reference',title:{ru:'Идиомы',en:'Idioms'},content(l){const R=l==='ru';return`
      <div class="list-card">
        <div class="phrase"><span class="phrase-nl">Het regent pijpenstelen.</span><span class="phrase-note">${R?'Льёт как из ведра':'Raining cats and dogs'}</span></div>
        <div class="phrase"><span class="phrase-nl">Met de deur in huis vallen.</span><span class="phrase-note">${R?'Сразу к делу':'Get straight to the point'}</span></div>
        <div class="phrase"><span class="phrase-nl">De kat uit de boom kijken.</span><span class="phrase-note">${R?'Выжидать':'Wait and see'}</span></div>
        <div class="phrase"><span class="phrase-nl">Iets onder de knie hebben.</span><span class="phrase-note">${R?'Освоить что-то':'To master something'}</span></div>
        <div class="phrase"><span class="phrase-nl">Op je tenen lopen.</span><span class="phrase-note">${R?'Из кожи вон лезть':'To walk on tiptoes / try too hard'}</span></div>
      </div>`;}},
  ]
},
phrasebook:{title:{ru:'Разговорник',en:'Phrasebook'},subtitle:'Praktische zinnen',level:'A1-A2',
  summary(l){const R=l==='ru';return[R?'<span class="smono">Hoi</span> / <span class="smono">Doei</span> — неформально':'<span class="smono">Hoi</span> / <span class="smono">Doei</span> — informal',R?'<span class="smono">Alstublieft</span> — и «пожалуйста», и «вот, держите»':'<span class="smono">Alstublieft</span> — both "please" and "here you go"',R?'<span class="smono">Fijn weekend!</span> — хороших выходных':'<span class="smono">Fijn weekend!</span> — have a nice weekend'];},
  sections:[
    {id:'greetings',group:'types',title:{ru:'Приветствия и прощания',en:'Greetings & Goodbyes'},content(l){const R=l==='ru';
      function ph(items){return`<div class="list-card">${items.map(p=>`<div class="phrase"><span class="phrase-nl">${p[0]}</span><span class="phrase-note">${p[1]}</span></div>`).join('')}</div>`;}
      return`
        <div class="list-card"><div class="lc-head">${R?'Привет':'Hello'}</div>
          <div class="phrase"><span class="phrase-nl">Hoi / Hallo</span><span class="phrase-note">${R?'неформально':'informal'}</span></div>
          <div class="phrase"><span class="phrase-nl">Goedemorgen</span><span class="phrase-note">${R?'до ~12:00':'until ~12:00'}</span></div>
          <div class="phrase"><span class="phrase-nl">Goedemiddag</span><span class="phrase-note">12:00–18:00</span></div>
          <div class="phrase"><span class="phrase-nl">Goedenavond</span><span class="phrase-note">${R?'после 18:00':'after 18:00'}</span></div>
          <div class="phrase"><span class="phrase-nl">Dag</span><span class="phrase-note">${R?'нейтрально':'neutral'}</span></div>
        </div>
        <div class="list-card"><div class="lc-head">${R?'Пока':'Bye'}</div>
          <div class="phrase"><span class="phrase-nl">Doei / Doeg</span><span class="phrase-note">${R?'неформально':'informal'}</span></div>
          <div class="phrase"><span class="phrase-nl">Tot ziens</span><span class="phrase-note">${R?'до свидания':'goodbye'}</span></div>
          <div class="phrase"><span class="phrase-nl">Tot zo</span><span class="phrase-note">${R?'через минуты':'in minutes'}</span></div>
          <div class="phrase"><span class="phrase-nl">Tot straks</span><span class="phrase-note">${R?'сегодня':'later today'}</span></div>
          <div class="phrase"><span class="phrase-nl">Tot morgen</span><span class="phrase-note">${R?'до завтра':'see you tomorrow'}</span></div>
        </div>
        ${det('gr_wknd',R?'Выходные':'Weekend',`
          <div class="list-card">
            <div class="phrase"><span class="phrase-nl">Fijn weekend!</span><span class="phrase-note">${R?'Хороших выходных!':'Have a nice weekend!'}</span></div>
            <div class="phrase"><span class="phrase-nl">Jij ook!</span><span class="phrase-note">${R?'И тебе тоже!':'You too!'}</span></div>
          </div>`)}
      `;}},
    {id:'language',group:'types',title:{ru:'Про язык',en:'About Language'},content(l){const R=l==='ru';return`
      <div class="list-card">
        <div class="phrase"><span class="phrase-nl">Ik spreek een beetje Nederlands.</span><span class="phrase-note">${R?'Я немного говорю.':'I speak a little.'}</span></div>
        <div class="phrase"><span class="phrase-nl">Kunt u langzamer praten?</span><span class="phrase-note">${R?'Можете медленнее?':'Can you speak slower?'}</span></div>
        <div class="phrase"><span class="phrase-nl">Kunt u dat herhalen?</span><span class="phrase-note">${R?'Можете повторить?':'Can you repeat?'}</span></div>
        <div class="phrase"><span class="phrase-nl">Wat betekent ...?</span><span class="phrase-note">${R?'Что значит...?':'What does ... mean?'}</span></div>
        <div class="phrase"><span class="phrase-nl">Corrigeer me gerust!</span><span class="phrase-note">${R?'Поправляйте меня!':'Correct me!'}</span></div>
      </div>
      ${det('lang_more',R?'Вежливость, реакции':'Polite, reactions',`
        <div class="list-card"><div class="lc-head">${R?'Вежливость':'Polite'}</div>
          <div class="phrase"><span class="phrase-nl">Alstublieft / Alsjeblieft</span><span class="phrase-note">${R?'Пожалуйста':'Please'}</span></div>
          <div class="phrase"><span class="phrase-nl">Dank u wel / Dankjewel</span><span class="phrase-note">${R?'Спасибо':'Thank you'}</span></div>
          <div class="phrase"><span class="phrase-nl">Graag gedaan.</span><span class="phrase-note">${R?'Не за что.':'You\'re welcome.'}</span></div>
        </div>
        <div class="list-card"><div class="lc-head">${R?'Реакции':'Reactions'}</div>
          <div class="phrase"><span class="phrase-nl">Leuk! / Gezellig!</span><span class="phrase-note">${R?'Круто! / Здорово!':'Cool! / Fun!'}</span></div>
          <div class="phrase"><span class="phrase-nl">Jammer.</span><span class="phrase-note">${R?'Жаль.':'Too bad.'}</span></div>
          <div class="phrase"><span class="phrase-nl">Klopt. / Precies.</span><span class="phrase-note">${R?'Верно.':'Correct.'}</span></div>
        </div>
      `)}
    `;}},
    {id:'smalltalk',group:'types',title:{ru:'Small talk',en:'Small Talk'},content(l){const R=l==='ru';return`
      <div class="list-card"><div class="lc-head">${R?'У кофемашины':'At the coffee machine'}</div>
        <div class="phrase"><span class="phrase-nl">Alles goed?</span><span class="phrase-note">${R?'Как дела?':'How are you?'}</span></div>
        <div class="phrase"><span class="phrase-nl">Ja, prima. En met jou?</span><span class="phrase-note">${R?'Отлично. А у тебя?':'Great. And you?'}</span></div>
        <div class="phrase"><span class="phrase-nl">Goed hoor, druk zoals altijd.</span><span class="phrase-note">${R?'Хорошо, занят как всегда.':'Good, busy as always.'}</span></div>
        <div class="phrase"><span class="phrase-nl">Zin in koffie?</span><span class="phrase-note">${R?'Хочешь кофе?':'Want coffee?'}</span></div>
      </div>
      ${det('st_more',R?'Понедельник / Пятница / Ухожу':'Monday / Friday / Leaving',`
        <div class="list-card"><div class="lc-head">${R?'Понедельник':'Monday'}</div>
          <div class="phrase"><span class="phrase-nl">Hoe was je weekend?</span><span class="phrase-note">${R?'Как выходные?':'How was your weekend?'}</span></div>
          <div class="phrase"><span class="phrase-nl">Lekker rustig.</span><span class="phrase-note">${R?'Спокойно.':'Relaxing.'}</span></div>
          <div class="phrase"><span class="phrase-nl">Te kort!</span><span class="phrase-note">${R?'Слишком короткие!':'Too short!'}</span></div>
        </div>
        <div class="list-card"><div class="lc-head">${R?'Пятница':'Friday'}</div>
          <div class="phrase"><span class="phrase-nl">Nog plannen voor het weekend?</span><span class="phrase-note">${R?'Планы на выходные?':'Weekend plans?'}</span></div>
          <div class="phrase"><span class="phrase-nl">Bijna weekend!</span><span class="phrase-note">${R?'Почти выходные!':'Almost weekend!'}</span></div>
        </div>
        <div class="list-card"><div class="lc-head">${R?'Ухожу':'Leaving'}</div>
          <div class="phrase"><span class="phrase-nl">Ik ga naar huis. Tot morgen!</span><span class="phrase-note">${R?'Домой. До завтра!':'Going home. See you!'}</span></div>
          <div class="phrase"><span class="phrase-nl">Fijne avond!</span><span class="phrase-note">${R?'Хорошего вечера!':'Have a nice evening!'}</span></div>
        </div>
      `)}
    `;}},
    {id:'shopping',group:'types',title:{ru:'В магазине',en:'Shopping'},content(l){const R=l==='ru';return`
      <div class="list-card"><div class="lc-head">${R?'Общее':'General'}</div>
        <div class="phrase"><span class="phrase-nl">Kan ik u helpen?</span><span class="phrase-note">${R?'Могу помочь? (продавец)':'Can I help? (seller)'}</span></div>
        <div class="phrase"><span class="phrase-nl">Ik kijk even rond.</span><span class="phrase-note">${R?'Я пока посмотрю.':'Just looking.'}</span></div>
        <div class="phrase"><span class="phrase-nl">Hoeveel kost dit?</span><span class="phrase-note">${R?'Сколько стоит?':'How much?'}</span></div>
        <div class="phrase"><span class="phrase-nl">Kan ik pinnen?</span><span class="phrase-note">${R?'Можно картой?':'Can I pay by card?'}</span></div>
      </div>
      ${det('sh_more',R?'Булочная · Сырный · Табачный':'Bakery · Cheese · Tobacco',`
        <div class="list-card"><div class="lc-head">${R?'Булочная':'Bakery'}</div>
          <div class="phrase"><span class="phrase-nl">Zegt u het maar.</span><span class="phrase-note">${R?'Слушаю вас.':'Go ahead.'}</span></div>
          <div class="phrase"><span class="phrase-nl">Twee croissantjes, alstublieft.</span><span class="phrase-note">${R?'Два круассана.':'Two croissants.'}</span></div>
          <div class="phrase"><span class="phrase-nl">Was het dat? — Ja, dat was het.</span><span class="phrase-note">${R?'Это всё? — Да.':'That all? — Yes.'}</span></div>
        </div>
        <div class="list-card"><div class="lc-head">${R?'Сырный':'Cheese shop'}</div>
          <div class="phrase"><span class="phrase-nl">Wilt u proeven?</span><span class="phrase-note">${R?'Хотите попробовать?':'Want to taste?'}</span></div>
          <div class="phrase"><span class="phrase-nl">Jong / belegen / oud / extra oud</span><span class="phrase-note">${R?'Молодой → экстра':'Young → extra aged'}</span></div>
          <div class="phrase"><span class="phrase-nl">Tweehonderd gram.</span><span class="phrase-note">${R?'200 грамм.':'200 grams.'}</span></div>
        </div>
      `)}
    `;}},
    {id:'directions',group:'types',title:{ru:'Дорога',en:'Directions'},content(l){const R=l==='ru';return`
      <div class="list-card"><div class="lc-head">${R?'Спросить':'Ask'}</div>
        <div class="phrase"><span class="phrase-nl">Sorry, weet u waar ... is?</span><span class="phrase-note">${R?'Где находится...?':'Where is...?'}</span></div>
        <div class="phrase"><span class="phrase-nl">Hoe kom ik bij ...?</span><span class="phrase-note">${R?'Как добраться до...?':'How to get to...?'}</span></div>
        <div class="phrase"><span class="phrase-nl">Is het ver lopen?</span><span class="phrase-note">${R?'Далеко идти?':'Far to walk?'}</span></div>
      </div>
      <div class="list-card"><div class="lc-head">${R?'Объяснить':'Give directions'}</div>
        <div class="phrase"><span class="phrase-nl">Rechtdoor.</span><span class="phrase-note">${R?'Прямо.':'Straight.'}</span></div>
        <div class="phrase"><span class="phrase-nl">Naar links / naar rechts.</span><span class="phrase-note">${R?'Налево / направо.':'Left / right.'}</span></div>
        <div class="phrase"><span class="phrase-nl">De eerste straat links.</span><span class="phrase-note">${R?'Первая налево.':'First left.'}</span></div>
        <div class="phrase"><span class="phrase-nl">Bij de stoplichten.</span><span class="phrase-note">${R?'У светофора.':'At the traffic lights.'}</span></div>
        <div class="phrase"><span class="phrase-nl">Vijf minuten lopen.</span><span class="phrase-note">${R?'5 мин пешком.':'5 min walk.'}</span></div>
      </div>
    `;}},
  ]
},

}; // END GUIDES
