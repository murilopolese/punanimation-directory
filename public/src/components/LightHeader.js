import React from 'react'

let cpos = 0

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mounted: true,
			position: 'relative',
			spacing: 0,
			pos: 0,
			offset: 0, // page position
		}
		this.container = React.createRef()
		this.head = React.createRef()
		this.spacing = React.createRef()
	}
	drawHeader() {
		const pos = window.pageYOffset
		if (pos === cpos) {
			return false
		}
		const containerHeight = this.container.current.clientHeight
		const headHeight = this.head.current.clientHeight
		const containerStyle = this.container.current.style
		const spacingStyle = this.spacing.current.style
		const scrollingDown = pos > cpos
		const scrollingUp = pos < cpos
		const hidden = containerStyle.position === 'fixed'
				&& containerStyle.top === `${-containerHeight}px`
		const regular = containerStyle.position === 'relative'
				&& containerStyle.top === 0

		if (pos > containerHeight) {

			if ( scrollingDown && !hidden ) {
				containerStyle.position = 'fixed'
				containerStyle.top = `${-containerHeight}px`
				spacingStyle.height = `${containerHeight}px`
			}

			if ( scrollingUp && hidden ) {
				containerStyle.position = 'fixed'
				containerStyle.top = `${-headHeight}px`
				spacingStyle.height = `${containerHeight}px`
			}

		} else if ( !regular ) {
			containerStyle.position = 'relative'
			containerStyle.top = `0px`
			spacingStyle.height = `0px`
		}

		cpos = pos
	}

	loop() {
		this.drawHeader()
		if (this.state.mounted) {
			window.requestAnimationFrame(this.loop.bind(this))
		}
	}
	componentDidMount() {
		this.setState({ ...this.state, mounted: true })
		this.loop()
	}
	componentWillUnmount() {
		this.setState({ ...this.state, mounted: false })
	}
	computeStyle() {
		return {
			...this.props.style,
			left: 0,
			right: 0,
			// transition: 'top 0.5s linear'
		}
	}
	render() {
		return (
			<div>
				<div id="head-container" ref={this.container} style={this.computeStyle()}>
					<div id="head-head" ref={this.head}>
						{this.props.children[0]}
					</div>
					<div>
						{this.props.children[1]}
					</div>
				</div>
				<div ref={this.spacing} style={{width: '100%', height: this.state.spacing}} />
			</div>
		)
	}
}

export default Header
