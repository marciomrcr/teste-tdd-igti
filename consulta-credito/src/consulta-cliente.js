const calculaValor = require('./calcula-valor.js')

const db = require('./db.js')

const juros = 0.025

const consultar = async (nome, CPF, valor, parcelas) => {
  let cliente = await db.cliente.findOne({
    where: { CPF },
  })
  if (cliente == null) {
    cliente = await db.cliente.create({
      Nome: nome,
      CPF: CPF,
    })
  }

  const ultimaConsulta = await db.cliente.findOne({
    where: { ClienteCPF: CPF },
    order: [db.sequelize.col('createdAT'), 'DESC'],
  })

  if (ultimaConsulta) {
    const diferenca = Math.abs(
      ultimaConsulta.createdAT.getTime() - new Date().getTime()
    )
    const diferencaDias = Math.round(diferenca / (1000 * 60 * 60 * 24))
    if (diferencaDias <= 30) {
      throw new Error(
        `Última consulta realizada há menos de ${diferencaDias} dias `
      )
    }
  }

  const montante = calculaValor.calcularMontante(valor, juros, parcelas)
  const prestacoes = calculaValor.calcularMontante(montante, parcelas)

  const novaConsulta = {
    Valor: valor,
    NumPrestacoes: parcelas,
    Juros: juros,
    Prestacoes: prestacoes,
    ClienteCPF: cliente.CPF,
    Montante: montante,
  }
  await db.consulta.create(novaConsulta)

  return {
    montante: montante,
    juros: juros,
    parcelas: prestacoes.length,
    primeiraPrestacao: prestacoes[0],
    prestacoes: prestacoes,
  }
}

module.exports = {
  consultar,
}
