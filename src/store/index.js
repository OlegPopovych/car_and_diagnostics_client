import { configureStore } from "@reduxjs/toolkit";
import tokenSliceReducer from './token_slice';
import userSliceReducer from './user_slice';
import useSliceCars from "./cars_slice";
import useCarSlice from "./car_slice";

const store = configureStore({
	reducer: {
		tokenSlice: tokenSliceReducer.reducer,
		userSlice: userSliceReducer.reducer,
		cars: useSliceCars.reducer,
		car: useCarSlice.reducer
	}

});

export default store;