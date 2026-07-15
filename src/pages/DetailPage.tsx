//import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { type Monster } from '../data/AlbumData';
import { addItem } from '../data/store';
import { useDispatch } from 'react-redux';

interface LocationState {
    monster : Monster;
}

const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { state } = location as { state: LocationState };    
    const monster = state?.monster;
    const id2 = Number(id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="bg-body-tertiary pb-5">
             <Container className="">
                <Row className='justify-content-center align-items-center'>
                    <Col md={9} className='' style={{borderRadius: '8px'}}>
                    <Card className="mt-5 mb-5 border-2 border-success p-5 "  >
                        <Card.Img   className=""
                            variant="bottom"                          
                            src = {'/image/' + id2 + '.jpg'}                             
                            style={{borderRadius: '8px', height:'100%', width:'100%',objectFit:'cover'}}
                        />
                    </Card>
                    </Col>
                    <Col md={9}>
                        <Card className="border-2 text-center border-success">                         
                            <Card.Body>
                                <Card.Title as="h3" className="mb-4">{monster.title}</Card.Title>
                                <Card.Text className="text-muted mb-4">{monster.content}</Card.Text>
                                <Card.Text as="h3" className="text-success mb-5"><span style={{color:"#FC4A09"}}>보수: </span>{monster.reward}<span style={{color:"#FECC0A"}}>z</span></Card.Text>                             
                                <Card.Text className="text-muted mb-7 text-start">크기: {monster.sizecm}cm</Card.Text>
                                <Card.Text className="text-muted mb-7 text-start">약점: {monster.weakness}</Card.Text>
                                <Button 
                                className='mb-5'
                                    variant="success"                                 
                                    onClick={() => {                                     
                                        dispatch(addItem({id : monster.id, name : monster.title, reward : monster.reward}));
                                        navigate('/cart'); 
                                }}>
                                    퀘스트 수주                       
                                </Button>                            
                            </Card.Body>                     
                        </Card>                     
                    </Col>
                </Row>
            </Container> 
        </div>
    );        
}

export default DetailPage;