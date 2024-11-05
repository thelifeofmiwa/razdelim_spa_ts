import type { IPerson } from "@/stores/usePersonsAndProductsStore";
import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import type { Store } from "pinia";
import { ref, type ModelRef, type Ref } from "vue";


export function usePersons(store: any){
    let formVisible: Ref<boolean> = ref(false);
    const newPersonName: any = defineModel("");

    function addPersonAndClearInput() {
        const person: IPerson = {
            name: newPersonName.value,
            count: 0,
            selectedProducts: [],
        };
        store.addNewPerson(person);
        newPersonName.value = "";
        formVisible.value = false;
    }

    return {
        formVisible,
        newPersonName,
        addPersonAndClearInput
    }
}