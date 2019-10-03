import React from 'react'
import { Container, Grid, Link, Box } from '@material-ui/core';
import Text from './components/Text'
import Icon from './components/Icon'

export default (props) => {
	return (
		<Box marginTop={4}>
			<Container maxWidth="md">
				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<Text size="big-title" alignment="center" uppercase>Who</Text>
						<Text>
							<p>
								Panimation (previously known as Punanimation) was founded in February 2015, by 3 friends: <Link href="https://beegrandinetti.com/" target="_blank">Bee Grandinetti</Link>, <Link href="https://vimeo.com/hedvigahlberg" target="_blank">Hedvig Ahlberg</Link>, and <Link href="http://www.linnfritz.com/" target="_blank">Linn Fritz</Link>.
							</p>
							<p>
								Although we were originally just 3, today our whole community is built by over 4000 women, trans and non-binary friends from all over the world, working within the many different fields and specializations of animation and motion graphics.
							</p>
						</Text>
					</Grid>
					<Grid item xs={12} md={4}>
						<Text size="big-title" alignment="center" uppercase>Why</Text>
						<Text>
							<p>
								We were a bit tired of this industry being too much of a boy’s club, so we decided to do something about it.
							</p>
							<p>
								Panimation started as a Facebook group, aiming to bring the ladies, trans and non-binary friends together. The community started to expand and our dear members helped shaping it into a lively, inspiring and awesome platform to exchange knowledge and support.
							</p>
							<p>
								Since then, we've been receiving so many words of encouragement from our members that it just confirms this was not only the right thing to do, but very much needed.
							</p>
							<p>
								This pushed us to work on the next, bigger step: putting together a directory that makes it easy for anyone to get a hold of that talent.
							</p>
							<p>
								No more excuses for male-only studios, speaker line-ups and director rosters. Diversity exists, it's got skills and it's here.
							</p>
						</Text>
					</Grid>
					<Grid item xs={12} md={4}>
						<div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
							<div style={{width: 38, marginTop: 10}}><Icon name="mail" /></div>
						</div>
						<Text>
							<p>
								If you have any general questions or just wanna reach out, send a line to:
							</p>
						</Text>
						<Text size="medium" weight="semi-bold">
							<Link
								href="mailto:hey@panimation.tv"
								letterSpacing="narrow">
								hey@panimation.tv
							</Link>
						</Text>
						<Text>
							<p>
								If you have questions regarding our directory, please write us at:
							</p>
						</Text>
						<Text size="medium" weight="semi-bold">
							<Link
								href="mailto:directory@panimation.tv"
								letterSpacing="narrow">
								directory@panimation.tv
							</Link>
						</Text>
						<Text>
							<p>
								For Instagram related things, ask us at:
							</p>
						</Text>
						<Text size="medium" weight="semi-bold">
							<Link
								href="mailto:instagram@panimation.tv"
								letterSpacing="narrow">
								instagram@panimation.tv
							</Link>
						</Text>
						<Text>
							<p>
								Please note that we are a non-profit multiplatform community and we do not operate as an agency, collective or studio of sorts.
							</p>
						</Text>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}
