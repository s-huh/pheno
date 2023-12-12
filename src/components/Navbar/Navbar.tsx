import { Link } from 'wouter';
import { NavLink } from '../NavLink/NavLink';
import { NavLinkProps } from '../NavLink/NavLink';

const navLinks: NavLinkProps[] = [{ href: '/about', text: 'About' }];

export function Navbar() {
    return (
        <div
            id="navbar"
            className="flex items-center justify-between fixed top-0 left-0 w-full px-8 py-4 bg-gradient-to-r from-teal-950"
        >
            <Link href="/">
                <span
                    id="nav-title"
                    className="text-white font-firaSans font-black text-3xl cursor-pointer"
                >
                    Pheno
                </span>
            </Link>
            {navLinks.map(({ href, text }) => (
                <NavLink href={href} text={text} />
            ))}
        </div>
    );
}
