import React from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
// import { changeName1,  changeName2,  changeName3, type CartArray } from "../data/store";
import { plusCount,  minusCount, resetCart, type CartArray } from "../data/store";

interface CartState{
    cart3 : CartArray;
}

const CartPage: React.FC = () => {  
    const cartState = useSelector((state : CartState)=>state);
    // const info: any = useSelector((state)=>state);
    
    const getTotalAmount = (): number => {
        return cartState.cart3.cart1.reduce((total, item)=>total + item.quantity * item.reward, 0); 
    };    
    
    const dispatch = useDispatch();

    return (
        <div className="bg-body-tertiary text-center pb-5">
            <Container>
                <h2 className='p-3'>퀘스트 목록</h2>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>몬스터 정보</th>
                            <th>개체 수</th>
                            <th>몬스터 보수금액</th>
                            <th>늘리기/줄이기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        cartState.cart3.cart1.map((item)=>(
                            <tr key = {item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.reward}</td>
                                <td>
                                    <Button 
                                        className='btn-warning'
                                        style = {{marginRight : '10px'}}
                                        onClick={()=>{dispatch(plusCount(item.id))}}>+</Button>
                                    <Button 
                                        className='btn-warning'
                                        style = {{marginRight : '10px'}}
                                        onClick={()=>{dispatch(minusCount(item.id))}}>-</Button>
                                </td>
                            </tr>
                        ))
                    }                    
                    </tbody>
                </Table>
                <Row>
                    <Col>
                        <h5>총 몬스터 보수금액 : {getTotalAmount()}z</h5>
                    </Col>
                    <Col>
                    <Button variant='outline-success' href='/'>더 수주하기</Button>
                        <Button variant='success' href='/loadingQuest'>수락하기</Button>
                        <Button variant='primary' onClick={()=>{
                            dispatch(resetCart())
                        }}>수락 모두 취소하기</Button>
                    </Col>
                </Row>         
            </Container>
        </div>
    );
}

export default CartPage;