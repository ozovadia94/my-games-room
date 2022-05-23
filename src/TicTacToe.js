// import './Login.css'
import './TicTacToe.css'
import { useEffect, useLayoutEffect, useState } from 'react';


function TicTacToe() {
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [userName, setUserName] = useState("")

    var [cur_player, setCur_player] = useState(choose_first_player)
    var [board, setBoard] = useState(Array(9).fill(''))
    var [bool_finished, setBool_finished] = useState(false)
    var [numOfMoves, setNumOfMoves] = useState(0)

    useEffect(() => {
        async function check_status_of_the_game(y) {
            for (let i = 0; i < 3; i++) {
                if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6] && board[i] !== '')//col
                    return board[i]
                let t = i * 3
                if (board[t] !== '' && board[t] === board[t + 1] && board[t] === board[t + 2] && board[t] !== '')//row
                    return board[i]
            }

            //diagonal
            if (board[0] !== '' && board[0] === board[4] && board[0] === board[8] && board[0] !== '')
                return board[0]

            if (board[2] !== '' && board[2] === board[4] && board[2] === board[6] && board[2] !== '')
                return board[2]

            return ''
        }

        // if (numOfMoves == 9)
        //     console.log('No mooves')
        // setBool_finished(true)
        var x = check_status_of_the_game().then((res) => {
            if (res !== '') {
                console.log(res, " Won the game")
                setBool_finished(true)
            }
            else if (numOfMoves === 9)
            {
                console.log('draw')
                setBool_finished(true)
            }
            else
                changePlayer()
        })


        // setCur_player=rando
    }, [numOfMoves])

    var reset_board = () => {
        choose_first_player()
        setBoard(new Array(9).fill(''))
        setNumOfMoves(0)
    }

    useLayoutEffect(() => {

    })

    var choose_first_player = () => {
        var random_boolean = Math.random() < 0.5;
        if (random_boolean === true)
            setCur_player('X')
        else
            setCur_player('O')
    }


    async function button_pressed(e) {
        if (bool_finished)
            return;

        if (e.target.innerText === 'X' || e.target.innerText === 'O') {
            console.log('X || O   Exist')
            return;
        }

        console.log(cur_player, "pressed")
        var y = await draw_symbol(e)
    }

    async function draw_symbol(e) {
        let b = [...board]
        b[parseInt(e.target.value)] = cur_player
        setBoard(b)
        // e.target.value = cur_player
        e.target.innerText = cur_player
        setNumOfMoves(numOfMoves + 1)
        return e.target.innerText;
    }

    function changePlayer() {
        if (cur_player === 'X')
            setCur_player("O")
        else
            setCur_player("X")
    }


    return (
        <div className="TicTacToe">

            <table>
                <tr id="tr_0">
                    <td><button id="but0" className='but' onClick={button_pressed} value='0'></button></td>
                    <td><button id="but1" className='but' onClick={button_pressed} value='1'></button></td>
                    <td><button id="but2" className='but' onClick={button_pressed} value='2'></button></td>
                </tr>
                <tr id="tr_1">
                    <td><button id="but3" className='but' onClick={button_pressed} value='3'></button></td>
                    <td><button id="but4" className='but' onClick={button_pressed} value='4'></button></td>
                    <td><button id="but5" className='but' onClick={button_pressed} value='5'></button></td>
                </tr>
                <tr id="tr_2">
                    <td><button id="but6" className='but' onClick={button_pressed} value='6'></button></td>
                    <td><button id="but7" className='but' onClick={button_pressed} value='7'></button></td>
                    <td><button id="but8" className='but' onClick={button_pressed} value='8'></button></td>
                </tr>
            </table>
            asdasd



        </div>
    );
}

export default TicTacToe;
