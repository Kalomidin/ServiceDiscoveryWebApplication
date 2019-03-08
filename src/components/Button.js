import styled from "styled-components";

export const ButtonContainer=styled.button`
    text-transformation: capitalize;
    font-size: 1.4rem;
    background: #ffffff;
    border: 0.04rem #0060ff;
    border-radius: 1rem;
    padding: 0.2rem 0.5rem; 
    margin: 0.1rem 0.1rem;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    &:hover{
        backround: var(--mainDark);
        color: var(--mainBlue);
    }
    &:focus{
        outline:none;
    }
    `;
