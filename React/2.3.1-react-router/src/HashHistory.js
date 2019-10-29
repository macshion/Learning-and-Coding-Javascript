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

  getHash(){
    let url = window.location.hash.replace('#','')
    return url
  }

  constructor(props) {
    super(props);
    this.state = {
      hash: window.location.hash
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
    hash: PropTypes.string,
  }

  getChildContext () {
    return {
      hash: this.getHash()
    }
  }


  componentDidMount() {
    window.onhashchange = () => {
      this.setState({
        hash: this.getHash()
      })
    }
  }

}

class Route extends React.Component{

  static contextTypes = {
    hash: PropTypes.string
  }

  render() {
    const {
      component,
      path
    } = this.props
    const {
      hash
    } = this.context

    let instance = React.createElement('div', component)
    return (
      <>
        {hash === path &&  React.createElement(component,null,null)}
      </>
    );
  }


  componentDidMount() {

  }

}

const AA = () => <div>aa</div>
const BB = () => <div>bb</div>

function HashHistoryDemo() {
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

export default HashHistoryDemo;
