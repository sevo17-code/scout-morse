// src/components/MorsePlayer.jsx
import { playMorseAudio } from '../utils/morseHelpers.js';

export default function MorsePlayer({ code, label = ' استمع للشفرة' }) {
  function handlePlay() {
    if (code) playMorseAudio(code);
  }

  return (
    <button
      onClick={handlePlay}
      type="button"
      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-semibold transition"
    >
      {label}
    </button>
  );
}
