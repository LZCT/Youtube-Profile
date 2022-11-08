import styled from "styled-components";

export const StyledTimeline = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  .video-thumb {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 210px;
    height: auto;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
    div {
      
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px,1fr);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      a {
        scroll-snap-align: start;
        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
        }
      }
    }
  }

`;

export const StyledTopArtist = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  .artist-thumb{
    width:80px;
    height:80px;
    border-radius: 50%;
  }
  .artists-name{
    display: block;
    padding-top: 8px;
    color: ${({ theme }) => theme.textColorBase || "#222222"};
  }

  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
    div {
      width: calc(100vw - 16px * 4);
      display: grid;
      text-align: center;
      grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(100px,1fr);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      a {
        scroll-snap-align: start;
        span {
          display: block;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
        }
      }
    }
  }

`;






