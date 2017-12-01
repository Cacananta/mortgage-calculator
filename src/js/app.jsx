import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props)
    this.state = {
      balance: "",
      rate: "",
      term: "",
      output: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Classes have methods and properties => properties describe an object, methods are things that the object does.
  calculatePayment(balance, rate, term, period) {
    var rateAsDecimal = (rate / 100) / 12;
    return balance * ((rateAsDecimal * Math.pow(1 + rateAsDecimal, term * period)) / (Math.pow(1 + rateAsDecimal, term * period) - 1));
  }

  handleChange(event) {
    var stateName = event.target.getAttribute('name'); //tried this as 'event.target.name' but still getting 'stateName:' as a state in React Dev Tool
    var stateValue = parseFloat(event.target.value);
    //10/10 @~11:45am Mike suggested adding Object.assign to this.setState because 'this.setState' by itself "clobbers" the current state/element/value.
    //JavaScript gets processsed from the inside out (i.e. order of operations).
    this.setState(Object.assign(this.state, { [stateName]: stateValue }));
  }

  handleSubmit(event) {
    this.setState(Object.assign(this.state, { output: this.calculatePayment(this.state.balance, this.state.rate, this.state.term, 12).toFixed(2) }));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="container text-center">
          <div className="row my-3">
            <div className="col-lg-4">
              <h3>Loan Balance</h3>
              <input name="balance" type="number" onChange={this.handleChange} />
            </div>
            <div className="col-lg-4">
              <h3>Interest Rate (%)</h3>
              <input placeholder="Ex: 6.45%" name="rate" type="number" step="0.01" onChange={this.handleChange} />
            </div>
            <div className="col-lg-4">
              <h3>Loan Terms (years)</h3>
              <div className="dropdown">
                <select name="term" onChange={this.handleChange}>
                  <option className="dropdown-item">Select Term</option>
                  <option className="dropdown-item">30</option>
                  <option className="dropdown-item">15</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <button name="submit" onClick={this.handleSubmit} className="btn btn-info">Calculate Mortgage Payment</button>
          </div>
        </div>


        {!this.state.output ? <div></div> : <div id="output"><h3>${this.state.output} is your payment</h3></div>}
      </div >
    );
  }
}

