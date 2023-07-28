/* eslint-disable no-prototype-builtins */
import { stockGoodsList, myCartGoodsList} from '@/util/mockData'
import { GoodsInterface } from '@/util/interface'
import { cloneDeep } from 'lodash'

export default class StockService{

    stockGoodsList:Array<GoodsInterface> = []

    myCartGoodsList:Array<GoodsInterface|null> = []

    constructor (){

        this.stockGoodsList = stockGoodsList

        this.initChatGoods()
    }
    // 初始化我的购物车假数据
    initChatGoods (){
        this.myCartGoodsList = [
            cloneDeep({...stockGoodsList[0], number:1}),
            cloneDeep({...stockGoodsList[5], number:6}),
            cloneDeep({...stockGoodsList[9], number:5}),
            cloneDeep({...stockGoodsList[10], number:12}),
            cloneDeep({...stockGoodsList[3], number:1})
        ]
    }

    getHomeGoodsListByType (type:string){
        
        // 拿到当前筛选得商品
        let filterGoods = cloneDeep(this.stockGoodsList.filter((good) => good.type === type))
        let myCartMap = this.getMyCartMap()
        
        // 数量得从我得购物车得数量里面减掉
        filterGoods.forEach((good) => {
            if (myCartMap.hasOwnProperty(good.uid)){
                let num = good.stockNum - myCartMap[good.uid]
                good.stockNum = num > 0 ? num : 0
            }
        })
        return filterGoods
    }

    geMyCartList (){
        return this.myCartGoodsList
    }

    deleteMyCartById (uid:string){
        try {
            let index = this.myCartGoodsList.findIndex((good:any) => good.uid === uid)
            this.myCartGoodsList.splice(index, 1)
            return true
        } catch (error) {
            return false
        }
        
    }
    deleteMyCartByIds (uids:string){
        
        try {
            this.myCartGoodsList.forEach((good:any, index) => {
                if (uids.includes(good.uid)){
                    // 这里边遍历边插入属于危险操作，但是暂时先这么做吧
                    this.myCartGoodsList.splice(index, 1, null)
                }
            })
            this.myCartGoodsList = this.myCartGoodsList.filter((good) => good)
            
            return true
        } catch (error) {
            return false
        }
        
    }

    decreseMyCartById (uid:string){
        let cartGood:GoodsInterface|any = this.myCartGoodsList.find((good:any) => good.uid === uid)
        cartGood.number --
        // 如果数量减为0，就应该从购物车里面删除掉
        if (cartGood.number <= 0){
            let index = this.myCartGoodsList.findIndex((good:any) => good.uid === uid)
            this.myCartGoodsList.splice(index, 1)
        }
        return true
        
    }
    plusMyCartById (uid:string){
        try {
            let stockGood:GoodsInterface|undefined = this.stockGoodsList.find((good) => good.uid === uid)
            let cartGood:GoodsInterface|any = this.myCartGoodsList.find((good:any) => good.uid === uid)
            // 如果加的数量大于库存数量，就先报错吧
            if (stockGood && stockGood.uid === uid){
                if (stockGood.stockNum <= 0){
                    return false
                } else if (!cartGood){
                    this.myCartGoodsList.push(cloneDeep(Object.assign(stockGood, {number:1})))
                } else {
                    cartGood.number ++
                }
                return true
            }
            
        } catch (error) {
            // do something
        }
        
    }

    clearMyCartInvalidGood (){
        this.myCartGoodsList.forEach((good:any, index) => {
            if (good.stockNum === 0 || good.soldOut){
                
                // 这里边遍历边插入属于危险操作，但是暂时先这么做吧
                this.myCartGoodsList.splice(index, 1, null)
            }
        })
        this.myCartGoodsList = this.myCartGoodsList.filter((good) => good)

        return true
    }

    ordingGoodsByNum (uid:string, number:number){
        let stockGood:any = this.stockGoodsList.find((good) => good.uid === uid)
        
        let cartGood:any = this.myCartGoodsList.find((good:any) => good.uid === uid)
        
        // 如果库存还有这么多货品，就添加，没有就报错
        if (stockGood.stockNum < number){
            return false
        } else {
            cartGood.number = number
            return true
        }
    }

    searchGoodsByKey (key:string){
        
        let filterGoods = this.stockGoodsList.filter((good) => good.name.indexOf(key) !== -1)

        let myCartMap = this.getMyCartMap()
        
        // 数量得从我得购物车得数量里面减掉
        filterGoods.forEach((good) => {
            if (myCartMap.hasOwnProperty(good.uid)){
                let num = good.stockNum - myCartMap[good.uid]
                good.stockNum = num > 0 ? num : 0
            }
        })

        return filterGoods
    }


    getMyCartMap (){
        let m = this.myCartGoodsList.reduce((m:any, g:any) => {
            m[g.uid] = g.number
            return m
        }, {})
        
        return m
    }
}