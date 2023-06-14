import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	totalQuantity: 0
};

const cartSlice = createSlice({
	name: 'cartSlice',
	initialState,
	reducers: {
		addItemToCart: (state, action) => {
			const indexCart = state.items.findIndex((item) => item.id === action.payload.id);

			if (indexCart !== -1) {
				state.items[indexCart].count += action.payload.count;
				state.totalQuantity += 1;
			}
			else {
				//id, name, checked, count, description
				const newCart = {
					id: action.payload.id,
					name: action.payload.name,
					group: action.payload.group,
					count: action.payload.count,
					checked: action.payload.checked,
					description: action.payload.description,
					positionInIllustration: action.payload.positionInIllustration
				}
				state.items = [...state.items, newCart];
				state.totalQuantity += 1;
			}
		},
		removeItemFromCart: (state, action) => {
			const indexCart = state.items.findIndex((item) => item.id === action.payload);
			const quantityItems = state.items[indexCart].count;
			if (quantityItems > 1) {
				state.items[indexCart].count -= 1;
				state.totalQuantity -= 1;
			}
			else {
				state.items.splice(indexCart, 1);
				state.totalQuantity -= 1;
			}

		},

		updateItemFromCart: (state, action) => {
			const indexCart = state.items.findIndex((item) => item.id === action.payload.id);
			const updatedCart = {
				id: action.payload.id,
				name: action.payload.name,
				group: action.payload.group,
				count: action.payload.count,
				checked: action.payload.checked,
				description: action.payload.description,
				positionInIllustration: action.payload.positionInIllustration
			}
				state.items.splice(indexCart, 1, updatedCart);
			

		}
	}
});

export const { addItemToCart, removeItemFromCart, updateItemFromCart } = cartSlice.actions;
export const itemsSelector = state => state.cartSlice.items;
export const totalQuantity = state => state.cartSlice.totalQuantity;






export const cartActions = cartSlice.actions;

export default cartSlice;

