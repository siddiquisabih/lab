import MapAction from "../../Store/Action/MapAction"

const initialState = {
    userLocation: false,
    region: {},

    userLocationError: '',
    locationError: false,

    getPlaces: false,
    places: [],
    specificData: false,

    filterData: false,
    photos: [],
    getFilterdData: [],
    getPhotos: false,


    navigate: false,
    userNavigateCoords: [],


    timeDuration: [],


}



function MapReducer(state = initialState, action) {
    switch (action.type) {

        case MapAction.location:
            return Object.assign({}, state, { userLocation: true, region: action.data })


        case MapAction.locationError:
            return Object.assign({}, state, { userLocationError: action.data, locationError: true })


        case MapAction.allNearbyPlaces:
            return Object.assign({}, state, { getPlaces: true, places: action.data  ,specificData: false})


        case MapAction.filterdNearbyplaces:
            return Object.assign({}, state, { getPlaces: true, places: action.data, specificData: true })


        case MapAction.userRequestPlace:
            return Object.assign({}, state, { filterData: true, getFilterdData: action.data, photos: action.photos, getPhotos: true })


        case MapAction.navigation:
            return Object.assign({}, state, { navigate: true, userNavigateCoords: action.data })


        case MapAction.timeDuration:
            return Object.assign({}, state, { timeDuration: action.data })


        default:
            return state;
    }


}


export default MapReducer