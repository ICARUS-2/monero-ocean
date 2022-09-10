import { useState, useEffect } from 'react'
import './login-page.css'
import { Link, useNavigate } from "react-router-dom";
import MoneroAddressChecker from '../../lib/monero-address-checker';
import LocalStorageHelper from './../../lib/local-storage-helper';
import SignInHelper from './../../lib/sign-in-helper';
import SiteRoutes from './../../lib/site-routes';

const LoginPage = () => {

  const [addressInput, setAddressInput] = useState(""); 
  const [formMessage, setFormMessage] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect( () =>
  {
    if (SignInHelper.isSignedIn().isSignedIn)
    {
      navigate(SiteRoutes.getDashboardRoute())
    }
  },[])

  function onInputChanged(event: any)
  {
    setAddressInput(event.target.value)
  }

  function handleFormSubmit(event: any)
  {
    let isValid = MoneroAddressChecker.validateMoneroAddress(addressInput);
    setError(!isValid)

    if (isValid)
    {
      setFormMessage("Address verified, loading dashboard...")

      LocalStorageHelper.setMoneroAddress(addressInput);
      navigate(SiteRoutes.getDashboardRoute())
    }
    else
    {
      setFormMessage("That's not a valid Monero address!")
    }

    event.preventDefault();
  }
  
  return (
    <div className='loginFormContainer'>

      <div className='separatorDiv'></div>

      <form className='loginForm' onSubmit={handleFormSubmit}>
        <h2>Sign in to access the pool</h2>
        <input type="text" className="boxComponent walletInput" onChange={onInputChanged}></input>
        <button className='boxComponent signInButton'>Sign in</button>
      </form>

      <h4 className={`m-2 ${error ? "redText" : "limeText"}`}>{formMessage}</h4>

      <p className="needAWallet">Don't have a wallet? Download one <a className="moneroDownloadLink unstyledLink" href="https://www.getmonero.org/downloads/" target="blank">here</a></p>

      <Link className='unstyledLink' to={SiteRoutes.getDashboardRoute()}>Continue without signing in</Link>
    </div>
  )
}

export default LoginPage