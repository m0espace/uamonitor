import hljs from 'highlight.js';
import html from 'highlight.js/lib/languages/vbscript-html';
hljs.registerLanguage('html', html);
import { useRef, useState, useEffect } from 'react';

interface Props {
  handler: (value: boolean) => void;
  server: {
    id: number;
    name: string;
    description: string;
  };
}

interface SecondProps {
  handler: (value: boolean) => void;
}

const SecondModal = ({ handler }: SecondProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) {
      handler(false);
    }
  };

  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <div
      className="bg-black w-full h-full fixed top-0 left-0 bg-opacity-50 flex justify-center items-center z-40"
      onClick={(e) => clickHandler(e)}
      ref={modalRef}
    >
      <div className="animate-[show_1s_ease_normal] p-5 rounded-lg bg-zinc-200 dark:bg-zinc-800 w-full space-y-3 md:max-w-[768px] z-50 text-black dark:text-white">
        <h1 className="flex items-center justify-between gap-4 text-2xl  font-bold">
          Додати моніторинг собі на сторінку
        </h1>
        <p>Додати можна за допомогою {'<iframe>'}:</p>
        <pre>
          <code className="language-html">{`<iframe id="card"
  title="UAMonitor"
  scrolling="no"
  height="256"
  width="500"
  src="https://stats.m0e.space/s/2?theme=dark">
</iframe>`}</code>
        </pre>
        <p>Де:</p>
        <ul className="list-disc">
          <li className="ml-8">
            <strong>theme=dark</strong> {`можна змінювати на світлу "light"`}
          </li>
          <li className="ml-8">
            <strong>2</strong> - ідентифікатор серверу
          </li>
        </ul>
      </div>
    </div>
  );
};

const Modal = ({ handler, server }: Props) => {
  const [secondModal, setSecondModal] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) {
      handler(false);
    }
  };

  return (
    <div
      className="bg-black w-full h-full fixed top-0 left-0 bg-opacity-50 flex justify-center items-center z-40"
      onClick={(e) => clickHandler(e)}
      ref={modalRef}
    >
      <div className="animate-[show_1s_ease_normal] p-5 rounded-lg bg-zinc-200 dark:bg-zinc-800 w-full space-y-3 md:max-w-[768px] z-50 text-black dark:text-white">
        <h1 className="flex items-center justify-between gap-4 text-2xl  font-bold">
          {server.name}
        </h1>
        <div className="prose dark:prose-invert">
          <p>{server.description}</p>
        </div>
        <a href={'#'} onClick={() => setSecondModal(true)}>
          ID: {server.id}
        </a>
        {secondModal && <SecondModal handler={setSecondModal} />}
      </div>
    </div>
  );
};

export default Modal;
