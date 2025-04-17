import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Form = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('usuario', usuario);
    formData.append('password',password);

    try {
      const response = await fetch('http://localhost:5285/api/Auth/login', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error al iniciar sesión');
      } else {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        navigate('inicio');
      }
    } catch (error) {
      setError('Error en la solicitud');
    }
  };

  return (
    <StyledWrapper>
      <div id="form-ui">
        <form onSubmit={handleSubmit} id="form">
          <div id="form-body">
            <div id="welcome-lines">
              <div id="welcome-line-1">Iniciar Sesión</div>
              <div id="welcome-line-2"></div>
            </div>

            <div className="input-container">
              <input
                id="usuario"
                className="styled_input_bar"
                placeholder=" "
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                required
              />
              <label className="input-label">Usuario</label>
            </div>

            <div className="input-container">
              <input
                type="password"
                id="password"
                className="styled_input_bar"
                placeholder=" "
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <label className="input-label">Contraseña</label>
            </div>

            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

            <div id="submit-button-cvr">
              <button id="submit-button" type="submit">Ingresar</button>
            </div>
          </div>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;

  #form-ui {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #form {
    display: grid;
    place-items: center;
    width: 400px;               
    height: 500px;              
    padding: 40px;
    background-color: #265073;
    box-shadow: 0px 10px 75px #006E8C;
    outline: 1px solid #006E8C;
    border-radius: 10px;
    position: relative;
  }

  #form-body {
    width: 100%;
  }

  #welcome-lines {
    text-align: center;
    line-height: 1.2;
    margin-bottom: 30px;
  }

  #welcome-line-1 {
    color: #F2EFE7;
    font-weight: 600;
    font-size: 42px;
  }

  #welcome-line-2 {
    color: #F2EFE7;
    font-size: 18px;
    margin-top: 17px;
  }
    #submit-button-cvr {
     margin-top: 30px;
     display: flex;
     justify-content: center;  
  }
  button {
    padding: 1em 2em;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 3px;
    background: #F2EFE7;
    text-transform: uppercase;
    color: #006E8C;
    transition: all 1000ms;
    font-size: 15px;
    position: relative;
    overflow: hidden;
    outline: 2px solid #088178;
  }

  button:hover {
    color: black;
    transform: scale(1);
    outline: 2px solid #088178;
    box-shadow: 4px 5px 17px -4px #088178;
  }

  button::before {
    content: "";
    position: absolute;
    left: -50px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: #9AD0C2;
    transform: skewX(30deg);
    z-index: -1;
    transition: width 1000ms;
  }

  button:hover::before {
    width: 250%;
}

  .input-container {
    position: relative;
    width: 100%;           
    margin-bottom: 40px;      
  }

  .styled_input_bar {
    width: 100%;
    padding: 1em;
    font-size: 1em;
    border: 0.1em solid #F2EFE7;
    border-radius: 2em;
    background-color: transparent;
    color: white;
    outline: none;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .styled_input_bar::placeholder {
    color: grey;
    transition: all 0.3s ease;
  }

  .styled_input_bar:focus {
    border-color: white;
  }

  .styled_input_bar:focus::placeholder {
    color: transparent;
  }

  .input-label {
    position: absolute;
    left: 1em;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1em;
    color: #F2EFE7;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .styled_input_bar:focus + .input-label,
  .styled_input_bar:not(:placeholder-shown) + .input-label {
    top: 0.1em;
    left: 1em;
    font-size: 0.8em;
    color: white;
    background-color: #265073;
    padding: 0 0.5em;
  }

  .styled_input_bar:not(:focus):not(:placeholder-shown) + .input-label {
    color: grey;
  }
`;
export default Form;
