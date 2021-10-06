import React, { useState } from "react";
import "../css/index.css";
import "../css/login.css";
import axios from "axios";

/* obtener el token almacenado en el navegador */
const accessToken = localStorage.getItem("token");
const apiUrl = "http://camilo.touwolf.com:9101/api/v1/users/profile";

/* función cerrar sesión */
function signOff() {
  localStorage.removeItem("token");
  window.location.reload(true);
}

/* función principal */
function Home() {
  /* se obtiene la autorización mediante JWT */
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = "Bearer " + accessToken;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /* declaración de estados */
  const [users, setUsers] = useState([]);
  const [requestError, setRequestError] = useState();

  /* se obtiene los datos del API */
  const fetchData = async () => {
    try {
      const result = await axios.get(apiUrl);
      setUsers(result.data);
    } catch (err) {
      setRequestError(err.message);
    }
  };

  fetchData();

  return (
    <div className="App">
      <header className="App-header">
        <h3>Bienvenido(a)</h3>
        <h2>
          {users.name} {users.email}
        </h2>
        <button className="btn btn-primary mt-3" onClick={() => signOff()}>
          Cerrar Sesión
        </button>
      </header>
    </div>
  );
}

export default Home;
