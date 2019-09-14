import React from 'react'
import { connect } from 'react-redux'
import {
	Container,
	Grid,
	Box,
	Link,
	Hidden,
	IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Select from './components/Select'
import Text from './components/Text'
import Header from './components/LightHeader'
import Icon from './components/Icon'
import logo from './assets/newlogo.svg'
import countries from './assets/countries'

import {
	toggleLocationsMenu,
	searchLocations,
	toggleLocations,

	toggleSkillsMenu,
	searchSkills,
	toggleSkills,

	toggleSoftwaresMenu,
	searchSoftwares,
	toggleSoftwares,

	closeAllMenus,
	showDrawerMenu,
	routeTo
} from './store.js'

class PaniHeader extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			xs: true
		}
	}
	listenToResize(e) {
		this.setState({xs: e.target.innerWidth < 960})
	}
	listenToScroll(e) {
		this.props.closeAllMenus()
	}
	componentDidMount() {
		this.setState({xs: window.innerWidth < 960})
		window.addEventListener('resize', this.listenToResize.bind(this))
		window.addEventListener('scroll', this.listenToScroll.bind(this))
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.listenToResize.bind(this))
		window.removeEventListener('scroll', this.listenToScroll.bind(this))
	}
	renderMenu() {
		let {
			showDrawerMenu,
			routeTo
		} = this.props
		let linkStyle = {
			fontWeight: 'inherit',
			cursor: 'pointer'
		}
		return (
			<div style={{position: 'absolute', top: 20, left: 0}}>
				<Hidden smDown>
					<Box component="span" marginRight={2}>
						<Text uppercase weight="semi-bold">
							<a
								href="/#about"
								style={linkStyle}
								onClick={() => routeTo('about')}>
								About
							</a>
						</Text>
					</Box>
					<Box component="span" marginRight={2}>
						<Text uppercase weight="semi-bold">
							<a
								style={linkStyle}
								href="https://panimation.typeform.com/to/ZJL9Gx"
								target="_blank"
								rel="noopener noreferrer"
								>
								Join
							</a>
						</Text>
					</Box>
				</Hidden>
				<Hidden mdUp>
					<IconButton onClick={showDrawerMenu} aria-label="menu">
						<MenuIcon />
					</IconButton>
				</Hidden>
			</div>
		)
	}
	renderSocialMedia() {
		let containerStyle = {
			position: 'absolute',
			right: 0,
			top: 20,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'flex-end'
		}
		let iconStyle = {
			width: 15,
			marginLeft: 10
		}
		return (
			<div style={containerStyle}>
				<Hidden smDown>
					<div style={iconStyle}>
						<Link href="https://www.facebook.com/groups/panimation/" target="_blank">
							<Icon name="facebook" color="#FCC438"/>
						</Link>
					</div>
					<div style={iconStyle}>
						<Link href="https://vimeo.com/channels/panimation" target="_blank">
							<Icon name="vimeo" color="#FCC438"/>
						</Link>
					</div>
					<div style={iconStyle}>
						<Link href="https://www.instagram.com/panimation.tv/" target="_blank">
							<Icon name="instagram" color="#FCC438"/>
						</Link>
					</div>
				</Hidden>
			</div>
		)
	}
	renderFilters() {
		let {
			locations,
			selectedLocations,
			locationOpen,
			toggleLocationsMenu,
			searchLocations,
			toggleLocations,

			skills,
			selectedSkills,
			skillsOpen,
			toggleSkillsMenu,
			searchSkills,
			toggleSkills,

			softwares,
			selectedSoftwares,
			softwaresOpen,
			toggleSoftwaresMenu,
			searchSoftwares,
			toggleSoftwares
		} = this.props
		return (
			<Box paddingBottom={2} paddingTop={2}>
				<Grid container spacing={this.state.xs?1:4}>
					<Grid item xs={12} md={4}>
						<Select
							onClick={toggleLocationsMenu}
							onChangeSearch={searchLocations}
							onItemClick={toggleLocations}
							options={locations}
							selected={selectedLocations}
							open={locationOpen}
							>
							Location
						</Select>
					</Grid>
					<Grid item xs={12} md={4}>
						<Select
							onClick={toggleSkillsMenu}
							onChangeSearch={searchSkills}
							onItemClick={toggleSkills}
							options={skills}
							selected={selectedSkills}
							open={skillsOpen}
							>
							Skills
						</Select>
					</Grid>
					<Grid item xs={12} md={4}>
						<Select
							onClick={toggleSoftwaresMenu}
							onChangeSearch={searchSoftwares}
							onItemClick={toggleSoftwares}
							options={softwares}
							selected={selectedSoftwares}
							open={softwaresOpen}
							>
							Software
						</Select>
					</Grid>
				</Grid>
			</Box>
		)
	}
	render() {
		let {
			routeTo
		} = this.props
		let logoStyle = {
			width: '100%',
			textAlign: 'center',
			paddingTop: 25,
			paddingBottom: 25
		}
		return (
			<Header style={{background: '#EDEDED'}}>
				<Container maxWidth="md">
					<div style={{position: 'relative'}}>
						{this.renderMenu()}
						{this.renderSocialMedia()}
					</div>
					<div style={logoStyle} onClick={() => routeTo('home')}>
						<Box m={1}>
							<a href="/#">
								<img
									alt="Panimation Logo"
									width="130"
									height="85"
									src={logo} />
							</a>
						</Box>
						<Text>
							A directory of women, trans and non-binary friends working with
							animation and motion graphics.
						</Text>
					</div>
				</Container>
				<Container maxWidth="md">
					{this.props.isAbout ? <div /> : this.renderFilters()}
				</Container>
			</Header>
		)
	}
}

const normalize = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
}
const filterLocations = (state) => {
	let searchTerm = normalize(state.locations.searchTerm)
	return state.locations.locations.filter((location) => {
		return normalize(location.city).indexOf(searchTerm) !== -1
	})
	|| []
}
const sortLocations = (locations) => {
	return locations.sort((a, b) => {
		if( b.country > a.country ) return -1
		if( b.country < a.country ) return 1
		return 0
	})
}
const formatLocations = (locations) => {
	let rememberCountry = null
	return locations.reduce((acc, location) => {
		if (rememberCountry !== location.country) {
			acc.push({
				type: 'button',
				label: countries[location.country]
			})
			rememberCountry = location.country
		}
		acc.push({
			label: location.city,
			id: location._id
		})
		return acc
	}, [])
}
const getLocationOptions = (state) => {
	let location = filterLocations(state)
	location = sortLocations( location )
	location = formatLocations( location )
	return location
}

const sortByName = (a, b) => {
	if( b.name > a.name ) return -1
	if( b.name < a.name ) return 1
	return 0
}

const filterSkills = (state) => {
	let searchTerm = normalize(state.skills.searchTerm)
	return state.skills.skills.filter((skill) => {
		return normalize(skill.name).indexOf(searchTerm) !== -1
	})
	|| []
}
const sortSkills = (skills) => {
	let normalSkills = skills.filter((skill) => !skill.extra)
	let extraSkills = skills.filter((skill) => skill.extra)

	normalSkills = normalSkills.sort(sortByName)
	extraSkills = extraSkills.sort(sortByName)

	return [...normalSkills, ...extraSkills]
}
const formatSkills = (skills) => {
	let rememberExtra = null
	return skills.reduce((acc, skill) => {
		if (skill.extra === true && rememberExtra === null) {
			acc.push({
				type: 'separator',
				label: 'Extra Skills'
			})
			rememberExtra = true
		}
		acc.push({
			label: skill.name,
			id: skill._id
		})
		return acc
	}, [])
}
const getSkillsOptions = (state) => {
	let skills = filterSkills(state)
	skills = sortSkills(skills)
	skills = formatSkills(skills)
	return skills
}

const filterSoftwares = (state) => {
	let searchTerm = normalize(state.softwares.searchTerm)
	return state.softwares.softwares.filter((software) => {
		return normalize(software.name).indexOf(searchTerm) !== -1
	})
	|| []
}
const sortSoftwares = (softwares) => {
	return softwares.sort(sortByName)
}
const formatSoftwares = (softwares) => {
	return softwares.map((software) => {
		return {
			label: software.name,
			id: software._id
		}
	})
}
const getSoftwaresOptions = (state) => {
	let softwares = filterSoftwares(state)
	softwares = sortSoftwares(softwares)
	softwares = formatSoftwares(softwares)
	return softwares
}

const mapStateToProps = (state) => {
	let selectedLocations = state.locations.selected
	let selectedSkills = state.skills.selected
	let selectedSoftwares = state.softwares.selected
	return {
		locations: getLocationOptions(state),
		selectedLocations: selectedLocations,
		locationOpen: state.locations.open,

		skills: getSkillsOptions(state),
		selectedSkills: selectedSkills,
		skillsOpen: state.skills.open,

		softwares: getSoftwaresOptions(state),
		selectedSoftwares: selectedSoftwares,
		softwaresOpen: state.softwares.open,

		isAbout: state.router.route === 'about'
	}
}
const mapDispatchToProps = (dispatch) => ({
	toggleLocationsMenu: () => toggleLocationsMenu(dispatch),
	searchLocations: (searchTerm) => searchLocations(dispatch, searchTerm),
	toggleLocations: (option) => {
		if (!option.type) {
			toggleLocations(dispatch, option.id)
		}
		if (option.type === 'button') {
			console.log('clicked country', option)
		}
	},

	toggleSkillsMenu: () => toggleSkillsMenu(dispatch),
	searchSkills: (searchTerm) => searchSkills(dispatch, searchTerm),
	toggleSkills: (option) => {
		if (!option.type) {
			toggleSkills(dispatch, option.id)
		}
		if (option.type === 'button') {
			console.log('clicked extra', option)
		}
	},

	toggleSoftwaresMenu: () => toggleSoftwaresMenu(dispatch),
	searchSoftwares: (searchTerm) => searchSoftwares(dispatch, searchTerm),
	toggleSoftwares: (option) => toggleSoftwares(dispatch, option.id),

	closeAllMenus: () => closeAllMenus(dispatch),
	showDrawerMenu: () => showDrawerMenu(dispatch),
	routeTo: (route) => routeTo(dispatch, route)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PaniHeader)
