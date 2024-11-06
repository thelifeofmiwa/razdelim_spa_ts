import { defineStore } from "pinia";
import type { IPerson } from "@/interfaces/interface";
import type { IProduct } from "@/interfaces/interface";

const usePersonsAndProductsStore = defineStore('persons', {
    state: () => ({
            persons: [] as IPerson[],
            products: [] as IProduct[],
    }),
    actions: {
        addNewPerson(newPerson: IPerson) : void{
            this.persons.push(newPerson);
        },
        addNewProduct(newProduct: IProduct): void {
            this.products.push(newProduct);
        }
    }
});

export default usePersonsAndProductsStore;