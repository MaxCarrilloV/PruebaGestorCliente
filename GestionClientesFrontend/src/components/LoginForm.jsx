import {
  Button,
  Form,
  Segment,
  FormInput,
  GridColumn,
  Header,
  Grid,
} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) => {
  const navigate = useNavigate()
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <GridColumn style={{ maxWidth: 450 }}>
        <Header color="Black" as="h1">
          Log in to application
        </Header>
        <Form onSubmit={handleLogin} size="large">
          <Segment>
            <FormInput
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username:"
              data-testid="username"
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <FormInput
              icon="lock"
              iconPosition="left"
              fluid
              placeholder="Password:"
              data-testid="password"
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button type="submit" fluid size="large" color="black">
              Login
            </Button>
          </Segment>
          <Button
            type="button"
            onClick={() => navigate('/registrarse')}
            fluid
            size="large"
            color="black"
          >
            Registrarse
          </Button>
        </Form>
      </GridColumn>
    </Grid>
  )
}
export default LoginForm
