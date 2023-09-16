
import Page from '../../layout/Page'
import Center from '../../layout/Center'
import { Link } from 'react-router-dom'

function VerifyEmail() {
  return (
    <Page>
      <Center>
        <p>
          An email has been sent to your email address. Please verify your email
        </p>
        <Link to="/login">Click here to Login</Link>
      </Center>
    </Page>
  )
}

export default VerifyEmail