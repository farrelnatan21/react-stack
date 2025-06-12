<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostsStoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
{
    $data = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'image' => 'nullable|image|max:2048',
        'file' => 'nullable|file|max:2048',
    ]);

    $data['slug'] = str($data['title'])->slug();
    $data['created_by'] = $request->user()->id; // ✅ Tambahkan ini

    if ($request->hasFile('image')) {
        $data['image'] = Storage::disk('public')->put('images', $request->file('image'));
    }

    if ($request->hasFile('file')) {
        $data['file'] = Storage::disk('public')->put('files', $request->file('file'));
    }

    \App\Models\Post::create($data); // Gunakan model langsung jika tidak pakai relasi

    return redirect()->route('posts.index')->with('success', 'Post created successfully.');
}

}
