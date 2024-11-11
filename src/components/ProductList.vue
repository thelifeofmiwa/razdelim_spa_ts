<template>
    <div class="products" v-for="product in props.products" :key="product.name">
        <!--С помощью директивы v-for итерируемся по массиву products-->
        <ProjectSelect
            v-model="product.paidBy"
            :itemsProp="arrayToString(persons)"
        ></ProjectSelect>
        <!--С помощью v-model связываем значение селекта и поля продукта paidBy; так же передаём в селект массив имён из массива products-->
        {{ product.name }} - {{ product.price }}
        <div class="payers" v-for="person in props.persons" :key="person.name">
            <ProjectButton v-if="!person.selectedProducts.includes(product.name)" @click="selectProduct(person, product)">
                <!--Используем метод selectProduct для записи имени продукта и покупателя в сооответствующие поля массивов-->
                {{ person.name }}
            </ProjectButton>
            <ProjectButton v-if="person.selectedProducts.includes(product.name)" @click="selectProduct(person, product)">
                {{ person.name }} <span>(Выбран)</span>
            </ProjectButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProjectButton from "./UI/ProjectButton.vue";
import ProjectSelect from "./UI/ProjectSelect.vue";
import { useProducts } from "@/composables/useProducts";
import type { IPerson, IProduct } from "@/interfaces/interface";

const props = defineProps<{
    products: IProduct[];
    persons: IPerson[];
}>();

const { arrayToString, selectProduct } = useProducts();
</script>

<style scoped lang="scss">
.products {
    margin-top: 10px;
    padding: 20px;
    border: 2px solid black;
    border-radius: 3px;
    .payers {
        margin-top: 10px;
    }
}
</style>
