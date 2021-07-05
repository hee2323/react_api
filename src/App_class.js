import React from "react";

class App extends React.Component {
  state = {
      number: 0
  };
  render() {
    return (
      <div style={{ "textAlign": "center" }}>
        <div style={{ "fontSize": "100px" }}>{this.state.number}</div>
        <button onClick={this.handleClickIncrement}>더하기</button>
        <button onClick={this.handleClickDecrement}>빼기</button>
      </div>
    );
  }
  handleClickIncrement = () => {
    this.setState(state => ({
      number: state.number + 1
    }));
  };
  handleClickDecrement = () => {
    this.setState(state => ({
      number: state.number - 1
    }));
  };
}

export default App;