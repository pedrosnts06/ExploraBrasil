function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}

function iniciarCarregamento(botao, resultado) {
    botao.disabled = true;
    botao.textContent = "Carregando...";
    resultado.innerHTML =
        "<p class='text-primary'>Buscando informações...</p>";
}

function finalizarCarregamento(botao, textoOriginal) {
    botao.disabled = false;
    botao.textContent = textoOriginal;
}
async function buscarAPI(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`);
    }

    return await resposta.json();
}

async function consultarCEP() {

    const cep = document.getElementById("cep").value.trim();
    const resultado = document.getElementById("resultadoCEP");
    const botao = document.getElementById("btnCEP");
    if (!/^\d{8}$/.test(cep)) {
        resultado.innerHTML =
            "<p class='text-danger'>Digite um CEP válido com 8 números.</p>";
        return;
    }
    iniciarCarregamento(botao, resultado);

    try {

        const dados = await buscarAPI(
            `https://viacep.com.br/ws/${cep}/json/`
        );
        if (dados.erro) {
            resultado.innerHTML =
                "<p class='text-danger'>CEP não encontrado.</p>";
            return;
        }
        resultado.innerHTML = `
            <div class="alert alert-success">
                <h5>Endereço encontrado!</h5>

                <p><strong>CEP:</strong> ${escaparHTML(dados.cep)}</p>

                <p><strong>Logradouro:</strong>
                ${escaparHTML(dados.logradouro)}</p>

                <p><strong>Bairro:</strong>
                ${escaparHTML(dados.bairro)}</p>

                <p><strong>Cidade:</strong>
                ${escaparHTML(dados.localidade)}</p>

                <p><strong>Estado:</strong>
                ${escaparHTML(dados.uf)}</p>
            </div>
        `;

    } catch (erro) {

        resultado.innerHTML =
            "<p class='text-danger'>Não foi possível consultar o CEP. Verifique sua conexão e tente novamente.</p>";

        console.error("Erro ao consultar CEP:", erro);

    } finally {

        finalizarCarregamento(botao, "Consultar CEP");

    }
}

async function consultarDDD() {

    const ddd = document.getElementById("ddd").value.trim();
    const resultado = document.getElementById("resultadoDDD");
    const botao = document.getElementById("btnDDD");
    if (!/^\d{2}$/.test(ddd)) {
        resultado.innerHTML =
            "<p class='text-danger'>Digite um DDD com 2 números.</p>";
        return;
    }

    iniciarCarregamento(botao, resultado);
    try {

        const dados = await buscarAPI(
            `https://brasilapi.com.br/api/ddd/v1/${ddd}`
        );
        if (!dados.cities || dados.cities.length === 0) {
            resultado.innerHTML =
                "<p class='text-warning'>Nenhuma cidade encontrada.</p>";
            return;
        }
        const cidades = dados.cities
            .map(cidade => `<li>${escaparHTML(cidade)}</li>`)
            .join("");

        resultado.innerHTML = `
            <div class="alert alert-success">

                <h5>Informações do DDD</h5>

                <p><strong>DDD:</strong> ${escaparHTML(ddd)}</p>

                <p><strong>Estado:</strong>
                ${escaparHTML(dados.state)}</p>

                <p><strong>Cidades encontradas:</strong></p>

                <ul>
                    ${cidades}
                </ul>

            </div>
        `;

    } catch (erro) {

        resultado.innerHTML =
            "<p class='text-danger'>DDD não encontrado ou serviço indisponível. Verifique sua conexão e tente novamente.</p>";

        console.error("Erro ao consultar DDD:", erro);

    } finally {

        finalizarCarregamento(botao, "Consultar DDD");

    }
}

async function consultarFeriados() {

    const ano = document.getElementById("ano").value.trim();
    const resultado = document.getElementById("resultadoFeriados");
    const botao = document.getElementById("btnFeriados");
    if (!/^\d{4}$/.test(ano) ||
        Number(ano) < 1900 ||
        Number(ano) > 2100) {

        resultado.innerHTML =
            "<p class='text-danger'>Digite um ano válido entre 1900 e 2100.</p>";

        return;
    }

    iniciarCarregamento(botao, resultado);

    try {

        const dados = await buscarAPI(
            `https://brasilapi.com.br/api/feriados/v1/${ano}`
        );
        if (!Array.isArray(dados) || dados.length === 0) {

            resultado.innerHTML =
                "<p class='text-warning'>Nenhum feriado encontrado.</p>";

            return;
        }
        const feriados = dados.map(feriado => `
            <tr>
                <td>${escaparHTML(feriado.date)}</td>
                <td>${escaparHTML(feriado.name)}</td>
            </tr>
        `).join("");

        resultado.innerHTML = `
            <div class="table-responsive">

                <h5>Feriados de ${escaparHTML(ano)}</h5>

                <table class="table table-striped table-bordered">

                    <thead class="table-dark">
                        <tr>
                            <th>Data</th>
                            <th>Feriado</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${feriados}
                    </tbody>

                </table>

            </div>
        `;

    } catch (erro) {
        resultado.innerHTML =
            "<p class='text-danger'>Não foi possível consultar os feriados. Verifique o ano ou tente novamente mais tarde.</p>";

        console.error("Erro ao consultar feriados:", erro);
    } finally {

        finalizarCarregamento(botao, "Consultar feriados");
    }
}

async function consultarEstados() {
    const resultado = document.getElementById("resultadoEstados");
    const botao = document.getElementById("btnEstados");
    iniciarCarregamento(botao, resultado);
    try {

        const dados = await buscarAPI(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        if (!Array.isArray(dados) || dados.length === 0) {

            resultado.innerHTML =
                "<p class='text-warning'>Nenhum estado encontrado.</p>";

            return;
        }
        dados.sort((a, b) => a.nome.localeCompare(b.nome));
        const estados = dados.map(estado => `
            <tr>
                <td>${escaparHTML(estado.nome)}</td>
                <td>${escaparHTML(estado.sigla)}</td>
                <td>${escaparHTML(estado.regiao.nome)}</td>
            </tr>
        `).join("");

        resultado.innerHTML = `
            <div class="table-responsive">

                <h5>Estados brasileiros encontrados: ${dados.length}</h5>

                <table class="table table-striped table-bordered">

                    <thead class="table-dark">
                        <tr>
                            <th>Estado</th>
                            <th>UF</th>
                            <th>Região</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${estados}
                    </tbody>

                </table>

            </div>
        `;

    } catch (erro) {

        resultado.innerHTML =
            "<p class='text-danger'>Não foi possível carregar os estados. Verifique sua conexão e tente novamente.</p>";

        console.error("Erro ao consultar estados:", erro);

    } finally {

        finalizarCarregamento(botao, "Listar estados");

    }
}