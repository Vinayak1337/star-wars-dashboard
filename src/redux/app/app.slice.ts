import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '@react-navigation/native';

const initialState: AppState & {
	initialRouteState: InitialState | undefined;
} = {
	initialRouteState: undefined,
	currentRoute: '',
	resourcePopup: null,
	popularPeople: [],
	allPeople: [],
	allPeople2: [],
	films: [],
	planets: [],
	starships: [],
	loading: false,
	error: null
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setInitialRouteState: (
			state,
			action: PayloadAction<InitialState | undefined>
		) => {
			state.initialRouteState = action.payload;
		},
		setCurrentRoute: (state, action: PayloadAction<string>) => {
			state.currentRoute = action.payload;
		},
		setPopup: (state, action: PayloadAction<PopupItem | null>) => {
			state.resourcePopup = action.payload;
		},
		getPeopleStart: state => {
			state.loading = true;
		},
		getPeopleSuccess: (
			state,
			action: PayloadAction<{
				popularPeople: Character[];
				allPeople: Character[];
				allPeople2: Character[];
			}>
		) => {
			state.popularPeople = action.payload.popularPeople;
			state.allPeople = action.payload.allPeople;
			state.allPeople2 = action.payload.allPeople2;
			state.loading = false;
		},
		getPeopleFailure: state => {
			state.loading = false;
			state.error = 'Error fetching people!';
		},
		getFilmsStart: state => {
			state.loading = true;
		},
		getFilmsSuccess: (state, action: PayloadAction<Film[]>) => {
			state.films = action.payload;
			state.loading = false;
		},
		getFilmsFailure: state => {
			state.loading = false;
			state.error = 'Error fetching films!';
		},
		getPlanetsStart: state => {
			state.loading = true;
		},
		getPlanetsSuccess: (state, action: PayloadAction<Planet[]>) => {
			state.planets = action.payload;
			state.loading = false;
		},
		getPlanetsFailure: state => {
			state.loading = false;
			state.error = 'Error fetching planets!';
		},
		getStarshipsStart: state => {
			state.loading = true;
		},
		getStarshipsSuccess: (state, action: PayloadAction<Starship[]>) => {
			state.starships = action.payload;
			state.loading = false;
		},
		getStarshipsFailure: state => {
			state.loading = false;
			state.error = 'Error fetching starships!';
		}
	}
});

export const {
	setInitialRouteState,
	setCurrentRoute,
	setPopup,
	getPeopleStart,
	getPeopleSuccess,
	getPeopleFailure,
	getFilmsStart,
	getFilmsSuccess,
	getFilmsFailure,
	getPlanetsStart,
	getPlanetsSuccess,
	getPlanetsFailure,
	getStarshipsStart,
	getStarshipsSuccess,
	getStarshipsFailure
} = appSlice.actions;

const appReducer = appSlice.reducer;

export default appReducer;
