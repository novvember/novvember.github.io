// Переменные глобальные
		let cards = [];
		let bet = 0;
		let balance = 1000;
		let prize = 0;

		let dealerCards = [];
		let dealerText = 'Крупье: ';
		let dealerTextHide = 'Крупье: <span style="background: MediumSeaGreen; color: white;">&nbsp;?&nbsp;</span> ';
		let dealerScore = [0, 0, 0];

		let playerCards = [];
		let playerText = 'Игрок: ';
		let playerScore = [0, 0, 0]; // min, max, real

		function generateCards (numberOfPacks) { // Сгенерировать перемешанную последовательность карт нужного числа колод

			//Задаем, какие бывают карты
			let newCardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
			let newCardColors = ['♣', '♥', '♠', '♦'];

			let newCards = []; // Неперемешанные карты
			let mixedCards = []; // Перемешанные карты
			let numberOfCards = 0; // Число карт в колоде

			// Генерируем колоду карт
			for (i = 0; i < newCardValues.length; i++) {
				for (j=0; j < newCardColors.length; j++) {
					for (k=0; k < numberOfPacks; k++) {
						newCards.push ([newCardValues[i], newCardColors [j]]);
					}
				}
			}

			// Перемешиваем карты
			numberOfCards = newCards.length;
			let randomCard = 0;
			for (i=0; i < numberOfCards; i++) {
				randomCard = generateRandomNumber (0, newCards.length - 1);
				mixedCards.push (newCards [randomCard]);
				newCards.splice (randomCard, 1);
			}

			return mixedCards;
		}


		function generateRandomNumber (min, max) {
			return parseInt(min + Math.random() * (max + 1));
		}

		function classifyCards (cards) { // Дать значения картам, для туза два значения
			
			let score = [];
			let card ='';

			for (i = 0; i < cards.length; i++) {
				card = cards [i][0];

				// Значения очков для каждой карты (для туза два значения)
				if (card == '2') score = [2, 2];
				else if (card == '3') score = [3, 3];
				else if (card == '4') score = [4, 4];
				else if (card == '5') score = [5, 5];
				else if (card == '6') score = [6, 6];
				else if (card == '7') score = [7, 7];
				else if (card == '8') score = [8, 8];
				else if (card == '9') score = [9, 9];
				else if (card == '10') score = [10, 10];
				else if (card == 'J') score = [10, 10];
				else if (card == 'Q') score = [10, 10];
				else if (card == 'K') score = [10, 10];
				else if (card == 'A') score = [1, 11];

				// Добавляем очки к картам
				cards[i].push (score [0], score [1]);
			}
		}

		function makeBetButton () {

			// Принимаем ставку
			if (!readBet()) return;
			block ('bet');
			hide ('makeBet');

			showText ('textBet', 'Ставка сделана!');
			showButton ('getCards');
			prize = bet * (-1);
		}

		function getCardsButton () {
			hide ('textBet');
			hide ('getCards');

			// Создаем колоду карт
			cards = generateCards (1);
			classifyCards (cards);

			// Выдаем по две карты
			giveCards ('dealer', 2);
			giveCards ('player', 2);

			playerScore [2] = getScore (playerScore);

			// Если сразу блэкджек
			if (playerScore [2] == 21) {
				playerScore[2] = 1000; // 1000 - обозначение блэкджека
				whoWins ();
				return;
			}

			// Обычный розыгрыш
			showButton ('addButton');
			showButton ('stopButton');
		}

		function takeInsuranceButton () {
			prize = bet;
			hide ('stopButton');
			hide ('takeInsuranceButton');
			showText ('textPlayer', 'Вы забрали <b>досрочный выигрыш</b> 1:1 (' + prize + ' &#8381;), не открывая карты крупье.');
		}

		function getScore (personScore) {
			if (getMaxScore (personScore) > 21) {
				return getMinScore (personScore);
			} else {
				return getMaxScore (personScore);
			}
		}

		function addButton () {
			giveCards ('player', 1);

			// Считаем очки игрока после выдачи карты
			playerScore [2] = getScore (playerScore);

			whoWins ();
		}

		function stopButton () {
			hide ('takeInsuranceButton');
			hide ('addButton');
			hide ('stopButton');

			if ( playerScore[2] != 1000) {
			showText ('textPlayer', 'Число очков ' + playerScore[2] + '. Теперь очередь крупье.');
			}

			showButton ('dealerOpenButton');
		}

		function whoWins () {
			// Блэкджек у игрока
			if (playerScore [2] == 1000 && dealerScore [2] == 0) {
				if (dealerCards [1][3] == 10) { // У крупье может быть блекджек
					showText ('textPlayer', '<b>Блэкджек!</b> Ого! Но у крупье тоже может быть блэкджек.');
					showButton ('dealerOpenButton');
					return;
				} else if (dealerCards [1][3] == 11) { // У крупье открыт туз
					showText ('textPlayer', '<b>Блэкджек!</b> Ого! Но у крупье тоже возможен блэкджек. Можете взять обычный выигрыш 1:1 (вместо повышенного 3:2) либо продолжить и открыть карты крупье.');
					showButton ('stopButton');
					showButton ('takeInsuranceButton');
					return;
				} else {
					prize = bet *1.5;
					showText ('textPlayer', '<b>Блэкджек!</b> Ого! Ваш повышенный выигрыш 3:2 (' + prize + ' &#8381;)');
					return;
				}
			} else if (playerScore [2] == 1000 && dealerScore [2] == 21) {
				showText ('textDealer', 'У крупье тоже блэкджек. <b>Ничья!</b> Вы остаетесь при своей ставке.');
				prize = 0;
				hide ('dealerOpenButton');
				return;
			} else if (playerScore [2] == 1000 && dealerScore [2] < 21) {
				prize = bet * 1.5;
				showText ('textDealer', 'У крупье нет блэкджека, а у вас есть. <b>Ваш повышенный выигрыш</b> 3:2 (' + prize + ' &#8381)');
				hide ('dealerOpenButton');
				return;
			}

			// Перебор у игрока И крупье не открывался
			if (playerScore [2] > 21 && dealerScore [2] == 0) {
				prize = bet * (-1);
				hide ('stopButton');
				hide ('addButton');
				showText ('textPlayer', '<b>Много!</b> Число очков ' + getMinScore (playerScore) + '. <b>Вы проиграли</b> вашу ставку ' + prize + ' &#8381');
				return;
			}

			// Ровно 21 у игрока И крупье не открывался
			if (playerScore [2] == 21 && dealerScore [2] == 0) {
				hide ('addButton');
				hide ('stopButton');
				showText ('textPlayer', 'Число очков 21. Отлично! Теперь очередь крупье.');
				showButton ('dealerOpenButton');
				return;
			}
			
			// Если у крупье блэкджек
			if (dealerCards.length == 2 && getScore(dealerScore) == 21 && dealerScore [2] != 0) {
				prize = bet * (-1);
				showText ('textDealer', 'У крупье блэкджек! <b>Вы проиграли</b> ' + prize + ' &#8381');
				hide ('dealerOpenButton');
				return;
			}

			// Перебор у крупье
			if (dealerScore [2] > 21) {
				prize = bet;
				showText ('textDealer', '<b>Много!</b> Число очков ' + dealerScore [2] + '. <b>Вы выиграли.</b> Выигрыш 1:1 (' + prize + ' &#8381)');
				hide ('dealerNextButton');
				return;
			}

			// Крупье не набрал еще карт, победителя пока нет
			if (dealerScore [2] < 17) {
				return false; // Рано определять победителя
			}

			// Обычное определение победителя, у кого больше очков
			if (playerScore [2] > dealerScore [2]) {
				prize = bet;
				showText ('textDealer', 'Число очков ' + dealerScore [2] + '. <b>Вы выиграли!</b> Выигрыш 1:1 (' + prize + ' &#8381)');
				hide ('dealerOpenButton');
				hide ('dealerNextButton');
			} else if (playerScore [2] < dealerScore [2]) {
				prize = bet * (-1);
				showText ('textDealer', 'Число очков ' + dealerScore [2] + '. <b>Вы проиграли :(</b> и потеряли вашу ставку ' + prize + ' &#8381');
				hide ('dealerOpenButton');
				hide ('dealerNextButton');
			} else if (playerScore [2] == dealerScore [2]) {
				prize = 0;
				showText ('textDealer', 'Число очков ' + dealerScore [2] + '. <b>Ничья!</b> Вы остаетесь при своей ставке.');
				hide ('dealerOpenButton');
				hide ('dealerNextButton');
			}
		}


		function dealerOpenButton () {
			// Вскрытие карты крупье при первом вызове
			showText ('dealer', dealerText);
			dealerScore [2] = getScore (dealerScore);

			if (whoWins () == false) {
				showText ('textDealer', 'Число очков ' + dealerScore [2]);
				hide ('dealerOpenButton');
				showButton ('dealerNextButton');
			}
		}


		function dealerNextButton () {
			// Выдача карты крупье
			giveCards ('dealer', 1);
			dealerScore [2] = getScore (dealerScore);

			if (whoWins () == false) {
				showText ('textDealer', 'Число очков ' + dealerScore [2]);
				hide ('dealerOpenButton');
				showButton ('dealerNextButton');
			}
		}


		function newGameButton () {
			// Обновление баланса
			balance += prize;
			if (balance == 0) gameoverMessage ();
			
			// Сброс переменных
			cards = [];
			bet = 0;
			prize = 0;
			dealerCards = [];
			dealerText = 'Крупье: ';
			dealerTextHide = 'Крупье: <span style="background: MediumSeaGreen; color: white;">&nbsp;?&nbsp;</span> ';
			dealerScore = [0, 0, 0];
			playerCards = [];
			playerText = 'Игрок: ';
			playerScore = [0, 0, 0];

			// Обновление данных на странице
			showText ('balance', 'Деньги: ' + balance + ' &#8381;');
			showText ('dealer', dealerText);
			hide ('textDealer');
			unblock ('bet');
			hide ('textBet');
			showButton ('makeBet');
			showText ('player', playerText);
			hide ('textPlayer');
			hide ('getCards');
			hide ('takeInsuranceButton');
			hide ('addButton');
			hide ('stopButton');
			hide ('dealerOpenButton');
			hide ('dealerNextButton');
		}

		function gameoverMessage () {
			let quotes = [
			'Не во всякой игре тузы выигрывают.\nКозьма Прутков',
			'Страсть к игре - самая сильная из страстей.\nАлександр Пушкин',
			'Игра - наркотик. Азарт - игла.\nФольклор',
			'Игроку всего тяжелее перенести не то, что он проиграл, а то, что приходится прекращать игру.\nМадам де Сталь',
			'Умей поставить в радостной надежде на карту все, что накопил с трудом. И проиграть, и нищим стать, как прежде, И никогда не сожалеть о том...\nР.Кипплинг',
			'Игрок - это вор, который крадет, не рискуя попасть под суд.\nОксеншерна',
			'Игра - это бездонная пропасть.\nАнтуан Тома',
			'Нет человека, которому бы в жизненной лотерее доставались одни выигрыши.\nБолеслав Прус',
			'Там где правила игры не позволяют выиграть, английские джентльмены меняют правила.\nЛаски',
			'Нет человека, которому бы в жизненной лотерее доставались одни выигрыши.\nБолеслав Прус',
			'У картишки нет братишки.\nФольклор',
			'Не садись играть без царя в голове, и без туза в рукаве.\nЕвгений Кащеев',
			'Если играешь по всем правилам, выигрыш становится исключением.\nЕвгений Кащеев',
			'Выигравший никогда не скажет: "Это всего лишь игра".\nГлория Коупленд',
			'Любовь - это игра в карты, в которой блефуют оба: один, чтобы выиграть, другой, чтобы не проиграть.\nАнри Ренье',
			'Игра - это большой мешок обманов.\nЛоренс Оливье',
			'Помни: неважно, выиграешь ты или проиграешь; важно лишь, выиграю или проиграю я.\nДаррин Вейнберг',
			'-Верите ли вы в Бога? - спросил прокурор Нафтулу.\n-Пусть в Бога верит тот, кто выиграл двести тысяч, - ответил старик.\nИ. Бабель',
			'Величайшее искусство жизни заключается в том, чтобы ставить поменьше, а выиграть побольше.\nСэмюэл Джонсон',
			'Одно из величайших несчастий, которые могут случиться с человеком, - выигрыш на скачках в юные годы.\nДэнни Макгурти',
			'Лотерея - наиболее точный способ учета количества оптимистов.\nС. Обухов',
			'Все ожидают выигрыша в лотерее, даже те, кто не покупает лотерейных билетов.\nАнтоний Слонимский',
			'Признайся: ставя на красное и черное, ты все же не теряешь надежды выиграть на зеленое!\nСтанислав Ежи Лец',
			'Важно не то, проигрываем ли мы в игре, важно, как мы проигрываем и как мы благодаря этому изменимся, что нового вынесем для себя, как сможем применить это в других играх. Странным образом поражение оборачивается победой.\nРичард Бах',
			'Что ни толкуй Вольтер - или Декарт,\nМир для меня - колода карт,\nЖизнь - банк: рок мечет, я играю\nИ правила игры я к людям применяю.\nМихаил Лермонтов',
			'Взмахи рук банкомета, сдающего карты, возвратно-поступательные движения лопаточки крупье, сгребающего фишки, и встряхивание стаканчика с игральными костями, все это соответствует сублимации полового акта и мастурбации.\nЗигмунд Фрейд',
			'Нужно уметь и проигрывать. Иначе нельзя было бы жить.\nЭрих Мария Ремарк',
			'Не "очко" обычно губит, а к одинадцати туз.\nМихаил Круг',
			'Когда на руках выигрышные карты, следует играть честно.\nОскар Уайльд',
			'Карточная игра - явное обнаружение умственного банкротства. Не будучи в состоянии обмениваться мыслями, люди перебрасываются картами.\nШопенгауэр',
			'Игрок должен обладать выдержкой и при проигрыше не опрокидывать шахматной доски.\nРомен Роллан',
			'Бывает, что человек отлично тасует карты, а играть толком не умеет.\nФренсис Бэкон',
			'Что с религией, что с азартной игрой, получается одно и то же: начавши дураком, кончишь плутом.\nВольтер',
			'Начинают играть для развлечения, продолжают от скупости и кончают тем, что игра становится страстью.\nФрансуа Поль Брюэс',
			'Можно отрицать почти любую абстракцию: право, красоту, истину, добро, дух, Бога. Можно отрицать серьезность. Игру - нельзя.\nЙохан Хейзинга',
			'Кабы не покер, то жизнь ваша в Москве была бы совершенно несносна.\nМихаил Булгаков',
			'Равнодешен Господь, как крупье.\nЛюбовь Успенская',
			'Игра вообще нравится нам потому, что она распаляет нашу скупость, т. е. надежду иметь большее.\nМонтескье',
			'Меня возмущает, что колода карт плохо перетасована, но лишь до тех пор, пока мне не придёт хорошая карта.\nДжонатан Свифт',
			'Игроку-картёжнику тяжелее всего не проигрыш, а то, что нельзя продолжать игру.\nЖермена де Сталь',
			'Нет такой женщины, которая смогла бы ужиться с мужем-игроком, - если только он не выигрывает каждый вечер.\nТомас Дьюар',
			'И первый после Бога бывает четвёртым партнером в бридже.\nВладислав Катажиньский',
			'Судьба была к нему благосклонна, послав ему пять тузов.\nГарри Уилсон'
			]

			alert ('GAME OVER\n\n' + quotes [generateRandomNumber (0, quotes.length - 1)]);
		}

		function addCard (personCards) { // Берем карту
			personCards.push (cards.pop ());
		}

		function addText (personText, personCards) { // Обновляем текст с картами
			return personText += (personCards[personCards.length - 1][0] + personCards[personCards.length - 1][1] + ' ');
		}

		function addScore (personCards, personScore) { // Обновляем очки
			personScore [0] += personCards[personCards.length - 1][2];
			personScore [1] += personCards[personCards.length - 1][3];
		}

		function getMaxScore (personScore) {
			if (personScore [0] > personScore [1]) {
				return personScore [0];
			} else {
				return personScore [1];
			}
		}

		function getMinScore (personScore) {
			if (personScore [0] < personScore [1]) {
				return personScore [0];
			} else {
				return personScore [1];
			}
		}

		function giveCards (person, number) {
			if (person == 'dealer') {
				for (i = 0; i < number; i++) {
					addCard (dealerCards);
					dealerText = addText (dealerText, dealerCards);
					if (dealerCards.length != 1) {
						dealerTextHide = addText (dealerTextHide, dealerCards);
					}
					addScore (dealerCards, dealerScore);
				}
				
				//  Записываем текст
				if (dealerCards.length <= 2) {
					document.getElementById(person).innerHTML = dealerTextHide;
				} else {
					document.getElementById(person).innerHTML = dealerText;
				}
			}

			if (person == 'player') {
				for (i = 0; i < number; i++) {
					addCard (playerCards);
					playerText = addText (playerText, playerCards);
					addScore (playerCards, playerScore);
				}
				
				//  Записываем текст
				document.getElementById(person).innerHTML = playerText;
			}
		}


		function readBet () {

			// Читаем ставку
			bet = +document.getElementById('bet').value;

			// Проверяем ставку
			if (isNaN (bet) || bet <= 0 || bet > balance) {
				return false;
			}

			return true;
		}

		function block(id) {
			document.getElementById(id).readOnly = true;
		}

		function unblock (id) {
			document.getElementById(id).readOnly = false;
		}

		function hide (id) {
			document.getElementById(id).style.display = 'none';
		}

		function showText (id, msg) {
			document.getElementById(id).style.display = '';
			document.getElementById(id).innerHTML = msg;
		}

		function showButton (id, msg) {
			document.getElementById(id).style.display = '';
		}