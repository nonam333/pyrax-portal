import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataTableProps {
  title?: string;
  description?: string;
  data: string;
  [key: string]: any;
}

export function DataTable({ title, description, data }: DataTableProps) {
  // Parse JSON data
  let tableData: any = {};
  try {
    tableData = JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse table data:", e);
    return null;
  }

  const { headers, rows } = tableData;

  if (!headers || !rows) {
    return null;
  }

  return (
    <Card className="my-8 border-border/50 bg-card/50 backdrop-blur overflow-hidden">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-2xl">{title}</CardTitle>}
          {description && <CardDescription className="text-base">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary/30 hover:to-accent/30 border-b border-primary/30">
                {headers.map((header: string, index: number) => (
                  <TableHead
                    key={index}
                    className="text-white font-bold text-base"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row: any[], rowIndex: number) => (
                <TableRow
                  key={rowIndex}
                  className="hover:bg-primary/5 transition-colors border-b border-border/50"
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={cellIndex === 0 ? "font-medium" : ""}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
