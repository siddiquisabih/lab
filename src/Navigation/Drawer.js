import { DrawerNavigator } from "react-navigation"

import MapComponent from "../Components/Map"
import Nearby from "../Components/nearbyPlaces"
import Signout from "../Components/Authentication/Logout"


const Drawer = DrawerNavigator({

    MapRoute: {
        screen: MapComponent
    },
    NearbyRoute: {
        screen: Nearby
    },

    SignoutRoute: {
        screen: Signout
    },



})



export default Drawer