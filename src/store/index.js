import { configureStore } from "@reduxjs/toolkit";
import tokenSliceReducer from './token_slice';
import userSliceReducer from './user_slice'

const store = configureStore({
	reducer: {
		tokenSlice: tokenSliceReducer.reducer,
		userSlice: userSliceReducer.reducer
	}

});

export default store;