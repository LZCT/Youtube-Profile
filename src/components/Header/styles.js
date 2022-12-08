import styled from "styled-components";

export const StyledHeader = styled.div`
    background-color: ${({theme}) => theme.backgroundLevel1 };

    .profile-photo{
        width:80px;
        height:80px;
        border-radius: 50%;
    }
    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
    .banner{
        width: 100%;
        height: 230px;
        object-fit: cover;
        object-position: 100% 75%;
    }
`;