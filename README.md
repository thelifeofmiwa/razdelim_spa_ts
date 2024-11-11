## Приложение "Разделим!"

Удобный способ разделить счёт в кофейне или кафе.

Приложение реализует функционал сайта для разделения счёта в заведении. Пользователь передаёт имена персон и продукты, счёт за которые нужно разделить, и в конце получает точную сумму долга. Пользователь может разделить сразу несколько чеков.

# Стек

1. Vue 3 (Composition API)
2. Vue Router (маршрутизация)
3. Pinia (State-менеджер)
4. Typescript
5. Vite (сборка приложения)
6. Vuetify (UI-библиотека)
7. SCSS (стилизация приложения)

# Интересные решения в проекте:

- Функционал приложения реализован в отдельных composable-функциях, что позволяет легко поддерживать и масштабировать приложение
- Использование State-менеджера вместе с composable-функциями позволяет компонентам не хранить в себе данные и логику по работе с ними, а только отображать их
- Часть контента страниц также была вынесена в отдельные компоненты, что позволяет легко масштабировать вёрстку

# Как запустить приложение? (Dev mode)

Понадобится npm(стандартный пакетный менеджер NodeJS)

```sh
npm install
npm run dev
```

Сначала устанавливаем зависимости, после чего запускаем приложение на localhost:5173