# cpfcnpj

[![npm version](https://img.shields.io/npm/v/cpfcnpj.svg?style=flat-square)](https://www.npmjs.com/package/cpfcnpj)
[![npm downloads](https://img.shields.io/npm/dm/cpfcnpj.svg?style=flat-square)](https://www.npmjs.com/package/cpfcnpj)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A lightweight, high-performance TypeScript library for validation, generation, and formatting of Brazilian documents (CPF and CNPJ).

## ✨ Features

- 🏎️ **Ultra-fast**: Minimal overhead and highly optimized algorithms.
- 🛡️ **Type-safe**: Built with TypeScript for excellent IDE support and reliability.
- 📦 **Zero Dependencies**: Keeps your bundle size small.
- 🛠️ **Full Toolkit**: Validate, generate, format, and unformat with ease.
- 📍 **Region-Aware**: CNPJ generation support for specific Brazilian states.
- 🆔 **Alphanumeric CNPJ**: Full support for the new 2026 CNPJ format.

## 🚀 Installation

```bash
npm install cpfcnpj
# or
yarn add cpfcnpj
# or
pnpm add cpfcnpj
```

## 📖 Usage

### CPF (Cadastro de Pessoas Físicas)

```typescript
import { cpf } from 'cpfcnpj';

// Validation
cpf.validate('123.456.789-00'); // false
cpf.validate('52998224725');     // true

// Generation
cpf.generate();                 // '52998224725'
cpf.generate({ formatted: true }); // '529.982.247-25'

// Formatting
cpf.format('52998224725');      // '529.982.247-25'
cpf.unformat('529.982.247-25'); // '52998224725'
```

### CNPJ (Cadastro Nacional da Pessoa Jurídica)

```typescript
import { cnpj } from 'cpfcnpj';

// Validation
cnpj.validate('12.345.678/0001-00'); // false
cnpj.validate('11.222.333/0001-81');   // true
cnpj.validate('ABC1D23E/0001-91');     // true (Alphanumeric example)

// Generation
cnpj.generate();                      // '11222333000181'
cnpj.generate({ formatted: true });    // '11.222.333/0001-81'
cnpj.generate({ alphanumeric: true }); // 'ABC1D23E000191'
cnpj.generate({ state: 'SP', formatted: true }); // SP region CNPJ

// Formatting
cnpj.format('11222333000181');         // '11.222.333/0001-81'
cnpj.unformat('11.222.333/0001-81');    // '11222333000181'
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

- **CPF**: `{ formatted?: boolean }`
- **CNPJ**: `{ formatted?: boolean, state?: string, alphanumeric?: boolean }`

## 🧪 Testing

The library is fully tested with Vitest.

```bash
npm test
```

## 📄 License

Distributed under the [MIT License](LICENSE).

---

Developed with ❤️ by [Marcuth](https://github.com/marcuth)