import { FunctionComponent, JSX, useState } from 'react';
import styled from 'styled-components';

const ComponentContainer = styled.div`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  color: #28292C;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`;
const Navigation = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  background-color: #44C2BC;
  color: white;
  cursor: pointer;
`;

const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const CalendarHeader = styled.div`
  display: flex;
  flex-direction: row;
`;
const CalendarTable = styled.div`
  display: flex;
  flex-direction: row;
`;


interface MainScreenProps {  
}
const MainScreen: FunctionComponent<MainScreenProps> = (): JSX.Element => {
  const weekdays = ['Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday','Sunday'];
  const [currentDate, setCurrentDate] = useState(new Date());


  
    
  return (
    <ComponentContainer>
      <Navigation>
        <div>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
        <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
            Prev
        </Button>
        <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
          Next
        </Button>
      </Navigation>
      
      <CalendarBody>
        <CalendarHeader>{weekdays.map((weekday) => { return <div>{weekday}</div>})}</CalendarHeader>
        <CalendarTable></CalendarTable>
      </CalendarBody>
        
    </ComponentContainer>
  );
};

export default MainScreen;