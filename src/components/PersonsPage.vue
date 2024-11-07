<template>
    <h1>Персоны</h1>
    <h2>Нажмите на плюсик, чтобы добавить новую персону</h2>
	<PersonList :personsArray="persons"/> <!--Импортируем форму для отображения персон из компонента PersonList и передаём через пропс массив persons-->
    <ProjectButton @click="formVisible = true" v-if="formVisible === false" 
        >+</ProjectButton
    >                    <!--Импортируем кнопку из компонента ProjectButton и с помощью директив v-on и v-if влияем на условия видимости формы и кнопки -->
    <div v-if="formVisible === true"> <!--В контейнер импортируем инпут из компонента ProjectInput и связываем его значение с дерективой newPersonName через директиву v-model -->
        <ProjectInput
            v-model="newPersonName" 
            label="Введите имя"
            placeholder="Иван"
        ></ProjectInput>
        <ProjectButton @click="addPersonAndClearInput">Добавить</ProjectButton><!--Так же импортируем кнопку и при клике добавляем новую персону в массив persons-->
    </div>
</template>

<script setup lang="ts">
import { usePersons } from "@/composables/usePersons";
import ProjectButton from "./UI/ProjectButton.vue";
import ProjectInput from "./UI/ProjectInput.vue";
import PersonList from "./PersonList.vue";

const { persons, formVisible, newPersonName, addPersonAndClearInput } =
    usePersons(); //деструктуризируем объект, возвращаемый composable-функцией usePersons
</script>

<style scoped lang="scss"></style>
