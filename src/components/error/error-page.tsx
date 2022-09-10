import React from 'react'
import { Link } from 'react-router-dom'
import SiteRoutes from '../../lib/site-routes'
import "./error-page.css"

const ErrorPage = () => {
  return (
    <div>
      <h2>Page could not be loaded because an error occurred</h2>
      <Link className='boxButton errorReturnLink' to={SiteRoutes.getBaseRoute()}>{"<- Return"}</Link>
    </div>
  )
}

export default ErrorPage