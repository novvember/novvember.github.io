let xMax = 10;
let yMax = 10;

/* Нарисовать поле */
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
			html += ('<td id="' + person + j + i + '"></td>');
		}

		html += '</tr>';
	}

	/* Закрываем таблицу */ 
	html += '</tbody></table>';

	/* Вставляем в дом */
	parent.insertAdjacentHTML('afterbegin', html);
}

/* Разметить поле */
function markField (id, x, y, name) {
	drawBorders (person, 1, 1, 10, 10);

}

/* Обвести клетки границей */
function drawBorders (x0, y0, x1, y1) {
	let border = '2px solid black';

}