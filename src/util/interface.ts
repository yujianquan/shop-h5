export enum TabType {
    FRUITS = 'fruits',
    DRINKS = 'drinks',
    OTHER = 'other'
}

export enum SellStatus{
    SELLING = 'selling',
    NOTSELL = 'notSell',
}

export interface AxiosReturnInterface<T> {
    message:string,
    data:T,
    code:string
}

export interface GoodsInterface{
    uid:string,
    name:string,
    pic:string | number,
    unit:string,
    soldOut:boolean,
    status:SellStatus,
    price:number | string,
    stockNum:number,
    type:TabType
    number?:number,
}