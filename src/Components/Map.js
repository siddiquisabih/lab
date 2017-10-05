import React, { Component } from 'react'
import { Container, Button, Text, Header, Content, List, ListItem, Left, Icon, Title, Body, Label, Right, Thumbnail, Spinner, Item, Picker } from "native-base"
import MapView from "react-native-maps"
import MapMidware from "../Store/Middleware/MapMiddleware"
import { connect } from "react-redux"
import { Image } from "react-native"

function mapStateToProps(state) {
    return {
        componentState: state.MapReducer,
        latitude: state.MapReducer.region.latitude,
        isLocationError: state.MapReducer.locationError,
        longitude: state.MapReducer.region.longitude,
        isUserLocation: state.MapReducer.userLocation,
        region: state.MapReducer.region,
        getPlace: state.MapReducer.getPlaces,
        places: state.MapReducer.places,
        getSpecific: state.MapReducer.specificData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userLocation: () => {
            dispatch(MapMidware.GetUserLocation())
        },

        userFilter: (placeId) => {
            dispatch(MapMidware.getSpecificResult(placeId))
        }

    }
}
class MapComponent extends Component {
    constructor() {
        super()
        this.state = {
            latitude: 24.8716,
            longitude: 67.0599,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0321,
            statusBarHeight: {},
            statePlaces: [],
        }
    }

    componentWillMount() {
        setTimeout(() => this.setState({ statusBarHeight: styles.map }), 500);
        console.disableYellowBox = true
        setTimeout(() => {
            if (!this.props.getSpecific) {
                this.props.userLocation()
            }
        }, 1000);


    }



    componentWillReceiveProps(prop) {

        if (prop.isLocationError) {
            alert("Turn On Your Location Or GPS And Open The Application Again")
        }

        if (prop.isUserLocation) {
            this.setState({
                longitude: prop.region.longitude,
                latitude: prop.region.latitude,
            })

        }

        if (prop.getPlace) {
            this.setState({ statePlaces: prop.places })
        }
    }

    static navigationOptions = {
        title: "Map",
        drawerIcon: () => {
            return (
                <Icon name="md-locate" />
            )
        }
    }

    getId(placeId) {
        this.props.userFilter(placeId)
        this.props.navigation.navigate("filterScreenRoute")
    }

    renderList() {
        return (

            <List>
                {this.state.statePlaces.map((m, v) => {
                    return (
                        <ListItem
                            style={styles.listView}
                            key={v}
                        >
                            <Image
                                style={{ width: 30, height: 30, marginRight: 10 }}
                                source={{ uri: m.icon }}
                            />
                            <Body
                            >
                                <Text>{m.name}</Text>
                                <Text
                                    style={styles.textNote}
                                    note
                                >{m.vicinity}</Text>
                            </Body>
                            <Right>
                                <Button transparent
                                    success
                                    onPress={() => {
                                        this.getId(m.place_id)
                                    }
                                    }
                                >
                                    <Text
                                        style={styles.viewButton}
                                    >view</Text>
                                </Button>
                            </Right>

                        </ListItem>

                    )
                })}
            </List>

        )
    }


    spinnerOrList() {
        if (this.props.getPlace) {

            return this.renderList()
        }

        return <Spinner color="blue" />

    }

    handleError() {
        if (this.state.statePlaces[0] === undefined) {
            return <Text note>No Nearby Places.. check your network connection or select Nearby distance from drawer</Text>
        }


    }


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
                        >
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tourist Guide</Title>
                    </Body>
                    <Right />
                </Header>


                <Container style={{ justifyContent: "center" }}>

                    <Container>
                        <MapView
                            style={this.state.statusBarHeight}
                            initialRegion={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: this.state.latitudeDelta,
                                longitudeDelta: this.state.longitudeDelta,
                            }}
                            provider="google"
                            mapType="standard"
                            followsUserLocation
                            showsUserLocation
                            showsCompass
                            showsMyLocationButton
                            toolbarEnabled
                        >


                        </MapView>

                    </Container>
                    <Container style={styles.customView}>
                        <Content>
                            {this.spinnerOrList()}
                        </Content>

                    </Container>
                    {this.handleError()}

                </Container>


            </Container >

        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)

const styles = {
    container: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    },
    customView: {
        backgroundColor: "#b0bec5"
    },

    listView: {
        marginTop: 10
    },

    textNote: {
        color: "#0d47a1"
    },
    viewButton: {
        color: "#b71c1c",
    },

    PickerStyle: {
        color: "red",
        backgroundColor: "#b0bec5",

    }

}





















































// const styles = {
//     container: {
//         position: 'absolute',
//         top: 50,
//         left: 0,
//         right: 0,
//         bottom: 90,
//         justifyContent: 'flex-end',
//         // alignItems: 'center',
//         // backgroundColor: "red"
//     },
//     map: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         // bottom: 340,
//         bottom: 0,

//     },
//     customView: {
//         marginTop: 310,
//         // backgroundColor: "#455A64"
//         backgroundColor: "#b0bec5"

//     },
//     listView: {
//         marginTop: 10
//     },

//     textNote: {
//         color: "#0d47a1"
//     },
//     viewButton: {
//         color: "#b71c1c",
//     },

//     PickerStyle: {
//         color: "red",
//         backgroundColor: "#b0bec5",

//     }

// }


















// < Container >

//                 <Header>

//                     <Left>
//                         <Button transparent
//                             onPress={() => { this.props.navigation.navigate('DrawerOpen') }}
//                         >
//                             <Icon name='menu' />
//                         </Button>
//                     </Left>
//                     <Body>
//                         <Title>Tourist Guide</Title>
//                     </Body>

//                 </Header>



//                 <Container
//                     style={this.state.statusBarHeight}
//                 //style={styles.container}
//                 >


//                     <MapView
//                         style={styles.map}
//                         initialRegion={{
//                             latitude: this.state.latitude,
//                             longitude: this.state.longitude,
//                             latitudeDelta: this.state.latitudeDelta,
//                             longitudeDelta: this.state.longitudeDelta,
//                         }}
//                         provider="google"
//                         mapType="standard"
//                         followsUserLocation
//                         showsUserLocation
//                         showsCompass
//                         showsMyLocationButton
//                         toolbarEnabled
//                     >
//                     </MapView>
//                 </Container>


//                 <Container
//                     style={styles.customView}
//                 >

//                     <Content>
//                         {this.spinnerOrList()}

//                     </Content>
//                 </Container>


//             </Container >