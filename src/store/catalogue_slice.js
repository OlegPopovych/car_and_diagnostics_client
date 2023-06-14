import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const catalogueAdapter = createEntityAdapter({
	selectId: (item) => item._id
}); // створює об'єкт функцій для керування стейтом, 

const initialState = catalogueAdapter.getInitialState({  //адаптер створює початковий стейт
	catalogueLoadingStatus: 'idle'
});



export const fetchCatalogue = createAsyncThunk(
	'catalogue/fetchCatalogue',
	async (arg, thunkAPI) => {
		console.log(`arg: ${arg.token}, ${arg.group}`)
		const res = await fetch(
			process.env.REACT_APP_API_ENDPOINT + `cars/car/diagnostic/${arg.group}`, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${arg.token}`,
			},
		})
		const toSend = await res.json()
		console.log(`catalogue data: ${toSend}`)
		return [toSend];

	}
)

const catalogueSlice = createSlice({
	name: 'catalogue',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCatalogue.pending, state => { state.catalogueLoadingStatus = 'loading' })
			.addCase(fetchCatalogue.fulfilled, (state, action) => {
				state.catalogueLoadingStatus = 'idle';
				catalogueAdapter.setAll(state, action.payload);
			})
			.addCase(fetchCatalogue.rejected, (state, action) => {
				state.catalogueLoadingStatus = "error";
				console.log(action.payload.errorMessage)
			})

			.addDefaultCase(() => { })
	}
});



const { actions, reducer } = catalogueSlice;

// const { selectAll } = heroesAdapter.getSelectors(state => state.heroes); // метод getSelectors дає метод selectAll який повертає масив

// export const filteredHeroesSelector = createSelector(
// 	(state) => state.filters.activeFilter, // а ця ц-я теж повертає дан, але зроблема вручну
// 	selectAll, //ф-я взята з адаптера повертає масив даних з стейта state.heroes
// 	(filter, heroes) => {
// 		console.log('heroes: ', heroes);
// 		console.log('initilstate: ',initialState);
// 		if (filter === 'all') {
// 			return heroes;
// 		} else {
// 			return heroes.filter(item => item.element === filter);
// 		}
// 	}
// )

// export default reducer;

export const catalogueSelector = catalogueAdapter.getSelectors(
	(state) => state.catalogue
);

export default catalogueSlice;

export const { catalogueFetching, catalogueFetched, catalogueFetchingError } = catalogueSlice.actions;

