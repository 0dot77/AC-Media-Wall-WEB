import { Poster } from '../types/types';
import { useState, useEffect } from 'react';
import '../styles/CurrentPosterList.css';

const CurrentPosterList = () => {
    // const dummyData: Poster[] = [
    //     {
    //         id: 1,
    //         name: '홍길동',
    //         phone: '010-1234-5678',
    //         startDate: '2023-01-01',
    //         endDate: '2023-12-31',
    //         title: '더미 공연 1',
    //         poster: 'uploads/dummy-poster1.png',
    //         password: 'dummyPassword1',
    //         uploadDate: '2023-01-01T00:00:00Z'
    //     },
    //     {
    //         id: 2,
    //         name: '김철수',
    //         phone: '010-8765-4321',
    //         startDate: '2023-02-01',
    //         endDate: '2023-11-30',
    //         title: '더미 공연 2',
    //         poster: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    //         password: 'dummyPassword2',
    //         uploadDate: '2023-02-01T00:00:00Z'
    //     }
    // ]; 
    const [currentPage, setCurrentPage] = useState(1); 
    const [posters, setPosters] = useState<Poster[]>();
    const [loading, setLoading] = useState(true);
    const [passwordModal, setPasswordModal] = useState(false);
    const [password, setPassword] = useState('');

    const itemsPerPage = 1;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = posters ? posters.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalPages = posters ? Math.ceil(posters.length / itemsPerPage) : 0;

    const handleNextPage = () => {
        if(currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, posterId: number) => {
        const file = e.target.files?.[0];
        setPasswordModal(true);

        if(file && password) {
            const formData = new FormData();
            formData.append('poster', file);
            formData.append('password', password);

            fetch(`http://localhost:3001/upload/${posterId}`, {
                method: 'PUT',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('파일 업로드 중 오류가 발생했습니다:', error);
            });
        }
    };

    // 패스워드 모달 컴포넌트 추가
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = () => {
        setPasswordModal(false);
    };

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await fetch('http://localhost:3001/posters');
                if (!response.ok) {
                    throw new Error('포스터를 가져오는데 실패했습니다.');
                }
                const data = await response.json();
                setPosters(data);
            } catch (error) {
                console.error('포스터를 가져오는 중 오류가 발생했습니다:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosters();
    }, []);

    if (loading) {
        return <div className='loading'>데이터를 불러오는 중입니다...</div>;
    }

    return (
        <div className="current-poster-info-container">
            {passwordModal && (
                <div className="modal">
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        id="password"
                        className="password-input"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button className="submit-button" onClick={handlePasswordSubmit}>
                        확인
                    </button>
                </div>
            )}
            <div className="current-poster-info-item-container">
            {currentItems.map((poster) => (
                <div key={poster.id} className="current-poster-info-item">
                    <div className="poster-detail">
                        <h2>1. 게시 기간</h2>
                        <div className="poster-period-container">
                            <p className="poster-period">{poster.startDate}</p><span>~</span><p className="poster-period">{poster.endDate}</p>
                        </div>
                    </div>
                    <div className="poster-detail">
                        <h2>2. 공연명</h2>
                        <div className="poster-title-container">
                            <p className="poster-title">{poster.title}</p>
                        </div>
                    </div>
                    <div className="poster-detail">
                        <h2>3. 업로드된 포스터 이미지</h2>
                        <div className="poster-image-container">
                            <img src={`${poster.poster}`} alt={poster.title} className="poster-image" />
                            <input type="file" onChange={(e) => handleFileChange(e, poster.id)} />
                        </div>
                    </div>
                    </div>
                ))}
            </div>


            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default CurrentPosterList;