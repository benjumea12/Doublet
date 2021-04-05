import React, { useContext } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
// Styled
import { styles } from './Levels.styled'
// Context
import AppContext from '../../../App.context'

const Levels = () => {
    const { setLevel } = useContext(AppContext)

    return( 
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.buttom}
                onPress={() => setLevel(3)}
            >
                <Text style={styles.text}>Nivel 1</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.buttom}
                onPress={() => setLevel(4)}
            >
                <Text style={styles.text}>Nivel 2</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.buttom}
                onPress={() => setLevel(5)}
            >
                <Text style={styles.text}>Nivel 3</Text>
            </TouchableHighlight>
        </View>
    )
}

export default Levels