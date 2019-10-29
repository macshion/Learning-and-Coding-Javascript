import React,{Component}from 'react'
import {inject, observer} from "mobx-react";

@inject('friend')
@observer
class Friend extends Component{
	render() {
		const {
			friend
		} = this.props
		return (
			<div>
				|{friend.list.map(item => <span onClick={() => {
					friend.activeId = item.id
			}} key={item.id}>{item.name} | </span>)}
			</div>
		);
	}
}

export default Friend
