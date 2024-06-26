import React, { useEffect, useState } from 'react';
import Icon from '../../assets/Icon.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className={`py-4 lg:px-14 px-4 ${isSticky ? 'sticky top-0 left-0 right-0 border bg-white duration-300' : ''}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    <a href="/" className='text-2xl font-semibold flex items-center space-x-3'>
                        <img src={Icon} alt='Logo' className='w-10 inline-block items-center' />
                        <span className='text-[#263238]'>OptiSEO</span>
                    </a>

                    {/* btn for large devices */}
                    <div className='space-x-12 hidden lg:flex items-center'>
                        <button className='bg-brandPrimary text-white px-4 py-2 transition-all duration-300 rounded hover:bg-neutralDGrey' onClick={handleLogout}>Logout</button>
                    </div>
                    {/* menu btn for only mobile devices */}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-neutralDGrey focus:outline-none focus:text-gray-500'>
                            {isMenuOpen ? (<FaTimes className='h-6 w-6' />) : (<FaBars className='h-6 w-6' />)}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className='mt-4 md:hidden flex flex-col items-center space-y-4'>
                        <button className='bg-brandPrimary text-white px-4 py-2 transition-all duration-300 rounded hover:bg-neutralDGrey' onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navbar;
