import { FiUser, FiShield } from 'react-icons/fi';
import { useRole } from '../context/RoleContext';
import './RoleSwitcher.css';

const RoleSwitcher = () => {
  const { role, toggleRole } = useRole();

  return (
    <div className="role-switcher">
      <div className="role-display">
        <div className="role-icon">
          {role === 'admin' ? <FiShield /> : <FiUser />}
        </div>
        <div className="role-info">
          <span className="role-label">Current Role</span>
          <span className="role-value">{role === 'admin' ? 'Administrator' : 'User'}</span>
        </div>
      </div>
      <button className="toggle-btn" onClick={toggleRole}>
        Switch to {role === 'admin' ? 'User' : 'Admin'}
      </button>
    </div>
  );
};

export default RoleSwitcher;
