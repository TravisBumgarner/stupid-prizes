import React, { Component, Fragment } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { FaBus, FaParachuteBox } from "react-icons/fa";
import logo from "./logo.svg";
import "./App.css";
import { timingSafeEqual } from "crypto";

const FG = "#ec47a8";
const BG = "#422079";

const ICON_SIZE = "10em";

const busChange = keyframes`
  0% {
    left:-${ICON_SIZE};
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
`;

const paraChange = keyframes`
  0% {
    top:-${ICON_SIZE};
  }
  50% {
    top:-${ICON_SIZE};
  }
  100% {
    top: 100%;
  }
`;

const NextUp = styled.p`
  margin: 1%;
  color: #fef851;
`;

const ParaIcon = styled(FaParachuteBox)`
  animation: ${paraChange} 1s linear infinite;
  position: absolute;
  left: calc(50vw - ${ICON_SIZE} / 2);
`;

const BusIcon = styled(FaBus)`
  animation: ${busChange} 1s linear infinite;
  position: absolute;
  top: calc(50vh - ${ICON_SIZE} / 2);
`;

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
`;

const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;

    }
    html {
        font-family: 'MyWebFont'; 
        background-color: ${BG};
        color: ${FG};
    }
    input {
      font-family: 'MyWebFont'; 
    }
    button {
      font-family: 'MyWebFont'; 
    }
    `;

const Header = styled.h1`
  font-size: 2em;
  text-align: center;
  margin: 0;
  padding: 0;
  margin-bottom: 1em;
`;

const SubHeader = styled.h1`
  font-size: 1.4em;
  text-align: center;
  margin: 0;
  padding: 0;
  margin-bottom: 0.7em;
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 98%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0);
  border: 0px;
  color: ${FG};
  border-bottom: 2px solid ${FG};
  font-size: 1.2em;
  margin: 10px 1%;
`;

const Button = styled.button`
  width: 98%;
  box-sizing: border-box;
  margin: 1%;
  background-color: ${FG};
  border: 0px;
  color: ${BG};
  font-size: 1.2em;
  padding: 10px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectingPlayers: true,
      isFlying: false,
      input0: "Absolouie",
      input1: "Cheeziitttt",
      input2: "Finx",
      input3: "V",
      players: [],
      activePlayerIndex: 0
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleNextPlayer = () => {
    const { activePlayerIndex, players } = this.state;
    const maxPlayerIndex = players.length - 1;
    console.log("hi");
    this.setState({
      isFlying: true,
      activePlayerIndex:
        activePlayerIndex === maxPlayerIndex ? 0 : activePlayerIndex + 1
    });
    setTimeout(() => this.setState({ isFlying: false }), 1000);
  };

  handleMessingItUp = () => {
    const { input0, input1, input2, input3 } = this.state;
    const players = [input0, input1, input2, input3].filter(e => e.length);

    this.setState({
      isSelectingPlayers: false,
      isFlying: true,
      players,
      activePlayerIndex: 0
    });
    setTimeout(() => this.setState({ isFlying: false }), 1000);
  };

  render() {
    const {
      isSelectingPlayers,
      input0,
      input1,
      input2,
      input3,
      activePlayerIndex,
      players,
      isFlying
    } = this.state;
    console.log(isFlying);
    const Inputs = [input0, input1, input2, input3].map((e, index) => {
      return (
        <Input
          key={index}
          value={e}
          onChange={this.handleInputChange}
          type="text"
          name={`input${index}`}
        />
      );
    });

    const SelectingHtml = (
      <Fragment>
        {Inputs}
        <ButtonsWrapper>
          <Button onClick={this.handleMessingItUp}>
            Let's win, or not, probably not!
          </Button>
        </ButtonsWrapper>
      </Fragment>
    );

    const PlayingHtml = (
      <Fragment>
        <ButtonsWrapper>
          <Button onClick={() => this.setState({ isSelectingPlayers: true })}>
            Edit
          </Button>
          <Button onClick={this.toggleNextPlayer}>Next</Button>
        </ButtonsWrapper>
      </Fragment>
    );
    console.log(isFlying);
    return (
      <Fragment>
        <GlobalStyle />
        <AppWrapper>
          {isFlying ? (
            <Fragment>
              <BusIcon size={ICON_SIZE} />
              <ParaIcon size={ICON_SIZE} />
            </Fragment>
          ) : (
            <div>
              <Header>
                {isSelectingPlayers ? "Who is playing?" : "Who's up next?"}
              </Header>
              <SubHeader>
                {isSelectingPlayers ? (
                  "Type faster!"
                ) : (
                  <Fragment>
                    <NextUp>{players[activePlayerIndex]}</NextUp>
                    <br />
                    <span>Don't die, just build lol.</span>
                  </Fragment>
                )}
              </SubHeader>
              {isSelectingPlayers ? SelectingHtml : PlayingHtml}
            </div>
          )}
        </AppWrapper>
      </Fragment>
    );
  }
}

export default App;
