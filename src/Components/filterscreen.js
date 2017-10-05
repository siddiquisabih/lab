import React, { Component } from 'react'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import MapMidware from "../Store/Middleware/MapMiddleware"
import { connect } from "react-redux"
import { Image, Dimensions } from 'react-native';


function mapStateToProps(state) {
    return {
        componentState: state,
        filterData: state.MapReducer.getFilterdData,
        initialRegion: state.MapReducer.region,
        photos: state.MapReducer.photos,
        getphotos: state.MapReducer.getPhotos,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        userNavigate: (start, destination) => {
            dispatch(MapMidware.getUserDirection(start, destination))
        }
    }
}


class FilterScreen extends Component {

    static navigationOptions = {
        header: false
    }

    constructor() {
        super()
        this.state = {
            location: {},
            photos: [],
            name: '',
            address: 'No Address Available',
            photoRef: [],
            rating: 'No Rating Available',
            website: 'No Website Available',
            number: 'No Contact Number Available',
            noImage: false,

        }
    }


    componentWillReceiveProps(prop) {
        prop.filterData.map((obj) => {


            this.setState({ photos: obj.photos, name: obj.name })

            if (obj.geometry.location) {
                this.setState({
                    location: obj.geometry.location,
                })
            }
            if (obj.formatted_address) {
                this.setState({
                    address: obj.formatted_address,
                })
            }
            if (obj.rating) {
                this.setState({
                    rating: obj.rating,
                })
            }
            if (obj.website) {
                this.setState({
                    website: obj.website,
                })
            }
            if (obj.number) {
                this.setState({
                    number: obj.number,
                })
            }
        })

        if (prop.photos[0] === undefined) {
            this.setState({ noImage: true })
        }
    }


    componentWillMount() {
        setTimeout(() => this.photos(), 1000)
        this.setState({ noImage: false })
    }

    go() {
        const destinationLatitude = this.state.location.lat
        const destinationLongitude = this.state.location.lng

        const initialLatitude = this.props.initialRegion.latitude
        const initialLongitude = this.props.initialRegion.longitude

        const InitialPoints = `"${initialLatitude} , ${initialLongitude}"`

        const desLongAndLat = `"${destinationLatitude} , ${destinationLongitude}"`

        this.props.userNavigate(InitialPoints, desLongAndLat)

        this.props.navigation.navigate("PolyLineRoute")
    }


    photos() {

        arr = []
        if (this.state.photos) {
            this.state.photos.map((obj) => {
                arr.push(obj.photo_reference)
            })
            this.setState({ photoRef: arr, noImage: false })
        }
    }


    //yai bekaar ho gaya hai
    renderPhoto() {
        if (this.state.photoRef) {
            this.state.photoRef.map((m, v) => {
                return (

                    <Image key={v}
                        style={{ width: 400, height: 400 }}
                        source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${m}&key=AIzaSyA3GwmUUONmop27PSuXTOFpsEvJADBYx-8` }}
                    />
                )
            })

        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: "#004D40", }} >


                <Container>
                    <Card style={{ backgroundColor: "#004D40", justifyContent: "center" }}>
                        <Content>

                            {
                                (this.state.photoRef) ?
                                    this.state.photoRef.map((m, v) => {

                                        return (

                                            <Image key={v}
                                                style={{ width: Dimensions.get('window').width, height: 300, marginBottom: 15, }}
                                                source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${m}&key=AIzaSyA3GwmUUONmop27PSuXTOFpsEvJADBYx-8` }}
                                            />
                                        )
                                    })
                                    : console.log("no image")

                            }
                            {(this.state.noImage) ?

                                <Image
                                    style={{ width: Dimensions.get('window').width, height: 300, marginBottom: 15, }}
                                    source={require("../noImage/noimage.png")}
                                />
                                :
                                console.log("Image")
                            }

                        </Content>

                    </Card>

                </Container>

                <Container style={{ justifyContent: "center", justifyContent: "space-around", alignItems: "center" }} >
                    <Text>{this.state.name}</Text>
                    <Text note>Address :  {this.state.address}</Text>
                    <Text note>Website :  {this.state.website}</Text>
                    <Text note>Number :  {this.state.number}</Text>
                    <Text note>Rating :  {this.state.rating}</Text>
                </Container>

                <Button
                    style={{ alignSelf: "center", backgroundColor: "#00796B" }}
                    onPress={this.go.bind(this)}>
                    <Text>Go</Text>
                </Button>
            </Container>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen)
const style = {
    image: {
        width: Dimensions.get('window').width
    }
}