import { Link } from 'wouter';
import { NavLink } from '../NavLink/NavLink';
import { NavLinkProps } from '../NavLink/NavLink';

const navLinks: NavLinkProps[] = [
    { href: '/darwin', text: 'Darwin' },
    { href: '/sandbox', text: 'Sandbox' },
    { href: '/about', text: 'About' },
];

export function Navbar() {
    return (
        <div
            id="navbar"
            className="fixed top-0 left-0 w-full px-8 py-4 bg-gradient-to-r from-teal-950"
        >
            <div className="w-[700px] flex items-center justify-between">
                <Link href="/">
                    <span
                        id="nav-title"
                        className="text-white font-firaSans font-black text-3xl cursor-pointer mr-96"
                    >
                        Pheno
                    </span>
                </Link>
                <div className="flex space-x-8">
                    {navLinks.map(({ href, text }, i) => (
                        <NavLink
                            key={`nav-link-${i}`}
                            href={href}
                            text={text}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
