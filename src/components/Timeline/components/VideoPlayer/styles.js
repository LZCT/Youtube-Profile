import styled from "styled-components";

export const StyledVideoPlayer = styled.div`
  .videoPlayer{
    width: 100%;
    padding: 5%;
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      flex: 1;
      border-radius: 8px;
      max-width: 900px;
      max-height: 550px;
      background-color: ${({ theme }) => theme.backgroundLevel2};
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 16px;
      padding-top: 40px;
    }
  }

`;