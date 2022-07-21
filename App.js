import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import {Ionicons} from "@expo/vector-icons"
import { useAssets } from 'expo-asset';

export default function App() {
    const [assets] = useAssets([require("./b9472222.png")]);
    const [loaded] = Font.useFonts(Ionicons.font);
    if (!assets || !loaded) {
        return (
            <View
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Hi incomplete SplashScreen Demo! 👋</Text>
                <Entypo name="rocket" size={30}/>
            </View>
            );
    }
    return (
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>SplashScreen Demo~~~! 👋</Text>
            <Entypo name="rocket" size={30}/>
            <Image style={styles.logo}
                   source={{
                       uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/640px-SpongeBob_SquarePants_character.svg.png',
                   }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
});
