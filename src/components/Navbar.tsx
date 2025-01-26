"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'

function Navbar() {
  const {data:session}=useSession()


  return (
    <nav className="bg-green-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold">
          FreelanceHub
        </Link>
        <div className="flex space-x-4">
          <Link href="/jobs" className="hover:text-green-200">Find Jobs</Link>
          {session ? (
            <>
              <Link href="/profile" className="hover:text-green-200">Profile</Link>
              <Link href="/api/auth/signout" className="hover:text-green-200">Logout</Link>
            </>
          ) : (
            <Link href="/login" className="hover:text-green-200">Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar