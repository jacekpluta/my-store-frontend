import Link from "next/link";

export default function About() {
  return (
    <div>
      Welcome to the account page.
      <Link href="/">
        <a>Home</a>
      </Link>{" "}
    </div>
  );
}
