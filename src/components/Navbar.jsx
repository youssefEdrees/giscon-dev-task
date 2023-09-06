import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const currentPage = location.pathname; // Get the current page path

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    padding: '10px 20px', // Adjust padding for better visibility
    transition: 'background-color 0.3s', // Add a transition for smooth color change
  };

  const activeLinkStyle = {
    backgroundColor: '#3182ce', // Change the background color for the active link
    color: 'white',
    padding: '10px 20px',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <ul className="flex justify-center items-center">
          <li className="mr-6">
            <Link
              to="/member/page1"
              style={currentPage === '/member/page1' ? activeLinkStyle : linkStyle}
            >
              Page 1
            </Link>
          </li>
          <li>
            <Link
              to="/member/page2"
              style={currentPage === '/member/page2' ? activeLinkStyle : linkStyle}
            >
              Page 2
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
