import styles from "@/app/(components)/login/login.module.css";
const Login = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <h1>Login</h1>
        <input type="email" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
