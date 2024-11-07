<template>
	<h1>Итоги</h1>
	<PersonList :persons-array="result" />
</template>

<script setup lang="ts">
import { useResults } from "@/composables/useResults";
import PersonList from "./PersonList.vue";

const { result } = useResults();
</script>

<style scoped lang="scss"></style>
