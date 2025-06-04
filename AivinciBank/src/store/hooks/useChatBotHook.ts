import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { AskAction } from "../actions/chatBotAction";

export const useChatBot = () => {
  const dispatch = useDispatch<AppDispatch>();

  const AskBot = async (question: string) => {
    try {
      const resultAction = await dispatch(AskAction(question));
      console.log(resultAction);

      if (AskAction.fulfilled.match(resultAction)) {
        return resultAction.payload;
      } else if (AskAction.rejected.match(resultAction)) {
        throw new Error(
          typeof resultAction.payload === "string"
            ? resultAction.payload
            : JSON.stringify(resultAction.payload)
        );
      }
    } catch (err: any) {
      console.error("ChatBot Error:", err);
      return null;
    }
  };

  return { AskBot };
};
