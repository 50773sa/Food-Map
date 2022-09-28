import { useState } from "react"
import useUploadPhoto from "../hooks/useUploadPhoto"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'

const UploadPhoto = () => {
	const [photo, setPhoto] = useState(null)
	const uploadPhoto = useUploadPhoto()


	const handleSelectedPhoto = (e) => {
		if (e.target.files[0]) {
			setPhoto(e.target.files[0])
		}
		console.log('File: ', e.target.files[0])
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		await uploadPhoto.mutate(photo)
	}

	const handleReset = () => {
		setPhoto(null)
	}


	return (
		<Form onSubmit={handleSubmit} onReset={handleReset}>
			<Form.Group controlId="formFile" className="mb-3">
				<Form.Label>Välj bild</Form.Label>
				<Form.Control type="file" onChange={handleSelectedPhoto} />

				<Form.Text>
					{photo ? photo.name : 'No photo selected'}
				</Form.Text>
			</Form.Group>

			<Button className="me-3" variant="success" type="submit" disabled={uploadPhoto.isMutating}>Ladda upp</Button>
			<Button type="reset" variant="warning">Återställ</Button>

		</Form>
	)
}

export default UploadPhoto