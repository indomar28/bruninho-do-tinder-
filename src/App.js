import GlobalStyle from './style/global'
import Form from './components/Form.js'
import Grid from './components/Grid.js'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'



const Container = styled.div`
  width: 100%;
  max-width:800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const Title = styled.h2``

function App() {
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800")
      setUsers(res.data);
    } catch (err) {
      toast.error(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div>
      <Container>
        <Title>Tarefas</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers}/>
      </Container>
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
      <footer>Desenvolvido por Indomar Padilla</footer>

    </div>

  );
}

export default App;
