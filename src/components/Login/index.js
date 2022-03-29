import React from 'react'
import { Row, Col, Button } from 'antd'
import firebase, { auth, db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import { addDocument, generateKeywords } from '../../firebase/service';

const provider = new firebase.auth.GoogleAuthProvider();

// Chia theo bố cục 24 cột của antd
function Login() {
    const handleLoginGoogle = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider)
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,  //google.com
                keywords: generateKeywords(user.displayName)
            })
        }
    }

    return (
        <div>
            <Row justify='center' style={{ heigh: 800 }}>
                <Col span={8}> 
                    <h3 style={{ textAlign: 'center' }}>Chat Funny</h3>
                    <Button style={{ width: '100%', marginBottom: 5 }} onClick={handleLoginGoogle}>Login With Google</Button>
                    <Button style={{ width: '100%'}}>Login With Facebook</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Login