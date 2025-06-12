<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostUpdateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Post $post)
{
    $data = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'image' => 'nullable|image|max:2048',
        'file' => 'nullable|file|max:2048', // Optional image validation
    ]);
    $data['slug'] = str($data['title'])->slug();
    $data['image'] = $post->image; // Default to existing image
    $data['file'] = $post->file; // Default to existing file

    if ($request->hasFile('image')) {
        # code...
        Storage::disk('public')->delete($post->image);
        $data['image'] = Storage::disk('public')->put(
            'images',
            $request->file('image')
        );
    }
    if ($request->hasFile('file')) {
        # code...
        Storage::disk('public')->delete($post->file);
        $data['file'] = Storage::disk('public')->put(
            'files',
            $request->file('file')
        );
    }

    $post->update($data);
    return to_route('posts.index')
        ->with('success', 'Post updated successfully!');
}
}
