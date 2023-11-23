import * as React from "react";

export interface HoursProps {
  title?: string;
  hours: Week;
  children?: React.ReactNode;
}

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};

const todayIndex = new Date().getDay();

/**
 * Dynamically creates a sort order based on today's day.
 */
function getSorterForCurrentDay(): { [key: string]: number } {
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = [];
  for (let i = 0; i < dayIndexes.length; i++) {
    let dayIndex = dayIndexes[i];
    updatedDayIndexes[i] = dayIndex;
  }

  return {
    monday: updatedDayIndexes[0],
    tuesday: updatedDayIndexes[1],
    wednesday: updatedDayIndexes[2],
    thursday: updatedDayIndexes[3],
    friday: updatedDayIndexes[4],
    saturday: updatedDayIndexes[5],
    sunday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

function sortByDay(week: Week): Week {
  const tmp = [];
  for (const [k, v] of Object.entries(week)) {
    tmp[getSorterForCurrentDay()[k]] = { key: k, value: v };
  }

  const orderedWeek: Week = {};
  tmp.forEach((obj) => {
    orderedWeek[obj.key] = obj.value;
  });

  return orderedWeek;
}

const renderHours = (week: Week) => {
  const dayDom: JSX.Element[] = [];
  for (const [k, v] of Object.entries(sortByDay(week))) {
    dayDom.push(<DayRow key={k} dayName={k} day={v} isToday={isDayToday(k)} />);
  }

  return <tbody className="font-normal">{dayDom}</tbody>;
};

function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex;
}

function convertTo12HourFormat(time: string, includeMeridiem: boolean): string {
  const timeParts = time.split(":");
  let hour = Number(timeParts[0]);
  const minutesString = timeParts[1];
  const meridiem = hour < 12 || hour === 24 ? "am" : "pm"; // Set AM/PM
  hour = hour % 12 || 12; // Adjust hours

  return (
    hour.toString() + ":" + minutesString + (includeMeridiem ? meridiem : "")
  );
}

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
};

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday } = props;

  return (
    <tr>
      <td className="capitalize text-left pl-1 pr-4">
        <span>{dayName.substring(0, 3)}</span>
      </td>
      {!day.isClosed && (
        <td className="pr-1">
          <span className="text-typography-time font-normal">
            {convertTo12HourFormat(day.openIntervals[0].start + " ", true)} -{" "}
            {convertTo12HourFormat(day.openIntervals[0].end + " ", true)}
          </span>
        </td>
      )}
      {day.isClosed && (
        <td className="pr-1">
          <span className="text-typography-time font-normal">Closed</span>
        </td>
      )}
    </tr>
  );
};

const Hours = (props: HoursProps) => {
  const { hours } = props;

  return (
    <>
      <div className="text-lg font-semibold mb-2">Branch Hours:</div>
      <div className="text-2xl font-medium mb-2">Open until 5:30 PM</div>
      <div className="mb-4">Also by appointment. </div>
      <table>
        <thead className="sr-only">
          <tr>
            <th>Day of the Week</th>
            <th>Hours</th>
          </tr>
        </thead>
        {renderHours(hours)}
      </table>
    </>
  );
};

export default Hours;
