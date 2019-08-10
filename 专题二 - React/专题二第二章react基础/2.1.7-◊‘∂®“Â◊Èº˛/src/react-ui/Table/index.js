import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import './index.scss'


class ColumnItem extends Component{
	render() {
		const {
			render= () => '占位符',
			title,
		} = this.props.item
		return (
			<td>{title}</td>
		);
	}
}

class  Columns extends Component{
	render() {
		const {
			columns
		} = this.props
		return (
			<thead>
				<tr>
					{columns.map(item => <ColumnItem item={item} key={item.key}/>)}
				</tr>
			</thead>
		);
	}
}

class DataSourceItem extends Component{
	render() {
		const {
			columns,
			dataItem,
			index
		} = this.props


		const tds = columns.map((item) => <td> {item.render ? item.render(dataItem[item.dataIndex],dataItem,index) : dataItem[item.dataIndex]} </td>)
		return (
			<tr>
				{tds}
			</tr>
		);
	}
}

class DataSource extends Component{
	render() {
		const {
			dataSource,
			columns
		} = this.props

		let trs = dataSource.map((item,index) => <DataSourceItem dataItem={item} index={index} columns={columns}/>)

		return (
			<tbody>
			{trs}
			</tbody>
		);
	}
}

class Table extends Component{
	static propTypes = {
		columns: PropTypes.array,
		dataSource: PropTypes.array
	}

	static defaultProps = {
		columns: [],
		dataSource: []
	}

	render() {
		const {
			columns,
			dataSource,
			...rest
		} = this.props
		return (
			<div>
				<table border="1">
					<Columns columns={columns}/>
					<DataSource dataSource={dataSource} columns={columns}/>
				</table>
			</div>
		)
	}
}


export default Table

