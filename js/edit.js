import {
    form,
    color,
    length,
    is_natural,
    price,
    HOST_REQUEST,
    tags,
    requiredFields,
    isCheckedRequredFields,
    setRequiredFieldsReset,
    generateGarland,
    updateItem,
    getTagName
} from "./item_utils.js";

var query = window.location.search.substring(1);
const itemId = query.match(/(\d+)/g)[0];
setItemParametersById(itemId);
setRequiredFieldsReset();

async function setItemParametersById(itemId) {
  const item = await getItemById(itemId);
  color.value = item.color;
  length.value = parseFloat(item.length_in_metres);
  price.value = parseFloat(item.price_in_uah);
  is_natural.checked = item.is_natural;
  tags.forEach((tag, i) => {
    tag.checked = item.decor_type.includes(getTagName(tag));
  });
  console.log(item);
  form.hidden = false;
}

async function getItemById(itemId) {
  const res = await fetch(HOST_REQUEST + "/" + itemId);
  const data = await res.json();
  return data;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isCheckedRequredFields(requiredFields)) {
        let garland = generateGarland();
        updateItem(itemId, garland);
    }
});
