import { Provider } from 'react-redux';
import { store } from '@/store';

import { useEffect } from 'react';
import Image from 'next/image';

import Header from '@/components/header';
import Telgeram from '@/components/telegram';

export default function About() {
  useEffect(() => {
    document.body.classList.add('light');
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <Telgeram />
      <div className="mt-4 flex flex-col gap-2">
        <div className="mx-4 about dark:text-white">
          <h1 className="font-black text-2xl">
            Безкоштовний моніторинг українських серверів
          </h1>{' '}
          <p className="text-lg md:text-base mt-4">
            {"Проект зроблений з любов'ю "}
            <a className="text-blue-600" href="https://qugalet.pp.ua">
              <Image
                width={32}
                height={32}
                className="h-5 w-5 inline-block md:w-6 md:h-6"
                src="https://crafatar.com/avatars/3097eddc-a9e2-4aea-b8fd-fc47b1aebacb?overlay=true"
                alt="Qugalet"
              />
              {'  '}
              Кугалетом
            </a>
            {
              '. Сайт поки працює так: Пінг кожні 10 хвилин, потім записує у БД '
            }
            <span className="italic">(Колись ще реалізую автооновлення)</span>.
          </p>{' '}
          <p className="mt-4 text-lg">
            Вихідний код знаходиться
            <a href="https://github.com/Andrmist/uamonitor"> тут</a>. Серверна
            частина реалізована на
            <a href="https://www.fastify.io"> Fastify </a>
            та
            <a href="https://prisma.io"> Prisma </a>, сам сайт написаний на
            <a href="https://svelte.dev"> Svelte </a> з використанням
            <a href="https://kit.svelte.dev"> SvelteKit </a> та
            <a href="https://tailwindcss.com"> TailwindCSS </a>. Код (особливо
            фронтенду) може бути гівном, тому для вирішення цього непорозуміння
            ласкаво прошу
            <a href="https://github.com/Andrmist/uamonitor/pulls">сюди</a>.
          </p>
          <p className="mt-4 text-lg">
            Проект створений в першу чергу для розвитку своїх навичок в бекенді
            та фронтенді а також щоб просунути українські сервери майнкрафт у
            інфопростір нашої країни. Сайт натхненний російськомовним аналогом
            для російськомовних серверів:{' '}
            <a href="https://stats.plo.su">stats.plo.su</a>
          </p>{' '}
          <h1 className="font-black text-2xl md:text-xl mt-4 mb-4">
            Бажаєте додати/видалити свій сервер або змінити інформацію?
          </h1>{' '}
          <p className="text-lg">
            Надішліть повідомлення у{' '}
            <a className="" href="https://t.me/Andrmist">
              Telegram
            </a>
            , Discord: Andrmist(Qugalet)#8967, або ж відкрийте Issue
          </p>
        </div>
      </div>
    </Provider>
  );
}
