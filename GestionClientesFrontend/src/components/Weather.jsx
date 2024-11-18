import axios from 'axios'
import { useState } from 'react'
import {
  Button,
  Form,
  Grid,
  GridColumn,
  FormInput,
  Container,
} from 'semantic-ui-react'
import { useNotificatioDispatch } from '../NotificationContext'
import Notification from './Notification'

const Weather = () => {
  const [ciudad, setCiudad] = useState('')
  const [data, setData] = useState(null)
  const Notidispatch = useNotificatioDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
      axios
        .get(`/api/weather?city=${ciudad}`)
        .then((data) => setData(data.data))
        .catch(error => {
            const data = { text: 'Ciudad no encontrada', style: 'error' }
      Notidispatch({ type: 'setNotification', payload: data })
      setTimeout(() => {
        Notidispatch({ type: 'hideNotification' })
      }, 5000)
        })
      setCiudad('')

  }

  return (
    <Container>
      <Grid textAlign="center" verticalAlign="middle">
        <GridColumn>
          <Form onSubmit={handleSubmit}>
            <h1 style={{marginTop:'2em'}}>Visualizar Tiempo</h1>
            Ciudad:
            <FormInput
              placeholder="Ciudad"
              type="text"
              name="ciudad"
              value={ciudad}
              onChange={({ target }) => setCiudad(target.value)}
            />
            <Button color="black" type="submit">
              Buscar
            </Button>
          </Form>
        </GridColumn>
      </Grid>
      {data !== null && (
        <>
          <p>Nombre: {data.name}</p>
          <p>Tiempo: {data.weather[0].description}</p>
          <p>Velocidad del viento: {data.wind.speed} Km por hora</p>
        </>
      )}
    </Container>
  )
}
export default Weather
