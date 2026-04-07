import { expect, test } from "vitest"
import { cnpj, cpf } from "../src/index"

// --- CPF ---

test("cpf.validate should return true for valid formatted CPF", () => {
    expect(cpf.validate("529.982.247-25")).toBe(true)
})

test("cpf.validate should return true for valid raw CPF", () => {
    expect(cpf.validate("52998224725")).toBe(true)
})

test("cpf.validate should return false for invalid CPF", () => {
    expect(cpf.validate("123.456.789-00")).toBe(false)
    expect(cpf.validate("000.000.000-00")).toBe(false)
    expect(cpf.validate("111.111.111-11")).toBe(false)
})

test("cpf.format should format raw CPF", () => {
    expect(cpf.format("52998224725")).toBe("529.982.247-25")
})

test("cpf.format should format already formatted CPF", () => {
    expect(cpf.format("529.982.247-25")).toBe("529.982.247-25")
})

test("cpf.unformat should remove formatting", () => {
    expect(cpf.unformat("529.982.247-25")).toBe("52998224725")
    expect(cpf.unformat("52998224725")).toBe("52998224725")
})

test("cpf.generate should produce a valid CPF", () => {
    const raw = cpf.generate()
    expect(cpf.validate(raw)).toBe(true)
    expect(cpf.regex.raw.test(raw)).toBe(true)
})

test("cpf.generate({ formatted: true }) should produce a formatted valid CPF", () => {
    const formatted = cpf.generate({ formatted: true })
    expect(cpf.validate(formatted)).toBe(true)
    expect(cpf.regex.formatted.test(formatted)).toBe(true)
})

// --- CNPJ ---

test("cnpj.validate should return true for valid formatted CNPJ", () => {
    expect(cnpj.validate("11.222.333/0001-81")).toBe(true)
})

test("cnpj.validate should return false for invalid CNPJ", () => {
    expect(cnpj.validate("12.345.678/0001-00")).toBe(false)
    expect(cnpj.validate("00.000.000/0000-00")).toBe(false)
    expect(cnpj.validate("11.111.111/1111-11")).toBe(false)
})

test("cnpj.format should format raw CNPJ", () => {
    expect(cnpj.format("11222333000181")).toBe("11.222.333/0001-81")
})

test("cnpj.unformat should remove formatting", () => {
    expect(cnpj.unformat("11.222.333/0001-81")).toBe("11222333000181")
    expect(cnpj.unformat("11222333000181")).toBe("11222333000181")
})

test("cnpj.generate should produce a valid CNPJ", () => {
    const raw = cnpj.generate()
    expect(cnpj.validate(raw)).toBe(true)
    expect(cnpj.regex.raw.test(raw)).toBe(true)
})

test("cnpj.generate({ formatted: true }) should produce a formatted valid CNPJ", () => {
    const formatted = cnpj.generate({ formatted: true })
    expect(cnpj.validate(formatted)).toBe(true)
    expect(cnpj.regex.formatted.test(formatted)).toBe(true)
})

test("cnpj.generate({ state: 'SP' }) should use correct regional digit", () => {
    const raw = cnpj.generate({ state: "SP" })
    expect(cnpj.validate(raw)).toBe(true)
    expect(raw[7]).toBe("8")
})

test("cnpj.generate({ state: 'RJ' }) should use correct regional digit", () => {
    const raw = cnpj.generate({ state: "RJ" })
    expect(cnpj.validate(raw)).toBe(true)
    expect(raw[7]).toBe("7")
})

test("cnpj.generate with invalid state should throw", () => {
    expect(() => cnpj.generate({ state: "XX" })).toThrow()
})
