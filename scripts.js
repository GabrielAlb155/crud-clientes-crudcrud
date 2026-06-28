// URL da API do CrudCrud
const API_URL = "https://crudcrud.com/api/5ecb3b6b1faf43e0a08f11583354ecd7/clientes";

// Pegando os elementos do HTML pelo ID
const formCliente = document.getElementById("formCliente");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const listaClientes = document.getElementById("listaClientes");
const mensagem = document.getElementById("mensagem");

// Quando a página carregar, já lista os clientes cadastrados
window.addEventListener("load", listarClientes);

// Evento de envio do formulário
formCliente.addEventListener("submit", function (event) {
  // Impede a página de recarregar ao clicar no botão
  event.preventDefault();

  // Chama a função para cadastrar cliente
  cadastrarCliente();
});

// Função para cadastrar cliente usando POST
async function cadastrarCliente() {
  // Criando um objeto cliente com nome e email
  const cliente = {
    nome: nomeInput.value,
    email: emailInput.value
  };

  try {
    // fetch faz a requisição para a API
    const resposta = await fetch(API_URL, {
      method: "POST", // POST cria um novo cadastro
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente) // Transforma o objeto JS em JSON
    });

    // Se a resposta não for OK, mostra erro
    if (!resposta.ok) {
      throw new Error("Erro ao cadastrar cliente.");
    }

    mensagem.textContent = "Cliente cadastrado com sucesso!";

    // Limpa os campos depois de cadastrar
    nomeInput.value = "";
    emailInput.value = "";

    // Atualiza a lista na tela
    listarClientes();

  } catch (erro) {
    console.log(erro);
    mensagem.textContent = "Erro ao cadastrar cliente.";
  }
}

// Função para listar clientes usando GET
async function listarClientes() {
  try {
    // GET busca os dados da API
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Erro ao listar clientes.");
    }

    // Converte a resposta JSON em array de clientes
    const clientes = await resposta.json();

    // Limpa a lista antes de montar novamente
    listaClientes.innerHTML = "";

    // Para cada cliente recebido da API, cria um item na tela
    clientes.forEach(function (cliente) {
      const item = document.createElement("li");

      item.innerHTML = `
        <span>
          <strong>${cliente.nome}</strong><br>
          ${cliente.email}
        </span>

        <button onclick="excluirCliente('${cliente._id}')">
          Excluir
        </button>
      `;

      listaClientes.appendChild(item);
    });

  } catch (erro) {
    console.log(erro);
    mensagem.textContent = "Erro ao carregar clientes.";
  }
}

// Função para excluir cliente usando DELETE
async function excluirCliente(id) {
  try {
    // DELETE remove um cliente específico pelo _id
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!resposta.ok) {
      throw new Error("Erro ao excluir cliente.");
    }

    mensagem.textContent = "Cliente excluído com sucesso!";

    // Atualiza a lista após excluir
    listarClientes();

  } catch (erro) {
    console.log(erro);
    mensagem.textContent = "Erro ao excluir cliente.";
  }
}