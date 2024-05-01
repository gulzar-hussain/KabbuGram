import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
// import Message from '../components/Message';

const LoginScreen = ({ setIsLandingPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [message, setMessage] = useState(null);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        setIsLandingPage(false);
        // eslint-disable-next-line
    }, [setIsLandingPage]);

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {/* {message && <Message variant='danger'>{message}</Message>} */}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='mt-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='mt-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Login
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Don't have an account?{' '}
                    <Link to={'/register'} className='hyperlink'>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
