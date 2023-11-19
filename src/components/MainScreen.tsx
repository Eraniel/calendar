import { FunctionComponent, JSX, useState, useEffect } from 'react';
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
  justify-content: space-between;
  align-items: center;
  margin: 0 0 60px 0;
  h3 {
    font-size: 20px;
    margin: 0 10px;
    width: 200px;
    text-align: center;
  }
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
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
const PickDateBtn = styled(Button)<{ isDateProperlySelected?: boolean }>`
  background-color: ${(props) => (props.isDateProperlySelected ? '#44C2BC' : '#db3a2e')};
  margin: 0 10px 0 0;
`;

const DatePicker = styled.div`
  display: flex;
  input {
    width: 80px;
  }
`;

const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
`;


interface MainScreenProps {  
}
const MainScreen: FunctionComponent<MainScreenProps> = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputDate, setInputDate] = useState({ newYear: '', newMonth: '', newDay: '' });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDateProperlySelected, setIsDateProperlySelected] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (
      (name === 'newMonth' && /^\d+$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 12) ||
      (name === 'newDay' && /^\d+$/.test(value) && parseInt(value, 10) >= 1 && parseInt(value, 10) <= 31) ||
      (name === 'newYear' && /^\d+$/.test(value)) ||
      (value === '')
    ) {
      setInputDate((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  useEffect(() => {
    const isAllFieldsFilled = inputDate.newYear !== '' && inputDate.newMonth !== '' && inputDate.newDay !== '';
    setIsDateProperlySelected(isAllFieldsFilled);
  }, [inputDate]);

  const updateDate = () => {
    if (isDateProperlySelected) {
      const updatedDate = new Date(currentDate);
      updatedDate.setFullYear(parseInt(inputDate.newYear, 10));
      updatedDate.setMonth(parseInt(inputDate.newMonth, 10) - 1);
      updatedDate.setDate(parseInt(inputDate.newDay, 10));
      setCurrentDate(updatedDate);
      setSelectedDate(updatedDate);
      setInputDate({ newYear: '', newMonth: '', newDay: '' });
    }
  };
  const backToTheFuture = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  }


  return (
    <ComponentContainer>
      <Navigation>
        <Buttons>
        <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
          Prev
        </Button>
        <h3>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
        <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
          Next
        </Button>
        </Buttons>
        <DatePicker>
          <input type="text" name="newYear" placeholder="Year*" value={inputDate.newYear} onChange={handleInputChange}/>
          <input type="text" name="newMonth" placeholder="Month*" value={inputDate.newMonth} onChange={handleInputChange}/>
          <input type="text" name="newDay" placeholder="Day*" value={inputDate.newDay} onChange={handleInputChange}/>
          <PickDateBtn isDateProperlySelected={isDateProperlySelected} onClick={updateDate}>Pick Date</PickDateBtn>
          <Button onClick={backToTheFuture}>Today</Button>
        </DatePicker>
      </Navigation>
      
      <CalendarBody>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} currentDate={currentDate} setCurrentDate={setCurrentDate}/>
      </CalendarBody>
    <h2>Calendar App by Bohdan Pantiley</h2>
    </ComponentContainer>
  );
};

export default MainScreen;