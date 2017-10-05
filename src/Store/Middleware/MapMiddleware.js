import MapAction from "../../Store/Action/MapAction"
import axios from "axios"
import Polyline from '@mapbox/polyline';


const region = {
    latitude: 24.8716,
    longitude: 67.0599,
    latitudeDelta: 0.4922,
    longitudeDelta: 0.3421,
}

const allNearbyforFilter = []

const api = "AIzaSyA3GwmUUONmop27PSuXTOFpsEvJADBYx-8"

class MapMidware {

    static GetUserLocation() {
        return (dispatch) => {


            navigator.geolocation.getCurrentPosition((pos) => {
                // if (pos) {
                const crd = pos.coords;

                region.latitude = pos.coords.latitude

                region.longitude = pos.coords.longitude

                dispatch(MapAction.userLocation(pos.coords))




                axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${crd.latitude},${crd.longitude}&radius=500&key=${api}`)

                    // yai nechy wala link band kr k uper wala kholna hai link..

                    // axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${24.8716},${67.0599}&radius=500&key=${api}`)

                    .then((responce) => {


                        allNearbyforFilter = responce.data.results

                        dispatch(MapAction.allPlaces(responce.data.results))




                    })



                // }
            },
                (err) => {
                    // alert('check your network conectivity and location or gps')

                    dispatch(MapAction.userLocationError(err.message))
                })
                ,
                () => {
                    var options = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };
                }
        }
    }


    static GetNearbyPlaces(data) {
        return (dispatch) => {

            const latitude = region.latitude

            const longitude = region.longitude

            const type = data.type

            const radius = data.radius

            axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${api}`)
                .then((responce) => {
                    dispatch(MapAction.userNearbyPlaces(responce.data.results))
                })
        }
    }


    static getSpecificResult(placeId) {

        filteredData = []
        photo = []
        return (dispatch) => {
            axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${api}`)
                .then((responce) => {
                    filteredData.push(responce.data.result)
                    filteredData.map((obj) => {
                        photo.push(obj.photos)
                    })
                    dispatch(MapAction.userFilterdPlace(filteredData, photo))
                })
        }
    }



    static getUserDirection(startLoc, destinationLoc) {
        coordsfound = {}
        return (dispatch) => {


            // try {
            //     let resp = fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
            //     console.log(resp, "responcesssssssssssssss")
            //     console.log(startLoc, destinationLoc, "dataaaa")
            //     let respJson = resp.json();
            //     let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            //     let coords = points.map((point, index) => {
            //         return {
            //             latitude: point[0],
            //             longitude: point[1]
            //         }
            //     })
            //     coordsfound: coords

            //     dispatch(MapAction.userNavigation(coordsfound))

            // } catch (error) {
            //     alert(error)
            //     console.log('err', error)
            //     return error
            // }



            // const resp = axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=65.96669666666666%20,%20-18.5333&destination=24.8717616%20,%2067.0597137&key=AIzaSyBggCP2zVKDXAtrwhJ_6MeZ-TjsYf8Hdvo`)
            const resp = axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${api}`)


                .then((responce) => {
                    let points = Polyline.decode(responce.data.routes[0].overview_polyline.points);
                    let coords = points.map((point, index) => {
                        return {
                            latitude: point[0],
                            longitude: point[1]
                        }
                    })

                    dispatch(MapAction.userNavigation(coords))
                    dispatch(MapAction.UserTimeDuration(responce.data.routes))
                    coordsfound: coords

                })

        }
    }
}
export default MapMidware



