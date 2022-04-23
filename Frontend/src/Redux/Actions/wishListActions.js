export const ADD_TO_WISHLIST ="ADD_TO_WISHLIST"
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST"
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST"
export const INIT_USER_CART = "INIT_USER_CART"
export const addToWishlist = payload =>{
    return{
        type:ADD_TO_WISHLIST,
        payload
    }
}

export const removeFromWishList = payload =>{
    return{
        type:REMOVE_FROM_WISHLIST,
        payload
    }
}

export const deleteFromWishlist = payload =>{
    return{
        type:DELETE_FROM_WISHLIST,
        payload
    }
}

export const initUserCart = payload =>{
    return{
        type:INIT_USER_CART,
        payload
    }
}