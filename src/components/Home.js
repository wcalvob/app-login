import React, { useState } from "react";
import axios from "axios";
import imgConstruction from "../images/construction.png";

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
      setRequestError("Error de conexión con el API");
      console.log(requestError);
    }
  };

  fetchData();

  return (
    <div className="app">
      <header className="header">
        <h4>Bienvenido(a), {users.name} {users.email}</h4>
        <button className="btn btn-primary mt-3" onClick={() => signOff()}>
          Cerrar Sesión
        </button>
      </header>
      <div className="fadeIn first">
        <img
          src={imgConstruction}
          className="img-construction"
          alt="Construction"
        />
      </div>
    </div>
  );
}

export default Home;
