

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pastel-blue/30 via-white to-pastel-pink/30 font-sans text-slate-800 relative flex flex-col overflow-x-hidden">
            {/* Background Decorations */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-pastel-yellow opacity-30 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-pastel-blue opacity-30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
            <div className="fixed top-1/2 left-1/2 w-full h-full max-w-[800px] bg-pastel-pink opacity-10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Navigation */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto pt-28 pb-8 px-4 sm:px-6 lg:px-8 flex flex-col relative z-10">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}


