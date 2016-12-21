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
    title: 'Миндаль',
    subs: {
      'Грецкий орех': 10,
      'Фисташки': 20
    }
  }
];

var itemsList = document.querySelector('.js-items-list');
var selectProduct = document.querySelector('.js-select-product');
var selectedItem;

function renderItemsList(items, value) {
  var itemsListContent;
  if (value[0]) {
    itemsListContent = items.filter(function(item) {
      return item.title.toLowerCase().indexOf(value.join().trim().toLowerCase()) == 0
    }).map(function(item) {
  		return '<li>' + item.title + '</li>';
    });
    // reduce выдает ошибку, если массив пустой
    if (itemsListContent.length > 0) {
      itemsListContent = itemsListContent.reduce(function(a, b) {
    	  return a + b;
      });
    }
  } else {
    itemsListContent = '';
  }
  itemsList.innerHTML = itemsListContent;
}

function getSubs(product, weight) {
  weight = weight || 1;
  var subs = product.subs;
  var array = [];
  for (var sub in subs) {
    array.push(productFactory(sub, subs[sub] * weight));
  }
  return array;
}

function getItemData(itemname) {
  var itemData = data.filter(function(el) {
    return el.title == itemname;
  });
  return itemData[0];
}

function printSubs(product, weight) {
  var subs = getSubs(product, weight);
  var subsBlock = document.querySelector('.subs');
  var result = product.title + '. Продукты заменители:<br>';
  subs.forEach(function(sub) {
		result += '- ' + sub.title + ', ' + sub.amount + '<br>';
  })

  subsBlock.innerHTML = result;
}

function productFactory(title, amount) {
	return {
  	title: title,
    amount: amount
  }
}

function setActive(node) {
  if (selectedItem) {
    selectedItem.classList.remove('active');
  }
  selectedItem = node;
  selectedItem.classList.add('active');
}

// renderItemsList(data);

itemsList.addEventListener('click', function(e) {
	var target = e.target;
  var li = target.closest('li');
  if (!li) return;
  if (!itemsList.contains(li)) return;
  selectProduct.value = target.innerText;
  itemsList.innerHTML = '';
  setActive(li);
  printSubs(getItemData(target.innerText));
});

selectProduct.addEventListener('keyup', function(e) {
  var value = [this.value];
  renderItemsList(data, value);
  if (e.keyCode == 27) {
    this.value = '';
    itemsList.innerHTML = '';
  }
});

// selectProduct.addEventListener('focus', function(e) {
//   this.addEventListener
// });
