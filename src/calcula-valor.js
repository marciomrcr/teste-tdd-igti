function calcularMontante(capital, taxa, periodo) {
  let montante = capital * Math.pow(1 + taxa, periodo - 1)
  montante = arredondar(montante)
  return montante
}

function arredondar(valor) {
  const precisao = 100
  const arredondamento =
    Math.round((valor + Number.EPSILON) * precisao) / precisao
  return arredondamento
}

function calcularPrestacoes(montante, numeroParcelas) {
  const prestacaoBase = arredondar(montante / numeroParcelas)
  const resultado = Array(numeroParcelas).fill(prestacaoBase)

  return resultado
}

module.exports = {
  calcularMontante,
  arredondar,
  calcularPrestacoes,
}
