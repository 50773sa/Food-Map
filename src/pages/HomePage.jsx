import Container from 'react-bootstrap/Container'
import MemeGrid from '../components/memeGrid'
import UploadMeme from '../components/UploadMeme'
import useGetMemes from '../hooks/useGetMemes'

const HomePage = () => {
	const memeQuery = useGetMemes()
	console.log('meme query', memeQuery)

	return (
		<Container className="py-3">
			<h1 className="display-1">😂</h1>

			<p className="display-2">Show me dem memes!</p>

			<MemeGrid query={memeQuery} />
		</Container>
	)
}

export default HomePage
