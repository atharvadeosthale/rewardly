import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import AuthHero from "@/components/auth-hero";

export default function Register() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-background">
      <AuthHero />

      {/* Right side - Sign In */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-black/[0.96] backdrop-blur-sm">
        <SignUp
          appearance={{
            baseTheme: dark,
            elements: {
              card: "bg-background",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton:
                "bg-background text-foreground border border-border hover:bg-accent",
              formButtonPrimary: "bg-primary",
              footerActionLink: "text-primary hover:text-primary/80",
            },
          }}
          signInUrl="/login"
          forceRedirectUrl="/auth-success"
        />
      </div>
    </div>
  );
}
