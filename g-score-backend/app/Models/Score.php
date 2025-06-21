<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class score extends Model
{
    protected $table = 'scores';
    protected $fillable = [
        'student_id',
        'subject_id',
        'score',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
