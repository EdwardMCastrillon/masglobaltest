import React from 'react';
import { View } from 'react-native'

export default separator = () => {
    return(
        <View style={styles}></View>
    )
}

const styles = {
    height: 1,
    width: "100%",
    backgroundColor: "gray",
    marginVertical: 10
}