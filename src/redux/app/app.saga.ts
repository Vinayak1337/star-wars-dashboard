import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
	getFilmsStart,
	getFilmsSuccess,
	getFilmsFailure,
	getPeopleFailure,
	getPeopleStart,
	getPeopleSuccess,
	getPlanetsFailure,
	getPlanetsStart,
	getPlanetsSuccess,
	getStarshipsFailure,
	getStarshipsStart,
	getStarshipsSuccess
} from './app.slice';
import axios from 'axios';

function* getPeople() {
	try {
		const { data } = yield axios.get('https://swapi.dev/api/people/');

		const { data: data2 } = yield axios.get(
			'https://swapi.dev/api/people/?page=2'
		);

		const { data: data3 } = yield axios.get(
			'https://swapi.dev/api/people/?page=3'
		);

		yield put(
			getPeopleSuccess({
				popularPeople: data.results,
				allPeople: data2.results,
				allPeople2: data3.results
			})
		);
	} catch (error) {
		yield put(getPeopleFailure());
	}
}

function* watchPeople() {
	yield takeLatest(getPeopleStart.type, getPeople);
}

function* getPlanets() {
	try {
		const { data } = yield axios.get('https://swapi.dev/api/planets/');

		const {
			data: { results }
		} = yield axios.get('https://swapi.dev/api/planets/?page=2');
		const {
			data: { results: result2 }
		} = yield axios.get('https://swapi.dev/api/planets/?page=3');
		const {
			data: { results: result3 }
		} = yield axios.get('https://swapi.dev/api/planets/?page=4');

		yield put(
			getPlanetsSuccess([...data.results, ...results, ...result2, ...result3])
		);
	} catch (error) {
		yield put(getPlanetsFailure());
	}
}

function* watchPlanets() {
	yield takeLatest(getPlanetsStart.type, getPlanets);
}

function* getStarships() {
	try {
		const { data } = yield axios.get('https://swapi.dev/api/starships/');
		yield put(getStarshipsSuccess(data.results));
	} catch (error) {
		yield put(getStarshipsFailure());
	}
}

function* watchStarships() {
	yield takeLatest(getStarshipsStart.type, getStarships);
}

function* getFilms() {
	try {
		const { data } = yield axios.get('https://swapi.dev/api/films/');

		yield put(getFilmsSuccess(data.results));
	} catch (error) {
		yield put(getFilmsFailure());
		console.log(error);
	}
}

function* watchFilms() {
	yield takeLatest(getFilmsStart.type, getFilms);
}

/**
 * The root saga function for the Star Wars Dashboard app.
 * It sets up the watchers for the API calls and dispatches the appropriate actions on success or failure.
 */
export default function* appSaga() {
	yield all([
		call(watchFilms),
		call(watchPeople),
		call(watchPlanets),
		call(watchStarships)
	]);
}
