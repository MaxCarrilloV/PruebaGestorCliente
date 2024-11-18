import { useState, useEffect, useContext } from 'react'
import { useNotificatioDispatch } from './NotificationContext'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from './services/users'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import { setToken, getAll } from './services/clients'
import loginContext from './LoginContext'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import ClientList from './components/ClientList'
import Cliente from './components/cliente'
import NavBarMenu from './components/NavBarMenu'
import User from './components/User'
import loginService from './services/login'
import Weather from './components/Weather'
import RegisterForm from './components/RegisterForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, logindispatch] = useContext(loginContext)
  const Notidispatch = useNotificatioDispatch()
  const matchUser = useMatch('/users/:id')
  const matchclient = useMatch('/clientes/:id')
  const register = useMatch('/registrarse')
  const navigate = useNavigate()

  useEffect(() => {
    const userLog = window.localStorage.getItem('user')
    if (userLog) {
      const user = JSON.parse(userLog)
      logindispatch({ type: 'newLogin', payload: user })
      setToken(user.token)
    }
  }, [])

  const resultUser = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const resultClientes = useQuery({
    queryKey: ['clientes'],
    queryFn: getAll,
  })

  if (resultUser.isLoading) {
    return <div>loading data...</div>
  }

  if (resultUser.isError) {
    return <div>Error data...</div>
  }
  const users = resultUser.data

  if (resultClientes.isLoading) {
    return <div>loading data...</div>
  }

  if (resultClientes.isError) {
    return <div>Error data...</div>
  }
  const clientes = resultClientes.data

  const userData = matchUser
    ? users.find((user) => user.id === Number(matchUser.params.id))
    : null

  const cliente = matchclient
    ? clientes.find((cliente) => cliente.id === Number(matchclient.params.id))
    : null

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      setToken(user.token)
      setUsername('')
      setPassword('')
      logindispatch({ type: 'newLogin', payload: user })
    } catch (exception) {
      const data = { text: 'Credencial error', style: 'error' }
      Notidispatch({ type: 'setNotification', payload: data })
      setTimeout(() => {
        Notidispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }

  const handleRegister = async (register) => {
    try {
      await loginService.register(register)
      const user = await loginService.login({
        username:register.username,
        password:register.password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      setToken(user.token)
      logindispatch({ type: 'newLogin', payload: user })
      navigate("/")
    } catch (exception) {
      const data = { text: 'Credencial error', style: 'error' }
      Notidispatch({ type: 'setNotification', payload: data })
      setTimeout(() => {
        Notidispatch({ type: 'hideNotification' })
      }, 5000)
    }
  }

  return (
    <div>
      {user === null ? (
        <>
          <Notification />
          {register !== null && register.pathname === '/registrarse'  ? (
            <Routes>
              <Route
                path="/registrarse"
                element={
                  <RegisterForm handleRegister={handleRegister}/>
                }
              />
            </Routes>
          ) : (
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          )}
        </>
      ) : (
        <div>
          <NavBarMenu user={user} />
          <Notification />
          <Routes>
            <Route
              path="/"
              element={
                <ClientList clientes={clientes} user={user}></ClientList>
              }
            />
            <Route
              path="/users/:id"
              element={<User userData={userData}></User>}
            />
            <Route
              path="/clientes/:id"
              element={<Cliente cliente={cliente} user={user} />}
            />
            <Route path="/tiempo" element={<Weather />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
