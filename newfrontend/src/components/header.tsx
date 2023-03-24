import Link from 'next/link';
import Image from 'next/image';

import { setTheme } from '@/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { useEffect, useRef } from 'react';

const Header = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const gitRef = useRef<HTMLImageElement>(null);

  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (imgRef.current && gitRef.current) {
      if (localStorage.getItem('theme') == 'light') {
        document.documentElement.classList.remove('dark');
        imgRef.current.src = '/img/dark.svg';
        gitRef.current.src = '/img/github.svg';
      } else {
        imgRef.current.src = '/img/light.svg';
        gitRef.current.src = '/img/github_light.svg';
        document.documentElement.classList.add('dark');
      }
    }
  }, [theme]);

  function handlerTheme() {
    if (theme == 'light') {
      dispatch(setTheme('dark'));
      localStorage.setItem('theme', 'dark');
    } else {
      dispatch(setTheme('light'));
      localStorage.setItem('theme', 'light');
    }
  }

  return (
    <header className="p-6 md:mt-2 mb-4 max-h-16 md:rounded-xl md:max-w-3xl max-w-full mx-auto bg-white dark:bg-neutral-900 rounded-none shadow-lg flex flex-row justify-start gap-5 items-center">
      <div className="flex flex-row basis-1/3 justify-start gap-5 items-center">
        <Link href="/" className="focusable object-scale-down">
          <Image
            src="/favicon.png"
            className="object-scale-down rounded-lg h-10 w-10"
            alt="UAMonitor"
            width={40}
            height={40}
          />
        </Link>{' '}
        <Link href="/about" className="focusable text-blue-500">
          Про сайт
        </Link>
      </div>
      <div className="basis-2/3 float-right flex flex-row justify-end items-center gap-3">
        <a href="#" className="focusable h-8 w-8">
          <Image
            width={32}
            height={32}
            className="w-full h-full"
            src="/img/dark.svg"
            alt="Theme"
            ref={imgRef}
            onClick={handlerTheme}
          />
        </a>{' '}
        <a
          href="https://github.com/Andrmist/uamonitor"
          className="focusable h-8 w-8"
        >
          <Image
            width={32}
            height={32}
            className="w-full h-full"
            src="/img/github.svg"
            alt="Github"
            ref={gitRef}
          />
        </a>{' '}
        <a
          href="https://discord.com/api/oauth2/authorize?client_id=1078782002704175156&amp;redirect_uri=https://stats.m0e.space/&amp;response_type=code&amp;scope=identify"
          target=""
          className=" transition ease-in-out delay-50 px-4 py-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 flex justify-center items-center dark:hover:bg-neutral-700 "
        >
          <span className="text-black dark:text-white">Логін</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
