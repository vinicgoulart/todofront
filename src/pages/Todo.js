import Logo from '../images/logo.png';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Moment from 'react-moment';

function Todo(){
    const [todoList, setTodoList] = useState([]);
    const navigate = useNavigate();
    const [successAlert, setSuccessAlert] = useState(false);
    const [successAlertMessage, setSuccessAlertMessage] = useState('');
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    const listTodo = todoList.map((todos) => 
        <div className="card todoCard" key={todos._id}>
            <div className="card-body">
                <h5 className="card-title">{ todos.title }</h5>
                { // card-subtitle mb-2 text-muted 
                
                }
                <p className="card-subtitle mb-2 text-muted">End Date of this To-Do: <Moment format="YYYY/MM/DD" >{ todos.endDate }</Moment></p>
                <p className="card-text">{ todos.description }</p>
                <a className="card-link btn btn-danger" onClick={ () => handleDeleteTodo(todos._id) }>Delete todo</a>
            </div>
        </div>
    )

    useEffect(() => {
        var userSession = Cookies.get('connect.sid');
        
        if(!userSession){
            navigate('/login');
        }

        axios.get('http://localhost:9000/todo/', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            setTodoList(res.data.todo);
        }).catch((error) => {
            console.log(error);
        });

    }, [todoList]);

    function handleLogout(){
        axios.get('http://localhost:9000/logout', {
            headers: { 'Content-type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            Cookies.remove('connect.sid');
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleDeleteTodo(id){
        axios.delete('http://localhost:9000/todo/' + id, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            setSuccessAlert(true);
            setSuccessAlertMessage('Todo deleted!');
        }).catch((error) => {
            setAlert(true);
            setMessageAlert('It was not possible to delete this todo!');
        });
    }

    function handleCreateTodo(event){
        event.preventDefault();
        var userData = {
            title: event.target.todoTitle.value,
            description: event.target.todoDescription.value,
            type: event.target.todoType.value,
            endDate: event.target.todoEndDate.value
        }
        axios.post('http://localhost:9000/todo/create', userData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            setSuccessAlert(true);
            setSuccessAlertMessage('Todo created!');
        }).catch((error) => {
            setAlert(true);
            setMessageAlert('It was not possible to create a todo!');
        })
    }

    return(
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <img src={ Logo } />
                    <div className="d-flex">
                        <a className="nav-link resetPassBtn" onClick={ () => navigate('/reset-pass') }>Reset password</a>
                        <a className="nav-link logoutBtn" onClick={ handleLogout }>Logout</a>
                    </div>
                </div>
            </nav>
            { successAlert ? 
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> { successAlertMessage }
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                : null
            }
            { alert ? 
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> { messageAlert }
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                : null
            }
            <div className="todoList">
                
                <button type="button" className="btn btn-primary createTodoBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Create a new todo!
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new todo</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form className="modal-body" onSubmit={ handleCreateTodo }>
                                <label htmlFor="exampleInputEmail1" className="form-label">Todo Title</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" name="todoTitle" />
                                </div>
                                    <label htmlFor="exampleInputEmail1" className="form-label">Todo description</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" name="todoDescription" />
                                </div>
                                <label htmlFor="exampleInputEmail1" className="form-label">Type</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" name="todoType" />
                                </div>
                                <label htmlFor="exampleInputEmail1" className="form-label">Todo end date</label>
                                <div className="input-group mb-3">
                                    <input type="date" className="form-control" aria-label="Username" aria-describedby="basic-addon1" name="todoEndDate" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Create</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>

                {
                    listTodo
                }
            </div>
        </div>
    );
}

export default Todo;