import { useState, useEffect, useRef } from 'react';
import { LogOut, Trash2, ChevronDown } from 'lucide-react';
import './profile.css';
import PropTypes from "prop-types"

const ProfileDropdown = ({ user, onLogout, onDeleteAccount }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div
            className='profile-dropdown-container'
            ref={dropdownRef}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='profile-trigger'
            >
                <span className='user-class'>
                    {user.name ? user.name.charAt(0).toUpperCase() : ''}
                </span>
                <div className='user-info'>
                    <span className='user-name'>{user.name}</span>
                    <span className='user-email'>{user.email}</span>
                </div>
                <ChevronDown
                    className={`chevron-icon ${isOpen ? 'rotate' : ''}`}
                    size={16}
                />
            </button>

            {isOpen && (
                <div className='dropdown-menu'>
                    <div className='dropdown-header'>
                        <p className='header-name'>{user.name}</p>
                        <p className='header-email'>{user.email}</p>
                    </div>

                    <button
                        onClick={onLogout}
                        className='dropdown-item'
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>

                    <button
                        onClick={onDeleteAccount}
                        className='dropdown-item delete'
                    >
                        <Trash2 size={16} />
                        <span>Delete Account</span>
                    </button>
                </div>
            )}
        </div>
    );
};
ProfileDropdown.propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    onDeleteAccount: PropTypes.func.isRequired,
};
export default ProfileDropdown;
