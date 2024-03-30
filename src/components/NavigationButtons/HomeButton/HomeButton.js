import React from 'react'

import { useNavigation } from '@react-navigation/native';

// icons
import { Entypo } from '@expo/vector-icons';

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles, youziDimensions } from '../../../styles/youziStyles';
import IconButton from '../../Modules/Buttons/IconButton';

const styles = StyleSheet.create({
    homeButton: {
        // backgroundColor: 'black',
        position: 'absolute',
        top: youziDimensions.vh / 18,
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
            // iconComponent={<AntDesign name="setting" size={40} color={youziColors.buttonBackgroundAccent} />}
            iconComponent={<Entypo name="home" size={40} color={youziColors.buttonBackgroundAccent} />}
            onPress={() => { navigateToHome() }}
            style={styles.homeButton} // can pass styles b/c ...props
        />
    )
}