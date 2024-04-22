import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-8xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1 p-1">
            <Image
              className="h-8 w-auto"
              src="./svg/logo-no-background.svg"
              alt="Logo"
              height={100}
              width={100}
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
