import { ReactElement } from "react";
import LoginForm from "../components/login-form/LoginForm";

export default function Index(): ReactElement<HTMLDivElement> {
  return (
    <div className="main__container">
      <LoginForm />
    </div>
  );
}
