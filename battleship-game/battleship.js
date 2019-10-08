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
let maskPlayerFieldHits =[]; // Хранит выстрелы
generateClearMask (maskPlayerFieldHits, (xLength + 1), (yLength + 1));
let maskEnemyFieldHits =[];
generateClearMask (maskEnemyFieldHits, (xLength + 1), (yLength + 1));
let maskNewShip = []; // Временно хранит корабль
generateClearMask (maskNewShip, (xLength + 1), (yLength + 1));

let standardTimeout = 1000;
let shipsSetOk = false;

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

		document.querySelector('#playerField caption').innerHTML = 'Игрок';
		document.querySelector('#enemyField caption').innerHTML = 'Противник';
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
		drawShips (person, needMarginToDraw);
	}
	
	// Два трехпалубных
	for (let i = 0; i < 2; i++) {
		generateOneShip (person, 3);
		drawShips (person, needMarginToDraw);
	}

	// Три двухпалубных
	for (let i = 0; i < 3; i++) {
		generateOneShip (person, 2);
		drawShips (person, needMarginToDraw);
	}

	// Четыре однопалубных
	for (let i = 0; i < 4; i++) {
		generateOneShip (person, 1);
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
			document.getElementById(person + j + '-' + i).removeAttribute('class');
			if (maskShips [i][j] >= 1) {
				document.getElementById(person + j + '-' + i).classList.add ('ship');
			} else if ((maskShips [i][j] == 0.5) && (needMarginToDraw == true)) {
				document.getElementById(person + j + '-' + i).classList.add ('margin');
			}
		}
	}
}

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
	hide ('saveShipsButton');
	showText ('saveShipsButtonText', 'Сохранено!');

	// Убрать окно
	setTimeout (hide, standardTimeout, 'buidShipsDiv');

	// Запустить игру
	}
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
