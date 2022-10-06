import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

const filterList = ['All', 'Lunch', 'After work', 'Á la carte', 'Bar', 'Café', 'Restaurang', 'Snabbmat', 'Kiosk/Grill', 'Food truck']

const RestaurantFilter = ({ currentFilter, changeFilter }) => {
	
	const handleClick = (newFilter) => {
		changeFilter(newFilter)
	}

	return (
		<Container>
			<Row className="project-filter mt-1 mb-4">
				{filterList.map((f, i) => (
					<Button 
						className={currentFilter === f ? 'btn-sm active col-3 col-sm-2 col-md-2 col-lg-2 col-xl-1 m-1' : 'btn-sm col-3 col-sm-2 col-md-2 col-lg-2 col-xl-1 m-1'}
						key={i}
						onClick={() => handleClick(f)}
						variant='dark'
					>
						{f}
					</Button>
				))}
			</Row>
		</Container>
	)
}

export default RestaurantFilter