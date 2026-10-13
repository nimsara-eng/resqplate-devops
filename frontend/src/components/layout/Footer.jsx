import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <h2>ResQPlate</h2>

          <p>
            Connecting surplus food with people who need it while helping
            reduce food waste in our communities.
          </p>

          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>

            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/food">Find Food</a>
            </li>

            <li>
              <a href="/about">About Us</a>
            </li>

            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h3>Resources</h3>

          <ul>
            <li>
              <a href="/how-it-works">How It Works</a>
            </li>

            <li>
              <a href="/faq">FAQ</a>
            </li>

            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>

            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3>Contact</h3>

          <div className="contact-item">
            <FaEnvelope />
            <span>support@resqplate.com</span>
          </div>

          <div className="contact-item">
            <FaPhoneAlt />
            <span>+94 77 123 4567</span>
          </div>

          <div className="contact-item">
            <FaMapMarkerAlt />
            <span>Sri Lanka</span>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>
          © {currentYear} ResQPlate. All rights reserved.
        </p>

        <p>
          Reducing food waste, one meal at a time.
        </p>
      </div>
    </footer>
  );
}

export default Footer;