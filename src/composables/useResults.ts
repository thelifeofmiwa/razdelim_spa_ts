import type { IPerson, IProduct } from "@/interfaces/interface";
import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import { computed } from "vue";

export function useResults() {
	const store = usePersonsAndProductsStore();
	const persons = computed(() => store.persons);
	const products = computed(() => store.products);

	function findPersonCount(products: IProduct[]) {
		// Мапа для хранения долгов
		const debts: { [name: string]: number } = {};

		// Обрабатываем каждый продукт
		products.forEach((product) => {
			const { name, price, selectedBy, paidBy } = product;

			// Рассчитываем долю каждого, кто выбрал продукт
			const share = price / selectedBy.length;

			// Перебираем людей, которые выбрали продукт
			selectedBy.forEach((person) => {
				if (person !== paidBy) {
					// Этот человек должен выплатить свою долю за продукт
					debts[person] -= share; // Он должен эту сумму
				}
			});

			// Человек, который оплатил продукт, получает деньги
			debts[paidBy] += price; // Он получил всю сумму
		});

		// Возвращаем итоговые долги
		return debts;
	}
}
