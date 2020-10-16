const formatBool = (bool) => {
  let logical = bool ? "Yes" : "No";
  return `<span class="item__bool-${logical.toLowerCase()}">${logical}</span`;
};

const generateTags = (tags) => {
  return tags.map(
    tag => `<span class="item__tags-tag">${tag}</span>`
  ).join("\n")
}

export const itemTemplate = ({ id, color, length_in_metres, is_natural, decor_type, price_in_uah }) => `
<div class="main__item">
  <div class="item__image"><img src="img/garland.jpg" alt=""></div>
  <h3 class="item__title">Garland</h3>
  <p class="item__property">Color: ${color}</p>
  <p class="item__property">Length: ${length_in_metres} m</p>
  <p class="item__property">Natural: ${formatBool(is_natural)}</p>
  <div class="item__tags">${generateTags(decor_type)}</div>
  <p class="item__price">Price: ${price_in_uah} UAH</p>
  <div class="item__buttons">
    <button class="button item__buttons-edit">Edit</button>
    <button class="button item__buttons-delete">Delete</button>
  </div>
</div>`;
