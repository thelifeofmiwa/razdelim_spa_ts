<template>
	<h1>Итоги</h1>
	<div v-for="person in result" :key="person.name">
		{{ person.name }} - {{ person.count }}
	</div>
</template>

<script setup lang="ts">
import { useResults } from "@/composables/useResults";

const { result } = useResults();
</script>

<style scoped lang="scss"></style>
