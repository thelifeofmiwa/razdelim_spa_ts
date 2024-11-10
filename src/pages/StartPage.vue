<template>
    <div id="start">
        <div class="content">
            <header class="header">
                <h1>Разделим!</h1>
                <h2>Удобный способ разделить счёт в кофейне или кафе</h2>
            </header>
            <!-- Самая обычная HTML-вёрстка. Фактически, помимо текста, на странице отсутствует контент, поэтому было принято решение оставить её без декомпозиции.
		 	 Потенциально, можно использовать пропсы для передачи контента тегов, но зачем усложнять то, что должно выглядеть просто? :) -->
            <div class="description">
                <p>
                    "Разделим" - самый простой и приятный способ оставить от
                    прошедшего вечера только приятные впечатления! Укажите
                    <b>друзей</b> и <b>цену</b> позиции, а мы посчитаем всё за
                    вас!
                </p>
            </div>
            <div class="button">
                <ProjectButton @click="$router.push('/persons')"
                    >Начать!</ProjectButton
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProjectButton from "@/components/UI/ProjectButton.vue";
</script>

<style scoped lang="scss">
#start {
    height: 100vh;
    background-color: rgb(201, 223, 223);
    display: flex;
    align-items: center;
    justify-content: center;

    .header {
        text-align: center;
    }
    .description {
        margin-top: 15px;
        width: 600px;
        height: 100px;
        text-align: justify;
    }
    .button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
