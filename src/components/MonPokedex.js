import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Pokepiece from "../img/Pokepiece.png";
import { Button, ListGroup } from "react-bootstrap";

export default function MonPokedex() {
  const [coin, setCoin] = useState("");
  const [pokemons, setPokemons] = useState([""]);
  const [total, setTotal] = useState("");
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
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });

    setCoin(coin - 1);
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
        console.log(error.response.data.coin);
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
        console.log(response);
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
        console.log(total);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Card body>
        <h2>
          {coin}
          <img src={Pokepiece} alt="Pokepiece" className="piece" />
          <Button
            onClick={() => {
              buyPoke();
            }}
          >
            Buy a Pokemon
          </Button>
        </h2>
      </Card>
      <ListGroup className="tabl" variant="flush">
        <ListGroup.Item>
          {pokemons.map((pokemon) => (
            <Card className="cards">
              <Card.Header className="pkmn bg-danger">
                {"#" + pokemon.id + " " + pokemon.name}
              </Card.Header>
              <img
                className="pkimg"
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  pokemon.id +
                  ".png"
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
