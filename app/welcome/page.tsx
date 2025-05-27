"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import { useRouter } from "next/navigation"
import {
  Shield,
  Eye,
  EyeOff,
  Loader2,
  XCircle,
  Zap,
  Bell,
  TrendingUp,
  Users,
  MessageSquare,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

function AuthModal({ isLogin: initialIsLogin }: { isLogin: boolean }) {
  const [isLogin, setIsLogin] = useState(initialIsLogin)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const { signIn, signUp, resetPassword } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (isLogin) {
        await signIn(email, password)
        toast("Login successful! Welcome back.", "success")
        router.push("/")
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match")
          return
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters")
          return
        }
        await signUp(email, password, fullName)
        toast("Account created successfully! Please check your email for verification.", "success")
        router.push("/")
      }
    } catch (error: any) {
      let errorMessage = "An error occurred. Please try again."

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address."
          break
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again."
          break
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address."
          break
        case "auth/email-already-in-use":
          errorMessage = "An account with this email already exists."
          break
        case "auth/weak-password":
          errorMessage = "Password is too weak. Please choose a stronger password."
          break
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later."
          break
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection."
          break
        default:
          errorMessage = error.message || errorMessage
      }

      setError(errorMessage)
      toast(errorMessage, "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      toast("Please enter your email address first", "error")
      return
    }

    try {
      await resetPassword(email)
      toast("Password reset email sent! Check your inbox.", "success")
    } catch (error: any) {
      toast("Failed to send reset email. Please try again.", "error")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            isLogin
              ? "bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              : "bg-cyan-500 hover:bg-cyan-600 text-white"
          }
        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">{isLogin ? "Login" : "Sign Up"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert className="bg-red-500/10 border-red-500/50 text-red-400">
                <XCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4">
              {!isLogin && (
                <div className="grid gap-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    required={!isLogin}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="auth-email">Email</Label>
                <Input
                  id="auth-email"
                  type="email"
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="auth-password">Password</Label>
                <div className="relative">
                  <Input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 border-gray-600 pr-10"
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              {!isLogin && (
                <div className="grid gap-2">
                  <Label htmlFor="confirm-auth-password">Confirm Password</Label>
                  <Input
                    id="confirm-auth-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    required={!isLogin}
                  />
                </div>
              )}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                  <Switch
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    className="data-[state=checked]:bg-cyan-500"
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>{isLogin ? "Login" : "Create Account"}</>
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="text-cyan-400 hover:text-cyan-300"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError("")
                }}
              >
                {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
              </Button>
            </div>

            {isLogin && (
              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-gray-400 hover:text-gray-300 text-sm"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </Button>
              </div>
            )}
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default function WelcomePage() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect to dashboard if already logged in
  if (user) {
    router.push("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)]"></div>

        {/* Header */}
        <header className="relative z-10 px-4 py-6">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Shield className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Senna AI</h1>
                <p className="text-sm text-gray-400">Autonomous Cyber Threat Response Agent</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <AuthModal isLogin={true} />
              <AuthModal isLogin={false} />
            </div>
          </div>
        </header>

        {/* Main Hero Content */}
        <div className="relative z-10 px-4 py-20">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent">
                Autonomous Cyber Defense
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Advanced AI-powered cybersecurity that monitors, detects, and responds to threats in real-time.
                <br />
                <span className="text-cyan-400">No human intervention required.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <AuthModal isLogin={false} />
                <Button
                  variant="outline"
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  onClick={() => {
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">99.9%</div>
                  <div className="text-gray-400">Threat Detection Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">&lt;1s</div>
                  <div className="text-gray-400">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                  <div className="text-gray-400">Autonomous Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Intelligent Threat Response</h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Senna AI combines advanced machine learning with real-time threat intelligence to provide unparalleled
              cybersecurity protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 bg-red-500/20 rounded-lg w-fit">
                  <Bell className="h-6 w-6 text-red-400" />
                </div>
                <CardTitle className="text-white">Live Threat Alerts</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time monitoring and instant alerts for critical security events
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 bg-cyan-500/20 rounded-lg w-fit">
                  <TrendingUp className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Threat Analytics</CardTitle>
                <CardDescription className="text-gray-400">
                  Advanced analytics and trend analysis to predict and prevent attacks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 bg-blue-500/20 rounded-lg w-fit">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Behavior Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-powered user behavior monitoring to detect anomalies and insider threats
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 bg-green-500/20 rounded-lg w-fit">
                  <MessageSquare className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-white">AI Assistant</CardTitle>
                <CardDescription className="text-gray-400">
                  Intelligent chatbot for instant security insights and threat investigation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6">Why Choose Senna AI?</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Autonomous Response</h4>
                    <p className="text-gray-400">
                      AI automatically responds to threats without human intervention, reducing response time from hours
                      to seconds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Advanced Machine Learning</h4>
                    <p className="text-gray-400">
                      Continuously learning algorithms adapt to new threats and improve detection accuracy over time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Zero-Day Protection</h4>
                    <p className="text-gray-400">
                      Behavioral analysis detects unknown threats and zero-day exploits before they cause damage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Comprehensive Coverage</h4>
                    <p className="text-gray-400">
                      Monitors network traffic, user behavior, system logs, and external threat intelligence feeds.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Threat Detection</span>
                    <span className="text-cyan-400 font-semibold">Active</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Threats Blocked</div>
                      <div className="text-2xl font-bold text-green-400">1,247</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Response Time</div>
                      <div className="text-2xl font-bold text-cyan-400">0.3s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold mb-6">Ready to Secure Your Infrastructure?</h3>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of organizations already protected by Senna AI's autonomous cybersecurity platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AuthModal isLogin={false} />
              <Button variant="outline" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500 bg-gray-900/95 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Zap className="h-5 w-5" />
              <span className="text-sm">Senna AI is monitoring your stack in real-time — no action required.</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:underline">
                GitHub Repo
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:underline">
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
