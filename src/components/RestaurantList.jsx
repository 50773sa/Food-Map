import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RestaurantListItem from './RestaurantListItem'

const RestaurantList = ({ data }) => {
    const [sortedData, setSortedData] = useState(data); 
    const [order, setOrder] = useState("ASC"); 
    
 const sorting = (value) => {
    if (order === "ASC") {
        const sorted = [...data].sort((a,b) =>
            a[value] > b[value] ? 1 : -1
        )
        setSortedData(sorted)
        setOrder('DSC')
    }
    if (order === "DSC") {
        const sorted = [...data].sort((a,b) =>
            a[value] < b[value] ? 1 : -1
        )
        setSortedData(sorted)
        setOrder('ASC')
    }
}

	return (
        <>
            <span>Sortera på namn</span><span className="sorterings-knapp" onClick={()=>sorting("name")}> {order === "ASC" ? "↓" : "↑"}</span> 
            <Row className="restaurant-wrapper">
                {sortedData.map((res, i) => (
                    <Col md={4} className="my-3" key={i}>
                        <RestaurantListItem restaurant={res} />
                    </Col>
                ))}
            </Row>
        </>
	)
}

export default RestaurantList
