import React from 'react';
import useInView from './hooks/useInView';

const Demo = () => {
    const [targetRef, inView] = useInView();

    return (
        <div>
            <div style={{ height: '100vh' }}></div>
            <div
                ref={targetRef as any}
                style={{
                    width: '100px',
                    height: '100px',
                    background: inView ? 'green' : 'red',
                }}
            >
                {inView ? 'In View' : 'Out of View'}
            </div>
        </div>
    );
};

export default Demo;
