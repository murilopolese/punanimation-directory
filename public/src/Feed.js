import React from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Box, CircularProgress } from '@material-ui/core';
import Thumbnail from './components/Thumbnail'
import { openCard, nextPage } from './store'

class Feed extends React.Component {
	constructor(props) {
		super(props)
		this.state = { interval: 0 }
	}
	listenToScroll(e) {
		if (
			!this.isDoneLoading() &&
			window.pageYOffset + 100 > document.body.clientHeight - window.screen.height
		) {
			this.props.nextPage()
		}
	}
	componentDidMount() {
		window.addEventListener('scroll', this.listenToScroll.bind(this))
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.listenToScroll.bind(this))
	}
	isDoneLoading() {
		return this.props.entries.length < this.props.displaySize
	}
	renderFeed() {
		let { entries, displaySize, openCard } = this.props
		return entries.slice(0, displaySize).map((entry, i) => {
			return (
				<Grid key={i} item xs={12} sm={6} md={4}>
					<Thumbnail onClick={() => openCard(entry._id)} key={i} entry={entry} />
				</Grid>
			)
		})
	}
	renderLoading() {
		return (
			<Container maxWidth="sm">
				<Grid
					container
					justify="center"
					alignItems="center"
					style={{height: 'calc(100vh - 300px'}}
					>
					<Grid item>
						{
							!this.isDoneLoading() || this.props.loading
							? <CircularProgress style={{color: '#FCC438'}} />
							: false
						}
					</Grid>
				</Grid>
			</Container>)
	}
	render() {
		return (
			<Box marginTop={2}>
			<Container maxWidth="md">
				<Grid container spacing={4}>
				{this.renderFeed()}
				{this.renderLoading()}
				</Grid>
			</Container>
			</Box>
		)
	}
}

const filterEntries = (state) => {
	let locations = state.locations.selected
	let skills = state.skills.selected
	let softwares = state.softwares.selected

	let entries = state.entries.entries

	// Filter locations: Show if entry city is in the array of selected cities
	if (locations && locations.length > 0) {
		entries = entries.filter((entry) => {
			return locations.indexOf(entry.location._id) !== -1
		})
	}
	// Filter skills: Show if entry has all the skills in the selected skills
	if (skills && skills.length > 0) {
		entries = entries.filter((entry) => {
			let entrySkillsIds = entry.skills.map((skill) => skill._id)
			let hasAllSkills = skills.filter((selectedSkill) => {
				return entrySkillsIds.indexOf(selectedSkill) !== -1
			})
			return hasAllSkills.length === skills.length
		})
	}
	// Filter softwares: Show if entry has all the software in the selected software
	if (softwares && softwares.length > 0) {
		entries = entries.filter((entry) => {
			let hasAllSoftwares = softwares.filter((selectedSoftware) => {
				let entrySoftwaresIds = entry.softwares.map((software) => software._id)
				return entrySoftwaresIds.indexOf(selectedSoftware) !== -1
			})
			return hasAllSoftwares.length === softwares.length
		})
	}

	const placeholderImage = 'https://i.imgur.com/Hc0Ok0V.jpg'
	// Put entries with cover image first
	entries = [
		...entries.filter((entry) => entry.coverImage && entry.coverImage !== placeholderImage),
		...entries.filter((entry) => !entry.coverImage || entry.coverImage === placeholderImage)
	]

	return entries
}

const mapStateToProps = (state) => {
	let entries = state.entries
	return {
		entries: filterEntries(state) || [],
		loading: entries.loading || false,
		displaySize: entries.pageSize * entries.currentPage || 12
	}
}

const mapDispatchToProps = (dispatch) => ({
	openCard: (id) => openCard(dispatch, id),
	nextPage: () => nextPage(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
