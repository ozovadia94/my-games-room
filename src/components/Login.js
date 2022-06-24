import './Login.css'
import { useEffect, useState } from 'react';
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux';
import { setlogged } from '../store/actions';

const validator = require('validator')

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const dispatch = useDispatch();
    let l = useSelector(state => state.logged)
    

    useEffect(() => {
        console.log('useEffecttt')
    }, [])

    const storeAccessToken = async (res) => {
        if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data))
            dispatch(setlogged(true))
            return res.data
        }
        return null
    }

    const handleSubmit_Signup = (e) => {
        e.preventDefault();

        const valid_pass = validator.isStrongPassword(password);
        const valid_email = validator.isEmail(email);
        let message = 'Error:'
        if (!valid_email)
            message += '\nInvalid email'
        if (!valid_pass)
            message += '\nInvalid password. Password must be a mix of letters (uppercase and lowercase), numbers, and symbols.'

        if (message !== 'Error:') {
            alert(message)
            return;
        }


        axios.post("http://localhost:8080/signup", { email, password }).then(res => {
            console.log(res)
            setEmail('')
            setPassword('')
            alert(res.data)

        }).catch(e => {
            alert(e.response.data.errors.message)
            console.log(e.response.data)
        })

        console.log('SignUp')
    }
    const handleSubmit_Login = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Error, please enter email&password");
            return;
        }

        const log = await axios.post("http://localhost:8080/login", { email, password })
        .catch(e => {
            alert("שם משתמש או סיסמא שגויים")
        })
        
        if(log){
            const t = await storeAccessToken(log)
            if(t){
                console.log(t)
                window.location.reload();

            }
            console.log('asd')
        }

        console.log('Login')
    }

    return (
        <div className="main">

            <input type="checkbox" id="chk" aria-hidden="true" />

            <div class="login">
                <form onSubmit={(e) => handleSubmit_Login(e)}>
                    <label for="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" required="" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input type="password" name="pswd" placeholder="Password" required="" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button>Login</button>
                </form>
            </div>

            <div class="signup">
                <form onSubmit={(e) => handleSubmit_Signup(e)}>
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <input type="email" name="email" placeholder="Email" required="" onChange={(e) => setEmail(e.target.value)} value={email} />
                    {/* <input type="text" name="txt" placeholder="User name" required="" onChange={(e) => setUserName(e.target.value)} /> */}
                    <input type="password" name="pswd" placeholder="Password" required="" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button>Sign up</button>
                </form>
            </div>

            <div class="forget">
                <form onSubmit={(e) => handleSubmit_Signup(e)}>
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <input type="email" name="email" placeholder="Email" required="" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <button>Forget assword</button>
                </form>
            </div>






        </div>
    );
}

export default Login;
