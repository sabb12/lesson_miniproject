import styles from "./Header.module.css";

type Props = {
  onClick?: () => void;
  logImage: string;
};

export default function HeaderForm(props: Props) {
  const { logImage, onClick } = props;

  return (
    <div className={styles.headerContainer}>
      <div>
        <img src={logImage} alt="" width={100} height={100} />
      </div>
      <div>
        <button onClick={onClick}>로그인</button>
      </div>
    </div>
  );
}
