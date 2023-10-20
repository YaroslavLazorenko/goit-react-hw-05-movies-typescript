import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../consts';
import Styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav>
      <div className={Styles['nav-container']}>
        <NavLink
          to={ROUTES.HOME}
          className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to={`/${ROUTES.MOVIES}`}
          className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}
        >
          Movies
        </NavLink>
      </div>
    </nav>
  );
}
