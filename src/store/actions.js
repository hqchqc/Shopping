import { ADD_COUNT, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload) {
        return new Promise((res, rej) => {
            let oldProduct = null;
            for (let attr of context.state.cartList) {
                if (attr.iid == payload.iid) {
                    oldProduct = attr;
                }
            }
            if (oldProduct) {
                // oldProduct.count += 1;
                context.commit(ADD_COUNT, oldProduct)
                res('商品数量+1');
            } else {
                // payload.count = 1;
                // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                res('加入购物车成功')
            }
        })

    }
}