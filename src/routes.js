import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import Login from './page/login/index.js'
import Container from './container/index.js'

const Routes = () => (
  <BrowserRouter>
    <div>
      <Route path="/" component={Container} />
      <Route path="/login" component={Login} />
    </div>
  </BrowserRouter>
)

export default Routes;
