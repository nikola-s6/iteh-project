<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'postID',
        'userID',
        'text'
    ];

    public function commenter()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function post()
    {
        return $this->belongsTo(User::class, 'postID');
    }
}
