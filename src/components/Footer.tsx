import './Footer.css';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row text-muted">
                    <div className="col-12">
                        <p className="mb-0">© {year} All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
