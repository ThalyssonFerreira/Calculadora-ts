# 🧮 Calculadora Simples (HTML/CSS + TypeScript)

Uma calculadora básica para operações matemáticas, feita com **Vite + TypeScript**.  
Projeto pensado para portfólio/currículo de estágio ou dev júnior.

---

## 🚀 Funcionalidades
- ✅ Operações: soma, subtração, multiplicação e divisão
- ✅ Teclado físico e botões na tela
- ✅ Exibição do resultado em tempo real
- ✅ Histórico de cálculos (armazenado no `localStorage`)
- ✅ Data e hora em cada item do histórico
- ✅ Botão para limpar histórico
- ✅ Interface responsiva (mobile/desktop)
- ✅ Acessibilidade (`aria-label`, `aria-live`)
- ✅ Testes unitários com **Vitest**

---

## 🛠 Tecnologias usadas
- [Vite](https://vitejs.dev/) (build e dev server)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) (testes)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)

---

## 📂 Estrutura do projeto
```
calculadora-ts/
│
├── index.html
├── src/
│   ├── main.ts         # Lógica da interface e histórico
│   ├── evaluate.ts     # Função de cálculo
│   └── styles.css      # Estilo da calculadora
├── tests/
│   └── evaluate.test.ts # Testes da função evaluate()
├── package.json
└── vite.config.ts
```

---

## ▶️ Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar em modo desenvolvimento
npm run dev

# rodar testes
npm run test

# gerar versão de produção
npm run build

# pré-visualizar a versão de produção
npm run preview
```

---

## 🧪 Testes
Rodar os testes unitários:

```bash
npm run test
```

Exemplo de saída:

```
 ✓ tests/evaluate.test.ts (6 tests)
   ✓ soma
   ✓ precedência
   ✓ parênteses
   ✓ flutuante
   ✓ divisão por zero → inválida
   ✓ expressão inválida
```

---

## 🌐 Deploy

Confira a demo online: [Calculadora Simples](https://calculadora-ts-olive.vercel.app/)

---

## 📜 Licença
MIT — fique à vontade para usar e adaptar.
