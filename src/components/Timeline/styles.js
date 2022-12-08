import styled from "styled-components";

export const StyledTimeline = styled.div`
  flex: 1;
  width: 100%;
  padding: 6px;
  overflow: hidden;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
  }
  .video-thumb {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 210px;
    height: auto;
  }
  .playlist-warning{
    color: #ff0000;
    text-transform: none;
  }
  .channel-thumb{
    width:80px;
    height:80px;
    border-radius: 50%;
  }
  section {
    width: 100%;
    padding: 0;
    overflow: hidden;
    padding: 16px;
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
    div {
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px,1fr);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
     
    }
    // Youtube channels on the bottom of the page
    .feature-channels{
        grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
        grid-auto-columns: minmax(100px,1fr);
        text-align: center;
      }
  }

`;


export const StyledTimelineComponents = styled.div`
  // Styled Components (VideoPlayer, RegisterVideo, PlaylistInfo)
  // "+" button on the left corner of the screen to register new videos
  .add-video {
      width: 50px;
      height: 50px;
      font-size: 20px;
      color: #ffffff;
      position: fixed;
      bottom: 16px;
      right: 16px;
      border: 0;
      background-color: red;
      border-radius: 50%;
      z-index: 99;
      cursor: pointer;
    }
  // Close modal button
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
  // Titles
  h1, h2, h3, h4{
    text-align: center;
    color: ${({ theme }) => theme.textColorBase};
  }
  // Spans that shows erros in forms
  span{
    color: #ff0000;
    font-size: 13px;
    padding: 3px;
    text-align: center;
  }
  // Label forms
  label{
    font-size: 13px;
    padding: 3px;
    color: ${({ theme }) => theme.textColorBase};
  }
  // input and select from forms
  input, select {
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
  // Form submit button
  button[type="submit"] {
    background-color: #ff0000;
    padding: 8px 16px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    color: #ffffff;
  }
  button[type="submit"]:disabled{
    background-color: grey;
    cursor: not-allowed;
    &:hover{
      opacity: 1;
    }
  }
  // Others Buttons
  button{
    background-color: red;
    padding: 8px 16px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    color: white;
  }
  // Forms 
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
      max-width: 320px;
      background-color: ${({ theme }) => theme.backgroundLevel2};
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 16px;
      padding-top: 40px;
    }
  }
`;

