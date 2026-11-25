'use strict';
const scene = document.getElementById('scene');
const viewport = document.getElementById('sceneViewport');
const dialog = document.getElementById('contentDialog');
const dialogBody = document.getElementById('dialogBody');
const dialogPath = document.getElementById('dialogPath');
const cat = document.getElementById('catButton');
const catImage = document.getElementById('catImage');
const toast = document.getElementById('catToast');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let returnFocus = null;
const img = name => `assets/${name}.webp`;
const TG={elina:'https://t.me/as_terya',karina:'https://t.me/rinaa_meow',ksenia:'https://t.me/personnefinie'};
const VK={elina:'https://vk.ru/elechka0221',karina:'https://vk.ru/rinaameow',ksenia:'https://vk.ru/id1045026554'};
const KARINA_PIERCING_GROUP='https://vk.ru/piercing_arkh';
const masters = {
  elina: {name:'Элина',title:'Ведьма студии',services:'Татуировки · Пирсинг · Таро',portrait:'portrait-elina',desc:'Эля умеет работать в самых разных стилях, обожает своих кошек и большие деньги (а кто их не любит?). Воплотит твою идею в татуировку, а если звёзды сложатся — ещё и сделает расклад Таро. Предупреждаем: карты иногда знают слишком много.',styles:['Разные стили','Аниме','Графика','Цветные работы'],photos:['Чёрная кошка','Сакура на руке','Аниме-портрет','Незабудки','Японские мотивы','Крылья','Тонкая графика']},
  karina:{name:'Карина',title:'Главный источник хаоса',services:'Татуировки · Пирсинг',portrait:'portrait-karina',desc:'Самый яркий человек нашей студии — с Кариной точно не соскучишься. Мать троих кошек и хомяка по имени Целибат. Делает и милых котиков с цветочками, и дерзкие графичные работы, и пирсинг. Приходи за новым украшением или татуировкой — и отличным настроением.',styles:['Татуировки','Пирсинг','Украшения','Индивидуальный подход'],photos:['Пирсинг уха с украшениями','Пирсинг губы','Пирсинг носа и губы','Проколы уха','Пирсинг хряща уха','Пирсинг носа и губы','Пирсинг брови','Пирсинг крыла носа']},
  ksenia:{name:'Ксения',title:'Креативный отдел в одном человеке',services:'Татуировки · Авторские эскизы',portrait:'portrait-ksenia',desc:'Кажется, Ксюша умеет всё, кроме нормально отдыхать: делает татуировки, сайты, игрушки, журналы, снимает и монтирует контент. Особенно любит религиозные сюжеты, символизм и мрачную графику. С ней легко обсудить и новую татуировку, и все свои жизненные истории. Душевный разговор — приятный бонус.',styles:['Blackwork','Графика','Символизм','Леттеринг'],photos:['Орнаментальная графика','Soul People','Blackwork','Красный орнамент','Мини-графика','Образ в тенях','Цветочная графика']}
};
const tattooPrices=[['До 5 см','3 000 ₽'],['6–8 см','4 000 ₽'],['9–11 см','5 000 ₽'],['12–15 см','6 000 ₽'],['От 15 см','от 7 000 ₽ · индивидуально']];
const tattooZones=[['Рука / нога','+ 500 ₽'],['Бедро','+ 500 ₽'],['Лицо / кисти','+ 500 ₽'],['Живот / спина','+ 2 000 ₽']];
const piercingPrices={
 karina:[
  {section:'Проколы ушей',items:[['Мочка (1 / 2 прокола)','1 400 / 2 100 ₽'],['Хеликс','1 700 ₽'],['Конч','1 700 ₽'],['Руук','1 600 ₽'],['Дэйс','1 600 ₽'],['Трагус','1 700 ₽'],['Индастриал','2 200 ₽'],['Орбитал','2 200 ₽']]},
  {section:'Лицо и полость рта',items:[['Септум','1 700 ₽'],['Крыло носа','1 700 ₽'],['Бровь','1 700 ₽'],['Бридж','1 700 ₽'],['Лабрет','1 700 ₽'],['Монро','1 600 ₽'],['Медуза','1 600 ₽'],['Вертикальный лабрет','1 700 ₽'],['Язык','1 700 ₽'],['Симметричный пирсинг','2 900 ₽']]},
  {section:'Тело',items:[['Соски (1 / 2 прокола)','1 700 / 2 900 ₽'],['Пупок','1 700 ₽']]},
  {section:'Дополнительные услуги',items:[['Консультация','Бесплатно'],['Восстановление прокола','50% от стоимости'],['УЗ-чистка украшения','600 ₽'],['Установка компрессионных дисков','300 ₽'],['Даунсайз','1 000 ₽'],['Апсайз','1 200 ₽'],['Замена украшения','900 ₽'],['Чистка прокола','250 ₽']]}
 ],
 elina:[
  {section:'Проколы ушей',items:[['Мочка уха (1 / 2 прокола)','1 300 / 1 900 ₽'],['Хеликс','1 500 ₽'],['Форвард-хеликс','1 400 ₽'],['Руук','1 500 ₽'],['Трагус','1 500 ₽'],['Конч','1 500 ₽'],['Дэйс','1 400 ₽'],['Антитрагус','1 400 ₽'],['Индастриал','2 000 ₽'],['Орбитал','2 000 ₽']]},
  {section:'Нос',items:[['Крыло носа','1 500 ₽'],['Септум','1 500 ₽'],['Симметричный прокол крыльев носа','2 500 ₽']]},
  {section:'Брови',items:[['Бровь','1 500 ₽'],['Бридж','1 400 ₽'],['Симметричный прокол бровей','2 000 ₽']]},
  {section:'Полость рта',items:[['Язык','1 500 ₽'],['Вертикальный лабрет','1 500 ₽'],['Монро','1 400 ₽'],['Медуза','1 400 ₽'],['Лабрет','1 500 ₽'],['Симметричный прокол губы','2 500 ₽']]},
  {section:'Другие проколы',items:[['Пупок','1 500 ₽'],['Соски (1 / 2 прокола)','1 500 / 2 000 ₽']]},
  {section:'Дополнительные услуги',items:[['Консультация','Бесплатно'],['Восстановление прокола','50% от стоимости'],['УЗ-чистка украшения','500 ₽'],['Установка компрессионных дисков','200 ₽'],['Даунсайз с наружным проколом','1 400 ₽'],['Даунсайз в ротовой полости','800 ₽'],['Апсайз','1 200 ₽'],['Замена украшения','800 ₽'],['Чистка прокола','200 ₽']]}
 ]
};
const studioPhotos=['Неоновая вывеска','Наш творческий уголок','Немного студийного хаоса','Полки и детали','Рабочее место'];
const piercingPhotos=['Пирсинг уха с украшениями','Пирсинг губы','Пирсинг носа и губы','Проколы уха','Пирсинг хряща уха','Пирсинг носа и губы','Пирсинг брови','Пирсинг крыла носа'];
const flashTitles=['Луна и солнце','Без лица','No Exit','По ту сторону','Ночная улица','Маски'];
const fortuneCards=[
 ['Луна','Сегодня интуиция не подведёт. Особенно если она советует заказать вкусного.'],
 ['Звезда','Тебе скоро повезёт. И нет, это не сообщение от бывшего.'],
 ['Солнце','Всё начинает проясняться. Кроме того, куда исчезают твои деньги.'],
 ['Колесо Фортуны','Жизнь готовит поворот. Держись крепко, но не паникуй.'],
 ['Императрица','Время роскоши и заботы о себе. Даже если пока роскошь — поспать подольше.'],
 ['Маг','У тебя всё получится. Даже если сначала придётся трижды переделать.'],
 ['Отшельник','Твоё настоящее предназначение сегодня — плед и отключённые уведомления.'],
 ['Влюблённые','Кто-то думает о тебе. Вероятно, курьер, который не может найти подъезд.'],
 ['Шут','Грядут приключения. Не соглашайся на них до первой чашки кофе.'],
 ['Мир','Завершится один важный этап. Да, можно наконец закрыть 38 вкладок.'],
 ['Сила','Ты справишься. Даже с понедельником.'],
 ['Справедливость','Вселенная всё видит. Особенно когда ты снова говоришь «ещё пять минут».'],
 ['Умеренность','Не принимай судьбоносных решений на голодный желудок.'],
 ['Башня','Планы могут измениться. Зато появится отличный сюжет для истории.'],
 ['Колесница','Ты двигаешься в верном направлении. Проверить маршрут всё равно не помешает.'],
 ['Жрица','Ты уже знаешь ответ. Осталось перестать спрашивать всех подряд.'],
 ['Император','Сегодня твоя суперсила — сказать твёрдое «нет» лишним делам.'],
 ['Повешенный','Смени угол зрения. Иногда достаточно просто встать с дивана.'],
 ['Двойка Кубков','Ожидается приятная встреча. Может, с человеком, а может — с пиццей.'],
 ['Туз Пентаклей','Удача в деньгах совсем близко. Карта рекомендует не покупать десятый блокнот.'],
 ['Девятка Кубков','Маленькая мечта скоро исполнится. Не забывай её заметить.'],
 ['Семёрка Жезлов','Защищай свои границы. «Мне неудобно» — уже достаточный ответ.'],
 ['Тройка Мечей','Неприятность отпустит. Пора перестать проверять старую переписку.'],
 ['Девятка Пентаклей','Твоя эра «я себе всё сама куплю» официально открыта.'],
 ['Королева Кубков','Сегодня кому-то очень нужен твой тёплый разговор. Возможно, тебе самой.'],
 ['Рыцарь Мечей','Сначала подумай, потом отправляй сообщение. Карты очень настойчивы.'],
 ['Десятка Кубков','Радость окажется ближе, чем кажется. Посмотри вокруг.'],
 ['Паж Жезлов','Новое хобби скоро захватит тебя целиком. Да, ещё одно.'],
 ['Шестёрка Мечей','Пора двигаться дальше. Не обязательно сегодня, но чемодан мыслей собран.'],
 ['Кот Фортуны','Мяу. Кошка одобряет тебя и требует вознаграждение за предсказание.']
];
const e=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const rows=(a)=>`<div class="price-rows">${a.map(([name,price])=>`<div class="price-row"><span>${e(name)}</span><b>${e(price)}</b></div>`).join('')}</div>`;
const action=(url,label,cls='dialog-action')=>`<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
const photo=(src,alt,extra='')=>`<button class="photo-tile" data-lightbox="${src}" data-caption="${e(alt)}" type="button" aria-label="Увеличить: ${e(alt)}"><img loading="lazy" src="${src}" alt="${e(alt)}" ${extra}></button>`;
function openWindow(content,path){
  returnFocus=document.activeElement;
  dialogPath.textContent=path;
  dialogBody.innerHTML=content;
  if(!dialog.open) dialog.showModal();
  dialogBody.scrollTop=0; dialog.scrollTop=0;
  document.getElementById('closeDialog').focus();
}
function openMaster(key){
  const m=masters[key];if(!m)return;
  const gallery=m.photos.map((caption,i)=>photo(img(`${key==='karina'?'piercing':key}-${i+1}`), `${caption} — работа мастера ${m.name}`)).join('');
  const buttons=[action(TG[key],'Написать в Telegram'),action(VK[key],'Открыть VK','outline-action'),...(key==='karina'?[action(KARINA_PIERCING_GROUP,'Группа пирсинга VK','outline-action')]:[])].join('');
  const extras=key==='elina'?'<button class="mini-action" type="button" data-screen="tarot">☾ Вытянуть карту Таро ↗</button><button class="mini-action" type="button" data-piercing="elina">✦ Прайс на пирсинг ↗</button>':key==='karina'?'<button class="mini-action" type="button" data-piercing="karina">✦ Пирсинг и цены ↗</button>':'<button class="mini-action" type="button" data-screen="flash">✧ Авторский скетчбук ↗</button>';
  openWindow(`<div class="dialog-eyebrow">Папка мастера / ${e(m.title)}</div><h2>Знакомься, <em>${m.name}.</em></h2>
   <div class="master-profile"><img class="master-photo" src="${img(m.portrait)}" alt="Мастер ${m.name}"><div class="master-copy"><div class="master-services">${m.services}</div><p>${m.desc}</p><div class="tag-row">${m.styles.map(v=>`<span>${v}</span>`).join('')}</div><div class="button-row">${buttons}</div>${extras}</div></div>
   <div class="section-head"><h3>${key==='karina'?'Пирсинг Карины':`Работы ${m.name}`}</h3><span>${m.photos.length.toString().padStart(2,'0')} / GALLERY</span></div><div class="work-grid real-grid">${gallery}</div><p class="subtle-note">${key==='karina'?'Здесь собраны фотографии пирсинга Карины. Татуировки она тоже делает — за примерами и записью можно написать ей напрямую.':'Нажми на работу, чтобы рассмотреть её в полном размере.'}</p>`, `MASTERS / ${m.name.toUpperCase()}`);
}
function openAbout(){
 openWindow(`<div class="dialog-eyebrow">Приходи за татуировкой, оставайся ради атмосферы</div><h2>Meow <em>Tattoo.</em></h2>
 <p class="lead-copy">Место, где можно быть собой ♡</p><p>Мы не просто тату-студия. Это маленький мир, в котором можно выдохнуть, расслабиться и оставить условности за дверью.</p>
 <p>Здесь можно болтать о чём угодно, молчать, смеяться, делиться странными историями и даже получить расклад Таро. У нас не осуждают, зато любят творчество, татуировки и людей, которые приходят со своими идеями.</p>
 <div class="about-facts"><span>✦ Без осуждения</span><span>✦ По предварительной записи</span><span>✦ Тату и пирсинг</span></div>
 <div class="section-head"><h3>Наша настоящая студия</h3><span>05 / PHOTOS</span></div><div class="studio-gallery">${studioPhotos.map((alt,i)=>photo(img(`studio${i+1}`),alt)).join('')}</div>
 <div class="dialog-mini">Архангельск · ул. Поморская, 22 · ТЦ «Арбат»</div>
 ${action('https://vk.ru/club241438749','Наша группа VK','outline-action')}`, 'ABOUT / STUDIO');
}
function openContacts(){
 openWindow(`<div class="dialog-eyebrow">Контакты и запись</div><h2>До встречи <em>в студии.</em></h2>
 <div class="address-card"><div class="address-label">НАШ АДРЕС</div><div class="address-big">Архангельск<br>Поморская, 22</div><div>ТЦ «Арбат» · только по предварительной записи</div>${action('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Архангельск Поморская 22 ТЦ Арбат'),'Посмотреть на карте','outline-action')}</div>
 <div class="section-head"><h3>Написать мастеру</h3><span>DIRECT CONTACTS</span></div>
 <div class="contact-list">${Object.entries(masters).map(([k,m])=>`<div class="contact-item"><div class="contact-master"><img src="${img(m.portrait)}" alt="${m.name}"><div><strong>${m.name}</strong><small>${k==='ksenia'?'Татуировки': 'Татуировки и пирсинг'}</small></div></div><div class="contact-actions">${action(TG[k],'TG','small-link')}${action(VK[k],'VK','small-link')}</div></div>`).join('')}</div>
 ${action('https://vk.ru/club241438749','Группа студии VK','outline-action')}
 <p class="subtle-note">Принимаем с 16 лет. В 16–17 лет необходимо письменное разрешение родителей.</p>`, 'CONTACTS / RECORD');
}
function openPrices(){
 openWindow(`<div class="dialog-eyebrow">Единый прайс · Элина / Карина / Ксения</div><h2>Стоимость <em>тату.</em></h2>
 <p>Общий прайс студии для всех трёх мастеров. Размер и сложность будущей работы обсудим перед записью.</p>
 <h3 class="price-heading">Татуировки</h3>${rows(tattooPrices)}<h3 class="price-heading">Доплата за зоны</h3>${rows(tattooZones)}
 <div class="dialog-mini">Авторские свободные эскизы Ксении — отдельное предложение: <strong>2 500 ₽ до 5 см</strong>, без доплаты за расположение. Более 5 см — индивидуальный расчёт.</div>
 <div class="button-row"><button data-screen="flash" class="dialog-action">Открыть скетчбук ↗</button><button data-screen="piercing" class="outline-action">Прайс на пирсинг ↗</button><button data-screen="contacts" class="outline-action">Записаться ↗</button></div>`, 'PRICES / TATTOO');
}
let piercingMaster='karina';
function piercingContent(){
 const tabs=`<div class="switch-tabs" role="tablist" aria-label="Выбрать мастера пирсинга"><button class="${piercingMaster==='karina'?'active':''}" data-piercing="karina" role="tab" aria-selected="${piercingMaster==='karina'}">Карина</button><button class="${piercingMaster==='elina'?'active':''}" data-piercing="elina" role="tab" aria-selected="${piercingMaster==='elina'}">Элина</button></div>`;
 const body=piercingPrices[piercingMaster].map(p=>`<section class="piercing-section"><h3 class="price-heading">${p.section}</h3>${rows(p.items)}</section>`).join('');
 const gallery=piercingMaster==='karina'?`<div class="section-head"><h3>Работы Карины</h3><span>${String(piercingPhotos.length).padStart(2,'0')} / PHOTOS</span></div><div class="work-grid real-grid piercing-grid">${piercingPhotos.map((alt,i)=>photo(img(`piercing-${i+1}`),alt)).join('')}</div>`:'';
 return `<div class="dialog-eyebrow">Украшения и проколы</div><h2>Пирсинг <em>в MEOW.</em></h2><p>Выбери мастера — прайсы у Элины и Карины отличаются.</p>${tabs}<div class="piercing-prices">${body}</div>
 <div class="dialog-mini"><strong>Важно:</strong> украшения не входят в стоимость прокола и оплачиваются отдельно у обоих мастеров.</div>${action(TG[piercingMaster],`Записаться к ${piercingMaster==='karina'?'Карине':'Элине'}`)}${piercingMaster==='karina'?action(KARINA_PIERCING_GROUP,'Группа пирсинга Карины VK','outline-action'):''}${gallery}`;
}
function openPiercing(which){if(which==='karina'||which==='elina')piercingMaster=which;openWindow(piercingContent(),'PRICES / PIERCING');}
let flashIndex=0;let pageTurning=false;
function flashMarkup(){
 const n=flashIndex;
 return `<div class="dialog-eyebrow">Скетчбук Ксении · авторские эскизы</div><h2>Flash <em>book.</em></h2><p>Истории, которые ещё ждут своего человека. Может, одна из них твоя?</p>
 <div class="flash-offer"><span>СПЕЦЦЕНА НА АВТОРСКИЕ ЭСКИЗЫ</span><strong>2 500 ₽ <small>/ до 5 см</small></strong><span>Больше 5 см — индивидуально · без доплаты за расположение</span></div>
 <div class="sketchbook"><div class="book-spine" aria-hidden="true"></div><div class="book-page" id="bookPage"><span class="book-page-top">MEOW TATTOO · Ksenia's sketchbook</span><button class="sketch-image" type="button" data-lightbox="${img(`flash-${n+1}`)}" data-caption="Авторский эскиз Ксении: ${flashTitles[n]}"><img src="${img(`flash-${n+1}`)}" alt="Свободный эскиз ${n+1}: ${flashTitles[n]}"></button><div class="book-page-bottom"><div><b>${flashTitles[n]}</b><span>№ ${String(n+1).padStart(2,'0')} · ♡ свободен</span></div><small>${n+1} / ${flashTitles.length}</small></div></div></div>
 <div class="book-controls"><button class="book-arrow" type="button" data-flashmove="-1" aria-label="Предыдущий эскиз">← Назад</button><div class="book-dots">${flashTitles.map((_,i)=>`<button aria-label="Эскиз ${i+1}" class="${i===n?'active':''}" data-flashgoto="${i}"></button>`).join('')}</div><button class="book-arrow" type="button" data-flashmove="1" aria-label="Следующий эскиз">Дальше →</button></div>
 <div class="book-cta">${action(TG.ksenia,'Хочу этот эскиз')}<p>Напиши Ксении, что понравился эскиз № ${n+1} «${flashTitles[n]}». Размер и расположение обсудите лично.</p></div>
 <p class="subtle-note">Не нашёл свой эскиз? Можно обсудить с Ксенией индивидуальный проект.</p>`;
}
function openFlash(){flashIndex=0;pageTurning=false;openWindow(flashMarkup(),'SKETCHBOOK / KSENIA');}
function updateFlash(to){if(pageTurning)return;const next=(to+flashTitles.length)%flashTitles.length;if(next===flashIndex)return;pageTurning=true;const p=document.getElementById('bookPage');if(p)p.classList.add('turning');setTimeout(()=>{flashIndex=next;dialogBody.innerHTML=flashMarkup();pageTurning=false;},reducedMotion?0:390);}
let fortuneIndex=-1;
function tarotMarkup(){
 const selected=fortuneCards[fortuneIndex];
 return `<div class="dialog-eyebrow">Элина представляет / Просто ради веселья</div><h2>Meow <em>Tarot.</em></h2><p>Что говорят карты? Вытяни одну и узнай, что приготовила тебе Вселенная (или кошка).</p><div class="tarot-place"><div class="tarot-card" id="tarotCard"><div class="tarot-face tarot-back"><span>✦ ✦ ✦</span><div class="tarot-moon">☾</div><strong>MEOW<br>TAROT</strong><small>ТВОЯ КАРТА ДНЯ</small><span>✦ ✦ ✦</span></div><div class="tarot-face tarot-front"><span>✦ MEOW TATTOO ✦</span><div class="tarot-star">☼</div><h3 id="fortuneTitle">${selected?e(selected[0]):'Загадка'}</h3><p id="fortuneText">${selected?e(selected[1]):''}</p><small>СЛУЧАЙНОЕ ПРЕДСКАЗАНИЕ</small></div></div></div>
 <button class="dialog-action tarot-action" data-fortune="1" type="button">${selected?'Вытянуть другую карту':'Вытянуть карту'} ✦</button><p class="subtle-note">Это шуточные предсказания, не настоящий расклад. За личным раскладом можно написать Элине.</p>${action(TG.elina,'Написать Элине','outline-action')}`;
}
function openTarot(){fortuneIndex=-1;openWindow(tarotMarkup(),'TAROT / ELINA');}
function drawFortune(){let next=Math.floor(Math.random()*fortuneCards.length);if(next===fortuneIndex)next=(next+1)%fortuneCards.length;fortuneIndex=next;const card=document.getElementById('tarotCard');if(!card)return;card.classList.remove('revealed');const title=document.getElementById('fortuneTitle'),message=document.getElementById('fortuneText');setTimeout(()=>{title.textContent=fortuneCards[fortuneIndex][0];message.textContent=fortuneCards[fortuneIndex][1];card.classList.add('revealed');},reducedMotion?0:130);const actionButton=dialogBody.querySelector('[data-fortune]');if(actionButton)actionButton.textContent='Вытянуть другую карту ✦';}
function openRules(){openWindow(`<div class="dialog-eyebrow">Перед визитом</div><h2>Правила <em>записи.</em></h2><div class="info-table">${[['Приём','По предварительной записи'],['До 16 лет','Не принимаем'],['В 16–17 лет','Письменное разрешение родителей'],['С 18 лет','Разрешение родителей не требуется']].map(([a,b])=>`<div>${a}</div><div>${b}</div>`).join('')}</div><p>По всем вопросам напиши выбранному мастеру — договоримся об удобной дате.</p><button data-screen="contacts" class="dialog-action">Выбрать мастера ↗</button>`, 'RULES / BOOKING');}
const views={about:openAbout,contacts:openContacts,prices:openPrices,piercing:()=>openPiercing(),flash:openFlash,tarot:openTarot,rules:openRules};
function openScreen(key){if(views[key])views[key]();}
document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openScreen(b.dataset.open)));
document.querySelectorAll('[data-master]').forEach(b=>b.addEventListener('click',()=>{const key=Object.keys(masters).find(k=>masters[k].name===b.dataset.master);openMaster(key)}));
dialogBody.addEventListener('click',evt=>{
 const b=evt.target.closest('button');if(!b)return;
 if(b.dataset.lightbox){const lightbox=document.getElementById('lightbox');const im=document.getElementById('lightboxImage');im.src=b.dataset.lightbox;im.alt=b.dataset.caption||'Фотография';document.getElementById('lightboxCaption').textContent=b.dataset.caption||'';lightbox.showModal();}
 if(b.dataset.screen)openScreen(b.dataset.screen);
 if(b.dataset.piercing)openPiercing(b.dataset.piercing);
 if(b.dataset.flashmove)updateFlash(flashIndex+Number(b.dataset.flashmove));
 if(b.dataset.flashgoto)updateFlash(Number(b.dataset.flashgoto));
 if(b.dataset.fortune)drawFortune();
});
document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',ev=>{if(ev.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>{if(returnFocus&&typeof returnFocus.focus==='function')returnFocus.focus();});
const lightbox=document.getElementById('lightbox');document.getElementById('closeLightbox').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',ev=>{if(ev.target===lightbox)lightbox.close();});
// Animated white cat. Three cutouts are placed independently of the background illustration.
const positions=[{x:'55.5%',y:'77%',w:'13%',file:'assets/cat-desk.webp',say:'Мур! Кошечка устроилась на столе ♡'},{x:'10%',y:'64%',w:'7.6%',file:'assets/cat-sofa.webp',say:'Кошечка теперь на диване ♡'},{x:'31%',y:'82%',w:'12%',file:'assets/cat-floor.webp',say:'А теперь кошечка отдыхает на ковре ♡'}];
let catIndex=0,moving=false,toastTimer;
const updateCat=p=>{cat.style.setProperty('--cat-x',p.x);cat.style.setProperty('--cat-y',p.y);cat.style.setProperty('--cat-w',p.w)};
updateCat(positions[0]);
cat.addEventListener('click',()=>{
 if(moving)return;moving=true;catIndex=(catIndex+1)%positions.length;const next=positions[catIndex];cat.classList.remove('is-hopping');void cat.offsetWidth;cat.classList.add('is-hopping');updateCat(next);
 toast.textContent=next.say;document.getElementById('mobileCatStatus').textContent=next.say;toast.classList.add('visible');clearTimeout(toastTimer);
 setTimeout(()=>{catImage.src=next.file;cat.classList.remove('is-hopping');moving=false},reducedMotion?0:900);
 toastTimer=setTimeout(()=>toast.classList.remove('visible'),2600);
});
const hintsToggle=document.getElementById('hintsToggle');hintsToggle.addEventListener('click',()=>{const hidden=scene.classList.toggle('hints-hidden');hintsToggle.setAttribute('aria-pressed',String(!hidden));hintsToggle.textContent=hidden?'✧ Подсказки: выкл.':'✧ Подсказки: вкл.';});
const zoomToggle=document.getElementById('zoomToggle');zoomToggle.addEventListener('click',()=>{const zoomed=viewport.classList.toggle('is-zoomed');zoomToggle.setAttribute('aria-pressed',String(zoomed));zoomToggle.textContent=zoomed?'Показать всю студию ⤢':'Увеличить комнату ⤢';document.getElementById('sceneMobileNote').textContent=zoomed?'Теперь можно двигать комнату пальцем ↔':'Нажми на ✦ или выбери раздел ниже';viewport.scrollLeft=zoomed?Math.round((scene.scrollWidth-viewport.clientWidth)*.38):0;});
document.getElementById('mobilePetCat').addEventListener('click',()=>cat.click());
document.getElementById('year').textContent=new Date().getFullYear();
