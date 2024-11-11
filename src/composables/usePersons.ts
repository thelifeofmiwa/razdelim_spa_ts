import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import type { IPerson } from "@/interfaces/interface";
import { computed, ref} from "vue";
import { useRouter } from "vue-router";

export function usePersons() {
	const store = usePersonsAndProductsStore();	//инициализируем хранилище usePersonsAndProducts
	const persons = computed(() => usePersonsAndProductsStore().persons); //инициализируем массив persons из хранилища

	const formVisible = ref<boolean>(false); //реактивная переменная, отвечающая за видимость формы добавления персон
	const newPersonName = ref<string>(''); //реактивная переменная, связанная с инпутом в форме

	const router = useRouter(); // переменная для работы с Vue Router

	function addPersonAndClearInput() {  //модифицированный метод хранилица addNewPerson
		if(newPersonName.value){ // проверка на пустую строку в инпуте newPersonName
			const person: IPerson = {	//описываем переменную в соответствие с интерфейсом IPerson
				name: newPersonName.value,
				count: 0,
				selectedProducts: [],
				debts: []
			};
			store.addNewPerson(person); //используем метод хранилища
			newPersonName.value = ""; //обнуляем значение реактивной переменной 
			formVisible.value = false; //скрываем форму
		} else {
			alert('Введите имя персоны!')
		}
	}


function goToNextPage(){
    if(persons.value.length > 0){
        router.push({path: '/products'})
    } else{
        alert('Добавьте хотя бы одну персону')
    }
}

	return {	//возвращаем из функции все необходимые для компонента данные
		persons,
        formVisible,
        newPersonName,
        addPersonAndClearInput,
		goToNextPage
	};
}
