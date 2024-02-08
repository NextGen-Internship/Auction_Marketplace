import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endTime: string; // Format: "YYYY-MM-DDTHH:MM:SS.MS"
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const calculateTimeLeft = () => {
     const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - 2);       
    const end = new Date(endTime).getTime();
    const now = new Date(currentTime).getTime();
    const difference = end - now;
    
    let timeLeft = {};

    if (difference > 0) {
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      timeLeft = {
        minutes,
        seconds
      };
    }

    return timeLeft as { minutes: number; seconds: number };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      {timeLeft.minutes !== undefined ? (
        <span>
          {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      ) : (
        <span>Auction Ended</span>
      )}
    </div>
  );
};

export default CountdownTimer;


/*import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endTime: string; 
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft as { [key: string]: number };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

   const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span>Auction Ended</span>
      )}
    </div>
  );
};

export default CountdownTimer;*/