import React from 'react'

// components
import IconButton from '../../Modules/Buttons/IconButton';

// navigation
import { useNavigation } from '@react-navigation/native';

// assets
import { Entypo } from '@expo/vector-icons';

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    homeButton: {
        // backgroundColor: 'black',
        position: 'absolute',
        top: youziDimensions.vh / 16,
        right: 20
    }
});

export default function HomeButton() {
    const navigation = useNavigation();
    const navigateToHome = () => {
        navigation.navigate('home-page');
    }

    return (
        <IconButton
            // iconComponent={<Entypo name="home" size={40} color={youziColors.buttonBackgroundAccent} />}
            iconComponent={<Entypo name="home" size={35} color={youziColors.blackText} />}
            onPress={() => { navigateToHome() }}
            style={styles.homeButton} // can pass styles b/c ...props
        />
    )
}