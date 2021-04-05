import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    header: {
      padding: 30,
      paddingTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 40,
      fontWeight: "bold",
      color: '#FFFFFF'
    },
    text: {
      fontSize: 25,
    },
    textTimes: {
      color: '#FF6732',
      fontSize: 22,
      marginTop: 30,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    home: {
      flex: 1,
      padding: 30,
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
    },
    container: {
      flex: 1,
      padding: 6,
      alignItems: 'stretch',
      justifyContent: 'center',
      backgroundColor: '#151E3D'
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    }
})