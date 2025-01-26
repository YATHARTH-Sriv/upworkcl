
import { Footer } from "@/components/Footer"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const clientlogos=[
  {link:"/fiver.jpg",id:1},{link:"/upwork.png",id:2},{link:"/images.png",id:3}
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Find the perfect freelance services for your business
                      </h1>
                      <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      Work with talented people at the most competitive prices to get the most out of your budget.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Link href="/Login">
                      <Button size="lg" className="w-full min-[400px]:w-auto">
                        Get Started
                      </Button>
                      </Link>
                      <Link href="/talent">
                      <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                        Find Talent
                      </Button>
                      </Link>
                    </div>
                    </div>
                    <Image
                    alt="Hero"
                    className="mx-auto rounded-xl object-contain w-full h-full"
                    height={600}
                    src="/dassh.png"
                    width={600}
                    priority
                    />
                  </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by leading brands</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of satisfied clients who have found amazing talent through our platform.
                </p>
              </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {clientlogos.map((link, id) => (
              <div key={link.id} className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                <Image 
                alt="Client logo" 
                src={link.link}
                className="mx-auto rounded-xl object-contain"
                height={200}
                width={200}
                style={{
                  width: '200px',
                  height: '100px',
                }}
                quality={100}
                priority
                 />
                </div>
              </div>
              ))}
            </div>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

