<template>
	<h1>Персоны</h1>
	<h2>Нажмите на плюсик, чтобы добавить новую персону</h2>
	<div v-for="person in persons" :key="person.name">
		<div>{{ person.name }}</div>
	</div>
	<ProjectButton @click="formVisible = true" v-if="formVisible === false">+</ProjectButton>
	<div v-if="formVisible === true">
		<ProjectInput v-model="newPersonName" label="Введите имя" placeholder="Иван"></ProjectInput> 
		<ProjectButton @click="addPersonAndClearInput">Добавить</ProjectButton>
	</div>
</template>

<script setup lang="ts">
// import { usePersons } from "@/composables/usePersons";
import usePersonsAndProductsStore, {
	type IPerson,
} from "@/stores/usePersonsAndProductsStore";
import { computed, ref, type Ref } from "vue";
import ProjectButton from "./UI/ProjectButton.vue";
import ProjectInput from "./UI/ProjectInput.vue";

const store = usePersonsAndProductsStore();
const persons = computed(() => usePersonsAndProductsStore().persons);

// const { formVisible, newPersonName, addPersonAndClearInput } = usePersons(store); понять почему не работает хук

let formVisible: Ref<boolean> = ref(false);
const newPersonName = ref<string>('');

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
