import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/post.css';
import PostComponent from './PostComponent';
import { fetchPosts } from '../redux/PostFeedSlice';

function PostFeed() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.postFeed.posts);
  const loading = useSelector(state => state.postFeed.loading);
  const currentPage = useSelector(state => state.postFeed.currentPage);
  const hasMore = useSelector(state => state.postFeed.hasMore);
  const batchSize = useSelector(state => state.postFeed.batchSize);
  const observer = useRef();

  useEffect(() => {
    if (hasMore && !loading) {
      dispatch(fetchPosts({ currentPage, batchSize }));
    }
  }, [currentPage, hasMore, loading, dispatch]);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, { threshold: 0.5 });
    if (observer.current) {
      observer.current.observe(document.querySelector('#end-of-list'));
    }
  }, []);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && hasMore && !loading) {
      dispatch(fetchPosts({ currentPage, batchSize }));
    }
  };

  return (
    <div className="posts">
      <div className="post-count">
        Количество постов: {posts.length}
      </div>
      {posts.map(post => (
        <PostComponent key={post.id} post={post} />
      ))}
      <div id="end-of-list" style={{ height: '10px', background: 'transparent' }}></div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default PostFeed;
