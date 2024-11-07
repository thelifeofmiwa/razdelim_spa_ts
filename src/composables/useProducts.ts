import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import type { IPerson, IProduct } from "@/interfaces/interface";
import { computed, ref } from "vue";

export function useProducts() {
    const store = usePersonsAndProductsStore(); //инициализируем хранилище
    const persons = computed(() => store.persons); // инициализируем массивы persons и products из хранилища
    const products = computed(() => store.products);

    const productName = ref<string>(""); //реактивная переменная, связанная с первым инпутом формы
    const productPrice = ref<string>(""); //реактивная переменная, связанная со вторым инпутом формы
    let formVisible = ref<boolean>(false);//реактивная переменная, отвечающая за видимость формы добавления продуктов

    function addNewProductAndClearInput() { //модифицируем метод хранилища addNewProduct
        const newProduct: IProduct = { // описываем переменную в соответствие с интерфейсом IProduct
            name: productName.value,
            price: Number(productPrice.value),
            selectedBy: [],
            paidBy: '',
        };
        store.addNewProduct(newProduct); // используем метоод хранилища
        productName.value = ""; //обнуляем значения в реактивных переменных
        productPrice.value = "";
        formVisible.value = false; //скрываем форму
    }

    function selectProduct(person: IPerson, product: IProduct) { //создаём метод для изменения полей selectedProducts и selectedBy
        person.selectedProducts.push(product.name);
        product.selectedBy.push(person.name);
    }

    function arrayToString(personsArray: IPerson[]){ // создаём метод для преобразования массива persons в массив строк из поля объекта
        return personsArray.map((person)=> person.name)
    }

    return {    //возвращаем из функции все необходимые для компонента данные
        persons,
        products,
        productName,
        productPrice,
        formVisible,
        addNewProductAndClearInput,
        selectProduct,
        arrayToString
    };
}
