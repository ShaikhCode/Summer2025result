"use client";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Search, Trophy, Users, TrendingUp, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data structure
// const studentsData = [
// ];
import { studentsData } from "@/app/studentdb";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAllStudents, setShowAllStudents] = useState(false);

  const handleSearch = () => {
    const student = studentsData.find(
      (s) =>
        s.seatNumber.trim().toLowerCase() === searchTerm.trim().toLowerCase() ||
        s.elnum?.trim().toLowerCase() === searchTerm.trim().toLowerCase()
    );
    setSelectedStudent(student);
  };

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

  const getRemarkEmoji = (remark: string) => {
    switch (remark) {
      case "FIRST CLASS DIST.":
        return "🏆";
      case "FIRST CLASS":
        return "🥇";
      case "Second Class":
        return "🥈";
      case "ATKT":
        return "⚠️";
      case "Fail":
        return "❌";
      default:
        return "📊";
    }
  };

  const topStudents = studentsData
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  const allStudentsRanked = studentsData.sort(
    (a, b) => b.percentage - a.percentage
  );

  const classStats = {
    totalStudents: studentsData.length,
    averagePercentage: (
      studentsData.reduce((sum, s) => sum + s.percentage, 0) /
      studentsData.length
    ).toFixed(1),
    distinctions: studentsData.filter((s) => s.remark === "FIRST CLASS DIST.")
      .length,
    atkts: studentsData.filter((s) => s.remark === "ATKT").length,
    highestScore: Math.max(...studentsData.map((s) => s.percentage)),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl font-bold">2025 Summer Results</h1>
          <p className="text-xl mt-2">
            Applicable Only to Theem College Diploma Students – Batch 2022–2025
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!selectedStudent ? (
          <>
            {/* Search Section */}
            <Card className="mb-8 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Search className="w-6 h-6" />
                  Search Your Result
                </CardTitle>
                <CardDescription>
                  Enter your seat number or Enrollment number to view your
                  detailed result
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 max-w-md mx-auto">
                  <Input
                    placeholder="Enter seat/enrollment number (e.g., 22163500XX)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="text-lg"
                  />
                  <Button
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600"
                  >
                    Search
                  </Button>
                </div>

                {searchTerm &&
                  !studentsData.find(
                    (s) =>
                      s.seatNumber.trim().toLowerCase() ===
                        searchTerm.trim().toLowerCase() ||
                      (s.elnum &&
                        s.elnum.trim().toLowerCase() ===
                          searchTerm.trim().toLowerCase())
                  ) && (
                    <p className="text-red-500 text-center mt-4">
                      No result found for: {searchTerm.trim()}
                    </p>
                  )}
              </CardContent>
            </Card>

            {/* Class Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="text-center shadow-lg">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">
                    {classStats.totalStudents}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Total Students
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg">
                <CardContent className="pt-6">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">
                    {classStats.averagePercentage}%
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Class Average
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg">
                <CardContent className="pt-6">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">
                    {classStats.distinctions}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Distinctions
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg">
                <CardContent className="pt-6">
                  <ArrowUpRight className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-600">
                    {classStats.highestScore}%
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Highest Score
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg">
                <CardContent className="pt-6">
                  <ArrowUpRight className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-600">
                    <a href="https://portfolio-ecru-iota-44.vercel.app/" target="_blank" rel="noopener noreferrer">GAMA</a>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Portfolio
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard */}
            <Card
              className="shadow-xl"
              style={{ backgroundColor: "rgb(231 239 248)" }}
            >
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Class Leaderboard
                </CardTitle>
                <CardDescription>
                  Top performing students in CO-6I
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topStudents.map((student, index) => (
                    <div
                      key={student.seatNumber}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {index === 0 && (
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                            1
                          </div>
                        )}
                        {index === 1 && (
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                            2
                          </div>
                        )}
                        {index === 2 && (
                          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                            3
                          </div>
                        )}
                        {index > 2 && (
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="font-semibold">{student.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Seat No: {student.seatNumber}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">
                          {student.percentage}%
                        </div>
                        <Badge className={getRemarkColor(student.remark)}>
                          {getRemarkEmoji(student.remark)} {student.remark}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Dialog
                    open={showAllStudents}
                    onOpenChange={setShowAllStudents}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="lg">
                        See All Students
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Complete Class Rankings</DialogTitle>
                      </DialogHeader>
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
                          {allStudentsRanked.map((student, index) => (
                            <TableRow key={student.seatNumber}>
                              <TableCell className="font-medium">
                                {index + 1}
                              </TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.seatNumber}</TableCell>
                              <TableCell className="font-semibold">
                                {student.percentage}%
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={getRemarkColor(student.remark)}
                                >
                                  {student.remark}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card> 

          </>
        ) : (
          <div className="space-y-6">
            {/* Back Button */}
            <Button
              onClick={() => setSelectedStudent(null)}
              variant="outline"
              className="mb-4"
            >
              ← Back to Search
            </Button>

            {/* Student Info Card */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                <CardTitle className="text-2xl">
                  {getRemarkEmoji(selectedStudent.remark)} Result for{" "}
                  {selectedStudent.name}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Seat Number: {selectedStudent.seatNumber}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 bg-white dark:bg-gray-900">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">
                      Student Details
                    </h3>
                    <div className="space-y-2 text-gray-800 dark:text-gray-100">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {selectedStudent.name}
                      </p>
                      <p>
                        <span className="font-medium">Class:</span>{" "}
                        {selectedStudent.class}
                      </p>
                      <p>
                        <span className="font-medium">Semester:</span>{" "}
                        {selectedStudent.semester}
                      </p>
                      <p>
                        <span className="font-medium">Seat Number:</span>{" "}
                        {selectedStudent.seatNumber}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Performance</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Overall Percentage</span>
                          <span className="font-bold text-2xl text-green-600">
                            {selectedStudent.percentage}%
                          </span>
                        </div>
                        <Progress
                          value={selectedStudent.percentage}
                          className="h-3 bg-blue-100 dark:bg-gray-700"
                        />
                      </div>
                      <div>
                        <Badge
                          className={`${getRemarkColor(
                            selectedStudent.remark
                          )} text-lg px-4 py-2`}
                        >
                          {getRemarkEmoji(selectedStudent.remark)}{" "}
                          {selectedStudent.remark}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject-wise Marks */}
            <Card className="shadow-xl bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedStudent.subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2 text-gray-800 dark:text-gray-200">
                        <span className="font-medium">{subject.name}</span>
                        <span className="font-bold">
                          {subject.marks}/{subject.total}
                        </span>
                      </div>
                      <Progress
                        value={(subject.marks / subject.total) * 100}
                        className="h-2 bg-blue-100 dark:bg-gray-600"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PDF Actions */}
            <Card className="shadow-xl bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Official Result Document</CardTitle>
                <CardDescription>
                  Download or view your official MSBTE result certificate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {/* View PDF in new tab */}
                  <a
                    href={selectedStudent.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View PDF
                    </Button>
                  </a>

                  {/* Download PDF */}
                  <a href={selectedStudent.pdfPath} download>
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
