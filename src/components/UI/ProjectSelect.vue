<template>
    <v-select
    variant="solo"
    :items="itemsProp"
    >

    </v-select>
</template>

<script setup lang="ts">
const props = defineProps({
    itemsProp: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>

</style>