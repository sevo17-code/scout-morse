// src/components/Timer.jsx
export default function Timer({ secondsLeft }) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isLow = secondsLeft <= 10;

  return (
    <div className={`text-lg font-bold ${isLow ? 'text-red-500' : 'text-scout'}`}>
      ⏱️ {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
