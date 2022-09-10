import {useState} from 'react'
import './login-logout.css';
import SignInHelper from '../../../lib/sign-in-helper';
import LocalStorageHelper from '../../../lib/local-storage-helper';
import { useNavigate } from 'react-router-dom';
import SiteRoutes from '../../../lib/site-routes';

const LoginLogout = () => {

  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  function getSignInText()
  {
    if (SignInHelper.isSignedIn().isSignedIn)
    {
      return LocalStorageHelper.getMoneroAddress()?.substring(0, 15)+"..."
    }
    else
    {
      return "Not signed in"
    }
  }

  function handleMainBtnClicked()
  {
    if (!SignInHelper.isSignedIn().isSignedIn)
    {
      return;
    }

    setShowLogout(!showLogout)
  }

  function handleLogoutBtnClicked()
  {
    LocalStorageHelper.removeMoneroAddress();
    setShowLogout(false)

    navigate(SiteRoutes.getBaseRoute())
  }

  return (
    <div className='loginControls'>
        <button className='loginControlBtn mainBtn' onClick={handleMainBtnClicked}>
            {getSignInText()}
        </button>

        {showLogout && <button className='loginControlBtn logoutBtn' onClick={handleLogoutBtnClicked}>
          {"Log Out"}
        </button>}
    </div>
  )
}

export default LoginLogout