import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ResetPass(){
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    function handleSubmit(event){
        event.preventDefault();

        if(event.target.passwordInput.value === ''){
            setAlert(true);
            setAlertMessage('New password must be filled!');
        }

        var userData = {
            password: event.target.passwordInput.value
        }

        axios.post('http://localhost:9000/change-password/', userData, {
            headers: {'Content-type': 'application/json'},
            withCredentials: true
        }).then((res) => {
            Cookies.remove('connect.sid');
            navigate('/login');
        }).catch((error) => {
            setAlert(false);
            setAlertMessage('Your password must contain the requirements!');
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
                    <p className="h4">Forgot your password? Reset it here!</p>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">New Password*</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="passwordInput" />
                    </div>
                    <button type="submit" className="btn btn-primary">Update password</button>
                    <p className="h5 cancelText" onClick={ () => navigate('/todo') }>Cancel? Click here!</p>
                </form>
            </div>
        </div>
    );
}

export default ResetPass;
