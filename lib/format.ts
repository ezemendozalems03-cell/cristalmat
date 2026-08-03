const numberFormatter = new Intl.NumberFormat('es-AR', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

// Intl's "currency" style inserts a space after "$" in some ICU builds (e.g. Node),
// so the symbol and separators are assembled manually to guarantee "$290.000".
export function formatCurrencyARS(value: number) {
  return `$${numberFormatter.format(Math.round(value))}`
}

export function formatM2(value: number) {
  return `${value.toLocaleString('es-AR', { maximumFractionDigits: 2 })} m²`
}
