import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import MapView from "react-native-maps"
import { connect } from "react-redux"
import { Container, Text, Button } from "native-base"


function mapStateToProps(state) {
    return {
        componentState: state,
        coord: state.MapReducer.userNavigateCoords,
        latitude: state.MapReducer.region.latitude,
        longitude: state.MapReducer.region.longitude,
        timeDuration: state.MapReducer.timeDuration
    }
}

class Polyline extends Component {
    static navigationOptions = {
        header: false
    }

    constructor() {
        super()
        this.state = {
            statusBarHeight: {},
            newData: [],
            distance: [],


        }
    }


    componentWillReceiveProps(prop) {
        const arry = []
        prop.timeDuration.map((m) => {
            this.state.newData = m.legs
            // arry.push(m.legs)
        })
        // this.setState({ newData: arry })

        

    }







    componentWillMount() {
        setTimeout(() => this.setState({ statusBarHeight: styles.container }), 500);
    }



    render() {
        return (
            <Container style={this.state.statusBarHeight}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: this.props.latitude,
                        longitude: this.props.longitude,
                        latitudeDelta: 0.0322,
                        longitudeDelta: 0.0321,
                    }}
                    provider="google"
                    mapType="standard"
                    followsUserLocation
                    showsUserLocation
                    showsCompass
                    showsMyLocationButton
                    toolbarEnabled
                >
                    <MapView.Polyline
                        coordinates={this.props.coord}
                        strokeWidth={4}
                        lineCap="round"
                        strokeColor="green" />

                </MapView>




            </Container>
        )
    }
}

export default connect(mapStateToProps, null)(Polyline)


const styles = {

    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: "red"
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 300,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
}