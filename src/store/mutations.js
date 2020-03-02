import { ADD_COUNT, ADD_TO_CART, CHANGE_STATE_TRUE,CHANGE_STATE_FALSE } from './mutation-types'

export default {
    [ADD_COUNT](state, payload) {
        payload.count++;
    },
    [ADD_TO_CART](state, payload) {
        payload.isCheck = true;
        payload.count = 1;
        state.cartList.push(payload)
    },
    [CHANGE_STATE_FALSE](state, payload) {
        // state.cartList.forEach(item => {
        //     item.isCheck = false
        // })
        for(let attr of state.cartList){
            attr.isCheck = false
        }
        console.log(2)
    },
    [CHANGE_STATE_TRUE](state, payload) {
        // state.cartList.forEach(item => {
        //     item.isCheck = false
        // })
        for(let attr of state.cartList){
            attr.isCheck = true
        }
    },
}