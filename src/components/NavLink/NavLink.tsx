import { Link, useLocation } from 'wouter';
import classNames from 'classnames';

export type NavLinkProps = {
    href: string;
    text: string;
};

export function NavLink({ href, text }: Readonly<NavLinkProps>) {
    const [location] = useLocation();
    const isActive = location === href;

    return (
        <Link href={href}>
            <span
                className={classNames(
                    'font-medium text-gray-400 transition ease-in-out duration-300 hover:text-white cursor-pointer',
                    isActive && 'text-white',
                )}
            >
                {text}
            </span>
        </Link>
    );
}
