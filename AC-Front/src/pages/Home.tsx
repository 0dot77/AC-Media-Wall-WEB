import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function Home() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        startDate: '',
        endDate: '',
        title: '',
        poster: null as File | null,
        password: '',
    });
    
    // Hooks
    const handleNavigate = (path: string) => {
        navigate(`/${path}`);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value,files} = e.target;
        if(name === 'poster' && files) {
            setFormData({...formData, [name]: files[0]});
        } else {
            setFormData({...formData, [name]: value});
        }
    }

    const handleSubmit = async () => {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('phone', formData.phone);
        data.append('startDate', formData.startDate);
        data.append('endDate', formData.endDate);
        data.append('title', formData.title);
        data.append('poster', formData.poster as File);
        data.append('password', formData.password);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: data,
            });
            if (!response.ok) {
                throw new Error('Failed to upload file.');
            }
            console.log('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
        } 

        console.log(data);
    }


    return (
        <div className='home-container'>
            <div className='home-main'>
                <div className='home-main-title'>
                    <h1>IMW</h1>
                </div>
                <div className='home-main-nav'>
                    <nav>
                        <ul>
                            <li onClick={() => handleNavigate('')}>새로운 포스터 업로드</li>
                            <li onClick={() => handleNavigate('now')}>현재 포스터</li>
                            <li onClick={() => handleNavigate('previous')}>지난 포스터 보기</li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className='home-content'>
                <div className='home-content-register-info'>
                    <h2>등록자 정보</h2>
                <form className='register-form'>
                    <div className='form-group'>
                        <label htmlFor='name'>이름</label>
                        <input 
                            type='text'
                            id='name'
                            name='name'
                            placeholder='이름을 입력하세요'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='phone'>전화번호</label>
                        <input
                            type='tel' 
                            id='phone'
                            name='phone'
                            placeholder='전화번호를 입력하세요'
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    </form>
                </div>

                <div className='home-content-performance-info'>
                    <h2>공연 정보</h2>
                <form className='performance-form'>
                    <div className='form-group'>
                        <label htmlFor='period'>게시 기간</label>
                        <div className='period-inputs'>
                            <input
                                type='date'
                                id='startDate'
                                name='startDate'
                                value={formData.startDate}
                                onChange={handleChange}
                            />
                            <span>~</span>
                            <input
                                type='date'
                                id='endDate'
                                name='endDate'
                                value={formData.endDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='title'>공연명</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            placeholder='공연명을 입력하세요'
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='poster'>포스터 이미지</label>
                        <input
                            type='file'
                            id='poster'
                            name='poster'
                            accept='image/*'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>비밀번호</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='비밀번호를 입력하세요'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </form>
                </div>
                <button className='home-content-register-button' onClick={handleSubmit}>SAVE</button>
            </div>

            <div className='home-sidebar'>
                <div className='home-sidebar-text'>
                    <h3>이곳은 한국예술종합학교 이어령 예술극장 미디어월에 삽입되는 공연 포스터를 업로드할 수 있는 웹페이지 입니다. 아래의 내용을 확인하여 미디어월에 새로운 포스터를 업로드 할 수 있습니다.</h3>
                </div>
                <div className='home-sidebar-notion'>
                    <div className='home-sidebar-notion-title'>
                        <h3>Notion</h3>
                    </div>
                    <div className='home-sidebar-notion-contents'>
                        <p>파일 크기 : 10MB 이하</p>
                        <p>파일 형식 : jpg, png</p>
                        <p>최적 사이즈 : 1080 * 340 (px)</p>
                    </div>
                </div>
                <div className='home-sidebar-contact'>
                    <div className='home-sidebar-contact-title'>
                        <h3>Contact</h3>
                    </div>
                    <div className='home-sidebar-contact-phone'>
                        <p>010-9964-3323</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home