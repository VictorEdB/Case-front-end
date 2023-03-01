import { Table, Container, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import CreateModal from './components/CreateJogosModal'
import UpdateModal from './components/UpdateJogosModal'
import Api from './api/Api'

function App() {
  const [jogos, setJogos] = useState()
  const [CreateModalOpen, setCreateModalOpen] = useState(false)
  const [UpdateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedJogos, setSelectedJogos] = useState()

  const handleCloseCreateModal = () => setCreateModalOpen(false);
  const handleShowCreateModal = () => setCreateModalOpen(true);

  const handleCloseUpdateModal = () => setUpdateModalOpen(false);
  const handleShowUpdateModal = () => setUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await Api().getJogos().then(data => {
        return data.json()
      })
      .then(data => {
        setJogos(data)
      })
    }

    getData()
  }, [])

  async function deleteJogos(Id) {
    try {
      await Api().deleteJogos(Id)

      const formattedJogos = jogos.filter(jogo => {
        if(jogo.id !== Id){
          return jogo
        }
      })

      setJogos(formattedJogos)
    } catch(err) {
      throw err
    }
  }

  async function createJogos(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await Api().createJogos(
        req.nome.value, req.ano.value, Number(req.genero.value)
      ).then(data => {
        return data.json()
      }).then(res => {
        setFilmes([...jogos, {
          id: res.Id,
          nome: req.nome.value,
          ano: req.ano.value,
          genero: Number(req.genero.value)
        }])

        setCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function updateJogos(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await Api().updateJogos(
        selectedJogos.id, req.nome.value, req.ano.value, Number(req.genero.value)
      )

      const formattedJogos = jogos.map(game => {
        if(game.id === selectedJogos.id) {
          return {
            id: selectedJogos.id,
            nome: req.nome.value,
            ano: req.ano.value,
            genero: Number(req.genero.value)
          }
        }

        return game
      })

      setJogos(formattedJogos)

      setUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return(
    <> 
    <Container
      className="
        d-flex
        flex-column
        align-items-start
        justify-content-center
        h-100
        w-100
        "
    >
      <Button
        className="mb-8"
        onClick={handleShowCreateModal}
        variant='primary'>
        Adicionar Jogos
      </Button>
     
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>ano</th>
            <th>genero</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {jogos && jogos.map(jogos=> (
            <tr key={jogos.id}>
              <td>{jogos.nome}</td>
              <td>{jogos.ano}</td>
              <td>{jogos.genero}</td>
              <td>
                <Button onClick={() => deleteJogos(jogos.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedJogos(jogos)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateModal ModalOpen={CreateModalOpen} handleClose={handleCloseCreateModal} createJogos={createJogos} />
    {selectedJogos && (
      <UpdateModal ModalOpen={UpdateModalOpen} handleClose={handleCloseUpdateModal} updatejogos={updateJogos} jogos={selectedJogos} />
    )}
    </>
  )
}

export default App
