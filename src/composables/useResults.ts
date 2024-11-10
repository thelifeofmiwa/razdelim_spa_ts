import type { IPerson, IProduct, IDebt } from "@/interfaces/interface";
import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import { computed } from "vue";

export function useResults() {
    const store = usePersonsAndProductsStore();
    const persons = computed(() => store.persons);
    const products = computed(() => store.products);

    const result = computed(() =>
        findPersonsCount(persons.value, products.value)
    );

    const debts = computed(() => calculateDebts(persons.value, products.value));

    function findPersonsCount(persons: IPerson[], products: IProduct[]) {
        persons.forEach((person) => {
            person.count = 0;
        });
        products.forEach((product) => {
            if (product.selectedBy.length > 0) {
                const share = Number(
                    (product.price / product.selectedBy.length).toFixed(2)
                );
                product.selectedBy.forEach((selectedBy) => {
                    const person = persons.find((p) => p.name === selectedBy);
                    if (person) {
                        if (!product.paidBy.includes(person.name)) {
                            person.count += share;
                        }
                    }
                });
            }
        });

        return persons;
    }

    function addDebt(
        person: IPerson,
        toPersonName: string,
        amount: number
    ): void {
        if (!person.debts) person.debts = [];
        const existingDebt = person.debts.find(
            (d) => d.personName === toPersonName
        );
        if (existingDebt) {
            existingDebt.amount += amount;
        } else {
            person.debts.push({ personName: toPersonName, amount });
        }
    }

    function calculateDebts(persons: IPerson[], products: IProduct[]) {
        persons.forEach((person) => (person.debts = []));

        products.forEach((product) => {
            if (product.selectedBy.length === 0) return;

            const share = Number(
                (product.price / product.selectedBy.length).toFixed(2)
            );
            const payer = persons.find(
                (person) => person.name === product.paidBy
            );
            if (!payer) return;

            product.selectedBy.forEach((selectedBy) => {
                if (selectedBy === product.paidBy) return;

                const person = persons.find((p) => p.name === selectedBy);
                if (person) {
                    addDebt(person, product.paidBy, share);
                }
            });
        });

        return persons;
    }

    return {
        result,
        debts,
    };
}
