import AuthGuard from './lib/auth-guard'
import {history, bindHistory, navigate, navigateReplace, navigateBack} from './lib/history'
import LocationReducer from './lib/location-reducer'
import Router from './lib/router'

export default {
  AuthGuard,
  LocationReducer,
  Router,
  history,
  bindHistory,
  navigate,
  navigateReplace,
  navigateBack
}
