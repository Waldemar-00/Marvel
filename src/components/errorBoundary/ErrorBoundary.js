import { Component } from 'react' 

import ErrorMessage from '../error/ErrorMessage'

class ErrorBoundary extends Component {
  state = {
    error: false
  }
  static getDerivedStateFromError() {
    return { error: true }
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }
  render() {
    if (this.state.error) {
      return <ErrorMessage/>
    }
    return this.props.children
  }
}
export default ErrorBoundary

