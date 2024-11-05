import usePersonsAndProductsStore, {
	type IPerson,
} from "@/stores/usePersonsAndProductsStore";
import { computed, ref, type Ref } from "vue";

export function usePersons() {
	const store = usePersonsAndProductsStore();
	const persons = computed(() => usePersonsAndProductsStore().persons);

	const formVisible = ref<boolean>(false);
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
        store,
		persons,
        formVisible,
        newPersonName,
        addPersonAndClearInput,
	};
}
