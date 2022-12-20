import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native';
import COLORS from '../../conts/colors';

const Loader = ({ visible = false }) => {
    const { height, width } = useWindowDimensions();
    return (
        visible && (
            <View style={[style.container, { height, width }]}>
                <View style={style.loader}>
                    <ActivityIndicator size="large" color={COLORS.blue} />
                    <Text style={{ marginRight: 10, fontSize: 16 }}>Загрузка...</Text>
                </View>

            </View>
        )
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',


    },
    loader: {
        height: 70,
        backgroundColor: COLORS.white,
        marginHorizontal: 50,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
})

export default Loader;