import type { IPerson, IProduct, IDebt } from "@/interfaces/interface";
import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export function useResults() {
    const store = usePersonsAndProductsStore();
    const persons = computed(() => store.persons);
    const products = computed(() => store.products);

    const formVisible = ref<boolean>(false);

    const router = useRouter();

    const debts = computed(() =>
        consolidateDebts(
            calculateDebts(persons.value, products.value).map((person) => ({
                ...person,
                debts: person.debts.map((debt) => ({
                    ...debt,
                    amount: parseFloat(debt.amount.toFixed(2)),
                })),
            }))
        )
    );

    function showAndHide() {
        if (formVisible.value) {
            formVisible.value = false;
        } else {
            formVisible.value = true;
        }
    }

    function countAgain() {
        router.push({ path: "/persons" });
        store.$reset();
    }

    function addDebt(
        person: IPerson,
        personName: string,
        amount: number
    ): void {
        if (!person.debts) person.debts = [];
        const existingDebt = person.debts.find(
            (d) => d.personName === personName
        );
        if (existingDebt) {
            existingDebt.amount += amount;
        } else {
            person.debts.push({ personName: personName, amount });
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

    function consolidateDebts(persons: IPerson[]): IPerson[] {
        persons.forEach((person) => {
            if (!person.debts) return;

            person.debts.forEach((debt) => {
                // Находим того, кому человек должен
                const creditor = persons.find(
                    (p) => p.name === debt.personName
                );
                if (!creditor || !creditor.debts) return;

                // Проверяем, есть ли встречный долг от этого человека
                const reciprocalDebt = creditor.debts.find(
                    (d) => d.personName === person.name
                );
                if (reciprocalDebt) {
                    if (debt.amount > reciprocalDebt.amount) {
                        // Если долг `person` больше, уменьшаем его и обнуляем встречный
                        debt.amount -= reciprocalDebt.amount;
                        creditor.debts = creditor.debts.filter(
                            (d) => d.personName !== person.name
                        );
                    } else if (debt.amount < reciprocalDebt.amount) {
                        // Если долг `creditor` больше, уменьшаем его и обнуляем `debt`
                        reciprocalDebt.amount -= debt.amount;
                        person.debts = person.debts.filter(
                            (d) => d.personName !== creditor.name
                        );
                    } else {
                        // Если долги равны, обнуляем оба
                        person.debts = person.debts.filter(
                            (d) => d.personName !== creditor.name
                        );
                        creditor.debts = creditor.debts.filter(
                            (d) => d.personName !== person.name
                        );
                    }
                }
            });
        });

        return persons;
    }

    return {
        debts,
        formVisible,
        showAndHide,
        countAgain,
    };
}
