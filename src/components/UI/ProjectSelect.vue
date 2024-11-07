<template>
    <v-select
    variant="solo"
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