import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import Navigation from './pages/partials/Navigation'



import './assets/scss/App.scss'

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/map" element={<MapPage />} />

			</Routes>

			<ToastContainer autoClose={3000} />
			<ReactQueryDevtools position='bottom-left' />
		</div>
	)
}

export default App