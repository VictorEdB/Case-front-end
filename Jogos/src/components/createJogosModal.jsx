import { Modal, Button, Form } from 'react-bootstrap'

function CreateModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.ModalOpen}>
        <Form onSubmit={(event) => {
          
          props.createJogos(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Adicionar Jogos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="nome">
            <Form.Label>
              Nome
            </Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group controlId="genero">
            <Form.Label>
              Genero
            </Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group controlId="ano">
            <Form.Label>
              Ano
            </Form.Label>
            <Form.Control type="number" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Close</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal >
    </div>
  )
}




export default CreateModal