<template>
    <div id="products__page">
        <h1>Продукты</h1>
        <h2>Добавьте продукты, цену которых нужно разделить</h2>

        <ProductList :persons="persons" :products="products" />

        <ProjectButton
            class="add"
            @click="formVisible = true"
            v-if="formVisible === false"
            >+</ProjectButton
        >

        <div class="add_product" v-if="formVisible === true">
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
            <ProjectButton class="add" @click="addNewProductAndClearInput"
                >Добавить</ProjectButton
            >
        </div>
        <ProjectButton class="next" @click="$router.push('/result')"
            >К результатам!</ProjectButton
        >
    </div>
</template>

<script setup lang="ts">
import ProductList from "@/components/ProductList.vue";
import ProjectButton from "@/components/UI/ProjectButton.vue";
import ProjectInput from "@/components/UI/ProjectInput.vue";
import { useProducts } from "@/composables/useProducts";

const {
    persons,
    products,
    productName,
    productPrice,
    formVisible,
    addNewProductAndClearInput,
} = useProducts();
</script>

<style scoped lang="scss">
#products__page {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgb(201, 223, 223);

    .products {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid black;
    }
    .add {
        margin-top: 15px;
    }
    .add_product {
        margin-top: 20px;
    }
    .payers {
        margin-top: 10px;
    }
    .next {
        margin-top: 10px;
    }
}
</style>
