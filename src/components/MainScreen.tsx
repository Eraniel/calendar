import { FunctionComponent, JSX, useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';

const ComponentContainer = styled.div`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  color: #28292C;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  margin: 100px 15% 0 15%;
  width: 70%;
`;
const Navigation = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 0 60px 0;
  h3 {
    font-size: 20px;
    margin: 0 10px;
    width: 200px;
    text-align: center;
  }
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  background-color: #44C2BC;
  color: white;
  cursor: pointer;
`;

const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
`;


interface MainScreenProps {  
}
const MainScreen: FunctionComponent<MainScreenProps> = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());


  
    
  return (
    <ComponentContainer>
      <Navigation>
        <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
          Prev
        </Button>
        <h3>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
        <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
          Next
        </Button>
      </Navigation>
      
      <CalendarBody>
        <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate}/>
      </CalendarBody>
        
    </ComponentContainer>
  );
};

export default MainScreen;