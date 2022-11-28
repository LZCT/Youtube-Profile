import styled from "styled-components";

export const StyledTimeline = styled.div`
  flex: 1;
  width: 100%;
  padding: 6px;
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
  .playlist-empty{
    color: #ff0000;
    text-transform: none;
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
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px,1fr);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      a {
        scroll-snap-align: start;
        span {
          display: block;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
        }
        .video-title{
          padding-top: 8px;
          padding-right: 24px;
        }
      }
      a:hover {
        cursor:pointer;
      }
    }
    .most-streamed-artists{
        grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
        grid-auto-columns: minmax(100px,1fr);
        text-align: center;
      }
  }

`;








