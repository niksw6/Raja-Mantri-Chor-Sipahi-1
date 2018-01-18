import React, { Component } from 'react';
import './App.css';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Screen />
    );
  }
}

export default App;

class Screen extends React.Component{
    constructor() {
        super();
        this.state = {
            // stepNumber just denote various screens of the game.
            stepNumber: 0,
            instructionalMessage : 'Click "Start" to start the game',
            actionName : "Start",
            mainContent: <h3 className = "vcenter">Welcome !!</h3>,
            // 2-D array. Array of 4 arrays
            playerNamesAndValues: [[], []]
        };
    }

    // Prince(0), Minister(1), Thief(2), Police(3)
    convertNumberToString(number) {
        switch (number) {
            case 0:
                return "Prince";
            case 1:
                return "Minister";
            case 2:
                return "Thief";
            default:
                return "Police";
        }
    }

    nextStep() {
        //@prashant tod0 - refactor into diff mehods
        switch (this.state.stepNumber) {
            case 0: const InputPlayerNames = () => {
                return (
                    <div>
                        <InputPlayerName name ='Player1'/>
                        <InputPlayerName name='Player2'/>
                        <InputPlayerName name='Player3'/>
                        <InputPlayerName name='Player4'/>
                    </div>
                );
            };
                this.setState(
                {
                    stepNumber: 1,
                    instructionalMessage: "Enter Player Names",
                    actionName: "Submit",
                    mainContent: InputPlayerNames()
                })
                break;

                //@prashant maybe try to refactor business logic away from view logic according to react philosphy
            case 1:
                // Read and store player names
                this.state.playerNamesAndValues[0][0] = document.getElementById('Player1').value;
                this.state.playerNamesAndValues[0][1] = document.getElementById('Player2').value;
                this.state.playerNamesAndValues[0][2] = document.getElementById('Player3').value;
                this.state.playerNamesAndValues[0][3] = document.getElementById('Player4').value;

                // Randomly assign Prince(0), Minister(1), Thief(2), Police(3)
                var randomNumber = Math.round(Math.random() * 3);
                this.state.playerNamesAndValues[1][0] = randomNumber;

                randomNumber = Math.round(Math.random() * 3);
                while (randomNumber === this.state.playerNamesAndValues[1][0]) {
                    randomNumber = Math.round(Math.random() * 3);
                }
                this.state.playerNamesAndValues[1][1] = randomNumber;

                randomNumber = Math.round(Math.random() * 3);
                while (randomNumber === this.state.playerNamesAndValues[1][0] || randomNumber === this.state.playerNamesAndValues[1][1]) {
                    randomNumber = Math.round(Math.random() * 3);
                }
                this.state.playerNamesAndValues[1][2] = randomNumber;

                randomNumber = Math.round(Math.random() * 3);
                while (randomNumber === this.state.playerNamesAndValues[1][0] || randomNumber === this.state.playerNamesAndValues[1][1] ||
                    randomNumber === this.state.playerNamesAndValues[1][2] ) {
                    randomNumber = Math.round(Math.random() * 3);
                }
                this.state.playerNamesAndValues[1][3] = randomNumber;

                //@prashant fix solution for not editing state directly. But what if we don't want to re-render yet?
                // seems like setState trigerred re-render
                // Lets convert number to actual strings 0 is for prince
                this.state.playerNamesAndValues[1][0] = this.convertNumberToString(this.state.playerNamesAndValues[1][0]);
                this.state.playerNamesAndValues[1][1] = this.convertNumberToString(this.state.playerNamesAndValues[1][1]);
                this.state.playerNamesAndValues[1][2] = this.convertNumberToString(this.state.playerNamesAndValues[1][2]);
                this.state.playerNamesAndValues[1][3] = this.convertNumberToString(this.state.playerNamesAndValues[1][3]);

                // for showing player names along with chits
                const PlayerNamesAndChits = () => {
                    return (
                        <div>
                            <PlayerNameAndChit key = "1" playerName={this.state.playerNamesAndValues[0][0]} playerChit={this.state.playerNamesAndValues[1][0]} />
                            <br></br>
                            <PlayerNameAndChit key="2" playerName={this.state.playerNamesAndValues[0][1]} playerChit={this.state.playerNamesAndValues[1][1]} />
                            <br></br>
                            <PlayerNameAndChit key="3" playerName={this.state.playerNamesAndValues[0][2]} playerChit={this.state.playerNamesAndValues[1][2]} />
                            <br></br>
                            <PlayerNameAndChit key="4" playerName={this.state.playerNamesAndValues[0][3]} playerChit={this.state.playerNamesAndValues[1][3]} />
                        </div>
                    );
            };
                this.setState(
                {
                    stepNumber: 2,
                    instructionalMessage: "Every player can individually take a look at their chits",
                    actionName: "Next",
                    mainContent: PlayerNamesAndChits()
                })
                break;

            case 2:
                const prince = this.state.playerNamesAndValues[0][this.state.playerNamesAndValues[1].findIndex((Item) => { return Item === "Prince" })];
                const minister = this.state.playerNamesAndValues[0][this.state.playerNamesAndValues[1].findIndex((Item) => { return Item === "Minister" })];
                const thief = this.state.playerNamesAndValues[0][this.state.playerNamesAndValues[1].findIndex((Item) => { return Item === "Thief" })];
                const police = this.state.playerNamesAndValues[0][this.state.playerNamesAndValues[1].findIndex((Item) => { return Item === "Police" })];

                //Randomly pick theif or police to be shown as 3rd and 4th name in instructional message.
                const random = Math.round(Math.random() * 1);

                // Player should click on thief to win
                const ThiefAndPolice = () => {
                    if (random == 0) {
                        return (
                            <div>
                                <PlayerNameAndChit playerName={police} value="?" info="police" />
                                <br></br>
                                <PlayerNameAndChit playerName={thief} value="?" info ="thief" />
                            </div>
                        );
                    }
                    else {
                        return (
                            <div>
                                <PlayerNameAndChit playerName={thief} value = "?" info = "thief" />
                                <br></br>
                                <PlayerNameAndChit playerName={police} value = "?" info = "police" />
                            </div>
                        );
                    }
                }


                this.setState({
                    instructionalMessage: 
                    prince + "(Prince) says that "
                    + minister + " (Minister) should find out of who is thief out of " + (random == 0 ? thief : police) +
                    " and " + (random == 0 ? police : thief),
                    actionName: "Restart",
                    stepNumber: 3,
                    mainContent: ThiefAndPolice()
                });

            case 3: // Just restart game
                this.setState({
                    stepNumber: 0
                });
                break;

            default: 
        }
    }
    render() {
        return (
            <div className="screen">
                <InstructionalMessage msg={this.state.instructionalMessage} />
                <MainContent mainContent={this.state.mainContent} />
                <ActionButton onClick={() => { this.nextStep() }}
                    actionName ={this.state.actionName}
                    />
            </div>
            );
    }
}

class InstructionalMessage extends React.Component {
    render() {
        return (
            <div className="jumbotron text-center IMsg font-weight-bold">
             <h4>   {this.props.msg} </h4>
            </div>
            );
    }
}

class ActionButton extends React.Component {
    render() {
        return (
            <div className="ActionButton">
                <button className = "btn-primary btn-lg" onClick={this.props.onClick} > { this.props.actionName }</button>
            </div>
        );
    }
}

class MainContent extends React.Component {
    render() {
        return (
            <div className="MainContent text-center">
             {this.props.mainContent} 
            </div>
            );
    }
}

class InputPlayerName extends React.Component {
    render() {
        return (
    <div class="form-group">
        <label for="inputName">{this.props.name}</label>
        <input type="text" class="form-control" id={this.props.name} />
    </div>
        );
    }
}

class PlayerNameAndChit extends React.Component {
    constructor() {
        super();
        this.state = {
            value: "?"
        }
    }

    showHideValue() {
        if (this.props.info)
        {
            // This means that this is guessing stage
            if (this.props.info === "thief")
            {
                return alert('Guess is right');
            }
            else
            {
                return alert('Guess is wrong');
            }
        }

        if (this.state.value === "?") {
            this.setState({
                value: this.props.playerChit
            });
        }
        else {
            // Need to hide calues of only thief and police
            if (this.props.playerChit === "Thief" || this.props.playerChit === "Police") {
                this.setState({
                    value: "?"
                });
            }
        }
        return (
            this.state.value
        );
    }
    render() {
        return (
            <div>
                {this.props.playerName} &nbsp;
                <button class = "btn btn-primary btn-sm" onClick={() => { this.showHideValue(); }}>{this.state.value}</button>
            </div>
        );
    }
}