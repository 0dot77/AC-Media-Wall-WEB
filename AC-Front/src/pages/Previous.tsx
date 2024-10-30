import '../styles/Previous.css'
import { useState, useEffect } from 'react';
import { Poster } from '../types/types';

function Previous() {
    const [query, setQuery] = useState('');
    const [allPosters, setAllPosters] = useState<Poster[]>([]);
    const [searchResults, setSearchResults] = useState<Poster[]>([]);

    useEffect(() => {
        const fetchAllPosters = async () => {
            try {
                const res = await fetch('http://localhost:3001/posters');
                if (!res.ok) {
                    throw new Error('전체 포스터를 불러오는데 실패했습니다.');
                }
                const data = await res.json();
                setAllPosters(data);
                setSearchResults(data); // 초기에는 전체 포스터를 보여줌
            } catch (error) {
                console.error('전체 포스터를 불러오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchAllPosters();
    }, []);

    useEffect(() => {
        if (query.trim() === '') {
            setSearchResults(allPosters); // 검색어가 없으면 전체 포스터를 보여줌
        } else {
            const fetchSearchResults = async () => {
                try {
                    const res = await fetch(`http://localhost:3001/search?query=${query}`);
                    if (!res.ok) {
                        throw new Error('검색 결과를 불러오는데 실패했습니다.');
                    }
                    const data = await res.json();
                    setSearchResults(data);
                } catch (error) {
                    console.error('검색 결과를 불러오는 중 오류가 발생했습니다:', error);
                }
            };

            fetchSearchResults();
        }
    }, [query, allPosters]);

    return (
        <div className='previous-container'>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="공연 제목을 입력해주세요."
            />
            <ul className='previous-list'>
                {searchResults.map((poster, index: number) => (
                    <li key={index}>
                        <img src={poster.poster} alt={poster.title} />
                        <h3>{poster.title}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Previous;