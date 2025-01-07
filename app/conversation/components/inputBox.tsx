import styles from "../styles/inputbox.module.scss";
import { useAppSelector } from "@/app/store/store";
import { setActiveQuery } from "@/app/store/slices/conversationSlice";
import { useDispatch } from "react-redux";

const InputBox = ({
  isNewThread,
  onClickSubmit,
}: {
  isNewThread: boolean;
  onClickSubmit: () => void;
}) => {
  const { activeQuery } = useAppSelector((state) => state.conversationData);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (activeQuery.trim()) {
      onClickSubmit();
    }
  };

  return (
    <div
      className={`${styles.inputBoxContainer} ${
        isNewThread ? styles.centered : styles.bottom
      }`}
    >
      <textarea
        value={activeQuery}
        onChange={(e) => {
          dispatch(setActiveQuery(e.target.value));
        }}
        className={styles.inputField}
        placeholder={
          isNewThread
            ? "Start your legal research"
            : "Ask any follow-up questions or anything else!"
        }
      />
      <button onClick={handleSubmit} className={styles.submitButton}>
        Go
      </button>
    </div>
  );
};

export default InputBox;
