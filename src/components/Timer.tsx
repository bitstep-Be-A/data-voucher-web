import { useState, useEffect } from "react";

interface TimerProps {
  start?: number;  // seconds. Undefined일 때 0
  end?: number;  // seconds.
  timeFormat: string;
  reversed?: boolean; // default is false.
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ start = 0, end, timeFormat, reversed = false, className }) => {
  const [time, setTime] = useState<number>(start);

  useEffect(() => {
    const interval = setInterval(() => {
      if (reversed) {
        if (time > 0) {
          setTime(prevTime => prevTime - 1);
        }
      } else {
        if (end === undefined || time < end) {
          setTime(prevTime => prevTime + 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, end, reversed]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    let formatString = timeFormat;

    if (timeFormat.includes('mm')) {
      formatString = formatString.replace('mm', minutes.toString().padStart(2, '0'));
    }
    else if (timeFormat.includes('m')) {
      formatString = formatString.replace('m', minutes.toString());
    }
    if (timeFormat.includes('ss')) {
      formatString = formatString.replace('ss', remainingSeconds.toString().padStart(2, '0'));
    }

    return formatString;
  };

  return (
    <div className={className}>
      {formatTime(time)}
    </div>
  );
};

export default Timer;
