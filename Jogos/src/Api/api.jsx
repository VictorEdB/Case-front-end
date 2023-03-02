const Api = () => {
  const url = 'https://biblioteca-de-jogos.onrender.com'

  return {
      getJogos () {
          return fetch(`${url}/jogos`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      },
      deleteJogos (Id) {
        return fetch(`${url}/jogos/${Id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
       })
      },
      createJogos (nome, ano, genero) {
        return fetch(`${url}/jogo`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              nome: nome,
              ano: ano,
              genero: genero
            }
          )
       })
      },
      updateJogos( nome, ano, genero) {
        return fetch(`${url}/jogo`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              nome: nome,
              ano: ano,
              genero: genero
            }
          )
       })
      },
  }
}

export default Api