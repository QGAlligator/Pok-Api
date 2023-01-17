import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Pokepiece from "../img/Pokepiece.png";
import { Button, ListGroup } from "react-bootstrap";

export default function MonPokedex() {
  const [coin, setCoin] = useState("");
  const [pokemons, setPokemons] = useState([""]);
  const [pokefight, setPokefight] = useState([]);
  const [newPokemons, setNewPokemons] = useState([""]);
  const [total, setTotal] = useState("");
  const [npkmn, setNpkmn] = useState(false);
  if (localStorage.getItem("jwt") == null) {
    window.location.href = "./Auth";
  }

  async function setPoke() {
    await axios
      .patch(
        "http://localhost:3030/p",
        {
          total: total,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(function (response) {
        setNewPokemons(response.data.newPokemon);
        setNpkmn(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    setCoin(coin - 1);
  }

  function setPokeFight(pokemon) {
    axios
      .patch(
        "http://localhost:3030/pf",
        {
          pokefight: pokemon,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(function (response) {
        setPokefight(response.data.pokefight);
      })
      .catch(function (error) {});
  }

  function unsetPokeFight(pokemon) {
    axios
      .patch(
        "http://localhost:3030/pfr",
        {
          pokefight: pokemon,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(function (response) {
        setPokefight(response.data.pokefight);
      })
      .catch(function (error) {});
  }

  function buyPoke() {
    axios
      .patch(
        "http://localhost:3030/c",
        {
          coin: -1,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(function (response) {
        setPoke();
      })
      .catch(function (error) {
        if (error.response.data.coin) {
          alert(error.response.data.coin);
        } else if (error.response.status === 401) {
          localStorage.removeItem("jwt");
          window.location.href = "./Auth";
        }
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3030/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then(function (response) {
        setCoin(response.data.coin);
        setPokemons(response.data.pokemons);
        setPokefight(response.data.pokefight);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("jwt");
          window.location.href = "./Auth";
        }
      });
  }, [coin]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => res.json())
      .then((data) => {
        setTotal(data.count);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Card className="npkmn">
        {npkmn && (
          <Container>
            <h2 className="center">Congratulation !</h2>
            <br />
            <h2 className="center">You obtain {newPokemons.name} </h2>
            <Card className="ncards npkmnc">
              <Card.Header className="pkmn center bg-danger">
                {"#" + newPokemons.id + " " + newPokemons.name}
              </Card.Header>
              <img
                className="pkimg"
                src={
                  newPokemons.id <= 905 || newPokemons.id >= 10000
                    ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                      newPokemons.id +
                      ".png"
                    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
                }
                alt={"Image de " + newPokemons.name}
              />
              <Container className="bg-danger">
                <Container>
                  <p className="pkmn">Stats :</p>
                  <p>
                    HP:
                    {newPokemons.hp}
                  </p>
                  <p>
                    ATK:
                    {newPokemons.atk}
                  </p>
                  <p>
                    DEF:
                    {newPokemons.def}
                  </p>
                  <p>
                    ATKSp:
                    {newPokemons.atksp}
                  </p>
                  <p>
                    DEFSp:
                    {newPokemons.defsp}
                  </p>
                  <p>
                    SPD:
                    {newPokemons.spd}
                  </p>
                </Container>
                <Card className={newPokemons.type1 + " cardsp"}>
                  {newPokemons.type1}
                </Card>
                {newPokemons.type2 ? (
                  <Card className={newPokemons.type2 + " cardsp"}>
                    {newPokemons.type2}
                  </Card>
                ) : null}
              </Container>
            </Card>
          </Container>
        )}
        <h2 className="center">
          {coin}
          <img src={Pokepiece} alt="Pokepiece" className="piece" />
          <Button
            className="btn-success"
            onClick={() => {
              buyPoke();
            }}
          >
            Buy a Pokemon
          </Button>
        </h2>
      </Card>
      <br />
      <h2 className="center">Your fighting team ({pokefight.length}/4)</h2>
      {pokefight && (
        <ListGroup variant="flush">
          <ListGroup.Item className="table">
            {pokefight.map((pokemon) => (
              <Card
                className="cardspk"
                onClick={() => {
                  unsetPokeFight(pokemon);
                }}
              >
                <Card.Header className="pkmn center bg-danger">
                  {"#" + pokemon.id + " " + pokemon.name}
                </Card.Header>
                <img
                  className="pkimg"
                  src={
                    pokemon.id <= 905 ||
                    (pokemon.id >= 10000 && pokemon.id <= 10250)
                      ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                        pokemon.id +
                        ".png"
                      : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
                  }
                  alt={"Image de " + pokemon.name}
                />
                <Container className="bg-danger">
                  <Container>
                    <p className="pkmn">Stats :</p>
                    <p>
                      HP:
                      {pokemon.hp}
                    </p>
                    <p>
                      ATK:
                      {pokemon.atk}
                    </p>
                    <p>
                      DEF:
                      {pokemon.def}
                    </p>
                    <p>
                      ATKSp:
                      {pokemon.atksp}
                    </p>
                    <p>
                      DEFSp:
                      {pokemon.defsp}
                    </p>
                    <p>
                      SPD:
                      {pokemon.spd}
                    </p>
                  </Container>
                  <Card className={pokemon.type1 + " cardsp"}>
                    {pokemon.type1}
                  </Card>
                  {pokemon.type2 ? (
                    <Card className={pokemon.type2 + " cardsp"}>
                      {pokemon.type2}
                    </Card>
                  ) : null}
                </Container>
              </Card>
            ))}
          </ListGroup.Item>
        </ListGroup>
      )}
      <ListGroup variant="flush">
        <ListGroup.Item className="table">
          {pokemons.map((pokemon) => (
            <Card
              className="cardspk"
              onClick={() => {
                setPokeFight(pokemon);
              }}
            >
              <Card.Header className="pkmn center bg-danger">
                {"#" + pokemon.id + " " + pokemon.name}
              </Card.Header>
              <img
                className="pkimg"
                src={
                  pokemon.id <= 905 ||
                  (pokemon.id >= 10000 && pokemon.id <= 10250)
                    ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                      pokemon.id +
                      ".png"
                    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
                }
                alt={"Image de " + pokemon.name}
              />
              <Container className="bg-danger">
                <Container>
                  <p className="pkmn">Stats :</p>
                  <p>
                    HP:
                    {pokemon.hp}
                  </p>
                  <p>
                    ATK:
                    {pokemon.atk}
                  </p>
                  <p>
                    DEF:
                    {pokemon.def}
                  </p>
                  <p>
                    ATKSp:
                    {pokemon.atksp}
                  </p>
                  <p>
                    DEFSp:
                    {pokemon.defsp}
                  </p>
                  <p>
                    SPD:
                    {pokemon.spd}
                  </p>
                </Container>
                <Card className={pokemon.type1 + " cardsp"}>
                  {pokemon.type1}
                </Card>
                {pokemon.type2 ? (
                  <Card className={pokemon.type2 + " cardsp"}>
                    {pokemon.type2}
                  </Card>
                ) : null}
              </Container>
            </Card>
          ))}
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
