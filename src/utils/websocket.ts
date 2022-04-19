import {useEffect, useRef, useState} from 'react'

const useWebsocket = (url: string) => {
  const connector = useRef<WebSocket | null>(null)
  const [msg, setMsg] = useState<IM.MessageVO>()
  const [readyState, setReadyState] = useState({key: 0, value: '正在链接中'})

  const creatWebSocket = () => {
    const stateArr = [
      {key: 0, value: '正在链接中'},
      {key: 1, value: '已经链接并且可以通讯'},
      {key: 2, value: '连接正在关闭'},
      {key: 3, value: '连接已关闭或者没有链接成功'}
    ]
    try {
      connector.current = new WebSocket(url)
      connector.current.onopen = () => setReadyState(stateArr[connector.current?.readyState ?? 0])
      connector.current.onclose = () => {
        setReadyState(stateArr[connector.current?.readyState ?? 0])
      }
      connector.current.onerror = () => {
        setReadyState(stateArr[connector.current?.readyState ?? 0])
      }

      connector.current.onmessage = (e) => {
        setMsg(JSON.parse(e.data));
      }
    } catch (error) {
      console.log(error)
    }
  }

  const webSocketInit = () => {
    if (!connector.current || connector.current.readyState === 3) {
      creatWebSocket()
    }
  }

  //  关闭 WebSocket
  const closeWebSocket = () => {
    connector.current?.close()
  }

  const reconnect = () => {
    try {
      closeWebSocket()
      connector.current = null
      creatWebSocket()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    webSocketInit()
    return () => {
      connector.current?.close()
    }
  }, [connector])

  return {
    connector,
    msg,
    readyState,
    closeWebSocket,
    reconnect
  }
}

export default useWebsocket;