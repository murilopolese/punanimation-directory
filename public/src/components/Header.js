import React from 'react'

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pos: 0, // page position
			offset: 0, // header position offset (hide/partial show)
			spacing: 0 // how much content should be pushed (current header height)
		}
		this.filter = React.createRef()
		this.container = React.createRef()
		this.head = React.createRef()
	}
	getHeight(elName) {
		return this[elName].current.offsetHeight
	}
	listenToResize(e) {
		this.setState({ ...this.state, spacing: this.getHeight('container') })
	}
	drawHeader() {
		const pos = window.pageYOffset
		const headHeight = this.getHeight('head')
		const containerHeight = this.getHeight('container')
		const scrollingDown = pos > this.state.pos
		if (pos < containerHeight) {
			// visible header
			if (!scrollingDown && pos > headHeight) {
				this.setState({
					offset: -headHeight,
					pos
				})
			} else {
				this.setState({
					offset: -pos,
					pos
				})
			}
		} else if (!scrollingDown) {
			// not on visible header and scrolling up: show filters
			this.setState({
				offset: -headHeight,
				pos
			})
		} else if (scrollingDown) {
			// not on visible height and scrolling down: hide
			this.setState({
				offset: -containerHeight,
				pos
			})
		}
		this.setState({ ...this.state, pos })
	}
	componentDidMount() {
		window.addEventListener('scroll', this.drawHeader.bind(this))
		window.addEventListener('resize', this.listenToResize.bind(this))
		this.setState({ ...this.state, spacing: this.getHeight('container') })
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.drawHeader.bind(this))
		window.removeEventListener('resize', this.listenToResize.bind(this))
	}
	computeStyle() {
		return {
			...this.props.style,
			position: 'fixed',
			left: 0,
			right: 0,
			top: this.state.offset
		}
	}
	render() {
		return (
			<div>
				<div ref={this.container} style={this.computeStyle()}>
					<div ref={this.head}>
						{this.props.children[0]}
					</div>
					<div ref={this.filter} style={{display: 'flex'}}>
						{this.props.children[1]}
					</div>
				</div>
				<div style={{ height: this.state.spacing }} />
			</div>
		)
	}
}

export default Header
