import { useState } from 'react';
import { Navbar, Nav, Container,Button,Collapse,Row,Col,} from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import monsterdata, { type Monster } from "../data/AlbumData";
import Light from '../effects/Light';

import HomePage from '../pages/HomePage';
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";
// import AboutPage from '../pages/AboutPage'; 
// import ListPage from "../pages/ListPage";

function Content(){
    const [monsters] = useState<Monster[]>(monsterdata);
    console.log(monsters);
    const [open, setOpen] = useState(false);

const savedState = localStorage.getItem("persist:root"); //홈페이지 갈 때 재렌더링되기 때문에 
if (savedState) {                                        //최근에 사용한 밝기 테마를 기억해낸다
  try {
    const parsed = JSON.parse(savedState);
    const theme = JSON.parse(parsed.theme)?.value;
    if (theme) {
      document.documentElement.setAttribute("data-bs-theme", theme);
      }
      } catch (e) {
        console.error("Failed to parse persisted theme", e);
        }
  }

    return(
    <>
    <Light></Light>

    <div className='justify-content-center align-items-center'>
        <Collapse in={open}>
            <div className="text-bg-dark">
                <Container>
                    <Row>
                        <Col className="sm-4 md-7 py-4 ">
                            <h4>About 간가브리엘</h4>
                            <p className="text-body-primary"> {/*Light로 배경 색깔을 못 바꾸게 함*/}
                                저는 트위터를 사용 안 하고 페이스북을 가족과 연락하는 수단으로 사용하고, 
                                일반적으로 이메일과 카카오톡을 사용합니다.<br></br>
                                동생과 제가 "몬스터 헌터: 월드"라는 게임을 좋아해서 동생과 같이 게임에 
                                대한 내용을 잠깐이라도 재미있게 알아보기 위해 이 프로젝트 주제 테마를 "몬스터 헌터: 월드 퀘스트 목록"으로 하여 몇 가지의 멋있는 
                                몬스터들을 모아서 "몬스터 헌터: 월드" 주제 테마로 앱을 개발해 보았습니다.
                                교수님 덕분에 이렇게 웹개발 능력을 향상시켜 주셔서 감사합니다.
                                제가 수강했던 27개의 강의 중에 교수님 수업이 정말 재미있었습니다

                            </p>
                        </Col>
                        <Col className="sm-4 py-4 offset-md-2 ">
                            <h4>Contact</h4>
                            <ul className="list-unstyled w-100">
                                <li><a href="https://twitter.com" target='_blank'>Follow on X</a></li>
                                <li><a href="https://facebook.com" target='_blank'>Like on Facebook</a></li>
                                <li><a href="https://stasishat06@gmail.com" target='_blank'>Email me</a></li>
                                <li>가천대학교 고급웹프로그래밍 기말과제</li>
                                <li>2025-12월-13일~19일 개발</li>
                                <li>2학년 1학기 컴퓨터공학과 간가브리엘 202439437 stasishat06@gmail.com</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
     </Collapse>
      <Navbar className="navbar navbar-dark bg-dark shadow-sm">     
        <Container className='border'>
            <Nav variant="underline" className="align-items-center">
                <Navbar.Brand href = "/" className='d-flex align-items-center '>
                <img 
                src={`/image/mhwiLogo.png`} 
                className="card-img-top fixed-card-img me-2"
              width="100%"
              height="39"
                />
                Quests
                </Navbar.Brand>  
                <Nav.Link href = "/">Home</Nav.Link>               
                <Nav.Link href = "/cart">Cart</Nav.Link>       
                </Nav>
                <Button className="b" variant="dark" onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                aria-label="Toggle navigation"
                >
                    {<span className='navbar-toggler-icon'></span>} {/*showDiv*/}
                </Button>
        </Container>
      </Navbar>

      

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path='/detail/:id' element={<DetailPage />} />
			<Route path="*" element={'페이지가 존재하지 않습니다. 확인해주세요.'} /> 
        </Routes>
        </div>
    </>
    )
}

export default Content;