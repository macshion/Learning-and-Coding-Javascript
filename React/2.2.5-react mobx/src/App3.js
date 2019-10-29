import React,{Component} from 'react';
import {
	observable,
} from 'mobx'
import Friend from './views/friend'
import Post from './views/post'
import Action from './views/action'

import {
	observer,
	inject
} from 'mobx-react'

@inject('friend','post')
@observer
class App extends Component{



	render() {
		console.log(this.props,'this.props')
		return (
			<div>
				<h2>好友列表</h2>
				<Friend/>
				<h2>全部说说</h2>
				<Post/>

				<Action/>
			</div>
		);
	}

	componentDidMount() {

	}

}



export default App;
