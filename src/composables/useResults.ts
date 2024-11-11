import type { IPerson, IProduct, IDebt } from "@/interfaces/interface";
import usePersonsAndProductsStore from "@/stores/usePersonsAndProductsStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export function useResults() {
    const store = usePersonsAndProductsStore(); // инициализируем хранилище
    const persons = computed(() => store.persons); //инициализируем массивы persons и products
    const products = computed(() => store.products);

    const formVisible = ref<boolean>(false); //реактивная переменная, отвечающая за видимость формы конкретизации долгов

    const router = useRouter(); // переменная для работы с Vue Router

    const debts = computed(() => // переменная с посчитанными данными долгов, округлёнными до 2 чисел после запятой
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

    function showAndHide() { // метод для отображения подробностей долга
        if (formVisible.value) {
            formVisible.value = false;
        } else {
            formVisible.value = true;
        }
    }

    function countAgain() { // метод для работы с роутером ; возвращает на страницу persons и очищает хранилище
        router.push({ path: "/persons" });
        store.$reset();
    }

    function addDebt( // метод для добавления долга
        person: IPerson,
        personName: string,
        amount: number
    ): void {
        const existingDebt = person.debts.find( //проверка на наличие долга перед человеком; если долга нет - создаётся новый объект, если есть - суммируется со старым
            (d) => d.personName === personName
        );
        if (existingDebt) {
            existingDebt.amount += amount;
        } else {
            person.debts.push({ personName: personName, amount });
        }
    }

    function calculateDebts(persons: IPerson[], products: IProduct[]) { //первичный рассчёт долгов персон
        persons.forEach((person) => (person.debts = [])); //обнуление поля debts у персон

        products.forEach((product) => {
            if (product.selectedBy.length === 0) return;

            const share = Number( //расчёт доли каждого "евшего"
                (product.price / product.selectedBy.length).toFixed(2)
            );
            const payer = persons.find( // проверка на оплату
                (person) => person.name === product.paidBy
            );
            if (!payer) return;

            product.selectedBy.forEach((selectedBy) => {
                if (selectedBy === product.paidBy) return;

                const person = persons.find((p) => p.name === selectedBy); //запись долга
                if (person) {
                    addDebt(person, product.paidBy, share);
                }
            });
        });

        return persons;
    }

    function consolidateDebts(persons: IPerson[]): IPerson[] { // метод для вычета взаимных долгов
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
                        // Если долг должника больше, уменьшаем его и обнуляем встречный
                        debt.amount -= reciprocalDebt.amount;
                        creditor.debts = creditor.debts.filter(
                            (d) => d.personName !== person.name
                        );
                    } else if (debt.amount < reciprocalDebt.amount) {
                        // Если долг оплатившего больше, уменьшаем его и обнуляем долг
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

    return { //возвращаем из функции все необходимые для компонента данные
        debts,
        formVisible,
        showAndHide,
        countAgain,
    };
}
