import { useEffect } from "react"
import { useState } from "react"
import { Button } from "react-bootstrap"


const Direction = ({ restaurant }) => {
    const [position, setPosition] = useState(null)
	const [url, setUrl] = useState(null)

    const handleGeoLocation = () => {
        if (!navigator.geolocation) {
			console.log('Geolocation is not supported by your browser')
		}

		if (navigator.geolocation) {
			try {
				 navigator.geolocation.getCurrentPosition((pos) => {
					const positionCoords = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					}
					setPosition(positionCoords)
					setUrl(`https://www.google.com/maps/dir/${position?.lat},${position?.lng}/${restaurant?.position?.latitude},${restaurant?.position?.longitude}`)
					console.log('url from dir', url)
				})

			} catch {
				toast.warning('Sorry, browser doesn\'t support geolocation, please try searching for a specific city')
			}
		}
    }
	useEffect(() => {

	}, [url, position])


    return (
		<>
			{!position && (
				<Button onClick={handleGeoLocation} >
					Get direction
				</Button>
			)}

			{position && (
				<Button href={url} target="_blank"></Button>

			)}
		</>
		
    
    )
}

export default Direction