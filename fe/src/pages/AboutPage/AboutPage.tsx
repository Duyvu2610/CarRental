import { useEffect } from 'react';
import Banner from './Banner';

const AboutPage: React.FC = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mb-[120px]">
            <Banner />
        </div>
    );
}

export default AboutPage;