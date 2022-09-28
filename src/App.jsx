import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import RequireAuth from './components/RequireAuth'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import AdminPage from './pages/AdminPage'
import Navigation from './pages/partials/Navigation'
import RestaurantsPage from './pages/RestaurantsPage'
import RestaurantPage from './pages/RestaurantPage'
import AddRestaurantPage from './pages/AddRestaurantPage'
import './assets/scss/App.scss'

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/map" element={<MapPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
				<Route path="/restaurants" element={<RestaurantsPage />} />
				<Route path="/add-restaurant" element={<AddRestaurantPage />} />
                <Route path="/admin" element={
					<RequireAuth>
						<AdminPage />
					</RequireAuth>
				} />
                <Route path="/restaurants/:id" element={
					<RequireAuth>
						<RestaurantPage />
					</RequireAuth>
				} />
				

			</Routes>

			<ToastContainer autoClose={3000} />
			<ReactQueryDevtools position='bottom-left' />
		</div>
	)
}

export default App