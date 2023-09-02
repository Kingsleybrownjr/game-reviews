import './global.css';
import { Navbar } from '@/components/Navbar';
import { exo2, orbitron } from '@/app/fonts';

export const metadata = {
    title: {
        default: 'Indie Gamer',
        template: '%s | Indie Gamer'
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
        <body className="bg-orange-50 flex-col px-4 py-2 min-h-screen">
        <header>
            <Navbar/>
        </header>
        <main className="grow py-3">{children}</main>
        <footer className="border-t py-3 text-center text-xs text-slate-500">
            Game data an images courtesy of{' '}
            <a className="text-orange-800 hover:underline" href="https://rawg.io/" target="_blank">
                RAWG
            </a>
        </footer>
        </body>
        </html>
    );
}
