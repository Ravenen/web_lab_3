export const formatMoney = (amount) => {
  return `${amount} UAH`;
};

const formatBool = (bool) => {
  let logical = bool ? "Yes" : "No";
  return `<span class="item__bool-${logical.toLowerCase()}">${logical}</span`;
};

const generateTags = (tags, filters) => {
  return tags.map(
    tag => {
      let sel_style = filters.length && filters.includes(tag) ? " sel" : "";
      return `<span class="item__tags-tag${sel_style}">${tag}</span>`;
    }
  ).join("\n")
}

export const itemTemplate = ({ id, color, length_in_metres, is_natural, decor_type, price_in_uah }, filters) => `
<div class="main__item">
  <div class="item__image"><img src="img/garland.jpg" alt=""></div>
  <h3 class="item__title">Garland</h3>
  <p class="item__property">Color: ${color}</p>
  <p class="item__property">Length: ${length_in_metres} m</p>
  <p class="item__property">Natural: ${formatBool(is_natural)}</p>
  <div class="item__tags">${generateTags(decor_type, filters)}</div>
  <p class="item__price">Price: ${formatMoney(price_in_uah)}</p>
  <div class="item__buttons">
    <button class="button item__buttons-edit">Edit</button>
    <button class="button item__buttons-delete">Delete</button>
  </div>
</div>`;
