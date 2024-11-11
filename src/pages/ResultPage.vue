<template>
    <div id="result__page">
        <h1>Итоги</h1>
        <div class="debt__list">
            <h2>Кто кому должен?</h2>
            <div v-for="person in debts" :key="person.count">
                <div>
                    {{ person.name }} должен ...
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
        <ProjectButton class="opt" @click="showAndHide" v-show="formVisible === false">Подробнее</ProjectButton>
        <ProjectButton class="opt" @click="showAndHide" v-show="formVisible === true">Скрыть</ProjectButton>
        <div class="debt__target" v-if="formVisible === true">
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
        <ProjectButton class="button" @click="$router.push('/persons'); store.$reset()"
            >Посчитать снова!</ProjectButton
        >
    </div>
</template>

<script setup lang="ts">
import ProjectButton from "@/components/UI/ProjectButton.vue";
import { useResults } from "@/composables/useResults";
import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";

const store = usePersonsAndProductsStore();
const { debts,formVisible, showAndHide } = useResults();

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
        padding: 30px;
    }

    .button{
        margin-top: 20px;
    }
}
</style>
