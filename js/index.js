import { formatMoney, itemTemplate } from "./templates.js";
import {
  HOST_REQUEST,
  sortByLengthDescending,
  calculateTotalPrice,
  searchItemsByValueInDecorType,
  addItemToPage
} from "./item_utils.js";

const itemsContainer = document.getElementById("items_container");
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
  const res = await fetch(HOST_REQUEST);
  const data = await res.json();

  itemsOriginal = Array.from(data);
  itemsCurrent = Array.from(itemsOriginal);
  updateItemsDOM(itemsCurrent);
}

function updateItemsDOM(dataArray) {
  itemsContainer.innerHTML = "";
  dataArray.forEach(item => {
    addItemToPage(itemsContainer, item, itemTemplate, foundByFilters.flat(), updateItems);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  foundByFilters = [];
  const searchingData = searchInput.value.trim();

  if (!searchingData) {
    itemsCurrent = Array.from(itemsOriginal);
  } else {
    itemsCurrent = searchItemsByValueInDecorType(itemsOriginal, searchingData, foundByFilters);
  }
  updateItemsDOM(itemsCurrent);
  sortCheckbox.checked = false;
});

countBtn.addEventListener("click", () => {
  countResults.classList.remove("hidden");
  const totalPrice = calculateTotalPrice(itemsCurrent);
  countTotal.innerHTML = formatMoney(totalPrice);
});

sortCheckbox.addEventListener("change", () => {
  let sortedItems = Array.from(itemsCurrent);
  if (sortCheckbox.checked) {
    sortedItems = sortByLengthDescending(sortedItems);
  }
  updateItemsDOM(sortedItems);
});
