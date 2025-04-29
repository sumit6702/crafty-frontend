import NextLink from "next/link";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { SearchIcon } from "@/components/icons";
import Logout from "./logout";

export const Navbar = () => {
  return (
    <div className="flex flex-col h-screen w-1/5 p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <Image src={"/logo.png"} alt="Logo" width={64} height={64} />
        <span className="text-2xl font-bold">MINESHIFT</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 mb-8">
        {siteConfig.navItems.map((item) => (
          <NextLink
            key={item.href}
            href={item.href}
            className="hover:text-primary transition-colors text-lg"
          >
            {item.label}
          </NextLink>
        ))}
      </nav>

      {/* Search */}
      {/* <div className="mb-8">
        <Input
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          placeholder="Search..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          endContent={
            <Kbd className="hidden lg:inline-block" keys={["command"]}>
              K
            </Kbd>
          }
          type="search"
        />
      </div> */}

      {/* Bottom Section */}
      <div className="mt-auto flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <ThemeSwitch />
          <Link
            className="text-current"
            isExternal
            aria-label="Github"
            href={siteConfig.links.github}
          >
            <Icon icon="mdi:github" className="text-xl" />
          </Link>
        </div>
        <Logout />
      </div>
    </div>
  );
};
export default Navbar;
