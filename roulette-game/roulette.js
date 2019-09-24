// Исходные данные
		let balance = 1000;
		let lap = 0;
		let reward = 0;

		// Результаты рулетки
		let ballNumber = '';
		let ballColor = '';
		let ballEven = '';
		let ballSmall = '';

		// Результаты ставок
		let betsResult = [];

		// Нулевые ставки
		let bets = [
			['betRed', 0],
			['betBlack', 0],
			['betEven', 0],
			['betOdd', 0],
			['betSmall', 0],
			['betBig', 0],
			['betNumber', 0]
		]
		let betTheNumber = '';


		function goRoulette() {
			// Записываем ставки и проверям
			if (readBets() == false) {
				document.getElementById('text').innerHTML = 'Ошибка в ставках!';
				return;
			} else {
				document.getElementById('text').innerHTML = 'Ставки сделаны, ставок больше нет!';
			}

			runBall ();
			bildBetsResult ();
			getReward ();
			showResults ();
		}


		function readBets () {
			let sum = 0;
			let itsError = false;

			// Записываем основные ставки в массив и тут же проверям
			for (i = 0; i < bets.length; i++) {
				bets [i][1] = +document.getElementById( bets [i][0] ).value;
				if (isNaN (bets [i][1]) || bets[i][1] < 0) {
					itsError = true;
					break;
				}
				sum += bets [i][1]
			}

			if (sum > balance || sum == 0) {
				itsError = true;
			}

			// Проверяем ставку на число
			betTheNumber = document.getElementById('betTheNumber').value;
			if (isNaN (betTheNumber) || betTheNumber < 0 || betTheNumber > 36 || (betTheNumber == '' && bets[bets.length-1][1] > 0)) {
				itsError = true;
			}

			return !itsError;
		}

		
		function generateRandomNumber (min, max) {
			return parseInt(min + Math.random() * (max + 1));
		}
		

		function runBall () {
			// Кидаем шарик
			ballNumber = generateRandomNumber (0, 36);
			
			// Определяем Красное-Черное
			if (ballNumber == 0) {
				ballColor = 'green';
			} else if (ballNumber == 32 || ballNumber == 19 || ballNumber == 21 || ballNumber == 25 || ballNumber == 34 || ballNumber == 27 || ballNumber == 36 || ballNumber == 30 || ballNumber == 23 || ballNumber == 5 || ballNumber == 16 || ballNumber == 1 || ballNumber == 14 || ballNumber == 9 || ballNumber == 18 || ballNumber == 7 || ballNumber == 12 || ballNumber == 3) {
				ballColor = 'red';
			} else {
				ballColor = 'black';
			}

			// Определямем Чет-Нечет
			if (ballNumber == 0) {
				ballEven = 'zero';
			} else if (ballNumber % 2 == 0) {
				ballEven = 'even';
			} else {
				ballEven = 'odd';
			}

			// Определяем Малые-Большие
			if (ballNumber == 0) {
				ballSmall = 'zero';
			} else if (ballNumber <= 18) {
				ballSmall = 'small';
			} else {
				ballSmall = 'big';
			}
		}

		function bildBetsResult () {

			// Массив содержит выигрышные ставки для данного шарика с коэффициентом этих ставок

			betsResult = [];

			if (ballColor == 'green') {
				betsResult.push (-1);
				betsResult.push (-1);
			} else if (ballColor == 'red') {
				betsResult.push (1);
				betsResult.push (-1);
			} else {
				betsResult.push (-1);
				betsResult.push (1);
			}

			if (ballEven == 'zero') {
				betsResult.push (-1);
				betsResult.push (-1);
			} else if (ballEven == 'even') {
				betsResult.push (1);
				betsResult.push (-1);
			} else {
				betsResult.push (-1);
				betsResult.push (1);
			}

			if (ballSmall == 'zero') {
				betsResult.push (-1);
				betsResult.push (-1);
			} else if (ballSmall == 'small') {
				betsResult.push (1);
				betsResult.push (-1);
			} else {
				betsResult.push (-1);
				betsResult.push (1);
			}

			if (betTheNumber == ballNumber) {
				betsResult.push (35);
			} else {
				betsResult.push (-1);
			}
		}


		function getReward () {
			
			reward = 0;

			// Считаем выигрыш по всем ставкам
			for (i = 0; i < bets.length; i++) {
				reward += betsResult [i] * bets [i][1];
			}

			// Обновляем баланс
			balance += reward;

			// Обновляем раунд
			lap++;
		}


		function showResults () {

			// Сбрасываем оформление
			for (i = 0; i < bets.length; i++) {
				document.getElementById(bets [i][0]).style.background = '';
			}


			// Баланс
			document.getElementById('balance').innerHTML = 'Деньги: ' + balance + ' &#8381; (' + reward + ' &#8381; в этом ' + lap +'-м раунде)';

			// Ставки
			for (i = 0; i < bets.length; i++) {
				if (betsResult [i] * bets [i][1] > 0) {
					document.getElementById(bets [i][0]).style.background = 'PaleGreen';
				} else if (betsResult [i] * bets [i][1] < 0) {
					document.getElementById(bets [i][0]).style.background = 'LightCoral';
				}
			}
		
			// Выпавший шарик
			document.getElementById('ball').innerHTML = 'Выпало: <span id="ballNumber">&nbsp;' + ballNumber + '&nbsp;</span>';
			document.getElementById('ballNumber').style.color = 'white';
			document.getElementById('ballNumber').style.backgroundColor = ballColor;
		}