// элементы в DOM можно получить при помощи функции querySelector
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
document.querySelector('.fruits__list'); // список карточек


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);
let majority = ['светло-коричневый','зеленый','фиолетовый', 'розово-красный','желтый'];


// ОТОБРАЖЕНИЕ

function display(arr) {
    // TODO: формируем новый элемент <li>, как указано в разметке и добавляем на страницу
    let result;
    result = '';
    console.log('зашли в консоль');
    let i = 0;
    let len = arr.length;
    let parent = document.querySelector('.fruits__list');
    while (i < len) {
        //создали элемент li
        let li = document.createElement('li');
        switch (arr[i].color) {
            case 'фиолетовый': li.className = 'fruit__item fruit_violet'; break;
            case 'зеленый': li.className = 'fruit__item fruit_green'; break;
            case 'розово-красный': li.className = 'fruit__item fruit_carmazin'; break;
            case 'желтый': li.className = 'fruit__item fruit_yellow'; break;
            case 'светло-коричневый': li.className = 'fruit__item fruit_lightbrown'; break;
        }
        parent.appendChild(li);

        let div = document.createElement('div');
        div.className = 'fruit__info';
        li.appendChild(div);

        let divColor = document.createElement('div');
        divColor.innerHTML = arr[i].color;
        div.appendChild(divColor);

        let divKind = document.createElement('div');
        divKind.innerHTML = arr[i].kind;
        div.appendChild(divKind);

        let liWeigt = document.createElement('div');
        liWeigt.innerHTML = arr[i].weight;
        div.appendChild(liWeigt);
        i += 1;
    }
    console.log(fruits);

}


// первая отрисовка карточек
document.getElementById('d_btn').addEventListener('click', function () {
    display(fruits);
});


/*** ПЕРЕМЕШИВАНИЕ ***/
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
    let result = [];
    let el = 0;

    let iReduce;
    while (fruits.length > 0) {
        iReduce = getRandomInt(0, fruits.length - 1);
        result[el] = fruits[iReduce];
        fruits.splice(iReduce, 1);
        el += 1;
    }
    fruits = result;
};
let oldResult = [];
shuffleButton.addEventListener('click', () => {
    previosList = fruits;
    console.log('до перемешивания',oldResult);
    shuffleFruits(fruits);
    console.log('после перемешивания',fruits);
    previosList == fruits ? alert('попробуйте еще раз') : display(fruits);
});


/*** ФИЛЬТРАЦИЯ ***/

const filterMin = document.querySelector('.minweight__input'); // кнопка фильтрации
const filterMax = document.querySelector('.maxweight__input'); // кнопка фильтрации

function filterFruits(result) {
    fruits = result.filter(item => ((item.weight >= filterMin.value) && (item.weight <= filterMax.value)))
}

filterButton.addEventListener('click', () => {
    filterFruits(fruits);
    display(fruits);
});


let sortKind;
let sortTime;
sortTime = '-';

const comparationColor = (a, b) => {
    return majority.indexOf(a.color) > majority.indexOf(b.color);
};

function bubbleSort() {
    console.log('зашли в сортировку пузырьком');
    const n = fruits.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (comparationColor(fruits[j], fruits[j + 1])) {
                let temp = fruits[j + 1];
                fruits[j + 1] = fruits[j];
                fruits[j] = temp;
            }
        }
    }
}

// алгоритм быстрой сортировки
function shuffle(firstIndex, secondIndex) {
    const temp = fruits[firstIndex];
    fruits[firstIndex] = fruits[secondIndex];
    fruits[secondIndex] = temp;
}

// функция разделитель
function partition(left, right) {
    let pivot = fruits[Math.floor((right + left) / 2)],
        i1 = left,
        j1 = right;
    while (i1 <= j1) {
        while (comparationColor(pivot, fruits[i1])) {
            i1++;
        }
        while (comparationColor(fruits[j1], pivot)) {
            j1--;
        }
        if (i1 <= j1) {
            shuffle(i1, j1);
            i1++;
            j1--;
        }
    }
    return i1;
}

// алгоритм быстрой сортировки
function quickSort(left, right) {
    let index;
    if (fruits.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? fruits.length - 1 : right;
        index = partition(left, right);
        if (left < index - 1) {
            quickSort(left, (index - 1));
        }
        if (index < right) {
            quickSort(index, right);
        }
    }
    console.log('зашли в быструю сортировку');
    return fruits;
}


sortActionButton.addEventListener('click', () => {
    const start = new Date().getTime();
    sortKindLabel.textContent == 'bubbleSort' ? bubbleSort(fruits) : quickSort();
    const end = new Date().getTime();
    sortTimeLabel.textContent = `${end - start} ms`;
    display(fruits);
});

// // инициализация полей
sortKind = 'bubbleSort';
sortKindLabel.textContent = sortKind;

sortChangeButton.addEventListener('click', () => {
    // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
    sortKindLabel.textContent == 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
});

/*** ДОБАВИТЬ ФРУКТ ***/
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.getElementById('colorSelect'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

addActionButton.addEventListener('click', () => {
    console.log(kindInput.value, colorInput.value, weightInput.value);
    if ((kindInput.value == '') || (weightInput.value == '')) {
        alert('не хватает данных');
    } else {
        let newElement = { kind: kindInput.value, color: colorInput.value, weight: weightInput.value };
        fruits[fruits.length] = newElement;
        display(fruits);
    }
});

