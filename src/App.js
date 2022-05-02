import './App.css';
import usa from './images/usa.jpg';
import eu from './images/eu.png'
import { Component } from 'react';

const distanceNames = {m: 'в милях', k: 'в километрах'}
const heightNames = {f: 'в футах', c: 'в сантиметрах'}
//const imgHtml = {f:  <img src="images/usa.jpg" alt="usa" />, m: <img src="images/usa.png" alt="usa" />, c: <img src="eu.png" alt="eu" />, k: <img src="eu.png" alt="eu" />}
//{scale === 'm' ? <img src="images/usa.png" alt="usa" /> : <img src="eu.png" alt="eu" />}

function toKilometres (miles) {
  return miles * 1.60934;
}

function toMiles (kilometres) {
  return kilometres * 0.621371;
}

function toFeet (centimeters) {
  return centimeters / 30.48;
}

function toCentimeters (feet) {
  return feet * 30.48;
}

function tryConvert (unit, convert) {
  const input = parseFloat(unit);
  if (Number.isNaN(input)) return '';
  const output = convert(input);
  const rounded = Math.round(output*100) / 100;
  return rounded.toString();
}

class UnitInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  
  handleChange (e) {
    this.props.scale === 'k' || this.props.scale === 'm' ? 
    this.props.onDistanceChange(e.target.value) : 
    this.props.onHeightChange(e.target.value);
  }

  render () {
    const scale = this.props.scale;
    if (scale === 'm' || scale === 'k') {
    const distance = this.props.value;
      return (
        <div className='inputLabel'>
          <input value={distance} onChange={this.handleChange} />
          { scale === 'm' ? <img src={usa} /> : <img src={eu} /> }
          <label>{distanceNames[scale]}</label>
        </div>
      )
    } else if (scale === 'f' || scale === 'c') {
      const height = this.props.value;
      return (
        <div className='inputLabel'>
          <input value={height} onChange={this.handleChange} />
          { scale === 'f' ? <img src={usa} /> : <img src={eu} /> }
          <label>{heightNames[scale]}</label>
        </div>
      )
    }
  }
}

class HeightConverter extends Component {
  constructor(props) {
    super(props);
    this.handleFeetChange = this.handleFeetChange.bind(this);
    this.handleCentimetersChange = this.handleCentimetersChange.bind(this);
    this.state = {scaleH: '', height: ''}
  }

  handleFeetChange(height) {
    this.setState({scaleH: 'f', height})
  }

  handleCentimetersChange(height) {
    this.setState({scaleH: 'c', height})
  }

  render () {
    const scale = this.state.scaleH;
    const height = this.state.height;
    const feet = scale === 'c' ? tryConvert(height, toCentimeters) : height;
    const centimeters = scale === 'f' ? tryConvert(height, toFeet) : height;
    return (
      <fieldset className='heightConv'>
        <legend className='legend'>Введите рост:</legend>
        <UnitInput scale="f" value={feet} onHeightChange={this.handleFeetChange} />
        <UnitInput scale="c" value={centimeters} onHeightChange={this.handleCentimetersChange} />
      </fieldset>
    )
  }
}

class DistanceConverter extends Component {
  constructor(props) {
    super(props);
    this.handleMilesChange = this.handleMilesChange.bind(this);
    this.handleKilometresChange = this.handleKilometresChange.bind(this);
    this.state = {scaleD: '', distance: ''}
  }

  handleMilesChange (distance) {
    this.setState({scaleD: 'm', distance})
  }
  handleKilometresChange (distance) {
    this.setState({scaleD: 'k', distance})
  }

  render () {
    const scale = this.state.scaleD;
    const distance = this.state.distance;
    const miles = scale === 'k' ? tryConvert(distance, toMiles) : distance;
    const kilometres = scale === 'm' ? tryConvert(distance, toKilometres) : distance;
    return ( 
      <fieldset className='distanceConv'>
        <legend className='legend'>Введите расстояние:</legend>
        <UnitInput scale="m" value={miles} onDistanceChange={this.handleMilesChange} />
        <UnitInput scale="k" value={kilometres} onDistanceChange={this.handleKilometresChange} />
      </fieldset>
    )
  }
}

class App extends Component {
  render () {
    return (
      <div className="App">
        <h2 style={{textAlign: 'center'}}>Калькулятор перевода единиц измерения США в систему ЕС</h2>
        <HeightConverter />
        <DistanceConverter />
      </div>
    );
  }
}

export default App;
