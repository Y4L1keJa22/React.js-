import {type Monster } from '../data/AlbumData';
import { Col, Card, Button} from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface MonsterCardProps {
    monster: Monster;
  }
const MonsterCard : React.FC<MonsterCardProps> = ({ monster }) => {
    const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() { //View 및 Edit 버튼을 누르면 버튼이 Loading...되고 있음을 알려준다
      return new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);     
    return(
        <Col className="album py-2 px-2" key={monster.id} md={4}>
          {/*<Container>*/}
            <Card className="shadow-sm">
                <Card.Body>
                        <Card.Img 
                            src={`/image/${monster.id}.jpg`} 
                            className="card-img-top fixed-card-img"
                            alt={monster.title}
                            width="100%"
                            height="250px"                        
                        />
                       <Card.Title className='title'>{monster.title}</Card.Title>
                       <Card.Text as="div">
                        <div className='size'>크기(cm): {monster.sizecm}</div>
                        <div className='weakness'>약점: {monster.weakness}</div>
                       </Card.Text>
                  <div
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="btn-group">
                        <Link to={`/detail/${monster.id}`} state={{ monster }}>
                      <Button
                      variant="outline-warning"
                        className=""
                        disabled={isLoading}
                        onClick={handleClick}
                      >
                        {isLoading ? 'Loading…' : 'View'} {/*버튼 텍스트가 Loading...으로 바뀌게 된다*/}
                      </Button>
                      </Link>
                      <Link to={`/edit/${monster.id}`} state={{ monster }}>
                      <Button
                        variant="outline-info"
                        className=""
                        disabled={isLoading}
                        onClick={handleClick}
                      >
                        {isLoading ? 'Loading…' : 'Edit'}
                      </Button>
                      </Link>
                    </div>
                    <small className="text-body-secondary px-3">{monster.id}</small>
                  </div>
                </Card.Body>
            </Card>
            {/*</Container>*/}
            </Col>
    );
}
export default MonsterCard;