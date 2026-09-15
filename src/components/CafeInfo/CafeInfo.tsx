import css from "./CafeInfo.module.css";

const CafeInfo = () => (
  <div className={css.container}>
    <p className={css.eyebrow}>A little pause in your day</p>
    <h1 className={css.title}>Sip Happens Café</h1>
    <p className={css.description}>
      Please rate our service by selecting one of the options below.
    </p>
  </div>
);

export default CafeInfo;
