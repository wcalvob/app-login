import React from "react";
import "../css/index.css";
import "../css/login.css";
import imgUser from "../images/user.png";
import axios from "axios";

class Login extends React.Component {
  /* declaración de estados */
  state = {
    form: {
      id: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  /* método para no refresh de la página */
  submitHandler = (e) => {
    e.preventDefault();
  };

  /* se obtienen los valores de los input */
  changeHandler = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  /* conexión con el API y obtención de resultados */
  buttonHandler = () => {
    let url = "http://camilo.touwolf.com:9101/api/v1/users/login";
    axios
      .post(url, this.state.form)
      .then((response) => {
        /* se guarda el token en el almacenamiento local */
        localStorage.setItem("token", response.data.token);
        window.location.reload(true);
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMsg: "Verifique que los datos ingresados sean los correctos",
        });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="wrapper fadeInDown">
            <div id="formContent">
              {this.state.error === true && (
                <div className="alert alert-danger">{this.state.errorMsg}</div>
              )}

              <div className="fadeIn first">
                <img
                  src={imgUser}
                  className="img-user"
                  id="ico"
                  alt="User Icon"
                />
              </div>

              <form method="post" onSubmit={this.submitHandler}>
                <input
                  type="text"
                  id="login"
                  className="fadeIn second"
                  name="id"
                  placeholder="Correo electrónico"
                  onChange={this.changeHandler}
                />
                <input
                  type="password"
                  id="password"
                  className="fadeIn third"
                  name="password"
                  placeholder="Contraseña"
                  onChange={this.changeHandler}
                />
                <input
                  type="submit"
                  className="fadeIn fourth"
                  value="Iniciar Sesión"
                  onClick={this.buttonHandler}
                />
              </form>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Login;
