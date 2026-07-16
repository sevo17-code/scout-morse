export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        scout: {
          gold: '#C9A84C',      // دهب النسر الذهبي
          darkGold: '#A8893A',  
          green: '#1E4A3A',     // أخضر كشفي غامق
          lightGreen: '#2F6B55',
          cream: '#FDF8F0',     // بيج كريمي للخلفيات
          dark: '#0F2A20',
          red: '#8B1A1A',       // عنابي للزرار المهمة
        }
      },
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}