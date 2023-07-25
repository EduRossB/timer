import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import {
  FaArrowUp,
  FaArrowDown,
  FaPlay,
  FaPause,
  FaRotate,
} from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";

function App() {
  const [breakTime, setBreakTime] = useState([0, 5]);
  const [sessionTime, setSessionTime] = useState([0, 3]);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  let secondsBreakTime = parseInt(breakTime[0]) * 60 + parseInt(breakTime[1]);
  let secondsSessionTime =
    parseInt(sessionTime[0]) * 60 + parseInt(sessionTime[1]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      if (!isBreak) {
        interval = setInterval(() => {
          --secondsSessionTime;
          let formatTimeLocal = formatTime(secondsSessionTime);
          setSessionTime([formatTimeLocal[0], formatTimeLocal[2]]);
          if (secondsSessionTime === 0) {
            setIsBreak(true);
          }
        }, 1000);
      } else {
        interval = setInterval(() => {
          --secondsBreakTime;
          console.log("bajo 1 segundo break");
          let formatTimeLocal = formatTime(secondsBreakTime);
          setBreakTime([formatTimeLocal[0], formatTimeLocal[2]]);
          if (secondsBreakTime === 0) {
            resetTimer();
          }
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, isBreak]);

  const formatTime = (seconds) => {
    let minutes = parseInt(seconds / 60);
    let restSeconds = parseInt(seconds % 60);
    let formattedMinutes = minutes.toString().padStart(2, "0");
    let formattedSeconds = restSeconds.toString().padStart(2, "0");
    return [formattedMinutes, ":", formattedSeconds];
  };

  const resetTimer = () => {
    setBreakTime([5, 0]);
    setSessionTime([25, 0]);
    setIsBreak(false);
    setIsRunning(false);
  };

  const changeRunning = () => setIsRunning(!isRunning);

  const changeTime = (id) => {
    let newValue = 0;
    switch (id) {
      case "break-decrement":
        newValue = [breakTime[0] - 1, breakTime[1]];
        setBreakTime(newValue);
        break;
      case "break-increment":
        newValue = [breakTime[0] + 1, breakTime[1]];
        setBreakTime(newValue);
        break;
      case "session-decrement":
        newValue = [sessionTime[0] - 1, sessionTime[1]];
        setSessionTime(newValue);
        break;
      case "session-increment":
        newValue = [sessionTime[0] + 1, sessionTime[1]];
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
                  disabled={breakTime[0] === 60}
                >
                  <FaArrowUp />
                </Button>
                <p id="break-length" className="length-control-elements fs-4">
                  {useRef(breakTime[0]).current}
                </p>
                <Button
                  id="break-decrement"
                  onClick={(e) => changeTime(e.currentTarget.id)}
                  className="length-control-elements button"
                  disabled={breakTime[0] === 0}
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
                  disabled={sessionTime[0] === 60}
                >
                  <FaArrowUp />
                </Button>
                <p id="session-length" className="length-control-elements fs-4">
                  {useRef(sessionTime[0]).current}
                </p>
                <Button
                  id="session-decrement"
                  onClick={(e) => changeTime(e.currentTarget.id)}
                  className="length-control-elements button"
                  disabled={sessionTime[0] === 0}
                >
                  <FaArrowDown />
                </Button>
              </div>
            </article>
            <Container className="w-100 d-flex justify-content-center">
              <div className="timer my-3">
                <h1 id="timer-label">
                  {!isBreak ? "Tiempo Restante" : "PAUSA! Descansa"}
                </h1>
                <div id="time-left" className="fs-1">
                  {isBreak
                    ? formatTime(secondsBreakTime)[0] +
                      formatTime(secondsBreakTime)[1] +
                      formatTime(secondsBreakTime)[2]
                    : formatTime(secondsSessionTime)[0] +
                      formatTime(secondsSessionTime)[1] +
                      formatTime(secondsSessionTime)[2]}
                </div>
              </div>
            </Container>
          </aside>
          <aside className="w-100 d-flex flex-wrap justify-content-center">
            <Button onClick={changeRunning} id="start_stop" className="button">
              <FaPlay />
              <FaPause />
            </Button>
            <Button onClick={resetTimer} className="button" id="reset">
              <FaRotate />
            </Button>
          </aside>
        </main>
        <footer className="display-6 fs-5 mt-4">
          Created and designed by Juan Eduardo Ross Barba
        </footer>
        {secondsBreakTime === 0 || secondsSessionTime === 0 ? (
          <audio src={require("../src/sound-bells.mp3")} autoPlay />
        ) : (
          <audio src={require("../src/sound-bells.mp3")} />
        )}
      </Col>
    </Row>
  );
}

export default App;
