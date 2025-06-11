
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Post',
        href: '/posts/create',
    },
];

type PostFormData = {
    title: string;

    content: string;
    image: File | null;
    file: File | null;
};

export default function PostsIndex() {
    const { data, setData, post, errors } = useForm<PostFormData>({
        title: '',
        content: '',
        image: null,
        file: null,
    });
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setData('file', file);
        }
    };

    const submit: FormEventHandler = (e) => {
            e.preventDefault();
            post(route('posts.store'));
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
                <form className="flex flex-col gap-4 p-4" onSubmit={submit}>
                <section className="p-4">
                    <div className="mb-4">
                    <Label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </Label>
                    <Input id="title" type="text" placeholder="Enter post title" className="mb-4 w-full" value={data.title} onChange={(e) => setData('title', e.target.value)}/>
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>
                    <Label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Slug
                    </Label>

                    <Textarea id="content" placeholder="Enter post content" className="mb-4 w-full" rows={5} value={data.content} onChange={(e) => setData('content', e.target.value)}/>
                    <Label htmlFor='image' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Image
                    </Label>
                    <Input id='image' type="file" onChange={handleFileChange}/>
                    <Label htmlFor='file' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        File
                    </Label>
                    <Input id="file" type="file" accept=".pdf,.doc,.docx" className="mb-4 w-full"  onChange={handleFileChange}/>
                    <br />
                    <div className="flex justify-end">
                       <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700" disabled={processing}>
                            Create Post
                        </Button>
                    </div>

                </section>
                </form>
                </div>
            </div>
        </AppLayout>
    );
}
