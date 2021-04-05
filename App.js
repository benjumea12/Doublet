import React, { useState, useEffect } from 'react'
import { Text, View, TouchableWithoutFeedback, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// Components
import { Levels } from './src/components'
// Pages
import Game from './src/pages/Game'
import Times from './src/pages/Times'
// Context
import AppContext from './App.context'
// Style
import { styles } from './App.styled'

export default function App() {
  const defaultBestTimes = [
    {cen: 0, seg: 0, min: 0},
    {cen: 0, seg: 0, min: 0},
    {cen: 0, seg: 0, min: 0}
  ]

  const [level, setLevel] = useState(0)
  const [bestTimes, setBestTimes] = useState(defaultBestTimes)

  const getTimes = async () => {
    try {
      const value = await AsyncStorage.getItem('@TIMES')
      if(value !== null) {
        setBestTimes(JSON.parse(value))
      } else {
        storeTimes(defaultBestTimes)
      }
    } catch(e) {
      // error reading value
    }
  }

  const defaultStoreTimes = async () => {
    storeTimes(defaultBestTimes)
  }

  const storeTimes = async (value) => {
    try {
      await AsyncStorage.setItem('@TIMES', JSON.stringify(value))
      getTimes()
    } catch (e) {
      // saving error
    }
  }

  const valueContext = {
    level, setLevel, bestTimes, setBestTimes, storeTimes, defaultStoreTimes
  }

  useEffect(() => {
    getTimes()
  }, [])

  return (
    <AppContext.Provider value={valueContext}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Doublet</Text>
        </View>
        <View style={styles.home}>
          {
            level == 0 &&
              <View style={styles.center}>
                <Text style={styles.text}>¿Quieres jugar ya?</Text>
                <Text style={styles.text}>Seleciona el nivel</Text>
                <Levels />
              </View>
          }
          {
            level > 0 && <Game />
          }
          { 
            level == 0 && 
              <View style={styles.center}>
                <TouchableWithoutFeedback onPress={() => setLevel(-1)}>
                  <Text style={styles.textTimes}>Mejores tiempos</Text>
                </TouchableWithoutFeedback>
              </View>
          }
          {
            level == -1 && <Times />
          } 
        </View>
      </View>
      
      <StatusBar barStyle='dark-content' backgroundColor='#FFFFFF'/>
    </AppContext.Provider>
  );
}