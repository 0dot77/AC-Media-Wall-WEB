import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Layout.css';

const Layout = ({children}: {children: React.ReactNode}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path: string) => {
        navigate(path);
    }

    const isActive = (path: string) => {
        return location.pathname === path;
    }

    return  (
    <div className='main-container'>
        <div className='main-left-sidebar'>
            <div className='main-left-sidebar-title'>
                    <h1>IMW</h1>
                </div>
                <div className='main-left-sidebar-nav'>
                    <nav>
                        <ul>
                            <li onClick={() => handleNavigate('')} className={isActive('/') ? 'active' : ''}>
                                <div className='main-left-sidebar-nav-item'>
                                    새로운 포스터 업로드
                                </div>
                            </li>
                            <li onClick={() => handleNavigate('now')} className={isActive('/now') ? 'active' : ''}>
                                <div className='main-left-sidebar-nav-item'>
                                    현재 포스터
                                </div>
                            </li>
                            <li onClick={() => handleNavigate('previous')} className={isActive('/previous') ? 'active' : ''}>
                                <div className='main-left-sidebar-nav-item'>
                                    지난 포스터 보기
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className='main-center-contents'>
                {children}
            </div>
            <div className='main-right-sidebar'>
                <div className='main-right-sidebar-text'>
                    <h3>이곳은 한국예술종합학교 이어령 예술극장 미디어월에 삽입되는 공연 포스터를 업로드할 수 있는 웹페이지 입니다. 아래의 내용을 확인하여 미디어월에 새로운 포스터를 업로드 할 수 있습니다.</h3>
                </div>
                <div className='main-right-sidebar-contents'>
                <div className='main-right-sidebar-notion'>
                    <div className='main-right-sidebar-notion-title'>
                        <h3>Notion</h3>
                    </div>
                    <ul className='main-right-sidebar-notion-contents'>
                        <li>파일 크기 : 10MB 이하</li>
                        <li>파일 형식 : jpg, png</li>
                        <li>최적 사이즈 : 1080 * 340 (px)</li>
                    </ul>
                </div>
                <div className='main-right-sidebar-contact'>
                    <div className='main-right-sidebar-contact-title'>
                        <h3>Contact</h3>
                    </div>
                    <div className='main-right-sidebar-contact-phone'>
                        <p>010-9964-3323 유태양</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Layout;