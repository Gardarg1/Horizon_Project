'use client';

import { useEffect, useState } from 'react';
import { PostBlock } from '../components/PagesBlocks/postBlock.component';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getPosts } from '../store/posts/actions';
import { Loader } from '../components/Custom/loader/loader.component';

const Home = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  // Fetch posts data on component mount
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const loading = useAppSelector((state) => state.posts.loading);
  const postsData = useAppSelector((state) => state.posts.data);

  // Trigger animation when data is loaded
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setIsVisible(true);
      }, 10); // Small delay for smooth animation
    }
  }, [loading]);

  return (
    <div className="h-full w-3/4 items-center justify-center">
      {loading ? (
        <Loader />
      ) : postsData.length ? (
        <div
          className={`flex transform flex-col transition-transform duration-1000 ease-in-out ${
            isVisible ? 'animate-slide-in' : 'opacity-0'
          }`}
        >
          {postsData.map((item) => (
            <PostBlock
              title={item.title}
              id={item.id}
              content={item.content}
              img={item.img}
              key={item.id}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-4 text-center text-3xl font-bold text-second">
          Список постів порожній
        </div>
      )}
    </div>
  );
};

export default Home;
