import '../App.css';
import logo from '../images/logo.png';
import scene from '../images/scene.svg';
import { useNavigate } from 'react-router-dom';

function Home(){
  const navigate = useNavigate();

    return (
        <div className="App">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a><img src={ logo }></img></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse d-flex" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link loginTextBtn" onClick={ () => navigate('/login') }>Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="btn btn-info registerBtn" onClick={ () => navigate('/register') }>Register</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="contentDiv">
            <div className="descText">
              <p className="h2 titleText">Never forget your keys again!</p>
              <p className="lead">Oops! is an app designed to help you to not forget your homework, house chores and, mainly, your keys!</p>
              <button className="btn btn-info registerBtn" onClick={ () => navigate('/register') }>Create Free Account</button>
            </div>
            <div>
              <img src={ scene } className="sceneImage"></img>
            </div>
          </div>
          <div>
            <p className="h2">Do not forget to join us today!</p>
          </div>
        </div>
    );
}

export default Home;
