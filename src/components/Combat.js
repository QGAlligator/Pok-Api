import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function Combat() {
  if (localStorage.getItem("jwt") == null) {
    window.location.href = "./Auth";
  }

  return (
    <Container>
      <Card body>
        <h3>WIP</h3>
      </Card>
    </Container>
  );
}
