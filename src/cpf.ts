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
    formatted: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    raw: /^\d{11}$/,
}

export function unformat(formatted: string): string {
    return formatted.replace(/\D/g, "")
}

export function format(raw: string): string {
    const digits = unformat(raw)

    if (!regex.raw.test(digits)) {
        throw new Error("Invalid CPF format")
    }

    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

export function validate(raw: string): boolean {
    const digits = unformat(raw)

    if (!regex.raw.test(digits)) return false
    if (/^(\d)\1{10}$/.test(digits)) return false

    const calc = (n: number, weightStart: number): number => {
        let sum = 0

        for (let i = 0; i < n; i++) {
            sum += parseInt(digits[i], 10) * (weightStart - i)
        }

        const remainder = sum % 11

        return remainder < 2 ? 0 : 11 - remainder
    }

    return calc(9, 10) === parseInt(digits[9], 10) && calc(10, 11) === parseInt(digits[10], 10)
}

export type GenerateOptions = {
    formatted?: boolean
    state?: string
}

export function generate(options: GenerateOptions = {}): string {
    const digits: number[] = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))

    if (options.state) {
        const stateDigit = STATE_TO_DIGIT[options.state.toUpperCase()]

        if (!stateDigit) {
            throw new Error(`Invalid state: ${options.state}`)
        }

        digits.push(parseInt(stateDigit, 10))
    } else {
        digits.push(Math.floor(Math.random() * 10))
    }

    while (digits.every((d) => d === digits[0])) {
        digits[0] = Math.floor(Math.random() * 10)
    }

    const calc = (n: number, weightStart: number): number => {
        let sum = 0

        for (let i = 0; i < n; i++) {
            sum += digits[i] * (weightStart - i)
        }

        const remainder = sum % 11

        return remainder < 2 ? 0 : 11 - remainder
    }

    digits.push(calc(9, 10))
    digits.push(calc(10, 11))

    const raw = digits.join("")

    return options.formatted ? format(raw) : raw
}
