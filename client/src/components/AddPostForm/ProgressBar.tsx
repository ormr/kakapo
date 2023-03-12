import { FC } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

interface ProgressbarProps {
  value: number;
  maxValue: number;
}

const Progressbar: FC<ProgressbarProps> = ({ value, maxValue }) => {
  const getTextFullness = () => {
    if (value >= maxValue - 20 && value < maxValue) {
      return '#71767B';
    }

    if (value >= maxValue) {
      return '#F4212E';
    }

    return '#1D9BF9';
  };

  const getPathColor = () => {
    if (value >= maxValue - 20 && value < maxValue) {
      return '#FFD400';
    }

    if (value >= maxValue && value <= maxValue + 10) {
      return '#F4212E';
    }

    if (value > maxValue + 10) {
      return 'transparent';
    }
  };

  const getTrailColor = () => {
    if (value > maxValue + 10) {
      return 'transparent';
    }
  };

  return (
    <div className="flex-1 flex justify-end">
      <div className="w-7 h-7">
        <CircularProgressbar
          value={value}
          maxValue={maxValue}
          text={value >= maxValue - 20 ? `${maxValue - value}` : ''}
          styles={buildStyles({
            textSize: '2.5rem',
            pathColor: getPathColor(),
            textColor: getTextFullness(),
            trailColor: getTrailColor(),
          })}
        />
      </div>
    </div>
  );
};

export default Progressbar;
