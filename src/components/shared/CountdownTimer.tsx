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

  return (
    <div className="flex items-baseline gap-1 font-mono tracking-wider">
      <div className="flex flex-col items-center">
        <span className={`${textSize} font-bold text-primary`}>{padZero(hours)}</span>
        <span className={`${labelSize} text-muted-foreground uppercase`}>hrs</span>
      </div>
      <span className={`${textSize} font-bold text-primary/50`}>:</span>
      <div className="flex flex-col items-center">
        <span className={`${textSize} font-bold text-primary`}>{padZero(minutes)}</span>
        <span className={`${labelSize} text-muted-foreground uppercase`}>min</span>
      </div>
      <span className={`${textSize} font-bold text-primary/50`}>:</span>
      <div className="flex flex-col items-center">
        <span className={`${textSize} font-bold text-primary`}>{padZero(seconds)}</span>
        <span className={`${labelSize} text-muted-foreground uppercase`}>sec</span>
      </div>
    </div>
  );
}
