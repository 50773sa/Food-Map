import { createContext, useContext, useState, useEffect} from 'react'
import { auth, db, storage } from '../firebase'
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateEmail,
	updatePassword,
    updateProfile,
    signOut 
} from 'firebase/auth'
import { setDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import LoadingSpinner from '../components/LoadingSpinner'
import Container from 'react-bootstrap/Container'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null) 
    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userPhotoUrl, setUserPhotoUrl] = useState(null)
	const [loading, setLoading] = useState(true)

    const signup =  async (email, password, name, photo) => {
		await createUserWithEmailAndPassword(auth, email, password)

        await setDisplayNameAndPhoto(name, photo)

        await reloadUser()

        await setDoc(doc(db, "admins", auth.currentUser.uid), {
             email,
             name,
             photoURL: auth.currentUser.photoURL
        })
	}

    const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

    const logout = () => {
        return signOut(auth)
    }

    const reloadUser = async () => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setUserEmail(auth.currentUser.email)
        setUserName(auth.currentUser.displayName)
        setUserPhotoUrl(auth.currentUser.photoURL)
		return true
	}

    const setEmail = (email) => {
		return updateEmail(currentUser, email)
	}

    const setPassword = (newPassword) => {
		return updatePassword(currentUser, newPassword)
	}

    const setDisplayNameAndPhoto = async (displayName, photo) => {
		let photoURL = auth.currentUser.photoURL

		if (photo) {
			// create a reference to upload the file to
			const fileRef = ref(storage, `photos/${auth.currentUser.email}/${photo.name}`)

			try {
				// upload photo to fileRef
				const uploadResult = await uploadBytes(fileRef, photo)

				// get download url to uploaded file
				photoURL = await getDownloadURL(uploadResult.ref)

                console.log("Photo uploaded successfully, download url is:", photoURL)

			} catch (e) {
				console.log("Upload failed", e)
				setError("Photo failed to upload!")
			}
		}

        return updateProfile(auth.currentUser, {
			displayName,
			photoURL,
		})
	}

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setUserEmail(user?.email)
            setUserName(user?.displayName)
            setUserPhotoUrl(user?.photoURL)
            setLoading(false)
        })
    }, [])
    
    const contextValues = {
		currentUser,
        signup,
        login,
        logout,
        reloadUser,
        setEmail,
		setPassword,
        setDisplayNameAndPhoto,
		userEmail,
        userName,
        userPhotoUrl
	}

    return (
		<AuthContext.Provider value={contextValues}>
            {loading ? (
                <Container className='vh-100 d-flex justify-content-center align-items-center'>
                    <LoadingSpinner />
                </Container>
            ) : (
                children
            )}
		</AuthContext.Provider>
	)
}

export {
	AuthContextProvider as default,
	useAuthContext,
}


