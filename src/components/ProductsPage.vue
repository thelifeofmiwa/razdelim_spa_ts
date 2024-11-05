<template>
	<h1>Продукты</h1>
	<h2>Добавьте продукты, цену которых нужно разделить</h2>
	<div v-for="product in products" :key="product.name">
		{{ product.name }} - {{ product.price }}
		<div v-for="person in persons" :key="person.name">
			<button @click="selectProduct(person, product)">
				{{ person.name }}
			</button>
		</div>
	</div>

        <button @click="formVisible = true" v-if="formVisible === false">
            +
        </button>
	<div v-if="formVisible === true">
		<input type="text" v-model="productName" />
		<input type="text" v-model="productPrice" />
		<button @click="addNewProductAndClearInput">+</button>
	</div>
</template>

<script setup lang="ts">
import usePersonsAndProductsStore, {
	type IPerson,
	type IProduct,
} from "@/stores/usePersonsAndProductsStore";
import { computed, ref } from "vue";

const store = usePersonsAndProductsStore();
const persons = computed(() => store.persons);
const products = computed(() => store.products);

const productName = ref<string>("");
const productPrice = ref<number>();
let formVisible = ref<boolean>(false);

function personsToNameArray(objArray: IPerson[]) {
	return objArray.map((obj) => obj.name);
}
function addNewProductAndClearInput() {
	const newProduct: IProduct = {
		name: productName.value,
		price: Number(productPrice.value),
		selectedBy: [],
		paidBy: null,
	};
	store.addNewProduct(newProduct);
	productName.value = "";
	productPrice.value = 0;
	formVisible.value = false;
}
function selectProduct(person: IPerson, product: IProduct) {
	person.selectedProducts.push(product.name);
	product.selectedBy.push(person.name);
}
</script>

<style scoped lang="scss"></style>
