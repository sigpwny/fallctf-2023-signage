"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Timer {
  status: TimerStatus;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  time_start: string;
  time_close: string;
}

interface TimedComponentProps {
  time_start: string;
  time_close: string;
  before: React.ReactNode;
  during: React.ReactNode;
  after: React.ReactNode;
}

enum TimerStatus {
  UNINITIALIZED,
  BEFORE_START,
  DURING,
  AFTER_CLOSE
}

export default function Countdown({ time_start, time_close }: Props) {
  const [timer, setTimer] = useState<Timer>(
    {
      status: TimerStatus.UNINITIALIZED,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  );
  useEffect(() => {
    function tick(start: dayjs.Dayjs, close: dayjs.Dayjs) {
      const now = dayjs();
      let target: dayjs.Dayjs;
      let status: TimerStatus;
      if (now < start) {
        target = start;
        status = TimerStatus.BEFORE_START;
      } else if (now < close) {
        target = close;
        status = TimerStatus.DURING;
      } else {
        target = now;
        status = TimerStatus.AFTER_CLOSE;
      }
      const diff = target.diff(now, "second");
      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff - days * 86400) / 3600);
      const minutes = Math.floor((diff - days * 86400 - hours * 3600) / 60);
      const seconds = diff - days * 86400 - hours * 3600 - minutes * 60;
      setTimer({ status, days, hours, minutes, seconds });
    }

    // Initialize countdown
    let start = dayjs(time_start);
    let close = dayjs(time_close);
    tick(start, close);
    setInterval(() => {
      tick(start, close);
    }, 1000);
  }, [time_start, time_close]);
  function formatNumber(num: number) {
    return num.toString().padStart(2, "0");
  }
  return (
    <>
      {timer.status !== TimerStatus.UNINITIALIZED && timer.status !== TimerStatus.AFTER_CLOSE ? (
        <div className="flex flex-col leading-none">
          <motion.span layout="position" className="leading-none">
            {timer.status === TimerStatus.BEFORE_START ?
              "Starting in" : timer.status === TimerStatus.DURING ?
              "Ending in" :
              "Ended"
            }
          </motion.span>
          <div className="flex flex-row">
            {timer.days > 0 ? (
              <>
                <div className="flex flex-col">
                  <div className="text-4xl font-bold leading-none">
                    {formatNumber(timer.days)}
                  </div>
                  <span>
                    {timer.days === 1 ? "Day" : "Days"}
                  </span>
                </div>
                <span className="text-4xl font-bold leading-none">
                  :
                </span>
              </>
            ) : null}
            {timer.days > 0 || timer.hours > 0 ? (
              <>
                <div className="flex flex-col">
                  <div className="text-4xl font-bold leading-none">
                    {formatNumber(timer.hours)}
                  </div>
                  <span>
                    {timer.hours === 1 ? "Hour" : "Hours"}
                  </span>
                </div>
                <span className="text-4xl font-bold leading-none">
                  :
                </span>
              </>
            ) : null}
            <div className="flex flex-col">
              <div className="text-4xl font-bold leading-none">
                {formatNumber(timer.minutes)}
              </div>
              <span>
                {timer.minutes === 1 ? "Min" : "Mins"}
              </span>
            </div>
            <span className="text-4xl font-bold leading-none">
              :
            </span>
            <div className="flex flex-col">
              <div className="text-4xl font-bold leading-none">
                {formatNumber(timer.seconds)}
              </div>
              <span>
                {timer.seconds === 1 ? "Sec" : "Secs"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-translate-right flex flex-col leading-none ml-4 bg-surface-100 border-surface-150 border-2 rounded-xl p-2">
          <span className="leading-none">
            The CTF is over! 🎉
          </span>
          <span>
            Thank you for playing and congratulations to the winners!
          </span>
        </div>
      )}
    </>
  )
}

export function TimedComponent(props: TimedComponentProps) {
  const { time_start, time_close, before, during, after } = props;
  const [timer, setTimer] = useState<Timer>(
    {
      status: TimerStatus.UNINITIALIZED,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  );
  useEffect(() => {
    function tick(start: dayjs.Dayjs, close: dayjs.Dayjs) {
      const now = dayjs();
      let target: dayjs.Dayjs;
      let status: TimerStatus;
      if (now < start) {
        target = start;
        status = TimerStatus.BEFORE_START;
      } else if (now < close) {
        target = close;
        status = TimerStatus.DURING;
      } else {
        target = now;
        status = TimerStatus.AFTER_CLOSE;
      }
      const diff = target.diff(now, "second");
      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff - days * 86400) / 3600);
      const minutes = Math.floor((diff - days * 86400 - hours * 3600) / 60);
      const seconds = diff - days * 86400 - hours * 3600 - minutes * 60;
      setTimer({ status, days, hours, minutes, seconds });
    }

    // Initialize countdown
    let start = dayjs(time_start);
    let close = dayjs(time_close);
    tick(start, close);
    setInterval(() => {
      tick(start, close);
    }, 1000);
  }, [time_start, time_close]);
  function formatNumber(num: number) {
    return num.toString().padStart(2, "0");
  }
  return (
    <>
      {timer.status === TimerStatus.BEFORE_START ? before :
        timer.status === TimerStatus.DURING ? during :
          timer.status === TimerStatus.AFTER_CLOSE ? after :
            null}
    </>
  );
}
