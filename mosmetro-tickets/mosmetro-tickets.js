let month = 30; // Длина расчетного месяца 30 дней

// СПИСОК БИЛЕТОВ С ПАРАМЕТРАМИ
let tickets = []; // Информация по параметрам всех билетов
generateTickets ();

function generateTickets () {
	// Формат: 0Название,	1ид,	2стоимость,	3дней действия,	4группа билетов для отображения, 5количество поездок, 6checked, 7видимость, 8массив с полем

	// ОФИЦИАЛЬНЫЕ БИЛЕТЫ

		// Единые на количество поездок
		// Единый1п
		tickets.push (['Единый 1 поездка', 'ed-1-trip', 57, 5, 'Единый на число поездок', 1, 'checked', 'visible', [] ]);
		// Единый2п
		tickets.push (['Единый 2 поездки', 'ed-2-trip', 114, 5, 'Единый на число поездок', 2, 'checked', 'visible', [] ]);
		// Единый60п
		tickets.push (['Единый 60 поездок', 'ed-60-trip', 1970, 45, 'Единый на число поездок', 60, 'checked', 'visible', [] ]);

		// Безлимитные единые
		// Единый1д
		tickets.push (['Единый 1 сутки', 'ed-1-day', 230, 1, 'Единый на время', 999999, 'checked', 'visible', [] ]);
		// Единый3д
		tickets.push (['Единый 3 суток', 'ed-3-day', 438, 3, 'Единый на время', 999999, 'checked', 'visible', [] ]);
		// Единый30д
		tickets.push (['Единый 30 дней', 'ed-30-day', 2170, 30, 'Единый на время', 999999, 'checked', 'visible', [] ]);
		// Единый90д
		tickets.push (['Единый 90 дней', 'ed-90-day', 5430, 90, 'Единый на время', 999999, 'checked', 'visible', [] ]);
		// Единый365д
		tickets.push (['Единый 365 дней', 'ed-365-day', 19500, 365, 'Единый на время', 999999, 'checked', 'visible', [] ]);
		
		// ЕдиныйМесяц
		tickets.push (['Единый на календарный месяц', 'ed-1-month', 2900, 30, 'Единый на время', 999999, 'unchecked', 'visible', [] ]);

		// ТройкаМетро
		tickets.push (['Карта Тройка (метро)', 'troika-metro', 40, 1800, 'Карта Тройка', 1, 'checked', 'visible', [] ]);
		// ТройкаТАТ
		tickets.push (['Карта Тройка (ТАТ)', 'troika-tat', 40, 1800, 'Карта Тройка', 1, 'checked', 'visible', [] ]);

		// Тройка90минут
		tickets.push (['Тройка (пересадка 90 минут)', 'troika-90', 62, 1800, 'Карта Тройка', 1, 'unchecked', 'visible', [] ]);

		// Банковская карта
		tickets.push (['Банковская карта', 'bankcard', 44, 1800, '', 1, 'unchecked', 'visible', [] ]);

		// ТАТ 30д
		tickets.push (['ТАТ 30 дней', 'tat-30-day', 1180, 30, 'Билет ТАТ', 999999, 'checked', 'visible', [] ]);


	// СОЧЕТАНИЯ БИЛЕТОВ
		// Тройка Метро + ТАТ
		tickets.push (['Карта Тройка (метро + ТАТ)', 'troika', 40, 1800, 'Сочетания билетов', 1, 'checked', 'visible', [] ]);

		// ТАТ 30 дней + Тройка-метро
		tickets.push (['ТАТ 30 дней + Тройка (метро)', 'tat-30-day-troika', '', 30, 'Сочетания билетов', 999999, 'checked', 'visible', [] ]);

}



























// ПОЛЯ ВСЕХ БИЛЕТОВ И ИХ СОЧЕТАНИЙ
	
	// ОФИЦИАЛЬНЫЕ БИЛЕТЫ

		// Единый 60 поездок
		/*
		buildEd60Trip ('ed-60-trip');

		function buildEd60Trip (id) {
			
			generateMatrix (getTicketPar (id, 8), 71, 71);

			let numberOfTrips = getTicketPar (id, 5); // Количество поездок
			let durationOfTicket = getTicketPar (id, 3) / month; // Срок действия билета, в месяцах
			let priceOfTicket = getTicketPar (id, 2); // Стоимость билета
			let minNumberOfTrips = numberOfTrips / durationOfTicket; // Минимальное количество поездок, чтобы не сгорело
			let pricePerTrip = priceOfTicket / numberOfTrips; // Стоимость одной поездки

			for (let tat = 0; tat < getTicketPar (id, 8).length; tat++) {
				for (let metro = 0; metro < getTicketPar (id, 8)[0].length; metro++) {
					if ((tat + metro) < minNumberOfTrips) {
						getTicketPar (id, 8)[tat][metro] = pricePerTrip * minNumberOfTrips;
					} else {
						getTicketPar (id, 8)[tat][metro] = pricePerTrip * (tat + metro);
					}
				}
			}
		}
*/


		buildEdNTrip ('ed-60-trip');
		buildEdNTrip ('ed-1-trip');
		buildEdNTrip ('ed-2-trip');


		function buildEdNTrip (id) {

			generateMatrix (getTicketPar (id, 8), 71, 71);

			let numberOfTrips = getTicketPar (id, 5); // Количество поездок
			let durationOfTicket = getTicketPar (id, 3); // Срок действия билета, в днях
			let priceOfTicket = getTicketPar (id, 2); // Стоимость билета
			let pricePerTrip = priceOfTicket / numberOfTrips; // Стоимость одной поездки

			let tripTimes = [1]; // Время поездок
			let ticketTimes = []; // Время покупок билетов
			let n = 0; // Счетчик поездок
			let ticketQuantity; // Количество билетов
			let tripPeriod; // Период между поездками



			for (let tat = 0; tat < getTicketPar (id, 8).length; tat++) {
				for (let metro = 0; metro < getTicketPar (id, 8)[0].length; metro++) {

					// Сброс
					tripTimes = [1];
					ticketTimes = [1];
					n = 1;
					ticketQuantity = 0;
					tripPeriod = month / (tat + metro);

					// Время поездок
					for (i = 1; i < (tat + metro); i++) {
						tripTimes.push (tripTimes [tripTimes.length - 1] + tripPeriod );
					}

					// Время покупки билетов
					for (i = 1; i < tripTimes.length; i++) {

						// Если билет кончился по поездкам или по времени
						if (n >= numberOfTrips || (Math.floor (tripTimes[i]) - ticketTimes [tripTimes.length - 1]) >= durationOfTicket) {
							ticketTimes.push (Math.floor (tripTimes[i]));
							n = 1;

						// Если билет еще не кончился и еще можно сделать поездку
						} else {
							n++;
						}
					}

					// Сколько целых билетов
					ticketQuantity = ticketTimes.length - 1;

					// Дробная часть последнего билета
					// Если поездки не сгорят, то считаем по поездкам
					if (Math.ceil( ((ticketTimes [ticketTimes.length - 1] + durationOfTicket) - tripTimes [tripTimes.length - n]) / tripPeriod ) >= numberOfTrips) {
						ticketQuantity += n / numberOfTrips;

					// Если поездки сгорят, то считаем по длительности билета
					} else {
						ticketQuantity += (month - ticketTimes [ticketTimes.length - 1] + 1) / durationOfTicket;
					}
					
					// Общая стоимость составит
					getTicketPar (id, 8)[tat][metro] = ticketQuantity * priceOfTicket;
				}
			}
		}








		// Единые на время
		buildEdUnlim ('ed-1-day');
		buildEdUnlim ('ed-3-day');
		buildEdUnlim ('ed-30-day');
		buildEdUnlim ('ed-90-day');
		buildEdUnlim ('ed-365-day');

		function buildEdUnlim (id) {
			generateMatrix (getTicketPar (id, 8), 71, 71); // Пустая матрица (значения 99999)

			let duration = getTicketPar (id, 3) / month; // Срок действия билета, в месяцах
			let priceTicket = getTicketPar (id, 2); // Стоимость билета

			for (let tat = 0; tat < getTicketPar (id, 8).length; tat++) {
				for (let metro = 0; metro < getTicketPar (id, 8)[0].length; metro++) {
					getTicketPar (id, 8)[tat][metro] = priceTicket / duration;
				}
			}
		}


		// Карта Тройка на метро
		buildTroikaMetro ('troika-metro');

		function buildTroikaMetro (id) {
			generateMatrix (getTicketPar (id, 8), 71, 71);
			let priceTicket = getTicketPar (id, 2); // Стоимость билета

			for (let tat = 0; tat < 1; tat++) { // Без ТАТ
				for (let metro = 0; metro < getTicketPar (id, 8)[0].length; metro++) {
					getTicketPar (id, 8)[tat][metro] = priceTicket * metro;
				}
			}
		}


		// Карта Тройка на ТАТ
		buildTroikaTat ('troika-tat');

		function buildTroikaTat (id) {
			generateMatrix (getTicketPar (id, 8), 71, 71);
			let priceTicket = getTicketPar (id, 2); // Стоимость билета

			for (let tat = 0; tat < getTicketPar (id, 8).length; tat++) { 
				for (let metro = 0; metro < 1; metro++) { // Без Метро
					getTicketPar (id, 8)[tat][metro] = priceTicket * tat;
				}
			}
		}


		// ТАТ 30 дней
		buildTat30Day ('tat-30-day');

		function buildTat30Day (id) {
			generateMatrix (getTicketPar (id, 8), 71, 71); // Пустая матрица (значения 99999)

			let duration = getTicketPar (id, 3) / month; // Срок действия билета, в месяцах
			let priceTicket = getTicketPar (id, 2); // Стоимость билета

			for (let tat = 0; tat < getTicketPar (id, 8).length; tat++) {
				for (let metro = 0; metro < 1; metro++) { // Без метро
					getTicketPar (id, 8)[tat][metro] = priceTicket / duration;
				}
			}
		}









	// СОЧЕТАНИЯ БИЛЕТОВ

		// Карта Тройка на Метро + ТАТ
		buildTroika ('troika', 'troika-metro', 'troika-tat');

		function buildTroika (id, idMetro, idTat) {
			generateMatrix (getTicketPar (id, 8), 71, 71);

			for (let tat = 0; tat < getTicketPar (id, 8).length; tat++) { 
				for (let metro = 0; metro < getTicketPar (id, 8)[0].length; metro++) { // Без Метро
					getTicketPar (id, 8)[tat][metro] = getTicketPar (idMetro, 8)[0][metro] + getTicketPar (idTat, 8)[tat][0];
				}
			}
		}


		// ТАТ 30 дней + Тройка метро
		buildTat30DayTroika ('tat-30-day-troika', 'troika-metro', 'tat-30-day');

		function buildTat30DayTroika (id, idMetro, idTat) {
			generateMatrix (getTicketPar (id, 8), 71, 71);

			for (let tat = 0; tat < getTicketPar (id, 8).length; tat++) { 
				for (let metro = 0; metro < getTicketPar (id, 8)[0].length; metro++) { // Без Метро
					getTicketPar (id, 8)[tat][metro] = getTicketPar (idMetro, 8)[0][metro] + getTicketPar (idTat, 8)[tat][0];
				}
			}
		}





















// ИНТЕРФЕЙС

	// Генерация поля
	function drawCells () {
		drawTableContainer ('table-container', 37, 37);
		drawTable ('table', 72, 72);
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





	// Генерация списка возможных билетов
	function drawTicketTypesForm () {

		let parent = document.getElementById ('ticket-types');
		let html ='';
		let checked = '';

		// Каждый билет
		for (let i = 0; i < tickets.length; i++) {

			if (i == 0) {
				html +=
				'<div class="ticket-group">'
			} else if (tickets [i][4] != tickets [i-1][4]) {
				html +=
				'</div><div class="ticket-group">';
			}

			if (getTicketPar (tickets[i][1], 6) == 'checked') {
				checked = 'checked';
			} else {
				checked = ''
			}
			
			html +=
			'<div><input type="checkbox"' + checked + ' id="' 
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


	// Всплывающая подсказка в таблице
	function getTooltipText (metro, tat, ticket, price) {

	}


























// СЛУЖЕБНЫЕ ФУНКЦИИ

// Создание пустого двухмерного массива нужного размера
function generateMatrix (array, maxX, maxY) {
	for (let i = 0; i <= maxY; i++) {
		array [i] = [];
		for (let j = 0; j <= maxX; j++) {
			array [i][j] = 99999;
		}
	}
}

// Получение параметра билета по ид
function getTicketPar (ticketId, colNumber) {
	for (let i = 0; i < tickets.length; i++) {
		if (tickets [i][1] == ticketId) {
			return tickets [i][colNumber];
		}
	}
}




























// ИТОГОВЫЙ ГРАФИК

// Создание и рисование номограммы
function generateTable () {
	buildTable ();
	drawTableContent ();
}

// Расчет итоговой таблицы
let table = []; // Итоговая номограмма со стоимостями

function buildTable () {
	
	generateMatrix (table, 71, 71);

	let array = [];

	for (let tat = 0; tat < table.length; tat++) {
		for (let metro = 0; metro < table[0].length; metro++) {

			array = [];

			for (let i=0; i < tickets.length; i++) {
				if (tickets [i][6] == 'checked') {
					array.push (tickets[i][8][tat][metro]);
				}
			}

			table [tat][metro] = Math.min (...array);
		}
	}
}

// Вывод номограммы в таблицу
function drawTableContent () {
	for (let tat = 0; tat < table.length; tat++) {
		for (let metro = 0; metro < table[0].length; metro++) {
			
			document.getElementById(metro + '-' + tat).removeAttribute('class');

			for (let i=0; i < tickets.length; i++) {
				if (tickets [i][6] == 'checked') {
					if (table [tat][metro] == tickets[i][8][tat][metro]) {
						document.getElementById(metro + '-' + tat).classList.add (tickets[i][1]);
						break;
					}
				}
			}

			document.getElementById(metro + '-' + tat).title = table [tat][metro].toFixed() + ' ₽';
		}
	}

	document.getElementById('0-0').className = '';
}



























// Выполнение при загрузке

drawCells (); // Генерация поля
drawTicketTypesForm (); // Генерация типов билетов
generateTable (); // Составить номограмму и нарисовать ее