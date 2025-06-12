
import AppLayout from '@/layouts/app-layout';
import { Post, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Update Post',
        href: '/posts',
    },
];


export default function PostsEdit({currentPost}: {currentPost: Post}) {
    const [title, setTitle] = useState<string>(currentPost.title);
    const [content, setContent] = useState<string>(currentPost.content);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const { errors } = usePage().props;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setFile(file);
    }
};


    const submit: FormEventHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
        formData.append('image', image);
    }
    if (file) {
        formData.append('file', file);
    }
    formData.append('_method', 'PUT'); // penting agar dikenali sebagai PUT

    router.post(route('posts.update', currentPost.id), formData, {
        forceFormData: true, // penting agar file dikenali
        onError: (errors) => {
            console.log('Form error:', errors);
        },
    });
};

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <div className="flex items-center justify-between border-b p-4">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Create Post</h1>
                    <Link href={route('posts.index')} className="inline-flex items-center justify-center rounded-md bg-gray-200 px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                        Back to Posts
                    </Link>
                </div>
                <form className="flex flex-col gap-4 p-4" onSubmit={submit} encType='multipart/form-data'>
                <section className="p-4">
                    <div className="mb-4">
                    <Label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </Label>
                    <Input id="title" type="text" placeholder="Enter post title" className="mb-4 w-full" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>
                    <Label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Content
                    </Label>

                    <Textarea id="content" placeholder="Enter post content" className="mb-4 w-full" rows={5} value={content} onChange={(e) => setContent(e.target.value)}/>
                    {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                    <Label htmlFor='image' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Image
                    </Label>
                    <Input id='image' type="file" onChange={handleImageChange}/>
                    {imagePreview && (
                        <div className="mt-2">
                            <img src={imagePreview} alt="Image Preview" className="max-w-full h-auto rounded-md" />
                        </div>
                    )}
                    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    <br />
                    <Label htmlFor='file' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        File
                    </Label>
                    <Input id="file" type="file" accept=".pdf,.doc,.docx" className="mb-4 w-full"  onChange={handleFileChange}/>
                    {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
                    <br />
                    <div className="flex justify-end">
                       <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                            Update Post
                        </Button>
                    </div>

                </section>
                </form>
                </div>
            </div>
        </AppLayout>
    );
}
