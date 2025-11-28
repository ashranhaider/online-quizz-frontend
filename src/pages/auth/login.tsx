import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './login.css';

function Login() {
    return (
        <div className="login-page d-flex align-items-center justify-content-center">
            <Row className="w-100 g-0">
                <Col md={5} className="sidenav d-flex flex-column justify-content-center align-items-center text-white p-4 text-center">
                    <div className="login-main-text">
                        <h1 className="display-5 fw-bold">Welcome Back</h1>
                        <p className="lead mt-3">Access your dashboard by logging in or registering below.</p>
                    </div>
                </Col>

                <Col md={7} className="d-flex align-items-center justify-content-center">
                    <Card className="p-4 shadow w-75">
                        <Card.Body>
                            <h4 className="mb-4 text-center">
                                <i className="bi bi-door-open me-2"></i>Login
                            </h4>

                            <div className="auth-container">
                                <div className="auth-form">
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formUsername">
                                            <Form.Label>User Name</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <i className="bi bi-person" />
                                                </InputGroup.Text>
                                                <Form.Control type="text" placeholder="Enter username" />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formPassword">
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <i className="bi bi-lock" />
                                                </InputGroup.Text>
                                                <Form.Control type="password" placeholder="Enter password" />
                                            </InputGroup>
                                        </Form.Group>

                                        <div className="auth-actions">
                                            <Button variant="light" type="submit" className="auth-btn action-btn btn-login">
                                                <i className="bi bi-box-arrow-in-right me-2"></i>Login
                                            </Button>

                                            <Button variant="outline-secondary" type="button" className="auth-btn action-btn btn-register">
                                                <i className="bi bi-person-plus me-2"></i>Register
                                            </Button>
                                        </div>
                                    </Form>
                                </div>

                                <div className="auth-social">
                                    <h5>Or sign in with</h5>
                                    <Button className="btn-social btn-google auth-btn" type="button">
                                        <i className="bi bi-google me-2" />Continue with Google
                                    </Button>
                                    <Button className="btn-social btn-facebook auth-btn" type="button">
                                        <i className="bi bi-facebook me-2" />Continue with Facebook
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
