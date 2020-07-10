import {Register, Login} from 'app/auth'
import {Dashboard} from 'app/dashboard'

export const routes = [
  {title: 'Sign Up', path: "/signup", component: Register},
  {title: 'Sign In', path: "/signin", component: Login},
  {title: 'Dashboard', path: "/dashboard", component: Dashboard, private: true},
]