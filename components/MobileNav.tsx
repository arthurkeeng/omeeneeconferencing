"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger-icon"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <SheetHeader>
            <SheetTitle className="sr-only">
              Are you absolutely sure?
            </SheetTitle>
            <Link href="/" className="flex items-center gap-1">
              <Image src="/icons/logo.svg" width={32} height={32} alt="logo" />
              <p className="text-[26px] text-white font-extrabold">oom</p>
            </Link>
            <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
              <SheetClose asChild>
                <section className="flex h-full flex-col gap-6 pt-16 text-white">
                  {sidebarLinks.map((link) => {
                    const isActive =
                      pathname === link.route 

                    return (
                        <SheetClose asChild key={link.route}> 
                        <Link
                        href={link.route}
                        
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                          { "bg-blue-1": isActive }
                        )}
                      >
                        <Image
                          src={link.imageUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className=" font-semibold">
                          {link.label}
                        </p>
                      </Link>
                      </SheetClose>
                     
                    );
                  })}
                </section>
              </SheetClose>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;