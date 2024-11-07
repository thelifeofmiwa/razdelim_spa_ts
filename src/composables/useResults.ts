import type { IPerson, IProduct } from "@/interfaces/interface";
import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import { computed } from "vue";

export function useResults() {
	const store = usePersonsAndProductsStore();
	const persons = computed(() => store.persons);
	const products = computed(() => store.products);

	const result = computed(() =>
		findPersonsCount(persons.value, products.value)
	);

	function findPersonsCount(persons: IPerson[], products: IProduct[]) {
		persons.forEach((person) => {
			person.count = 0;
		});
		products.forEach((product) => {
			if (product.selectedBy.length > 0) {
				const share = Number(
					(
						product.price /
						product.selectedBy.length
					).toFixed(2)
				);
				product.selectedBy.forEach((selectedBy) => {
					const person = persons.find(
						(p) => p.name === selectedBy
					);
					if (person) {
						if (
							!product.paidBy.includes(
								person.name
							)
						) {
							person.count += share;
						}
					}
				});
			}
		});

		return persons;
	}

	return {
		result,
	};
}

// // Теперь учитываем взаимные долги
// const debtMap: { [key: string]: number } = {};
// // Заполняем карту долгов
// persons.forEach((person) => {
// 	debtMap[person.name] = person.count; // Сохраняем текущие долги
// });
// // Учтем взаимные долги
// const finalDebts: { [key: string]: number } = {};
// for (const personName in debtMap) {
// 	const debt = debtMap[personName];
// 	if (!finalDebts[personName]) {
// 		finalDebts[personName] = 0; // Инициализируем финальный долг
// 	}
// 	persons.forEach((otherPerson) => {
// 		if (
// 			otherPerson.name !== personName &&
// 			debtMap[otherPerson.name] > 0
// 		) {
// 			const mutualDebt = Math.min(
// 				debt,
// 				debtMap[otherPerson.name]
// 			);
// 			finalDebts[personName] += mutualDebt; // Увеличиваем финальный долг
// 			debtMap[personName] -= mutualDebt; // Уменьшаем долг
// 			debtMap[otherPerson.name] -= mutualDebt; // Уменьшаем долг
// 		}
// 	});
// }
// // Обновляем поле count для каждого человека
// persons.forEach((person) => {
// 	person.count = finalDebts[person.name] || 0; // Обновляем финальные долги
// });
// // Теперь можно вывести обновленные долги
