import { useEffect, useState } from "react";

const TimeWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm">
      {time.toLocaleTimeString()}
    </div>
  );
};

export default TimeWidget;