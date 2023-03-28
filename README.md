
# Boas vindas ao projeto Trybesmith!

O projeto Trybesmith se trata de uma API RESTful que implementa métodos para gerenciar uma loja de itens medievais! Você poderá ~forjar~ cadastrar itens e, após fazer login/cadastro, registrar pedidos no banco de dados. Tudo isso com as boas práticas de POO!

Projeto realizado como parte da grade curricular do curso de Desenvolvimento Web da Trybe[](https://www.betrybe.com/)

## Tecnologias utilizadas

**Node**, **Typescript**, **Express**, **MySQL**

## Instalação

Clone o projeto para sua máquina:

`$ git clone https://github.com/mhps-mtrybe-projeto-trybesmith.git`


## Executando o projeto


<details>
  <summary><h3>Localmente</h3></summary></ br>

  ### Requisitos
  - Node 16
  - Servidor MySQL

  > Na pasta do projeto, instale as dependências:
  - `$ npm i`

  > Tenha um servidor MySQL rodando na porta 3306:
  - Então, rode as queries contidas em *Trybesmith.sql* no servidor para criar e popular o banco de dados

  > Crie um arquivo *.env* na raiz do projeto>
  - O arquivo deve seguir o esquema de varíaveis definidas no arquivo *.env.example*
  - Insira os dados para acessar o banco de dados nas varíaveis, além de uma chave "secret" para gerar seus tokens de validação

  > Rode o projeto:
  - `$ npm start
  
  
</details></ br>

<details>
  <summary><h3>Com Docker</h3></summary></ br>

  ### Requisitos
  - Node 16
  - Docker Compose

  > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `trybesmith` e outro chamado `trybesmith_db`.
  - A partir daqui você pode rodar o container `trybesmith` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it trybesmith bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**]:
  - `$ npm i

  Rode as queries contidas em *Trybesmith.sql* no servidor para criar e popular o banco de dados
  
  
</details>

## Documentação 
<details>
  <summary></summary></ br>

  #### :warning: Parâmetros devem ser passados pelo corpo/body da requisição caso não seja especificado :warning:
  ### Retorna todos os produtos

  ```http
    GET /products
  ```

  Retorna um array com todos os produtos cadastrados.

  Exemplo de resposta:
  ```json
    # HTTP 200
    [
      {
        "id": 1,
        "name": "Poção de cura",
        "amount": "20 gold",
        "orderId": null
      },
      {
        "id": 2,
        "name": "Escudo do Herói",
        "amount": "100 diamond",
        "orderId": 1
      }
    ]
  ```

  ### Cadastra um produto

  ```http
    POST /products
  ```

  | Parâmetro   | Tipo       | Descrição                                   |
  | :---------- | :--------- | :------------------------------------------ |
  | `name`      | `string` | **Obrigatório**. O nome do item. Deve ter mais de 3 caracteres. |
  | `amount`    | `string` | **Obrigatório**. O nome do item. Deve ter mais de 3 caracteres.   |

  Retorna o produto cadastrado e seu id.

  Exemplo de resposta:
  ```json
    # HTTP 201
      {
        "id": 1,
        "name": "Poção de cura",
        "amount": "20 gold",
        "orderId": null
      }
  ```

  ### Cadastra um novo usuário

  ```http
    POST /users
  ```

  | Parâmetro   | Tipo       | Descrição                                   |
  | :---------- | :--------- | :------------------------------------------ |
  | `username`      | `string` | **Obrigatório**. O nome do usuário. Deve ter mais de 3 caracteres. |
  | `vocation`    | `string` | **Obrigatório**. A vocação. Deve ter mais de 3 caracteres.   |
  | `level`      | `number` | **Obrigatório**. O level do usuário. Deve ser maior que 0. |
  | `password`    | `string` | **Obrigatório**. A senha do usuário. Mínimo de 8 caracteres.   |

  Recebe dados de um usuário e retorna JSON Web Token para autenticação em certos métodos.

  Exemplo de resposta:

  ```json
    # HTTP 201
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
        SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
  ```

  ### Faz login de um usuário

  ```http
    POST /login
  ```

  | Parâmetro   | Tipo       | Descrição                                   |
  | :---------- | :--------- | :------------------------------------------ |
  | `username`      | `string` | **Obrigatório**. O nome do usuário. |
  | `password`    | `string` | **Obrigatório**. A senha do usuário.   |

  Recebe dados de um usuário e retorna JSON Web Token para autenticação em certos métodos.

  Exemplo de resposta:

  ```json
    # HTTP 200
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
        SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
  ```

  ### Retorna todos os pedidos

  ```http
    GET /orders
  ```

  Retorna um array com todos os pedidos cadastrados.

  Exemplo de resposta:
  ```json
    # HTTP 200
    [
      {
        "id": 1,
        "userId": 2,
        "productsIds": [1, 2]
      },
      {
        "id": 2,
        "userId": 1,
        "productsIds": [3, 4]
      }
    ]
  ```

  ### Cadastra um novo pedido

  ```http
    POST /orders
  ```

  | Header   | Tipo       | Descrição                                   |
  | :---------- | :--------- | :------------------------------------------ |
  | `Authorization`      | `JSON Web Token` | **Obrigatório**. Token para validação do usuário. |

  | Parâmetro   | Tipo       | Descrição                                   |
  | :---------- | :--------- | :------------------------------------------ |
  | `productsIds`      | `array[number]` | **Obrigatório**. IDs de produtos a serem relacionados ao pedido. |

  Recebe IDs de produtos para serem relacionados ao novo pedido feito pelo usuário autenticado.

  Exemplo de resposta:
  ```json
    # HTTP 201
    {
      "userId": 1,
      "productsIds": [1, 2]
    }
  ```
  </details>

  ## Sobre mim

  Sou um desenvolvedor back-end júnior.
   - LinkedIn[](https://www.linkedin.com/in/miguel-soares-dev/)
