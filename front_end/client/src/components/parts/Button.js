import styled from "styled-components";

/*notes: transition all means all type of transition such as hover. 
 *& means the component working with in sass      
 */

//create an components with the following style
const ButtonContainer = styled.button
`
  text-transform:capitalized;
  font-size: 1.4rem;
  background: transparent;
  border:0.05rem solid var(--lightBlue);
  color:var(--lightBlue);
  border-radius:0.5rem;
  padding: 0.2rem 0.5rem;
  cursor:pointer;
  margin:0.2rem 0.5rem;
  transition: all 0.5s ease-in-out;
  &:hover{
    background:var(--lightBlue);
    color:var(--mainBlue);
  }
  &:focus{
     outline:none;
  }
`

export default ButtonContainer;