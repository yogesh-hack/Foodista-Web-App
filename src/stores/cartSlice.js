const { createSlice } = require('@reduxjs/toolkit')

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //! change the state
        addToCart(state, action) {
            const exititem = state.find(item => item._id === action.payload)

            if (exititem) {
                exititem.quantity++;
            } else {
                state.push({
                    ...action.payload,
                    quantity: 1,
                })
            }
        },
        removeFromCart(state, action) {
            return state.filter(item => item._id !== action.payload)
        },
        incrementQuantity: (state, action) => {
            const items = state.find(item => item._id === action.payload._id)

            if (items) {
                items.quantity++;
            }
        },
        decrementQuantity: (state, action) => {
            const items = state.find(item => item._id === action.payload._id)

            if (items && items.quantity > 1) {
                items.quantity--;
            }
        },
        removeAllItems: state => {
            state.length = 0;
        },
    },
});

export const { addToCart, removeFromCart, decrementQuantity, incrementQuantity,removeAllItems } = cartSlice.actions;
export default cartSlice.reducer
