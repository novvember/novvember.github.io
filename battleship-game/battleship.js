// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ

let xLength = 10;
let yLength = 10;

let colorMarginBorder = '3px solid salmon';
let colorFieldBorder = '2px solid darkgrey';

let symbolsCol = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ы', 'э', 'ю', 'я'];
let symbolsRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

let maskPlayerFieldShips = []; // Хранит корабли
generateClearMask (maskPlayerFieldShips, (xLength + 1), (yLength + 1));
let maskEnemyFieldShips = [];
generateClearMask (maskEnemyFieldShips, (xLength + 1), (yLength + 1));
let maskPlayerShots =[]; // Хранит выстрелы
generateClearMask (maskPlayerShots, (xLength + 1), (yLength + 1));
let maskEnemyShots =[];
generateClearMask (maskEnemyShots, (xLength + 1), (yLength + 1));
let maskNewShip = []; // Временно хранит создаваемый корабль
generateClearMask (maskNewShip, (xLength + 1), (yLength + 1));

let standardTimeout = 1000;
let shipsSetOk = false;

let currentTurn = ''; // Кто сейчас ходит
let currentEnemyMode = ['random']; // Режим хода компьютера









// НАЧАЛО ИГРЫ И РАЗМЕТКА

// Начать игру
function newGameButton () {

	// Строим поле
	drawCells (); // Поле из клеточек
	markField (); // Нанести разметку

	hide ('gamestart'); // Убрать кнопку новой игры

	// Переходим к следующему этапу (расстановка кораблей)
	setTimeout (showElement, standardTimeout, 'buidShipsDiv', 'block');
}



	// Нарисовать поле из клеточек
	function drawCells () {
		drawField ('playerField', 12, 12, 'player');
		drawField ('filler1', 1, 12, '');
		drawField ('enemyField', 11, 12, 'enemy');
		drawField ('filler2', 1, 12, '');
		drawField ('margin', 10, 12, 'margin');
	}



	// Нарисовать одно поле
	function drawField (id, x, y, person) {
		let parent = document.getElementById (id);
		let html ='';

		/* Начало таблицы */
		html += '<table><caption>&nbsp;</caption><tbody>'

		/* Строки */
		for (let i = 0; i < y; i++) {
			html += '<tr>';

			/* Ячейки */ 
			for (let j = 0; j < x; j++) {
				html += ('<td id="' + person + j + '-' + i + '"></td>');
			}

			html += '</tr>';
		}

		// Закрываем таблицу
		html += '</tbody></table>';

		// Вставляем в дом
		parent.insertAdjacentHTML('afterbegin', html);
	}



	// Разметить страницу
	function markField () {
		drawVerticalBorder ('margin', 5, 0, 5, 11, colorMarginBorder);

		drawBorders ('player', 1, 1, xLength, yLength, colorFieldBorder);
		drawBorders ('enemy', 1, 1, xLength, yLength, colorFieldBorder);

		drawCellNames ('player', symbolsCol, 1, 0, xLength, 0);
		drawCellNames ('player', symbolsRow, 0, 1, 0, yLength);
		drawCellNames ('enemy', symbolsCol, 1, 0, xLength, 0);
		drawCellNames ('enemy', symbolsRow, 0, 1, 0, yLength);

		document.querySelector('#playerField caption').innerHTML = '<span>Игрок</span>';
		document.querySelector('#enemyField caption').innerHTML = '<span>Противник</span>';
	}




	// Обвести клетки границей
	function drawBorders (id, x0, y0, x1, y1, style) {
		for (let i = x0; i <= x1; i++) {
			document.getElementById(id + i + '-' + y0).style.borderTop = style;
		}
		for (let i = y0; i <= y1; i++) {
			document.getElementById(id + x1 + '-' + i).style.borderRight = style;
		}
		for (let i = x0; i <= x1; i++) {
			document.getElementById(id + i + '-' + y1).style.borderBottom = style;
		}
		for (let i = y0; i <= y1; i++) {
			document.getElementById(id + x0 + '-' + i).style.borderLeft = style;
		}
	}



	// Нарисовать красное поле у края страницы
	function drawVerticalBorder (id, x0, y0, x1, y1, style) {
		for (let i = y0; i <= y1; i++) {
			document.getElementById(id + x0 + '-' + i).style.borderRight = style;
		}
	}



	// Добавить подписи столбцов и строчек
	function drawCellNames (id, symbols, x0, y0, x1, y1) {
		// Горизонтальная надпись
		if (y0 == y1) {
			for (let i = 0; i <= (x1 - x0); i++) {
				document.getElementById(id + (x0 + i) + '-' + y0).innerHTML = symbols [i];
			}
		} else if (x0 == x1) { // Вертикальная надпись
			for (let i = 0; i <= (y1 - y0); i++) {
				document.getElementById(id + x0 + '-' + (y0 + i)).innerHTML = symbols [i];
			}
		}
	}
























// ГЕНЕРАЦИЯ КОРАБЛЕЙ

// Расставить корабли в случайном порядке
function generateShips (person, needMarginToDraw) {
	
	// Очищаем поле кораблей
	let personShips;
	if (person == 'player') {
		personShips = maskPlayerFieldShips;
		shipsSetOk = true;
	} else if (person == 'enemy') {personShips = maskEnemyFieldShips};

	generateClearMask (personShips, (xLength + 1), (yLength + 1));

	// Один четурехпалубный
	for (let i = 0; i < 1; i++) {
		generateOneShip (person, 4);
	}
	
	// Два трехпалубных
	for (let i = 0; i < 2; i++) {
		generateOneShip (person, 3);
	}

	// Три двухпалубных
	for (let i = 0; i < 3; i++) {
		generateOneShip (person, 2);
	}

	// Четыре однопалубных
	for (let i = 0; i < 4; i++) {
		generateOneShip (person, 1);
	}

	if (person == 'player') {
		drawShips (person, needMarginToDraw);
	}
}



	// Создание одного корабля
	function generateOneShip (person, shipLength) {

		let maskShips;
		if (person == 'player') {maskShips = maskPlayerFieldShips}
			else if (person == 'enemy') {maskShips = maskEnemyFieldShips};
		
		let everythingOk = true;

		do {
			// Очищаем временное поле
			generateClearMask (maskNewShip, (xLength + 1), (yLength + 1));

			// Генерируем случайный корабль во временную маску
			addRandomShipToMask (shipLength, maskNewShip);

			everythingOk = true;

			// Проверяем помещается ли корабль в поле
			everythingOk = checkShipIsInside (maskNewShip);

			// Проверяем на пересечения с другими кораблями
			if (everythingOk == true) {
				everythingOk = checkShipNotCrossingOtherShips (maskNewShip, maskShips);
			}
			
		} while (everythingOk == false);

		// Добавляем корабль в массив
		for (let i = 0; i < maskShips.length; i++) {
			for (let j = 0; j < maskShips.length; j++) {
				if (maskShips [i][j] == maskNewShip [i][j]) {
					maskShips [i][j] = maskNewShip [i][j];
				} else {
					maskShips [i][j] += maskNewShip [i][j];
				}
			}
		}
	}



	// Генерируем случайный корабль во временную маску
	function addRandomShipToMask (shipLength, mask) {
		let startX = 0;
		let startY = 0;
		let x = 0;
		let y = 0;
		let startVector = 0;

		for (let i = 0; i < shipLength; i++) {
			if (i == 0) {
				startX = generateRandomNumber (1, xLength);
				startY = generateRandomNumber (1, yLength);
				startVector = generateRandomNumber (0, 1);
				if (startVector == 0) {
					startVector = [0, 1];
				} else {
					startVector = [1, 0];
				}
			}
			
			x = startX + startVector [0] * i;
			y = startY + startVector [1] * i;

			if ( (x > (xLength + 1)) || (y > (yLength + 1)) ) {
				break;
			} else {
				mask [y] [x] = shipLength;
				generateCellMargin (mask, x, y, 0.5);
			}
		}
	}


	// Проверяем помещается ли корабль в поле
	function checkShipIsInside (mask) {
		for (let i=0; i <= (yLength + 1); i++) {
			if ((mask [i] [0] >= 1) || (mask [i] [xLength + 1] >= 1)) {
				return false;
			}
		}
		for (let i=0; i <= (xLength + 1); i++) {
			if ((mask [0] [i] >= 1) || (mask [yLength + 1] [i] >= 1)) {
				return false;
			}
		}
		return true;
	}


	// Проверяем на пересечения с другими кораблями
	function checkShipNotCrossingOtherShips (maskNew, maskOther) {
		for (let i = 0; i < maskOther.length; i++) {
			for (let j = 0; j < maskOther.length; j++) {
				if ( (maskNew [i][j]>=1) && (maskOther [i][j]>=0.5) ) {
				return false;
				}
			}
		}
		return true;
	}


	// Добавить в матрицу клетки 0,5 вокруг корабля (по первой клетке)
	function generateCellMargin (field, x, y, value) {
		if ( (x > xLength) || (y > yLength) ) {
			return;
		}

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (field [y - 1 + j] [x - 1 + i] == 0) {
					field [y - 1 + j] [x - 1 + i] = value;
				}
			}
		}
	}

	// Нарисовать корабли из матрицы в нужное поле
	function drawShips (person, needMarginToDraw) {
		let maskShips;
		if (person == 'player') {maskShips = maskPlayerFieldShips}
			else if (person == 'enemy') {maskShips = maskEnemyFieldShips};

		for (let i = 1; i <= yLength; i++) {
			for (let j = 1; j <= xLength; j++) {
				// document.getElementById(person + j + '-' + i).removeAttribute('class');
				document.getElementById(person + j + '-' + i).classList.remove ('ship');
				document.getElementById(person + j + '-' + i).classList.remove ('margin');

				if (maskShips [i][j] >= 1) {
					document.getElementById(person + j + '-' + i).classList.add ('ship');
				} else if ((maskShips [i][j] == 0.5) && (needMarginToDraw == true)) {
					document.getElementById(person + j + '-' + i).classList.add ('margin');
				}
			}
		}
	}


























// СЛУЖЕБНЫЕ ФУНКЦИИ

// Создание пустого двухмерного массива нужного размера
function generateClearMask (array, maxX, maxY) {
	for (let i = 0; i <= maxY; i++) {
		array [i] = [];
		for (let j = 0; j <= maxX; j++) {
			array [i][j] = 0;
		}
	}
}

// Случайное целое число
function generateRandomNumber (min, max) {
	let rand = min + Math.random() * (max + 1 - min);
  	return Math.floor(rand);
}

function hide (id) {
	document.getElementById(id).style.display = 'none';
}

function showText (id, msg) {
	//document.getElementById(id).style.display = '';
	document.getElementById(id).innerHTML = msg;
}

function showElement (id, style) {
	document.getElementById(id).style.display = style;
}

function changeVisibility (id, param) {
	document.getElementById(id).style.visibility = param;
}























// ИНТЕРФЕЙС И КНОПКИ РАССТАНОВКИ КОРАБЛЕЙ


function saveShipsButton () {

	// Проверка правильности расстановки кораблей
	if (!shipsSetOk) {
		showText ('saveShipsButtonText', 'Что-то не так!');
		hide ('saveShipsButton');

		setTimeout (function () {
			showElement ('saveShipsButton', 'inline');
			showText ('saveShipsButtonText', '');
		}, standardTimeout);
		
	} else {
	
		// Вывести сообщение о сохранении
		changeVisibility ('generateShipsButton', 'hidden');
		changeVisibility ('buildOwnShipsButton', 'hidden');

		hide ('saveShipsButton');
		showText ('saveShipsButtonText', 'Сохранено!');

		// Убрать окно
		setTimeout (hide, standardTimeout, 'buidShipsDiv');

		// Запустить игру
		currentTurn = 'player';
		generateShips ('enemy');

		// Отрисовка интерфейса первого хода
		setTimeout (showGameMessages, standardTimeout, 'player', 'enemy');
	}
}


















function showGameMessages (personPlayer, personEnemy) {

	// Очистка декорации строки с именем
	document.querySelector('#playerField table caption span').classList.remove ('active');
	document.querySelector('#enemyField table caption span').classList.remove ('active');

	// Очистка содержания реплик
	document.querySelector('#playerMessage p.message').innerHTML = '';
	document.querySelector('#enemyMessage p.message').innerHTML = '';

	// Скрытие всех диалогов
	changeVisibility ('playerMessage', 'hidden');
	changeVisibility ('enemyMessage', 'hidden');


	// Подсветка имени игрока с ходом
	document.querySelector('#' + personPlayer + 'Field table caption span').classList.add ('active');

	// Показываем нижний блок
	changeVisibility (personEnemy + 'Message', 'visible');

}

function addLineToMessage (divMessage, person, text) {
	document.querySelector('#' + divMessage + ' p.message').insertAdjacentHTML('beforeend', 
		'<span class="' + person + '">' + text + '<span><br>'
		);
}





















// ОБРАБОТКА НАЖАТИЙ ПРИ ИГРЕ


// Обработчик нажатий на поле врага
document.getElementById('enemyField').addEventListener('click', e => getUserClick(e));



// Проверка клика, является ли выстрелом
function getUserClick (e) {
	if (currentTurn != 'player') return;

	// Получить координаты клика
	let x = getXYFromId (e.target.id) [0];
	let y = getXYFromId (e.target.id) [1];

	// Проверка клика на координаты
	if (checkClick(currentTurn, x, y)) {
		
		// Запустить отрисовку клетки выстрела
		drawShot (currentTurn, x, y);
	}
}



function getXYFromId (id) {
	let x = parseInt( id.slice (5, id.indexOf ('-') ) );
	let y = parseInt( id.slice (id.indexOf ('-') + 1) );
	return [x, y];
}

function checkClick (person, x, y) {

	if (checkXYIsInside (x,y) && checkXYNotRepeat (person, x,y)) {
		return true;
	} else {
		return false;
	}
}

function checkXYIsInside (x, y) {
	if ((x>=1) && (x<=10) && (y>=1) && (y<= 10)) {
		return true;
	} else {
		return false;
	}
}



function checkXYNotRepeat (person, x, y) {
	let shots;
	if (person == 'player') {shots = maskPlayerShots}
		else if (person == 'enemy') {shots = maskEnemyShots};

	if (shots [y][x] != 0) return false;

	return true;
}



// Отметить результат выстрела
function drawShot (person, x, y) {
	let ships;
	let shots;
	if (person == 'player') {
		ships = maskEnemyFieldShips;
		person = 'enemy';
		shots = maskPlayerShots;
	} else if (person == 'enemy') {
		ships = maskPlayerFieldShips;
		person = 'player';
		shots = maskEnemyShots;
	}

	// Реплика о выстреле
	addLineToMessage ((person + 'Message'), currentTurn, '— ' + symbolsCol[x-1] + ' ' + symbolsRow [y-1] + '!');
	
	// Отмечаем выстрел на карте выстрелов
	shots [y][x] = 1;

	setTimeout (function () {

		// Если промах
		if (ships [y][x] < 1) {
			// Рисуем точку
			document.getElementById(person + x + '-' + y).classList.add ('miss');
			
			ships [y][x] = 0.7; // Отмечаем выстрел на карте кораблей

			// Ответная реплика
			addLineToMessage ((person + 'Message'), person, '— ' + 'Мимо.<br>');

			// Смена хода
			setTimeout(changeTurn, standardTimeout);
		
		} else if (!checkShipKilled (ships, shots, x, y)) {

			// Если ранил
			document.getElementById(person + x + '-' + y).classList.add ('hit');
			document.getElementById(person + x + '-' + y).classList.add ('ship');

			// Изменить режим компьютера
			if (currentTurn == 'enemy') {
				if (currentEnemyMode[0] == 'random') {
					currentEnemyMode = ['guess', x, y];
				} else {
					currentEnemyMode [0] = 'trace';
					currentEnemyMode.push (x);
					currentEnemyMode.push (y);
				}
			}

			// Ответная реплика
			addLineToMessage ((person + 'Message'), person, '— ' + 'Попал!<br>');

			if (currentTurn == 'enemy') {
				setTimeout(getEnemyClick, standardTimeout);
			}

		} else {

			// Если убил

			document.getElementById(person + x + '-' + y).classList.add ('hit');
			document.getElementById(person + x + '-' + y).classList.add ('ship');

			// Рамка вокруг корабля
			drawMarginOfKilledShip (ships, x, y, person, shots);

			// Ответная реплика
			addLineToMessage ((person + 'Message'), person, '— ' + 'Убил!<br>');

			// Сбросить режим компьютера
			if (currentTurn == 'enemy') currentEnemyMode = ['random'];

			if (checkWin(ships, shots)) {
				alert (currentTurn + ' победил!')
				currentTurn = '';
			} else {
				if (currentTurn == 'enemy') {
					setTimeout(getEnemyClick, standardTimeout);
				}
			}
		}

	}, standardTimeout)
	
}



// Возвращает координаты первой клетки корабля (левый верхний угол)
function getFirstCellOfShip (mask, x, y) {

	let xi = x;
	let yi = y;

	do {
		x=xi;
		y=yi;

		xi = getPreviousCellOfShip (mask, x, y) [0];
		yi = getPreviousCellOfShip (mask, x, y) [1];
	} while ((xi != x) || (yi != y) );

	return [xi, yi];
}



// Проверяет убит ли корабль по координате выстрела
function checkShipKilled (maskShips, maskShots, x, y) {

	// Начало коробля
	let x0 = getFirstCellOfShip (maskShips, x, y) [0];
	let y0 = getFirstCellOfShip (maskShips, x, y) [1];

	do {
		x = x0;
		y = y0;

		if (maskShots [y][x] < 1) {
			return false;
		}

		x0 = getNextCellOfShip (maskShips, x, y) [0];
		y0 = getNextCellOfShip (maskShips, x, y) [1];
	} while ( (x != x0) || (y != y0) );

	return true;
}



// Возвращает координаты следующей клетки коробля (вправо-вниз)
function getNextCellOfShip (mask, x, y) {
	if (mask[y+1][x] >= 1) {
		y = y + 1;
	} else if (mask[y][x+1] >= 1) {
		x = x + 1;
	}
	return [x, y];
}



// Возвращает координаты предыдущей клетки коробля (влево-вверх)
function getPreviousCellOfShip (mask, x, y) {
	if (mask[y-1][x] >= 1) {
		y = y - 1;
	} else if (mask[y][x-1] >= 1) {
		x = x - 1;
	}
	return [x, y];
}


// Рисует пустые клетки при убийстве корабля
function drawMarginOfKilledShip (maskShips, x, y, person, maskShots) {

	// Начало коробля
	let x0 = getFirstCellOfShip (maskShips, x, y) [0];
	let y0 = getFirstCellOfShip (maskShips, x, y) [1];

	do {
		x = x0;
		y = y0;

		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if ((maskShips[y+i][x+j] <= 0.5) && checkXYIsInside (x+j, y+i)) {
					document.getElementById(person + (x+j) + '-' + (y+i)).classList.add ('margin');
					maskShots [y+i][x+j] = 0.5;
				}
			}
		}

		x0 = getNextCellOfShip (maskShips, x, y) [0];
		y0 = getNextCellOfShip (maskShips, x, y) [1];
	} while ( (x != x0) || (y != y0) );
}



function changeTurn (player) {
	
	let personEnemy ='';

	// Смена игрока
	if (currentTurn == 'player') {
		currentTurn = 'enemy';
	} else {
		currentTurn = 'player';
	}

	// Принудительный ход на нужного игрока, если явно указано
	if (player != undefined) {
		currentTurn = player;
	}

	// Назначаем противника
	if (currentTurn == 'player') {
		personEnemy = 'enemy';
	} else {
		personEnemy = 'player';
	}

	// показ интерфейса
	showGameMessages(currentTurn, personEnemy);


	// Запуск хода компьютера
	if (currentTurn == 'enemy') {
		setTimeout(getEnemyClick, standardTimeout);
	}
}

// Клик компьютера
function getEnemyClick () {

	let x = 0;
	let y = 0;

	let n = [0, 0]; // Длина вскрытого корабля для поиска

	do {

		if (currentEnemyMode [0] == 'random') {
			// Рандомные координаты
			x = generateRandomNumber (1, 10);
			y = generateRandomNumber (1, 10);

		} else if (currentEnemyMode [0] == 'guess') {

			// Поиск только что подбитого корабля (4 направления)
			x = generateRandomNumber (0, 1);

			if (x == 0) {
				x = currentEnemyMode [1];
			} else {
				x = currentEnemyMode [1] - 1 + 2*generateRandomNumber (0, 1);
			}
			
			if (x == currentEnemyMode [1]) {
				y = currentEnemyMode [2] - 1 + 2*generateRandomNumber (0, 1);
			} else {
				y = currentEnemyMode [2];
			}

		} else if (currentEnemyMode [0] == 'trace') {
			// Поиск уже не раз подбитого корабля (2 направления)
			
			// Длина вскрытого корабля
			n[0] = (currentEnemyMode.length - 1) / 2;

			if (currentEnemyMode[1] == currentEnemyMode [3]) {
				n[1] = [];

				for (let i = 0; i < n[0]; i++) {
					n[1].push(currentEnemyMode[2 + 2*i]);
				}

				x = currentEnemyMode[1];

				y = generateRandomNumber (0, 1);
				if (y == 0) {
					y = Math.min (...n[1]) - 1;
				} else {
					y = Math.max (...n[1]) + 1;
				}
			} else {
				n[1] = [];

				for (let i = 0; i < n[0]; i++) {
					n[1].push(currentEnemyMode[1 + 2*i]);
				}

				y = currentEnemyMode[2];

				x = generateRandomNumber (0, 1);
				if (x == 0) {
					x = Math.min (...n[1]) - 1;
				} else {
					x = Math.max (...n[1]) + 1;
				}
			}
		}

	} while (!checkClick(currentTurn, x, y));
	
	// Запустить отрисовку клетки выстрела
	drawShot (currentTurn, x, y);
	
}


// Проверка на победу (кончились все корабли)
function checkWin (maskShips, maskShots) {
	for (let i = 1; i < maskShips[0].length; i++) {
		for (let j = 1; j < maskShips.length; j++) {
			if ( (maskShips [i][j] >= 1) && (maskShots[i][j] == 0) ) {
				return false;
			}
		}
	}

	return true;
}