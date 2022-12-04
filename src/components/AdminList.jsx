import useGetAdmins from '../hooks/useGetAdmins'
import LoadingSpinner from '../components/LoadingSpinner'
import {  Row, Col, Image } from 'react-bootstrap'
import placeholder from '../assets/Images/placeholder-image.jpg'

const AdminList = () => {
    const { data: admins, isLoading } = useGetAdmins()

    return (
        <div className='list-wrapper my-4'>
            <h5 className='mb-4'>Lista på admins</h5>

            {isLoading && <LoadingSpinner />}

            {!isLoading && admins && (
                <>
                    <Row>
                        <Col md={3}>
                            <p>Namn</p>
                        </Col>
                        <Col md={6}>
                            <p>Email</p>
                        </Col>
                        <Col md={3}>
                            <p className='text-end'>Profil-bild</p>
                        </Col>
                    </Row>
                    {admins.map((admin, i) => (
                        <Row className='admin-item' key={i}>
                            <Col md={3}>
                                <p key={i} className="admin-names m-0">{admin.name}</p>
                            </Col>
                            <Col md={6}>
                                <p key={i} className="admin-emails m-0">{admin.email}</p>
                            </Col>
                            <Col md={3}>
                                <div className="admin-images m-0">
                                    <Image 
                                        className='admin-image'
                                        key={i} 
                                        src={admin.photoURL || placeholder}
                                        height={60}
                                        width={60}
                                    />
                                </div>
                            </Col>
                        </Row>
                    ))}
                </>
            )}

        </div>
    )
}

export default AdminList