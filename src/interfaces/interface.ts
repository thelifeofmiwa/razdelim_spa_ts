export interface IPerson {
    name: string,
    count: number,
    selectedProducts: string[]
}

export interface IProduct {
    name: string,
    price: number,
    selectedBy: string[],
    paidBy: string | null
}