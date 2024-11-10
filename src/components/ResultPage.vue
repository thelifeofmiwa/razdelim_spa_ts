<template>
    <h1>Итоги</h1>
    <div class="debt__list">
        <h2>Кто кому должен?</h2>
        <div v-for="person in debts" :key="person.count">
            <div>
                {{ person.name }} должен ...
                <div v-if="person.debts.length > 0">
                    <div v-for="debt in person.debts" :key="debt.personName">
                        {{ debt.personName }} - {{ debt.amount }}
                    </div>
                </div>
                <div v-else>а ничего и не должен!</div>
            </div>
        </div>
    </div>
    <div class="debt__target">
        <h2>Детализация долгов</h2>
        <div v-for="person in debts">
            <div v-if="person.debts.length > 0">
                {{ person.name }} должен за
                <div v-for="product in person.selectedProducts" :key="product">
                    {{ product }}
                </div>
                <div v-for="debt in person.debts" :key="debt.personName">
                    {{ debt.amount }} - {{ debt.personName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useResults } from "@/composables/useResults";

const { debts } = useResults();
</script>

<style scoped lang="scss"></style>
