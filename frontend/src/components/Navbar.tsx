import Link from "next/link";

const Navbar = (): JSX.Element => {
  return (
    <nav>
      <ul>
        <li>
          <Link id="link" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact">
          Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
