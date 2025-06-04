<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostIndexController;
use App\Http\Controllers\PostsCreateController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
   Route::get('posts', PostIndexController::class)->name('posts.index');
   Route::get('posts/create', PostsCreateController::class)->name('posts.create');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';