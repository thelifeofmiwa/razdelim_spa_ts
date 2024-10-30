import { defineStore } from "pinia";

export interface IPerson {
    name: string,
    count: number,
    selectedProducts: string[]
}

export interface IProduct {
    name: string,
    price: number,
    selectedBy: string[],
    paidBy: string | null
}

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