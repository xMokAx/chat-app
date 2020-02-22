import React, {
  useRef,
  useCallback,
  useLayoutEffect,
  useState,
  useContext
} from "react";
import styled from "styled-components/macro";
import { Message, Room } from "../actions/chatRooms";
import ChatMessage from "./ChatMessage";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../styled/Loading";
import { chatMessagesApi } from "../firebase";
import { chatMessagesActions } from "../actions/chatMessages";
import { FlexContainer } from "../styled/Flex";
import Button from "../styled/Button";
import Icon from "../styled/Icon";
import { ConnectionContext } from "./Layout";

interface ContainerProps {
  showConnectionStatus: boolean;
}

const Container = styled.div<ContainerProps>`
  flex: 1;
  height: calc(
    100vh - ${props => (props.showConnectionStatus ? "204px" : "171px")}
  );
  max-height: calc(
    100vh - ${props => (props.showConnectionStatus ? "204px" : "171px")}
  );
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
  -webkit-overflow-scrolling: touch;
`;

interface Props {
  messages: Message[];
  messagesCount: number;
  activeRoomId: string;
  getMessagesSuccess: typeof chatMessagesActions.getMessagesSuccess;
  activeRoom?: Room;
}

const ChatMessagesDisplay = ({
  messages,
  messagesCount,
  activeRoomId,
  getMessagesSuccess,
  activeRoom
}: Props) => {
  const { showConnectionStatus } = useContext(ConnectionContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hasMore = messages.length >= 20 && messages.length < messagesCount;
  const oldScrollHeight = useRef(0);
  const oldScrollTop = useRef(0);
  const scrollToBottom = () => {
    if (containerRef && containerRef.current) {
      containerRef.current.scroll({
        top: containerRef.current.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
    }
  };

  const instantScrollToBottom = () => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  // scroll to bottom after remount
  useLayoutEffect(() => {
    instantScrollToBottom();
  }, [activeRoomId]);

  useLayoutEffect(() => {
    const scrollableContainer = containerRef.current;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollableContainer!!;
      if (scrollTop < scrollHeight - clientHeight * 2) {
        setShowScrollDownBtn(true);
      } else {
        setShowScrollDownBtn(false);
      }
    };
    if (containerRef && containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      scrollableContainer!!.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // scroll to bottom when the first batch of messages are fetched
  useLayoutEffect(() => {
    if (messages.length <= 20) {
      instantScrollToBottom();
    }
  }, [messages]);

  // scroll to bottom when a new message is added
  useLayoutEffect(() => {
    if (activeRoom && activeRoom.lastMessage && messages.length) {
      if (
        messages[messages.length - 1].id !== activeRoom.lastMessage.id &&
        containerRef &&
        containerRef.current &&
        containerRef.current.scrollHeight > containerRef.current.clientHeight
      ) {
        scrollToBottom();
      }
    }
  }, [activeRoom, messages, messages.length]);

  const loadMore = useCallback(
    _page => {
      if (!isLoading) {
        setIsLoading(true);
        chatMessagesApi
          .getMoreMessages(activeRoomId, messages[0].createdAt)
          .then(querySnapshot => {
            const newMessages: Message[] = [];
            querySnapshot.forEach(doc => {
              newMessages.push(doc.data() as Message);
            });
            // keep track of the scrollHeight before adding another batch of messages
            if (containerRef && containerRef.current) {
              oldScrollHeight.current = containerRef.current.scrollHeight;
              oldScrollTop.current = containerRef.current.scrollTop;
            }
            getMessagesSuccess(newMessages, activeRoomId);
            // make sure the scroll doesn't jump after adding new batch
            if (containerRef && containerRef.current) {
              if (oldScrollTop.current === 0) {
                containerRef.current.scrollTop =
                  containerRef.current.scrollHeight - oldScrollHeight.current;
              } else {
                containerRef.current.scrollTop =
                  oldScrollTop.current +
                  (containerRef.current.scrollHeight - oldScrollHeight.current);
              }
            }
            setIsLoading(false);
          });
      }
    },
    [activeRoomId, getMessagesSuccess, isLoading, messages]
  );
  return (
    <Container ref={containerRef} showConnectionStatus={showConnectionStatus}>
      <InfiniteScroll
        threshold={200}
        pageStart={1}
        initialLoad={false}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <FlexContainer key={0} p="16px 0">
            <Loading small />
          </FlexContainer>
        }
        useWindow={false}
        isReverse={true}
        getScrollParent={() => containerRef.current}
      >
        {messages.map(message => {
          return <ChatMessage key={message.id} message={message} />;
        })}
      </InfiniteScroll>
      {showScrollDownBtn && (
        <Button
          css={`
            position: fixed;
            bottom: 64px;
            left: calc(50% - 16px);
          `}
          size="s"
          circle
          bg="grey"
          aria-label="scroll to last message"
          onClick={scrollToBottom}
        >
          <Icon icon="arrow_downward" size="20px" />
        </Button>
      )}
    </Container>
  );
};

export default ChatMessagesDisplay;
