import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null
};

const tokenSlice = createSlice({
	name: 'tokenSlice',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
		removeToken: (state) => {
			state.token = null;
		}
	}
});

export const { setToken, removeToken } = tokenSlice.actions;
export const selectToken = state => state.tokenSlice.token;

export default tokenSlice; 