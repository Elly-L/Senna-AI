"use client"

import { useEffect, useState, useCallback } from "react"
import { ThreatSimulator, PerformanceSimulator, NetworkSimulator } from "@/lib/simulation"

export function useSimulation() {
  const [simulator] = useState(() => ThreatSimulator.getInstance())
  const [isActive, setIsActive] = useState(false)
  const [metrics, setMetrics] = useState(() => PerformanceSimulator.generateMetrics())
  const [networkStatus, setNetworkStatus] = useState(() => NetworkSimulator.getStatus())

  const startSimulation = useCallback(() => {
    simulator.start()
    setIsActive(true)
  }, [simulator])

  const stopSimulation = useCallback(() => {
    simulator.stop()
    setIsActive(false)
  }, [simulator])

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(PerformanceSimulator.generateMetrics())
      setNetworkStatus(NetworkSimulator.getStatus())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Auto-start simulation
  useEffect(() => {
    startSimulation()
    return () => stopSimulation()
  }, [startSimulation, stopSimulation])

  return {
    simulator,
    isActive,
    metrics,
    networkStatus,
    startSimulation,
    stopSimulation,
  }
}
