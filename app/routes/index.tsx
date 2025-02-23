import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="dark">
      {/* <LoginSection /> */}
      <section className="relative flex justify-center items-center min-h-[80vh] overflow-hidden bg-[#000000] py-20">
        {/* Subtle dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="container relative">
          <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-lg bg-pink-950/20 px-4 py-2 ring-1 ring-pink-500/20 backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4 text-pink-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
                  Your Anime Journey Starts Here
                </span>
              </div>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 blur-3xl">
                  <div className="h-full w-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20" />
                </div>

                <h1 className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl md:text-6xl lg:text-7xl [text-shadow:_0_1px_30px_rgb(236_72_153_/_20%)]">
                  AnimeCal
                  <span className="mt-2 block text-white [text-shadow:_0_1px_20px_rgb(255_255_255_/_30%)]">
                    Track Your Anime Schedule
                  </span>
                </h1>
              </div>

              <p className="mx-auto max-w-[600px] text-lg text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
                Never miss your favorite anime episodes again. Get personalized
                schedules, notifications, and track your watching progress all
                in one place.
              </p>
            </div>
            <Link
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "group relative bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500 px-8 py-6 text-lg transition-all duration-300 ease-out hover:scale-105"
              )}
              to="/home"
            >
              <CalendarDays className="mr-2 h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-12" />
              Start Tracking Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
