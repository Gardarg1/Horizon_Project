'use client';

import defaultImg from '@/public/images/defaultPostsImg.png';
import { findPost } from '@/src/store/posts/actions';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const PostsPage = () => {
  const { postId } = useParams<{ postId: string }>();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(findPost(postId));
  }, [dispatch, postId]);

  const post = useAppSelector((state) => state.posts.currentPage);
  const postImage = post.img ? process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + post.img : defaultImg;

  return (
    <div className="relative mx-auto w-1/2 rounded-3xl bg-white p-8">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={postImage}
          alt={`Image of posts ${post.title}`}
          className="mb-12 h-40 w-full"
          width={400}
          height={400}
        />
        <div className="text-center">{post.content}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 m-auto max-h-fit max-w-fit rounded-md bg-fourth p-1 text-center text-3xl text-white">
        {post.title}
      </div>
    </div>
  );
};

export default PostsPage;
