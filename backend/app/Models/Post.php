<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'body',
        'userID',
        'imageID'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function image()
    {
        return $this->belongsTo(Image::class, "imageID");
    }
}
