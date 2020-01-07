import React, { Component } from "react";
import { Text, View, Image, Button, Modal, ImageBackground } from "react-native";

import { RNCamera } from "react-native-camera";
import { ScrollView } from "react-native-gesture-handler";

class ProfileScreen extends Component {

    static navigationOptions = {
        title: 'Details',
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            imagesSrc: []
        };
    }

    render() {
        const { navigation } = this.props;
        const user = navigation.getParam('user', {});
        return(
            <ScrollView style={styles.mainContainer}>
                <View style={styles.avatarContainer}>
                    <Image style={{ width: 200, height: 200, borderRadius: 100 }} source={{ uri: user.picture.large}}></Image>
                    <Text style={{ fontSize: 25 }}>{user.name.title}. {user.name.first}, {user.name.last}</Text>
                    <Text style={{ fontSize: 20 }}>{user.location.country} - {user.location.state} - {user.location.city}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoItemText}>Phone: </Text>
                        <Text style={styles.infoItemText}>{user.phone}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoItemText}>Cell: </Text>
                        <Text style={styles.infoItemText}>{user.cell}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoItemText}>Email: </Text>
                        <Text style={styles.infoItemText}>{user.email}</Text>
                    </View>
                    {
                        this.state.imageSrc != "" &&
                        <View style={{ width: "100%", alignItems: "center", flexDirection: "row", flexWrap: "wrap" }}>
                            {
                                this.state.imagesSrc.map((imageSrc) => {
                                    return <Image style={{height: 100, width: 100, margin: 10}} source={{uri: imageSrc }}></Image>
                                })
                            }
                        </View>
                    }
                    <View style={{height: 100}}>
                        <Button color={"#FF6C69"} onPress={() => {this.setModalVisible(!this.state.modalVisible)}} title="Add new photo of this user"></Button>
                    </View>
                </View>
                
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    style={{ height: "100%", padding: 20 }}>
                    <ImageBackground style={{width: "100%", height: "100%"}} source={{uri: "http://hdwpro.com/wp-content/uploads/2016/11/Island-Free-Wallpaper.jpg"}}>
                        <View style={{ padding: 20, height: "70%"}}>
                            <RNCamera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={styles.cameraPreview}
                                type={RNCamera.Constants.Type.back}
                                flashMode={RNCamera.Constants.FlashMode.off}
                                androidCameraPermissionOptions={{
                                    title: 'Permission to use camera',
                                    message: 'We need your permission to use your camera',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancel',
                                }}>
                            </RNCamera>
                        </View>
                        <View style={{width: "100%", marginTop: 40, marginBottom: 10, alignItems: "center", justifyContent: "center" }}>
                            <View style={{width: "90%", heigth: 30, marginTop: 40, marginBottom: 5}}>
                                <Button color={"#FF6C69"} title="Take photo" onPress={this.takePicture.bind(this)}></Button>
                            </View>
                            <View style={{width: "90%", heigth: 30, marginTop: 40, marginBottom: 5}}>
                                <Button color={"#FF6C69"} title="Close camera" onPress={() => { this.setModalVisible(!this.state.modalVisible); }}></Button>
                            </View>
                        </View>
                    </ImageBackground>
                </Modal>
            </ScrollView>
        )
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    takePicture = async() => {
        if (this.camera) {
            try {
                const options = { quality: 0.5, base64: true };
                const data = await this.camera.takePictureAsync(options);
                this.setModalVisible(!this.state.modalVisible);
                this.setState({ imagesSrc: [...this.state.imagesSrc, data.uri] });
            } catch(error) {
                console.error(error);
            }
        }
    };
}

const styles = {
    cameraPreview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
    mainContainer: {
        padding: 10,
        width: "100%",
        minHeight: "100%",
        backgroundColor: "white"
    },
    avatarContainer: {
        height: 400,
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: "#ccc",
        borderRadius: 20,
    },
    infoContainer: {
        flexDirection: "column",
        padding: 30,
        marginTop: 30,
    },
    infoItem: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: 30
    },
    infoItemText: {
        fontSize: 20
    }
}

export default ProfileScreen