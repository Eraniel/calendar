import { Dispatch, FunctionComponent, JSX, SetStateAction, useState, useEffect } from 'react';
import styled from 'styled-components';
import EventForm from './EventForm';
import EventsList from './EventsList';
import { Event, SavedEventsByDate } from '../interfaces';

const ComponentContainer = styled.div`
  display: flex;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 744px;
  padding: 0 20px;
`;
const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayCell = styled.div<{ isCurrentMonth?: boolean, isSelected: boolean }>`
  cursor:pointer;
  width: 130px;
  height: 120px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isSelected && props.isCurrentMonth ? '#defcfa' : props.isCurrentMonth ? 'white' : '#f5f5f5')};
  color: ${(props) => (props.isCurrentMonth ? '#28292C' : '#ccc')};
  border: ${(props) => (props.isSelected ? '2px solid #44C2BC' : '2px solid #ccc')};
  @media (max-width: 1200px) {
    width: 100px;
  
  }
`;
const DateInfo = styled.div<{ isToday?: boolean, isCurrentMonth?: boolean }>`
  display: flex;
  flex-direction: row;
  margin: 0 0 10px 0;
  padding: 10px;
  color: ${(props) => (props.isToday ? 'white' : '#28292C')};
  background-color: ${(props) => props.isToday && props.isCurrentMonth ? '#44C2BC' : props.isCurrentMonth ? 'white' : '#f5f5f5'};
  b {
    margin: 0 10px 0 0;
  }
`;
const DateEvents = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
const DateEvent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #f5f5f5;
  margin: 0 0 5px 0;
`;


interface CalendarProps {
  currentDate: Date;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

const Calendar: FunctionComponent<CalendarProps> = ({ selectedDate, setSelectedDate, currentDate } : CalendarProps): JSX.Element => {
  //POST
  const saveToLocalStorage = (key: string, data: any) => {
    const storedData = loadFromLocalStorage('CalendarAppData') || {};
    storedData[key] = data;
    localStorage.setItem('CalendarAppData', JSON.stringify(storedData));
  };
  //GET
  const loadFromLocalStorage = (key: string) => {
    const storedData = localStorage.getItem('CalendarAppData');
    return storedData ? JSON.parse(storedData)[key] : null;
  };
  //PUT
  const updateInLocalStorage = (key: string, updatedData: any) => {
    const storedData = loadFromLocalStorage('CalendarAppData') || {};
    storedData[key] = { ...storedData[key], ...updatedData };
    localStorage.setItem('CalendarAppData', JSON.stringify(storedData));
  };
  //DELETE
  const deleteFromLocalStorage = (key: string) => {
    const storedData = loadFromLocalStorage('CalendarAppData') || {};
    delete storedData[key];
    localStorage.setItem('CalendarAppData', JSON.stringify(storedData));
  };
  const [savedEventsByDate, setSavedEventsByDate] = useState<SavedEventsByDate>(loadFromLocalStorage('savedEvents') || {});
  useEffect(() => {
    saveToLocalStorage('savedEvents', savedEventsByDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedEventsByDate]);


  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const startDay = (weekdayOfFirstDay - 1 + 7) % 7;//Monday
  let currentDays = [];

  function getDayOfWeekName(dayOfWeek: number) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (dayOfWeek >= 0 && dayOfWeek < daysOfWeek.length) {
      return daysOfWeek[dayOfWeek];
    }
  }

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  for (let day = 0; day < 42; day++) {
    let currentDay = new Date(firstDayOfMonth);
    currentDay.setDate(firstDayOfMonth.getDate() + day - startDay);
    const isCurrentMonth = currentDay >= firstDayOfMonth && currentDay <= lastDayOfMonth;
    const dayOfWeekName = getDayOfWeekName(currentDay.getDay());
    const isToday = currentDay.toDateString() === new Date().toDateString();
    const isSelected = selectedDate ? selectedDate.toDateString() === currentDay.toDateString() : false;

    const currentDateKey = currentDay ? `${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-${currentDay.getDate()}` : '';
  
    currentDays.push(
      <DayCell key={day} isCurrentMonth={isCurrentMonth} isSelected={isSelected} onClick={() => handleDayClick(currentDay)}>
        <DateInfo isCurrentMonth={isCurrentMonth} isToday={isToday}><b>{currentDay.getDate()}</b> {dayOfWeekName} {isToday && "Today"}</DateInfo>
        <DateEvents>
          {savedEventsByDate[currentDateKey]?.map((savedEvent: Event, index: number) => (<DateEvent key={`${currentDay.toDateString()}-${index}`}>{savedEvent.title}</DateEvent>))}
        </DateEvents>
      </DayCell>
    );
  }

  return (
    <ComponentContainer>
      <Wrap>
        <EventForm selectedDate={selectedDate} setSavedEventsByDate={setSavedEventsByDate} />
        <EventsList selectedDate={selectedDate} savedEventsByDate={savedEventsByDate} setSavedEventsByDate={setSavedEventsByDate} />
      </Wrap>
      <CalendarContainer>{currentDays}</CalendarContainer>
    </ComponentContainer>
  );
};

export default Calendar;