import { SummaryAnchors, SummaryContainer, SummaryHeader } from "./styles";
import { ArrowUpRight, Buildings, GithubLogo, Users } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../../../../lib/api";

interface User {
  avatar_url: string;
  bio: string;
  company: string;
  followers: number;
  login: string;
  name: string;
}

// 4148bec073bade264375123827ee83dd6812221c
export function Summary() {
  const [user, setUser] = useState<User | null>(null);

  async function fetchUser() {
    const response = await api.get<User>("/users/lucaspedronet");
    setUser(response.data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // "https://api.github.com/users", "/lucaspedronet"
  // "https://api.github.com/search"
  // "https://api.github.com/repos/lucaspedronet/TudoLista/issues"

  return (
    <SummaryContainer>
      <img src={user?.avatar_url} />
      <section>
        <SummaryHeader>
          <h1>{user?.name}</h1>
          <a href="" target="_blank">
            GITHUB
            <ArrowUpRight size={12} />
          </a>
        </SummaryHeader>
        <p>{user?.bio}</p>
        <SummaryAnchors>
          <div>
            <GithubLogo size={18} />
            <span>{user?.login}</span>
          </div>

          <div>
            <Buildings size={18} />
            <span>{user?.company}</span>
          </div>

          <div>
            <Users size={18} />
            <span>{user?.followers} seguidores</span>
          </div>
        </SummaryAnchors>
      </section>
    </SummaryContainer>
  );
}
