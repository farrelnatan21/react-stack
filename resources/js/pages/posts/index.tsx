
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

interface Post{
    id: number;
    title: string;
    content: string;
    image: string | null;
    file: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export default function PostsIndex( {posts}: {posts: Post[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='flex justify-end'>
                    <Link href={route('posts.create')} className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700">New Post</Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Thumbnail</TableHead>
                        <TableHead className="text-right">action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.content}</TableCell>
                                <TableCell>
                                    {post.image ? (
                                        <img src={post.image} alt={post.title} className="h-10 w-10 object-cover" />
                                    ) : (
                                        'No Image'
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={route('posts.edit', post.id)} className="text-blue-600 hover:underline">Edit</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
