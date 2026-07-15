import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import MonsterData, { type Monster } from '../data/AlbumData';
import MyCarousel from '../effects/Carousel';
import MonsterCard from '../effects/MonsterCard';

const HomePage: React.FC = () => {
    let [monsters] = useState<Monster[]>(MonsterData);
    return(
        <div className='bg-body-tertiary'>
            <MyCarousel monsters={monsters} />
            <Container>
                <Row className="text-center py-5" >                   
                    {monsters.map((monster) => {                   
                        return <MonsterCard key={monster.id} monster={monster} />
                    })}
                </Row>      
                </Container>       
    </div>
    )
}
export default HomePage;