const calculaValor = require('../src/calcula-valor.js')

describe('calcularMontante', () => {
  test('Com uma prestação o montate é igual ao capital', () => {
    // Operação
    const montante = calculaValor.calcularMontante(100, 0.0175, 1)

    // Resultado ou comportamento esperado
    expect(montante).toBe(100)
  })

  test('Com 4 prestações o montate é acrescido de juros', () => {
    // Operação
    const montante = calculaValor.calcularMontante(500, 0.025, 4)

    // Resultado ou comportamento esperado
    expect(montante).toBe(538.45)
  })
})

describe('arredondar', () => {
  test('Arrendondar em duas casas decimais', () => {
    const resultado = calculaValor.arredondar(538.4453124999998)
    expect(resultado).toBe(538.45)
  })

  test('1.005 deve retornar 1.01', () => {
    const resultado = calculaValor.arredondar(1.005)
    expect(resultado).toBe(1.01)
  })
})

describe('calcularPrestacoes', () => {
  test('O número de parcelas é igual ao numero de prestações', () => {
    // Premissas
    const numeroPrestacoes = 6
    // Operações
    const prestacoes = calculaValor.calcularPrestacoes(200, numeroPrestacoes)
    // Resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes)
  })

  test('Uma única prestação, valor é igual ao montante', () => {
    // Premissas
    const numeroPrestacoes = 1
    // Operações
    const prestacoes = calculaValor.calcularPrestacoes(200, numeroPrestacoes)
    // Resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes[0]).toBe(200 / numeroPrestacoes)
  })

  test('2 prestações, valor é igual a 50% do montante', () => {
    // Premissas
    const numeroPrestacoes = 2
    // Operações
    const prestacoes = calculaValor.calcularPrestacoes(100, numeroPrestacoes)
    // Resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes[0]).toBe(100 / numeroPrestacoes)
    expect(prestacoes[0]).toBe(50)
    expect(prestacoes[1]).toBe(50)
  })

  test('Valor da soma das prestações é igual ao montante com 2 casas decimais', () => {
    // Dado (given)
    const numeroPrestacoes = 3
    const montante = 100
    // Quando (when)
    const prestacoes = calculaValor.calcularPrestacoes(
      montante,
      numeroPrestacoes
    )
    // Então (then)
    expect(prestacoes.length).toBe(numeroPrestacoes)
    const soma = calculaValor.arredondar(
      prestacoes[0] + prestacoes[1] + prestacoes[2]
    )
    expect(soma).toBe(montante)

    for (let i = 0; i < prestacoes.length - 1; i++) {
      const j = i + 1
      expect(prestacoes[i]).toBeGreaterThanOrEqual(prestacoes[j])
    }
  })

  test('Desafio semi-final ', () => {
    // Premissas Given
    const numeroPrestacoes = 3
    const montante = 101.994
    // Quando When
    const prestacoes = calculaValor.calcularPrestacoes(
      montante,
      numeroPrestacoes
    )
    // Então Then
    expect(prestacoes.length).toBe(numeroPrestacoes)
    const soma = calculaValor.arredondar(
      prestacoes[0] + prestacoes[1] + prestacoes[2]
    )
    expect(soma).toBe(calculaValor.arredondar(montante))

    for (let i = 0; i < prestacoes.length - 1; i++) {
      const j = i + 1
      expect(prestacoes[i]).toBeGreaterThanOrEqual(prestacoes[j])
    }
  })
})
