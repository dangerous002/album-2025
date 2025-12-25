/* =========================================== */
/* ЦЕНТРАЛИЗОВАННЫЙ АУДИО-МЕНЕДЖЕР            */
/* Управляет всеми аудио- и видео-элементами   */
/* =========================================== */
const AudioManager = {
    activeAudioElements: new Set(),
    backgroundMusic: null,

    // Инициализация
    init() {
        this.backgroundMusic = document.getElementById('backgroundMusic');
    },

    // Регистрация нового аудио/видео элемента
    register(element) {
        if (element.tagName === 'VIDEO') {
            element.addEventListener('play', () => this.onPlay(element));
            element.addEventListener('pause', () => this.onPause(element));
            element.addEventListener('ended', () => this.onPause(element));
        }
    },

    // Обработка начала воспроизведения
    onPlay(element) {
        // Приостанавливаем все другие аудио элементы
        this.activeAudioElements.forEach(el => {
            if (el !== element && el !== this.backgroundMusic) {
                el.pause();
            }
        });

        // Добавляем текущий элемент в активные
        this.activeAudioElements.add(element);

        // Уменьшаем громкость фоновой музыки при воспроизведении видео
        if (element.tagName === 'VIDEO' && this.backgroundMusic) {
            this.backgroundMusic.dataset.previousVolume = this.backgroundMusic.volume;
            this.backgroundMusic.volume = Math.min(this.backgroundMusic.volume, 0.1);
        }
    },

    // Обработка паузы
    onPause(element) {
        this.activeAudioElements.delete(element);

        // Восстанавливаем громкость фоновой музыки, если видео остановлено
        if (element.tagName === 'VIDEO' && this.backgroundMusic && 
            !Array.from(this.activeAudioElements).some(el => el.tagName === 'VIDEO')) {
            const prevVolume = parseFloat(this.backgroundMusic.dataset.previousVolume || 0.3);
            this.backgroundMusic.volume = prevVolume;
        }
    },

    // Приостановка всех видео
    pauseAllVideos() {
        document.querySelectorAll('video').forEach(video => {
            if (!video.paused) {
                video.pause();
            }
        });
    }
};

/* =========================================== */
/* КОНСТАНТЫ И ДАННЫЕ                          */
/* Данные всех секций с фото и видео           */
/* =========================================== */
const sectionsData = [
    {
        title: "Знакомство",
        text: [
            "Наше знакомство было странным и трепетным одновременно. Мы наблюдали друг за другом, даже не подозревая, что это взаимно. Я тайно фотографировал тебя в колледже, а ты искала меня глазами, проверяла моё расписание. Каждый раз, когда наши взгляды встречались, внутри что-то замирало. Помню, как я впервые подошёл к тебе в курилке забрать 10 рублей, как мы тогда называли друг друга «лп». Я был неуверен, смущён. Помнишь, я сказал: «Чо, вы типа из Бердска, да?» Всё внутри дрожало, и я не знал, как себя вести. Когда Кирилл сказал: «Это те, которые тебе нравятся?» — ты смутилась, слегка посмеявшись. Этот короткий смех стал маленькой искрой, теплом, которое я сразу почувствовал.",
            "С первых сообщений мы будто находили друг друга. Каждое твоё слово отзывалось внутри, делало дни ярче. Мы смеялись над мелочами, играли в Roblox, строили маленькие планы на будущее, ещё не осознавая, что между нами уже что-то особенное. С первых мгновений появилось ощущение близости, которое невозможно описать словами: лёгкое притяжение, трепет в груди и уверенность, что рядом свой человек. С того момента каждый день общения с тобой стал маленьким открытием, полным эмоций и тепла.",
        ],
        photos: [
            ["https://storage.yandexcloud.net/album-2025/1/1.JPG", "1/1.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/2.jpg", "1/2.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/3.jpg", "1/3.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/4.jpg", "1/4.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/5.jpg", "1/5.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/6.jpg", "1/6.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/7.jpg", "1/7.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/8.jpg", "1/8.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/9.jpg", "1/9.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/10.jpg", "1/10.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/11.jpg", "1/11.jpg"],
            ["https://storage.yandexcloud.net/album-2025/1/12.jpg", "1/12.jpg"],
        ],
        videos: [
            ["https://storage.yandexcloud.net/album-2025/1/13.MP4", "1/13.MP4"],
            ["https://storage.yandexcloud.net/album-2025/1/14.MP4", "1/14.MP4"]
        ]
    },
    {
        title: "Первая встреча",
        text: [
            "Наша первая встреча была 27 июня 2025 года. За день до этого мы уже начали встречаться — ещё только в переписке, но казалось, будто между нами давно что-то есть. В пятницу я приехал к тебе в Бердск. Мы пошли гулять в парк, сели на лавочке и начали тэгать стикер, который затем наклеили на лавочку. Я помню своё состояние почти покадрово. Меня трясло от волнения — серьёзно, я путался в мыслях, не мог нормально сформулировать ни одно предложение. Я был в полном шоке от твоей красоты. И при этом рядом с тобой было такое чувство лёгкости, будто время остановилось и всё вокруг перестало существовать. В этот момент мир заиграл новыми, не видаными раньше, красками.",
            "Мы говорили о жизни. Я рассказывал историю о том, как нас с другом выселили из квартиры, делился смешными моментами про друзей. Ты слушала, очень тепло реагировала, когда я рассказывал о себе. А большую часть времени мы смотрели TikTok, записывали кружочки моим друзьям — будто были вместе уже тысячу лет, настолько всё было естественно. Был один момент, который я никогда не забуду. Ты внезапно сказала: «А ты знал, что я мама?». Я тогда просто выпал. Не понял, что ответить. И ты такая спокойная: «Да, у меня есть сын, я его крестила недавно». Напряжение исчезло, мы посмеялись. Это одно из самых теплых воспоминаний. К концу встречи тебе было больно, но ты всё равно проводила меня на вокзал.",
            "Мы стояли, обнимались, оттягивали секунды перед расставанием. Был невероятно красивый закат, электричка подъезжала, и мы сделали фото — одно из тех, что останется на всю жизнь. Когда я убрал телефон, посмотрел тебе в глаза — в тот момент мы были самыми счастливыми людьми на свете. Ты слегка уводила взгляд, смущалась, смотрела, как близко подъезжала электричка. Я думал, может поцеловать тебя, но застеснялся. Тогда ты сама нежно взяла меня и поцеловала. У меня просто вырубились все мысли. Я был в шоке и счастье одновременно. Когда двери открылись, ты сказала: «Ну всё, иди. Я тебя люблю». Я развернулся, чтобы зайти, но внутри что-то рвануло назад. Я обернулся, приобнял и поцеловал. Неловко, трясущимся голосом сказал: «Стой… это мой первый раз». И в последний момент зашел в вагон.",
            "В электричке я светился. Слезы подходили к глазам сами собой. Ты написала: «Тимоша, я тебя так сильно люблю, это капец». А я ответил, что чувствую то же самое, что никто никогда так не открывался мне. Закат через окно электрички был красным, потом — фиолетовым, мир будто замолчал. Я никогда в жизни не ощущал такого счастья. А когда пришёл домой, из окна слышались залпы салюта — как будто весь мир радовался за нас. В тот день я лег спать со слезами и с ощущением, что это начало чего-то невероятного.",
        ],
        photos: [
            ["https://storage.yandexcloud.net/album-2025/2/1.jpg", "2/1.jpg"],
            ["https://storage.yandexcloud.net/album-2025/2/2.jpg", "2/2.jpg"],
            ["https://storage.yandexcloud.net/album-2025/2/3.jpg", "2/3.jpg"],
            ["https://storage.yandexcloud.net/album-2025/2/4.jpg", "2/4.jpg"],
            ["https://storage.yandexcloud.net/album-2025/2/5.jpg", "2/5.jpg"],
            ["https://storage.yandexcloud.net/album-2025/2/6.jpg", "2/6.jpg"],
            ["https://storage.yandexcloud.net/album-2025/2/7.jpg", "2/7.jpg"],
        ],
        videos: [
            ["https://storage.yandexcloud.net/album-2025/2/8.mp4", "2/8.mp4"],
            ["https://storage.yandexcloud.net/album-2025/2/9.mp4", "2/9.mp4"],
            ["https://storage.yandexcloud.net/album-2025/2/10.mp4", "2/10.mp4"],
        ]
    },
    {
        title: "Мы начали встречаться",
        text: [
            "Мы начали встречаться не в тот момент, когда это появилось в переписке. Настоящее осознание пришло позже — уже после первой встречи, в электричке, по дороге домой.",
            "Я сидел и смотрел в окно, а внутри было странное, новое состояние. Спокойствие и беспокойство одновременно. Уверенность и неуверенность. Но среди всех этих чувств было главное — ясное понимание: ты мой человек. В тот момент я впервые почувствовал, что одна из самых важных целей в моей жизни выполнена. Я нашёл того, с кем готов идти дальше, с кем хочу провести всю жизнь.",
            "Вместе с этим пришло и ощущение ответственности. Я понял, что главное в отношениях — делать любимого человека счастливым. Я хотел этого всем сердцем. Не всегда получалось, иногда из-за неопытности, иногда по глупости я говорил обидные вещи. Но даже тогда внутри было одно и то же желание — беречь, заботиться, быть рядом.",
            "После этого была наша вторая встреча. И она прошла совсем иначе — легко, спокойно, без волнения. Рядом с тобой я чувствовал невероятное спокойствие, будто всё встало на свои места. Мне не нужно было притворяться, подбирать слова или думать, как выглядеть — я просто был собой. И мне было хорошо.",
            "С этого момента изменилось даже мышление. Появилось «мы». Появилось «у нас». Появилось ощущение, что теперь я не один — даже когда мы не рядом.",
            "Я сразу рассказал о тебе друзьям и родителям. Без сомнений, без пауз. Я говорил прямо и уверенно: это моя девушка, и я её люблю. Мне хотелось, чтобы весь мой мир знал о тебе.",
            "Я думаю о нас постоянно. С самого знакомства не проходит и минуты, чтобы ты не появлялась в моих мыслях. Иногда это воспоминание, иногда — тепло, иногда — улыбка без причины.",
            "И самое главное ощущение, которое появилось тогда и осталось до сих пор — чувство дома. Тёплого, спокойного, настоящего. Даже когда мы не рядом. Даже когда я просто думаю о тебе.",
        ],
        photos: [
            ["https://storage.yandexcloud.net/album-2025/3/1.jpg", "3/1.jpg"],
            ["https://storage.yandexcloud.net/album-2025/3/2.jpg", "3/2.jpg"],
            ["https://storage.yandexcloud.net/album-2025/3/3.jpg", "3/3.jpg"],
            ["https://storage.yandexcloud.net/album-2025/3/4.jpg", "3/4.jpg"],
            ["https://storage.yandexcloud.net/album-2025/3/5.jpg", "3/5.jpg"],
            ["https://storage.yandexcloud.net/album-2025/3/6.jpg", "3/6.jpg"],
            ["https://storage.yandexcloud.net/album-2025/3/7.jpg", "3/7.jpg"],
            ["https://storage.yandexcloud.net/album-2025/3/8.jpg", "3/8.jpg"],
            ["https://storage.yandexcloud.net/album-2025/3/9.jpg", "3/9.jpg"],
        ],
        videos: [
            ["https://storage.yandexcloud.net/album-2025/3/10.mp4", "3/10.mp4"],
            ["https://storage.yandexcloud.net/album-2025/3/11.mp4", "3/11.mp4"],
            ["https://storage.yandexcloud.net/album-2025/3/12.MP4", "3/12.MP4"],
        ]
    },
    {
        title: "Наш июль",
        text: [
            "Этот июль стал самым счастливым из всех, что у меня были. Насыщенный эмоциями, встречами и моментами, которые невозможно забыть. Каждая наша встреча была чем-то новым, живым, настоящим — таким, что оставляло внутри сильный след.",
            "Мы почти каждый день были вместе. Я приезжал к тебе в Бердск — мы гуляли, я приходил к тебе в гости, ты кормила меня, а я приносил тебе подарки и вкусняшки. Иногда ты приезжала ко мне: мы лежали, смотрели TikTok, готовили вместе, выходили гулять с друзьями. А когда не было возможности увидеться, мы всё равно были рядом — созванивались, общались, играли. Весь июль, всё свободное время — вместе.",
            "Один из самых тёплых моментов — знакомство с твоей семьёй. Меня приняли очень тепло, накормили, окружили заботой. Было ощущение, что я на своём месте. Даже твой пёс решил познакомиться со мной по-своему — этот момент до сих пор вызывает улыбку.",
            "Потом ты приехала ко мне в посёлок. Я познакомил тебя со своей семьёй. Все были в восторге от тебя — от твоей красоты, твоей доброты, от того, какая ты умная. В тот момент я особенно ясно понял: ты именно та девочка, которая мне нужна. Мы вместе готовили «Цезарь», а потом пошли гулять с моими друзьями.",
            "И была наша последняя встреча перед расставанием длиной в месяц. В тот день я подарил тебе букет альстромерий. Мы пришли к тебе домой, аккуратно подрезали цветы и поставили их в вазу. Дома было тихо, спокойно, никого не было — только мы. Мы разговаривали, ты кормила меня, и этот день был одновременно очень счастливым и немного грустным.",
            "Нам предстояло расставание. Ты проводила меня на вокзал, и мы снова оттягивали момент до последнего. Впереди была моя поездка на Алтай с семьёй и твоя поездка в Калачинск, к бабушке, друзьям и родным. Мы знали, что это ненадолго, но всё равно было тяжело отпускать.",
            "Весь этот июль я чувствовал себя уверенно, спокойно и по-настоящему счастливым. Я будто стал взрослее. Как будто раньше кто-то подавлял во мне настоящего меня, а рядом с тобой я начал расцветать. Ты показала мне, каким красивым может быть этот рост. Этот июль — мой дом.",
        ],
        photos: [
            ["https://storage.yandexcloud.net/album-2025/4/1.jpg", "4/1.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/2.jpg", "4/2.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/3.jpg", "4/3.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/4.jpg", "4/4.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/5.jpg", "4/5.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/6.jpg", "4/6.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/7.jpg", "4/7.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/8.jpg", "4/8.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/9.jpg", "4/9.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/10.jpg", "4/10.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/11.jpg", "4/11.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/12.jpg", "4/12.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/13.jpg", "4/13.jpg"],
            ["https://storage.yandexcloud.net/album-2025/4/14.jpg", "4/14.jpg"],
        ],
        videos: [
            ["https://storage.yandexcloud.net/album-2025/4/15.mp4", "4/15.mp4"],
            ["https://storage.yandexcloud.net/album-2025/4/16.mp4", "4/16.mp4"],
            ["https://storage.yandexcloud.net/album-2025/4/17.mp4", "4/17.mp4"],
            ["https://storage.yandexcloud.net/album-2025/4/18.mp4", "4/18.mp4"],
            ["https://storage.yandexcloud.net/album-2025/4/19.MP4", "4/19.MP4"],
            ["https://storage.yandexcloud.net/album-2025/4/20.MP4", "4/20.MP4"],
            ["https://storage.yandexcloud.net/album-2025/4/21.mp4", "4/21.mp4"],
        ]
    },
    {
        title: "Алтай",
        text: [
            "Поездка на Алтай оказалась непростой. Внешне всё выглядело красиво: турбаза, отвесные скалы, тишина. Но внутри мне было тяжело. Это было место, где вроде бы хорошо, но в то же время очень плохо. Место, из которого хотелось уехать.",
            "Я постоянно думал о тебе. Мы всё время были на связи, переписывались. Между нами было расстояние, но именно там я впервые так остро почувствовал, что оно ничего не решает.",
            "Эта поездка стала для меня большим опытом. Я начал открываться тебе по-настоящему. Говорил о своих переживаниях, о том, что болело, о том, что раньше никому не говорил. Ты была рядом, поддерживала, принимала — спокойно и искренне. И в какой-то момент я понял, насколько это ценно.",
            "Алтай показал мне простую, но очень важную вещь: настоящая близость — не в километрах и не во встречах. Она в доверии, в умении быть собой и знать, что тебя услышат. Даже если вы не рядом физически. И именно это осознание стало для меня самым главным, что я привёз оттуда.",
        ],
        photos: [
            ["https://storage.yandexcloud.net/album-2025/5/1.jpg", "5/1.jpg"],
            ["https://storage.yandexcloud.net/album-2025/5/2.jpg", "5/2.jpg"],
            ["https://storage.yandexcloud.net/album-2025/5/3.jpg", "5/3.jpg"],
            ["https://storage.yandexcloud.net/album-2025/5/4.jpg", "5/4.jpg"],
            ["https://storage.yandexcloud.net/album-2025/5/5.jpg", "5/5.jpg"],
            ["https://storage.yandexcloud.net/album-2025/5/6.jpg", "5/6.jpg"],
            ["https://storage.yandexcloud.net/album-2025/5/7.jpg", "5/7.jpg"],
            ["https://storage.yandexcloud.net/album-2025/5/8.jpg", "5/8.jpg"],
        ],
        videos: []
    },
    {
        title: "Калачинск",
        text: [
            "Твоя поездка в Калачинск для меня стала особенным временем. В нём было странное сочетание спокойствия и тоски. Я знал, что ты далеко, и скучал, но внутри не было тревоги — только тихое ожидание и уверенность, что между нами всё по-настоящему.",
            "Мы стали разговаривать ещё больше. Почти каждый день — видеосвязь, долгие разговоры, которые могли тянуться часами. Я лежал у себя в кровати, а ты обычно выходила на балкон, чтобы никому не мешать. Мы могли смотреть друг на друга, делиться мелочами — и этого было достаточно. Казалось, будто расстояние исчезает.",
            "Я чувствовал твоё присутствие, даже когда мы были далеко друг от друга. Это было и ожидание, и тепло, и внутренняя связь, которую невозможно оборвать расстоянием. Будто ты рядом, даже если нас разделяют километры.",
            "И именно в этот период во мне появилось спокойствие. Лето до этого было ярким, эмоциональным, бурным, а Калачинск стал временем устойчивости. Всё улеглось, встало на свои места. Я понял, что мне хорошо, надёжно и спокойно с тобой — даже на расстоянии.",
            "Калачинск стал для меня этапом тихой любви, ожиданием, приятной тоской. И ещё одним подтверждением того, что настоящая близость — не в том, чтобы быть рядом физически, а в том, чтобы чувствовать друг друга сердцем.",
        ],
        photos: [
            ["https://storage.yandexcloud.net/album-2025/6/1.jpg", "6/1.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/2.jpg", "6/2.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/3.jpg", "6/3.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/4.jpg", "6/4.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/5.jpg", "6/5.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/6.jpg", "6/6.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/7.jpg", "6/7.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/8.jpg", "6/8.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/9.jpg", "6/9.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/10.jpg", "6/10.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/11.jpg", "6/11.jpg"],
            ["https://storage.yandexcloud.net/album-2025/6/12.jpg", "6/12.jpg"],
        ],
        videos: [
            ["https://storage.yandexcloud.net/album-2025/6/13.mp4", "6/13.mp4"],
        ]
    },
    {
        title: "Последние дни лета",
        text: [
            "Ты вернулась в середине августа. Я встречал тебя на вокзале и, пока ждал поезд, внутри всё дрожало — не от тревоги, а от счастья. Было такое ощущение, будто сейчас начнётся что-то очень важное. Я помог довезти вещи, мы пошли к тебе домой, и весь оставшийся день просто были рядом. Без спешки. Без лишних слов. Мы наслаждались друг другом.",
            "Я хорошо помню момент, когда мы смотрели друг на друга, глаза в глаза, и ты сказала: «Я не верю, что у меня такой парень». Я до сих пор не понимаю, почему ты считаешь меня таким хорошим — мне кажется, я просто люблю. Но эти слова отозвались во мне очень глубоко. Они остались внутри и до сих пор греют.",
            "В это время было сразу два чувства. Радость от того, что мы снова рядом, и ощущение начала — впереди был учебный год, новая жизнь. И одновременно тихая грусть: мы прощались с нашим первым летом. Тем самым, которое было самым счастливым.",
            "Самые тёплые воспоминания — это даже не какие-то события, а простые моменты. Мы лежим вместе, разговариваем, строим планы. Просто быть рядом оказалось важнее всего.",
            "Конец лета был уже не таким эмоциональным, как июль. Он стал тише. Глубже. Спокойнее. В нём появилось ощущение стабильности и понимание, что рядом — тот самый, нужный человек. В те дни я особенно ясно понял, как сильно тебя люблю. Последние дни лета остались во мне покоем, нежностью и ощущением дома — рядом с тобой.",
        ],
        photos: [
            ["https://storage.yandexcloud.net/album-2025/7/1.jpg", "7/1.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/2.jpg", "7/2.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/3.jpg", "7/3.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/4.jpg", "7/4.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/5.jpg", "7/5.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/6.jpg", "7/6.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/7.jpg", "7/7.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/8.jpg", "7/8.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/9.jpg", "7/9.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/10.jpg", "7/10.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/11.jpg", "7/11.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/12.jpg", "7/12.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/13.jpg", "7/13.jpg"],
            ["https://storage.yandexcloud.net/album-2025/7/14.jpg", "7/14.jpg"],
        ],
        videos: [
            ["https://storage.yandexcloud.net/album-2025/7/15.mp4", "7/15.mp4"],
            ["https://storage.yandexcloud.net/album-2025/7/16.mp4", "7/16.mp4"],
            ["https://storage.yandexcloud.net/album-2025/7/17.MP4", "7/17.MP4"],
            ["https://storage.yandexcloud.net/album-2025/7/18.MP4", "7/18.MP4"],
        ]
    },
    {
        title: "Осень",
        text: [
            "Эта осень оказалась для нас очень сложной. Колледж, загруженность, постоянные мелкие конфликты — всё это вызывало дистанцию между нами. Иногда я начинал закрываться, но мы находили в себе силы разговаривать, слушать друг друга и прекращать споры. Осень стала бесценным опытом: она показала, что для нас действительно важно — взаимопонимание, терпение и умение прощать. Она показала, как не стоит себя вести, и как важно работать над собой ради отношений.",
            "Мы начали видеться чаще, но порой эти встречи казались пустыми — колледж провоцировал конфликты, нагрузка и выгорание делали своё. И всё же даже в этом хаосе мы находили моменты, которые оставались только нашими: объятия, тихие разговоры, поездки в электричке, редкие совместные прогулки или просто время дома, когда можно было быть вместе без посторонних.",
            "Любовь осенью стала глубже и надёжнее. Несмотря на страхи, которые иногда возникали из-за конфликтов, мы чувствовали друг друга, учились понимать мысли, чувства и желания друг друга. Мы росли вместе, стараясь делать друг друга счастливыми, и именно это стало основой наших отношений.",
            "Образ осени для меня — дождь за окном. Мы сидим в комнате, тепло и спокойно, рядом — любимый человек. А дождь напоминает о том, что мир вокруг порой бывает неспокойным, а колледж — не та среда, где нам легко. Он символизирует внешние трудности, конфликты, выгорание, через которые мы учились быть вместе и понимать друг друга.",
            "В этой осени был и один особенно светлый момент. Я долго к нему шёл — копил, иногда экономил на себе, потому что для меня было важно не сказать, а сделать. Мне хотелось порадовать тебя по-настоящему, вложить в это не вещь, а заботу. Когда я подарил тебе этот подарок, я радовался сильнее, чем если бы сделал его себе. Ты расплакалась, не верила до последнего, и в тот момент я ясно понял: любовь — это не громкие слова, а поступки и ответственность за них. А уже на следующий день жизнь будто тихо ответила мне — мама подарила мне машину. Я не воспринял это как награду, скорее как странное и тёплое ощущение баланса: когда ты отдаёшь искренне, мир иногда возвращает.",
            "Эта осень — о терпении, росте и настоящей близости. Даже когда вокруг сложно, внутри мы нашли наш покой и тепло.",
        ],
        photos: [
            ["https://storage.yandexcloud.net/album-2025/8/1.jpg", "8/1.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/2.jpg", "8/2.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/3.jpg", "8/3.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/4.jpg", "8/4.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/5.jpg", "8/5.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/6.jpg", "8/6.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/7.jpg", "8/7.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/8.jpg", "8/8.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/9.jpg", "8/9.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/10.jpg", "8/10.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/11.jpg", "8/11.jpg"],
            ["https://storage.yandexcloud.net/album-2025/8/12.jpg", "8/12.jpg"],
        ],
        videos: [
            ["https://storage.yandexcloud.net/album-2025/8/13.MP4", "8/13.MP4"],
            ["https://storage.yandexcloud.net/album-2025/8/14.mp4", "8/14.mp4"],
            ["https://storage.yandexcloud.net/album-2025/8/15.mp4", "8/15.mp4"],
            ["https://storage.yandexcloud.net/album-2025/8/16.mp4", "8/16.mp4"],
            ["https://storage.yandexcloud.net/album-2025/8/17.mp4", "8/17.mp4"],
            ["https://storage.yandexcloud.net/album-2025/8/18.mp4", "8/18.mp4"],
            ["https://storage.yandexcloud.net/album-2025/8/19.mp4", "8/19.mp4"],
            ["https://storage.yandexcloud.net/album-2025/8/20.MP4", "8/20.MP4"],
            ["https://storage.yandexcloud.net/album-2025/8/21.MP4", "8/21.MP4"],
            ["https://storage.yandexcloud.net/album-2025/8/22.MP4", "8/22.MP4"],
            ["https://storage.yandexcloud.net/album-2025/8/23.MP4", "8/23.MP4"],
            ["https://storage.yandexcloud.net/album-2025/8/24.MP4", "8/24.MP4"],
            ["https://storage.yandexcloud.net/album-2025/8/25.MP4", "8/25.MP4"],
        ]
    },
    {
        title: "Наша эстетика",
        text: [
            
        ],
        photos: [
            ["https://storage.yandexcloud.net/album-2025/9/1.jpg", "9/1.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/2.jpg", "9/2.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/3.jpg", "9/3.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/4.jpg", "9/4.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/5.jpg", "9/5.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/6.jpg", "9/6.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/7.JPG", "9/7.JPG"],
            ["https://storage.yandexcloud.net/album-2025/9/8.JPG", "9/8.JPG"],
            ["https://storage.yandexcloud.net/album-2025/9/9.jpg", "9/9.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/10.jpg", "9/10.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/11.jpg", "9/11.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/12.jpg", "9/12.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/13.JPG", "9/13.JPG"],
            ["https://storage.yandexcloud.net/album-2025/9/14.jpg", "9/14.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/15.jpg", "9/15.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/16.JPG", "9/16.JPG"],
            ["https://storage.yandexcloud.net/album-2025/9/17.jpg", "9/17.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/18.jpg", "9/18.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/19.jpg", "9/19.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/23.jpg", "9/23.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/24.jpg", "9/24.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/25.jpg", "9/25.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/26.jpg", "9/26.jpg"],
            ["https://storage.yandexcloud.net/album-2025/9/27.jpg", "9/27.jpg"],
        ],
        videos: [
            ["https://storage.yandexcloud.net/album-2025/9/20.MP4", "9/20.MP4"],
            ["https://storage.yandexcloud.net/album-2025/9/21.MP4", "9/21.MP4"],
            ["https://storage.yandexcloud.net/album-2025/9/22.MP4", "9/22.MP4"],
        ]
    },
];

/* =========================================== */
/* КЛАСС ДЛЯ ЗАГРУЗКИ МЕДИА                   */
/* Загружает все изображения и видео          */
/* =========================================== */
class MediaLoader {
    constructor() {
        this.totalMediaItems = 0;
        this.loadedMediaItems = 0;
        this.failedMediaItems = 0;
        this.totalSliders = 0;
        this.loadedSliders = 0;
        this.maxConcurrent = 5;
        this.maxRetries = 9999;
        this.activeDownloads = 0;
        this.retryCounts = new Map();
        this.mediaQueue = [];
        this.isLoading = false;
        this.loadingComplete = false;
        this.allSlidersInitialized = false;
    }

    // Инициализация загрузчика
    initialize() {
        this.totalSliders = sectionsData.length;
        this.calculateTotalMedia();
    }

    // Подсчет общего количества медиа-элементов
    calculateTotalMedia() {
        sectionsData.forEach(section => {
            this.totalMediaItems += section.photos.length;
            if (section.videos) {
                this.totalMediaItems += section.videos.length;
            }
        });
        
        // Добавляем обложку и музыку
        this.totalMediaItems += 2;
    }

    // Начало загрузки
    async startLoading() {
        if (this.isLoading) return;
        this.isLoading = true;
        
        this.createMediaQueue();
        await this.processQueue();
        await this.waitForAllSliders();
        
        this.loadingComplete = true;
        
        // Запуск приложения после загрузки
        setTimeout(() => this.launchApplication(), 300);
    }

    // Создание очереди загрузки
    createMediaQueue() {
        // Обложка
        this.mediaQueue.push({
            type: 'hero',
            url: 'обложка.jpg',
            retries: 0
        });
        
        // Музыка
        this.mediaQueue.push({
            type: 'music',
            url: 'music.mp3',
            retries: 0
        });
        
        // Фото и видео из секций
        sectionsData.forEach((section, sectionIndex) => {
            section.photos.forEach((photo, photoIndex) => {
                this.mediaQueue.push({
                    type: 'image',
                    url: photo[0],
                    backupUrl: photo[1],
                    sectionIndex,
                    photoIndex,
                    retries: 0
                });
            });
            
            if (section.videos) {
                section.videos.forEach((video, videoIndex) => {
                    this.mediaQueue.push({
                        type: 'video',
                        url: video[0],
                        backupUrl: video[1],
                        sectionIndex,
                        videoIndex,
                        retries: 0
                    });
                });
            }
        });
    }

    // Обработка очереди
    async processQueue() {
        const promises = [];
        
        // Запускаем несколько параллельных загрузок
        for (let i = 0; i < Math.min(this.maxConcurrent, this.mediaQueue.length); i++) {
            promises.push(this.processNextItem());
        }
        
        await Promise.all(promises);
    }

    // Обработка следующего элемента очереди
    async processNextItem() {
        while (this.mediaQueue.length > 0) {
            const item = this.mediaQueue.shift();
            if (!item) continue;
            
            if (!item.url) {
                this.failedMediaItems++;
                this.updateProgress();
                continue;
            }
            
            // Ограничение одновременных загрузок
            while (this.activeDownloads >= this.maxConcurrent) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            this.activeDownloads++;
            await this.loadMediaItem(item);
            this.activeDownloads--;
        }
    }

    // Загрузка одного медиа-элемента
    async loadMediaItem(item) {
        let loaded = false;
        let attempts = 0;
        
        if (!item.url) {
            this.failedMediaItems++;
            this.updateProgress();
            return;
        }
        
        const isYandexCDN = item.url.includes('yandexcloud.net');
        
        // Попытки загрузки с ретраями
        while (!loaded && attempts < this.maxRetries) {
            attempts++;
            item.loadingAttempts = attempts;
            
            try {
                // Пробуем основной URL, затем резервный
                if (isYandexCDN && attempts <= 1) {
                    await this.loadSingleItem(item);
                } else if (item.backupUrl) {
                    const backupItem = { ...item, url: item.backupUrl };
                    await this.loadSingleItem(backupItem);
                } else {
                    await this.loadSingleItem(item);
                }
                
                loaded = true;
                this.loadedMediaItems++;
                this.updateProgress();
                
            } catch (error) {
                if (attempts >= this.maxRetries) {
                    this.failedMediaItems++;
                    this.updateProgress();
                } else {
                    // Экспоненциальная задержка между попытками
                    const delay = Math.min(2000 * Math.pow(1.5, attempts - 1), 10000);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
    }

    // Загрузка одного элемента
    async loadSingleItem(item) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error(`Таймаут загрузки: ${item.url}`));
            }, 30000);

            if (item.type === 'image' || item.type === 'hero') {
                const img = new Image();
                img.onload = () => {
                    clearTimeout(timeout);
                    
                    // Установка фонового изображения для героя
                    if (item.type === 'hero') {
                        const heroBg = document.getElementById('heroBg');
                        if (heroBg) {
                            heroBg.style.backgroundImage = `url("${item.url}")`;
                        }
                    }
                    
                    resolve();
                };
                img.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error(`Ошибка загрузки изображения: ${item.url}`));
                };
                img.src = item.url;
                
            } else if (item.type === 'video') {
                const video = document.createElement('video');
                video.preload = 'metadata';
                
                video.onloadedmetadata = () => {
                    clearTimeout(timeout);
                    resolve();
                };
                video.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error(`Ошибка загрузки видео: ${item.url}`));
                };
                
                video.src = item.url;
                
            } else if (item.type === 'music') {
                const audio = document.getElementById('backgroundMusic');
                if (audio) {
                    audio.load();
                    audio.addEventListener('canplaythrough', () => {
                        clearTimeout(timeout);
                        resolve();
                    }, { once: true });
                    
                    audio.onerror = () => {
                        clearTimeout(timeout);
                        reject(new Error(`Ошибка загрузки музыки: ${item.url}`));
                    };
                } else {
                    clearTimeout(timeout);
                    resolve();
                }
            }
        });
    }

    // Ожидание инициализации всех слайдеров
    async waitForAllSliders() {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (this.loadedSliders >= this.totalSliders) {
                    clearInterval(checkInterval);
                    this.allSlidersInitialized = true;
                    resolve();
                }
            }, 100);
        });
    }

    // Обновление прогресса загрузки
    updateProgress() {
        const processed = this.loadedMediaItems + this.failedMediaItems;
        const progressPercent = Math.round((processed / this.totalMediaItems) * 100);
        
        const loadingText = document.getElementById('loadingText');
        if (loadingText) {
            loadingText.textContent = `Загрузка воспоминаний... ${progressPercent}%`;
        }
    }

    // Увеличение счетчика загруженных слайдеров
    incrementLoadedSliders() {
        this.loadedSliders++;
    }

    // Запуск приложения после загрузки
    launchApplication() {
        if (!this.loadingComplete) return;
        
        const loader = document.getElementById('loadingOverlay');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Инициализация систем после загрузки
                setupScrollReveal();
                createHeartsSystem();
                setupMusicPlayer();
                
            }, 500);
        }
    }
}

const mediaLoader = new MediaLoader();

/* =========================================== */
/* ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ                    */
/* =========================================== */

// Создание DOM элемента
const el = (tag, cls = "", html = "") => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
};

// Проверка, является ли файл видео
function isVideoFile(src) {
    if (!src) return false;
    const videoExtensions = ['.mp4', '.MP4', '.mov', '.MOV', '.avi', '.webm', '.mkv'];
    const lowerSrc = src.toLowerCase();
    return videoExtensions.some(ext => lowerSrc.endsWith(ext.toLowerCase()));
}

// Дебаунс для оптимизации частых вызовов
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* =========================================== */
/* ЛАЙТБОКС (МОДАЛЬНОЕ ОКНО ПРОСМОТРА)        */
/* =========================================== */
const LB = (() => {
    const root = document.getElementById("lightbox");
    const content = root.querySelector(".lb-content");
    const img = root.querySelector(".lb-image");
    const video = root.querySelector(".lb-video");
    const videoSource = video.querySelector("source");
    const btnClose = root.querySelector(".lb-close");
    const btnPrev = root.querySelector(".lb-prev");
    const btnNext = root.querySelector(".lb-next");
    
    let items = [],
        idx = 0,
        isAnimating = false,
        isMobile = window.innerWidth <= 768,
        touchStartX = 0,
        touchStartY = 0,
        touchEndX = 0,
        touchEndY = 0,
        isSwiping = false,
        swipeStartElement = null;

    // Обновление флага мобильного устройства при ресайзе
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 768;
    });

    // Проверка, находится ли элемент внутри контролов видео
    function isInsideVideoControls(element) {
        if (!element || !video.contains(element)) return false;
        
        const videoRect = video.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const controlsAreaTop = videoRect.top + videoRect.height * 0.75;
        
        if (elementRect.top >= controlsAreaTop) {
            return true;
        }
        
        let currentElement = element;
        while (currentElement && currentElement !== video) {
            const tagName = currentElement.tagName.toLowerCase();
            const className = currentElement.className || '';
            
            if (tagName === 'button' || tagName === 'input' || tagName === 'progress' || 
                className.includes('control') || className.includes('progress') || 
                className.includes('seek') || className.includes('volume') ||
                className.includes('play') || className.includes('pause')) {
                return true;
            }
            
            currentElement = currentElement.parentElement;
        }
        
        return false;
    }

    // Открытие лайтбокса
    function open(itemsArray, i) {
        items = itemsArray.slice();
        idx = i;
        showItem();
        root.classList.remove("hidden");
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
    }
    
    // Закрытие лайтбокса
    function close() {
        root.classList.add("hidden");
        img.src = "";
        videoSource.src = "";
        video.classList.add("hidden");
        img.classList.add("hidden");
        video.pause();
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    }
    
    // Предыдущее фото/видео
    function prev() {
        if (isAnimating) return;
        idx = (idx - 1 + items.length) % items.length;
        showItemWithAnimation();
    }
    
    // Следующее фото/видео
    function next() {
        if (isAnimating) return;
        idx = (idx + 1) % items.length;
        showItemWithAnimation();
    }
    
    // Показ текущего элемента
    function showItem() {
        const currentItem = items[idx];
        const isVideo = currentItem.type === "video" || isVideoFile(currentItem.src);
        
        if (isVideo) {
            img.classList.add("hidden");
            
            setTimeout(() => {
                video.classList.remove("hidden");
                videoSource.src = currentItem.src || currentItem;
                video.load();
                
                video.classList.add('video-playing');
                
                if (isMobile) {
                    video.setAttribute('playsinline', 'true');
                    video.setAttribute('webkit-playsinline', 'true');
                    video.setAttribute('controls', 'true');
                }
                
                video.play().catch(e => {
                    console.log("Автовоспроизведение заблокировано");
                });
            }, 50);
        } else {
            video.classList.remove('video-playing');
            video.classList.add("hidden");
            video.pause();
            videoSource.src = "";
            
            setTimeout(() => {
                img.classList.remove("hidden");
                img.src = currentItem.src || currentItem;
                img.alt = `Фото ${idx + 1} из ${items.length}`;
            }, 50);
        }
    }
    
    // Показ элемента с анимацией
    function showItemWithAnimation() {
        if (isAnimating) return;
        isAnimating = true;
        
        content.style.opacity = "0";
        
        setTimeout(() => {
            showItem();
            
            setTimeout(() => {
                content.style.opacity = "1";
                isAnimating = false;
            }, 100);
        }, 200);
    }

    // Обработчики свайпов для мобильных
    function handleTouchStart(e) {
        if (!isMobile) return;
        
        const touch = e.changedTouches[0];
        touchStartX = touch.screenX;
        touchStartY = touch.screenY;
        isSwiping = false;
        
        swipeStartElement = e.target;
        
        if (isInsideVideoControls(swipeStartElement)) {
            touchStartX = 0;
            touchStartY = 0;
        }
    }
    
    function handleTouchMove(e) {
        if (!isMobile || !touchStartX || isAnimating) return;
        
        const touch = e.changedTouches[0];
        const deltaX = Math.abs(touch.screenX - touchStartX);
        const deltaY = Math.abs(touch.screenY - touchStartY);
        
        if (deltaX > 10 && deltaX > deltaY) {
            isSwiping = true;
            e.preventDefault();
        }
    }
    
    function handleTouchEnd(e) {
        if (!isMobile || !touchStartX || isAnimating) return;
        
        const touch = e.changedTouches[0];
        touchEndX = touch.screenX;
        touchEndY = touch.screenY;
        
        if (isSwiping) {
            if (swipeStartElement && isInsideVideoControls(swipeStartElement)) {
                // Игнорируем свайпы внутри контролов видео
            } else {
                const minSwipeDistance = 50;
                const distanceX = touchStartX - touchEndX;
                
                if (Math.abs(distanceX) >= minSwipeDistance) {
                    if (distanceX > 0) {
                        next();
                    } else {
                        prev();
                    }
                }
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
        touchEndX = 0;
        touchEndY = 0;
        isSwiping = false;
        swipeStartElement = null;
    }

    // Назначение обработчиков событий
    btnClose.addEventListener("click", close);
    btnPrev.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        prev();
    });
    btnNext.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        next();
    });
    
    root.addEventListener("click", (e) => {
        if (e.target === root) close();
    });
    
    root.addEventListener('touchstart', handleTouchStart, { passive: true });
    root.addEventListener('touchmove', handleTouchMove, { passive: false });
    root.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Обработка клавиатуры
    document.addEventListener("keydown", (e) => {
        if (root.classList.contains("hidden")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    });
    
    video.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Настройка анимаций
    content.style.transition = "opacity 0.3s ease";
    content.style.opacity = "1";
    
    return { open, close };
})();

/* =========================================== */
/* КЛАСС СЛАЙДЕРА                             */
/* Управление слайдерами с фото и видео       */
/* =========================================== */
class ImprovedSlider {
    constructor(photos, videos, mount) {
        this.photos = photos || [];
        this.videos = videos || [];
        this.allItems = [
            ...this.photos.map(srcArray => ({ 
                src: srcArray[0],
                backupSrc: srcArray[1],
                type: "image",
                loaded: false,
                loadingAttempts: 0,
                currentSrc: srcArray[0],
                naturalWidth: 0,
                naturalHeight: 0
            })),
            ...this.videos.map(srcArray => ({ 
                src: srcArray[0],
                backupSrc: srcArray[1],
                type: "video",
                loaded: false,
                loadingAttempts: 0,
                currentSrc: srcArray[0],
                naturalWidth: 0,
                naturalHeight: 0
            }))
        ];
        
        this.mount = mount;
        this.current = 0;
        this.isAnimating = false;
        this.loadedCount = 0;
        this.totalToLoad = this.allItems.length;
        this.isMobile = window.innerWidth <= 768;
        this.direction = 'right';
        this.errorCount = 0;
        
        this.sliderWrapper = null;
        this.maxCalculatedHeight = 0;
        this.slideDimensions = [];
        this.isDesktop = !this.isMobile;
        
        this.nextSlideHeight = null;
        this.isHeightTransitioning = false;
        
        this.init();
    }

    // Инициализация слайдера
    init() {
        this.createSliderStructure();
        this.buildSlides();
        this.startLoading();
        
        // Обработчик ресайза
        window.addEventListener('resize', debounce(() => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            this.isDesktop = !this.isMobile;
            
            if (wasMobile !== this.isMobile) {
                this.updateSliderForMobile();
                if (this.isDesktop && this.maxCalculatedHeight > 0) {
                    this.updateSliderHeight();
                }
            } else if (this.isDesktop) {
                this.calculateSliderHeight();
                this.updateSliderHeight();
            }
        }, 250));
        
        this.updateSliderForMobile();
        this.bindEvents();
        this.setupIntersectionObserver();
    }

    // Создание структуры слайдера
    createSliderStructure() {
        this.sliderWrapper = el("div", "slider-wrapper");
        
        const viewport = el("div", "slider-viewport");
        this.track = el("div", "track");
        viewport.appendChild(this.track);
        this.sliderWrapper.appendChild(viewport);
        
        this.prevBtn = el("button", "slider-button prev");
        this.prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        this.prevBtn.setAttribute("aria-label", "Предыдущее фото");
        
        this.nextBtn = el("button", "slider-button next");
        this.nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        this.nextBtn.setAttribute("aria-label", "Следующее фото");
        
        this.sliderWrapper.appendChild(this.prevBtn);
        this.sliderWrapper.appendChild(this.nextBtn);
        
        this.mount.appendChild(this.sliderWrapper);
        this.slides = [];
    }

    // Построение слайдов
    buildSlides() {
        this.track.innerHTML = "";
        this.allItems.forEach((item, i) => {
            const slide = el("div", "slide");
            
            const mediaWrapper = el("div", "media-wrapper");
            const mediaContainer = el("div", "media-container");
            
            if (item.type === "video") {
                const video = el("video");
                video.controls = true;
                video.setAttribute("playsinline", "true");
                video.setAttribute("webkit-playsinline", "true");
                video.setAttribute("preload", "metadata");
                video.setAttribute("aria-label", `Видео ${i + 1} из ${this.allItems.length}`);
                video.src = item.src;
                
                // Регистрация в AudioManager
                AudioManager.register(video);
                
                mediaContainer.appendChild(video);
                
                video.addEventListener('loadeddata', () => {
                    this.removeErrorMessage(i);
                });
                
                video.addEventListener('error', () => {
                    if (!item.loaded) {
                        this.showError(i, item.type);
                    }
                });
            } else {
                const img = el("img");
                img.loading = "lazy";
                img.setAttribute("alt", `Фото ${i + 1} из ${this.allItems.length}`);
                img.src = item.src;
                
                mediaContainer.appendChild(img);
                
                img.addEventListener('load', () => {
                    this.removeErrorMessage(i);
                });
                
                img.addEventListener('error', () => {
                    if (!item.loaded) {
                        this.showError(i, item.type);
                    }
                });
            }
            
            const slideNumber = el("div", "slide-number", `${i + 1}/${this.allItems.length}`);
            mediaContainer.appendChild(slideNumber);
            
            mediaWrapper.appendChild(mediaContainer);
            slide.appendChild(mediaWrapper);
            this.slides.push(slide);
            this.track.appendChild(slide);
        });
    }

    // Начало загрузки медиа
    async startLoading() {
        const loadPromises = this.allItems.map((item, index) => 
            this.loadMediaItem(item, index)
        );
        
        try {
            await Promise.allSettled(loadPromises);
            
            if (this.isDesktop) {
                this.calculateSliderHeight();
                this.updateSliderHeight();
            } else {
                this.setInitialMobileHeight();
            }
            
            this.update();
            
            mediaLoader.incrementLoadedSliders();
        } catch (error) {
            console.error('Ошибка при загрузке слайдера:', error);
        }
    }

    // Загрузка одного медиа-элемента
    async loadMediaItem(item, index) {
        let currentUrl = item.src;
        let attempts = 0;
        const maxAttemptsPerUrl = 5;
        
        while (attempts < 9999) {
            attempts++;
            item.loadingAttempts = attempts;
            
            try {
                if (item.type === "image") {
                    await this.loadImage(currentUrl, index);
                } else {
                    await this.loadVideo(currentUrl, index);
                }
                
                item.loaded = true;
                item.currentSrc = currentUrl;
                this.loadedCount++;
                
                this.removeErrorMessage(index);
                return true;
                
            } catch (error) {
                if (item.backupSrc && currentUrl === item.src && attempts >= maxAttemptsPerUrl) {
                    currentUrl = item.backupSrc;
                    attempts = 0;
                    continue;
                }
                
                if (attempts === 1 || attempts % 10 === 0) {
                    this.showError(index, item.type);
                }
                
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.min(attempts, 5)));
                continue;
            }
        }
        
        this.errorCount++;
        this.loadedCount++;
        return false;
    }

    // Удаление сообщения об ошибке
    removeErrorMessage(index) {
        const slide = this.slides[index];
        if (!slide) return;
        
        const errorMsg = slide.querySelector(".load-error");
        if (errorMsg) {
            errorMsg.remove();
        }
        
        const mediaElement = slide.querySelector("img, video");
        if (mediaElement) {
            mediaElement.style.display = 'block';
        }
    }

    // Показ сообщения об ошибке
    showError(index, type) {
        const slide = this.slides[index];
        if (!slide) return;
        
        const mediaElement = slide.querySelector(type === "image" ? "img" : "video");
        if (mediaElement) {
            mediaElement.style.display = 'none';
        }
        
        const existingError = slide.querySelector('.load-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorMsg = el("div", "load-error", `❌ ${type === "image" ? "Фото" : "Видео"} не загружено`);
        errorMsg.style.color = '#ff6b6b';
        errorMsg.style.padding = '20px';
        errorMsg.style.textAlign = 'center';
        errorMsg.style.fontSize = '16px';
        slide.appendChild(errorMsg);
    }

    // Загрузка изображения
    async loadImage(url, index) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                this.allItems[index].naturalWidth = img.naturalWidth;
                this.allItems[index].naturalHeight = img.naturalHeight;
                resolve(img);
            };
            
            img.onerror = () => {
                reject(new Error(`Failed to load image: ${url}`));
            };
            
            img.src = url;
            
            setTimeout(() => {
                if (!img.complete) {
                    reject(new Error(`Image loading timeout: ${url}`));
                }
            }, 30000);
        });
    }

    // Загрузка видео
    async loadVideo(url, index) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            let loaded = false;
            
            const cleanup = () => {
                video.removeEventListener('loadedmetadata', onLoad);
                video.removeEventListener('error', onError);
            };
            
            const onLoad = () => {
                if (!loaded) {
                    loaded = true;
                    this.allItems[index].naturalWidth = video.videoWidth;
                    this.allItems[index].naturalHeight = video.videoHeight;
                    cleanup();
                    resolve(video);
                }
            };
            
            const onError = () => {
                if (!loaded) {
                    loaded = true;
                    cleanup();
                    reject(new Error(`Failed to load video: ${url}`));
                }
            };
            
            video.addEventListener('loadedmetadata', onLoad);
            video.addEventListener('error', onError);
            
            video.src = url;
            
            setTimeout(() => {
                if (!loaded) {
                    loaded = true;
                    cleanup();
                    reject(new Error(`Video loading timeout: ${url}`));
                }
            }, 30000);
        });
    }

    // Расчет высоты слайдера для десктопа
    calculateSliderHeight() {
        if (this.isMobile) return;
        
        const wrapperWidth = this.sliderWrapper.clientWidth;
        const maxDisplayWidth = wrapperWidth * 0.92;
        
        this.maxCalculatedHeight = 0;
        this.slideDimensions = [];
        
        for (let i = 0; i < this.allItems.length; i++) {
            const item = this.allItems[i];
            let displayWidth, displayHeight;
            
            if (!item.loaded) {
                displayWidth = maxDisplayWidth;
                displayHeight = 350;
            } else {
                const naturalWidth = item.naturalWidth;
                const naturalHeight = item.naturalHeight;
                
                if (naturalWidth === 0 || naturalHeight === 0) {
                    displayWidth = maxDisplayWidth;
                    displayHeight = 350;
                } else {
                    const ratio = naturalHeight / naturalWidth;
                    displayWidth = maxDisplayWidth;
                    displayHeight = displayWidth * ratio;
                    
                    const maxAllowedHeight = window.innerHeight * 0.6;
                    if (displayHeight > maxAllowedHeight) {
                        displayHeight = maxAllowedHeight;
                        displayWidth = displayHeight / ratio;
                    }
                    
                    const minHeight = 350;
                    const maxHeight = 700;
                    displayHeight = Math.max(displayHeight, minHeight);
                    displayHeight = Math.min(displayHeight, maxHeight);
                }
            }
            
            this.slideDimensions[i] = {
                width: displayWidth,
                height: displayHeight
            };
            
            const totalHeight = displayHeight + 32 + 40;
            if (totalHeight > this.maxCalculatedHeight) {
                this.maxCalculatedHeight = totalHeight;
            }
        }
        
        if (this.maxCalculatedHeight === 0) {
            this.maxCalculatedHeight = 400;
        }
    }

    // Обновление высоты слайдера
    updateSliderHeight() {
        if (this.isMobile) {
            this.sliderWrapper.style.height = 'auto';
            return;
        }
        
        if (this.maxCalculatedHeight > 0) {
            this.sliderWrapper.style.height = `${this.maxCalculatedHeight}px`;
            
            for (let i = 0; i < this.slides.length; i++) {
                const slide = this.slides[i];
                const mediaContainer = slide.querySelector('.media-container');
                if (mediaContainer && this.slideDimensions[i]) {
                    const dims = this.slideDimensions[i];
                    mediaContainer.style.width = `${dims.width}px`;
                    mediaContainer.style.height = `${dims.height}px`;
                }
            }
        }
    }

    // Установка начальной высоты для мобильных
    setInitialMobileHeight() {
        if (!this.isMobile) return;
        
        const currentItem = this.allItems[this.current];
        if (currentItem && currentItem.loaded) {
            const wrapperWidth = this.sliderWrapper.clientWidth || window.innerWidth * 0.9;
            const naturalWidth = currentItem.naturalWidth || wrapperWidth;
            const naturalHeight = currentItem.naturalHeight || naturalWidth * 0.75;
            
            const ratio = naturalHeight / naturalWidth;
            let displayHeight = wrapperWidth * 0.9 * ratio;
            
            const minHeight = 300;
            const maxHeight = window.innerHeight * 0.7;
            displayHeight = Math.max(displayHeight, minHeight);
            displayHeight = Math.min(displayHeight, maxHeight);
            
            this.sliderWrapper.style.height = `${displayHeight}px`;
        }
    }

    // Расчет высоты следующего слайда для мобильных
    calculateNextSlideHeight(index) {
        if (!this.isMobile) return null;
        
        const item = this.allItems[index];
        if (!item || !item.loaded) {
            return 300;
        }
        
        const wrapperWidth = this.sliderWrapper.clientWidth || window.innerWidth * 0.9;
        const naturalWidth = item.naturalWidth || wrapperWidth;
        const naturalHeight = item.naturalHeight || naturalWidth * 0.75;
        
        const ratio = naturalHeight / naturalWidth;
        let displayHeight = wrapperWidth * 0.9 * ratio;
        
        const minHeight = 300;
        const maxHeight = window.innerHeight * 0.7;
        displayHeight = Math.max(displayHeight, minHeight);
        displayHeight = Math.min(displayHeight, maxHeight);
        
        return displayHeight;
    }

    // Обновление слайдера для мобильных устройств
    updateSliderForMobile() {
        if (this.isMobile) {
            this.sliderWrapper.style.border = 'none';
            this.sliderWrapper.style.background = 'transparent';
            this.sliderWrapper.style.boxShadow = 'none';
            this.sliderWrapper.style.padding = '0';
            this.sliderWrapper.style.borderRadius = '0';
            this.sliderWrapper.style.height = 'auto';
            this.sliderWrapper.style.maxHeight = '70vh';
            
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
            
            this.addSwipeSupport();
            
            setTimeout(() => {
                this.setInitialMobileHeight();
            }, 100);
        } else {
            this.sliderWrapper.style.border = '2px solid rgba(255, 228, 240, 0.35)';
            this.sliderWrapper.style.background = '#181818';
            this.sliderWrapper.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
            this.sliderWrapper.style.padding = '16px';
            this.sliderWrapper.style.borderRadius = '18px';
            this.sliderWrapper.style.overflow = 'visible';
            
            this.prevBtn.style.display = 'flex';
            this.nextBtn.style.display = 'flex';
            this.prevBtn.style.left = '-80px';
            this.nextBtn.style.right = '-80px';
            
            this.calculateSliderHeight();
            this.updateSliderHeight();
        }
    }

    // Добавление поддержки свайпов для мобильных
    addSwipeSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const handleTouchStart = (e) => {
            touchStartX = e.changedTouches[0].screenX;
        };
        
        const handleTouchEnd = (e) => {
            if (this.isAnimating) return;
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        };
        
        const handleSwipe = () => {
            const minSwipeDistance = 50;
            const distance = touchStartX - touchEndX;
            
            if (Math.abs(distance) < minSwipeDistance) return;
            
            if (distance > 0) {
                this.direction = 'right';
                this.goTo((this.current + 1) % this.allItems.length);
            } else {
                this.direction = 'left';
                this.goTo((this.current - 1 + this.allItems.length) % this.allItems.length);
            }
        };
        
        this.track.addEventListener('touchstart', handleTouchStart, { passive: true });
        this.track.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    // Назначение обработчиков событий
    bindEvents() {
        this.prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.isAnimating) return;
            this.direction = 'left';
            this.goTo((this.current - 1 + this.allItems.length) % this.allItems.length);
        });
        
        this.nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.isAnimating) return;
            this.direction = 'right';
            this.goTo((this.current + 1) % this.allItems.length);
        });
        
        // Открытие лайтбокса при клике на слайд
        this.track.addEventListener("click", (e) => {
            const target = e.target;
            
            if (target.tagName === 'VIDEO' || target.closest('video')) {
                return;
            }
            
            if (target.classList.contains('slider-button') || 
                target.closest('.slider-button') ||
                target.classList.contains('slide-number') ||
                target.closest('.slide-number')) {
                return;
            }
            
            const slide = target.closest(".slide");
            if (!slide) return;
            
            const idx = Array.from(this.slides).indexOf(slide);
            if (idx !== -1) {
                const lbItems = this.allItems.map(item => ({
                    src: item.src,
                    type: item.type
                })).filter(item => item.src);
                if (lbItems.length > 0) {
                    LB.open(lbItems, idx);
                }
            }
        });
    }

    // Переход к определенному слайду
    goTo(index) {
        if (this.isAnimating || index === this.current) return;
        
        this.isAnimating = true;
        const oldIndex = this.current;
        this.current = index;
        
        if (this.isMobile) {
            this.nextSlideHeight = this.calculateNextSlideHeight(index);
            this.isHeightTransitioning = true;
            
            this.sliderWrapper.style.transition = `opacity 0.4s ease, transform 0.4s ease, height 0.5s cubic-bezier(0.22, 0.9, 0.32, 1)`;
            
            if (this.nextSlideHeight) {
                this.sliderWrapper.style.height = `${this.nextSlideHeight}px`;
            }
        }
        
        this.slides[oldIndex].classList.remove("active");
        
        if (this.direction === 'right') {
            this.slides[oldIndex].classList.remove("exit-left");
            this.slides[oldIndex].classList.add("exit-right");
        } else {
            this.slides[oldIndex].classList.remove("exit-right");
            this.slides[oldIndex].classList.add("exit-left");
        }
        
        setTimeout(() => {
            this.slides[oldIndex].style.display = "none";
            this.slides[oldIndex].classList.remove("exit-right", "exit-left");
            
            this.slides[this.current].style.display = "flex";
            
            setTimeout(() => {
                this.slides[this.current].classList.add("active");
                this.isAnimating = false;
                
                if (this.isMobile) {
                    this.isHeightTransitioning = false;
                    this.nextSlideHeight = null;
                }
            }, 50);
        }, 300);
    }

    // Обновление состояния слайдера
    update() {
        this.slides.forEach((s, i) => {
            s.style.display = i === this.current ? "flex" : "none";
            if (i === this.current) {
                setTimeout(() => {
                    s.classList.add("active");
                }, 30);
            } else {
                s.classList.remove("active");
            }
        });
        
        this.sliderWrapper.classList.add('visible');
    }

    // Настройка Intersection Observer для анимации появления
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.sliderWrapper.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(this.sliderWrapper);
    }
}

/* =========================================== */
/* СИСТЕМА ЛЕТАЮЩИХ СЕРДЕЧЕК                  */
/* Создает анимированные сердечки в фоне      */
/* =========================================== */
function createHeartsSystem() {
    let heartCount = 0;
    const maxHearts = window.innerWidth <= 768 ? 15 : 10;
    
    const heartSVG = `<svg viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" fill="currentColor"/>
    </svg>`;
    
    function createHeart() {
        if (heartCount >= maxHearts) return;
        
        heartCount++;
        
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        const size = window.innerWidth <= 768 
            ? 15 + Math.random() * 15
            : 20 + Math.random() * 25;
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        const colors = [
            '#ff6bcb', '#ff8ac7', '#ffa8c3', '#ffc6bf', 
            '#ffe4f0', '#ffd1e0', '#ffb8d0', '#ff9fc0',
            '#ff6bd0', '#ff8ad0'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.color = color;
        
        const startX = Math.random() * window.innerWidth;
        
        const animations = ['floatHeart', 'floatHeart2', 'floatHeart3'];
        const animation = animations[Math.floor(Math.random() * animations.length)];
        
        const duration = window.innerWidth <= 768
            ? 4 + Math.random() * 4
            : 6 + Math.random() * 6;
        
        heart.style.position = 'fixed';
        heart.style.left = `${startX}px`;
        heart.style.top = `${window.innerHeight}px`;
        heart.style.zIndex = '1';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `${animation} ${duration}s linear forwards`;
        heart.style.opacity = '0';
        
        heart.innerHTML = heartSVG;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
                heartCount--;
            }
        }, duration * 1000);
    }
    
    // Создание начальных сердечек
    const initialHearts = window.innerWidth <= 768 ? 8 : 5;
    for (let i = 0; i < initialHearts; i++) {
        setTimeout(() => createHeart(), i * (window.innerWidth <= 768 ? 400 : 600));
    }
    
    // Интервал для создания новых сердечек
    const heartInterval = setInterval(() => {
        if (document.hidden) return;
        createHeart();
    }, window.innerWidth <= 768 ? 800 : 1200);
    
    window.heartInterval = heartInterval;
    
    // Перезапуск системы при изменении размера окна
    window.addEventListener('resize', () => {
        clearInterval(heartInterval);
        
        document.querySelectorAll('.heart').forEach(heart => {
            heart.remove();
        });
        
        setTimeout(createHeartsSystem, 100);
    });
}

/* =========================================== */
/* СКРОЛЛ-РЕВИЛ АНИМАЦИИ                     */
/* Анимация появления элементов при скролле   */
/* =========================================== */
function setupScrollReveal() {
    let ticking = false;
    
    function checkVisibility() {
        if (ticking) return;
        
        ticking = true;
        
        requestAnimationFrame(() => {
            const elements = document.querySelectorAll('.memory-section, .section-divider, .fade-in, .slider-wrapper');
            const windowHeight = window.innerHeight;
            
            const triggerPoint = windowHeight * 0.15;
            
            elements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                
                const isVisible = rect.top < windowHeight - triggerPoint;
                
                if (isVisible && !element.classList.contains('visible')) {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, Math.min(index * 30, 200));
                }
            });
            
            ticking = false;
        });
    }
    
    setTimeout(checkVisibility, 100);
    
    window.addEventListener('scroll', () => {
        checkVisibility();
    }, { passive: true });
    
    window.addEventListener('resize', checkVisibility, { passive: true });
    
    setInterval(checkVisibility, 300);
}

/* =========================================== */
/* МУЗЫКАЛЬНЫЙ ПЛЕЕР                         */
/* Управление фоновой музыкой                 */
/* =========================================== */
function setupMusicPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeSliderContainer = document.querySelector('.volume-slider-container');
    const closePlayerBtn = document.getElementById('closePlayerBtn');
    const musicPlayer = document.getElementById('musicPlayer');
    const miniPlayer = document.getElementById('miniPlayer');
    const miniPlayerBtn = document.getElementById('miniPlayerBtn');
    
    let isPlaying = false;
    let isMuted = false;
    let lastVolume = 0.3;
    let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // Исправление источников аудио
    const audioSources = audio.querySelectorAll('source');
    audioSources.forEach(source => {
        const originalSrc = source.src;
        if (originalSrc && !originalSrc.includes('http') && !originalSrc.startsWith('data:')) {
            const fixedSrc = originalSrc.startsWith('/') ? originalSrc.substring(1) : originalSrc;
            source.src = fixedSrc;
        }
    });
    
    // Перезагрузка аудио с исправленными источниками
    audio.load();
    audio.volume = lastVolume;
    
    // Проверка поддержки аудио
    function checkAudioSupport() {
        const canPlayMP3 = audio.canPlayType('audio/mp3');
        const canPlayOGG = audio.canPlayType('audio/ogg');
        
        if (!canPlayMP3 && !canPlayOGG) {
            musicPlayer.style.display = 'none';
            miniPlayer.style.display = 'none';
            return false;
        }
        return true;
    }
    
    // Обновление кнопки воспроизведения/паузы
    function updatePlayButton() {
        const icon = isPlaying ? 'fa-pause' : 'fa-play';
        playPauseBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    }
    
    // Обновление кнопки mute
    function updateMuteButton() {
        let icon;
        if (isMuted) {
            icon = 'fa-volume-mute';
        } else {
            icon = 'fa-volume-up';
        }
        muteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    }
    
    // Переключение воспроизведения/паузы
    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.log("Автовоспроизведение заблокировано:", e);
                    
                    if (isIOS) {
                        console.log("На iOS требуется действие пользователя для запуска аудио");
                    }
                });
            }
            
            isPlaying = true;
        }
        updatePlayButton();
    }
    
    // Переключение mute
    function toggleMute() {
        if (isMuted) {
            audio.muted = false;
            isMuted = false;
            
            if (!isIOS) {
                audio.volume = lastVolume;
            }
        } else {
            audio.muted = true;
            isMuted = true;
            
            if (!isIOS) {
                lastVolume = audio.volume;
            }
        }
        
        updateMuteButton();
    }
    
    // Изменение громкости
    function changeVolume() {
        if (isIOS) return;
        
        const volume = parseFloat(volumeSlider.value);
        audio.volume = volume;
        lastVolume = volume;
        
        if (volume === 0) {
            isMuted = true;
        } else {
            isMuted = false;
        }
        
        updateMuteButton();
    }
    
    // Открытие плеера
    function togglePlayer() {
        if (musicPlayer.classList.contains('hidden')) {
            musicPlayer.classList.remove('hidden');
            miniPlayer.style.display = 'none';
            musicPlayer.style.animation = 'slideInUp 0.3s ease-out';
        }
    }
    
    // Закрытие плеера
    function closePlayer() {
        musicPlayer.style.opacity = '0';
        musicPlayer.style.transform = 'scale(0.9) translateY(20px)';
        musicPlayer.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        
        setTimeout(() => {
            musicPlayer.classList.add('hidden');
            musicPlayer.style.opacity = '1';
            musicPlayer.style.transform = 'scale(1) translateY(0)';
            musicPlayer.style.transition = '';
            miniPlayer.style.display = 'block';
        }, 250);
    }
    
    // Инициализация плеера
    if (checkAudioSupport()) {
        // Скрытие слайдера громкости на iOS
        if (isIOS) {
            if (volumeSliderContainer) {
                volumeSliderContainer.style.display = 'none';
            }
            if (volumeSlider) {
                volumeSlider.style.display = 'none';
            }
        }
        
        // Безопасные обработчики кликов для тач-устройств
        const addSafeClickListener = (element, handler) => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handler();
            });
            
            element.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handler();
            }, { passive: false });
        };
        
        addSafeClickListener(playPauseBtn, togglePlayPause);
        addSafeClickListener(muteBtn, toggleMute);
        addSafeClickListener(closePlayerBtn, closePlayer);
        addSafeClickListener(miniPlayerBtn, togglePlayer);
        
        if (!isIOS) {
            volumeSlider.addEventListener('input', changeVolume);
            volumeSlider.addEventListener('change', changeVolume);
        }
        
        // Обработчики событий аудио
        audio.addEventListener('play', () => {
            isPlaying = true;
            updatePlayButton();
        });
        
        audio.addEventListener('pause', () => {
            isPlaying = false;
            updatePlayButton();
        });
        
        audio.addEventListener('volumechange', () => {
            updateMuteButton();
        });
        
        audio.addEventListener('error', (e) => {
            console.error('Ошибка аудио:', e);
            const trackInfo = document.querySelector('.track-info');
            if (trackInfo) {
                trackInfo.innerHTML = '<div class="track-title" style="color:#ff6b6b">Музыка не загружена</div>';
            }
        });
        
        // Начальное состояние
        musicPlayer.classList.add('hidden');
        miniPlayer.style.display = 'block';
        
        // Автозапуск музыки (кроме iOS)
        setTimeout(() => {
            if (!isIOS) {
                audio.play().catch(e => {
                    console.log("Автовоспроизведение заблокировано, требуется действие пользователя");
                });
            }
        }, 2000);
        
        updatePlayButton();
        updateMuteButton();
    }
}

/* =========================================== */
/* РЕНДЕРИНГ СЕКЦИЙ                          */
/* Создание DOM-структуры для всех секций     */
/* =========================================== */
function renderSections() {
    const root = document.getElementById("sections");
    sectionsData.forEach((sec, idx) => {
        const section = el("section", "memory-section");
        const title = el("h3", "sparkle-title", sec.title);
        section.appendChild(title);
        
        const mount = el("div", "slider-mount");
        section.appendChild(mount);
        
        const textContainer = el("div", "section-text");
        if (sec.text && sec.text.length > 0) {
            sec.text.forEach(paragraph => {
                if (paragraph && paragraph.trim()) {
                    const p = el("p", "", paragraph);
                    textContainer.appendChild(p);
                }
            });
        }
        if (textContainer.children.length > 0) {
            section.appendChild(textContainer);
        }
        
        root.appendChild(section);
        new ImprovedSlider(sec.photos, sec.videos || [], mount);

        // Добавление разделителя между секциями
        if (idx !== sectionsData.length - 1) {
            const divider = el("div", "section-divider");
            root.appendChild(divider);
        }
    });
}

/* =========================================== */
/* ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ                   */
/* =========================================== */
window.addEventListener("DOMContentLoaded", () => {
    // Прокрутка в начало
    window.scrollTo(0, 0);
    
    // Предотвращение масштабирования на мобильных
    document.addEventListener('touchmove', function(e) {
        if(e.scale !== 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Предотвращение двойного тапа для масштабирования
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
    
    // Инициализация систем
    mediaLoader.initialize();
    renderSections();
    
    AudioManager.init();
    
    // Запуск загрузки медиа
    setTimeout(() => {
        mediaLoader.startLoading();
    }, 500);
});

// Очистка интервалов при закрытии страницы
window.addEventListener('beforeunload', () => {
    if (window.heartInterval) {
        clearInterval(window.heartInterval);
    }
});