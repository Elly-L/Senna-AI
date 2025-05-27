"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/lib/toast"
import { useRouter } from "next/navigation"
import { useSimulation } from "@/hooks/useSimulation"
import { DemoControls } from "@/components/DemoControls"
import {
  Bell,
  ChevronDown,
  MessageSquare,
  Send,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Home,
  BarChart3,
  AlertTriangle,
  HelpCircle,
  Wifi,
  WifiOff,
  Loader2,
  XCircle,
  Target,
  Clock,
} from "lucide-react"

// Theme context
const useTheme = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("senna-theme") as "dark" | "light" | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("senna-theme", newTheme)
  }

  return { theme, toggleTheme }
}

// Enhanced threat alerts with simulation
const initialThreatAlerts = [
  {
    id: "1",
    title: "Suspicious login from Russia",
    level: "Critical",
    timestamp: "2m ago",
    description: "Multiple failed login attempts detected from Moscow IP address",
    isNew: false,
  },
  {
    id: "2",
    title: "Unusual data transfer detected",
    level: "High",
    timestamp: "5m ago",
    description: "Large file upload outside business hours from internal network",
    isNew: false,
  },
  {
    id: "3",
    title: "Malware signature detected",
    level: "Medium",
    timestamp: "12m ago",
    description: "Suspicious file hash matched known malware database entry",
    isNew: false,
  },
  {
    id: "4",
    title: "Phishing email blocked",
    level: "Low",
    timestamp: "18m ago",
    description: "Email with suspicious links automatically quarantined by filter",
    isNew: false,
  },
]

const initialAnomalies = [
  {
    user: "john.doe@gmail.com",
    anomaly: "Unusual Access Time",
    confidence: 89,
    lastSeen: "3m ago",
    exactTime: "2024-01-15 14:32:15 UTC",
    isNew: false,
  },
  {
    user: "sarah.smith@proton.me",
    anomaly: "Geographic Anomaly",
    confidence: 76,
    lastSeen: "15m ago",
    exactTime: "2024-01-15 14:20:30 UTC",
    isNew: false,
  },
  {
    user: "mike.wilson@outlook.com",
    anomaly: "Data Access Pattern",
    confidence: 92,
    lastSeen: "22m ago",
    exactTime: "2024-01-15 14:13:45 UTC",
    isNew: false,
  },
]

const initialChatMessages = [
  {
    id: 1,
    type: "user",
    message: "Any threats in last hour?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "bot",
    message:
      "I detected 4 threats in the last hour: 1 Critical, 1 High, 1 Medium, and 1 Low severity. The critical threat involves suspicious login attempts from Russia which I've automatically blocked.",
    timestamp: "10:30 AM",
  },
]

const initialChartData = [
  { time: "00:00", critical: 2, high: 5, medium: 8, low: 12 },
  { time: "04:00", critical: 1, high: 3, medium: 6, low: 10 },
  { time: "08:00", critical: 3, high: 7, medium: 12, low: 15 },
  { time: "12:00", critical: 4, high: 8, medium: 10, low: 18 },
  { time: "16:00", critical: 2, high: 6, medium: 14, low: 20 },
  { time: "20:00", critical: 1, high: 4, medium: 9, low: 16 },
  { time: "24:00", critical: 1, high: 2, medium: 5, low: 8 },
]

function ThreatLevelBadge({ level, isNew = false }: { level: string; isNew?: boolean }) {
  const colors = {
    Critical: "bg-red-500/20 text-red-400 border-red-500/50 shadow-red-500/20",
    High: "bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-orange-500/20",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50 shadow-yellow-500/20",
    Low: "bg-green-500/20 text-green-400 border-green-500/50 shadow-green-500/20",
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <Badge
        className={`${colors[level as keyof typeof colors]} border shadow-lg font-medium text-xs sm:text-sm ${isNew ? "animate-pulse" : ""}`}
      >
        {level}
      </Badge>
      {isNew && <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 text-xs">NEW</Badge>}
    </div>
  )
}

function ConfidenceBadge({ score, isNew = false }: { score: number; isNew?: boolean }) {
  let colorClass = "bg-gray-500/20 text-gray-400 border-gray-500/50"

  if (score >= 90) {
    colorClass = "bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-cyan-500/20"
  } else if (score >= 70) {
    colorClass = "bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-blue-500/20"
  }

  return (
    <Badge className={`${colorClass} border shadow-lg font-medium text-xs sm:text-sm ${isNew ? "animate-pulse" : ""}`}>
      {score}%
    </Badge>
  )
}

function ThreatChart({ chartData }: { chartData: any[] }) {
  const maxValue = Math.max(...chartData.flatMap((d) => [d.critical, d.high, d.medium, d.low]))

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Legend with colored pills */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
          <span className="text-gray-400">Critical</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50"></div>
          <span className="text-gray-400">High</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
          <span className="text-gray-400">Medium</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
          <span className="text-gray-400">Low</span>
        </div>
      </div>

      {/* Chart with neon glow effects */}
      <div className="relative h-48 sm:h-64 bg-gray-900/50 rounded-lg p-2 sm:p-4 border border-gray-700 overflow-hidden">
        <svg width="100%" height="100%" className="overflow-visible">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={`${i * 25}%`}
              x2="100%"
              y2={`${i * 25}%`}
              stroke="#374151"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}

          {/* Critical line */}
          <polyline
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            filter="url(#glow)"
            points={chartData
              .map((d, i) => `${(i / (chartData.length - 1)) * 100},${100 - (d.critical / maxValue) * 80}`)
              .join(" ")}
          />

          {/* High line */}
          <polyline
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            filter="url(#glow)"
            points={chartData
              .map((d, i) => `${(i / (chartData.length - 1)) * 100},${100 - (d.high / maxValue) * 80}`)
              .join(" ")}
          />

          {/* Medium line */}
          <polyline
            fill="none"
            stroke="#eab308"
            strokeWidth="2"
            filter="url(#glow)"
            points={chartData
              .map((d, i) => `${(i / (chartData.length - 1)) * 100},${100 - (d.medium / maxValue) * 80}`)
              .join(" ")}
          />

          {/* Low line */}
          <polyline
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            filter="url(#glow)"
            points={chartData
              .map((d, i) => `${(i / (chartData.length - 1)) * 100},${100 - (d.low / maxValue) * 80}`)
              .join(" ")}
          />

          {/* Glowing dots */}
          {chartData.map((d, i) => (
            <g key={i}>
              <circle
                cx={`${(i / (chartData.length - 1)) * 100}%`}
                cy={`${100 - (d.critical / maxValue) * 80}%`}
                r="3"
                fill="#ef4444"
                filter="url(#glow)"
              />
              <circle
                cx={`${(i / (chartData.length - 1)) * 100}%`}
                cy={`${100 - (d.high / maxValue) * 80}%`}
                r="3"
                fill="#f97316"
                filter="url(#glow)"
              />
              <circle
                cx={`${(i / (chartData.length - 1)) * 100}%`}
                cy={`${100 - (d.medium / maxValue) * 80}%`}
                r="3"
                fill="#eab308"
                filter="url(#glow)"
              />
              <circle
                cx={`${(i / (chartData.length - 1)) * 100}%`}
                cy={`${100 - (d.low / maxValue) * 80}%`}
                r="3"
                fill="#22c55e"
                filter="url(#glow)"
              />
            </g>
          ))}
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 sm:px-4 pb-1 sm:pb-2">
          {chartData.map((data, index) => (
            <span key={index} className="text-xs text-gray-400">
              {data.time}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsModal() {
  const [showPassword, setShowPassword] = useState(false)
  const [autoResponseSensitivity, setAutoResponseSensitivity] = useState(75)
  const [dataRetention, setDataRetention] = useState(30)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [slackWebhook, setSlackWebhook] = useState("")
  const { toast } = useToast()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-[95vw] sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-white">Settings</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] sm:h-[60vh] pr-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-700">
              <TabsTrigger value="general" className="data-[state=active]:bg-cyan-500 text-xs sm:text-sm">
                General
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-cyan-500 text-xs sm:text-sm">
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-cyan-500 text-xs sm:text-sm">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-cyan-500 text-xs sm:text-sm">
                Advanced
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-medium">General Settings</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-sm">
                      Display Name
                    </Label>
                    <Input id="name" defaultValue="John Doe" className="bg-gray-700 border-gray-600" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input id="email" defaultValue="john.doe@company.com" className="bg-gray-700 border-gray-600" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timezone" className="text-sm">
                      Timezone
                    </Label>
                    <Input id="timezone" defaultValue="UTC-5 (Eastern)" className="bg-gray-700 border-gray-600" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sensitivity" className="text-sm">
                      Auto-Response Sensitivity: {autoResponseSensitivity}%
                    </Label>
                    <input
                      type="range"
                      id="sensitivity"
                      min="0"
                      max="100"
                      value={autoResponseSensitivity}
                      onChange={(e) => setAutoResponseSensitivity(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="retention" className="text-sm">
                      Data Retention: {dataRetention} days
                    </Label>
                    <select
                      id="retention"
                      value={dataRetention}
                      onChange={(e) => setDataRetention(Number(e.target.value))}
                      className="bg-gray-700 border-gray-600 text-white rounded-md p-2 text-sm"
                    >
                      <option value={7}>7 days</option>
                      <option value={14}>14 days</option>
                      <option value={30}>30 days</option>
                    </select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-medium">Security Settings</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password" className="text-sm">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        className="bg-gray-700 border-gray-600 pr-10"
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
                  <div className="grid gap-2">
                    <Label htmlFor="new-password" className="text-sm">
                      New Password
                    </Label>
                    <Input id="new-password" type="password" className="bg-gray-700 border-gray-600" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-medium">Notification Settings</h3>
                <div className="grid gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                    <Label htmlFor="email-notifications" className="text-sm">
                      Email Notifications
                    </Label>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slack-webhook" className="text-sm">
                      Slack Webhook URL
                    </Label>
                    <Input
                      id="slack-webhook"
                      type="url"
                      placeholder="https://hooks.slack.com/services/..."
                      className="bg-gray-700 border-gray-600"
                      value={slackWebhook}
                      onChange={(e) => setSlackWebhook(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-medium">Advanced Settings</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="api-key" className="text-sm">
                      API Key
                    </Label>
                    <Input
                      id="api-key"
                      type="text"
                      defaultValue="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="server-location" className="text-sm">
                      Server Location
                    </Label>
                    <Input
                      id="server-location"
                      type="text"
                      defaultValue="us-east-1"
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
        <div className="flex justify-end pt-4 sm:pt-6">
          <Button onClick={() => toast("Settings saved!", "success")} className="text-sm">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AuthModal() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")

  const { signIn, signUp, signOut, resetPassword, user } = useAuth()
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

  const handleLogout = async () => {
    try {
      await signOut()
      toast("Logged out successfully", "success")
      router.push("/welcome")
    } catch (error) {
      toast("Failed to log out", "error")
    }
  }

  if (user) {
    return (
      <DropdownMenuItem onSelect={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </DropdownMenuItem>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <LogOut className="mr-2 h-4 w-4" />
          Login
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-[95vw] sm:max-w-md max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-white">{isLogin ? "Login" : "Sign Up"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <Alert className="bg-red-500/10 border-red-500/50 text-red-400">
                <XCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4">
              {!isLogin && (
                <div className="grid gap-2">
                  <Label htmlFor="signup-name" className="text-sm">
                    Full Name
                  </Label>
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
                <Label htmlFor="auth-email" className="text-sm">
                  Email
                </Label>
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
                <Label htmlFor="auth-password" className="text-sm">
                  Password
                </Label>
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
                  <Label htmlFor="confirm-auth-password" className="text-sm">
                    Confirm Password
                  </Label>
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

            <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-sm" disabled={isLoading}>
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
                className="text-cyan-400 hover:text-cyan-300 text-sm"
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
                  className="text-gray-400 hover:text-gray-300 text-xs"
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

function DocumentationSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <HelpCircle className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Help</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-800 border-gray-700 text-white w-[90vw] sm:w-96">
        <SheetHeader>
          <SheetTitle className="text-white">User Guide</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Severity Levels</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <ThreatLevelBadge level="Critical" />
                  <span className="text-xs sm:text-sm">Immediate action required</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThreatLevelBadge level="High" />
                  <span className="text-xs sm:text-sm">High priority investigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThreatLevelBadge level="Medium" />
                  <span className="text-xs sm:text-sm">Monitor and review</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThreatLevelBadge level="Low" />
                  <span className="text-xs sm:text-sm">Informational alert</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Chat Commands</h3>
              <div className="space-y-1 text-xs sm:text-sm text-gray-300">
                <p>
                  <code>/threats</code> - Show recent threats
                </p>
                <p>
                  <code>/status</code> - System status
                </p>
                <p>
                  <code>/help</code> - Show all commands
                </p>
                <p>
                  <code>/export</code> - Export threat data
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Keyboard Shortcuts</h3>
              <div className="space-y-1 text-xs sm:text-sm text-gray-300">
                <p>
                  <kbd>Ctrl + /</kbd> - Focus chat input
                </p>
                <p>
                  <kbd>Ctrl + R</kbd> - Refresh data
                </p>
                <p>
                  <kbd>Ctrl + T</kbd> - Toggle auto-response
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-cyan-400 px-2">
          <Home className="h-4 w-4" />
          <span className="text-xs">Home</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-gray-400 px-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-xs">Alerts</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-gray-400 px-2">
          <BarChart3 className="h-4 w-4" />
          <span className="text-xs">Trends</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-gray-400 px-2">
          <Users className="h-4 w-4" />
          <span className="text-xs">Anomalies</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-gray-400 px-2">
          <MessageSquare className="h-4 w-4" />
          <span className="text-xs">Chat</span>
        </Button>
      </div>
    </div>
  )
}

function ConnectionStatus({ networkStatus }: { networkStatus: any }) {
  return (
    <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
      <div className="flex items-center gap-1 sm:gap-2 bg-gray-800/90 backdrop-blur rounded-lg px-2 sm:px-3 py-1 sm:py-2 border border-gray-700">
        {networkStatus.connected ? (
          <Wifi className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
        ) : (
          <WifiOff className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
        )}
        <span className="text-xs text-gray-400">
          {networkStatus.connected ? `${networkStatus.latency}ms` : "Offline"}
        </span>
        <div
          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
            networkStatus.quality === "excellent"
              ? "bg-green-400"
              : networkStatus.quality === "good"
                ? "bg-yellow-400"
                : "bg-red-400"
          }`}
        />
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme()
  const [autoResponse, setAutoResponse] = useState(true)
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState(initialChatMessages)
  const [threatAlerts, setThreatAlerts] = useState(initialThreatAlerts)
  const [anomalies, setAnomalies] = useState(initialAnomalies)
  const [chartData, setChartData] = useState(initialChartData)
  const [isLoadingChat, setIsLoadingChat] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const { simulator, metrics, networkStatus } = useSimulation()

  // Redirect to welcome page if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/welcome")
    }
  }, [user, router])

  // Subscribe to simulation events
  useEffect(() => {
    const handleSimulationEvent = (data: any) => {
      switch (data.type) {
        case "threat":
          setThreatAlerts((prev) => [{ ...data.payload, isNew: true }, ...prev.slice(0, 9)])
          // Remove "new" flag after animation
          setTimeout(() => {
            setThreatAlerts((prev) => prev.map((threat) => ({ ...threat, isNew: false })))
          }, 3000)
          break

        case "anomaly":
          setAnomalies((prev) => {
            const existingIndex = prev.findIndex((a) => a.user === data.payload.user)
            if (existingIndex >= 0) {
              const updated = [...prev]
              updated[existingIndex] = { ...data.payload, isNew: true }
              return updated
            }
            return [{ ...data.payload, isNew: true }, ...prev.slice(0, 19)]
          })
          // Remove "new" flag after animation
          setTimeout(() => {
            setAnomalies((prev) => prev.map((anomaly) => ({ ...anomaly, isNew: false })))
          }, 3000)
          break

        case "trend":
          setChartData((prev) => {
            const newData = [
              ...prev.slice(1),
              {
                time: new Date(data.payload.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                critical: data.payload.counts.critical,
                high: data.payload.counts.high,
                medium: data.payload.counts.medium,
                low: data.payload.counts.low,
              },
            ]
            return newData
          })
          break
      }
    }

    simulator.subscribe(handleSimulationEvent)
    return () => simulator.unsubscribe(handleSimulationEvent)
  }, [simulator])

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    setIsLoadingChat(true)
    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      message: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newMessage])
    const currentInput = chatInput
    setChatInput("")

    // Simulate AI response with realistic delay
    setTimeout(
      () => {
        const botResponse = {
          id: messages.length + 2,
          type: "bot" as const,
          message: simulator.generateChatResponse(currentInput),
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsLoadingChat(false)
      },
      1000 + Math.random() * 2000,
    ) // 1-3 second delay
  }

  const handleAutoResponseToggle = (checked: boolean) => {
    setAutoResponse(checked)
    toast(`Auto-response ${checked ? "enabled" : "disabled"}`, "success")
  }

  // Demo control handlers
  const handleTriggerThreat = () => {
    const criticalThreat = {
      id: Date.now().toString(),
      title: "CRITICAL: Advanced Persistent Threat Detected",
      level: "Critical",
      description: "Sophisticated APT group attempting lateral movement across network infrastructure",
      timestamp: "Just now",
      isNew: true,
    }
    setThreatAlerts((prev) => [criticalThreat, ...prev.slice(0, 9)])
    setTimeout(() => {
      setThreatAlerts((prev) => prev.map((threat) => ({ ...threat, isNew: false })))
    }, 3000)
  }

  const handleTriggerAnomaly = () => {
    const suspiciousAnomaly = {
      user: "admin@proton.me",
      anomaly: "Privilege Escalation",
      confidence: 95,
      lastSeen: "Just now",
      exactTime: new Date().toISOString(),
      isNew: true,
    }
    setAnomalies((prev) => [suspiciousAnomaly, ...prev.slice(0, 19)])
    setTimeout(() => {
      setAnomalies((prev) => prev.map((anomaly) => ({ ...anomaly, isNew: false })))
    }, 3000)
  }

  const handleTriggerBreach = () => {
    const breachAlert = {
      id: Date.now().toString(),
      title: "🚨 DATA BREACH DETECTED - IMMEDIATE ACTION REQUIRED",
      level: "Critical",
      description: "Unauthorized access to customer database detected. AI containment protocols activated.",
      timestamp: "Just now",
      isNew: true,
    }
    setThreatAlerts((prev) => [breachAlert, ...prev.slice(0, 9)])

    // Add AI response to chat
    const aiResponse = {
      id: messages.length + 100,
      type: "bot" as const,
      message:
        "🚨 SECURITY BREACH DETECTED! I've immediately isolated the affected systems and initiated incident response protocols. All stakeholders have been notified. Forensic analysis is underway.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, aiResponse])

    setTimeout(() => {
      setThreatAlerts((prev) => prev.map((threat) => ({ ...threat, isNew: false })))
    }, 5000)
  }

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return "JD"
  }

  // Don't render dashboard if user is not logged in
  if (!user) {
    return null
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen font-inter bg-gray-900 text-white pb-16 md:pb-0">
        <ConnectionStatus networkStatus={networkStatus} />

        {/* Header */}
        <header className="bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 sticky top-0 z-40">
          <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-cyan-500/20 rounded-lg">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold">Senna AI</h1>
                  <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                    Autonomous Cyber Threat Response Agent
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden lg:flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-cyan-400" />
                    <span className="text-gray-400">Threats Blocked:</span>
                    <span className="text-cyan-400 font-bold">{metrics.threatsBlocked}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span className="text-gray-400">Response:</span>
                    <span className="text-green-400 font-bold">{metrics.responseTime}s</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="hover:bg-gray-800 p-2"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-1 sm:gap-2 hover:bg-gray-800 p-1 sm:p-2"
                      aria-label="User menu"
                    >
                      <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                        <AvatarFallback className="bg-cyan-500/20 text-cyan-400 font-semibold text-xs sm:text-sm">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                    <SettingsModal />
                    <DropdownMenuItem
                      onSelect={() => {
                        toast("Logged out successfully", "success")
                        router.push("/welcome")
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-3 sm:gap-6">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-3 space-y-3 sm:space-y-6">
              {/* Live Threat Feed */}
              <Card className="bg-gray-800 border-gray-700 rounded-xl sm:rounded-2xl shadow-md">
                <CardHeader className="pb-3 sm:pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                      Live Threat Alerts
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/50 text-xs">
                        {threatAlerts.filter((t) => t.level === "Critical").length} Critical
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-gray-400">Auto-Response</span>
                      <Switch
                        checked={autoResponse}
                        onCheckedChange={handleAutoResponseToggle}
                        className="data-[state=checked]:bg-cyan-500"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-96 overflow-y-auto">
                    {threatAlerts.map((threat) => (
                      <div
                        key={threat.id}
                        className={`p-3 sm:p-4 bg-gray-700/50 rounded-lg border border-gray-600 transition-all duration-500 ${
                          threat.isNew
                            ? "animate-in slide-in-from-right border-cyan-500 shadow-lg shadow-cyan-500/20"
                            : ""
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-sm sm:text-base">{threat.title}</h3>
                          <div className="flex items-center gap-2">
                            <ThreatLevelBadge level={threat.level} isNew={threat.isNew} />
                            <span className="text-xs text-gray-500">{threat.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400">{threat.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Threat Trends Chart */}
              <Card className="bg-gray-800 border-gray-700 rounded-xl sm:rounded-2xl shadow-md">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                    Threat Detections Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ThreatChart chartData={chartData} />
                </CardContent>
              </Card>

              {/* Anomaly Detection */}
              <Card className="bg-gray-800 border-gray-700 rounded-xl sm:rounded-2xl shadow-md">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                      User Behavior Anomalies
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 text-xs w-fit">
                      {anomalies.filter((a) => a.confidence >= 90).length} High Confidence
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-400 text-xs sm:text-sm">User</TableHead>
                          <TableHead className="text-gray-400 text-xs sm:text-sm">Anomaly</TableHead>
                          <TableHead className="text-gray-400 text-xs sm:text-sm">Confidence</TableHead>
                          <TableHead className="text-gray-400 text-xs sm:text-sm">Last Seen</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {anomalies.map((anomaly, index) => (
                          <TableRow
                            key={index}
                            className={`border-gray-700 transition-all duration-500 ${
                              anomaly.isNew ? "bg-yellow-500/10 border-yellow-500/50" : ""
                            }`}
                          >
                            <TableCell className="text-gray-300 text-xs sm:text-sm">
                              <div className="truncate max-w-[120px] sm:max-w-none">{anomaly.user}</div>
                            </TableCell>
                            <TableCell className="text-gray-300 text-xs sm:text-sm">{anomaly.anomaly}</TableCell>
                            <TableCell>
                              <ConfidenceBadge score={anomaly.confidence} isNew={anomaly.isNew} />
                            </TableCell>
                            <TableCell>
                              <Tooltip>
                                <TooltipTrigger>
                                  <span className="text-xs text-gray-400 cursor-help">{anomaly.lastSeen}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">{anomaly.exactTime}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Chat & Controls */}
            <div className="space-y-3 sm:space-y-6">
              {/* Demo Controls */}
              <DemoControls
                onTriggerThreat={handleTriggerThreat}
                onTriggerAnomaly={handleTriggerAnomaly}
                onTriggerBreach={handleTriggerBreach}
              />

              {/* AI Chat */}
              <Card className="bg-gray-800 border-gray-700 rounded-xl sm:rounded-2xl shadow-md">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                    Ask Senna AI
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">Online</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4 max-h-60 sm:max-h-80 overflow-y-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 sm:gap-3 animate-in fade-in duration-500 ${
                          message.type === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.type === "bot" && (
                          <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                            <AvatarFallback className="bg-cyan-500/20 text-cyan-400 text-xs sm:text-sm">
                              🤖
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg ${
                            message.type === "user" ? "bg-cyan-500/20 text-cyan-100" : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          <p className="text-xs sm:text-sm">{message.message}</p>
                          <span className="text-xs text-gray-500 mt-1 block">{message.timestamp}</span>
                        </div>
                        {message.type === "user" && (
                          <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                            <AvatarFallback className="bg-cyan-500/20 text-cyan-400 text-xs sm:text-sm">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {isLoadingChat && (
                      <div className="flex gap-2 sm:gap-3 justify-start">
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                          <AvatarFallback className="bg-cyan-500/20 text-cyan-400 text-xs sm:text-sm">
                            🤖
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-700 text-gray-300 p-2 sm:p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                            <span className="text-xs sm:text-sm">Analyzing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="chat-input"
                      placeholder="Ask about threats, status, or security..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm"
                      disabled={isLoadingChat}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white p-2"
                      disabled={isLoadingChat}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-cyan-500 bg-gray-900/95 mt-6 sm:mt-12">
          <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm text-center">
                  Senna AI is monitoring your stack in real-time — no action required.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:underline text-xs sm:text-sm"
                >
                  GitHub Repo
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:underline text-xs sm:text-sm"
                >
                  Documentation
                </Button>
              </div>
            </div>
          </div>
        </footer>

        <MobileNavigation />
      </div>
    </TooltipProvider>
  )
}
