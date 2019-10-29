import React,{Component} from "react";
import PropTypes from 'prop-types'

// 用于预先 将业务组件，进行数据的封装，便于我们 方便获取数据
// 反向继承
const connect = key => Com  => {
	class connectComponent extends Component {
		constructor(props){
			super(props)
			this.state = {
				[key]: store[key]
			}
		}
		render() {
			return <Com {...this.state}/>
		}

		componentDidMount() {
			let that = this
			window.store = new Proxy(store, {
				get: function (target, key, receiver) {
					return Reflect.get(target, key, receiver);
				},
				set: function (target, key, value, receiver) {
					that.setState({
						[key]:value
					})
					return Reflect.set(target, key, value, receiver);
				}
			})
		}

	}
	return connectComponent
}

let store = {
	name: 'ryan',
	age: 10
}

@connect('age')
class User extends Component{
	render() {
		return <div>{this.props.age}</div>
	}
}


class App extends Component{
	render() {
		return <User/>
	}
}


export default App
