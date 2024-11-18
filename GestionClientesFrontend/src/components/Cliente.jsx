import { useState } from 'react'
import { update, remove} from '../services/clients'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificatioDispatch } from '../NotificationContext'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Header,
  Segment,
  Container,
} from 'semantic-ui-react'
const Cliente = ({ cliente, user }) => {
  const [clientView, setClientView] = useState(cliente)
  const navigate = useNavigate()
  const Notidispatch = useNotificatioDispatch()
  const queryClient = useQueryClient()
  const removeClienteMutation = useMutation({
    mutationFn: remove,
    onSuccess: (id) => {
      const clientes = queryClient.getQueryData(['clientes'])
      queryClient.setQueryData(
        ['clientes'],
        clientes.filter((cliente) => cliente.id !== id)
      )
    },
  })
  const updateClienteMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    },
  })

  const removeCliente = (clientDel) => {
    try {
      if (window.confirm(`Eliminar cliente ${clientDel.nombre}`)) {
        removeClienteMutation.mutate(clientDel.id)
        const data = {
          text: `cliente ${clientDel.nombre} fue eliminado`,
          style: 'exists',
        }
        navigate('/')
        Notidispatch({ type: 'setNotification', payload: data })
        setTimeout(() => {
          Notidispatch({ type: 'hideNotification' })
        }, 5000)
      }
    } catch (error) {
      const data = { text: 'Credencial error', style: 'error' }
      Notidispatch({ type: 'setNotification', payload: data })
      NotisetTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }

  const handleRemove = () => removeCliente(clientView)
  console.log(cliente);
  
  return (
    <Container style={{marginTop:'2em'}}>
      <Segment style={{ padding: '1em 1em' }}>
        <div className="cliente">
          <Header as="h1"> {cliente.nombre} </Header>
          <p>{cliente.email}</p>
          <p>{cliente.direccion}</p>
          <p>{cliente.telefono}</p>
          <Button color="black" onClick={handleRemove}>
            Eliminar
          </Button>
        </div>
      </Segment>
    </Container>
  )
}
export default Cliente
