import '../styles/Home.css'
import { useState } from 'react'

function Home() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        startDate: '',
        endDate: '',
        title: '',
        poster: null as File | null,
        password: '',
    });
    const [preview, setPreview] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value,files} = e.target;
        if(name === 'poster' && files) {
            setFormData({...formData, [name]: files[0]});
            setPreview(URL.createObjectURL(files[0]));
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

        //console.log(data);
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        if(files && files[0])
        {
            setFormData({...formData, poster: files[0]});
            setPreview(URL.createObjectURL(files[0]));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };




    return (
        <div className='home-container'>
            <div className='home-content'>
                <div className='home-content-register-info'>
                    <h2>등록자 정보</h2>
                <form className='register-form'>
                    <div className='form-group'>
                        <label htmlFor='name'>1. 이름</label>
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
                        <label htmlFor='phone'>2. 전화번호</label>
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
                        <label htmlFor='period'>1. 게시 기간</label>
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
                        <label htmlFor='title'>2. 공연명</label>
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
                        <label htmlFor='poster'>3. 포스터 이미지 업로드</label>
                        <div className="upload-box" onDrop={handleDrop} onDragOver={handleDragOver}>
                            {preview ? (
                                <img src={preview} alt='포스터 이미지' className='image-preview' />
                            ) : (
                                <>
                                    <div className="upload-icon">📂</div>
                                    <p>이곳에 이미지를 끌어넣어주세요</p>
                                </>
                            )}
                        </div>
                        <div className='file-info'>
                            <input
                                type='file'
                                id='poster'
                                name='poster'
                                accept='image/*'
                                onChange={handleChange}
                        />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>4. 비밀번호</label>
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
                <div className='home-content-register-button-container'>
                    <button className='home-content-register-button' onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Home