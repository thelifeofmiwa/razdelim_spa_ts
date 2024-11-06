<template>
    <div v-for="person in props.personsArray" :key="person.name">
        {{ person.name }}
    </div>
</template>

<script setup lang="ts">
import type { IPerson } from '@/stores/usePersonsAndProductsStore';

const props = defineProps<{
    personsArray: IPerson[]
}>();

</script>

<style scoped>

</style>