const STATE_TO_DIGIT: Record<string, string> = {
    AC: "2",
    AL: "4",
    AM: "2",
    AP: "2",
    BA: "5",
    CE: "3",
    DF: "1",
    ES: "7",
    GO: "1",
    MA: "3",
    MG: "6",
    MS: "1",
    MT: "1",
    PA: "2",
    PB: "4",
    PE: "4",
    PI: "3",
    PR: "9",
    RJ: "7",
    RN: "4",
    RO: "2",
    RR: "2",
    RS: "0",
    SC: "9",
    SE: "5",
    SP: "8",
    TO: "1",
}

export const regex = {
    formatted: /^[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-\d{2}$/i,
    raw: /^[A-Z0-9]{12}\d{2}$/i,
}

export function unformat(formatted: string): string {
    return formatted.replace(/[^A-Z0-9]/gi, "").toUpperCase()
}

export function format(raw: string): string {
    const digits = unformat(raw)

    if (!regex.raw.test(digits)) {
        throw new Error("Invalid CNPJ format")
    }

    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

export function validate(raw: string): boolean {
    const value = unformat(raw)

    if (!regex.raw.test(value)) return false
    if (/^(\w)\1{13}$/.test(value)) return false

    const calc = (n: number, weightStart: number): number => {
        let sum = 0
        let weight = weightStart

        for (let i = 0; i < n; i++) {
            const charValue = value.charCodeAt(i) - 48

            sum += charValue * weight
            weight--

            if (weight < 2) {
                weight = 9
            }
        }

        const remainder = sum % 11

        return remainder < 2 ? 0 : 11 - remainder
    }

    return calc(12, 5) === parseInt(value[12], 10) && calc(13, 6) === parseInt(value[13], 10)
}

export type GenerateOptions = {
    formatted?: boolean
    state?: string
    alphanumeric?: boolean
}

export function generate(options: GenerateOptions = {}): string {
    const values: number[] = []

    for (let i = 0; i < 8; i++) {
        if (i === 7 && options.state) {
            const stateDigit = STATE_TO_DIGIT[options.state.toUpperCase()]

            if (!stateDigit) {
                throw new Error(`Invalid state: ${options.state}`)
            }

            values.push(parseInt(stateDigit, 10))
        } else if (options.alphanumeric) {
            const isLetter = Math.random() > 0.5

            if (isLetter) {
                values.push(Math.floor(Math.random() * 26) + 17)
            } else {
                values.push(Math.floor(Math.random() * 10))
            }
        } else {
            values.push(Math.floor(Math.random() * 10))
        }
    }

    values.push(0, 0, 0, 1)

    const calc = (n: number, weightStart: number): number => {
        let sum = 0
        let weight = weightStart
        for (let i = 0; i < n; i++) {
            sum += values[i] * weight
            weight--
            if (weight < 2) weight = 9
        }
        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    values.push(calc(12, 5))
    values.push(calc(13, 6))

    const raw = values
        .map((v) => {
            if (v >= 17) return String.fromCharCode(v + 48)
            return String(v)
        })
        .join("")

    return options.formatted ? format(raw) : raw
}
