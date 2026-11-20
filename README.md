# Explora Brasil

## Sobre o projeto

O Explora Brasil é um site desenvolvido para consultar informações sobre o Brasil por meio de APIs públicas. A aplicação permite pesquisar endereços pelo CEP, consultar informações de DDDs, visualizar feriados nacionais e listar os estados brasileiros.

O projeto foi desenvolvido como atividade prática de consumo de APIs públicas, utilizando HTML, CSS e JavaScript.

## Integrantes

- **Nome completo:** João Pedro Vieira dos Santos
- **Matrícula:** 202410821 

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.3
- Fetch API
- Visual Studio Code

## APIs utilizadas

| API | Endpoint | Método | Finalidade |

| ViaCEP | `https://viacep.com.br/ws/{cep}/json/` | GET | Consultar endereço por CEP |
| BrasilAPI | `https://brasilapi.com.br/api/ddd/v1/{ddd}` | GET | Consultar estado e cidades de um DDD |
| BrasilAPI | `https://brasilapi.com.br/api/feriados/v1/{ano}` | GET | Consultar feriados nacionais de um ano |
| IBGE | `https://servicodados.ibge.gov.br/api/v1/localidades/estados` | GET | Listar os estados brasileiros |

## Funcionalidades

- Consulta de endereço por CEP.
- Consulta de informações por DDD.
- Consulta dos feriados nacionais por ano.
- Listagem dos estados brasileiros, suas siglas e regiões.
- Validação dos dados informados pelo usuário.
- Exibição de mensagens de carregamento e de erro.
- Interface responsiva para diferentes tamanhos de tela.

## Tratamento de erros

A aplicação possui validações para evitar consultas com dados inválidos. Também apresenta mensagens para situações como falhas de conexão, erros HTTP e ausência de resultados.

Durante as consultas, os botões são desabilitados temporariamente para evitar solicitações repetidas.

## Estrutura do projeto

Os arquivos estão organizados na raiz do repositório:

```text
ExploraBrasil/
├── index.html
├── estilo.css
├── app.js
└── README.md
```

## Como executar o projeto

1. Acesse o repositório no GitHub.
2. Baixe os arquivos ou clone o repositório.
3. Abra a pasta do projeto no Visual Studio Code.
4. Abra o arquivo `index.html` no navegador.
5. Utilize os campos disponíveis para realizar as consultas.

É necessária conexão com a internet para consumir as APIs públicas.

## Links do projeto

- **Site publicado:** https://pedrosnts06.github.io/ExploraBrasil/
- **Repositório GitHub:** https://github.com/pedrosnts06/ExploraBrasil
- **Video de apresentação:** ...
## Framework CSS

Foi utilizado o **Bootstrap 5.3.3** para auxiliar na construção do layout, organização dos componentes e responsividade da aplicação.

## Considerações finais

O desenvolvimento do Explora Brasil permitiu praticar o consumo de APIs públicas utilizando JavaScript e Fetch API, além de trabalhar com validação de dados, tratamento de erros, organização de arquivos e publicação de uma aplicação web no GitHub Pages.
