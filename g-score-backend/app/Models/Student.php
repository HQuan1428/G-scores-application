<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class student extends Model
{
    // table name
    protected $table = 'students';

    public $timestamps = false;

    protected $fillable = [
        'registration_number',
        'foreign_language_code',
    ];

    public function scores()
    {
        return $this->hasMany(Score::class, 'student_id', 'id');
    }
}
