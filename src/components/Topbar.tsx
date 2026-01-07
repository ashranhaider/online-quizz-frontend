import './Topbar.css';
// import NotificationDropdown from './NotificationDropdown';
import UserMenu from './UserMenu';

const Topbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            <a id="sidebarToggle" className="sidebar-toggle js-sidebar-toggle">
                <i className="hamburger align-self-center" />
            </a>
            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    {/* <NotificationDropdown /> */}
                    <UserMenu />
                </ul>
            </div>
        </nav>
    );
};

export default Topbar;
