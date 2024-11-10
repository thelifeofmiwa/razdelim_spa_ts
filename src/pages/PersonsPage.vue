<template>
    <div id="persons__page">
        <h1>Персоны</h1>
        <h2>Нажмите на плюсик, чтобы добавить новую персону</h2>
         <PersonList  :personsArray="persons" />

        <!--Импортируем форму для отображения персон из компонента PersonList и передаём через пропс массив persons-->
        <ProjectButton class="button" @click="formVisible = true" v-if="formVisible === false"
            >+</ProjectButton
        >
        <!--Импортируем кнопку из компонента ProjectButton и с помощью директив v-on и v-if влияем на условия видимости формы и кнопки -->
        <div class="new__person" v-if="formVisible === true">
            <!--В контейнер импортируем инпут из компонента ProjectInput и связываем его значение с дерективой newPersonName через директиву v-model -->
            <ProjectInput
                v-model="newPersonName"
                label="Введите имя"
                placeholder="Иван"
            ></ProjectInput>
            <ProjectButton  @click="addPersonAndClearInput"
                >Добавить</ProjectButton
            ><!--Так же импортируем кнопку и при клике добавляем новую персону в массив persons-->
        </div>
        <ProjectButton class="button" @click="$router.push('/products')"
            >Продолжить</ProjectButton
        >
    </div>
</template>

<script setup lang="ts">
import { usePersons } from "@/composables/usePersons";
import ProjectButton from "@/components/UI/ProjectButton.vue";
import ProjectInput from "@/components/UI/ProjectInput.vue";
import PersonList from "@/components/PersonList.vue";

const { persons, formVisible, newPersonName, addPersonAndClearInput } =
    usePersons(); //деструктуризируем объект, возвращаемый composable-функцией usePersons
</script>

<style scoped lang="scss">
#persons__page {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgb(201, 223, 223);

    .persons {
        padding: auto;
        border-radius: 3px;

        .person__list {
            margin: 10px 10px;
            padding: 5px;
        }
    }
    .new__person {
        margin: 10px;
    }
    .button {
        margin-top: 10px;
    }
}
</style>
