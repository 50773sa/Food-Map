import { useState } from 'react'
import { db, storage } from '../../../fed21m/javascript-2/08-memehub/src/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'


const useUploadPhoto = () => {
    const [error, setError] = useState(null)
    const [isError, setIsError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)
    const [isUploading, setIsUploading] = useState(null)

    const uploadPhoto = async (photo) => {
        // reset
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

			const fileExt = photo.name.substring(photo.name.lastIndexOf('.') + 1)
            const storageRef = ref(storage,`photos/${photo}.${fileExt}`)

            const uploadPhoto = uploadBytesResumable(storageRef, photo)
            await uploadPhoto.then()

            const url = await getDownloadURL(storageRef)


            /**
             * Create reference to db-collection --> Create document in db
             */

            const collectionRef = collection(db, 'restaurants')

            await addDoc(collectionRef, {
                name: photo.name,
                type: photo.type,
                path: storageRef.fullPath,
                size: photo.size,
                url: url,
            })

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
    error,
    isError,
    isSuccess,
    isUploading,
    uploadPhoto,
  }
}

export default useUploadPhoto


