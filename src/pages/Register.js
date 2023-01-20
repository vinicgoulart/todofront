import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register(){
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        var name = event.target.name.value;
        var userName = event.target.userName.value;
        var email = event.target.email.value;
        var password = event.target.password.value;
        var desc = event.target.description.value
        
        const userData = {
            name: name,
            nickname: userName,
            email: email,
            password: password,
            desc: desc
        };

        axios.post('http://localhost:9000/register', userData).then((res) => {
            navigate('/login');
        }).catch((error) => {   
            setAlert(true);
            setAlertMessage('Verify the data you filled the inputs with!');
        });
    }

    return(
        <div className="loginPage">
            <div className="loginForms">

                {
                    alert ? 
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Register Error!</strong> { alertMessage }
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div> 
                    : null
                }

                <form onSubmit={ handleSubmit }>
                    <p className="h4">Sign up to Oops!</p>
                    <div className="mb-3">
                        <label htmlfor="exampleInputEmail1" className="form-label">Name*</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlfor="exampleInputEmail1" className="form-label">User name*</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="userName" />
                    </div>
                    <div className="mb-3">
                        <label htmlfor="exampleInputEmail1" className="form-label">Email address*</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlfor="exampleInputPassword1" className="form-label">Password*</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlfor="exampleInputPassword1" className="form-label">Description*</label>
                        <textarea className="form-control" aria-label="With textarea" name="description"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <p className="h5 accountText" onClick={ () => navigate('/login') }>Already have an account? Sign In!</p>
                </form>
            </div>
        </div>
    );
}

export default Register;
