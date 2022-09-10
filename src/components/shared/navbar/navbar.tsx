import logo from '../../../assets/img/mo-logo.webp';
import './navbar.css'
import LoginLogout from '../login-logout/login-logout';
import { Link } from 'react-router-dom';
import SiteRoutes from './../../../lib/site-routes';
import SignInHelper from './../../../lib/sign-in-helper';
import LocalStorageHelper from '../../../lib/local-storage-helper';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DependencyContainer from './../../../lib/dependencies';
import TestMoneroOceanClient from './../../../lib/monero-ocean-client/test-monero-ocean-client';

const NavbarComponent = () => {
  const location = useLocation();
  useEffect( () =>
  {
    //So nav-right will re-render upon signout
  },[location.pathname] )

  return (
    
    <div className='pageNavbar'>
      <div>
        <img src={logo} className='moLogo'></img>
        <Link to={SiteRoutes.getBaseRoute()} className='unstyledLink homeLink'>MoneroOcean</Link>
      </div>

        <div className='navbarRight'>
          <div className='navLinks'>
            <Link to={SiteRoutes.getDashboardRoute()} className="unstyledLink navLink">Dashboard</Link>
            <Link to={SiteRoutes.getCoinsRoute()} className="unstyledLink navLink">Coins</Link>
            <Link to={SiteRoutes.getSettingsRoute()} className="unstyledLink navLink">Settings</Link>
          </div>
          <LoginLogout />
        </div>
      
    </div>
  )
}

export default NavbarComponent