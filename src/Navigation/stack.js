import { StackNavigator } from "react-navigation"
import MapComponent from "../Components/Map"
import FilterScreen from "../Components/filterscreen"
import Nearby from "../Components/nearbyPlaces"
import Polyline from "../Components/polyline"

import Drawer from "../Navigation/Drawer"

import Splash from "../Components/splash"
import Login from "../../src/Components/Authentication/Login"
import Signup from "../../src/Components/Authentication/Signup"


const MainRoute = StackNavigator({
    SplashRoute : {
        screen : Splash
    },

    loginRoute: {
        screen: Login
    },

    signupRoute: {
        screen: Signup
    },

    Drawer: {
        screen: Drawer,
        navigationOptions: props => ({
            header: false,
        })
    },

    NearbyRoute: {
        screen: Nearby
    },

    filterScreenRoute: {
        screen: FilterScreen
    },

    PolyLineRoute: {
        screen: Polyline
    },
})

export default MainRoute