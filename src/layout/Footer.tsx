import { Button } from 'react-bootstrap';

const Footer=()=>{
  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  
    return(
        <>
        <div className="text-body-secondary py-5">
            <div className="container">
                <p className="float-end mb-1">
                    <Button
                    className='w-100'
                    variant="link"
                    onClick={scrollToTop}>
                        Back to top
                    </Button>
                </p>
                <p className="mb-1">
                    가천대학교 고급웹프로그래밍 기말과제. 2025-12월-13일~19일 개발.
                </p>
                <p className='mb-1'>2학년 1학기 컴퓨터공학과 간가브리엘 202439437 stasishat06@gmail.com</p>
                <p className="mb-0">
                   Reached the Bottom? <a href="/">Go back to homepage</a> or watch this <a href="https://www.youtube.com/watch?v=SqcY0GlETPk" target='b
                   _blank'>video about react</a>.
                </p>
            </div>
        </div>
        <script src="../assets/dist/js/bootstrap.bundle.min.js" className="astro-vvvwv3sm">
        </script>
    </>
    )
}

export default Footer;  