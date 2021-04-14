import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

class BMICalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  	// code here
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.computeBMI = this.computeBMI.bind(this);
    this.getBMI = this.getBMI.bind(this);
  }

  handleWeightChange(weightValue) {
    this.setState({ weight: weightValue });
  }

  handleHeightChange(heightValue) {
    this.setState({ height: heightValue });
  }

  computeBMI() {
  	let bmiValue = (this.state.weight / this.state.height) / this.state.height;
  	this.setState({ bmi : bmiValue });
	  // code here
    this.setState({ bmiClass: this.getBMI(bmiValue) });
  }

  getBMI(bmi) {
  	// code here
    if(bmi < 18.5) {
      return 'Underweight';
    } else if(bmi >= 18.5 && bmi < 25) {
      return 'Normal Weight';
    } else if(bmi >= 25 && bmi < 30) {
      return 'Overweight';
    } else if(bmi > 30) {
      return 'Obese';
    }
  }

  render() {
      return(
          <div>
              <div className="row">
                  <TextInput id="height" label="Height" placeholder="Enter height in meters" onChange={this.handleHeightChange} />
              </div>
              <div className="row">
                  <TextInput id="weight" label="Weight" placeholder="Enter weight in kg" onChange={this.handleWeightChange} />
              </div>
              <div className="row">
                  <Button label="SUBMIT" onClick={this.computeBMI} />
              </div>
              <div className="row">
                  <Display bmi={this.state.bmi} bmiClass={this.state.bmiClass}/>
              </div>
          </div>
      )
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value : '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    this.setState({ value: inputValue });
    this.props.onChange(inputValue);
  }

  render() {
      return(
          <div>
              <label>{this.props.label}</label>
              <input type="number" value={this.state.value} placeholder={this.props.placeholder} onChange={this.handleChange} />
          </div>
      );
  }
}

class Button extends React.Component {
  render() {
      return(
          <button onClick={this.props.onClick}>
            {this.props.label}
          </button>
      );
  }
}

class Display extends React.Component {
  render() {
      return(
          <div>
            <h3 id="bmi">BMI = {Number.isNaN((Number(this.props.bmi))) ? 'N/A': this.props.bmi.toFixed(2)}</h3>
            <h3 id="bmi-class">BMI Class = {this.props.bmiClass || 'N/A'}</h3>
          </div>
      );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BMICalculator />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
