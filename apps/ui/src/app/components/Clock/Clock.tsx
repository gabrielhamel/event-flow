import { useCallback, useEffect, useState } from "react";
import { FormattedDate } from "react-intl";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  const updateTime = useCallback(() => {
    const currentDate = new Date();
    setTime(currentDate);
  }, []);

  useEffect(() => {
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [updateTime]);

  return <FormattedDate value={time} timeStyle="short" />;
};
