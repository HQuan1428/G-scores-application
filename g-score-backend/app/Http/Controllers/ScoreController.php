<?php

namespace App\Http\Controllers;

use App\Models\student;
use App\Models\score;
use App\Models\subject;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    /**
     * Check score from registration number input
     */
    public function checkScore(Request $request)
    {
        try {
            $request->validate(['registration_number' => 'required']);

            $student = Student::where('registration_number', $request->registration_number)
                ->with('scores.subject')
                ->first();

            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }

            $subjects = Subject::pluck('name')->toArray();

            $scoreMap = [];
            foreach ($student->scores as $score) {
                $scoreMap[$score->subject->name] = floatval($score->score);
            }

            $result = [
                'sbd' => $student->registration_number,
                'ma_ngoai_ngu' => $student->foreign_language_code,
            ];

            foreach ($subjects as $subjectName) {
                $result[$subjectName] = $scoreMap[$subjectName] ?? "";
            }

            return response()->json($result);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Database error occurred'], 500);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred'], 500);
        }

    }

    /**
     * statistics of the number ò students in each class
     */
    public function scoreReport()
    {
        try {
            $resultsFromDb = DB::table('subjects')
                ->leftJoin('scores', 'subjects.id', '=', 'scores.subject_id')
                ->select(
                    'subjects.name',
                    // Dùng COUNT và CASE WHEN để đếm theo từng khoảng điểm
                    DB::raw("COUNT(CASE WHEN scores.score >= 8 THEN 1 END) as bucket_ge8"),
                    DB::raw("COUNT(CASE WHEN scores.score >= 6 AND scores.score < 8 THEN 1 END) as bucket_6_to_8"),
                    DB::raw("COUNT(CASE WHEN scores.score >= 4 AND scores.score < 6 THEN 1 END) as bucket_4_to_6"),
                    DB::raw("COUNT(CASE WHEN scores.score < 4 THEN 1 END) as bucket_lt4")
                )
                ->groupBy('subjects.id', 'subjects.name')
                ->orderBy('subjects.name')
                ->get();

            if ($resultsFromDb->isEmpty()) {
                return response()->json(['message' => 'Subject Not Found'], 404);
            }

            $report = $resultsFromDb->map(function ($row) {
                return [
                    'subject' => $row->name,
                    // Sửa lại tên key cho nhất quán và dễ hiểu
                    '>=8' => (int)$row->bucket_ge8,
                    '6-8' => (int)$row->bucket_6_to_8,
                    '4-6' => (int)$row->bucket_4_to_6,
                    '<4'  => (int)$row->bucket_lt4,
                ];
            });

            return response()->json($report);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Error processing report'], 500);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred'], 500);
        }
    }

    /**
     * Top ten student group A (toan, vat_ly, hoa_hoc)
     */

    public function topTen()
    {
        try {
            // List subject of group A
            $targetSubjects = ['toan', 'vat_li', 'hoa_hoc'];

            $rank = DB::table('students')
                ->join('scores', 'students.id', '=', 'scores.student_id')
                ->join('subjects', 'scores.subject_id', '=', 'subjects.id')
                ->select(
                    'students.registration_number',
                    DB::raw('SUM(scores.score) as total_score'),
                    DB::raw("SUM(CASE WHEN subjects.name = 'toan' THEN scores.score ELSE 0 END) as toan"),
                    DB::raw("SUM(CASE WHEN subjects.name = 'vat_li' THEN scores.score ELSE 0 END) as vat_li"),
                    DB::raw("SUM(CASE WHEN subjects.name = 'hoa_hoc' THEN scores.score ELSE 0 END) as hoa_hoc")
                )
                ->whereIn('subjects.name', $targetSubjects)
                ->groupBy('students.registration_number')
                ->orderByDesc('total_score')
                ->limit(10)
                ->get();

            if ($rank->isEmpty()) {
                return response()->json(['message' => 'Không tìm thấy dữ liệu xếp hạng'], 404);
            }

            return response()->json($rank);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Lỗi cơ sở dữ liệu, vui lòng thử lại sau'], 500);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi hệ thống, vui lòng thử lại sau'], 500);
        }
    }

}
