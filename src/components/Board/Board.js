import React, { useContext, useEffect, useState } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
// Styled
import { styles } from './Board.styled'
// Context
import AppContext from '../../../App.context'
import GameContext from '../../pages/Game/Game.context'

const Board = () => {
    const [boardArray, setBoardArray] = useState([])
    const [openKeys, setOpenKeys] = useState(0)
    const [foundKeys, setFoundKeys] = useState(0)

    const { level } = useContext(AppContext)
    const { 
        numbersArray, setNumbersArray, win, setWin, movements, setMovements, startGame
    } = useContext(GameContext)

    const changeFound = (index) => {
        setNumbersArray(numbersArray.map((array, i) => {
            if (i === index) {
                return (
                    Object.assign(array, {
                        found: true
                    })  
                )
            } else {
                return array
            }
        }))
    }

    const changeShow = (index) => {
        setNumbersArray(numbersArray.map((array, i) => {
            if (i === index) {
                return (
                    Object.assign(array, {
                        show: !array.show
                    })  
                )
            } else {
                return array
            }
        }))
    }

    const check = () => {
        let firsNumber = {index: -1, number: -1}
        const size = (level*level) % 2 == 0 ? level*level : (level*level)-1

        for (let i = 0; i < numbersArray.length; i++) {
            if (numbersArray[i].show && !numbersArray[i].found){              

                if (firsNumber.number == numbersArray[i].number) {
                    changeFound(firsNumber.index)
                    changeFound(i)
                    setFoundKeys(foundKeys+1)
                    
                    return size/2 == foundKeys+1
                }

                firsNumber.index = i
                firsNumber.number = numbersArray[i].number
            }
        }
        
        return false
    }

    const handleOnPressKey = (i,j) => {
        const index = (i*level)+j

        if (startGame && !win && !numbersArray[index].found) {    
            if (numbersArray[index].show) {
                setOpenKeys(openKeys-1)
                changeShow(index)
            }else{
                if (openKeys+1 < 3) {
                    setOpenKeys(openKeys+1)
                    changeShow(index)
                }

                if (openKeys+1 == 2) {
                    if(!check()){
                        setTimeout(() => {
                            let hides = 0
                            setNumbersArray(numbersArray.map(array => {
                                setOpenKeys(0)
                                !array.found && array.show && hides++
                                return (
                                    array.found ? array :
                                    Object.assign(array, {
                                        show: false
                                    }) 
                                )
                            }))
                            hides == 2 && setMovements(movements+1)
                        }, 400)
                    } else {
                        setWin(true)
                    }
                }
            }
        }
    }

    const createBoard = () => {
        if (numbersArray.length > 0) {
            let numbersBoard = []
            const size = (level*level) % 2 == 0 ? level*level : (level*level)-1

            for (let i = 0; i < size; i+=level) {
                let row = []
                for (let j = i; j < i+level; j++) { row.push(numbersArray[j]) }
                numbersBoard.push(row)
            }

            setBoardArray(numbersBoard)
        }
    }

    
    useEffect(() => {
        createBoard()
    },[numbersArray])
    
    useEffect(() => {
        numbersArray.map(array => Object.assign(array, {
            show: false
        }))    
    },[startGame])
    
    if (boardArray.length > 0) {
        return(
            <View style={styles.container}>
            {
                boardArray.map((element, i) => (
                    <View style={styles.styleRow} key={`row${i}`}>
                        {
                            element.map((option, j) => (
                                <TouchableHighlight
                                    onPress={() => handleOnPressKey(i,j)}
                                    key={`number${j}`}
                                    show={option.show}
                                    style={[styles.buttom, {backgroundColor: option.show ? '#FFFFFF' : '#2A2F3D'}]}
                                >
                                    <Text
                                        style={{color: '#2A2F3D', fontSize: 15}}
                                    >
                                        { option.number }
                                    </Text>
                                </TouchableHighlight>
                            ))
                        }
                    </View>
                ))
            }
            </View>
        )
    }

    return(
        <View></View>
    )
    
}

export default Board