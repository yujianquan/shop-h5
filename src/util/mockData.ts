import { generateRandomId } from '@/util/tool'
import { GoodsInterface, TabType, SellStatus } from '@/util/interface'

export const stockGoodsList:Array<GoodsInterface> = [
    {
        uid:generateRandomId(),
        name:'火龙果',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/138477/20/22995/201804/616c963eE3245cfa3/3678c48277046f8f.jpg!q70.dpg',
        price:190,
        soldOut:false,
        unit:'个',
        stockNum:290,
        status:SellStatus.SELLING,
        type:TabType.FRUITS
    },
    {
        uid:generateRandomId(),
        name:'灯笼果',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/81992/19/20874/255489/62bbcdc8Ea791d37c/8ac622775f6cde7f.jpg!q70.dpg',
        unit:'斤',
        soldOut:false,
        price:49.9,
        stockNum:200,
        status:SellStatus.SELLING,
        type:TabType.FRUITS
    },
    {
        uid:generateRandomId(),
        name:'黄桃',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/223692/14/11826/72615/62c67a49E3c0e6c7a/6a1b85155dd3de12.jpg!q70.dpg',
        unit:'斤',
        soldOut:false,
        price:29.9,
        stockNum:348,
        status:SellStatus.SELLING,
        type:TabType.FRUITS
    },
    {
        uid:generateRandomId(),
        name:'山东桃子',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/74309/37/20227/144429/62cf79d6E08ac6160/38b276b74e2a3c02.jpg!q70.dpg',
        unit:'斤',
        soldOut:false,
        price:44.9,
        stockNum:0,
        status:SellStatus.NOTSELL,
        type:TabType.FRUITS
    },
    {
        uid:generateRandomId(),
        name:'库尔勒香梨',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/216181/14/9573/201893/61cd09b2Ebd48bc8b/ea407f5b99c06581.jpg!q70.dpg',
        unit:'个',
        status:SellStatus.SELLING,
        soldOut:false,
        price:6.9,
        stockNum:32,
        type:TabType.FRUITS
    },
    {
        uid:generateRandomId(),
        name:'黄桃',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/59422/14/18063/125713/62c67a49Ea1a1ce16/2b832a35671b910c.jpg!q70.dpg',
        unit:'斤',
        status:SellStatus.SELLING,
        soldOut:true,
        price:4.9,
        stockNum:0,
        type:TabType.FRUITS
    },
    {
        uid:generateRandomId(),
        name:'罗宋汤',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/212524/27/920/129618/616d69feEf48ee207/0fa1819b18dc0890.jpg!q70.dpg',
        unit:'罐',
        status:SellStatus.SELLING,
        soldOut:true,
        price:4.0,
        stockNum:0,
        type:TabType.DRINKS
    },
    {
        uid:generateRandomId(),
        name:'哇哈哈（大瓶装）',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/219232/23/874/135337/616d6231Ee03c8fce/906c09da2c4ea664.jpg!q70.dpg',
        unit:'瓶',
        status:SellStatus.SELLING,
        soldOut:true,
        price:5.0,
        stockNum:0,
        type:TabType.DRINKS
    },
    {
        uid:generateRandomId(),
        name:'哇哈哈（小瓶装）',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/219232/23/874/135337/616d6231Ee03c8fce/906c09da2c4ea664.jpg!q70.dpg',
        unit:'瓶',
        status:SellStatus.SELLING,
        soldOut:false,
        price:2.0,
        stockNum:1232,
        type:TabType.DRINKS
    },
    {
        uid:generateRandomId(),
        name:'鸡蛋也算饮料',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/198999/11/22781/80519/62787d45Eb98563f7/f460d7f6bb166b33.jpg!q70.dpg',
        unit:'罐',
        soldOut:false,
        status:SellStatus.SELLING,
        price:7.0,
        stockNum:50,
        type:TabType.DRINKS
    },
    {
        uid:generateRandomId(),
        name:'八喜茶饮',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/219475/36/317/95014/6167fe40Ecb04bd66/dc460a8fe6360cdc.jpg!q70.dpg',
        unit:'瓶',
        soldOut:false,
        status:SellStatus.SELLING,
        price:3.0,
        stockNum:9999,
        type:TabType.DRINKS
    },
    {
        uid:generateRandomId(),
        name:'蜜瓜茶',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/192705/2/24152/138326/62676ac1E505b46be/da93f659c354d3c8.jpg!q70.dpg',
        unit:'瓶',
        soldOut:false,
        status:SellStatus.SELLING,
        price:3.0,
        stockNum:9999,
        type:TabType.DRINKS
    },
    {
        uid:generateRandomId(),
        name:'小玉米',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/83814/20/7767/398817/5d5df6b0E85bc17d1/f84b91f4c2a39217.jpg!q70.dpg',
        unit:'斤',
        soldOut:false,
        status:SellStatus.SELLING,
        price:41.0,
        stockNum:333,
        type:TabType.OTHER
    },
    {
        uid:generateRandomId(),
        name:'冷冻大黄鱼',
        pic:'//m11.360buyimg.com/babel/s522x456_jfs/t1/196112/27/17050/161904/610ca852E1799e4be/3025427290679dfd.jpg!q70.dpg',
        unit:'kg',
        soldOut:false,
        status:SellStatus.SELLING,
        price:290.0,
        stockNum:5,
        type:TabType.OTHER
    }
]
// 暂时没用
export const myCartGoodsList:Array<GoodsInterface> = [
    {
        uid:generateRandomId(),
        name:'秦岭见手青',
        pic:'',
        unit:'kg',
        soldOut:true,
        status:SellStatus.SELLING,
        price:290.0,
        stockNum:5,
        number:1,
        type:TabType.OTHER
    },
    {
        uid:generateRandomId(),
        name:'日本红富士',
        pic:'',
        unit:'斤',
        soldOut:false,
        price:44.9,
        number:2,
        stockNum:0,
        status:SellStatus.NOTSELL,
        type:TabType.FRUITS
    }
]