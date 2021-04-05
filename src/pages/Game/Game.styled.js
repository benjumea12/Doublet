import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    messages: {
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
    },
    winText: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderRadius: 10,
        backgroundColor: '#00F2FF'
    },
    timeText: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderRadius: 10,
        backgroundColor: '#00F2FF'
    },
    overlayModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',   
    },
    contentModal: {
        margin: 30,
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#FFFFFF'
    },
    modalText: {
        fontSize: 16,
        textAlign: "center"
    },
    returnText: {
        fontSize: 18,
        textAlign: "center",
        color: 'white'
    },
    buttomReturn: {
        padding: 10,
        marginTop: 10,
        marginHorizontal: 50,
        borderRadius: 10,
        backgroundColor: '#FF6732'
    },
    buttomModal: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#FFCA00'
    }
})