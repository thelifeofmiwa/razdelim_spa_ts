<template>
    <h1>Персоны</h1>
    <h2>Нажмите на плюсик, чтобы добавить новую персону</h2>
	<PersonList :personsArray="persons"/>
    <ProjectButton @click="formVisible = true" v-if="formVisible === false"
        >+</ProjectButton
    >
    <div v-if="formVisible === true">
        <ProjectInput
            v-model="newPersonName"
            label="Введите имя"
            placeholder="Иван"
        ></ProjectInput>
        <ProjectButton @click="addPersonAndClearInput">Добавить</ProjectButton>
    </div>
</template>

<script setup lang="ts">
import { usePersons } from "@/composables/usePersons";
import ProjectButton from "./UI/ProjectButton.vue";
import ProjectInput from "./UI/ProjectInput.vue";
import PersonList from "./PersonList.vue";

const { persons, formVisible, newPersonName, addPersonAndClearInput } =
    usePersons();
</script>

<style scoped lang="scss"></style>
