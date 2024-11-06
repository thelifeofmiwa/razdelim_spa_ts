import usePersonsAndProductsStore, {
    type IPerson,
    type IProduct,
} from "@/stores/usePersonsAndProductsStore";
import { computed, ref } from "vue";

export function useProducts() {
    const store = usePersonsAndProductsStore();
    const persons = computed(() => store.persons);
    const products = computed(() => store.products);

    const productName = ref<string>("");
    const productPrice = ref<string>("");
    let formVisible = ref<boolean>(false);

    function addNewProductAndClearInput() {
        const newProduct: IProduct = {
            name: productName.value,
            price: Number(productPrice.value),
            selectedBy: [],
            paidBy: null,
        };
        store.addNewProduct(newProduct);
        productName.value = "";
        productPrice.value = "";
        formVisible.value = false;
    }

    function selectProduct(person: IPerson, product: IProduct) {
        person.selectedProducts.push(product.name);
        product.selectedBy.push(person.name);
    }

    return {
        persons,
        products,
        productName,
        productPrice,
        formVisible,
        addNewProductAndClearInput,
        selectProduct,
    };
}
