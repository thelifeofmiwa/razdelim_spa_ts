<template>
	<h1>Персоны</h1>
	<h2>Нажмите на плюсик, чтобы добавить новую персону</h2>
	<div v-for="person in persons" :key="person.name">
		<div>{{ person.name }}</div>
	</div>
	<button @click="formVisible = true">+</button>
	<div v-if="formVisible === true">
		<input type="text" v-model="newPersonName" />
		<button @click="addPersonAndClearInput">Добавить</button>
	</div>
</template>

<script setup lang="ts">
import { usePersons } from "@/composables/usePersons";
import usePersonsAndProductsStore, {
	type IPerson,
} from "@/stores/usePersonsAndProductsStore";
import { computed, ref, type ModelRef, type Ref } from "vue";

const store = usePersonsAndProductsStore();
const persons = computed(() => usePersonsAndProductsStore().persons);

// const { formVisible, newPersonName, addPersonAndClearInput } = usePersons(store);

let formVisible: Ref<boolean> = ref(false);
const newPersonName: any = defineModel("");

function addPersonAndClearInput() {
	const person: IPerson = {
		name: newPersonName.value,
		count: 0,
		selectedProducts: [],
	};
	store.addNewPerson(person);
	newPersonName.value = "";
    formVisible.value = false;
}
</script>

<style scoped lang="scss"></style>
