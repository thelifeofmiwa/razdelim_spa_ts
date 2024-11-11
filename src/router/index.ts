import PersonsPage from "@/pages/PersonsPage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";
import ResultPage from "@/pages/ResultPage.vue";
import StartPage from "@/pages/StartPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [ //описание маршрутов роутера
        {
            path: "/",
            name: "startPage",
            component: StartPage,
        },
        {
            path: '/persons',
            name: 'personsPage',
            component: PersonsPage
        },
        {
            path: "/products",
            name: "productsPage",
            component: ProductsPage,
        },
        {
            path: "/result",
            name: "resultPage",
            component: ResultPage,
        },
    ],
});

export default router;
