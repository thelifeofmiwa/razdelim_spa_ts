import type { IPerson } from "@/stores/usePersonsAndProductsStore";
import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import { ref, type ModelRef, type Ref } from "vue";


export function usePersons(){

    const store = usePersonsAndProductsStore();

    let formVisible: Ref<boolean> = ref(false);
    const newPersonName: ModelRef<string> = defineModel("");

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