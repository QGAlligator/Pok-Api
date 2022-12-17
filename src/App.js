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

export default function App() {
  return (
    <>
      <Navbar bg="danger" variant="light">
        <Container>
          <Navbar.Brand href="Accueil">
            <Image src={Logo} alt="PokeApi Logo" className="App-logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="Accueil" className="navl">
              Accueil
            </Nav.Link>
            <Nav.Link href="Pokedex" className="navl">
              Pokédex
            </Nav.Link>
            <Nav.Link href="Mon-Pokedex" className="navl">
              Mon Pokédex
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="border"></div>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/Accueil" />} />
          <Route path="/Accueil" element={<Accueil />} />
          <Route path="/Pokedex" element={<Pokedex />} />
          <Route path="/Mon-Pokedex" element={<MonPokedex />} />
        </Routes>
      </Container>
    </>
  );
}
