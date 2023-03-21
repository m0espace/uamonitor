const Telgeram = () => {
  return (
    <div
      className="p-4 border-2 rounded dark:bg-amber-900 dark:bg-opacity-50 dark:text-amber-500 text-amber-700 bg-amber-100 border-amber-900/10"
      role="alert"
    >
      <strong className="text-md font-medium">
        {"З'явився телеграм канал з новинами розробки та обговореннями:"}
        <a
          className="text-blue-600 dark:text-blue-400"
          href="https://t.me/uamonitor_news"
        >
          @uamonitor_news
        </a>
      </strong>
    </div>
  );
};

export default Telgeram;
