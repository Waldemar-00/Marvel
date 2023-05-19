import img from './error.gif'
const ErrorMessage = () => {
  return (
    <img src={img}
      alt="broken fetch"
      style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}}
    /> //! process.env.PUBLIC_URL + '/error.gif'(if in public - static file)
  )
}
export default ErrorMessage