import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types'
import qs from 'qs'


window.onhashchange = function(event) {
  console.log(event.oldURL);
  console.log(event.newURL);
  console.log(window.location.hash);
};

class Router extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      url: window.location.pathname
    }
    this.history = window.history
    this.history.route = (name) => {
      this.setState({
        url: `/${name}`
      })
      window.history.pushState(null,null,name)
    }
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }

  static childContextTypes = {
    url: PropTypes.string,
    history: PropTypes.object
  }

  getChildContext () {
    return {
      url: this.state.url,
      history: this.history
    }
  }


  componentDidMount() {
    // window.onhashchange = () => {
    //   this.setState({
    //     hash: this.getHash()
    //   })
    // }

    window.onpopstate = (a) => {
      console.log(a)
    }
  }

}

class Route extends React.Component{

  static contextTypes = {
    url: PropTypes.string,
    history: PropTypes.object
  }

  render() {
    const {
      component,
      path
    } = this.props
    const {
      url
    } = this.context

    let instance = React.createElement('div', component)
    return (
      <>
        {url === path &&  React.createElement(component,null,null)}
      </>
    );
  }


  componentDidMount() {

  }

}

const AA = () => <div>aa</div>
const BB = () => <div>bb</div>

function App() {
  return (
    <div className="App">
      <Router >
        <header className="App-header">
          <div>header</div>
          <Route path='/aa' component={AA}/>
          <Route path='/bb' component={BB}/>
        </header>
      </Router>

    </div>
  );
}

export default App;
