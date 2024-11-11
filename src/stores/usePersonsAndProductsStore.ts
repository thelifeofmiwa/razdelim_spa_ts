import { defineStore } from "pinia";
import type { IPerson } from "@/interfaces/interface";
import type { IProduct } from "@/interfaces/interface";

const usePersonsAndProductsStore = defineStore('persons', {
    state: () => ({
            persons: [] as IPerson[], //массив персон
            products: [] as IProduct[], //массив продуктов
    }),
    actions: {
        addNewPerson(newPerson: IPerson) : void{ //метод для добавления новой персоны
            this.persons.push(newPerson);
        },
        addNewProduct(newProduct: IProduct): void { //метод для добавления нового продукта
            this.products.push(newProduct);
        }
    }
});

export default usePersonsAndProductsStore;