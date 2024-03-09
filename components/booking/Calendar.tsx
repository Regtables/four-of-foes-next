import { CalendarCheck, CalendarDays, MoveLeft, MoveRight } from "lucide-react";
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
import ViewMotionWrapper from "../layout/Motion/ViewMotionWrapper";
import { cn } from "@/app/lib/utils";
import ButtonPill from "../buttons/ButtonPill";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Cell = ({
  children,
  handleClick,

}: {
  children?: React.ReactNode;
  handleClick?: any;
  onAccordionToggle?: boolean
  
}) => {
  return (
    <div onClick={handleClick} className="flex items-center justify-center">
      {children}
    </div>
  );
};

const Calendar = ({
  confirmedDate,
  setConfirmedDate,
  toggleChildAccordion,
  setToggleChildAccordion
}: {
  confirmedDate: string;
  setConfirmedDate: (date: string) => void;
  toggleChildAccordion?: boolean
  setToggleChildAccordion?: (toggle: boolean) => void
}) => {
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
  const [selectedDate, setSelectedDate] = useState('');
  const [animateTopBar, setAnimateTopBar] = useState({});
  const [animateCalendar, setAnimateCalendar] = useState({});


  const prevMonth = () => setMonth(sub(month, { months: 1 }));
  const nextMonth = () => setMonth(add(month, { months: 1 }));

  const handleToggle = (e?: any) => {
    if(e.target.tagName !== 'svg'){
      if (toggleCalendar) {
        if(setToggleChildAccordion){
          setToggleChildAccordion(false)
        }
        setAnimateCalendar({ opacity: 0 });
        setAnimateTopBar({ opacity: [1, 0] });
        setHeight("0px");
  
        setTimeout(() => {
          setToggleCalendar(false);
          setAnimateTopBar({ opacity: [0, 1] });
          setAnimateCalendar({ opacity: 0 });
        }, 500);
      } else {
        if(setToggleChildAccordion){
          setToggleChildAccordion(true)
        }
        setAnimateTopBar({ opacity: [1, 0], duration: 0.5 });
        setAnimateCalendar({ opacity: 0, duration: 0.3 });

        setTimeout(() => {
          setHeight(`${content.current.scrollHeight}px`);
        }, 100);
  
        setTimeout(() => {
          setToggleCalendar(true);
          setAnimateTopBar({ opacity: 1 });
          setAnimateCalendar({ opacity: 1 });
        }, 500);
      }
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(format(date, "EEEE dd LLLL yyyy"));

    setTimeout(() => {
      setHeight(`${content.current.scrollHeight}px`);
    }, 0);
  };

  // const handleDateClick = (date: Date) => {
  //   setSelectedDate(format(date, "EEEE dd LLLL yyyy"));
  //   setHeight("auto"); // Set height to "auto" to allow it to adjust based on content
  
  //   // Trigger a layout update to ensure the height is applied before starting the animation
  //   if (content.current) {
  //     void content.current.offsetHeight;
  //   }
  
  //   setHeight(`${content.current.scrollHeight}px`);
  // };
  

  const handleConfrim = (e: any) => {
    console.log('confirming')
    setConfirmedDate(selectedDate!);

    console.log(confirmedDate)

    handleToggle(e);
  };

  return (
    <div className="border-[2px] border-white w-full rounded-lg p-4 cursor-pointer">
      {/* Top bar */}
      <motion.div
        animate={animateTopBar}
        transition={{ duration: 0.3 }}
        className="h-[20px] flex items-center justify-center min-w-full"
        onClick={(e) => handleToggle(e)}
      >
        {!toggleCalendar ? (
          <div className="flex gap-4 items-center w-full" >
            {confirmedDate ? (
              <CalendarCheck size={28} />
            ) : (
              <CalendarDays size={28} />
            )}

            <div className="uppercase italic text-[12px] tracking-[0.25em] w-full">
              {confirmedDate ? <>{confirmedDate}</> : <p>dd/mm/yyyy</p>}
            </div>
          </div>
        ) : (
          // {/* month select */}
          <div className="flex justify-between w-full">
            <div onClick={prevMonth}>
              <MoveLeft />
            </div>

            <div className="uppercase tracking-[0.2em] font-medium text-[14px]">
              {format(month, "LLLL yyyy")}
            </div>

            <div onClick={nextMonth}>
              <MoveRight />
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        style={{ maxHeight: height }}
        ref={content}
        className="overflow-hidden transition-all duration-700 opacity-0"
        animate={animateCalendar}
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0 }}
      >
        {/* calendar */}
        <div
          className="grid grid-cols-7 gap-0 mt-4"
        >
          {/* Day of the week */}
          {daysOfWeek.map((day, i) => (
            <Cell key={i}>
              <div className="uppercase italic font-medium text-[14px]">
                {day}
              </div>
            </Cell>
          ))}

          {/* Prefix days */}
          {Array.from({ length: prefixDays }).map((day, i) => (
            <Cell key={i} />
          ))}

          {/* Day os of the month */}
          {daysOfMonth.map((day, i) => (
            <Cell key = {i}>
              <button
                className={cn(
                  "mt-6 italic h-full w-full rounded-full transition-all duration-700 text-[12px] disabled:text-[grey] cursor-pointer",
                  selectedDate === format(day, "EEEE dd LLLL yyyy")
                    ? "bg-white text-black"
                    : ""
                )}
                type="button"
                onClick={() => handleDateClick(day)}
                disabled = {
                  isPast(day)
                    ? true
                    : false || day.getDay() === 0
                    ? true
                    : false || day === now
                    ? true
                    : false
                }
              >
                {day.getDate()}
              </button>
            </Cell>
          ))}
        </div>

        {selectedDate && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="uppercase tracking-[0.2em] text-[12px]">
              {selectedDate}
            </p>

            <div className="w-[150px] h-[30px]">
              <ButtonPill text="confirm" fill handleClick={(e: any) => handleConfrim(e)} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Calendar;
