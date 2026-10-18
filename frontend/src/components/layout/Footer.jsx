export default function Footer({ onOfferFood, onOpenAuth }) {
  return (
    <footer className="resq-footer" role="contentinfo">
      <div className="resq-container">
        <div className="resq-footer-grid">
          <div className="resq-footer-brand">
            <span className="resq-footer-logo">ResQPlate</span>
            <p className="resq-footer-mission">
              Connecting local restaurants, bakeries, and event organizers who have safe surplus food with registered community organizations and neighbors for direct pickup.
            </p>
          </div>

          <div className="resq-footer-col">
            <h4 className="resq-footer-heading">Platform</h4>
            <ul className="resq-footer-links">
              <li><a href="#find-food" className="resq-footer-link">Browse Surplus Food</a></li>
              <li><a href="#how-it-works" className="resq-footer-link">How Pickup Works</a></li>
              <li><a href="#safety-standards" className="resq-footer-link">Safety Principles</a></li>
              <li><a href="#community-impact" className="resq-footer-link">Pilot Impact Data</a></li>
            </ul>
          </div>

          <div className="resq-footer-col">
            <h4 className="resq-footer-heading">For Providers</h4>
            <ul className="resq-footer-links">
              <li><span className="resq-footer-link" onClick={onOfferFood}>List Food Item</span></li>
              <li><span className="resq-footer-link" onClick={onOpenAuth}>Kitchen Registration</span></li>
              <li><span className="resq-footer-link" onClick={onOpenAuth}>Good Samaritan Legal Guide</span></li>
              <li><span className="resq-footer-link" onClick={onOpenAuth}>Container Protocols</span></li>
            </ul>
          </div>

          <div className="resq-footer-col">
            <h4 className="resq-footer-heading">Project Info</h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.6)' }}>
              Academic capstone project prototype. Built with plain React & Vite for clarity and extensibility.
            </p>
            <div style={{ marginTop: '10px' }}>
              <button
                type="button"
                className="resq-btn-ghost"
                style={{ color: '#F6C88B', padding: '0', fontSize: '0.8125rem' }}
                onClick={onOpenAuth}
              >
                View System Architecture Status →
              </button>
            </div>
          </div>
        </div>

        <div className="resq-footer-bottom">
          <span>© {new Date().getFullYear()} ResQPlate Initiative. Community food rescue demonstration.</span>
          <span>Not a food delivery service · Direct pickup and donation model</span>
        </div>
      </div>
    </footer>
  );
}
