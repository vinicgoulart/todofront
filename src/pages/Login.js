import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(){
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    function handleSubmit(e){
        e.preventDefault();
        
        var password = e.target.passwordInput.value;
        var email = e.target.emailInput.value;

        if(password === '' || email === ''){
            setAlert(true);
            setAlertMessage('Password and email are required!');
            return;
        }

        var userData = {
            password: password,
            email: email,
        };

        axios.post('http://localhost:9000/login', userData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            console.log(res);
            navigate('/todo');
        }).catch((error) => {
            setAlertMessage('Verify your credentials!');
            setAlert(true);
            navigate('/login');
        });
    }

    return(
        <div className="loginPage">
            <div className="loginForms">
                {
                    alert ? 
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Authentication Error!</strong> { alertMessage }
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div> 
                    : null
                }
                <form onSubmit={ handleSubmit }>
                    <p className="h4">Sign in to Oops!</p>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="emailInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="passwordInput" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <p className="h5 accountText" onClick={ () => navigate('/register') }>Don't have an account? Sign up!</p>
                </form>
            </div>
        </div>
    );
}
export default Login;
