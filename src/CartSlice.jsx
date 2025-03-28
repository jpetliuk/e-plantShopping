import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
   name: "cart",
   initialState: {
      items: [], // Empty array to store cart items
   },
   reducers: {
      addItem: (state, action) => {
         const { name, image, cost } = action.payload;
         const existingItem = state.items.find((item) => item.name === name);

         if (existingItem) {
            // Increment quantity if item already exists
            existingItem.quantity++;
         } else {
            // Add new item with quantity 1
            state.items.push({
               name,
               image,
               cost,
               quantity: 1,
            });
         }
      },

      removeItem: (state, action) => {
         // Remove item by filtering out the item with matching name
         state.items = state.items.filter(
            (item) => item.name !== action.payload
         );
      },

      updateQuantity: (state, action) => {
         const { name, quantity } = action.payload;
         const itemToUpdate = state.items.find((item) => item.name === name);

         // Update quantity, ensuring it doesn't go below 1
         if (itemToUpdate) {
            itemToUpdate.quantity = Math.max(1, quantity);
         }
      },
   },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;