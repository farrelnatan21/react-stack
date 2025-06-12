<?php

namespace App\Http\Controllers;
use App\Models\Post;
use Illuminate\Http\Request;

class PostsEditController extends Controller
{
    public function __invoke(Request $request, Post $post)
    {
        return inertia('posts/edit', [
            'currentPost' => $post,
        ]);
    }
}