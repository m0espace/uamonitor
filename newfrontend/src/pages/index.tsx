import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';

import { fetchData } from '@/slices/graphDataSlice';
import { setServersData } from '@/slices/serversDataSlice';
import { setTheme } from '@/slices/themeSlice';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { Server } from '@/interfaces';

import Header from '@/components/header';
import Telgeram from '@/components/telegram';
import ServerCard from '@/components/serverCard';

function Home() {
  const servers = useAppSelector((state) => state.servers.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function todo() {
      const responce = await fetch('https://stats.m0e.space/api/graph', {
        mode: 'cors',
      });
      const data = await responce.json();
      dispatch(fetchData(data));
    }
    todo();
  }, []);

  useEffect(() => {
    async function todo() {
      const responce = await fetch('https://stats.m0e.space/api/servers', {
        mode: 'cors',
      });
      const data = await responce.json();
      dispatch(setServersData(data));
    }
    todo();
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    dispatch(setTheme(theme));
  }, []);

  let sortedServers = servers.slice(0);
  sortedServers.sort((a, b) => {
    return b.onlineCount - a.onlineCount;
  });

  return (
    <>
      <Header />
      <Telgeram />
      {sortedServers.map((server: Server) => {
        return <ServerCard server={server} key={server.id} />;
      })}
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
