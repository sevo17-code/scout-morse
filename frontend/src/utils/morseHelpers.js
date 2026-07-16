// src/utils/morseHelpers.js
// جدول شفرة مورس للأبجدية العربية الـ28 (نفس جدول الباك إند بالظبط)

export const arabicLettersMorse = {
  ا: '.-',
  ب: '-...',
  ت: '-',
  ث: '-.-.',
  ج: '.---',
  ح: '....',
  خ: '---',
  د: '-..',
  ذ: '--..',
  ر: '.-.',
  ز: '---.',
  س: '...',
  ش: '----',
  ص: '-.-.',
  ض: '...-',
  ط: '..-',
  ظ: '-.--',
  ع: '.-.-',
  غ: '--.',
  ف: '..-.',
  ق: '--.-',
  ك: '-.-',
  ل: '.-..',
  م: '--',
  ن: '-.',
  ه: '..-..',
  و: '.--',
  ي: '..',
};

export function getRandomLetter() {
  const letters = Object.keys(arabicLettersMorse);
  return letters[Math.floor(Math.random() * letters.length)];
}

// تشغيل صوت شفرة مورس بـ Web Audio API - بدون أي ملفات صوت خارجية
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playMorseAudio(morseCode, options = {}) {
  if (!morseCode) return 0;

  const ctx = getAudioContext();
  const unit = options.unit || 0.12;
  const freq = options.freq || 600;

  let time = ctx.currentTime;

  [...morseCode].forEach((symbol) => {
    if (symbol === '.' || symbol === '-') {
      const duration = symbol === '.' ? unit : unit * 3;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.3, time + 0.005);
      gain.gain.setValueAtTime(0.3, time + duration - 0.005);
      gain.gain.linearRampToValueAtTime(0, time + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + duration);
      time += duration + unit;
    } else if (symbol === ' ') {
      time += unit * 2;
    }
  });

  return time - ctx.currentTime;
}
