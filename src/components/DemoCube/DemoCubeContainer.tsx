import { useCallback } from 'react';
import { mount } from './demoCube';

export default function DemoCubeContainer() {
    const containerRef = useCallback(mount, []);
    return <div className="demo-cube-container" ref={containerRef}></div>;
}
