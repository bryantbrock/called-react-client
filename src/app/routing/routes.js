import {Register, Login, ResetPassword, Confirmation, NotFound} from 'app/auth'
import {Dashboard} from 'app/dashboard'
import {Events} from 'app/events'
import {Event} from 'app/event'
import {EventRegistration} from 'app/eventregistration'
import {EventPayment} from 'app/eventpayment'
import {Registrant} from 'app/registrant'
import {Account} from 'app/account'

// Just changed it to all routes being
// private by default, and you need to specify
// if the route is to be a public route or not

export const routes = [
  {title: '404', path: '/404', component: NotFound},
  {title: 'Dashboard', path: "/", component: Dashboard},
  {title: 'Sign Up', path: "/signup", component: Register, public: true},
  {title: 'Sign In', path: "/signin", component: Login, public: true},
  {title: 'Reset Password', path: "/reset-password", component: ResetPassword, public: true},
  {title: 'Confirmation', path: "/confirm-reset", component: Confirmation, public: true},
  {title: 'Registrant', path: "/event/:event_id/registrant/:registrant_id", component: Registrant},
  {title: 'Events', path: "/events", component: Events},
  {title: 'Register for Event', path: "/event/:event_id/register", component: EventRegistration},
  {title: 'Register for Event', path: "/event/:event_id/pay/:registrant_id", component: EventPayment},
  {title: 'Event', path: "/event/:event_id", component: Event},
  {title: 'Account', path: "/account", component: Account},
]

export const urls = routes.map(route => route.path)