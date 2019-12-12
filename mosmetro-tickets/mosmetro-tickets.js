let month = 30; // Длина расчетного месяца 30 дней

// СПИСОК БИЛЕТОВ С ПАРАМЕТРАМИ
let ticketsParams = []; // Информация по параметрам всех билетов
generateTicketsParams ();

function generateTicketsParams () {
	// Формат: 0Название,	1ид,	2стоимость,	3дней действия,	4группа билетов для отображения, 5количество поездок, 6checked, 7видимость, 8массив с полем, 9disabledToClick

	// ОФИЦИАЛЬНЫЕ БИЛЕТЫ

		// Единые на количество поездок
		// Единый1п
		ticketsParams.push (['Единый 1 поездка', 'ed-1-trip', 57, 5, 'Единый на число поездок', 1, 'checked', 'visible', [], 'enabled' ]);
		// Единый2п
		ticketsParams.push (['Единый 2 поездки', 'ed-2-trip', 114, 5, 'Единый на число поездок', 2, 'checked', 'visible', [], 'enabled' ]);
		// Единый60п
		ticketsParams.push (['Единый 60 поездок', 'ed-60-trip', 1970, 45, 'Единый на число поездок', 60, 'checked', 'visible', [], 'enabled' ]);

		// Безлимитные единые
		// Единый1д
		ticketsParams.push (['Единый 1 сутки', 'ed-1-day', 230, 1, 'Единый на время', 999, 'checked', 'visible', [], 'enabled' ]);
		// Единый3д
		ticketsParams.push (['Единый 3 суток', 'ed-3-day', 438, 3, 'Единый на время', 999, 'checked', 'visible', [], 'enabled' ]);
		// Единый30д
		ticketsParams.push (['Единый 30 дней', 'ed-30-day', 2170, 30, 'Единый на время', 999, 'checked', 'visible', [], 'enabled' ]);
		// Единый90д
		ticketsParams.push (['Единый 90 дней', 'ed-90-day', 5430, 90, 'Единый на время', 999, 'checked', 'visible', [], 'enabled' ]);
		// Единый365д
		ticketsParams.push (['Единый 365 дней', 'ed-365-day', 19500, 365, 'Единый на время', 999, 'checked', 'visible', [], 'enabled' ]);
		
		// ЕдиныйМесяц
		ticketsParams.push (['Единый на календарный месяц', 'ed-1-month', 2900, 30, 'Единый на время', 999, 'checked', 'visible', [], 'enabled' ]);

		// Тройка Электронный кошелек
		ticketsParams.push (['Карта Тройка', 'troika', 40, 1800, 'Карта Тройка', 1, 'checked', 'visible', [], 'enabled' ]);

		// Тройка90минут
		ticketsParams.push (['Карта Тройка (пересадка 90 минут)', 'troika-90', 62, 1800, 'Карта Тройка', 1, 'unchecked', 'visible', [], 'disabled' ]);

		// Банковская карта
		ticketsParams.push (['Банковская карта', 'bankcard', 44, 1800, 'Банковская карта', 1, 'checked', 'visible', [], 'enabled' ]);

		// ТАТ 30д
		ticketsParams.push (['ТАТ 30 дней', 'tat-30-day', 1180, 30, 'Билет ТАТ', 999, 'checked', 'visible', [], 'enabled' ]);


	// СОЧЕТАНИЯ БИЛЕТОВ

		// ТАТ 30 дней + Тройка-метро
		ticketsParams.push (['ТАТ 30 дней + Карта Тройка (метро)', 'tat-30-day-troika', '-', 30, 'Сочетания билетов', 999, 'checked', 'visible', [], 'enabled' ]);

		// ТАТ 30 дней + Единый 60 поездок
		ticketsParams.push (['ТАТ 30 дней + Единый 60 поездок', 'tat-30-day-ed-60-trip', '-', 30, 'Сочетания билетов', 999, 'checked', 'visible', [], 'enabled' ]);
}



























// ПОЛЯ ВСЕХ БИЛЕТОВ И ИХ СОЧЕТАНИЙ
	
	// ОФИЦИАЛЬНЫЕ БИЛЕТЫ

		// Единые на число поездок

		buildEdNTrip ('ed-60-trip');
		buildEdNTrip ('ed-1-trip');
		buildEdNTrip ('ed-2-trip');

		function buildEdNTrip (id) {

			generateMatrix (getTicketParam (id, 8), 71, 71);

			let numberOfTrips = getTicketParam (id, 5); // Количество поездок
			let durationOfTicket = getTicketParam (id, 3); // Срок действия билета, в днях
			let priceOfTicket = getTicketParam (id, 2); // Стоимость билета
			let pricePerTrip = priceOfTicket / numberOfTrips; // Стоимость одной поездки

			let tripTimes = [1]; // Время поездок
			let ticketTimes = []; // Время покупок билетов
			let n = 0; // Счетчик поездок
			let ticketQuantity; // Количество билетов
			let tripPeriod; // Период между поездками



			for (let tat = 0; tat < getTicketParam (id, 8).length; tat++) {
				for (let metro = 0; metro < getTicketParam (id, 8)[0].length; metro++) {

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
						if (n >= numberOfTrips || (Math.floor (tripTimes[i]) - ticketTimes [ticketTimes.length - 1]) >= durationOfTicket) {
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

						if ( (month - ticketTimes [ticketTimes.length - 1] + 1) > durationOfTicket) {
							ticketQuantity += 1;
						} else {
							ticketQuantity += (month - ticketTimes [ticketTimes.length - 1] + 1) / durationOfTicket;
						}
					}
					
					// Общая стоимость составит
					getTicketParam (id, 8)[tat][metro] = ticketQuantity * priceOfTicket;
				}
			}
		}


		// Единые на время
		/*buildEdUnlim ('ed-1-day');
		buildEdUnlim ('ed-3-day');*/
		buildEdNTrip ('ed-1-day');
		buildEdNTrip ('ed-3-day');

		buildEdUnlim ('ed-30-day');
		buildEdUnlim ('ed-90-day');
		buildEdUnlim ('ed-365-day');

		function buildEdUnlim (id) {
			generateMatrix (getTicketParam (id, 8), 71, 71); // Пустая матрица (значения 99999)

			let duration = getTicketParam (id, 3) / month; // Срок действия билета, в месяцах
			let priceTicket = getTicketParam (id, 2); // Стоимость билета

			for (let tat = 0; tat < getTicketParam (id, 8).length; tat++) {
				for (let metro = 0; metro < getTicketParam (id, 8)[0].length; metro++) {
					getTicketParam (id, 8)[tat][metro] = priceTicket / duration;
				}
			}
		}


		// Единый на календарный месяц
		buildEd1Month ('ed-1-month');

		function buildEd1Month (id) {
			generateMatrix (getTicketParam (id, 8), 71, 71); // Пустая матрица (значения 99999)

			let duration = getTicketParam (id, 3) / month; // Срок действия билета, в месяцах
			let priceTicket = getTicketParam (id, 2); // Стоимость билета

			for (let tat = 0; tat < getTicketParam (id, 8).length; tat++) {
				for (let metro = 0; metro < getTicketParam (id, 8)[0].length; metro++) {
					getTicketParam (id, 8)[tat][metro] = (Math.floor(metro/70) +1)* priceTicket / duration;
				}
			}

		}


		// Карта Тройка на метро
		buildEdNTrip ('troika');

		// Банковская карта
		buildEdNTrip ('bankcard');




		// ТАТ 30 дней
		buildTat30Day ('tat-30-day');

		function buildTat30Day (id) {
			generateMatrix (getTicketParam (id, 8), 71, 71); // Пустая матрица (значения 99999)

			let duration = getTicketParam (id, 3) / month; // Срок действия билета, в месяцах
			let priceTicket = getTicketParam (id, 2); // Стоимость билета

			for (let tat = 0; tat < getTicketParam (id, 8).length; tat++) {
				for (let metro = 0; metro < 1; metro++) { // Без метро
					getTicketParam (id, 8)[tat][metro] = priceTicket / duration;
				}
			}
		}








	// СОЧЕТАНИЯ БИЛЕТОВ


		// ТАТ 30 дней + Тройка метро
		buildTat30DayTroika ('tat-30-day-troika', 'troika', 'tat-30-day');

		function buildTat30DayTroika (id, idMetro, idTat) {
			generateMatrix (getTicketParam (id, 8), 71, 71);

			for (let tat = 0; tat < getTicketParam (id, 8).length; tat++) { 
				for (let metro = 0; metro < getTicketParam (id, 8)[0].length; metro++) { // Без Метро
					getTicketParam (id, 8)[tat][metro] = getTicketParam (idMetro, 8)[0][metro] + getTicketParam (idTat, 8)[tat][0];
				}
			}
		}


		// ТАТ 30 дней + Единый 60 поездок
		buildTat30DayEd60Trip ('tat-30-day-ed-60-trip', 'ed-60-trip', 'tat-30-day');

		function buildTat30DayEd60Trip (id, idMetro, idTat) {
			generateMatrix (getTicketParam (id, 8), 71, 71);

			for (let tat = 0; tat < getTicketParam (id, 8).length; tat++) { 
				for (let metro = 0; metro < getTicketParam (id, 8)[0].length; metro++) { // Без Метро
					getTicketParam (id, 8)[tat][metro] = getTicketParam (idMetro, 8)[0][metro] + getTicketParam (idTat, 8)[tat][0];
				}
			}
		}






















// ИНТЕРФЕЙС

	// Генерация поля
	function drawCells () {
		drawGraphContainer ('graph-container', 37, 37);
		drawGraph ('graph', 72, 72);
	}



		// Нарисовать обертку таблицы с нумерацией ячеек и названиями
		function drawGraphContainer (id, x, y) {
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
			html += '<tr><td scope="row">0</td><td id="graph" colspan="36" rowspan="36"></td>';

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
		function drawGraph (id, x, y) {
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
		for (let i = 0; i < ticketsParams.length; i++) {

			if (i == 0) {
				html += '<div class="ticket-header"><em>Выберите количество поездок на графике для расчета по каждому билету.</em></div>'
				+ '<div class="ticket-group">'
			} else if (ticketsParams [i][4] != ticketsParams [i-1][4]) {
				html +=
				'</div><div class="ticket-group">';
			}

			if (getTicketParam (ticketsParams[i][1], 6) == 'checked') {
				checked = 'checked';
			} else {
				checked = ''
			}
			
			html +=
			'<table><tr class="' + ticketsParams[i][1] + '"><td class="input"><input type="checkbox"' + checked + ' id="' 
			+ ticketsParams[i][1]
			+ '" name="'
			+ ticketsParams[i][1]
			+'" value="'
			+ ticketsParams[i][1] + '"';

			if (ticketsParams[i][9] == 'disabled') {
				html += ' disabled';
			}

			html += '></td><td class="label"><label for="'
			+ ticketsParams[i][1]
			+ '">'
			+ ticketsParams[i][0]
			+ ' <span class="price">';

			if (ticketsParams[i][2] != '-') {
				html += '<br>' + ticketsParams[i][2] + '&nbsp;&#8381;'
			}

			html += '</span>'
			+ '</label></td><td class="price"></td><td class="difference"></td></tr></table>';

			if (i == (ticketsParams.length - 1)) {
				html +=
				'</div>';
			}
		}

		// Вставляем в дом
		parent.insertAdjacentHTML('afterbegin', html);


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
function getTicketParam (ticketId, colNumber) {
	for (let i = 0; i < ticketsParams.length; i++) {
		if (ticketsParams [i][1] == ticketId) {
			return ticketsParams [i][colNumber];
		}
	}
}

function changeTicketParam (ticketId, colNumber, value) {
	for (let i = 0; i < ticketsParams.length; i++) {
		if (ticketsParams [i][1] == ticketId) {
			ticketsParams [i][colNumber] = value;
		}
	}
}




























// ИТОГОВЫЙ ГРАФИК

// Создание и рисование номограммы
function generateGraph () {
	checkInputs ();
	checkInputDepends ();

	/*for (let i=0; i < ticketsParams.length; i++) {
		clearCalculation (i);
	}

	clearSelectorLines ();*/

	buildGraph ();
	drawGraphContent ();
}

// Расчет итоговой таблицы
let graph = []; // Итоговая номограмма со стоимостями

function buildGraph () {
	
	generateMatrix (graph, 71, 71);

	let array = [];

	for (let tat = 0; tat < graph.length; tat++) {
		for (let metro = 0; metro < graph[0].length; metro++) {

			array = [];

			if (metro == 0 && tat == 0) {
				array.push (0);
			}

			for (let i=0; i < ticketsParams.length; i++) {
				if (ticketsParams [i][6] == 'checked') {
					array.push (ticketsParams[i][8][tat][metro]);
				}
			}

			graph [tat][metro] = Math.min (...array);
		}
	}
}

// Вывод номограммы в таблицу
function drawGraphContent () {
	for (let tat = 0; tat < graph.length; tat++) {
		for (let metro = 0; metro < graph[0].length; metro++) {
			
			document.getElementById(metro + '-' + tat).removeAttribute('class');

			for (let i=0; i < ticketsParams.length; i++) {
				if (ticketsParams [i][6] == 'checked') {
					if (graph [tat][metro] == ticketsParams[i][8][tat][metro]) {
						document.getElementById(metro + '-' + tat).classList.add (ticketsParams[i][1]);
						document.getElementById(metro + '-' + tat).title = metro + ' раз на метро, ' + tat + ' на ТАТ → ' + ticketsParams[i][0] + ' → ' + graph [tat][metro].toFixed() + ' ₽/мес.';
						break;
					}
				}
			}
		}
	}

	document.getElementById('0-0').className = '';
}


function checkInputs () {
	for (let i=0; i < ticketsParams.length; i++) {
		if (document.getElementById(ticketsParams[i][1]).checked == true) {
			ticketsParams[i][6] = 'checked';
		} else {
			ticketsParams[i][6] = 'unchecked';
		}
	}
}

function checkInputDepends () {
	if (getTicketParam('tat-30-day', 6) == 'unchecked' || getTicketParam('troika', 6) == 'unchecked') {
		changeTicketParam('tat-30-day-troika', 6, 'unchecked');
		document.getElementById('tat-30-day-troika').checked = false;
	}

	if (getTicketParam('tat-30-day', 6) == 'unchecked' || getTicketParam('ed-60-trip', 6) == 'unchecked') {
		changeTicketParam('tat-30-day-ed-60-trip', 6, 'unchecked');
		document.getElementById('tat-30-day-ed-60-trip').checked = false;
	}
}



























// Выполнение при загрузке

drawCells (); // Генерация поля
drawTicketTypesForm (); // Генерация типов билетов
generateGraph (); // Составить номограмму и нарисовать ее




















// Обработчик нажатий пользователя на поле врага
document.querySelector('#graph table').addEventListener('mouseover', e => getUserHover(e));

function getUserHover (e) {

	// Получить координаты клетки
	let metro = getXYFromId (e.target.id) [0];
	let tat = getXYFromId (e.target.id) [1];

	drawSelectorLines (metro, tat)

	showCalculation (metro, tat); // Показываем цифры в таблице справа
}

	// Получение координат клетки из ИД ячейки
	function getXYFromId (id) {
		let x = parseInt( id.slice (0, id.indexOf ('-') ) );
		let y = parseInt( id.slice (id.indexOf ('-') + 1) );
		return [x, y];
	}

	// Показываем цифры в таблице справа
	function showCalculation (metro, tat) {

		let difference = 0;

		// Количество поездок
		showTripNumber (metro, tat);

		// Стоимость по каждому билету
		for (let i = 0; i < ticketsParams.length; i++) {
			clearCalculation (i);

			if (ticketsParams [i][6] == 'checked' && ticketsParams [i][8][tat][metro] < 50000 && !(metro == 0 && tat == 0)) {
				showPricePerMonth (ticketsParams [i][1], ticketsParams [i][8][tat][metro].toFixed());
				
				
				showDifference (ticketsParams [i][1], metro, tat);
			}
		}
	}

	function showTripNumber (metro, tat) {
		document.querySelector('#ticket-types div.ticket-header').innerHTML = 'В течение месяца:<br><strong>' + metro + '</strong> поездок на метро.<br><strong>' + tat + '</strong> поездок на ТАТ.';
	}

	function showPricePerMonth (id, price) {
		document.querySelector('#ticket-types tr.' + id + ' td.price').innerHTML = price + ' &#8381;/мес.';
	}

	function showDifference (id, metro, tat) {
		let differenceNumber = (100 * (getTicketParam (id, 8) [tat][metro] - graph[tat][metro]) / graph[tat][metro]).toFixed();
		let differenceText = '';

		if (Math.round(differenceNumber / 1000) == 0) {
			differenceText = differenceNumber;
		} else {
			differenceText = Math.round(differenceNumber / 1000) + 'k';
		}

		if (differenceText == 0) {
			document.querySelector('#ticket-types tr.' + id + ' td.difference').classList.add ('active');
		} else {
			document.querySelector('#ticket-types tr.' + id + ' td.difference').innerHTML = '+' + differenceText + '%';
		}
	}

	function addDifferenceClass (id, name) {
		document.querySelector('#ticket-types tr.' + id + ' td.difference').classList.add (name);
	}


	function clearCalculation (i) {
		document.querySelector('#ticket-types tr.' + ticketsParams [i][1] + ' td.price').innerHTML = '';
		document.querySelector('#ticket-types tr.' + ticketsParams [i][1] + ' td.difference').innerHTML = '';

		document.querySelector('#ticket-types tr.' + ticketsParams [i][1] + ' td.difference').classList.remove ('active');
	}


	function drawSelectorLines (metro, tat) {

		clearSelectorLines ();

		document.getElementById (metro + '-' + tat).classList.add ('active');
		
		for (i=0; i < metro; i++) {
			document.getElementById (i + '-' + tat).classList.add ('active');
		}

		for (i=0; i < tat; i++) {
			document.getElementById (metro + '-' + i).classList.add ('active');
		}
	}

	function clearSelectorLines () {
		for (i = 0; i < graph.length; i++) {
			for (j = 0; j < graph.length; j++) {
				document.getElementById (j + '-' + i).classList.remove ('active');
			}
		}
	}






