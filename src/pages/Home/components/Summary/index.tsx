import { SummaryAnchors, SummaryContainer, SummaryHeader } from "./styles";
import { ArrowUpRight, Buildings, GithubLogo, Users } from "phosphor-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Issues } from "../Issues";

export async function getGitHubUser(username: string) {
  const userApi = axios.create({
    baseURL: "https://api.github.com/users/", // URL base para as requisições
    timeout: 5000, // Tempo máximo para a requisição
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo para a requisição
    },
  });

  try {
    const response = await userApi.get(`${username}`);
    return {
      avatar: response.data.avatar_url,
      nome: response.data.name || "Não informado",
      bio: response.data.bio || "Sem descrição",
      login: response.data.login,
      profissao: response.data.company || "Não informado",
      seguidores: response.data.followers,
    };
  } catch (error: any) {
    console.error(
      "Erro ao buscar usuário:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

export function Summary() {
  // "https://api.github.com/users", "/lucaspedronet"
  // "https://api.github.com/search"
  // "https://api.github.com/repos/lucaspedronet/TudoLista/issues"

  const [userData, setUserData] = useState<any>(null); // Estado que armazena os dados da API
  const [loading, setLoading] = useState<boolean>(true); // Estado que controla o carregamento

  const username = "lucaspedronet";
  const repositorio = "BlogProfileGitHub";

  useEffect(() => {
    getGitHubUser(username).then((data) => {
      if (data) {
        setUserData(data); // Atualiza o estado dos dados do usuário
      }
      setLoading(false); // Finaliza o carregamento
    });
  }, []); // Executa apenas uma vez o componente

  if (loading) {
    return <div> Aguarde, carregando os dados do GitHub...</div>;
  }

  if (!userData) {
    return <div> Usuário não encontrado</div>;
  }

  return (
    <>
      <SummaryContainer>
        <img src={userData.avatar} alt="Avatar do GitHub" />
        <section>
          <SummaryHeader>
            <h1>{userData.nome}</h1>
            <a href={`https://github.com/${userData.login}`} target="_blank">
              GITHUB
              <ArrowUpRight size={12} />
            </a>
          </SummaryHeader>

          <p>{userData.bio}</p>

          <SummaryAnchors>
            <div>
              <GithubLogo size={18} />
              <span>{userData.login}</span>
            </div>

            <div>
              <Buildings size={18} />
              <span>{userData.profissao}</span>
            </div>

            <div>
              <Users size={18} />
              <span>{userData.seguidores} seguidores</span>
            </div>
          </SummaryAnchors>
        </section>
      </SummaryContainer>

      <div>
        <h2 style={{ padding: "1rem 0" }}>Issues do projeto {repositorio}</h2>
        <Issues username={userData.login} repo={repositorio} />
      </div>
    </>
  );
}
