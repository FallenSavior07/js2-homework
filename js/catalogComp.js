'use strict';

const product = {
	props: ['product'],
	template: `
	<li class="products__item products-item">
		<img class="products-item__image" :src="product.img" alt="product.altForImg" width="300" height="300">
		<h3 class="products-item__title">{{product.product_name}}</h3>
		<div class="products-item__inner">
			<p class="products-item__price">{{product.price}} рублей</p>
			<button class="products-item__button buy-btn" type="button" @click="$root.$refs.cart.addProduct(product)">Купить</button>
		</div>
	</li>
    `
}

const products = {
	components: {
		product
	},
	data() {
		return {
			catalogUrl: '/catalogData.json',
			products: [],
			filteredProducts: [],
		}
	},
	mounted() {
		this.$parent.getJson(`${API + this.catalogUrl}`)
			.then(data => {
				for (let el of data) {
					el.img = `img/product-${el.id_product}.jpg`;
					el.altForImg = `product-${el.id_product}`;
					this.products.push(el);
					this.filteredProducts.push(el);
				}
				this.getSum();
			})
			.catch(error => {
				console.log(error);
				this.$parent.productDataError = true;
			});
	},
	methods: {
		filterProducts(searchLine) {
			const regexp = new RegExp(searchLine, 'i');
			this.filteredProducts = this.products.filter(product => {
				return regexp.test(product.product_name);
			})
		},
		getSum() {
			let sum = 0;
			this.products.forEach(product => {
				sum += product.price;
			});
			console.log(`Общая стоимость товаров в каталоге: ${sum} руб.`);
		},
	},
	template: `
	<section class="products products-container">
		<h2 class="products visually-hidden">Products</h2>
		<slot></slot>
		<p v-if="products.length == 0" class="products__warning">К сожалению, на ваш поисковый запрос товары не найдены.</p>
		<ul class="products__list">
			<product v-for="product of filteredProducts" :key="product.id_product" :product="product"></product>
		</ul>
	</section>
    `
};