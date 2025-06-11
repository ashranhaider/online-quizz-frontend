import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { Container, Card } from 'react-bootstrap';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="admin-layout d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1 d-flex flex-column">
        <Topbar />
        <main className="page-content flex-grow-1 py-4">
          <Container fluid>
            <Card className="p-4 shadow-sm">
              <h2 className="mb-3">Welcome to the Admin Dashboard</h2>
              <p>This is your central hub to manage users, view stats, and configure settings.</p>
            </Card>
          </Container>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
