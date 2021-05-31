'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products__list') {
        this.container = container;
        this.products = [];
        this.getProducts()
            .then(data => {
                this.products = [...data];
                this.render();
                this.getSum();
            });
    }

    getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    getSum() {
        let sum = 0;
        this.products.forEach(product => {
            sum += product.price;
        });
        console.log(`Общая стоимость товаров на странице: ${sum} руб.`);
    }

    render() {
        const block = document.querySelector(this.container);
        this.products.forEach(product => {
            const productObj = new ProductsItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        });
    }
}

class ProductsItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<li class="products__item products-item">
                    <img class="products-item__image" src="img/product-${this.id}.jpg" alt="product-${this.id}" width="300" height="300">
                    <h3 class="products-item__title">${this.title}</h3>
                    <div class="products-item__inner">
                        <p class="products-item__price">${this.price} рублей</p>
                        <button class="products-item__button buy-btn" type="button">Купить</button>
                    </div>
                </li>`;
    }
}

class Cart {
    constructor() {}

    clearList() {}

    getCount() {}

    getSum() {}

    render() {}
}

// наследование и переопределение конструктора - предположение, не утверждение
class CartItem extends ProductsItem {
    constructor(product, count = 1) {
        super(product);
        this.count = count;
    }

    changeCount() {}

    removeItem() {}

    addToFav() {}

    render() {}
}

let list = new ProductsList();