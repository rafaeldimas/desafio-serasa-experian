# Desafio Serasa Experian

## Iniciando a Aplicação com Docker e Docker Compose

Siga os passos abaixo para iniciar a aplicação utilizando Docker e Docker Compose.

### Pré-requisitos

- **Docker**: Verifique a instalação com `docker --version`.
- **Docker Compose**: Verifique a instalação com `docker compose --version`.

### Passos para Iniciar

1. **Construir as Imagens Docker**  
   No diretório raiz do projeto, execute o comando a seguir para construir as imagens necessárias:

   ```bash
   docker compose build
   ```

2. **Iniciar os Containers**  
   Após construir as imagens, inicie os containers executando:

   ```bash
   docker compose up
   ```

3. **Acessar a Aplicação**  
   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000) (ou na porta especificada no `docker-compose.yml`).

4. **Parar a Aplicação**  
   Para parar a aplicação e remover os containers, utilize:
   ```bash
   docker compose down
   ```

### Observações

- Certifique-se de que todas as variáveis de ambiente necessárias estão configuradas corretamente antes de iniciar a aplicação. Consulte o arquivo `.env.example` para verificar as variáveis de ambiente que precisam ser definidas.

- **Documentação com Swagger**  
  A documentação da API, gerada pelo Swagger, estará disponível em [http://localhost:3000/docs](http://localhost:3000/docs) (ou na porta especificada no `docker-compose.yml`).

- **Testes Automatizados**
  Para executar os testes automatizados, execute o comando:

  ```bash
  npm run test
  ```

- **Acessar os logs**
  Para acessar os logs das aplicações, execute o comando:
  ```bash
  docker compose logs app
  ```
