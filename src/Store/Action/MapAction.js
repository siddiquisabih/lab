class MapAction {


    static location = "location"
    static locationError = "locationError"
    static filterdNearbyplaces = "filterdNearbyplaces"
    static allNearbyPlaces = "allNearbyPlaces"
    static userRequestPlace = "userRequestPlace"
    static navigation = "navigation"
    static timeDuration = "timeDuration"


    static userLocation(value) {
        return {
            type: MapAction.location,
            data: value
        }
    }


    static userLocationError(value) {
        return {
            type: MapAction.locationError,
            data: value
        }
    }


    static userNearbyPlaces(value) {
        return {
            type: MapAction.filterdNearbyplaces,
            data: value
        }
    }


    static allPlaces(value) {
        return {
            type: MapAction.allNearbyPlaces,
            data: value
        }
    }



    static userFilterdPlace(value, photosArray) {
        return {
            type: MapAction.userRequestPlace,
            data: value,
            photos: photosArray
        }
    }

    static userNavigation(value) {
        return {
            type: MapAction.navigation,
            data: value
        }
    }


    



    static UserTimeDuration(value){
        return{
            type:MapAction.timeDuration,
            data : value
        }
    }



}
export default MapAction