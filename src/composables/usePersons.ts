import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import type { IPerson } from "@/interfaces/interface";
import { computed, ref} from "vue";

export function usePersons() {
	const store = usePersonsAndProductsStore();	//инициализируем хранилище usePersonsAndProducts
	const persons = computed(() => usePersonsAndProductsStore().persons); //инициализируем массив persons из хранилища

	const formVisible = ref<boolean>(false); //реактивная переменная, отвечающая за видимость формы добавления персон
	const newPersonName = ref<string>(''); //реактивная переменная, связанная с инпутом в форме

	function addPersonAndClearInput() {  //модифицированный метод хранилица addNewPerson
		const person: IPerson = {	//описываем переменную в соответствие с интерфейсом IPerson
			name: newPersonName.value,
			count: 0,
			selectedProducts: [],
		};
		store.addNewPerson(person); //используем метод хранилища
		newPersonName.value = ""; //обнуляем значение реактивной переменной 
		formVisible.value = false; //скрываем форму
	}

	return {	//возвращаем из функции все необходимые для компонента данные
		persons,
        formVisible,
        newPersonName,
        addPersonAndClearInput,
	};
}
