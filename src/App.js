import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import {
  FaArrowUp,
  FaArrowDown,
  FaPlay,
  FaPause,
  FaRotate,
} from "react-icons/fa6";
import { useState } from "react";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [totalTime, setTotalTime] = useState(5);

  const resetTimer = () => {
    setBreakTime(5);
    setSessionTime(25);
  };

  const changeTime = (id) => {
    let newValue = 0;
    switch (id) {
      case "break-decrement":
        newValue = breakTime - 1;
        setBreakTime(newValue);
        break;
      case "break-increment":
        newValue = breakTime + 1;
        setBreakTime(newValue);
        break;
      case "session-decrement":
        newValue = sessionTime - 1;
        setSessionTime(newValue);
        break;
      case "session-increment":
        newValue = sessionTime + 1;
        setSessionTime(newValue);
        break;
      default:
        console.log("Boton equivocado");
    }
  };

  return (
    <Row className="App">
      <Col xs={11} sm={10} md={8} lg={6} className="clock">
        <header>Reloj 25+5</header>
        <main>
          <aside className="length-control w-100 d-flex flex-wrap justify-content-evenly">
            <article className="p-3">
              <h1 id="break-label" className="w-100 fs-3 col-12">
                Duracion pausa
              </h1>
              <div className="d-flex col-12 align-items-baseline">
                <Button
                  id="break-increment"
                  onClick={(e) => changeTime(e.currentTarget.id)}
                  className="length-control-elements button"
                >
                  <FaArrowUp />
                </Button>
                <p id="break-length" className="length-control-elements fs-4">
                  {breakTime}
                </p>
                <Button
                  id="break-decrement"
                  onClick={(e) => changeTime(e.currentTarget.id)}
                  className="length-control-elements button"
                >
                  <FaArrowDown />
                </Button>
              </div>
            </article>
            <article className="p-3">
              <h1 id="session-label" className="w-100 fs-3 col-12">
                Duracion Sesion
              </h1>
              <div className="d-flex col-12 align-items-baseline">
                <Button
                  id="session-increment"
                  onClick={(e) => changeTime(e.currentTarget.id)}
                  className="length-control-elements button"
                >
                  <FaArrowUp />
                </Button>
                <p id="session-length" className="length-control-elements fs-4">
                  {sessionTime}
                </p>
                <Button
                  id="session-decrement"
                  onClick={(e) => changeTime(e.currentTarget.id)}
                  className="length-control-elements button"
                >
                  <FaArrowDown />
                </Button>
              </div>
            </article>
            <Container className="w-100 d-flex justify-content-center">
              <div className="timer my-3">
                <h1 id="timer-label">Tiempo restante</h1>
                <div id="time-left" className="fs-1">
                  25:00
                </div>
              </div>
            </Container>
          </aside>
          <aside className="w-100 d-flex flex-wrap justify-content-center">
            <Button id="start_stop" className="button">
              <FaPlay />
              <FaPause />
            </Button>
            <Button onClick={resetTimer} className="button" id="reset">
              <FaRotate />
            </Button>
          </aside>
        </main>
        <footer></footer>
      </Col>
    </Row>
  );
}

export default App;
