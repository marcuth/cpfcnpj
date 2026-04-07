// SRF regional codes: 8th digit (index 7) maps to states
const STATE_TO_DIGIT: Record<string, string> = {
    AC: '2', AL: '4', AM: '2', AP: '2', BA: '5', CE: '3',
    DF: '1', ES: '7', GO: '1', MA: '3', MG: '6', MS: '1',
    MT: '1', PA: '2', PB: '4', PE: '4', PI: '3', PR: '9',
    RJ: '7', RN: '4', RO: '2', RR: '2', RS: '0', SC: '9',
    SE: '5', SP: '8', TO: '1',
}

export const regex = {
    formatted: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    raw: /^\d{14}$/,
}

export function unformat(formatted: string): string {
    return formatted.replace(/\D/g, '')
}

export function format(raw: string): string {
    const digits = unformat(raw)
    if (!regex.raw.test(digits)) {
        throw new Error('Invalid CNPJ format')
    }
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

export function validate(raw: string): boolean {
    const digits = unformat(raw)
    if (!regex.raw.test(digits)) return false
    if (/^(\d)\1{13}$/.test(digits)) return false

    const calc = (n: number, weightStart: number): number => {
        let sum = 0
        let weight = weightStart
        for (let i = 0; i < n; i++) {
            sum += parseInt(digits[i], 10) * weight
            weight--
            if (weight < 2) weight = 9
        }
        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    return (
        calc(12, 5) === parseInt(digits[12], 10) &&
        calc(13, 6) === parseInt(digits[13], 10)
    )
}

export type GenerateOptions = {
    formatted?: boolean
    state?: string
}

export function generate(options: GenerateOptions = {}): string {
    const digits: number[] = Array.from({ length: 7 }, () =>
        Math.floor(Math.random() * 10)
    )

    // 8th digit: state region, or random
    if (options.state) {
        const stateDigit = STATE_TO_DIGIT[options.state.toUpperCase()]
        if (!stateDigit) {
            throw new Error(`Invalid state: ${options.state}`)
        }
        digits.push(parseInt(stateDigit, 10))
    } else {
        digits.push(Math.floor(Math.random() * 10))
    }

    // Branch digits (0001 = headquarters)
    digits.push(0, 0, 0, 1)

    const calc = (n: number, weightStart: number): number => {
        let sum = 0
        let weight = weightStart
        for (let i = 0; i < n; i++) {
            sum += digits[i] * weight
            weight--
            if (weight < 2) weight = 9
        }
        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    digits.push(calc(12, 5))
    digits.push(calc(13, 6))

    const raw = digits.join('')
    return options.formatted ? format(raw) : raw
}
