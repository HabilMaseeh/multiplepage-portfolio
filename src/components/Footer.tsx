'use client';

import Link from 'next/link';
import { globalConfig } from '@/config/global';

export default function Footer() {
  return (
    <section className="text-gray-700 bg-white border-t dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
      <div className="container flex flex-col items-center justify-center min-h-[40px] mx-auto px-7 max-w-7xl sm:flex-row sm:min-h-[50px]">
        <Link href="/" className="h-5 text-base group relative z-30 flex items-center space-x-1.5 text-black dark:text-white font-semibold">
          <span className="text-xl -translate-y-0.5 group-hover:-rotate-12 group-hover:scale-[1.2] ease-in-out duration-300">✦</span>
          <span className="-translate-y-0.5">{globalConfig.site.author}</span>
        </Link>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-100 sm:ml-4 sm:pl-4 sm:border-l sm:border-neutral-300 dark:sm:border-neutral-700 sm:mt-0">
          <a href={`mailto:${globalConfig.footer.social.email}`} className="cursor-pointer hover:text-neutral-900 dark:hover:text-white">{globalConfig.footer.social.email}</a>
          <span className="mx-2" aria-hidden="true">|</span>
          <a href={`tel:${globalConfig.footer.social.phone}`} className="cursor-pointer hover:text-neutral-900 dark:hover:text-white">{globalConfig.footer.social.phone}</a>
        </p>
        <span className="relative z-30 inline-flex justify-center mt-2 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
          
          <a href={globalConfig.footer.social.github} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile" title="GitHub" className="cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
            <span className="sr-only">GitHub</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
            </svg>
          </a>
          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(globalConfig.footer.social.email)}`} target="_blank" rel="noopener noreferrer" aria-label="Email me with Gmail" title="Email" className="cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
            <span className="sr-only">Email</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
          <a href={globalConfig.footer.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
            <span className="sr-only">WhatsApp</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.55 0 .24 5.31.24 11.84c0 2.09.55 4.13 1.59 5.93L.14 24l6.38-1.67a11.84 11.84 0 0 0 5.56 1.42h.01c6.53 0 11.84-5.31 11.84-11.84a11.8 11.8 0 0 0-3.41-8.43Zm-8.44 18.27h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.79.99 1.01-3.69-.23-.38a9.85 9.85 0 0 1-1.51-5.24C2.16 6.41 6.6 1.97 12.08 1.97c2.65 0 5.14 1.03 7.01 2.91a9.84 9.84 0 0 1 2.9 7.02c0 5.47-4.45 9.85-9.91 9.85Zm5.41-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
            </svg>
          </a>
          <a href={globalConfig.footer.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Open WhatsApp QR code" className="cursor-pointer overflow-hidden rounded-sm border border-neutral-300 dark:border-neutral-600 bg-white p-0.5">
            <img src={globalConfig.footer.social.whatsappQr} alt="WhatsApp QR code" className="w-10 h-10" />
          </a>
        </span>
      </div>
    </section>
  );
} 