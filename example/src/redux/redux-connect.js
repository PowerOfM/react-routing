import { connect as reduxConnect } from 'react-redux'

const connect = reduxConnect(
  // Map state to props
  state => ({
    ...state
  }),
  // Map dispatch to props
  dispatch => ({
    dispatch
  })
)

export default connect
