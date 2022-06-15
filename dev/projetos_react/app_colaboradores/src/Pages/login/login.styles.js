import styled from 'styled-components';

//Login
export const DivLogin = styled.div`
  width: 50%;
  height: 100vh;
  background-color: white;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0px;
  }

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  > img {
    padding: 16px 0px 0px 0px;
  }

  @media (max-width: 950px) {
    width: 100%;
    overflow: auto;
  }

  @media (max-height: 600px) {
    justify-content: unset;
  }
`;

export const ButtonEnter = styled.button`
  margin: 32px 0px;
  padding: 10px 0px;
  width: 80%;
  height: 44px;
  background-color: #384b78;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.5s;

  @media (min-width: 1500px) {
    width: 60%;
  }

  &:hover {
    background-color: #384b78;
  }
`;

//Layout
export const DivLayout = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #384b78;

  @media (max-width: 950px) {
    display: none;
  }

  h1 {
    color: white;
    font-weight: 600;
    margin-bottom: 8px;
    margin-top: 32px;

    @media (max-height: 350px) {
      margin-top: 0px;
    }
  }

  h2 {
    color: white;
    font-weight: 300;
    text-align: center;
    padding: 0px 10px;
    font-size: 20px;
  }
`;

export const DivIlustracao = styled.div`
  > img {
    width: 50vh;
  }

  @media (max-height: 350px) {
    display: none;
  }
`;
