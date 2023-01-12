import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [hp, setHp] = useState("");
  const [atk, setAtk] = useState("");
  const [def, setDef] = useState("");
  const [atks, setAtks] = useState("");
  const [defs, setDefs] = useState("");
  const [speed, setSpeed] = useState("");
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
      })
      .catch((err) => console.error(err));
    //eslint-disable-next-line
  }, [url.current]);

  useEffect(() => {
    pokemons.map((pokemon) => {
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setType1((current) => [...current, data.types[0].type.name]);
          setType2((current) => [...current, data.types[1]?.type?.name]);
          setHp((current) => [...current, data.stats[0].base_stat]);
          setAtk((current) => [...current, data.stats[1].base_stat]);
          setDef((current) => [...current, data.stats[2].base_stat]);
          setAtks((current) => [...current, data.stats[3].base_stat]);
          setDefs((current) => [...current, data.stats[4].base_stat]);
          setSpeed((current) => [...current, data.stats[5].base_stat]);
        })
        .then(setType1(""))
        .then(setType2(""))
        .then(setHp(""))
        .then(setAtk(""))
        .then(setDef(""))
        .then(setAtks(""))
        .then(setDefs(""))
        .then(setSpeed(""))
        .catch((err) => console.error(err));
      return null;
    });
  }, [pokemons]);

  return (
    <div>
      <ListGroup className="tabl" variant="flush">
        <ListGroup.Item>
          {pokemons.map((pokemon) => (
            <Card className="cards">
              <Card.Header className="pkmn bg-danger">
                {"#" + pokemon.url.split("/")[6] + " " + pokemon.name}
              </Card.Header>
              <img
                className="pkimg"
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  pokemon.url.split("/")[6] +
                  ".png"
                }
                alt={"Image de " + pokemon.name}
              />
              <Container className="bg-danger">
                <Container>
                  <p className="pkmn">Stats :</p>
                  <p>
                    HP:
                    {
                      hp[
                        pokemon.url.split("/")[6] % 20 === 0
                          ? 19
                          : (pokemon.url.split("/")[6] % 20) - 1
                      ]
                    }
                  </p>
                  <p>
                    ATK:
                    {
                      atk[
                        pokemon.url.split("/")[6] % 20 === 0
                          ? 19
                          : (pokemon.url.split("/")[6] % 20) - 1
                      ]
                    }
                  </p>
                  <p>
                    DEF:
                    {
                      def[
                        pokemon.url.split("/")[6] % 20 === 0
                          ? 19
                          : (pokemon.url.split("/")[6] % 20) - 1
                      ]
                    }
                  </p>
                  <p>
                    ATKSp:
                    {
                      atks[
                        pokemon.url.split("/")[6] % 20 === 0
                          ? 19
                          : (pokemon.url.split("/")[6] % 20) - 1
                      ]
                    }
                  </p>
                  <p>
                    DEFSp:
                    {
                      defs[
                        pokemon.url.split("/")[6] % 20 === 0
                          ? 19
                          : (pokemon.url.split("/")[6] % 20) - 1
                      ]
                    }
                  </p>
                  <p>
                    SPD:
                    {
                      speed[
                        pokemon.url.split("/")[6] % 20 === 0
                          ? 19
                          : (pokemon.url.split("/")[6] % 20) - 1
                      ]
                    }
                  </p>
                </Container>
                <Card
                  className={
                    type1[
                      pokemon.url.split("/")[6] % 20 === 0
                        ? 19
                        : (pokemon.url.split("/")[6] % 20) - 1
                    ] + " cardsp"
                  }
                >
                  {
                    type1[
                      pokemon.url.split("/")[6] % 20 === 0
                        ? 19
                        : (pokemon.url.split("/")[6] % 20) - 1
                    ]
                  }
                </Card>
                {type2[
                  pokemon.url.split("/")[6] % 20 === 0
                    ? 19
                    : (pokemon.url.split("/")[6] % 20) - 1
                ] ? (
                  <Card
                    className={
                      type2[
                        pokemon.url.split("/")[6] % 20 === 0
                          ? 19
                          : (pokemon.url.split("/")[6] % 20) - 1
                      ] + " cardsp"
                    }
                  >
                    {
                      type2[
                        pokemon.url.split("/")[6] % 20 === 0
                          ? 19
                          : (pokemon.url.split("/")[6] % 20) - 1
                      ]
                    }
                  </Card>
                ) : null}
              </Container>
            </Card>
          ))}
        </ListGroup.Item>
      </ListGroup>
      <Container className="footer">
        {url.previous && <Button onClick={previous}>Previous</Button>}
        {url.next && <Button onClick={next}>Next</Button>}
      </Container>
    </div>
  );
}
