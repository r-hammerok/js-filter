// Функция, принимающая параметр type и остаточные параметры, которые собираются в массив values
// Для массива применяется метод filter, который оставляет в массиве только элементы с типом,
// равным значению type.
// Отфильтрованный массив возвращается из функции
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	// Функция прячет со страницы все блоки с классом "dialog__response-block"
	hideAllResponseBlocks = () => {
		// Константе присваивается массив из блоков с классом "dialog__response-block"
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// Каждому элементу массива присваивается стиль "display: none"
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	// Функция отображения блока. Принимает три параметра
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// Вызов функции (прячутся все блоки  с классом "dialog__response-block")
		hideAllResponseBlocks();
		// Элемент, соответствующий первому аргументу, показывается на странице
		document.querySelector(blockSelector).style.display = 'block';
		// Если третий аргумент передан и не пустой,
		// то, соответствующий ему элемент, заполняется содержимым второго аргумента
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	// Показывается блок с классом "dialog__response-block_error",
	// в блок с id "error" выводится сообщения из параметра msgText
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	// Показывается блок с классом "dialog__response-block_ok",
	// в блок с id "ok" выводится сообщения из параметра msgText
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	// Показывается блок с классом "dialog__response-block_no-results"
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// Функция с конструкцией отлавливания ошибок
	tryFilterByType = (type, values) => {
		// Попытка выполнения кода
		try {
			// Выполняется строка кода, в которой вызывается функция с передачей двух параметров, 
			// а результат выполнения строки - массив - по-элементно объединяется в строку с разделителем ", " между элементами
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// Константе присваивается та или иная шаблонная строка в зависимости от условия
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			// Вызывается функция
			showResults(alertMsg);
		} catch (e) {
			// В случае ошибки вызывается функция и в нее передается параметр, сформированный из стока ошибки
			showError(`Ошибка: ${e}`);
		}
	};

// Константе присваивается элемент документа
const filterButton = document.querySelector('#filter-btn');

// На элемент вешается обработчик события click
filterButton.addEventListener('click', e => {
	// Константам присваиваются элементы документа
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	// Если в элементе не введено значение, то вызывается метод элемента для формирования сообщения об ошибке
	// и вызывается функция
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
	// Иначе с элемента убирается сообщение об ошибке,
	// отменяется стандратное действие на элементе
	// и вызывается функция
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

