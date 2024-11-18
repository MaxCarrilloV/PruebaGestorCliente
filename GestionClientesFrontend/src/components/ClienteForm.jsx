import { useState } from 'react'
import {
  Button,
  Form,
  Grid,
  GridColumn,
  FormInput,
} from 'semantic-ui-react'

const ClienteForm = ({ createCliente }) => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const cliente = {
      nombre,
      email,
      direccion,
      telefono
    }
    createCliente(cliente)
    setNombre('')
    setEmail('')
    setDireccion('')
    setTelefono('')
  }
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <GridColumn>
        <Form onSubmit={handleSubmit}>
          <h1>Añade un nuevo cliente</h1>
          Nombre:
          <FormInput
            placeholder="Nombre"
            type="text"
            name="nombre"
            value={nombre}
            onChange={({ target }) => setNombre(target.value)}
          />
          Email:
          <FormInput
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          Direccion:
          <FormInput
            placeholder="Direccion"
            type="text"
            name="direccion"
            value={direccion}
            onChange={({ target }) => setDireccion(target.value)}
          />
          Telefono:
          <FormInput
            placeholder="Telefono"
            type="text"
            name="telefono"
            value={telefono}
            onChange={({ target }) => setTelefono(target.value)}
          />
          <Button color="black" type="submit">
            Añadir
          </Button>
        </Form>
      </GridColumn>
    </Grid>
  )
}

export default ClienteForm
