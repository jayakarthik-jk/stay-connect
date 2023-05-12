import { useUser } from "../Context/User";

function useConvoId() {
  const { user } = useUser();
  const genConvoId = (senderId, receipientId) => {
    return senderId > receipientId
      ? `${senderId}-${receipientId}`
      : `${receipientId}-${senderId}`;
  };
  const extractConvoId = () => {
    const friendId = conv.conversationId.replace(user.id, "").replace("-", "");
    return { userId: user.id, friendId };
  };

  return { genConvoId, extractConvoId };
}

export default useConvoId;
