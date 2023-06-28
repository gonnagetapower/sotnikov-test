export const sortBy = (type, items, setActiveFilter, setItems) => {
    let sorted = [...items].sort((a, b) => (a[type] < b[type] ? 1 : -1));
    if (sorted[0][type] === items[0][type]) {
        sorted = [...items].sort((a, b) => (a[type] < b[type] ? -1 : 1));
    }
    if (sorted[0][type] > sorted[sorted.length - 1][type]) {
        setActiveFilter(`By ${type} desc`);
    } else {
        setActiveFilter(`By ${type} asc`);
    }
    setItems(sorted);
};