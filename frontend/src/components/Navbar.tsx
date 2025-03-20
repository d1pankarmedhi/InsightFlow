import { Moon, Sun, Settings, Github } from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function Navbar({ isDarkMode, onThemeToggle }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">InsightGen</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/yourusername/insightgen"
              target="_blank"
              rel="noreferrer"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <button
              onClick={onThemeToggle}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
