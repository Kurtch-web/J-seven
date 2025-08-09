import { useTheme } from '../../lib/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 1rem',
        background: 'var(--color-accent-orange)',
        color: 'white',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
