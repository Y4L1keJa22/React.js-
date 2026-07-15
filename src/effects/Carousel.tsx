import React, { useState,useEffect } from "react";
import { Carousel,Image,Container } from 'react-bootstrap';
import '../App.css';
import {type Monster } from '../data/AlbumData';

export interface MonsterItemProps {
    monsters: Monster[];
  }

  //배열(몬스터들 데이터세트) 섞어서 5개 랜덤 뽑기
function getRandomDataSets<T>(array: T[], count: number): T[] {
  if (count > array.length) {
    throw new Error("Count exceeds array length");
  }
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const MyCarousel: React.FC<MonsterItemProps> = ({ monsters }) => {
  const [randomFive, setRandomFive] = useState<Monster[]>([]);

  //컴포넌트 마운트 될 때 한번 실행 된다. 즉 홈페이지 갈 때마다 다시 실행된다
  useEffect(() => {
    const result = getRandomDataSets(monsters, 5);
    setRandomFive(result);
  }, []);

  return (
    <div className='text-center'>
      <Carousel interval={4000} pause={false}>
        {randomFive.map((monster, index) => (
          <Carousel.Item
            key={`${monster.id}-${index}`}
            className="border bg"
            style={{
              backgroundImage: `url(/image/${monster.background})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
            }}
          >
            <Container className="carousel-item-custom position-relative">
              <h1 className="position-absolute top-0 start-0 text-start m-1 carousel-title">
                금주 추천:{index + 1} {monster.title}
              </h1>
              {monster.id !== 5 && (
                <Image
                  className="img fixed-size-img"
                  src={`/image/${monster.id}.jpg`}
                  alt={monster.title}
                  rounded
                />
              )}
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;