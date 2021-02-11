# Alugaliza

Projeto para utilização de conceitos de front-end com o contexto de aluguel de carros:

## Sobre o projeto

Alguns pontos foram levados em consideração para definição dos itens utilizados no projeto. A ideia principal era isolar em camadas onde fosse possível manter as regras de negócio, as regras de apresentação, e as integrações com serviços em camadas separados.

Para a camada de apresentação foi utilizado Angular. Para tomar a decisão foi levado em consideração a familiaridade com o framework e a adoção em projetos onde atuo. Para auxiliar foram usados alguns pacotes como o [angular-material](https://material.angular.io/guide/getting-started), [ngx-mask](https://jsdaddy.github.io/ngx-mask-page/main) e [angular-notifier](https://www.npmjs.com/package/angular-notifier).

Para isolar a camada de negócio foi usado o [NgRx](https://ngrx.io/docs) com somente um Store. O [NgRx](https://ngrx.io/docs) usa o padrão Redux para organizar o state, actions e reducers. Ele também permite a utilização de múltiplos stores, porém, com o objetivo de reduzir a complexidade e de cumprir os requisitos do projeto foi escolhida a abordagem de somente um store.

Outro ponto importante foi o uso de uma extensão do [NgRx/Effects](https://ngrx.io/guide/effects) para tratamento de efeitos colaterais. Essa extensão permite tratar regras, integrações, redirecionar fluxos, entres outras coisas antes que a actions cheguem nos reducers.

O controle de estado também foi usado na autenticação e na autorização. Após o login é usado um metareducer que intercepta a ação e grava as informações do usuário, após isso um AuthGuad controla o acesso às rotas permitidas. No mesmo contexto de rotas, foi usado o LazyLoad para carregamento dos módulos. Também era interesse em implementar o LazyLoad para alguns componentes reutilizáveis, mas não foi priorizado.

Para desenvolvimento e teste da aplicação foi usado o pacote NPM [json-server](https://www.npmjs.com/package/json-server) que simula uma API Rest a partir de um arquivo Json. Foi adicionado um middleware que adiciona um delay de 1s na chamada para simular um cenário real.

Para melhorar a qualidade do código durante o processo foi utilizado o [husky](https://www.npmjs.com/package/husky) e padronizado os commits e pushs com ações de lint e validação de cobertura de código. Para os testes unitários foi utilizado o jest.

**IMPORTANTE**

- Para teste da aplicação a senha não é validada no login devido a api ser feita como um mock.
- Alguns pontos necessitam de testes complementares que serão repriorizados após avaliação do projeto.

## Angular CLI

Este projeto foi gerado pelo [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Execução do projeto

Para executar do projeto é necessário instalar as depedencias com o comando `npm ci`. Após a instalação dos pacotes é necessário executar o script de inicialização `npm run start`.

## Scripts

- `db` inicia a api rest com os dados do banco de dados no arquivo json
- `build` compila a aplicação
- `lint` executa a análise de código
- `ng` script que escpsula o próprio script do angular CLI
- `postinstall` configura o husky após a instalação das dependências
- `start` script que inicia aplicação (executa a API Rest e o aplicação Front-End)
- `test` executa os testes da aplicação
- `test:watch` executa os testes da aplicação e continua observando alterações de arquivos
- `test:coverage` executa os testes e gera o relatório de cobertura

## Itens utilizados no projeto

- [angular-material](https://material.angular.io/guide/getting-started)
- [angular-notifier](https://www.npmjs.com/package/angular-notifier)
- [husky](https://www.npmjs.com/package/husky)
- [json-server](https://www.npmjs.com/package/json-server)
- [NgRx](https://ngrx.io/docs)
- [NgRx/Effects](https://ngrx.io/guide/effects)
- [ngx-mask](https://jsdaddy.github.io/ngx-mask-page/main)
