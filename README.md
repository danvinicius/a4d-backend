# A4D API

## Sobre
API feita em NodeJS/ExpressJs, utilizando MongoDB e consumida via Axios pelo website <a href="https://a4d-project.herokuapp.com">A4D</a> .
<br/>

<div style="display: inline_block"><br>
    <img align="center" alt="NodeJS" title="NodeJS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg">
    <img align="center" alt="ExpressJS" title="ExpressJS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg">
    <img align="center" alt="MongoDB" title="MongoDB" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg">
</div>
<br/>

## Status do projeto
<h4> 
	🚧 A4D API 🚀 Em construção... 🚧
</h4>
<br/><br/>

## Documentação
### Endpoints do controller de usuários
### GET /user/:email
Endpoint que retorna um único usuário pelo seu email.
#### Respostas
##### 200 - Ok!
Retorna o usuário com sucesso
##### 400 - Requisição inválida
Caso não seja passado um email como parâmetro
##### 404 - Não encontrado
Caso o usuário não exista
##### 500 - Erro interno do servidor
Caso aconteça algum erro no servidor

### POST /user/login
Endpoint que faz a autenticação do usuário.
#### Respostas
##### 200 - Ok!
Caso o login aconteça com sucesso, retorna o token de acesso do usuário
##### 400 - Requisição inválida
Caso não seja passado email ou senha no body da requisição
##### 401 - Falha na autenticação
Caso a senha passada no body da requisição seja inválida
##### 401 - Falha na autenticação
Caso aconteça algum erro durante a criptografia do token
##### 404 - Não encontrado
Caso o usuário não exista
##### 500 - Erro interno do servidor
Caso aconteça algum erro no servidor

### POST /user/register
Endpoint que cadastra um novo usuário no banco de dados
#### Respostas
##### 200 - Ok!
Caso o usuário seja criado com sucesso, retorna o token de acesso do usuário
##### 400 - Requisição inválida
Caso não seja passado nome, email ou senha na requisição
##### 401 - Falha na autenticação
Caso aconteça algum erro durante a criptografia do token
##### 406 - Não aceitável
Caso o usuário já exista
##### 500 - Erro interno do servidor
Caso aconteça algum erro no servidor

### POST /user/recoverpassword
Endpoint que envia um email de recuperação de senha para o usuário
#### Respostas
##### 200 - Ok!
Caso o email seja enviado com sucesso
##### 400 - Requisição inválida
Caso o email não seja passado através do body da requisição
##### 404 - Não encontrado
Caso o usuário não exista
##### 500 - Erro interno do servidor
Caso aconteça algum erro no servidor

### POST /user/validaterecovercode
Endpoint que valida o código de recuperação de senha
#### Respostas
##### 200 - Ok!
Caso o código seja válido, retorna o email do usuário para a troca da senha
##### 400 - Requisição inválida
Caso não seja passado o email ou o código de recuperação através do body da requisição
##### 401 - Falha na autenticação
Caso o código de recuperação seja inválido
##### 404 - Não encontrado
Caso o usuário não exista
##### 500 - Erro interno do servidor
Caso aconteça algum erro no servidor ou durante o envio do email

### POST /user/validate
Endpoint que valida o token de acesso antes de entrar na página home do usuário
#### Respostas
retorna apenas um json com o nome, email e id do usuário, que será armazenado no localStorage

### PATCH /user/changepassword
Endpoint que altera a senha do usuário
#### Respostas
##### 200 - Ok!
Caso a senha seja alterada com sucesso, retorna o token de acesso do usuário
##### 400 - Requisição inválida
Caso não seja passado o email ou a nova senha através da requisição
##### 401 - Falha na autenticação
Caso aconteça algum erro durante a criptografia do token
##### 404 - Não encontrado
Caso o usuário não exista
##### 500 - Erro interno do servidor
Caso aconteça algum erro no servidor

### DELETE /user/:id
Endpoint que deleta o usuário do banco de dados
#### Respostas
##### 200 - Ok!
Caso o usuário seja deletado com sucesso
##### 400 - Requisição inválida
Caso não seja passado um id como parâmetro
##### 404 - Não encontrado
Caso o usuário não exista
##### 500 - Erro interno do servidor
Caso aconteça algum erro no servidor


<br/>
Baixe o <a href="https://git-scm.com/">GIT</a>, <a href="https://nodejs.org/en/">NodeJS</a> e <a href="https://cli.vuejs.org/">Vue CLI</a> na sua máquina.
<br/><br/>
<b>Autor:</b> <a href="https://beacons.ai/danvinicius">Daniel Vinícius</a>
