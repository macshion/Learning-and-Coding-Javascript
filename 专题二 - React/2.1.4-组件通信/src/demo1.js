import React,{Component} from 'react';
import './App.css';

class Action extends Component{
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}
	render() {
		return (
			<div>
				<input value={this.state.value} onChange={(e) => this.setState({value: e.target.value})}/>
				{/* 2、执行伪代码 */}
				<button onClick={() => {
					this.props.onAdd(this.state.value)
					this.setState({
						value: ''
					})
				}}>提交</button>
			</div>
		);
	}
}

class List extends Component{
	render() {
		return (
			<div>
				{this.props.data.map(item => <p key={item.id}>{item.name}</p>)}
			</div>
		);
	}
}

class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'a',id:0},
				{name: 'b',id:1},
				{name: 'c',id:2}
			],
			value: ''
		}
	}
	//  第二种写法
	//  功能函数定义
	//  onAdd(){
	// 	let {data} = this.state
	// 	data.push({
	// 		name,
	// 		id: name
	// 	})
	// 	this.setState({
	// 		data
	// 	})
	//  }
	render() {
		return (
			<div>
				 <Action
				 	// 1、写出伪代码
				    onAdd={(name) => {
				    	let {data} = this.state
					    data.push({
						    name,
						    id: name
					    })
					    this.setState({
						    data
					    })
					}}
					// 第二种写法
					// onAdd = {this.onAdd.bind(this)} 
				 />
				 <List data={this.state.data}/>
			</div>
		);
	}
}

export default App;
