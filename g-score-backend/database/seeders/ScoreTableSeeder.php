<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

class ScoreTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * 
     *  @return void
     */
    public function run(): void
    {
        $csvPath = base_path('dataset\score.csv');

        // Read data from csv file
        $csv = Reader::createFromPath($csvPath, 'r');
        $csv->setHeaderOffset(0);

        $header = $csv->getHeader();

        // filter out sbd and ma_ngoai_ngu
        $subjects = array_filter($header, fn($col) => !in_array($col, ['sbd', 'ma_ngoai_ngu']));

        // create subjects
        $subjectMap = [];
        foreach ($subjects as $subjectName) {
            $subjectId = DB::table('subjects')->insertGetId([
                'name' => $subjectName,
            ]);
            $subjectMap[$subjectName] = $subjectId;
        }

        // insert data into scores table
        $records = $csv->getRecords();

        foreach ($records as $row) {
            // Create student record
            $studentId = DB::table('students')->insertGetId([
                'registration_number' => $row['sbd'],
                'foreign_language_code' => $row['ma_ngoai_ngu'],
            ]);

            // Insert scores for each subject
            foreach ($subjectMap as $subjectName => $subjectId) {
                $score = $row[$subjectName];

                if ($score === null || $score === '') {
                    continue; // bỏ qua nếu không có điểm
                }

                DB::table('scores')->insert([
                    'student_id' => $studentId,
                    'subject_id' => $subjectId,
                    'score' => floatval($score),
                ]);
            }
        }
        
    }
}
