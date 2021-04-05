import React, { useContext } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import { styles } from './Times.styled'

import AppContext from '../../../App.context'

const Times = () => {
    const { setLevel, bestTimes, defaultStoreTimes } = useContext(AppContext)

    return(
        <View>
            <Text style={styles.title}>Mejores Tiempos</Text>
            <Text style={styles.text}>Nivel 1: { bestTimes[0].min }:{ bestTimes[0].seg }:{ bestTimes[0].cen }</Text>
            <Text style={styles.text}>Nivel 2: { bestTimes[1].min }:{ bestTimes[1].seg }:{ bestTimes[1].cen }</Text>
            <Text style={styles.text}>Nivel 3: { bestTimes[2].min }:{ bestTimes[2].seg }:{ bestTimes[2].cen }</Text>
            <TouchableHighlight
                    onPress={() => defaultStoreTimes()}
            >
                <Text style={styles.textTimes}>Reiniciar</Text>
            </TouchableHighlight>
            <TouchableHighlight
                    style={styles.buttomReturn}
                    onPress={() => setLevel(0)}
            >
                <Text style={styles.returnText}>Volver</Text>
            </TouchableHighlight>
        </View>
    )
}

export default Times