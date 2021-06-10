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
        productsEmpty: false
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
            console.log(product.id_product);
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
            if (!this.filteredProducts.length == 0) {
                this.productsEmpty = false;
            } else {
                this.productsEmpty = true;
            }
        },

        changeVisiblityOfCart() {
            this.isVisibleCart = !this.isVisibleCart;
        }
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