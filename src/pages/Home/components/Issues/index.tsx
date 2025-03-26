// import { dateFormatter } from "../../../../utils/formatter";
import { useEffect, useState } from "react";
import { IssuesCard, IssuesContainer, StyledNavLink } from "./styles";
import axios from "axios";

export async function getGitHubIssues(username: string, repo: string) {
  const issueApi = axios.create({
    baseURL: "https://api.github.com/repos/", // URL base para as requisições
    timeout: 5000, // Tempo máximo para a requisição
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo para a requisição
    },
  });

  try {
    const response = await issueApi.get(`${username}/${repo}/issues`);
    // console.log(response.data)
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao buscar issues:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

export function Issues({ username, repo }: { username: string; repo: string }) {
  const [issues, setIssues] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getGitHubIssues(username, repo).then((data) => {
      if (data) {
        setIssues(data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Aguarde, carregando os issues...</div>;
  }

  if (issues.length === 0) {
    return <div>Nenhum issue encontrado</div>;
  }

  return (
    <IssuesContainer>
      {issues.map((issue: any) => (
        <IssuesCard key={issue.id}>
          <StyledNavLink
            to={`https://github.com/${username}/${repo}/issues/${issue.number}`}
            target="_blank"
          >
            <div>
              <h2>{issue.title}</h2>
              <span>{new Date(issue.created_at).toLocaleDateString()}</span>
            </div>
          </StyledNavLink>

          <p>{issue.body ? issue.body.substring(0, 100) : "Sem descrição"}</p>
        </IssuesCard>
      ))}
    </IssuesContainer>
  );
}
