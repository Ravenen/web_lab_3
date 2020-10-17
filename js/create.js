import {
    form,
    createItem,
    requiredFields,
    isCheckedRequredFields,
    generateGarland
} from "./item_utils.js";

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isCheckedRequredFields(requiredFields)) {
        let garland = generateGarland();
        createItem(garland);
    }
});
