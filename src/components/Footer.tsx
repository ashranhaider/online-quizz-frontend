import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer bg-light text-center py-3 mt-auto">
            <div>
                <a href="#" className="me-3 text-decoration-none text-muted">Privacy</a>
                <a href="#" className="me-3 text-decoration-none text-muted">Terms</a>
                <a href="#" className="text-decoration-none text-muted">Contact</a>
            </div>
        </footer>
    );
};

export default Footer;
