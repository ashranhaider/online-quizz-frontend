import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar d-flex flex-column p-3 text-white">
            <h4 className="mb-4">Admin Panel</h4>
            <Nav className="flex-column">
                <Nav.Link as={NavLink} to="/" end>
                    <i className="bi bi-house me-2" /> Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/users">
                    <i className="bi bi-people me-2" /> Users
                </Nav.Link>
                <Nav.Link as={NavLink} to="/settings">
                    <i className="bi bi-gear me-2" /> Settings
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
