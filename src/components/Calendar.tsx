import { Dispatch, FunctionComponent, JSX, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import EventForm from './EventForm';
import { Event } from '../interfaces';

const ComponentContainer = styled.div`
  display: flex;
`;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayCell = styled.div<{ isCurrentMonth?: boolean, isSelected: boolean }>`
  border: 1px solid #ccc;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isCurrentMonth ? 'white' : '#f5f5f5')};
  color: ${(props) => (props.isCurrentMonth ? '#28292C' : '#ccc')};
  border: ${(props) => (props.isSelected ? '1px solid #44C2BC' : '1px solid #ccc')};
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
  height: 100%;
`;

interface CalendarProps {
  currentDate: Date;
  setCurrentDate: (date:Date) => void;
  selectedDay: number | null;
  setSelectedDay: Dispatch<SetStateAction<number | null>>;
}

const Calendar: FunctionComponent<CalendarProps> = ({ selectedDay, setSelectedDay, currentDate, setCurrentDate } : CalendarProps): JSX.Element => {
  
  const [savedEventsByDay, setSavedEventsByDay] = useState<{ [day: number]: Array<Event> }>({});
  
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const startDay = (weekdayOfFirstDay - 1 + 7) % 7;//start week from Monday
  let currentDays = [];

  function getDayOfWeekName(dayOfWeek: number) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (dayOfWeek >= 0 && dayOfWeek < daysOfWeek.length) {
      return daysOfWeek[dayOfWeek];
    }
  }

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  for (let day = 0; day < 42; day++) {
    let currentDay = new Date(firstDayOfMonth);
    currentDay.setDate(firstDayOfMonth.getDate() + day - startDay);
  
    const isCurrentMonth = currentDay >= firstDayOfMonth && currentDay <= lastDayOfMonth;
    const dayOfWeekName = getDayOfWeekName(currentDay.getDay());
    const isToday = currentDay.toDateString() === new Date().toDateString();
    const isSelected = selectedDay === currentDay.getDate();
  
    currentDays.push(
      <DayCell key={day} isCurrentMonth={isCurrentMonth} isSelected={isSelected} onClick={() => handleDayClick(currentDay.getDate())}>
        <DateInfo isCurrentMonth={isCurrentMonth} isToday={isToday}><b>{currentDay.getDate()}</b> {dayOfWeekName} {isToday && "Today"}</DateInfo>
        <DateEvents>
          {savedEventsByDay[currentDay.getDate()]?.map((savedEvent)=>{return <div>{savedEvent.title}</div>})}
        </DateEvents>
      </DayCell>
    );
  }

  return (
    <ComponentContainer>
      <EventForm selectedDay={selectedDay} setSavedEventsByDay={setSavedEventsByDay}/>
      <CalendarContainer>{currentDays}</CalendarContainer>
    </ComponentContainer>
  );
};

export default Calendar;