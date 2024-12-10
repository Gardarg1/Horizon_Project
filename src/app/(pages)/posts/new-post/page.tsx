'use client';

import { useAppDispatch } from '@/src/store/store';
import { useState } from 'react';
import { createPost } from '@/src/store/posts/actions';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const NewPostPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [file, setFile] = useState<string | Blob>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSendNewPost = async () => {
    const formData = new FormData();

    if (title && file && content) {
      formData.append('title', title);
      formData.append('img', file as string | Blob);
      formData.append('content', content);
      dispatch(createPost(formData)).then(() => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          iconColor: '#e77f2a',
          confirmButtonColor: '#e77f2a',
        }).then(() => {
          router.push('/');
        });
      });
    }
  };
  const inputClass =
    'text-element rounded-lg my-2 h-8 placeholder:text-element p-1 px-2 border-2 border-orange outline-1 focus:outline-element ';

  return (
    <div className="w-1/2 rounded-3xl bg-white p-6">
      <div className="flex flex-col items-center justify-center pt-12 md:w-full md:px-8 md:py-6">
        <h1 className="text-element outline-orange mb-8 text-2xl outline-1">Add new post</h1>
        <input
          className={inputClass + 'px-4 text-center'}
          type="title"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputClass + 'h-20 w-full'}
          placeholder="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className={inputClass + 'h-auto p-4'}
          onChange={(e) => {
            if (e.target.files) setFile(e.target.files[0]);
          }}
          type="file"
          accept="image/*"
        />
        <div className="mb-4 flex w-full items-center justify-center">
          <button
            onClick={handleSendNewPost}
            className="mx-4 my-2 min-w-32 rounded-[2rem] bg-gray-300 p-2"
          >
            Надіслати
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;
