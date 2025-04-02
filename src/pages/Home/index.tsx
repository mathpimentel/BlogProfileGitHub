import { useEffect, useState } from "react";
import { Issues } from "./components/Issues";
import { Summary } from "./components/Summary";
import { HomeContainer, IssuesAside } from "./styles";
import { api } from "../../lib/api";

interface Issue {
  number: number;
  title: string;
  body: string;
  create_at: string;
}

export function Home() {

  return (
    <HomeContainer>
      <Summary />

      <IssuesAside>
        <Issues />
      </IssuesAside>
    </HomeContainer>
  );
}
