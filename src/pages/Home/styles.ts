import styled from 'styled-components';

export const CardColumn = styled.div`
  p {
    margin-bottom: 1rem;
  }

  .message-card {
    & + .message-card {
      margin-top: 16px;
    }
  }
`;

export const Controls = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 3.125rem;

  button + button {
    margin-left: 1.25rem;
  }
`;
