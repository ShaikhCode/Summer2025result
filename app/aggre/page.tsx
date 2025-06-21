// app/aggre/page.tsx
"use client";
import { studentsData as aggreStudents } from "@/app/aggre";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";

const getRemarkColor = (remark: string) => {
  switch (remark) {
    case "FIRST CLASS DIST.":
      return "bg-teal-500 text-white";
    case "FIRST CLASS":
      return "bg-blue-500 text-white";
    case "Second Class":
      return "bg-yellow-500";
    case "ATKT":
      return "bg-red-500";
    case "Fail":
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
};

export default function AggrePage() {
  const sortedAggre = aggreStudents.sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl font-bold">Aggregate Leaderboard</h1>
          <p className="text-xl mt-2">Overall Rankings of All Students Based on Aggregate</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Aggregate Leaderboard
            </CardTitle>
            <CardDescription>Sorted by Total Percentage</CardDescription>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Seat Number</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Remark</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAggre.map((student, index) => (
                  <TableRow key={student.seatNumber}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.seatNumber}</TableCell>
                    <TableCell className="font-semibold">{student.percentage}%</TableCell>
                    <TableCell>
                      <Badge className={getRemarkColor(student.remark)}>{student.remark}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
