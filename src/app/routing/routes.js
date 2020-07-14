import {Register, Login, ResetPassword, Confirmation} from 'app/auth'
import {Dashboard} from 'app/dashboard'
import {Events} from 'app/events'

export const routes = [
  {title: 'Sign Up', path: "/signup", component: Register},
  {title: 'Sign In', path: "/signin", component: Login},
  {title: 'Reset Password', path: "/reset-password", component: ResetPassword},
  {title: 'Confirmation', path: "/confirm-reset", component: Confirmation},
  {title: 'Dashboard', path: "/dashboard", component: Dashboard, private: true},
  {title: 'Events', path: "/events", component: Events, private: true},
]