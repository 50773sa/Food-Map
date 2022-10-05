import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const filterList = ['All', 'Lunch', 'After work', 'Á la carte', 'Bar', 'Café', 'Restaurang', 'Snabbmat', 'Kiosk/Grill', 'Food truck']

const RestaurantFilter = ({ currentFilter, changeFilter }) => {
	
	const handleClick = (newFilter) => {
		changeFilter(newFilter)
	}

	return (
		<Container>
			<nav className="project-filter">
				<p>Filter by:</p>
				{filterList.map((f, i) => (
					<Button 
						key={i}
						onClick={() => handleClick(f)}
						className={currentFilter === f ? 'active' : ''}
						variant='success'
					>
						{f}
					</Button>
				))}
			</nav>
		</Container>
	)
}

export default RestaurantFilter