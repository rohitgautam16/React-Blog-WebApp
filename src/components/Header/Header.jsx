import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { PiSignInBold } from 'react-icons/pi';
import { RiMenu3Fill } from 'react-icons/ri';
import { FaTimes } from 'react-icons/fa';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Articles',
      slug: '/all-posts',
      active: true,
    },
    {
      name: 'My Posts',
      slug: '/my-posts',
      active: authStatus,
    },
    {
      name: 'Our Story',
      slug: '/',
      active: !authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  const MobileMenu = () => {
    return (
      <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-cream bg-opacity-90 transition">
        <ul className="text-center text-xl p-20">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name} className="mb-4">
                <button
                  onClick={() => {
                    navigate(item.slug);
                    setMenuOpen(false); // Close menu after navigating
                  }}
                  className="w-full px-6 py-2 duration-200 rounded-3xl font-medium hover:text-gray-500 hover:underline hover:underline-offset-4"
                  size="default"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {/* Sign In Button */}
          {!authStatus && (
            <Button
              onClick={() => {
                navigate('/login');
                setMenuOpen(false); 
              }}
              className="w-full"
            >
              Sign In <span className="ml-2 text-lg">{<PiSignInBold />}</span>
            </Button>
          )}
          {/* Logout Button */}
          {authStatus && (
            <li className="mt-4">
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <header className="flex items-center bg-cream border-b border-gray-300 relative">
      <Container>
        <nav className="flex items-center justify-between py-4 px-6">
          {/* Logo Section */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="200px" />
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <button
              className="text-3xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <RiMenu3Fill />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && <MobileMenu />}

          {/* Navigation Links */}
          <ul className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="flex justify-center lg:justify-evenly px-6 py-2 duration-200 rounded-3xl font-medium hover:text-gray-500 hover:underline hover:underline-offset-4"
                    size="default"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {/* Sign In Button */}
            {!authStatus && (
              <Button onClick={() => navigate('/login')} className="lg:ml-4">
                Sign In <span className="ml-2 text-lg">{<PiSignInBold />}</span>
              </Button>
            )}
            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
