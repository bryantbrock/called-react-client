import {Register, Login} from 'app/auth'
import {Dashboard} from 'app/dashboard'
import {Events} from 'app/events'

export const routes = [
  {path: "/sign-up", component: Register},
  {path: "/login", component: Login},
  {path: "/dashboard", component: Dashboard, private: true},
  {path: "/events", component: Events, private: true},
]