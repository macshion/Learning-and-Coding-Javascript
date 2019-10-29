import React,{Component} from 'react'
import PropTypes from 'prop-types'
import '../../font-demo/iconfont.css'

class Icon extends Component{
	static propTypes = {
		name: PropTypes.string
	}

	static defaultProps = {
		name: 'aaa'
	}

	render() {
		const {
			name,
			...rest
		} = this.props
		return (
			<span {...rest} className={`icon iconfont icon-${name}`}></span>
		)
	}
}

export default Icon
