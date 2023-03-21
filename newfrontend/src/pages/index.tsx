import Header from '@/components/header';
import Telgeram from '@/components/telegram';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.body.classList.add('light');
  }, []);

  return (
    <div>
      <Header />
      <Telgeram />
    </div>
  );
}
