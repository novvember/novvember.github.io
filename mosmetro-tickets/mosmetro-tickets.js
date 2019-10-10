let tickets = [];

drawField ('table', 71, 71);
drawTicketTypesForm ();


function generateTickets () {
	// Формат: Название / сокр / стоимость / дней действия / группа билетов для отображения

	// Единый1п
	tickets.push (['Единый 1 поездка', 'ed-1-trip', 55, 5, 'Единый на число поездок']);

	// Единый2п
	tickets.push (['Единый 2 поездки', 'ed-2-trip', 110, 5, 'Единый на число поездок']);

	// Единый60п
	tickets.push (['Единый 60 поездок', 'ed-60-trip', 1900, 45, 'Единый на число поездок']);

	// Единый1д
	tickets.push (['Единый 1 сутки', 'ed-1-day', 230, 1, 'Единый на время']);

	// Единый3д
	tickets.push (['Единый 3 суток', 'ed-3-day', 438, 3, 'Единый на время']);

	// Единый30д
	tickets.push (['Единый 30 дней', 'ed-30-day', 2170, 30, 'Единый на время']);

	// Единый90д
	tickets.push (['Единый 90 дней', 'ed-90-day', 5430, 90, 'Единый на время']);

	// Единый365д
	tickets.push (['Единый 365 дней', 'ed-365-day', 19500, 365, 'Единый на время']);

	// ЕдиныйМесяц
	tickets.push (['Единый на календарный масяц', 'ed-1-month', 2770, 30, 'Единый на время']);

	// ТройкаМетро
	tickets.push (['Тройка (в метро)', 'troika-metro', 38, 1800, 'Карта Тройка']);

	// ТройкаТАТ
	tickets.push (['Тройка (на ТАТ)', 'troika-tat', 38, 1800, 'Карта Тройка']);

	// Тройка90минут
	tickets.push (['Тройка (пересадка 90 минут)', 'troika-90', 59, 1800, 'Карта Тройка']);

	// Банковская карта
	tickets.push (['Банковская карта', 'bankcard', 42, 1800, '']);

	// ТАТ 1
	tickets.push (['ТАТ 1 поездка', 'tat-1-trip', 45, 5, 'Билет ТАТ']);

	// ТАТ 30д
	tickets.push (['ТАТ 30 дней', 'tat-30-day', 1140, 30, 'Билет ТАТ']);
}

// Нарисовать таблицу
function drawCells () {
	drawField ('table', 71, 71);
}

// Нарисовать двухмерную таблицу
function drawField (id, x, y) {
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
	parent.insertAdjacentHTML('beforeend', html);

}