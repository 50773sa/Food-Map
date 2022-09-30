import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'


const useUploadPhoto = () => {
    const [URL, setURL] = useState(null)
    const [error, setError] = useState(null)
    const [isError, setIsError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)
    const [isUploading, setIsUploading] = useState(null)

    const upload = async (photo) => {
        // reset
        setURL(null)
        setError(null)
		setIsError(null)
		setIsSuccess(null)
		setIsUploading(null)

        if(!photo) {
            return
        }

        try {

            /**
            * Get storage reference --> upload photo --> get url
            */

			// const fileExt = photo.name.substring(photo.name.lastIndexOf('.') + 1)
            const storageRef = ref(storage,`photos/${photo.name}`)

            const uploadPhoto = uploadBytesResumable(storageRef, photo)
            await uploadPhoto.then()

            const url = await getDownloadURL(storageRef)
            setURL(url)
            // console.log('url', URL)


            /**
             * Create reference to db-collection --> Create document in db
             */

            // const collectionRef = collection(db, 'restaurants')

            // await addDoc(collectionRef, {
            //     name: photo.name,
            //     type: photo.type,
            //     path: storageRef.fullPath,
            //     size: photo.size,
            //     url: url,
            // })

            setIsSuccess(true)
        } catch (e) {
            setError(e)
            setIsError(true)

            console.log("An error occurred", e)

        } finally {
            setIsUploading(false)
        }
    }

  return {
    URL,
    error,
    isError,
    isSuccess,
    isUploading,
    upload,
  }
}

export default useUploadPhoto


