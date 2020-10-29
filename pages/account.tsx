import Link from "next/link";
import RequestToLogin from "../components/requestToLogin";

export default function Account() {
  return (
    <RequestToLogin>
      Welcome to the account page.
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
    </RequestToLogin>
  );
}
