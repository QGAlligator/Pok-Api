import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Logo from "./img/Logo.png";
import { Routes, Route, Navigate } from "react-router-dom";
import Accueil from "./components/Accueil";
import Pokedex from "./components/Pokedex";
import MonPokedex from "./components/MonPokedex";
import Combat from "./components/Combat";
import LogReg from "./components/Auth";
import { Button } from "react-bootstrap";

export default function App() {
  return (
    <>
      <Navbar bg="danger" variant="light">
        <Container>
          <Navbar.Brand href="Home">
            <Image src={Logo} alt="PokeApi Logo" className="App-logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="Home" className="navl">
              Home
            </Nav.Link>
            <Nav.Link href="Pokedex" className="navl">
              Pokedex
            </Nav.Link>
            <Nav.Link href="My-Pokedex" className="navl">
              My Pokedex
            </Nav.Link>
            <Nav.Link href="Fight" className="navl">
              Fight
            </Nav.Link>
          </Nav>
          {localStorage.getItem("jwt") && (
            <Button
              onClick={() => {
                console.log("test");
                localStorage.removeItem("jwt");
                window.location.href = "./Auth";
              }}
              variant="danger"
            >
              LogOut
            </Button>
          )}
          {!localStorage.getItem("jwt") && (
            <Button href="Auth" variant="danger">
              Sign Up
            </Button>
          )}
        </Container>
      </Navbar>
      <div className="border"></div>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Accueil />} />
          <Route path="/Pokedex" element={<Pokedex />} />
          <Route path="/My-Pokedex" element={<MonPokedex />} />
          <Route path="/Fight" element={<Combat />} />
          <Route path="/Auth" element={<LogReg />} />
        </Routes>
      </Container>
    </>
  );
}
