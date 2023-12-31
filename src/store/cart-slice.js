import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    changed:false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    
    reducers: {
        fetchCart(state,action){
            state.totalQuantity=action.payload.totalQuantity;
            state.items=action.payload.items;
        },
        add(state, action) {
            const newItem = action.payload;
            const existtinItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            state.changed=true;
            if (!existtinItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    title: newItem.title
                });
            } else {
                existtinItem.quantity++;
                existtinItem.totalPrice = existtinItem.totalPrice + newItem.price;
            }
        },
        remove(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            state.totalQuantity--;
            state.changed=true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) =>
                    item.id !== id
                )
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice;