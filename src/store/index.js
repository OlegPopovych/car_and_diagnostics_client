import { configureStore } from "@reduxjs/toolkit";
import tokenSliceReducer from './token_slice';
import userSliceReducer from './user_slice';
import useSliceCars from "./cars_slice";
import useCarSlice from "./car_slice";
import catalogueSlice from "./catalogue_slice";
import cartSliceReducer from './cart_slice';

const store = configureStore({
	reducer: {
		tokenSlice: tokenSliceReducer.reducer,
		userSlice: userSliceReducer.reducer,
		cars: useSliceCars.reducer,
		car: useCarSlice.reducer,
		catalogue: catalogueSlice.reducer,
		cartSlice: cartSliceReducer.reducer
	}
});

export default store;