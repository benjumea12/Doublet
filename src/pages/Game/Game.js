import React, { useContext, useState, useEffect } from 'react'
import { Text, Modal, View, TouchableHighlight } from 'react-native'
// components
import { Board } from '../../components'
// Styled
import { styles } from './Game.styled'
// Context
import AppContext from '../../../App.context'
import GameContext from './Game.context'


const Timer = ({cen, seg, min}) => {
    return (
        <Text style={styles.text}>Tiempo: {min}:{seg}:{cen}</Text>
    )
}


const Game = () => {
    const [openModal, setOpenModal] = useState(true)
    const [openModalTime, setOpenModalTime] = useState(false)
    const [startGame, setStartGame] = useState(false)
    const [win, setWin] = useState(false)
    const [movements, setMovements] = useState(0)
    const [numbersArray, setNumbersArray] = useState([])

    const [cen, setCen] = useState(0)
    const [seg, setSeg] = useState(0)
    const [min, setMin] = useState(0)

    const { level, setLevel, bestTimes, storeTimes } = useContext(AppContext)

    const valueContext = {
        numbersArray, setNumbersArray, win, setWin, movements, setMovements, startGame, setStartGame
    }

    const mess = (array) => {
        var t = array.sort((a,b) => {return (Math.random()-0.5)})
        return [...t]
    }

    const key = (number) => ({number, show: true, found: false})

    const createNumbers = () => {
        let numbers = []
        const size = (level*level) % 2 == 0 ? level*level : (level*level)-1

        for (let i = 0; i < size/2; i++) { numbers.push(key(i+1), key(i+1)) }
        (level*level) % 2 !== 0 && numbers.push(key(0))

        setNumbersArray(mess(numbers))
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setTimeout(() => {
            setStartGame(true)
        }, 5000);
    }

    useEffect(() => {
        const time = bestTimes[level-3]
        const newSunSegs = ((min*60)+seg+(cen/10))+(0.5*movements)
        const newMin = Math.trunc(newSunSegs/60)
        const newSeg = Math.trunc(newSunSegs-newMin)
        const newCen = Math.trunc((newSunSegs-newMin-newSeg)*10)

        setMin(newMin) 
        setSeg(newSeg) 
        setCen(newCen)

        if(time.min !== 0 || time.seg !== 0 || time.cen !== 0) {
            if (win) {
                const sumSegs = (time.min*60)+time.seg+(time.cen/10)

    
                if (newSunSegs < sumSegs) {
                    setOpenModalTime(true)
    
                    storeTimes(bestTimes.map((array, index) => {
                        if (index == level-3) {
                            return ({cen: newCen, seg: newSeg, min: newMin})
                        } else {
                            return array
                        }
                    }))
                }   
            }
        }else {
            storeTimes(bestTimes.map((array, index) => {
                if (index == level-3) {
                    return ({cen: newCen, seg: newSeg, min: newMin})
                } else {
                    return array
                }
            }))
        }
    },[win])

    useEffect(()=>{
        if (!win && startGame) {
            setTimeout(() => {
                if(cen+1 == 10) {
                    if(seg+1 == 60) {
                        setMin(min+1)
                        setSeg(0)
                        setCen(0)
                    } else{
                        setSeg(seg+1)
                        setCen(0)
                    }
                } else {
                    setCen(cen+1)
                }
            }, 100)
        }
    }, [cen])

    useEffect(() => {
        if (startGame) {
            setCen(1)   
        }
    },[startGame])

    useEffect(() => {
        createNumbers()
    },[])

    return(
        <GameContext.Provider value={valueContext}>
            <View style={styles.container}>
                <View style={styles.messages}>
                    {
                        win ?   <React.Fragment>
                                    <Text style={styles.winText}>¡Ganaste!</Text>
                                    <Text style={styles.text}>Movimientos fallidos: { movements }</Text>
                                    <Text style={styles.text}>Tiempo final: {min}:{seg}:{cen}</Text>
                                </React.Fragment> :
                                <React.Fragment>
                                    <Timer cen={cen} seg={seg} min={min} />
                                    <Text style={styles.text}>Movimientos fallidos: { movements }</Text>
                                </React.Fragment> 
                    }
                </View>
                <Board />
                <TouchableHighlight
                    style={styles.buttomReturn}
                    onPress={() => setLevel(0)}
                >
                    <Text style={styles.returnText}>Volver</Text>
                </TouchableHighlight>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={openModal}
                >
                    <View style={styles.overlayModal}>
                        <View style={styles.contentModal}>
                            <Text style={styles.modalText}>¡Ya todo esta listo para jugar!</Text>
                            <Text style={styles.modalText}>Te vamos a mostrar el tablero durante 5 segundos, tendras que memorizar lo que mas puedas y encontrar las parejas.</Text>
                            <Text style={styles.modalText}>Por cada movimiento fallido se suma 0.5 segundos a tu tiempo final.</Text>
                            <TouchableHighlight
                                style={styles.buttomModal}
                                onPress={() => handleCloseModal()}
                            >
                                <Text style={styles.modalText}>A jugar &gt;</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={openModalTime}
                >
                    <View style={styles.overlayModal}>
                        <View style={styles.contentModal}>
                        <Text style={styles.timeText}>¡Hiciste Mejor Tiempo!</Text>
                            <TouchableHighlight
                                style={styles.buttomModal}
                                onPress={() => { setOpenModalTime(false), setLevel(0)}}
                            >
                                <Text style={styles.modalText}>Empezar de nuevo &gt;</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        </GameContext.Provider>
    )
}

export default Game


/*  */