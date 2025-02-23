import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <Link to="/">
        <h1 className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-xl font-bold tracking-tighter text-transparent sm:text-2xl [text-shadow:_0_1px_30px_rgb(236_72_153_/_20%)]">
          AnimeCal
        </h1>
      </Link>
      <LoginSection />
    </nav>
  );
}

export function LoginSection() {
  return (
    <div className="flex items-center gap-4 justify-end">
      <Button
        variant="ghost"
        className="text-gray-300 hover:text-white hover:bg-white/10"
      >
        Login
      </Button>
      <Button className="bg-pink-500 text-white hover:bg-pink-600">
        Create Account
      </Button>
    </div>
  );
}
