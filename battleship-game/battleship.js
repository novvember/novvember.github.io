
let colorMarginBorder = '3px solid salmon';
let colorFieldBorder = '2px solid darkgrey';
let symbolsCol = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ы', 'э', 'ю', 'я'];
let symbolsRow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];


/* Нарисовать страницу */
function drawCells () {
	drawField ('playerField', 12, 12, 'player');
	drawField ('filler1', 1, 12, '');
	drawField ('enemyField', 12, 12, 'enemy');
	drawField ('filler2', 1, 12, '');
	drawField ('margin', 8, 12, 'margin');
}

/* Нарисовать одно поле */
function drawField (id, x, y, person) {
	let parent = document.getElementById (id);
	let html ='';

	/* Начало таблицы */
	html += '<table><caption>&nbsp;</caption><tbody>'

	/* Строки */
	for (i = 0; i < y; i++) {
		html += '<tr>';

		/* Ячейки */ 
		for (j = 0; j < x; j++) {
			html += ('<td id="' + person + j + '-' + i + '"></td>');
		}

		html += '</tr>';
	}

	/* Закрываем таблицу */ 
	html += '</tbody></table>';

	/* Вставляем в дом */
	parent.insertAdjacentHTML('afterbegin', html);
}

/* Разметить страницу */
function markField () {
	drawVerticalBorder ('margin', 3, 0, 3, 11, colorMarginBorder);

	drawBorders ('player', 1, 1, 10, 10, colorFieldBorder);
	drawBorders ('enemy', 1, 1, 10, 10, colorFieldBorder);

	drawCellNames ('player', symbolsCol, 1, 0, 10, 0);
	drawCellNames ('player', symbolsRow, 0, 1, 0, 10);
	drawCellNames ('enemy', symbolsCol, 1, 0, 10, 0);
	drawCellNames ('enemy', symbolsRow, 0, 1, 0, 10);

	document.querySelector('#playerField caption').innerHTML = 'Игрок';
	document.querySelector('#enemyField caption').innerHTML = 'Противник';
}

/* Обвести клетки границей */
function drawBorders (id, x0, y0, x1, y1, style) {
	for (i = x0; i <= x1; i++) {
		document.getElementById(id + i + '-' + y0).style.borderTop = style;
	}
	for (i = y0; i <= y1; i++) {
		document.getElementById(id + x1 + '-' + i).style.borderRight = style;
	}
	for (i = x0; i <= x1; i++) {
		document.getElementById(id + i + '-' + y1).style.borderBottom = style;
	}
	for (i = y0; i <= y1; i++) {
		document.getElementById(id + x0 + '-' + i).style.borderLeft = style;
	}
}

/* Нарисовать красное поле у края страницы */ 
function drawVerticalBorder (id, x0, y0, x1, y1, style) {
	for (i = y0; i <= y1; i++) {
		document.getElementById(id + x0 + '-' + i).style.borderRight = style;
	}
}

function drawCellNames (id, symbols, x0, y0, x1, y1) {
	/* Горизонтальная надпись */
	if (y0 == y1) {
		for (i = 0; i <= (x1 - x0); i++) {
			document.getElementById(id + (x0 + i) + '-' + y0).innerHTML = symbols [i];
		}
	} else if (x0 == x1) { /* Вертикальная надпись */
		for (i = 0; i <= (y1 - y0); i++) {
			document.getElementById(id + x0 + '-' + (y0 + i)).innerHTML = symbols [i];
		}
	}
	
}