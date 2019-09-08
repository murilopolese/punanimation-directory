import React from 'react'
import Icon from './Icon.js'
import Item from './Item.js'
import SearchInput from './SearchInput.js'
import './Select.css'

class Select extends React.Component {
	onChangeSearch(e) {
		return this.props.onChangeSearch(e.target.value)
	}
	containsAnyElement(array1, array2) {
		if (array1.length === 0) {
			return true
		}
		return array1.filter((item1) => {
			return array2.filter((item2) => item1 === item2)
		})
	}
	render() {
		let classes = `select`
		if (this.props.selected && this.props.selected.length > 0) {
			classes += ` select-selected`
		}
		if (this.props.open) {
			classes += ` select-open`
		}
		return (
			<div className={classes}>
				<div className="select-label" onClick={this.props.onClick}>
					{this.props.children}
					<div className="select-icon">
						<Icon name="arrow-down" />
					</div>
				</div>
				<div className="select-dialog">
					<div className="select-search">
						<SearchInput onChange={this.onChangeSearch.bind(this)} />
					</div>
					<div className="select-options">
						{this.props.options.map((option, i) => (
							<Item
								{...option}
								key={i}
								onClick={() => this.props.onItemClick(option)}
								selected={this.props.selected.indexOf(option.id) !== -1}
								>
								{option.label}
							</Item>
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default Select
