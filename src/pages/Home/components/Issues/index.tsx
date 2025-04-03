// import { dateFormatter } from "../../../../utils/formatter";
import { IssuesContainer, StyledNavLink } from "./styles";

interface IssueProps {
  number: number;
  title: string;
  body: string;
  create_at: string;
}


export function Issues({number, title, body, create_at}: IssueProps) {
  return (
    <IssuesContainer>
      <StyledNavLink to={`https://github.com/lucaspedronet/BlogProfileGitHub/issues/${number}`}
      target="blank">

        <div>
          <h2>{title}</h2>
          <span>{new Date(create_at).toLocaleDateString("pt-BR")}</span>
          
        </div>
        <p>{body ? body.substring(0, 200) : "Sem descrição"}</p>
      </StyledNavLink>
    </IssuesContainer>
  );
}
