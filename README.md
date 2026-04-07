# @marcuth/cpfcnpj

[![npm version](https://img.shields.io/npm/v/@marcuth/cpfcnpj.svg?style=flat-square)](https://www.npmjs.com/package/@marcuth/cpfcnpj)
[![npm downloads](https://img.shields.io/npm/dm/@marcuth/cpfcnpj.svg?style=flat-square)](https://www.npmjs.com/package/@marcuth/cpfcnpj)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A lightweight, high-performance TypeScript library for validation, generation, and formatting of Brazilian documents (CPF and CNPJ).

## ✨ Features

- 🏎️ **Ultra-fast**: Minimal overhead and highly optimized algorithms.
- 🛡️ **Type-safe**: Built with TypeScript for excellent IDE support and reliability.
- 📦 **Zero Dependencies**: Keeps your bundle size small.
- 🛠️ **Full Toolkit**: Validate, generate, format, and unformat with ease.
- 📍 **Region-Aware**: CPF generation support for specific Brazilian states.
- 🆔 **Alphanumeric CNPJ**: Full support for the new 2026 CNPJ format.

## 🚀 Installation

```bash
npm install @marcuth/cpfcnpj
# or
yarn add @marcuth/cpfcnpj
# or
pnpm add @marcuth/cpfcnpj
```

## 📖 Usage

### CPF (Cadastro de Pessoas Físicas)

```typescript
import { cpf } from '@marcuth/cpfcnpj';

// Validation
cpf.validate('123.456.789-00'); // false
cpf.validate('52998224725');     // true

// Generation
cpf.generate();                        // '52998224725'
cpf.generate({ formatted: true });       // '529.982.247-25'
cpf.generate({ state: 'SP', formatted: true }); // SP region CPF
```

### CNPJ (Cadastro Nacional da Pessoa Jurídica)

```typescript
import { cnpj } from '@marcuth/cpfcnpj';

// Validation
cnpj.validate('12.345.678/0001-00'); // false
cnpj.validate('11.222.333/0001-81');   // true
cnpj.validate('ABC1D23E/0001-91');     // true (Alphanumeric example)

// Generation
cnpj.generate();                      // '11222333000181'
cnpj.generate({ formatted: true });    // '11.222.333/0001-81'
cnpj.generate({ alphanumeric: true }); // 'ABC1D23E000191'
```

## 🛠️ API Reference

### `cpf` & `cnpj`

Both modules export the following methods:

| Method | Signature | Description |
| :--- | :--- | :--- |
| `validate` | `(value: string) => boolean` | Validates the check digits and format. |
| `generate` | `(options?: GenerateOptions) => string` | Generates a valid document. |
| `format` | `(value: string) => string` | Applies standard formatting (mask). |
| `unformat` | `(value: string) => string` | Removes all non-digit characters. |

#### `GenerateOptions`

- **CPF**: `{ formatted?: boolean, state?: string }`
- **CNPJ**: `{ formatted?: boolean, alphanumeric?: boolean }`

## 🧪 Testing

The library is fully tested with Vitest.

```bash
npm test
```

## 📄 License

Distributed under the [MIT License](LICENSE).

---

Developed with ❤️ by [Marcuth](https://github.com/marcuth)