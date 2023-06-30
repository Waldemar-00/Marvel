import ErrorMessage from "../error/ErrorMessage"
import {Link} from 'react-router-dom'
const NoMatch = () => {
  const styles = {
    main: {
      margin: '0 auto',
      textAlign: 'center',
      width: '100vh'
    },
    h2: {
      fontSize: '40px',
      marginTop: '100px',
      color: '#9f0013'
    },
    ul: {
      marginTop: '30px',
      fontSize: '24px'
    },
    li: {
      lineHeight: '35px',
      color: '#5d7abb'
    }
  }
  const onBack = () => {
    window.history.go(-1)
  }
  const onForward = () => {
  window.history.go(1)
  }
  return (
    <main style={styles.main}>
      <ErrorMessage/>
      <h2 style={styles.h2}>No page with that URL</h2>
      <ul style={styles.ul}>
        <li style={styles.li}><Link to='/'>Return to main page: Characters</Link></li>
        <li style={styles.li}> <Link to='/comics'>Return to comics page: Comics</Link></li>
        <li style={styles.li}><Link onClick={onBack}>Back to page</Link></li>
        <li style={styles.li}><Link onClick={onForward}>Forward to page</Link></li>
      </ul>
    </main>
  )
}
export default NoMatch