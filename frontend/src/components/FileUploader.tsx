import { useState } from "react";
import { Upload, File, X } from "lucide-react";
import * as XLSX from "xlsx";

interface FileUploaderProps {
  onDataLoaded: (data: any) => void;
}

export function FileUploader({ onDataLoaded }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleFile = async (file: File) => {
    try {
      if (file.name.endsWith(".csv")) {
        const text = await file.text();
        const rows = text.split("\n").map((row) => row.split(","));
        const headers = rows[0];
        const data = rows.slice(1).map((row) => {
          const obj: Record<string, string> = {};
          headers.forEach((header, i) => {
            obj[header.trim()] = row[i]?.trim() || "";
          });
          return obj;
        });
        setCurrentFile(file);
        onDataLoaded(data);
      } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setCurrentFile(file);
        onDataLoaded(data);
      }
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Error reading file. Please try again.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const clearFile = () => {
    setCurrentFile(null);
    onDataLoaded(null);
  };

  return (
    <div className="space-y-2">
      {currentFile ? (
        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <File className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {currentFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(currentFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                className="ml-4 p-2 hover:bg-muted rounded-lg transition-colors"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`
            relative rounded-lg border-2 border-dashed transition-colors
            ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium mb-1">Drop your file here</p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
            <div className="mt-4 pt-4 border-t border-dashed">
              <p className="text-xs text-muted-foreground">
                Supports CSV and Excel files
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
