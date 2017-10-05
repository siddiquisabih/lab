import React, { Component } from 'react'
import * as firebase from "firebase"
import Store from "../src/Store/index"
import { Provider } from "react-redux"
import MainRoute from "../src/Navigation/stack"


// Initialize Firebase
var config = {
    apiKey: "AIzaSyA3GwmUUONmop27PSuXTOFpsEvJADBYx-8",
    authDomain: "tourist-7a1d4.firebaseapp.com",
    databaseURL: "https://tourist-7a1d4.firebaseio.com",
    projectId: "tourist-7a1d4",
    storageBucket: "tourist-7a1d4.appspot.com",
    messagingSenderId: "277016575372"
};
firebase.initializeApp(config);


class App extends Component {
    render() {
        return (
            <Provider store={Store} >
                <MainRoute />
            </Provider>
        )
    }
}
export default App