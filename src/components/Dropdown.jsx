import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Dropdown = ({ username, defaultTextColor, profileColor, profileRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear the localStorage and reset the session
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('address');

    // Redirect to login page
    navigate('/'); 
  };

  return (
   <li className="nav-item dropdown" ref={dropdownRef}>
      <a
        className={`nav-link dropdown-toggle ps-3 pe-1 text-${profileColor || defaultTextColor}`}
        href="#"
        id="navbarDropdown"
        role="button"
        onClick={toggleDropdown}
      >
        <i className="fas fa-user p-1 text-danger"></i> {/* Red icon */}
        {username || 'Guest'}
      </a>
      <ul className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
        <li>
          <Link className="dropdown-item" to={profileRoute}>My account</Link>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>Log out</button>
        </li>
      </ul>
    </li>
  );
};

export default Dropdown;
