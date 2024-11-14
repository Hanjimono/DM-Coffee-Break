/**
 * Adjusts the luminance of a given hex color.
 *
 * @param {string} hex - The hex color code to adjust. It can be in the format of 3 or 6 characters.
 * @param {number} lum - The luminosity factor to adjust the color by. Positive values will lighten the color, negative values will darken it.
 * @returns {string} The adjusted hex color code.
 */
export function colorLuminance(hex: string, lum: number) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "")
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  lum = lum || 0

  // convert to decimal and change luminosity
  let rgb = "#",
    c,
    i
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
    rgb += ("00" + c).substr(c.length)
  }

  return rgb
}

/**
 * Generates a random hex color code.
 *
 * @returns {string} A string representing a random hex color code, starting with '#'
 *                   followed by six hexadecimal digits.
 */
export function getRandomColor(): string {
  let letters = "0123456789ABCDEF".split("")
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)]
  }
  return color
}

/**
 * Generates a random dark color by adjusting the luminance of a random color.
 *
 * @returns {string} A string representing a random dark color in hexadecimal format.
 */
export function getRandomDarkColor() {
  return colorLuminance(getRandomColor(), -0.65)
}
