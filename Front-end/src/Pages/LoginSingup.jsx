import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CSS/loginSingUp.css";
const LoginSingup = () => {
  const [state, setState] = useState("Iniciar sesion");
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const login = async () => {
    console.log("login",formState);
    let responseData;
    await fetch("http://localhost:9090/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    }).then((res)=>res.json()).then((data)=>responseData=data);
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }else{
      alert(responseData.errors);
    }
    
  };
  const singUp = async () => {
    console.log("singup", formState);
    let responseData;
    await fetch("http://localhost:9090/singup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    }).then((res)=>res.json()).then((data)=>responseData=data);
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }else{
      alert(responseData.errors);
    }

  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <div className="loginSingUp">
      <div className="loginSingUp-container">
        <h1>{state}</h1>
        <Form onSubmit={onSubmit}>
          {state === "Registrarse" ? (
            <Form.Group
              name="username"
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                value={formState.username}
                onChange={onChangeHandler}
                name="username"
                type="text"
                placeholder="Ingresar usuario"
              />
            </Form.Group>
          ) : (
            <></>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={formState.email}
              onChange={onChangeHandler}
              name="email"
              type="email"
              placeholder="Ingresa tú email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              value={formState.password}
              onChange={onChangeHandler}
              name="password"
              type="password"
              placeholder="Contraseña"
            />
          </Form.Group>
          <Form.Group className="mb-3 " controlId="formBasicCheckbox">
            <Form.Check
              className="small"
              type="checkbox"
              label="Para continuar, acepta los términos y políticas de privacidad"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              state === "Registrarse" ? singUp() : login();
            }}
          >
            Continuar
          </Button>
        </Form>
        {state === "Registrarse" ? (
          <p className="loginSingUp-login">
            Ya tienes una cuenta?{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setState("Iniciar sesion");
              }}
            >
              Inicia sesión aquí
            </span>
          </p>
        ) : (
          <p className="loginSingUp-login">
            Crea una cuenta{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setState("Registrarse");
              }}
            >
              Click aquí
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSingup;
