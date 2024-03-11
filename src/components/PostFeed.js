import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/post.css';
import PostComponent from './PostComponent';

function PostFeed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const batchSize = 3; // Количество страниц данных для загрузки сразу
    const observer = useRef();

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('Token');
                const responses = await Promise.all(
                    Array.from({ length: batchSize }, (_, i) =>
                        axios.get(`http://127.0.0.1:8000/api/post?page=${currentPage + i}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                    )
                );
                const newPosts = responses.flatMap((response, i) => response.data.data);
                setPosts(prevPosts => [...prevPosts, ...newPosts]);
                setLoading(false);
                setCurrentPage(prevPage => prevPage + batchSize);
                setHasMore(responses.some(response => response.data.next_page_url !== null));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        if (hasMore && !loading) {
            getPosts();
        }
    }, [currentPage, hasMore, loading]);

    useEffect(() => {
        observer.current = new IntersectionObserver(handleObserver, { threshold: 0.5 });
        if (observer.current) {
            observer.current.observe(document.querySelector('#end-of-list'));
        }
    }, []);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && hasMore) {
            setCurrentPage(prevPage => prevPage + batchSize);
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
