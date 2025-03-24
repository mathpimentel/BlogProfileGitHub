import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

export const IssuesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const IssuesCard = styled.div`
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  background-color: ${(props) => props.theme["blue-600"]};
  padding: 2rem;
  border-radius: 8px;

  div {
    display: flex;
    align-items: flex-start;
    place-content: start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;

    h2 {
      padding: 0;
      width: 80%;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${(props) => props.theme["gray-100"]};
    }

    span {
      display: block;
      font-size: 0.875rem;
      color: ${(props) => props.theme["gray-400"]};
    }
  }

  p {
    display: block;
    color: ${(props) => props.theme["gray-300"]};
  }
`;
