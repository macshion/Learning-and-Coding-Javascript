import React,{Component} from "react";
import PropTypes from 'prop-types'

// 用于预先 将业务组件，进行数据的封装，便于我们 方便获取数据
// 反向继承 交互的封装，
const loading = Com  => {
	class LoadingComponent extends Com {
		
		showLoading(){
			console.log('loading')
		}
		hideLoading(){
			console.log('hide')
		}
	}
	return LoadingComponent
}



@loading
class User extends Component{
	render() {
		return <div>user</div>
	}

	componentDidMount() {
		this.showLoading()
		//http
		this.hideLoading()
	}
}

class App extends Component{
	render() {
		return <User/>
	}
}


export default App
