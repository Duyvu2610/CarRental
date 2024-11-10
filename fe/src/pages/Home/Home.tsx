import { Suspense, useEffect } from 'react';

import Benefit from './Benefit';
import ProtectSection from './ProtectSection';
import InstructionSection from './InstructionSection';
import AboutSection from './AboutSection';
import SloganSection from './SloganSection';
import ProductSection from './ProductSection';

const Home: React.FC = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="mb-[80px]">
            <SloganSection />
            <Suspense fallback={<div>Loading...</div>}>
                <ProductSection />
            </Suspense>
            <Benefit />
            <ProtectSection />
            <InstructionSection />
            <AboutSection/>
        </div>
    );
}

export default Home;