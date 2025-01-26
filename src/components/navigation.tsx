"use client"

import { Bell, HelpCircle, Search, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Manage Work</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/projects"
                      className={`group rounded-lg p-4 hover:bg-muted ${
                        pathname === "/projects" ? "bg-muted" : ""
                      }`}
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        My Projects
                      </div>
                      <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        View and manage your ongoing projects
                      </div>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {/* Messages link */}
            <NavigationMenuItem>
              <Link href="/messages" legacyBehavior passHref>
                <NavigationMenuLink 
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    pathname === "/messages" ? "bg-accent text-accent-foreground" : "bg-background"
                  }`}
                >
                  Messages
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Jobs link */}
            <NavigationMenuItem>
              <Link href="/jobs" legacyBehavior passHref>
                <NavigationMenuLink 
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    pathname === "/jobs" ? "bg-accent text-accent-foreground" : "bg-background"
                  }`}
                >
                  Jobs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* Profile link */}
            <NavigationMenuItem>
              <Link href="/profile" legacyBehavior passHref>
                <NavigationMenuLink 
                  className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                    pathname === "/profile" ? "bg-accent text-accent-foreground" : "bg-background"
                  }`}
                >
                  Profile
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <div className="relative w-full max-w-sm">
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-[180px] lg:w-[280px] pr-8"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white">
                2
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Help</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}