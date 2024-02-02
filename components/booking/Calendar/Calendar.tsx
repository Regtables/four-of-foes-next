import { CalendarDays, MoveLeft, MoveRight } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  differenceInDays,
  endOfMonth,
  format,
  startOfMonth,
  sub,
  add,
  eachDayOfInterval,
  isPast,
  set,
} from "date-fns";
import { motion } from "framer-motion";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Cell = ({
  children,
  handleClick,
}: {
  children?: React.ReactNode;
  handleClick?: any;
}) => {
  return (
    <div onClick={handleClick} className="flex items-center justify-center">
      {children}
    </div>
  );
};

const Calendar = () => {
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [height, setHeight] = useState("0px");
  const content: any = useRef(null);
  const now = new Date();
  const [month, setMonth] = useState(now);
  const monthStart = startOfMonth(month);
  const prefixDays = monthStart.getDay() - 1;
  const monthEnd = endOfMonth(month);
  const numMonthDays = differenceInDays(monthEnd, monthStart) + 1;
  const daysOfMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const affixDays = monthEnd.getDay();
  const [selectedDate, setSelectedDate] = useState();
  const [animateTopBar, setAnimateTopBar] = useState({})

  const handleToggle = () => {
    if (toggleCalendar) {
      setHeight("0px");
      
      setAnimateTopBar({ opacity: 0})
      
      setTimeout(() => {
        setToggleCalendar(false);
        setAnimateTopBar({ opacity: 1})
      }, 300);
    } else {
      setHeight(`${content.current.scrollHeight}px`);
      
      setAnimateTopBar({ opacity: 0})
      
      setTimeout(() => {
        setToggleCalendar(true);
        setAnimateTopBar({ opacity: 1})
      }, 300);
    }
  };

  return (
    <div
      className="border-2 border-white w-full rounded-lg p-4"
      onClick={handleToggle}
    >
      {/* Top bar */}
      <motion.div animate = {animateTopBar} transition={{ duration: 1 }}>
        {!toggleCalendar ? (
          <div className="flex gap-4 items-center">
            <CalendarDays size={28} />

            <div className="uppercase italic text-[14px] tracking-[0.25em]">
              dd/mm/yyyy
            </div>
          </div>
        ) : (
          // {/* month select */}
          <div className="flex justify-between h-[60px]">
            <div>
              <MoveLeft />
            </div>

            <div className="uppercase tracking-[0.2em] font-medium">
              {format(month, "LLLL yyyy")}
            </div>

            <div>
              <MoveRight />
            </div>
          </div>
        )}
      </motion.div>
      <div
        style={{ maxHeight: height }}
        ref={content}
        className="overflow-hidden transition-all duration-700"
      >
        {/* calendar */}
        <div className="grid grid-cols-7 gap-0">
          {/* Day of the week */}
          {daysOfWeek.map((day, i) => (
            <Cell key={i}>
              <div className="uppercase italic font-medium">{day}</div>
            </Cell>
          ))}

          {/* Prefix days */}
          {Array.from({ length: prefixDays }).map((day, i) => (
            <Cell key={i} />
          ))}

          {/* Day os of the month */}
          {daysOfMonth.map((day) => (
            <Cell>
              <div className="mt-6 italic">
                {day.getDate()}
              </div>
            </Cell>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
