import { useState } from 'react'
import { storage } from '../firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'


const useUploadPhoto = () => {
    const [URL, setURL] = useState(null)
    const [error, setError] = useState(null)
    const [isError, setIsError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)
    const [isUploading, setIsUploading] = useState(null)
    const [progress, setProgress] = useState(0)


    const upload = async (photo) => {
        // reset current state
        setURL(null)
        setError(null)
		setIsError(false)
		setIsSuccess(false)
		setIsUploading(true)
        setProgress(null)

        if(!photo) {
            return
        }

        /**
        * Get storage reference --> upload photo --> get url from photo
        */

        const fileExt = photo.name.substring(photo.name.lastIndexOf('.') + 1)
        const storageRef = ref(storage,`photos/${fileExt}`)

        const uploadPhoto = uploadBytesResumable(storageRef, photo)

        uploadPhoto.on('state_changed', (uploadPhotoSnapshot) => {
            setProgress(Math.round(uploadPhotoSnapshot.bytesTransferred / uploadPhotoSnapshot.totalBytes) * 100)

        }, (e) => {
            console.log("An error occurred", e)

            setError(e)
            setIsError(true)
            setIsUploading(false)

        }, async () => {
            const url = await getDownloadURL(storageRef)
            setURL(url)
        })
        
        setIsSuccess(true)
        setIsUploading(false)
        setProgress(null)
    }

    return {
        URL,
        setURL,
        error,
        isError,
        isSuccess,
        isUploading,
        progress,
        upload,
    }
}

export default useUploadPhoto


