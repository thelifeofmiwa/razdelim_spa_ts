export interface IPerson {
    name: string;
    count: number;
    selectedProducts: string[];
    debts?: IDebt[];
}

export interface IProduct {
    name: string;
    price: number;
    selectedBy: string[];
    paidBy: string;
}

export interface IDebt {
    personName: string;
    amount: number;
}