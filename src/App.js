import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import {
  FaArrowUp,
  FaArrowDown,
  FaPlay,
  FaPause,
  FaRotate,
} from "react-icons/fa6";
import { useState, useEffect } from "react";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [totalBreakTime, setTotalBreakTime] = useState([breakTime, "00"]);
  const [sessionTime, setSessionTime] = useState(0);
  const [totalTime, setTotalTime] = useState([sessionTime, "03"]);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  let totalSeconds = parseInt(totalTime[0]) * 60 + parseInt(totalTime[1]);
  let totalSecondsBreak = parseInt(totalBreakTime[0]) * 60 + parseInt(totalBreakTime[1]);

  const formattedTime = (seconds) => {
    let minutes = parseInt(seconds / 60);
    console.log(minutes);
    let restSeconds = parseInt(seconds % 60);
    console.log(restSeconds);
    let formattedMinutes = minutes.toString().padStart(2, "0");
    let formattedSeconds = restSeconds.toString().padStart(2, "0");
    if (!isBreak) {
      setTotalTime([formattedMinutes, formattedSeconds]);
    } else {
      setTotalBreakTime([formattedMinutes, formattedSeconds]);
    }
  };

  const runningChange = () => setIsRunning(!isRunning);

  useEffect(() => {
    let interval;
    console.log(totalSeconds)
    if (isRunning && !isBreak) {
      if(totalSeconds !== 0){
        interval = setInterval(() => {
          totalSeconds--;
          formattedTime(totalSeconds);
          console.log('el numero no es 0');
        }, 1000);
      }
      else{
        setIsBreak(!isBreak)
        console.log('el numero es 0')
      }
    } else if (isRunning && isBreak) {
      interval = setInterval(() => {
        totalSecondsBreak--;
        formattedTime(totalSecondsBreak);
        console.log(totalSecondsBreak);
      }, 1000);
      console.log('es break')
    }
    return () => clearInterval(interval);
  }, [isRunning, sessionTime, breakTime, isBreak]);

  const resetTimer = () => {
    setBreakTime(5);
    setSessionTime(25);
    setTotalTime(["25", "00"]);
    setIsRunning(false)
    setTotalBreakTime(['05', '00'])
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
        setTotalTime([newValue, totalTime[1]]);
        break;
      case "session-increment":
        newValue = sessionTime + 1;
        setSessionTime(newValue);
        setTotalTime([newValue, totalTime[1]]);
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
                  disabled={breakTime === 60}
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
                  disabled={breakTime === 0}
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
                  disabled={sessionTime === 60}
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
                  disabled={sessionTime === 0}
                >
                  <FaArrowDown />
                </Button>
              </div>
            </article>
            <Container className="w-100 d-flex justify-content-center">
              <div className="timer my-3">
                <h1 id="timer-label">Tiempo restante</h1>
                <div id="time-left" className="fs-1">
                  {isBreak
                    ? totalBreakTime[0] + ":" + totalBreakTime[1]
                    : totalTime[0] + ":" + totalTime[1]}
                </div>
              </div>
            </Container>
          </aside>
          <aside className="w-100 d-flex flex-wrap justify-content-center">
            <Button onClick={runningChange} id="start_stop" className="button">
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
      </Col>
    </Row>
  );
}

export default App;
