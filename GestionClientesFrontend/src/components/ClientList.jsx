import { useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificatioDispatch } from '../NotificationContext'
import { create } from '../services/clients'
import { Link } from 'react-router-dom'
import { Segment, Container, Header } from 'semantic-ui-react'
import ClienteForm from './ClienteForm'
import Toggable from './Toggable'
const ClientList = ({ clientes }) => {
  const Notidispatch = useNotificatioDispatch()
  const queryClient = useQueryClient()
  const clienteFormRef = useRef()
  const newClientMutation = useMutation({
    mutationFn: create,
    onSuccess: (newClient) => {
      const clientes = queryClient.getQueryData(['clientes'])
      queryClient.setQueryData(['clientes'], clientes.concat(newClient))
    },
  })
  
  const createCliente = (newClient) => {
    clienteFormRef.current.toggleVisibility()
    try {
      newClientMutation.mutate(newClient)
      const data = {
        text: `Un nuevo cliente ${newClient.nombre} ha sido añadido `,
        style: 'exists',
      }
      Notidispatch({ type: 'setNotification', payload: data })
      setTimeout(() => {
        Notidispatch({ type: 'hideNotification' })
      }, 5000)
    } catch (error) {
      const data = { text: 'Credencial error', style: 'error' }
      Notidispatch({ type: 'setNotification', payload: data })
      setTimeout(() => {
        Notidispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }
  return (
    <Container style={{marginTop:'2em'}}>
      <Header textAlign='center' as="h1">Lista de clientes</Header>
      <Toggable buttonlabel="Nuevo cliente" ref={clienteFormRef}>
        <ClienteForm createCliente={createCliente}></ClienteForm>
      </Toggable>
      {clientes &&
        clientes.map((client) => (
          <Segment size="large" key={client.id}>
            <Link to={`/clientes/${client.id}`}>{client.nombre}</Link>
          </Segment>
        ))}
    </Container>
  )
}
export default ClientList
