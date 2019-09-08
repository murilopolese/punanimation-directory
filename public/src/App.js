import React from 'react'
import { connect } from 'react-redux'
import {
	loadEntries,
	loadLocations,
	loadSkills,
	loadSoftwares
} from './store'
import Header from './Header'
import Feed from './Feed'
import About from './About'
import CardDialog from './CardDialog'
import DrawerMenu from './DrawerMenu'

class App extends React.Component {
	componentDidMount() {
		const dispatch = this.props.dispatch
		loadLocations(dispatch)
		loadEntries(dispatch)
		loadSkills(dispatch)
		loadSoftwares(dispatch)
	}
	render() {
		return (
			<div id="app">
				<Header />
				{this.props.isAbout ? <About /> : <div />}
				{this.props.isHome ? <Feed /> : <div />}
				<CardDialog />
				<DrawerMenu />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAbout: state.router.route === 'about',
	isHome: state.router.route === 'home'
})
const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(App)
