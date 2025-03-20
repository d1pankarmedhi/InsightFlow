import { useState } from "react";
import { X, Database } from "lucide-react";

interface DataPreviewDialogProps {
  data: any[];
}

export function DataPreviewDialog({ data }: DataPreviewDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const headers = Object.keys(data[0]);
  const previewRows = data.slice(0, 5);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between p-3 text-sm bg-card hover:bg-muted rounded-lg border transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Database className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-medium">Preview Data</p>
            <p className="text-xs text-muted-foreground">
              {data.length} rows loaded
            </p>
          </div>
        </div>
      </button>

      {/* Dialog Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-x-4 top-[50%] translate-y-[-50%] max-h-[85vh] bg-background rounded-lg border shadow-lg p-6 overflow-hidden md:inset-x-[50%] md:translate-x-[-50%] md:max-w-2xl">
            {/* Dialog Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Data Preview</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="overflow-auto max-h-[calc(85vh-8rem)]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    {headers.map((header) => (
                      <th
                        key={header}
                        className="p-2 text-left font-medium text-muted-foreground bg-muted/50 sticky top-0"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, i) => (
                    <tr key={i} className="border-b">
                      {headers.map((header) => (
                        <td key={header} className="p-2 text-sm">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length > 5 && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Showing 5 of {data.length} rows
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
