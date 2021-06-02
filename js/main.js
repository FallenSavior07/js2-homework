'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products__list') {
        this.container = container;
        this.goods = [];
        this.products = [];
    }

    getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.goods = [...data];
                this.render();
            })
            .catch(error => {
                console.log(error);
            })
    }

    getSum() {
        let sum = 0;
        this.products.forEach(product => {
            sum += product.price;
        });
        console.log(`Общая стоимость товаров в каталоге: ${sum} руб.`);
    }

    render() {
        const block = document.querySelector(this.container);
        this.goods.forEach(product => {
            const productObj = new ProductsItem(product);
            this.products.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        });
    }
}

class ProductsItem {
    constructor(product) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
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
    constructor(container = '.cart__list') {
        this.container = container;
        this.amount = 0;
        this.countGoods = 0;
        this.goods = [];
        this.products = [];
    }

    getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this.goods = data.contents;
                this.render();
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        this.goods.forEach(product => {
            const productObj = new CartItem(product);
            this.products.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        })
    }

    // clearList() {}

    // getCount() {}
}

class CartItem extends ProductsItem {
    constructor(product) {
        super(product);
        this.quantity = product.quantity;
    }

    render() {
        return `<li class="cart__item cart-item">
                    <img class="cart-item__image" src="img/product-${this.id}.jpg" alt="mouse" width="100" height="100">
                    <div class="cart-item__inner">
                        <h3 class="cart-item__name">${this.title}</h3>
                        <button class="cart-item__button" type="button">
                            <svg class="cart-item__icon" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" />
                            </svg>
                        </button>
                        <ul class="cart-item__list">
                            <li class="cart-item__item">${this.price} рублей</li>
                            <li class="cart-item__item">Количество: ${this.quantity}</li>
                        </ul>
                </li>`;
    }

    // changeCount() {}

    // removeItem() {}

    // addToFav() {}
}

let list = new ProductsList();
list.getProducts()
    .then(() => list.getSum());

let cart = new Cart();
cart.getProducts();

let cartButton = document.querySelector('.header__button');
let cartList = document.querySelector('.header__cart');

cartButton.addEventListener('click', () => {
    cartList.classList.toggle('hidden');
})