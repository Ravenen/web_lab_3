import {formatMoney, itemTemplate} from './templates.js';

const itemsContainer = document.getElementById('items_container');
const sortCheckbox = document.getElementById("sort");
const countBtn = document.getElementById("count");
const countResults = document.getElementById("count_results");
const countTotal = document.getElementById("count_total");
const searchForm = document.getElementById("search_form");
const searchInput = document.getElementById("search_input");

let itemsOriginal = [];
let itemsCurrent = [];
let foundByFilters = [];

updateItems();

async function updateItems() {
  const res = await fetch('http://127.0.0.1:5000/garlands');
  const data = await res.json();

  itemsOriginal = Array.from(data);
  itemsCurrent = Array.from(itemsOriginal);
  updateItemsDOM(itemsCurrent);
}

function updateItemsDOM(dataArray) {
  itemsContainer.innerHTML = "";
  dataArray.forEach(item => {
    itemsContainer.insertAdjacentHTML("afterbegin", itemTemplate(item, foundByFilters.flat()));
  });
}

function calculateTotal(dataArray, key) {
  const total = dataArray.reduce((acc, item) => (acc + key(item)), 0);
  return total;
}

function searchItemsByValue(dataArray, value, key) {
  const foundItems = dataArray.filter((item) => {
    let fitElements = key(item).filter((nestedItem) => nestedItem.includes(value));
    foundByFilters.push(fitElements);
    return fitElements.length;
  });
  return foundItems;
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  foundByFilters = [];
  const searchingData = searchInput.value.trim();

  if (!searchingData) {
    itemsCurrent = Array.from(itemsOriginal);
  } else {
    itemsCurrent = searchItemsByValue(itemsOriginal, searchingData, (item) => item.decor_type);
  }
  updateItemsDOM(itemsCurrent);
  sortCheckbox.checked = false;
});

countBtn.addEventListener("click", () => {
  countResults.classList.remove("hidden");
  const totalPrice = calculateTotal(itemsCurrent, (item) => item.price_in_uah);
  countTotal.innerHTML = formatMoney(totalPrice);
});

sortCheckbox.addEventListener("change", () => {
  let sortedItems = Array.from(itemsCurrent);
  if (sortCheckbox.checked) {
    sortedItems.sort((first, second) => (first.length_in_metres - second.length_in_metres));
  }
  updateItemsDOM(sortedItems);
});
