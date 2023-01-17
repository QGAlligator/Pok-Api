import Container from "react-bootstrap/Container";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function Combat() {
  const [isFigthing, setIsFighting] = useState();
  const [user, setUser] = useState();
  const [win, setWin] = useState();
  const [lose, setLose] = useState();

  if (localStorage.getItem("jwt") == null) {
    window.location.href = "./Auth";
  }

  function pokeFight() {
    axios
      .get("http://localhost:3030/f", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then(function (response) {
        if (response.data.winner === user) {
          setWin(true);
          setLose(false);
          setIsFighting(false);
        } else {
          setLose(true);
          setWin(false);
          setIsFighting(false);
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
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
        setIsFighting(response.data.isFigthing);
        setUser(response.data.username);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("jwt");
          window.location.href = "./Auth";
        }
      }, []);
  });

  return (
    <Container>
      {!lose && !win && (
        <div className="center">
          <Button
            className="fightbutton btn-danger"
            onClick={() => pokeFight()}
          >
            Fight
          </Button>
        </div>
      )}
      {win && (
        <div>
          <h2>You win</h2>
          <Button className="btn-success" onClick={() => pokeFight()}>
            Replay
          </Button>
        </div>
      )}
      {lose && (
        <div>
          <h2>You lose</h2>
          <Button className="btn-danger" onClick={() => pokeFight()}>
            Replay
          </Button>
        </div>
      )}
    </Container>
  );
}
