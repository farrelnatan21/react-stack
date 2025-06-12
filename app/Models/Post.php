<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'file',
        'created_by',
        'slug',
        'image'
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
