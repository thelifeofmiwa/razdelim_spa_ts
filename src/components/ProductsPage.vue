<template>
	<h1>Продукты</h1>
	<h2>Добавьте продукты, цену которых нужно разделить</h2>
	<div v-for="product in products" :key="product.name">
		{{ product.name }} - {{ product.price }}
		<div v-for="person in persons" :key="person.name">
			<ProjectButton @click="selectProduct(person, product)">
				{{ person.name }}
			</ProjectButton>
		</div>
	</div>

	<ProjectButton @click="formVisible = true" v-if="formVisible === false"
		>+</ProjectButton
	>

	<div v-if="formVisible === true">
		<ProjectInput
			v-model="productName"
			label="Введите название продукта"
			placeholder="Пицца 4 сыра"
		/>
		<ProjectInput
			v-model="productPrice"
			label="Введите цену продукта"
			placeholder="700"
		/>
		<ProjectButton @click="addNewProductAndClearInput"
			>Добавить</ProjectButton
		>
	</div>
</template>

<script setup lang="ts">
import ProjectButton from "./UI/ProjectButton.vue";
import ProjectInput from "./UI/ProjectInput.vue";
import { useProducts } from "@/composables/useProducts";

const {
	persons,
	products,
	productName,
	productPrice,
	formVisible,
	addNewProductAndClearInput,
	selectProduct,
} = useProducts();
</script>

<style scoped lang="scss"></style>
