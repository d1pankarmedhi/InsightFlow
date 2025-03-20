import { useState, useEffect, cloneElement, ReactElement } from "react";
import { FileUploader } from "./FileUploader";
import { DataPreview } from "./DataPreview";
import { Moon, Sun, Settings, Database, History } from "lucide-react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactElement;
}

export function Layout({ children }: LayoutProps) {
  const [data, setData] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const childrenWithProps = cloneElement(children, { data });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <aside className="w-64 border-r p-4 bg-card">
          <div className="flex flex-col h-full">
            {/* Logo and Brand */}
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-primary p-2 rounded-lg">
                  <Database className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">InsightGen</span>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Data Source
              </h3>
              <FileUploader onDataLoaded={setData} />
            </div>

            {/* Data Preview if data is loaded */}
            {data && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Data Preview
                </h3>
                <div className="bg-background/50 rounded-lg border shadow-sm">
                  <DataPreview data={data} />
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-auto pt-6 border-t">
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title={
                    isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                  }
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
                <button
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="History"
                >
                  <History className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          {data ? (
            childrenWithProps
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">No Data Loaded</h2>
                <p className="text-muted-foreground max-w-sm">
                  Upload a CSV or Excel file to start analyzing your data with
                  AI-powered insights
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
