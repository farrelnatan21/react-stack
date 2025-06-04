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
        //
        $data = $request->validate([
            'title' => 'required',
            'body' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $data['slug'] = str()->slug($data['title']);
        $data['image'] = $request->file('image')->store('public/images');

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($post->image);
            $data['image'] = Storage::disk('public')->put('images', $request->file('image'));
        }
        $post->update($data);
        return to_route('posts.index');
    }
}