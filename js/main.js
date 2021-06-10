'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',

    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        cartProducts: [],
        filteredProducts: [],
        isVisibleCart: false,
        searchLine: '',
        productsEmpty: false,
        cartEmpty: false
    },

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartProducts.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({
                                quantity: 1
                            }, product);
                            this.cartProducts.push(prod)
                        }
                    }
                })
        },

        getSum() {
            let sum = 0;
            this.products.forEach(product => {
                sum += product.price;
            });
            console.log(`Общая стоимость товаров в каталоге: ${sum} руб.`);
        },

        filterProducts() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredProducts = this.products.filter(product => {
                return regexp.test(product.product_name);
            })
        },

        changeVisiblityOfCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },

        removeCartProduct(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            product.quantity--;
                        } else {
                            this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
                        }
                    }
                })
        },
    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
                this.getSum();
            });

        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartProducts.push(el);
                }
            });
    }
})