import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const carsAdapter = createEntityAdapter({
	selectId: (book) => book._id
}); // створює об'єкт функцій для керування стейтом, 

const initialState = carsAdapter.getInitialState({  //адаптер створює початковий стейт
	carsLoadingStatus: 'idle'
});


export const fetchCars = createAsyncThunk(
	'cars/fetchCars',
	async (arg, thunkAPI) => {
		const res = await fetch(
			process.env.REACT_APP_API_ENDPOINT + "cars/getcarlist", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${arg}`,
			},
		})
		const toSend = await res.json()
		console.log(`car list car data: ${toSend}`)
		return toSend;
	}
)

const carsSlice = createSlice({
	name: 'cars',
	initialState,
	reducers: {
		carCreated: (state, action) => {
			carsAdapter.setOne(state, action.payload);  //функціями з адаптера змінємо стейт
		},
		// carsDeleted: (state, action) => {
		// 	carAdapter.removeOne(state, action.payload);
		// }
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCars.pending, state => { state.carsLoadingStatus = 'loading' })
			.addCase(fetchCars.fulfilled, (state, action) => {
				state.carsLoadingStatus = 'idle';
				carsAdapter.setAll(state, action.payload);
			})
			.addCase(fetchCars.rejected, (state, action) => {
				state.carsLoadingStatus = "error";
				console.log(action.payload.errorMessage)
			})

			.addDefaultCase(() => { })
	}
});



const { actions, reducer } = carsSlice;

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

export const globalizedSelectors = carsAdapter.getSelectors(
	(state) => state.cars
);

export default carsSlice;

export const { carsFetching, carsFetched, carsFetchingError, carCreated, carDeleted } = carsSlice.actions;

