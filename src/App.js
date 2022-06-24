import { useEffect, useState } from 'react';
import './App.css'

import Login from './components/Login'
import Navbar from './components/Navbar';
import TicTacToe from './components/TicTacToe'
import check_auth from './Utils/checkAuth'

import { useDispatch, useSelector } from 'react-redux';
import { setlogged } from './store/actions/index'

function App() {
  const dispatch = useDispatch();


  let l = useSelector(state => state.logged)
  let [check,setCheck] = useState(check_auth())
  


  useEffect(  () => {
    const auth = check_auth()
    setCheck(auth)
    {console.log(l,check)}
  }, [l])

  return (
    <div className="App center">
      
    
      {/* { l || check ? */}
      {true ?
      <div>
        <div>התחברת!!!  </div>

        <div className='my_navbar'><Navbar></Navbar></div>
        <div className='main_page'>Mypage
        <TicTacToe></TicTacToe>
        
        </div>        
        
      </div> :
      <div><Login></Login></div>}

      

    </div>
  );
}

export default App;