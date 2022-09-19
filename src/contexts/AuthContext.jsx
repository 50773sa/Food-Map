import { createContext, useContext} from 'react'
import { auth, db, storage } from '../firebase'

const AuthContext = createContext()


const useAuthContext = () => {
	return useContext(AuthContext)
	
}

const AuthContextProvider = ({ children }) => {





}

export {
	AuthContextProvider as default,
	useAuthContext,
}
