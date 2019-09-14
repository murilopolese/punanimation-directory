import { createStore, combineReducers } from 'redux'
const handleHttpError = (res) => {
	if (!res.ok) { throw new Error(res.statusText) }
	return res
}

const getBaseUrl = () => {
	return localStorage.getItem('API_URL') || window.location.origin
}

// ENTRIES
const FETCH_ENTRIES_BEGIN = 'FETCH_ENTRIES_BEGIN'
const FETCH_ENTRIES_SUCCESS = 'FETCH_ENTRIES_SUCCESS'
const FETCH_ENTRIES_FAIL = 'FETCH_ENTRIES_FAIL'
const SELECT_ENTRY = 'SELECT_ENTRY'
const SHOW_ENTRY_DIALOG = 'SHOW_ENTRY_DIALOG'
const HIDE_ENTRY_DIALOG = 'HIDE_ENTRY_DIALOG'
const NEXT_ENTRY_PAGE = 'NEXT_ENTRY_PAGE'
const initialEntries = {
	selected: null,
	entries: [],
	entriesById: {},
	loading: false,
	cardOpen: false,
	pageSize: 12,
	currentPage: 1
}
const entriesReducer = (state = initialEntries, action) => {
	switch (action.type) {
		case FETCH_ENTRIES_BEGIN:
			return { ...state, loading: true }
		case FETCH_ENTRIES_SUCCESS:
			let entriesById = action.payload.reduce((acc, entry) => {
				acc[entry._id] = entry
				return acc
			}, {})
			return { ...state, loading: false, entries: action.payload, entriesById }
		case FETCH_ENTRIES_FAIL:
			return { ...state, loading: false }
		case SELECT_ENTRY:
			return { ...state, selected: action.payload }
		case SHOW_ENTRY_DIALOG:
			return { ...state, cardOpen: true }
		case HIDE_ENTRY_DIALOG:
			return { ...state, cardOpen: false }
		case NEXT_ENTRY_PAGE:
			return { ...state, currentPage: state.currentPage+1 }
		default:
			return state
	}
}
const shuffle = (array) => {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
export const loadEntries = (dispatch) => {
	dispatch({ type: FETCH_ENTRIES_BEGIN })
	fetch(`${getBaseUrl()}/api/entries`, { mode: 'cors' })
		.then(handleHttpError)
		.then(r => r.json())
		.then((json) => {
			dispatch({
				type: FETCH_ENTRIES_SUCCESS,
				payload: shuffle( json.entries )
			})
		})
		.catch((error) => {
			dispatch({
				type: FETCH_ENTRIES_FAIL,
				payload: error
			})
		})
}
export const openCard = (dispatch, id) => {
	dispatch({ type: SELECT_ENTRY, payload: id })
	dispatch({ type: SHOW_ENTRY_DIALOG })
}
export const closeCard = (dispatch, id) => {
	dispatch({ type: HIDE_ENTRY_DIALOG })
}
export const nextPage = (dispatch) => {
	dispatch({ type: NEXT_ENTRY_PAGE })
}

// LOCATION
const FETCH_LOCATIONS_BEGIN = 'FETCH_LOCATIONS_BEGIN'
const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS'
const FETCH_LOCATIONS_FAIL = 'FETCH_LOCATIONS_FAIL'
const SHOW_LOCATIONS_MENU = 'SHOW_LOCATIONS_MENU'
const HIDE_LOCATIONS_MENU = 'HIDE_LOCATIONS_MENU'
const TOGGLE_LOCATIONS_MENU = 'TOGGLE_LOCATIONS_MENU'
const SET_FILTER_LOCATIONS = 'SET_FILTER_LOCATIONS'
const TOGGLE_LOCATIONS = 'TOGGLE_LOCATIONS'
const initialLocations = {
	locations: [],
	selected: [],
	open: false,
	searchTerm: ''
}
const locationsReducer = (state = initialLocations, action) => {
	switch (action.type) {
		case FETCH_LOCATIONS_BEGIN:
			return { ...state, loading: true }
		case FETCH_LOCATIONS_SUCCESS:
			return { ...state, loading: false, locations: action.payload }
		case FETCH_LOCATIONS_FAIL:
			return { ...state, loading: false }
		case SHOW_LOCATIONS_MENU:
			return { ...state, open: true }
		case HIDE_LOCATIONS_MENU:
			return { ...state, open: false }
		case TOGGLE_LOCATIONS_MENU:
			return { ...state, open: !state.open }
		case SET_FILTER_LOCATIONS:
			return { ...state, searchTerm: action.payload }
		case TOGGLE_LOCATIONS:
			let locationId = action.payload
			let locationIndex = state.selected.indexOf(locationId)
			if (locationIndex === -1) {
				return { ...state, selected: [...state.selected, locationId]}
			} else {
				state.selected.splice(locationIndex, 1)
				return { ...state, selected: state.selected }
			}
		default:
			return state
	}
}
export const loadLocations = (dispatch) => {
	dispatch({ type: FETCH_LOCATIONS_BEGIN })
	fetch(`${getBaseUrl()}/api/locations`, { mode: 'cors' })
		.then(handleHttpError)
		.then(r => r.json())
		.then((json) => {
			dispatch({
				type: FETCH_LOCATIONS_SUCCESS,
				payload: json.locations
			})
		})
		.catch((error) => {
			dispatch({
				type: FETCH_LOCATIONS_FAIL,
				payload: error
			})
		})
}
export const toggleLocationsMenu = (dispatch) => {
	dispatch({ type: HIDE_SKILLS_MENU })
	dispatch({ type: HIDE_SOFTWARES_MENU })
	dispatch({ type: TOGGLE_LOCATIONS_MENU })
}
export const openLocationsMenu = (dispatch) => {
	dispatch({ type: SHOW_LOCATIONS_MENU })
}
export const closeLocationsMenu = (dispatch) => {
	dispatch({ type: HIDE_LOCATIONS_MENU })
}
export const searchLocations = (dispatch, searchTerm) => {
	dispatch({ type: SET_FILTER_LOCATIONS, payload: searchTerm })
}
export const toggleLocations = (dispatch, id) => {
	dispatch({ type: TOGGLE_LOCATIONS, payload: id })
}

// SKILL
const FETCH_SKILLS_BEGIN = 'FETCH_SKILLS_BEGIN'
const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS'
const FETCH_SKILLS_FAIL = 'FETCH_SKILLS_FAIL'
const SHOW_SKILLS_MENU = 'SHOW_SKILLS_MENU'
const HIDE_SKILLS_MENU = 'HIDE_SKILLS_MENU'
const TOGGLE_SKILLS_MENU = 'TOGGLE_SKILLS_MENU'
const SET_FILTER_SKILLS = 'SET_FILTER_SKILLS'
const TOGGLE_SKILLS = 'TOGGLE_SKILLS'
const initialSkills = {
	skills: [],
	selected: [],
	open: false,
	searchTerm: ''
}
const skillsReducer = (state = initialSkills, action) => {
	switch (action.type) {
		case FETCH_SKILLS_BEGIN:
			return { ...state, loading: true }
		case FETCH_SKILLS_SUCCESS:
			return { ...state, loading: false, skills: action.payload }
		case FETCH_SKILLS_FAIL:
			return { ...state, loading: false }
		case SHOW_SKILLS_MENU:
			return { ...state, open: true }
		case HIDE_SKILLS_MENU:
			return { ...state, open: false }
		case TOGGLE_SKILLS_MENU:
			return { ...state, open: !state.open }
		case SET_FILTER_SKILLS:
			return { ...state, searchTerm: action.payload }
		case TOGGLE_SKILLS:
			let locationId = action.payload
			let locationIndex = state.selected.indexOf(locationId)
			if (locationIndex === -1) {
				return { ...state, selected: [...state.selected, locationId]}
			} else {
				state.selected.splice(locationIndex, 1)
				return { ...state, selected: state.selected }
			}
		default:
			return state
	}
}
export const loadSkills = (dispatch) => {
	dispatch({ type: FETCH_SKILLS_BEGIN })
	fetch(`${getBaseUrl()}/api/skills`, { mode: 'cors' })
		.then(handleHttpError)
		.then(r => r.json())
		.then((json) => {
			dispatch({
				type: FETCH_SKILLS_SUCCESS,
				payload: json.skills
			})
		})
		.catch((error) => {
			dispatch({
				type: FETCH_SKILLS_FAIL,
				payload: error
			})
		})
}
export const toggleSkillsMenu = (dispatch) => {
	dispatch({ type: HIDE_LOCATIONS_MENU })
	dispatch({ type: HIDE_SOFTWARES_MENU })
	dispatch({ type: TOGGLE_SKILLS_MENU })
}
export const openSkillsMenu = (dispatch) => {
	dispatch({ type: SHOW_SKILLS_MENU })
}
export const closeSkillsMenu = (dispatch) => {
	dispatch({ type: HIDE_SKILLS_MENU })
}
export const searchSkills = (dispatch, searchTerm) => {
	dispatch({ type: SET_FILTER_SKILLS, payload: searchTerm })
}
export const toggleSkills = (dispatch, id) => {
	dispatch({ type: TOGGLE_SKILLS, payload: id })
}

// SOFTWARE
const FETCH_SOFTWARES_BEGIN = 'FETCH_SOFTWARES_BEGIN'
const FETCH_SOFTWARES_SUCCESS = 'FETCH_SOFTWARES_SUCCESS'
const FETCH_SOFTWARES_FAIL = 'FETCH_SOFTWARES_FAIL'
const SHOW_SOFTWARES_MENU = 'SHOW_SOFTWARES_MENU'
const HIDE_SOFTWARES_MENU = 'HIDE_SOFTWARES_MENU'
const TOGGLE_SOFTWARES_MENU = 'TOGGLE_SOFTWARES_MENU'
const SET_FILTER_SOFTWARES = 'SET_FILTER_SOFTWARES'
const TOGGLE_SOFTWARES = 'TOGGLE_SOFTWARES'
const initialSoftwares = {
	softwares: [],
	selected: [],
	open: false,
	searchTerm: ''
}
const softwaresReducer = (state = initialSoftwares, action) => {
	switch (action.type) {
		case FETCH_SOFTWARES_BEGIN:
			return { ...state, loading: true }
		case FETCH_SOFTWARES_SUCCESS:
			return { ...state, loading: false, softwares: action.payload }
		case FETCH_SOFTWARES_FAIL:
			return { ...state, loading: false }
		case SHOW_SOFTWARES_MENU:
			return { ...state, open: true }
		case HIDE_SOFTWARES_MENU:
			return { ...state, open: false }
		case TOGGLE_SOFTWARES_MENU:
			return { ...state, open: !state.open }
		case SET_FILTER_SOFTWARES:
			return { ...state, searchTerm: action.payload }
		case TOGGLE_SOFTWARES:
			let locationId = action.payload
			let locationIndex = state.selected.indexOf(locationId)
			if (locationIndex === -1) {
				return { ...state, selected: [...state.selected, locationId]}
			} else {
				state.selected.splice(locationIndex, 1)
				return { ...state, selected: state.selected }
			}
		default:
			return state
	}
}
export const loadSoftwares = (dispatch) => {
	dispatch({ type: FETCH_SOFTWARES_BEGIN })
	fetch(`${getBaseUrl()}/api/softwares`, { mode: 'cors' })
		.then(handleHttpError)
		.then(r => r.json())
		.then((json) => {
			dispatch({
				type: FETCH_SOFTWARES_SUCCESS,
				payload: json.softwares
			})
		})
		.catch((error) => {
			dispatch({
				type: FETCH_SOFTWARES_FAIL,
				payload: error
			})
		})
}
export const toggleSoftwaresMenu = (dispatch) => {
	dispatch({ type: HIDE_LOCATIONS_MENU })
	dispatch({ type: HIDE_SKILLS_MENU })
	dispatch({ type: TOGGLE_SOFTWARES_MENU })
}
export const openSoftwaresMenu = (dispatch) => {
	dispatch({ type: SHOW_SOFTWARES_MENU })
}
export const closeSoftwaresMenu = (dispatch) => {
	dispatch({ type: HIDE_SOFTWARES_MENU })
}
export const searchSoftwares = (dispatch, searchTerm) => {
	dispatch({ type: SET_FILTER_SOFTWARES, payload: searchTerm })
}
export const toggleSoftwares = (dispatch, id) => {
	dispatch({ type: TOGGLE_SOFTWARES, payload: id })
}

export const closeAllMenus = (dispatch) => {
	closeLocationsMenu(dispatch)
	closeSkillsMenu(dispatch)
	closeSoftwaresMenu(dispatch)
}

// DRAWER MENU
const SHOW_DRAWER_MENU = 'SHOW_DRAWER_MENU'
const HIDE_DRAWER_MENU = 'HIDE_DRAWER_MENU'
const initialDrawer = {
	open: false
}
const drawerMenuReducer = (state = initialDrawer, action) => {
	switch (action.type) {
		case SHOW_DRAWER_MENU:
			return { open: true }
		case HIDE_DRAWER_MENU:
			return { open: false }
		default:
			return state
	}
}
export const showDrawerMenu = (dispatch) => {
	dispatch({ type: SHOW_DRAWER_MENU })
}
export const hideDrawerMenu = (dispatch) => {
	dispatch({ type: HIDE_DRAWER_MENU })
}

// ROUTE
const SET_ROUTE = 'SET_ROUTE'
const initialRouter = {
	route: 'home'
}
const routerReducer = (state = initialRouter, action) => {
	switch (action.type) {
		case SET_ROUTE:
			return { route: action.payload }
		default:
			return state
	}
}
export const routeTo = (dispatch, route) => {
	dispatch({ type: SET_ROUTE, payload: route })
	dispatch({ type: HIDE_DRAWER_MENU })
	dispatch({ type: HIDE_LOCATIONS_MENU })
	dispatch({ type: HIDE_SKILLS_MENU })
	dispatch({ type: HIDE_SOFTWARES_MENU })
	setTimeout(() => window.dispatchEvent(new Event('resize')))
}

// GLOBAL STORE
const rootReducer = combineReducers({
	entries: entriesReducer,
	locations: locationsReducer,
	skills: skillsReducer,
	softwares: softwaresReducer,
	drawerMenu: drawerMenuReducer,
	router: routerReducer
})
const initialState = {
	entries: initialEntries,
	locations: initialLocations,
	skills: initialSkills,
	softwares: initialSoftwares,
	drawerMenu: initialDrawer,
	router: initialRouter
}
export const store = createStore(rootReducer, initialState)
