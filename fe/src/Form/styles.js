import { styled } from 'styled-components';

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;

    textarea{
        resize: none;
        height: 50px;
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 17px;
    }

    textarea:hover,
    textarea:focus {
        box-shadow: 5px 0 20px -10px rgba(0, 0, 0, 0.2), -5px 0 20px -10px rgba(0, 0, 0, 0.2);
    }



    select, button{
        padding: 10px;
        border-radius: 10px;
        font-size: 15px;
    }

    button{
        border: 1px solid #000;
        background-color: #76D076;
        cursor: pointer;
    }

    button:hover{
        background-color: #3C9E3C;
    }

    .spanError{
        color: red;
    }

    .spanWarning{
        color: #FF7F00;
    }
`;