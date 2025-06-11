import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="admin-layout d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1 d-flex flex-column">
        <Topbar />
        <div className="p-4" style={{ flex: '1 0 auto' }}>
          <h2>Welcome to the Admin Dashboard</h2>
          <p>This is the main content area.</p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
