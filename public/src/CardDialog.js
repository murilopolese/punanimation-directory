import React from 'react'
import { connect } from 'react-redux'
import { Dialog } from '@material-ui/core';
import Card from './components/Card'
import { closeCard } from './store'

const CardDialog = ({isDialogOpen, entry, selected, closeCard}) => {
	return (
		<Dialog
			fullWidth={true} maxWidth='xs'
			onClose={closeCard} open={isDialogOpen}>
			<Card entry={entry} />
		</Dialog>
	)
}

const mapStateToProps = (state) => {
	return {
		isDialogOpen: state.entries.cardOpen,
		entry: state.entries.entriesById[state.entries.selected]
	}
}
const mapDispatchToProps = (dispatch) => ({
	closeCard: () => closeCard(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CardDialog)
