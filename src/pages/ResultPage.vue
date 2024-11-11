<template>
    <div id="result__page">
        <h1>Итоги</h1>
        <div class="debt__list"> <!--Блок с общими данными по долгам-->
            <h2>Кто кому должен?</h2>
            <div v-for="person in debts" :key="person.count">
                <div class="debt__names">
                    <b>{{ person.name }}</b>  должен ...
                    <div v-if="person.debts.length > 0">
                        <div
                            v-for="debt in person.debts"
                            :key="debt.personName"
                        >
                            {{ debt.personName }} - {{ debt.amount }}
                        </div>
                    </div>
                    <div v-else>а ничего и не должен!</div>
                </div>
            </div>
        </div>
        <ProjectButton class="opt" @click="showAndHide" v-show="formVisible === false">Подробнее</ProjectButton> <!--две кнопки; одна отвечает за открытие, вторая за сокрытие формы-->
        <ProjectButton class="opt" @click="showAndHide" v-show="formVisible === true">Скрыть</ProjectButton>
        <div class="debt__target" v-if="formVisible === true"> <!-- Блок с детализацией долга -->
            <h2>Детализация долгов</h2>
            <div v-for="person in debts">
                <div v-if="person.debts.length > 0">
                    {{ person.name }} должен за
                    <div
                        v-for="product in person.selectedProducts"
                        :key="product"
                    >
                        {{ product }}
                    </div>
                    <div v-for="debt in person.debts" :key="debt.personName">
                        {{ debt.amount }} - {{ debt.personName }}
                    </div>
                </div>
            </div>
        </div> 
        <ProjectButton class="button" @click="countAgain"
            >Посчитать снова!</ProjectButton
        > <!-- Кнопка, обнуляющая данные -->
    </div>
</template>

<script setup lang="ts">
import ProjectButton from "@/components/UI/ProjectButton.vue";
import { useResults } from "@/composables/useResults";

const { debts,formVisible, showAndHide, countAgain } = useResults(); //деструктуризируем данные, возвращаемые композабл-функцией useResult

</script>

<style scoped lang="scss">
#result__page{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgb(201, 223, 223);

    .opt{
        position: sticky;
    }
    .debt__list{
        padding: 20px;
    }

    .debt__names{
        margin: 10px;
    }
    .button{
        margin-top: 20px;
    }
}
</style>
