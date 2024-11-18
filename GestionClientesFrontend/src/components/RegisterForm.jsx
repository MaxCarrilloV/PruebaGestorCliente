import { useState } from 'react'
import {
  Button,
  Form,
  Grid,
  GridColumn,
  FormInput,
  Container,
} from 'semantic-ui-react'

const RegisterForm = ({handleRegister}) => {
  const [username, setUsername] = useState('')
  const [password ,setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [apellido, setApellido] = useState('')
  const [ciudad, setCiudad] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const register = {
      username,
      password,
      nombre,
      apellido,
      email,
      ciudad,
    }
    handleRegister(register)
    setNombre('')
    setEmail('')
    setUsername('')
    setPassword('')
    setCiudad('')
    setTelefono('')
    setApellido('')
  }
  return (
    <Container>
      <Grid textAlign="center" verticalAlign="middle">
        <GridColumn>
          <Form onSubmit={handleSubmit}>
            <h1>Añade un nuevo cliente</h1>
            Username:
            <FormInput
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            Password:
            <FormInput
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            Nombre:
            <FormInput
              placeholder="Nombre"
              type="text"
              name="nombre"
              value={nombre}
              onChange={({ target }) => setNombre(target.value)}
            />
            Apellido:
            <FormInput
              placeholder="Apellido"
              type="text"
              name="apellido"
              value={apellido}
              onChange={({ target }) => setApellido(target.value)}
            />
            Email:
            <FormInput
              placeholder="Email"
              type="text"
              name="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            Ciudad:
            <FormInput
              placeholder="Ciudad"
              type="text"
              name="ciudad"
              value={ciudad}
              onChange={({ target }) => setCiudad(target.value)}
            />
            <Button color="black" type="submit">
              Registrarse
            </Button>
          </Form>
        </GridColumn>
      </Grid>
    </Container>
  )
}
export default RegisterForm
