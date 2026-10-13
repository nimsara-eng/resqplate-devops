import {
  FaHome,
  FaClipboardList,
  FaPlusCircle,
  FaCalendarCheck,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>

      <nav className="sidebar-menu" aria-label="Dashboard navigation">

        <a href="/dashboard" className="sidebar-link">
          <FaHome />
          <span>Overview</span>
        </a>

        <a href="/dashboard/listings" className="sidebar-link">
          <FaClipboardList />
          <span>My Listings</span>
        </a>

        <a href="/dashboard/create" className="sidebar-link">
          <FaPlusCircle />
          <span>Create Listing</span>
        </a>

        <a href="/dashboard/reservations" className="sidebar-link">
          <FaCalendarCheck />
          <span>Reservations</span>
        </a>

        <a href="/dashboard/profile" className="sidebar-link">
          <FaUser />
          <span>Profile</span>
        </a>

        <a href="/dashboard/settings" className="sidebar-link">
          <FaCog />
          <span>Settings</span>
        </a>

      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-logout"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;