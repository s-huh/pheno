import { ReactNode } from 'react';
import { Navbar } from '../Navbar/';

type Props = {
    children: ReactNode;
};

export function Layout({ children }: Readonly<Props>) {
    return (
        <div id="layout" className="p-8">
            <Navbar />
            {children}
        </div>
    );
}
