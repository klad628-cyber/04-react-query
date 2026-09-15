import type { VoteType } from "../../types/votes";
import css from "./VoteOptions.module.css";

interface VoteOptionsProps {
  onVote: (type: VoteType) => void;
  onReset: () => void;
  canReset: boolean;
}

const VoteOptions = ({ onVote, onReset, canReset }: VoteOptionsProps) => (
  <div className={css.container}>
    <button className={css.button} type="button" onClick={() => onVote("good")}>
      Good
    </button>
    <button
      className={css.button}
      type="button"
      onClick={() => onVote("neutral")}
    >
      Neutral
    </button>
    <button className={css.button} type="button" onClick={() => onVote("bad")}>
      Bad
    </button>
    {canReset && (
      <button
        className={`${css.button} ${css.reset}`}
        type="button"
        onClick={onReset}
      >
        Reset
      </button>
    )}
  </div>
);

export default VoteOptions;
