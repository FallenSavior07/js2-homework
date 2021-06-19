'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',

    data: {
        productDataError: false,
        cartDataError: false
    },

    components: {
        cart,
        dataError,
        products,
        search
    },

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
        },
    },
})