import React, { Component } from "react";
import { Text, View, Image, Button, Modal, ImageBackground } from "react-native";

class WelcomeScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true
        }
    }

    componentDidMount() {}

    goToHome() {
        const { navigate } = this.props.navigation;
        this.setState({ modalVisible: false });
        navigate("Home");
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                style={{ width: "100%", height: "100%", padding: 20, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

                <View style={styles.imageContainer}>
                    <Image style={{ borderBottomLeftRadius: 60, borderBottomRightRadius: 40, width: "100%", height: "100%"}} source={{uri: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}}></Image>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textContainerText}>Welcome, with this app you can see the list of people and their details, also you can take photos and associate with them.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button onPress={() => this.goToHome()} color={"#FF6C69"} title={"Understood"}></Button>
                    </View> 
                </View>
            </Modal>
        );
    }
}

export default WelcomeScreen;

const styles = {
    imageContainer: {
        height: 400,
        position: "relative"
    },
    textContainer: {
        fontWeight: "bold", 
        padding: 20,
        marginBottom: 20
    },
    textContainerText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    buttonContainer: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width: "80%"
    }
}