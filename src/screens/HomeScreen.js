import React, { Component } from "react";
import separator from "../components/SeparatorComponent";
import Constants from "../utils/constants";
import { FlatList, View, ActivityIndicator, Text, Image, Button, TouchableOpacity } from "react-native";


import Dots from 'react-native-dots-pagination';

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home'
    };

    _isMounted = false;
    NUM_OF_RESULTS = 10;

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            currentPage: 0
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getDataFromApi(this.NUM_OF_RESULTS);
    }

    render() {
        const { navigate } = this.props.navigation;
        
        if (this.state.isLoading) {
            return(
                <View style={styles.view}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <View style={styles.view}>
                <FlatList
                    data={this.state.users}
                    ItemSeparatorComponent={ separator }
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.listItem} onPress={() => navigate('Profile', { user: item })}>
                            <Image
                                style={styles.listItemImg} 
                                source={{ uri: item.picture.thumbnail}}
                                PlaceholderContent={<ActivityIndicator />}>
                            </Image>
                            <View style={styles.listItemTextContainer}>
                                <Text 
                                    style={styles.listItemTextFirst}>
                                        {item.name.title}, {item.name.first}, {item.name.last}
                                </Text>
                                <Text style={styles.listItemTextSecond}>{item.location.country}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.login.uuid}/>
                <View style={styles.paginatorContainer}>
                    <Button style={{margin: 10}} color={"#FF6C69"} title={"Previous"} onPress={() => this.getPreviousPage()}></Button>
                    <Button style={{margin: 10}} color={"#FF6C69"} title={"Next"} onPress={() => this.getNextPage()}></Button>
                </View>
                <Dots length={8} active={this.state.currentPage} />
            </View>
        )
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getPreviousPage() {
        let pageNumber = this.state.currentPage - 1;
        if (pageNumber >= 0) {
            this.setState({ currentPage: pageNumber});
            this.getDataFromApi(this.NUM_OF_RESULTS);
        }
    }

    getNextPage() {
        let pageNumber = this.state.currentPage + 1;
        if (pageNumber <= 10) {
            this.setState({ currentPage: pageNumber });
            this.getDataFromApi(this.NUM_OF_RESULTS);
        }
    }

    getDataFromApi(amountOfUsers) {
        const endpoint = `${Constants.apiUrl}/?results=${amountOfUsers}`;

        return fetch(endpoint)
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (this._isMounted) {
                    this.setState({
                        users: jsonResponse.results,
                        isLoading: false
                    }, () => {});
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

export default HomeScreen;

const styles = {
    view: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 70,
        width: "100%",
        minHeight: "100%"
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    listItemImg: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 50
    },
    listItemTextContainer: {
        flex: 2,
        textAlign: "center",
    },
    listItemTextFirst: {
        marginBottom: 5,
        color: "black"
    },
    listItemTextSecond: {
        color: "gray"
    },
    paginatorContainer: {
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white"
    }
}