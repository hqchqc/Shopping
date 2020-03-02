import {ADD_COUNT,ADD_TO_CART} from './mutation-types'

export default {
    addCart(context,payload){
        let oldProduct = null;
        for(let attr of context.state.cartList){
            if(attr.iid == payload.iid){
                oldProduct = attr;
            }
        }
        if(oldProduct){
            // oldProduct.count += 1;
            context.commit(ADD_COUNT,oldProduct)
        }else{
            // payload.count = 1;
            // context.state.cartList.push(payload)
            context.commit(ADD_TO_CART,payload)
        }
    }
}