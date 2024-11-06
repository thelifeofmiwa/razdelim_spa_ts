import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import type { IPerson } from "@/interfaces/interface";
import { computed, ref} from "vue";

export function usePersons() {
	const store = usePersonsAndProductsStore();
	const persons = computed(() => usePersonsAndProductsStore().persons);

	const formVisible = ref<boolean>(false);
	const newPersonName = ref<string>('');

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
		persons,
        formVisible,
        newPersonName,
        addPersonAndClearInput,
	};
}
