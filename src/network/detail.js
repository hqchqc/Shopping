import {request} from './request'

export function getDetail(iid) { 
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}

export function getRecommend() { 
    return request({
        url: '/recommend'
    })
}

export class GoodsInfo{
    constructor(itemInfo,columns,shopInfo) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.realPrice = itemInfo.lowNowPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = shopInfo.services;
    }
}

export class ShopInfo{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

export class GoodsParam{
    constructor(info,rule){
        // images可能会没有值 要进行判断
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}

