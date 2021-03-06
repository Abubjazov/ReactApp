/* eslint-disable no-useless-constructor */
import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.scss'
import Car from './Car/Car'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import Counter from './Counter/Counter'
import Header from './Header/Header'
import About from './About/About'
import Cars from './Cars/Cars'
import CarDetail from './CarDetail/CarDetail'

export const ClickedContext = React.createContext(false)

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      clicked: false,
      cars: [
        {name: 'Kia', year: 2020, color: 'red'},
        {name: 'Audi', year: 2015, color: 'blue'},
        {name: 'Mazda', year: 2019, color: 'green'}
      ],
      pageTitle: 'Car list',
      showCars: false 
    }
  }

  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars
    })
  }

  onChangeName(name, index) {
    const car = this.state.cars[index]
    car.name = name
    // const cars = this.state.cars.concat() //clone array
    const cars = [...this.state.cars]        //clone array

    cars[index] = car
    this.setState({cars})
  }

  deleteHandler(index) {
    const cars = this.state.cars.concat()

    cars.splice(index, 1)
    this.setState({cars})
  }

  render() {
    let cars = null

    if (this.state.showCars) {
      cars = this.state.cars.map((car, index) => {
        return (
          <ErrorBoundary key={index}>
            <Car 
              name={car.name} 
              year={car.year} 
              index = {index}
              color={car.color}
              onDelete={this.deleteHandler.bind(this, index)}
              onChangeName={event => this.onChangeName(event.target.value, index)}
            />
          </ErrorBoundary>
        )
      })
    }

    return (

      <div className='App'>
        {/* <h1>{this.state.pageTitle}</h1> */}
        <Header />
        <hr />
        <h3>Is LoggedIn: {this.state.isLoggedIn ? 'TRUE' : 'FALSE'}</h3>
        <button onClick={() => this.setState({isLoggedIn: !this.state.isLoggedIn})}>Log In</button>
        <hr />
        <Switch>
          <Route path="/" exact render={() => <h1>Home Page</h1>} />
          { this.state.isLoggedIn ? <Route path="/about" component={About} /> : null}          
          <Route path="/cars/:name" component={CarDetail} />
          <Route path="/cars" component={Cars} />
          <Redirect to={'/'}/>
          {/* <Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>} />          */}
        </Switch>

        <ClickedContext.Provider value={this.state.clicked}>
          <Counter />
        </ClickedContext.Provider>

        <h1>{this.props.title}</h1>
  
        <button 
          onClick={this.toggleCarsHandler}
          >Toggle Cars</button>

        <button onClick={() => this.setState({clicked: true})}
        >CHANGE CLICKED</button>

        {/* <input type="text" onChange={this.inputHandler} /> */}
        <div style={{
          width: 400,
          margin: 'auto',
          paddingTop: 20
        }}>
          { cars }
        </div>
      </div>
    )  
  }
  
}

export default App;
