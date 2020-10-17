const form = document.getElementById("form");
const color = document.getElementById("color");
const length = document.getElementById("length");
const is_natural = document.getElementById("natural");
const tag_indoor_tree = document.getElementById("tag_indoor_tree");
const tag_outdoor_tree = document.getElementById("tag_outdoor_tree");
const tag_house_interior = document.getElementById("tag_house_interior");
const tag_house_exterior = document.getElementById("tag_house_exterior");
const tag_working_place = document.getElementById("tag_working_place");
const tag_door = document.getElementById("tag_door");
const price = document.getElementById("price");

const ERROR_CLASS = "error";
const HOST_REQUEST = "http://127.0.0.1:5000/garlands";
const tags = [tag_indoor_tree, tag_outdoor_tree, tag_house_interior, tag_house_exterior, tag_working_place, tag_door];
const requiredFields = [color, length, tags, price];

function setRequiredFieldsReset() {
    requiredFields.forEach(item => {
        if (Array.isArray(item) && item.length > 0) {
            item.forEach((nestedItem) => {
                nestedItem.addEventListener("change", () => {
                    removeError(nestedItem, true);
                });
            })
        }
        else {
            item.addEventListener("input", () => {
                removeError(item);
            });
        }
    });
}

// Item CRUD functions

async function createItem(item) {
    let response = await fetch(HOST_REQUEST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
        .then(() => {
            window.location.href = "./index.html";
        })
        .catch(function (err) {
            console.info(err);
            alert("Something went wrong...");
        });
}

async function updateItem(itemId,item) {
    let response = await fetch(HOST_REQUEST + "/" + itemId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
    })
        .then(() => {
            window.location.href = "./index.html";
        })
        .catch(function (err) {
            console.info(err);
            alert("Something went wrong...");
        });
}

async function deleteItem(itemId) {
    let response = await fetch(HOST_REQUEST + "/" + itemId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .catch(function (err) {
            console.info(err);
            alert("Something went wrong...");
        });
    return new Promise((resolve, reject) => resolve());
}

// Item object functions

function addItemToPage(parentContainer, item, template, filter, updateFunction) {
    parentContainer.insertAdjacentHTML("beforeend", template(item, filter));
    const editBtn = document.getElementById(`btn-edit-${item.id}`);
    const deleteBtn = document.getElementById(`btn-delete-${item.id}`);
    editBtn.addEventListener("click", () => {
        window.location.href = `./edit.html?id=${item.id}`;
    });
    deleteBtn.addEventListener("click", () => {
        deleteItem(item.id).then(updateFunction);
    });
}

function generateGarland() {
    return {
        color: color.value.trim(),
        length_in_metres: parseFloat(length.value.trim()),
        is_natural: is_natural.checked,
        price_in_uah: parseFloat(price.value.trim()),
        decor_type: convertCheckedTagsToStringArray(tags)
    };
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function getTagName(tag) {
    return tag.id.replace("tag_", "");
}

function convertCheckedTagsToStringArray(tags) {
    let result = tags.filter((item) => (item.checked)).map((item) => (getTagName(item)));
    return result;
}

// Items list functions

function sortByLengthDescending(dataArray) {
    return dataArray.sort((first, second) => (second.length_in_metres - first.length_in_metres));
}

function calculateTotalPrice(dataArray) {
    return dataArray.reduce((acc, item) => (acc + item.price_in_uah), 0);
}

function searchItemsByValueInDecorType(dataArray, value, foundElements) {
    const foundItems = dataArray.filter((item) => {
        let fitElements = item.decor_type.filter((nestedItem) => nestedItem.includes(value));
        foundElements.push(fitElements);
        return fitElements.length;
    });
    return foundItems;
}

// Item form functions

function isCheckedRequredFields(dataArray) {
    let result = true;
    dataArray.forEach(item => {
        if (Array.isArray(item) && item.length > 0) {
            if (item.reduce((acc, current) => (acc + current.checked), 0) == 0) {
                showError(item[0], "At least one tag is required", true);
                result = false;
            }
        }
        else {
            if (item.value.trim() == 0) {
                showError(item, `${getFieldName(item)} is required`);
                result = false;
            }
        }
    });
    return result;
}

function showError(input, message, isNested = false) {
    let formControl = input.parentElement;
    if (isNested) {
        formControl = formControl.parentElement;
    }
    formControl.classList.add(ERROR_CLASS);
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function removeError(input, isNested = false) {
    let formControl = input.parentElement;
    if (isNested) {
        formControl = formControl.parentElement;
    }
    formControl.classList.remove(ERROR_CLASS);
}

export {
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
    getFieldName,
    getTagName,
    sortByLengthDescending,
    calculateTotalPrice,
    searchItemsByValueInDecorType,
    addItemToPage,
    createItem,
    updateItem
};