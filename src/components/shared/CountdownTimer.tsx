import { Fragment } from 'react';
import { padZero } from '@/lib/format-time';

interface CountdownTimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  large?: boolean;
}

export function CountdownTimer({ hours, minutes, seconds, large }: CountdownTimerProps) {
  const textSize = large ? 'text-5xl md:text-6xl' : 'text-3xl';
  const labelSize = large ? 'text-xs' : 'text-[10px]';

  const units: Array<{ value: number; unit: string }> = [
    { value: hours, unit: 'hrs' },
    { value: minutes, unit: 'min' },
    { value: seconds, unit: 'sec' },
  ];

  return (
    <div className="flex items-center gap-2 font-mono sm:gap-3">
      {units.map(({ value, unit }, i) => (
        <Fragment key={unit}>
          {i > 0 && <span className={`${textSize} font-bold text-primary/30`}>:</span>}
          <div className="flex flex-col items-center">
            <span className={`${textSize} font-bold tabular-nums text-primary`}>{padZero(value)}</span>
            <span
              className={`${labelSize} font-medium uppercase tracking-widest text-muted-foreground`}
            >
              {unit}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
