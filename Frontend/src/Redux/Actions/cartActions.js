export const ADD_TO_BAG ="ADD_TO_BAG"
export const REMOVE_FROM_BAG = "REMOVE_FROM_BAG"
export const DELETE_FROM_BAG = "DELETE_FROM_BAG"
export const INIT_USER_CART = "INIT_USER_CART"
export const RESET_CART = "RESET_CART"
export const addToBag = payload =>{
    return{
        type:ADD_TO_BAG,
        payload
    }
}

export const removeFromBag = payload =>{
    return{
        type:REMOVE_FROM_BAG,
        payload
    }
}

export const deleteFromBag = payload =>{
    return{
        type:DELETE_FROM_BAG,
        payload
    }
}

export const initUserCart = payload =>{
    return{
        type:INIT_USER_CART,
        payload
    }
}
export const resetCart = () =>{
    return{
        type:RESET_CART,
    }
}