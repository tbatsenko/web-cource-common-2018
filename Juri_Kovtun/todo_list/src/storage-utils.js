let itemData = [];

const storeItem = function(item) {
    itemData.push(item);
    console.log(itemData);
};

const removeFromStorage = function(item) {
    const i = itemData.indexOf(item);
    itemData.splice(i, 1);
    console.log(itemData);
};

export {itemData, storeItem, removeFromStorage}