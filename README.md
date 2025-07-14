# Excalidraw Desktop

Uma aplicação desktop do Excalidraw construída com Electron e React, permitindo criar e editar diagramas offline com uma interface familiar.

## 🚀 Tecnologias Utilizadas

- **Electron** - Framework para aplicações desktop
- **React** - Biblioteca para interface do usuário
- **Vite** - Build tool e bundler
- **Excalidraw** - Biblioteca de desenho e diagramação
- **Node.js** - Runtime JavaScript

## ✨ Funcionalidades

- **Desenho Livre**: Crie diagramas, fluxogramas e desenhos técnicos
- **Salvar/Abrir Arquivos**: Salve seus desenhos em formato `.excalidraw`
- **Menu Nativo**: Interface de menu nativa do sistema operacional
- **Atalhos de Teclado**: 
  - `Ctrl/Cmd + S` - Salvar arquivo
  - `Ctrl/Cmd + O` - Abrir arquivo
- **Tela Cheia**: Interface otimizada para ocupar toda a tela disponível

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta do projeto
cd excalidraw-desktop

# Instale as dependências
npm install
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Em outro terminal, inicie a aplicação Electron
npm run electron
```

### Build para Produção
```bash
# Construa a aplicação
npm run build

# Execute a aplicação construída
npm run electron
```

## 📁 Estrutura do Projeto

```
excalidraw/
├── src/
│   ├── App.jsx          # Componente principal React
│   └── main.jsx         # Ponto de entrada React
├── main.js              # Processo principal Electron
├── preload.js           # Script de pré-carregamento
├── index.html           # Template HTML
├── vite.config.js       # Configuração Vite
└── package.json         # Dependências e scripts
```

## 🎨 Interface

A aplicação oferece uma experiência de desenho completa com:
- Ferramentas de desenho (linha, retângulo, círculo, texto)
- Seleção e edição de elementos
- Zoom e pan
- Paleta de cores
- Ferramentas de alinhamento

## 💾 Formato de Arquivo

Os desenhos são salvos no formato `.excalidraw`, que é um JSON estruturado contendo:
- Elementos do desenho (formas, linhas, texto)
- Estado da aplicação (zoom, posição, cores)
- Metadados do arquivo

## 🔧 Desenvolvimento

### Scripts Disponíveis
- `npm run dev` - Inicia servidor de desenvolvimento Vite
- `npm run build` - Constrói a aplicação para produção
- `npm run electron` - Inicia a aplicação Electron
- `npm run preview` - Visualiza o build de produção

### Comunicação entre Processos
A aplicação utiliza IPC (Inter-Process Communication) do Electron para:
- Abrir e salvar arquivos através de diálogos nativos
- Comunicação entre o processo principal e o renderer
- Integração com menus do sistema operacional

## 📝 Notas

Este projeto foi desenvolvido com assistência de IA e revisado manualmente para garantir qualidade e funcionalidade.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Desenvolvido usando IA e revisado manualmente** 