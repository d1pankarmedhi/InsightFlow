interface DataPreviewProps {
  data: any[];
}

export function DataPreview({ data }: DataPreviewProps) {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);
  const previewRows = data.slice(0, 3);

  return (
    <div className="text-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="p-2 text-left font-medium text-muted-foreground border-b bg-muted/50"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewRows.map((row, i) => (
              <tr key={i} className="border-b last:border-0">
                {headers.map((header) => (
                  <td key={header} className="p-2 truncate max-w-[150px]">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > 3 && (
        <div className="text-xs text-muted-foreground mt-2 text-center">
          Showing 3 of {data.length} rows
        </div>
      )}
    </div>
  );
}
