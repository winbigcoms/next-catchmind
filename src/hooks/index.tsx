import { useCallback, useState } from "react";

const useMessage = (): [string[], (data: string) => void] => {
  const [messages, setMessage] = useState<string[]>([]);

  const cutMsg = useCallback(() => {
    setMessage((msgs) => msgs.splice(1));
  }, []);

  const cutMsgInterval = useCallback(() => {
    console.log(messages.length);
    const interval = setInterval(() => {
      if (messages.length === 0) {
        clearInterval(interval);
      }
      cutMsg();
    }, 3000);
  }, []);

  const receiveMsg = useCallback((data: string) => {
    setMessage((msg) => {
      if (msg.length > 2) {
        return [...msg.splice(1), data];
      }
      cutMsgInterval();
      return [...msg, data];
    });
  }, []);

  return [messages, receiveMsg];
};
export default useMessage;
