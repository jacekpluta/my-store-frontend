import Link from "next/link";
import RequestToSignIn from "../components/requestToSignIn";

export default function Account() {
  return (
    <RequestToSignIn>
      Welcome to the account page.
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
    </RequestToSignIn>
  );
}
