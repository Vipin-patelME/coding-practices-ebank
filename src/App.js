import {Route, Switch} from 'react-router-dom'
import './App.css'

import PageLogin from './components/PageLogin'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import PageNotFound from './components/PageNotFound'

// Replace your code here

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={PageLogin} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route component={PageNotFound} />
  </Switch>
)

export default App
