/* import {withRouter} from 'react-router-dom' */

import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onRemoveCookie = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="home-main-cont">
      <div className="logo-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button onClick={onRemoveCookie} className="logout-btn" type="button">
          Logout
        </button>
      </div>
      <div className="digital-card-cont">
        <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card-image"
        />
      </div>
    </div>
  )
}
export default Home
