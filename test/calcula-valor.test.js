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
