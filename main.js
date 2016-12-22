'use strict';

// closest() polyfill
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest =
  function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this;
    do {
        i = matches.length;
        while (--i >= 0 && matches.item(i) !== el) {};
    } while ((i < 0) && (el = el.parentElement));
    return el;
  };
}

var data = [
  {
    title: 'Говядина',
    subs: {
      'Свинина': 10,
      'Курица': 20
    }
  },
  {
    title: 'Рис',
    subs: {
      'Гречка': 10,
      'Макароны': 20
    }
  },
  {
    title: 'Творог',
    subs: {
      'Кефир': 10,
      'Йогурт': 20
    }
  },
  {
    title: 'Картофель',
    subs: {
      'Попкорн': 10,
      'Семечки': 20
    }
  },
  {
    title: 'Кот',
    subs: {
      'Собака': 10,
      'Кролик': 20
    }
  },
  {
    title: 'Миндаль',
    subs: {
      'Грецкий орех': 10,
      'Фисташки': 20
    }
  }
];

var itemsList = document.querySelector('.js-items-list');
var selectProduct = document.querySelector('.js-select-product');
var subs = document.querySelector('.js-subs');
var selectedItem;

// вывод списка продуктов в зависимости от введенного значения в инпут
function renderItemsList(items, value) {
  var itemsListContent;
  // если value непустая строка
  if (value) {
    itemsListContent = items.filter(function(item) { // выбираем из массива объекты, начало значений которых равно введенному в инпут значению
      return item.title.toLowerCase().indexOf(value.trim().toLowerCase()) == 0;
    }).map(function(item) { // оборачиваем отфильтрованные значения в li
  		return '<li>' + item.title + '</li>';
    });
    // reduce выдает ошибку, если массив пустой
    if (itemsListContent.length > 0) {
      itemsListContent = itemsListContent.reduce(function(a, b) { // суммируем мапированные значения
    	  return a + b;
      });
    }
  // если value пустая строка
  } else {
    itemsListContent = '';
  }
  itemsList.innerHTML = itemsListContent;
}

// получить массив продуктов-заменителей, исходя из объекта продукта и веса
function getSubs(product, weight) {
  weight = weight || 1;
  var subs = product.subs;
  var array = [];
  for (var sub in subs) {
    array.push(productFactory(sub, subs[sub] * weight));
  }
  return array;
}

// получить продукты из data, у которых data.title соответствуюет itemname
function getItemData(data, itemname) {
  var itemData = data.filter(function(el) {
    return el.title == itemname;
  });
  return itemData[0];
}

// вывести название продукта и соответствующие ему продукты заменители с весом
function printSubs(product, weight) {
  var subsItems = getSubs(product, weight);
  var result = product.title + '. Продукты заменители:<br>';
  subsItems.forEach(function(sub) {
		result += '- ' + sub.title + ', ' + sub.amount + '<br>';
  })
  subs.innerHTML = result;
}

function productFactory(title, amount) {
	return {
  	title: title,
    amount: amount
  }
}

// если уже есть элемент с .active, то удалить у него .active, добавить нужному элементу .active
function setActive(node) {
  if (selectedItem) {
    selectedItem.classList.remove('active');
  }
  selectedItem = node;
  selectedItem.classList.add('active');
}

itemsList.addEventListener('click', function(e) {
	var target = e.target;
  var li = target.closest('li');
  if (!li) return;
  if (!itemsList.contains(li)) return;
  selectProduct.value = target.innerText;
  itemsList.innerHTML = '';
  // setActive(li);
  printSubs(getItemData(data, target.innerText));
});

selectProduct.addEventListener('keyup', function(e) {
  var value = this.value;
  renderItemsList(data, value);
  if (e.keyCode == 27) { // если нажата esc
    this.value = '';
    itemsList.innerHTML = '';
  }
});
