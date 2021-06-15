'use strict';

Vue.component('products', {
	props: ['products'],
	template: `
	<section class="products products-container">
		<h2 class="products visually-hidden">Products</h2>
		<p v-if="products.length == 0" class="products__warning">К сожалению, на ваш поисковый запрос товары не найдены.</p>
		<ul class="products__list">
			<products-item v-for="product of products" :key="product.id_product" :products-item="product"></products-item>
		</ul>
	</section>
    `
});

Vue.component('products-item', {
	props: ['productsItem'],
	template: `
	<li class="products__item products-item">
		<img class="products-item__image" :src="productsItem.img" alt="productsItem.altForImg" width="300" height="300">
		<h3 class="products-item__title">{{productsItem.product_name}}</h3>
		<div class="products-item__inner">
			<p class="products-item__price">{{productsItem.price}} рублей</p>
			<button class="products-item__button buy-btn" type="button" @click="$root.addProduct(productsItem)">Купить</button>
		</div>
	</li>
    `
})