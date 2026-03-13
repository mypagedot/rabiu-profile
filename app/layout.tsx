import { Inter, Poppins, Montserrat } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css'; // Create this file if you don't have it (can be empty)

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-poppins' 
});
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'], 
  variable: '--font-montserrat' 
});

export const metadata = {
  title: 'Rabiu Sani Muhammad | Mobile Engineer & Brand Designer',
  description: 'Rabiu Sani Muhammad (Aljauromanee) – Mobile Software Engineer & Visual Brand Systems Designer. I build cross‑platform apps and craft cohesive visual identities.',
  keywords: 'Mobile Developer, iOS, Android, React Native, Flutter, Brand Designer, UI/UX, Visual Identity, Nigeria',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/assets/images/favicon_io/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

        
      </head>
      <body className="font-sans bg-[#f9f9f9] text-[#333] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}