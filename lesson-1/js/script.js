const products = [
    {id: 1, title: 'Notebook', price: 80000},
    {id: 2, title: 'Mouse', price: 3000},
    {id: 3, title: 'Keyboard', price: 6000},
    {id: 4, title: 'Gamepad', price: 4000},
];

//Функция для формирования верстки каждого товара
const renderProduct = obj => {
    return `<li class="products__item products-item">
                <img class="products-item__image" src="img/product-${obj.id}.jpg" alt="product-${obj.id}" width="300" height="300">
                <h3 class="products-item__title">${obj.title}</h3>
                <div class="products-item__inner">
                    <p class="products-item__price">${obj.price} рублей</p>
                    <button class="products-item__button buy-btn" type="button">Купить</button>
                </div>
            </li>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    const joinProductsList = productsList.join('');
    document.querySelector('.products__list').innerHTML = joinProductsList;
};

renderPage(products);