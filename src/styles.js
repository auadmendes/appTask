import styled from 'styled-components/native';

export const Container = styled.View`
width: 100%;
height: 100%;
background-color: #0594CE;
`;

export const AreaInput = styled.View`
margin-top: 5px;
margin-left: 5px;
margin-right: 5px;
margin-bottom: 10;
/* background-color: #000000; */
flex-direction: row;
justify-content: center;
align-items: center;
padding-left: 5px;
padding-right: 5px;
`;
export const TextoInput = styled.TextInput`
width: 80%;
height: 45px;
background-color: #fff;
color: #000;
border-radius: 3px;
padding: 5px;
font-size: 16px;

background-color: rgba(256, 256, 256, 0.7);
`;

 export const Header = styled.View`
 width: 100%;
 height: 30%;
 border-radius: 10px;
 background-color: #fff;
 justify-content: center;
 align-items: center; 
 `;

 export const Button = styled.TouchableOpacity`
 width: 55px;
 height: 45px;
 background-color: #4CB7EB;
 border-radius: 3px;
 align-items: center;
 justify-content: center;
 `;

export const Lista = styled.View`
width: 98%;
flex: 1;
margin-top: 10px;
background-color: #fff;
padding: 5px;
`;