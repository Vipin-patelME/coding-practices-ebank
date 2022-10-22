import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class PageLogin extends Component {
  state = {userInput: '', pinInput: '', isFail: false, message: ''}

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 10})
    history.replace('/')
  }

  submitData = async event => {
    event.preventDefault()
    const {userInput, pinInput} = this.state
    const userDetails = {user_id: userInput, pin: pinInput}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    const jwtToken = data.jwt_token
    console.log(jwtToken)
    const errorMessage = data.error_msg

    if (response.ok === true) {
      this.onLoginSuccess(jwtToken)
      this.setState({isFail: false})
    } else {
      this.setState({message: errorMessage, isFail: true})
    }
    this.setState({userInput: '', pinInput: ''})
  }

  onUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onPinInput = event => {
    this.setState({pinInput: event.target.value})
  }

  renderForm = () => {
    const {isFail, message, userInput, pinInput} = this.state

    return (
      <div className="image-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
          className="login-image"
        />
        <form onSubmit={this.submitData} className="form-style">
          <h1 className="welcome-style">Welcome Back!</h1>
          <div>
            <label htmlFor="userIdInput" className="user-id-label">
              User ID
            </label>
            <br />
            <input
              onChange={this.onUserInput}
              id="userIdInput"
              type="text"
              className="user-id-input"
              placeholder="Enter User ID"
              value={userInput}
            />
          </div>
          <div>
            <label htmlFor="pinInput" className="user-id-label">
              PIN
            </label>
            <br />
            <input
              onChange={this.onPinInput}
              id="pinInput"
              type="password"
              className="user-pin-input"
              placeholder="Enter PIN"
              value={pinInput}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {isFail && <p className="error-para">{`* ${message}`}</p>}
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <div className="main-cont">{this.renderForm()}</div>
  }
}

export default PageLogin
