// import './Login.css'
import './TicTacToe.css'
import { useEffect, useLayoutEffect, useState } from 'react';

const x = 'X'
const o = 'O'
const size = 9

function TicTacToe() {
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [userName, setUserName] = useState("")

    var [cur_player, setCur_player] = useState('')
    var [board, setBoard] = useState(Array(9).fill(''))
    var [bool_finished, setBool_finished] = useState(false)
    var [numOfMoves, setNumOfMoves] = useState(0)
    var [vsComputer, setVsComputer] = useState(false)
    var [result, setResult] = useState(new Array(2).fill(0))
    var [canPlay, setCanPlay] = useState(false)//prevent clicks in some cases

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

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

        var x = check_status_of_the_game().then((res) => {
            if (res === 'X') {
                console.log(res, " Won the game")
                setBool_finished(true)
                setResult([result[0] + 1, result[1]])
            }
            else if (res === 'O') {
                console.log(res, " Won the game")
                setBool_finished(true)
                setResult([result[0], result[1] + 1])
            }
            else//when res===''
                if (numOfMoves === 9) {
                    // alert('draw')
                    console.log('draw')
                    setBool_finished(true)
                }
                else
                    sleep(500).then(() => {
                        changePlayer()
                    }).then(()=>setCanPlay(true))

        })


    }, [numOfMoves])

    useEffect(() => {
        if (cur_player === o && vsComputer)
            computer_pressed()
    }, [cur_player])

    var reset_board = async () => {
        choose_first_player()
        setBoard(new Array(9).fill(''))
        setBool_finished(false)
        setNumOfMoves(0)
    }
    var reset_Game = () => {
        setResult([0, 0])
        reset_board()
    }

    useLayoutEffect(() => {

    })

    var choose_first_player = () => {
        var random_boolean = Math.random() < 0.5;
        if (random_boolean === true)
            setCur_player('X')
        else {
            sleep(500).then(() => {
                setCur_player('O')
            })
        }

    }


    async function button_pressed(e) {
        if(canPlay===false)
            return;
        else
            setCanPlay(false)
            
        if (bool_finished)
            return;

        if (e.target.innerText === 'X' || e.target.innerText === 'O') {
            console.log('X || O   Exist')
            return;
        }

        console.log(cur_player, "pressed")
        var y = await draw_symbol(e, 'asdd')

    }
    async function computer_pressed() {
        if (bool_finished)
            return;

        while (1) {
            let num = Math.floor(Math.random() * 9);
            if (board[num] === '') {
                console.log('~', cur_player, "pressed")
                let b = [...board]
                b[num] = cur_player
                setBoard(b)
                setNumOfMoves(numOfMoves + 1)
                return 'O'
            }
        }
    }


    async function draw_symbol(e, symbol) {
        console.log(symbol)
        let b = [...board]
        b[parseInt(e.target.value)] = cur_player
        setBoard(b)

        // e.target.innerText = cur_player
        setNumOfMoves(numOfMoves + 1)
        return e.target.innerText;
    }


    function changePlayer() {
        if (cur_player === 'X') {
            setCur_player("O")
            // if (vsComputer)
            //     computer_pressed()
        }
        else
            setCur_player("X")
    }

    function game_vs_computer() {
        console.log('vs Commm', vsComputer)
        setVsComputer(!vsComputer)
        reset_Game()
    }


    return (
        <div className="TicTacToe">
            <h2>{vsComputer === false ? '2 Players' : 'VS Computer'}</h2>
            <button onClick={game_vs_computer}>{vsComputer ? 'Press to play with friend' : 'Press to play with Computer'}</button>

            <div>
                <button onClick={reset_board}>New Round</button>
                <button onClick={reset_Game}>New Game</button>
            </div>

            <h3>{cur_player} 's turn</h3>
            <table>
                <tr id="tr_0">
                    <td><button id="but0" className='but' onClick={button_pressed} value='0'>{board[0]}</button></td>
                    <td><button id="but1" className='but' onClick={button_pressed} value='1'>{board[1]}</button></td>
                    <td><button id="but2" className='but' onClick={button_pressed} value='2'>{board[2]}</button></td>
                </tr>
                <tr id="tr_1">
                    <td><button id="but3" className='but' onClick={button_pressed} value='3'>{board[3]}</button></td>
                    <td><button id="but4" className='but' onClick={button_pressed} value='4'>{board[4]}</button></td>
                    <td><button id="but5" className='but' onClick={button_pressed} value='5'>{board[5]}</button></td>
                </tr>
                <tr id="tr_2">
                    <td><button id="but6" className='but' onClick={button_pressed} value='6'>{board[6]}</button></td>
                    <td><button id="but7" className='but' onClick={button_pressed} value='7'>{board[7]}</button></td>
                    <td><button id="but8" className='but' onClick={button_pressed} value='8'>{board[8]}</button></td>
                </tr>
            </table>

            <table>
                <tr><td>X_Player</td>
                    <td></td>
                    <td>{result[0]}</td>
                </tr>
                <tr><td>{vsComputer === false ? 'O_Player' : 'Computer(O)'}</td>
                    <td></td>
                    <td>{result[1]}</td>
                </tr>
            </table>



        </div>
    );
}

export default TicTacToe;
