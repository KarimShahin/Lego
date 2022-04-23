import {ADD_TO_BAG,REMOVE_FROM_BAG,DELETE_FROM_BAG,INIT_USER_CART, RESET_CART} from '../Actions/cartActions'
const initialState={
    products:{},
    totalPrice:0,
    totalItemsCount:0
}
const cartReducer = (state=initialState,action)=>{
    switch(action.type){
        case ADD_TO_BAG:
            if(state.products[action.payload._id])
            {
                return{
                    products:{
                        ...state.products,
                        [action.payload._id]:{  ...state.products[action.payload._id],quantity:state.products[action.payload._id].quantity+1}
                    },
                totalPrice:state.totalPrice + action.payload.price,
                totalItemsCount:state.totalItemsCount+1
                }
            }
            else
            {
                return{
                    products:{
                        ...state.products,
                        [action.payload._id]:{  ...action.payload,quantity:1}
                    },
                totalPrice:state.totalPrice + action.payload.price,
                totalItemsCount:state.totalItemsCount+1
                }
            }
        case REMOVE_FROM_BAG:
    
                if(state.products[action.payload._id].quantity>1)
                {
                    return{
                        products:{
                            ...state.products,
                            [action.payload._id]:{  ...state.products[action.payload._id],quantity:state.products[action.payload._id].quantity-1}
                        },
                    totalPrice:state.totalPrice - action.payload.price,
                    totalItemsCount:state.totalItemsCount-1
                    }
                }
                else
                {
                    let filteredProducts = {...state.products}
                    delete filteredProducts[action.payload._id]
                    return{
                        products:{
                          ...filteredProducts
                        },
                    totalPrice:state.totalPrice - action.payload.price,
                    totalItemsCount:state.totalItemsCount-1
                    }
                }
            case DELETE_FROM_BAG:
                let deletedItem = {...state.products[action.payload._id]}
                let filteredProducts = {...state.products}
                delete filteredProducts[action.payload._id]
                return{
                    products:{
                      ...filteredProducts
                    },
                totalPrice:state.totalPrice - (deletedItem.quantity * deletedItem.price),
                totalItemsCount:state.totalItemsCount-deletedItem.quantity
                }
            case INIT_USER_CART:
                let initProducts = action.payload.carts.product.map(prod=>{return{...prod.product,quantity:prod.quantity}})
                let products={}
                initProducts.forEach(prod=>{
                    products[prod._id]={...prod}
                })
                return{
                    products:{...products},
                    totalPrice:action.payload.carts.total_price,
                    totalItemsCount:action.payload.carts.totalItemsCount,

                }
            case RESET_CART: {
                return {
                    products:{},
                    totalPrice: 0,
                    totalItemsCount: 0,
                }
            }
        default:return state
    }
}
export default cartReducer;