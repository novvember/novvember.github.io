// Автоматическое выполнение построения при открытии страницы
let tickets = []; // Информация по параметрам всех билетов
let table = []; // Итоговая номограмма со стоимостями

let matrixTicketEd60Trip = []; // Единый 60 поездок

drawCells (); // Генерация поля
drawTicketTypesForm (); // Генерация типов билетов
generateTable (); // Составить номограмму и нарисовать ее


// Все возможные билеты с ид
function generateTickets () {
	// Формат: 0Название,	1ид,	2стоимость,	3дней действия,	4группа билетов для отображения, 5количество поездок

	// Единый1п
	tickets.push (['Единый 1 поездка', 'ed-1-trip', 55, 5, 'Единый на число поездок', 1]);
	// Единый2п
	tickets.push (['Единый 2 поездки', 'ed-2-trip', 110, 5, 'Единый на число поездок', 2]);
	// Единый60п
	tickets.push (['Единый 60 поездок', 'ed-60-trip', 1900, 45, 'Единый на число поездок', 60]);
	// Единый1д
	tickets.push (['Единый 1 сутки', 'ed-1-day', 230, 1, 'Единый на время', 999999]);
	// Единый3д
	tickets.push (['Единый 3 суток', 'ed-3-day', 438, 3, 'Единый на время', 999999]);
	// Единый30д
	tickets.push (['Единый 30 дней', 'ed-30-day', 2170, 30, 'Единый на время', 999999]);
	// Единый90д
	tickets.push (['Единый 90 дней', 'ed-90-day', 5430, 90, 'Единый на время', 999999]);
	// Единый365д
	tickets.push (['Единый 365 дней', 'ed-365-day', 19500, 365, 'Единый на время', 999999]);
	// ЕдиныйМесяц
	tickets.push (['Единый на календарный масяц', 'ed-1-month', 2770, 30, 'Единый на время', 999999]);
	// ТройкаМетро
	tickets.push (['Тройка (в метро)', 'troika-metro', 38, 1800, 'Карта Тройка', 1]);
	// ТройкаТАТ
	tickets.push (['Тройка (на ТАТ)', 'troika-tat', 38, 1800, 'Карта Тройка', 1]);
	// Тройка90минут
	tickets.push (['Тройка (пересадка 90 минут)', 'troika-90', 59, 1800, 'Карта Тройка', 1]);
	// Банковская карта
	tickets.push (['Банковская карта', 'bankcard', 42, 1800, '', 1]);
	// ТАТ 1
	tickets.push (['ТАТ 1 поездка', 'tat-1-trip', 45, 5, 'Билет ТАТ', 1]);
	// ТАТ 30д
	tickets.push (['ТАТ 30 дней', 'tat-30-day', 1140, 30, 'Билет ТАТ', 999999]);
}

// Генерация поля
function drawCells () {
	drawTableContainer ('table-container', 37, 37);
	drawTable ('table', 72, 72);
}

// Нарисовать двухмерную таблицу непосредственно с номограммой
function drawTable (id, x, y) {
	let parent = document.getElementById (id);
	let html ='';

	/* Начало таблицы */
	html += '<table><tbody>'

	/* Строки */
	for (let i = 0; i < y; i++) {
		html += '<tr>';

		/* Ячейки */ 
		for (let j = 0; j < x; j++) {
			html += ('<td id="' + j + '-' + i + '"></td>');
		}

		html += '</tr>';
	}

	// Закрываем таблицу
	html += '</tbody></table>';

	// Вставляем в дом
	parent.insertAdjacentHTML('afterbegin', html);
}

// Нарисовать обертку таблицы с нумерацией ячеек и названиями
function drawTableContainer (id, x, y) {
	let parent = document.getElementById (id);
	let html ='';

	/* Начало таблицы */
	html += '<table><tbody>'

	// Строка 0
	html += '<tr><td rowspan="38" id="tat-trip-label"><div>&#8592; Поездки на <strong>ТАТ</strong> в течение месяца</div></td><td colspan="37" id="metro-trip-label">Поездки на <strong>метро</strong> в течение месяца &#8594;</td></tr>';


	// Строка 1
	html += '<tr>';
	for (let i=0; i<x; i++) {
		if (i == 0) {
			html += ('<td></td>');
		} else {
			html += ('<td scope="col">' + (2*i-2) + '</td>');
		}
	}
	html += '</tr>';

	// Строка 2
	html += '<tr><td scope="row">0</td><td id="table" colspan="36" rowspan="36"></td>';

	// Остальные строки
	for (let i = 2; i < y; i++) {
		html += '<tr><td scope="row">' + (2*i-2) + '</td>';
	}

	// Закрываем таблицу
	html += '</tbody></table>';

	// Вставляем в дом
	parent.insertAdjacentHTML('afterbegin', html);

}

// Генерация списка возможных билетов
function drawTicketTypesForm () {
	generateTickets ();

	let parent = document.getElementById ('ticket-types');
	let html ='';

	// Каждый билет
	for (let i = 0; i < tickets.length; i++) {

		if (i == 0) {
			html +=
			'<div class="ticket-group">'
		} else if (tickets [i][4] != tickets [i-1][4]) {
			html +=
			'</div><div class="ticket-group">';
		}

		html +=
		'<div><input type="checkbox" checked id="' 
		+ tickets[i][1]
		+ '" name="'
		+ tickets[i][1]
		+'" value="'
		+ tickets[i][1]
		+ '" disabled><label for="'
		+ tickets[i][1]
		+ '">'
		+ tickets[i][0]
		+ ' <span class="price">'
		+ tickets[i][2]
		+ '&nbsp;&#8381;</span>'
		+ '</label></div>';

		if (i == (tickets.length - 1)) {
			html +=
			'</div>';
		}
	}

	// Вставляем в дом
	parent.insertAdjacentHTML('afterbegin', html);

}

// Создание пустого двухмерного массива нужного размера
function generateMatrix (array, maxX, maxY) {
	for (let i = 0; i <= maxY; i++) {
		array [i] = [];
		for (let j = 0; j <= maxX; j++) {
			array [i][j] = 99999;
		}
	}
}


function getTicketPar (ticketId, colNumber) {
	for (let i = 0; i < tickets.length; i++) {
		if (tickets [i][1] == ticketId) {
			return tickets [i][colNumber];
		}
	}
}




// Создание и рисование номограммы
function generateTable () {
	buildTable ();
	drawTableContent ();
}

// Расчет итоговой таблицы
function buildTable () {
	buildMatrixTicketEd60Trip ();

	generateMatrix (table, 71, 71);

	for (let tat = 0; tat < table.length; tat++) {
		for (let metro = 0; metro < table[0].length; metro++) {
			table [tat][metro] = Math.min (matrixTicketEd60Trip[tat][metro]);
		}
	}
}

// Вывод номограммы в таблицу
function drawTableContent () {
	for (let tat = 0; tat < table.length; tat++) {
		for (let metro = 0; metro < table[0].length; metro++) {
			document.getElementById(metro + '-' + tat).removeAttribute('class');
			if (table [tat][metro] == matrixTicketEd60Trip[tat][metro]) { // Условие для Единого60поездок
				document.getElementById(metro + '-' + tat).classList.add ('ed-60-trip');
				document.getElementById(metro + '-' + tat).title = matrixTicketEd60Trip[tat][metro].toFixed() + ' ₽';
			} 
		}
	}
}




// Единый 60 поездок
function buildMatrixTicketEd60Trip () {
	generateMatrix (matrixTicketEd60Trip, 71, 71); // Пустая матрица (значения 99999)

	let numberTrip = getTicketPar ('ed-60-trip', 5); // Количество поездок
	let duration = getTicketPar ('ed-60-trip', 3) / 30; // Срок действия билета, в месяцах
	let priceTicket = getTicketPar ('ed-60-trip', 2); // Стоимость билета
	let minTrips = numberTrip / duration; // Минимальное количество поездок, чтобы не сгорело
	let priceTrip = priceTicket / numberTrip; // Стоимость одной поездки

	for (let tat = 0; tat < matrixTicketEd60Trip.length; tat++) {
		for (let metro = 0; metro < matrixTicketEd60Trip[0].length; metro++) {
			if ((tat + metro) < minTrips) {
				matrixTicketEd60Trip[tat][metro] = priceTrip * minTrips;
			} else {
				matrixTicketEd60Trip[tat][metro] = priceTrip * (tat + metro);
			}
		}
	}
}
