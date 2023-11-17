import { FunctionComponent, JSX } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DayCell = styled.div<{ isCurrentMonth?: boolean }>`
  border: 1px solid #ccc;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isCurrentMonth ? 'white' : '#f5f5f5')};
  color: ${(props) => (props.isCurrentMonth ? '#28292C' : '#ccc')};
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
}
const Calendar: FunctionComponent<CalendarProps> = ({ currentDate, setCurrentDate } : CalendarProps): JSX.Element => {
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
  for (let day = 0; day < 42; day++) {
    let currentDay = new Date(firstDayOfMonth);
    currentDay.setDate(firstDayOfMonth.getDate() + day - startDay);
  
    const isCurrentMonth = currentDay >= firstDayOfMonth && currentDay <= lastDayOfMonth;
    const dayOfWeekName = getDayOfWeekName(currentDay.getDay());
    const isToday = currentDay.toDateString() === new Date().toDateString();
  
    currentDays.push(
      <DayCell key={day} isCurrentMonth={isCurrentMonth}>
        <DateInfo isCurrentMonth={isCurrentMonth} isToday={isToday}><b>{currentDay.getDate()}</b> {dayOfWeekName} {isToday && "Today"}</DateInfo>
        <DateEvents>
            <div>Event</div>
            <div>Event</div>
            <div>Event</div>
        </DateEvents>
      </DayCell>
    );
  }

  return (
    <CalendarContainer>{currentDays}</CalendarContainer>
  );
};

export default Calendar;