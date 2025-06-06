"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Activity, Shield, AlertTriangle, Users, Settings } from "lucide-react"
import { useSimulation } from "@/hooks/useSimulation"
import { useToast } from "@/lib/toast"

interface DemoControlsProps {
  onTriggerThreat: () => void
  onTriggerAnomaly: () => void
  onTriggerBreach: () => void
}

export function DemoControls({ onTriggerThreat, onTriggerAnomaly, onTriggerBreach }: DemoControlsProps) {
  const { isActive, metrics, networkStatus, startSimulation, stopSimulation } = useSimulation()
  const { toast } = useToast()
  const [intensity, setIntensity] = useState([50])
  const [autoDemo, setAutoDemo] = useState(true)

  const handleTriggerThreat = () => {
    onTriggerThreat()
    toast("🚨 Critical threat simulated - watch the dashboard update!", "warning")
  }

  const handleTriggerAnomaly = () => {
    onTriggerAnomaly()
    toast("👤 User anomaly detected - check behavior analysis", "info")
  }

  const handleTriggerBreach = () => {
    onTriggerBreach()
    toast("🔥 Security breach simulation - observe AI response", "error")
  }

  const handleToggleSimulation = () => {
    if (isActive) {
      stopSimulation()
      toast("Simulation paused", "info")
    } else {
      startSimulation()
      toast("Simulation resumed", "success")
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700 rounded-xl sm:rounded-2xl shadow-lg">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-white text-base sm:text-lg">
          <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
          System Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Simulation Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className={`h-3 w-3 sm:h-4 sm:w-4 ${isActive ? "text-green-400" : "text-gray-400"}`} />
            <span className="text-xs sm:text-sm text-gray-300">Simulation {isActive ? "Active" : "Paused"}</span>
          </div>
          <Button
            onClick={handleToggleSimulation}
            variant="outline"
            size="sm"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 text-xs sm:text-sm px-2 sm:px-3"
          >
            {isActive ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4" />}
          </Button>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-cyan-400">{metrics.threatsBlocked}</div>
            <div className="text-xs text-gray-400">Threats Blocked</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-400">{metrics.responseTime}s</div>
            <div className="text-xs text-gray-400">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-blue-400">{metrics.uptime}%</div>
            <div className="text-xs text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-400">{networkStatus.latency}ms</div>
            <div className="text-xs text-gray-400">Latency</div>
          </div>
        </div>

        {/* Demo Triggers */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="text-xs sm:text-sm font-medium text-gray-300">Instant Demo Triggers</Label>

          <Button
            onClick={handleTriggerThreat}
            className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 text-xs sm:text-sm py-2"
          >
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Generate Threat Alert
          </Button>

          <Button
            onClick={handleTriggerAnomaly}
            className="w-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/50 text-xs sm:text-sm py-2"
          >
            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Detect User Anomaly
          </Button>

          <Button
            onClick={handleTriggerBreach}
            className="w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/50 text-xs sm:text-sm py-2"
          >
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Security Incident
          </Button>
        </div>

        {/* Simulation Settings */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-demo" className="text-xs sm:text-sm text-gray-300">
              Auto Demo Mode
            </Label>
            <Switch
              id="auto-demo"
              checked={autoDemo}
              onCheckedChange={setAutoDemo}
              className="data-[state=checked]:bg-cyan-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs sm:text-sm text-gray-300">Threat Intensity: {intensity[0]}%</Label>
            <Slider value={intensity} onValueChange={setIntensity} max={100} step={10} className="w-full" />
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="pt-3 sm:pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>AI Models Updated</span>
            <span>{metrics.modelsUpdated}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Data Processed</span>
            <span>{metrics.dataProcessed}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Detection Rate</span>
            <span>{metrics.detectionRate}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
