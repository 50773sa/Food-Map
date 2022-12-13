import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RestaurantListItem from './RestaurantListItem'
import { useEffect } from 'react'

const RestaurantList = ({ approvedRestaurants }) => {
    const [sortedData, setSortedData] = useState(approvedRestaurants); 
    const [order, setOrder] = useState("ASC");
    const [cities, setCities] = useState([])
    console.log('approvedRestaurants', approvedRestaurants)
    
    const sorting = (value) => {
        if (order === "ASC") {
            const sorted = [...approvedRestaurants].sort((a,b) =>
                a[value].toLowerCase() > b[value].toLowerCase() ? 1 : -1
            )
            setSortedData(sorted)
            setOrder('DSC')
        }
        if (order === "DSC") {
            const sorted = [...approvedRestaurants].sort((a,b) =>
                a[value].toLowerCase() < b[value].toLowerCase() ? 1 : -1
            )
            setSortedData(sorted)
            setOrder('ASC')
        }
    }

    useEffect(() => {
        const getCities = () => {
            let citiesWithRestaurants = []
            approvedRestaurants.map(res => {
                let cityCheck = citiesWithRestaurants.includes(res.address.city)
                if (cityCheck == false) {
                    return citiesWithRestaurants.push(res.address.city)
                }
            })
            setCities(citiesWithRestaurants)
        }
        getCities()
    }, [approvedRestaurants])


	return (
        <>
            <Row className="restaurant-wrapper">
                <span className="sorterings-knapp" onClick={()=>sorting("name")}> Sortera på namn {order === "ASC" ? "↓" : "↑"}</span> 
                    {sortedData.map((res, i) => (
                    <Col lg={6} className="my-3" key={i}>
                        <RestaurantListItem restaurant={res} />
                    </Col>
                ))}
            </Row>
        </>
	)
}

export default RestaurantList
