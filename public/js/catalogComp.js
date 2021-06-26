'use strict';

const product = {
	props: ['product'],
	template: `
	<li class="products__item products-item">
		<img class="products-item__image" :src="product.img" alt="product.altForImg" width="340" height="340">
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
			catalogIsEmpty: false,
		}
	},
	mounted() {
		this.$parent.getJson(`/api/products`)
			.then(data => {
				for (let el of data) {
					el.img = `img/product-${el.id_product}.jpg`;
					el.altForImg = `product-${el.id_product}`;
					this.products.push(el);
					this.filteredProducts.push(el);
				}
			})
			.catch(error => {
				console.log(error);
				this.$parent.productDataError = true;
				this.catalogIsEmpty = false;
			});
	},
	methods: {
		filterProducts(searchLine) {
			const regexp = new RegExp(searchLine, 'i');
			this.filteredProducts = this.products.filter(product => {
				return regexp.test(product.product_name);
			})
			if (this.filteredProducts.length == 0) {
				this.catalogIsEmpty = true;
			} else {
				this.catalogIsEmpty = false;
			}
		},
	},
	template: `
	<section class="products container">
		<h2 class="products visually-hidden">Products</h2>
		<slot></slot>
		<p v-if="catalogIsEmpty" class="products__warning">К сожалению, на ваш поисковый запрос товары не найдены.</p>
		<ul class="products__list">
			<product v-for="product of filteredProducts" :key="product.id_product" :product="product"></product>
		</ul>
		<button class="products__button" type="button">показать ещё</button>
	</section>
    `
};