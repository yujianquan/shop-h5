import axios from "axios"
import MockAdapter from "axios-mock-adapter"
let mock = new MockAdapter(axios, { delayResponse: 200 })
import Stock from '@/service/stockService'
let stock = new Stock()

mock.onGet('/neterror').networkError()
mock.onGet('/goodslist').reply(function (config) {
    const {params:{type}} = config
    
    const result = stock.getHomeGoodsListByType(type)
    return [200, {
        code:'200',
        data:result
    }]
})

mock.onGet('/mycart').reply(function (config) {

    const result = stock.geMyCartList()
    return [200, {
        code:'200',
        data:result
    }]
})

mock.onPost('/deleteMyCartById').reply(function (config) {
    const {params:{uid}} = config
    
    const result = stock.deleteMyCartById(uid)
    return [result ? 200 : 500, {
        code:result ? '200' : '500',
        data:result
    }]
})

mock.onPost('/deleteMyCartByIds').reply(function (config) {
    const {params:{ids}} = config
    
    const result = stock.deleteMyCartByIds(ids)
    return [result ? 200 : 500, {
        code:result ? '200' : '500',
        data:result
    }]
})

mock.onGet('/clear').reply(function () {
    const result = stock.clearMyCartInvalidGood()
    return [200, {
        code:'200',
        data:result
    }]
})

mock.onPost('/decrese').reply(function (config) {
    const {params:{uid}} = config
    
    const result = stock.decreseMyCartById(uid)
    return [result ? 200 : 500, {
        code:result ? '200' : '500',
        data:result
    }]
})

mock.onPost('/plus').reply(function (config) {
    const {params:{uid}} = config
    
    const result = stock.plusMyCartById(uid)
    return [result ? 200 : 500, {
        code:result ? '200' : '500',
        data:result
    }]
})

mock.onPost('/ordingGoodsByNum').reply(function (config) {
    const {params:{uid, number}} = config
    
    const result = stock.ordingGoodsByNum(uid, number)
    return [result ? 200 : 500, {
        code:result ? '200' : '500',
        data:result,
        message:result ? '200' : '库存量不足'
    }]
})

mock.onGet('/search').reply(function (config) {
    const {params:{key}} = config
    
    const result = stock.searchGoodsByKey(key)
    return [result ? 200 : 500, {
        code:result ? '200' : '500',
        data:result,
        message:result ? '200' : '库存量不足'
    }]
})
