import Container from "react-bootstrap/Container";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function LogReg() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  if (localStorage.getItem("jwt") !== null) {
    window.location.href = "./Pokedex";
  }

  function log() {
    axios
      .post("http://localhost:3030/login", {
        login: username,
        password: password,
      })
      .then(function (response) {
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        window.location.href = "./Pokedex";
      })
      .catch(function (error) {
        setError(error.response.data.message);
      });
  }

  function reg() {
    axios
      .post("http://localhost:3030/register", {
        login: username,
        password: password,
      })
      .then(function (response) {
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        window.location.href = "./Pokedex";
      })
      .catch(function (error) {
        setError(error.response.data?.login);
        if (error.response.data.password)
          setError(error.response.data.password);
      });
  }

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPseudo">
          <Form.Label>Pseudonyme</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter a NickName"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        {error && <p className="err">{error}</p>}
        <Button
          variant="primary"
          onClick={() => {
            reg();
          }}
        >
          Register
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            log();
          }}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
}
