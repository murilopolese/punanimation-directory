import React from 'react'
import { connect } from 'react-redux'
import { SwipeableDrawer, List, ListItem, Link } from '@material-ui/core';
import Text from './components/Text'
import Icon from './components/Icon'
import { showDrawerMenu, hideDrawerMenu, routeTo } from './store'

const DrawerMenu = ({open, showDrawerMenu, hideDrawerMenu, routeTo}) => {
	let iconStyle = {
		width: 25,
		marginRight: 20,
		cursor: 'pointer'
	}
	return (
		<SwipeableDrawer
			anchor="left"
			open={open}
			onClose={hideDrawerMenu}
			onOpen={showDrawerMenu}>
				<List style={{width: 256}}>
					<ListItem button onClick={() => routeTo('home')}>
						<Text uppercase weight="semi-bold">
							Home
						</Text>
					</ListItem>
					<ListItem button onClick={() => routeTo('about')}>
						<Text uppercase weight="semi-bold">
							About
						</Text>
					</ListItem>
					<ListItem button component="a"
						href="https://panimation.typeform.com/to/ZJL9Gx"
						target="_blank"
						>
						<Text uppercase weight="semi-bold">
							Join
						</Text>
					</ListItem>
					<ListItem button component="div">
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
					</ListItem>
				</List>
		</SwipeableDrawer>
	)
}

const mapStateToProps = (state) => ({
	open: state.drawerMenu.open || false
})

const mapDispatchToProps = (dispatch) => ({
	showDrawerMenu: () => showDrawerMenu(dispatch),
	hideDrawerMenu: () => hideDrawerMenu(dispatch),
	routeTo: (route) => routeTo(dispatch, route)
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu)
