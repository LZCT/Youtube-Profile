import styled from "styled-components";

export const StyledPlaylistInfo = styled.div`
  .close-modal {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 8px;
    right: 16px;
    color: inherit;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  button{
    background-color: red;
    padding: 8px 16px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    color: white;
  }
  button[type="submit"]:disabled{
    background-color: grey;
    cursor: not-allowed;
    &:hover{
      opacity: 1;
    }
  }
  form {
    width: 100%;
    padding: 5%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    & > div {
      flex: 1;
      border-radius: 8px;
      max-width: 320px;;
      background-color: ${({ theme }) => theme.backgroundLevel2};
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 16px;
      padding-top: 40px;
    }
  }

  h1, h2, h3, h4{
    text-align: center;
    color: ${({ theme }) => theme.textColorBase};
  }
  input {
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.borderBase};
    padding: 8px 10px;
    margin-bottom: 10px;
    outline: none;
    color: #222222;
    background-color: #f9f9f9;
    color: ${({ theme }) => theme.textColorBase};
    background-color: ${({ theme }) => theme.backgroundBase};
  }
  span{
    color: #ff0000;
    font-size: 13px;
    padding: 3px;
    text-align: center;
  }
  label{
    font-size: 12px;
    padding: 3px;
    color: ${({ theme }) => theme.textColorBase};
  }
`;