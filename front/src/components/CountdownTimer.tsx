'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetTimestamp: number;
  label?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeRemaining(targetTimestamp: number): TimeRemaining {
  const now = Math.floor(Date.now() / 1000);
  const difference = targetTimestamp - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true
    };
  }

  const days = Math.floor(difference / (24 * 60 * 60));
  const hours = Math.floor((difference % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((difference % (60 * 60)) / 60);
  const seconds = difference % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false
  };
}

export default function CountdownTimer({ targetTimestamp, label = "Time remaining" }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(targetTimestamp)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetTimestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  if (timeRemaining.isExpired) {
    return (
      <div className="text-center">
        <div className="text-sm font-semibold text-red-400 mb-1">Nomination Phase Ended</div>
        <div className="text-xs text-text-dimmed">The nomination period has concluded</div>
      </div>
    );
  }

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="text-center">
      <div className="text-sm font-semibold text-text-primary mb-1">{label}</div>
      <div className="flex items-center justify-center gap-2">
        {timeRemaining.days > 0 && (
          <div className="flex items-center gap-1">
            <div className="text-lg font-bold font-mono text-text-primary bg-surface-default border border-border-default rounded px-2 py-1 min-w-[40px]">
              {timeRemaining.days}
            </div>
            <span className="text-xs text-text-dimmed">d</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <div className="text-lg font-bold font-mono text-text-primary bg-surface-default border border-border-default rounded px-2 py-1 min-w-[40px]">
            {formatTime(timeRemaining.hours)}
          </div>
          <span className="text-xs text-text-dimmed">h</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-lg font-bold font-mono text-text-primary bg-surface-default border border-border-default rounded px-2 py-1 min-w-[40px]">
            {formatTime(timeRemaining.minutes)}
          </div>
          <span className="text-xs text-text-dimmed">m</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-lg font-bold font-mono text-text-primary bg-surface-default border border-border-default rounded px-2 py-1 min-w-[40px]">
            {formatTime(timeRemaining.seconds)}
          </div>
          <span className="text-xs text-text-dimmed">s</span>
        </div>
      </div>
    </div>
  );
}
