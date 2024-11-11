<template>
    <v-select
    variant="underlined"
    label="Кто оплатил продукт?"
    width="400"
    :items="props.itemsProp"
    >

    </v-select>
</template>

<script setup lang="ts">



const props = defineProps<{
    itemsProp: string[]
}>();

</script>

<style scoped>

</style>