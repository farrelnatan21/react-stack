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
   Route::inertia('posts/create', PostsCreateController::class)->name('posts.create');
   Route::post('posts', \App\Http\Controllers\PostsStoreController::class)->name('posts.store');
    Route::get('posts/{post}/edit', \App\Http\Controllers\PostsEditController::class)->name('posts.edit');
    Route::put('posts/{post}', \App\Http\Controllers\PostsUpdateController::class)->name('posts.update');
    Route::delete('posts/{post}', \App\Http\Controllers\PostsDestroyController::class)->name('posts.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
