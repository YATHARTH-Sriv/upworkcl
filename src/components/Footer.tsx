import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container grid grid-cols-2 gap-x-8 gap-y-12 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">About Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/feedback">Feedback</Link>
            </li>
            <li>
              <Link href="/security">Trust, Safety & Security</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Help & Support</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/help">Help & Support</Link>
            </li>
            <li>
              <Link href="/foundation">Upwork Foundation</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Privacy & Legal</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/ca-notice">CA Notice at Collection</Link>
            </li>
            <li>
              <Link href="/cookie-settings">Cookie Settings</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Apps & Solutions</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/accessibility">Accessibility</Link>
            </li>
            <li>
              <Link href="/desktop">Desktop App</Link>
            </li>
            <li>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </li>
            <li>
              <Link href="/enterprise">Enterprise Solutions</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

