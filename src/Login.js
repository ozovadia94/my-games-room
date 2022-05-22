import './Login.css'
import { useEffect, useState } from 'react';


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")

    useEffect(() => {
        const signUpButton = 22;
    }, [])



    const handleSubmit_Signup = (e) => {
        e.preventDefault();
        console.log('SignUp')
    }
    const handleSubmit_Login = (e) => {
        e.preventDefault();
        console.log('Login')
    }
    const check_auth=()=>{
        return true
    }


    return (
        <div className="main">

            <input type="checkbox" id="chk" aria-hidden="true" />

            <div class="signup">
                <form onSubmit={(e) => handleSubmit_Signup(e)}>
                    <label for="chk" aria-hidden="true">Sign up</label>
                    <input type="text" name="txt" placeholder="User name" required="" onChange={(e) => setUserName(e.target.value)} />
                    <input type="email" name="email" placeholder="Email" required="" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="pswd" placeholder="Password" required="" onChange={(e) => setPassword(e.target.value)} />
                    <button>Sign up</button>
                </form>
            </div>

            <div class="login">
                <form onSubmit={(e) => handleSubmit_Login(e)}>
                    <label for="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" required="" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="pswd" placeholder="Password" required="" onChange={(e) => setPassword(e.target.value)} />
                    <button>Login</button>
                </form>
            </div>




        </div>
    );
}

export default Login;
