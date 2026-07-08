import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <h2>ShopSphere</h2>
                    <p>
                        A modern ecommerce experience with fast delivery, secure payments, and curated best-sellers.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Company</h3>
                    <p>ShopSphere is built for smart shoppers who want quality and convenience on every order.</p>
                    <ul>
                        <li>Premium products</li>
                        <li>Secure checkout</li>
                        <li>24/7 support</li>
                    </ul>
                </div>

                <div className="footer-section footer-links">
                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/">Search</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/orders">Orders</Link>
                </div>

                <div className="footer-section footer-contact">
                    <h3>Contact</h3>
                    <p>support@shopsphere.com</p>
                    <p>+1 (555) 123-4567</p>
                    <p>123 Market Street, Suite 400</p>
                </div>
            </div>

            <div className="footer-social">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
            </div>
        </footer>
    );
}
