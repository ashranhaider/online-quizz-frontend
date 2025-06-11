import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import './Topbar.css';

const Topbar: React.FC = () => {
    return (
        <Navbar bg="light" className="topbar shadow-sm px-3 justify-content-between">
            <Navbar.Brand className="fw-bold">Dashboard</Navbar.Brand>
            <Nav>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="light" id="user-dropdown">
                        <i className="bi bi-person-circle fs-5"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Navbar>
    );
};

export default Topbar;
