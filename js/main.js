'use strict';

class ProductsList {
    constructor(container = '.products__list') {
        this.container = container;
        this.products = [];
        this.fetchProducts();
    }

    fetchProducts() {
        this.products = [{
                id: 1,
                title: 'Notebook',
                price: 80000,
            },
            {
                id: 2,
                title: 'Mouse',
                price: 3000
            },
            {
                id: 3,
                title: 'Keyboard',
                price: 6000
            },
            {
                id: 4,
                title: 'Gamepad',
                price: 4000
            },
        ];
    }

    getSum() {
        let sum = 0;
        this.products.forEach(product => {
            sum += product.price;
        });
        console.log(sum);
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
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
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
list.render();
list.getSum();