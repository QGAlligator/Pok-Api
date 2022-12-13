import "./App.css";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Logo from "./img/Logo.png";
import { Routes, Route, Navigate } from "react-router-dom";
import Accueil from "./components/Accueil";
import Pokedex from "./components/MonPokedex";
import MonPokedex from "./components/Pokedex";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });

  const next = () => {
    const newUrl = {
      current: url.next,
      previous: url.current,
      next: null,
    };
    setUrl(newUrl);
  };
  const previous = () => {
    const newUrl = {
      current: url.previous,
      previous: null,
      next: url.current,
    };
    setUrl(newUrl);
  };

  useEffect(() => {
    fetch(url.current)
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setUrl({
          current: url.current,
          next: data.next,
          previous: data.previous,
        });
        console.log(data);
      })
      .catch((err) => console.error(err));
    //eslint-disable-next-line
  }, [url.current]);

  useEffect(() => {
    const pokemon = "charizard";
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.sprites.front_default);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar bg="danger" variant="light">
        <Container>
          <Navbar.Brand href="Accueil">
            <Image src={Logo} alt="PokeApi Logo" className="App-logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="Accueil">Accueil</Nav.Link>
            <Nav.Link href="Pokedex">Pokédex</Nav.Link>
            <Nav.Link href="Mon-Pokedex">Mon Pokédex</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
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
