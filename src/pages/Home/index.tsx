import { useEffect, useState } from "react";
import { Issues } from "./components/Issues";
import { Summary } from "./components/Summary";
import { HomeContainer, IssuesAside } from "./styles";
import { api } from "../../lib/api";

interface searchIssue{
  incomplete_results: boolean;
  items: [];
  total_count: number
}

interface Issue {
  number: number;
  title: string;
  body: string;
  created_at: string;
}

export function Home() {
  const [issuesData, setIssuesData] = useState<Issue[]>([]);

  async function fetchIssues() {
    const response = await api.get<searchIssue>("search/issues?q=repo:lucaspedronet/BlogProfileGitHub");
    console.log(response.data)
    setIssuesData(response.data.items);
  }

  useEffect(() => {
    fetchIssues();
  }, []);

  if (issuesData.length == 0)
    return <div>Não existe issue nesse repositório</div>;

  return (
    <HomeContainer>
      <Summary />
      <IssuesAside>
        {issuesData.map( (issues : Issue) => (
          <Issues
            number={issues.number}
            title={issues.title}
            body={issues.body}
            create_at={issues.created_at}
          />
        ))
        }
      </IssuesAside>
    </HomeContainer>
  );
}
