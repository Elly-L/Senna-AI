// Advanced simulation engine for realistic cybersecurity data
export class ThreatSimulator {
  private static instance: ThreatSimulator
  private isRunning = false
  private callbacks: Array<(data: any) => void> = []
  private threatPatterns = [
    {
      type: "Brute Force Attack",
      sources: ["Russia", "China", "North Korea", "Iran", "Unknown"],
      descriptions: [
        "Multiple failed login attempts detected from {source} IP address",
        "Automated password spraying attack from {source} targeting admin accounts",
        "SSH brute force attack detected from {source} infrastructure",
        "RDP login attempts from {source} with common password lists",
      ],
      severity: ["Critical", "High", "Medium"],
    },
    {
      type: "Malware Detection",
      sources: ["Email", "USB", "Download", "Network"],
      descriptions: [
        "Suspicious file hash matched known malware database entry",
        "Ransomware signature detected in {source} traffic",
        "Trojan behavior identified in system processes",
        "Cryptominer detected consuming system resources",
      ],
      severity: ["Critical", "High", "Medium", "Low"],
    },
    {
      type: "Data Exfiltration",
      sources: ["Internal", "External", "Cloud", "Mobile"],
      descriptions: [
        "Large file upload outside business hours from {source} network",
        "Unusual data transfer patterns detected to {source} servers",
        "Sensitive data accessed from unauthorized {source} location",
        "Database queries exceeding normal patterns from {source}",
      ],
      severity: ["Critical", "High", "Medium"],
    },
    {
      type: "Phishing Attack",
      sources: ["Email", "SMS", "Social Media", "Website"],
      descriptions: [
        "Phishing {source} with suspicious links automatically quarantined",
        "Credential harvesting attempt detected via {source}",
        "Social engineering attack identified through {source} channel",
        "Fake login page detected mimicking company portal",
      ],
      severity: ["High", "Medium", "Low"],
    },
    {
      type: "Insider Threat",
      sources: ["Employee", "Contractor", "Partner", "Admin"],
      descriptions: [
        "Privileged {source} accessing files outside normal scope",
        "After-hours data access by {source} account",
        "Unusual file deletion patterns by {source} user",
        "Unauthorized system configuration changes by {source}",
      ],
      severity: ["Critical", "High", "Medium"],
    },
  ]

  private anomalyPatterns = [
    {
      types: [
        "Unusual Access Time",
        "Geographic Anomaly",
        "Data Access Pattern",
        "Login Frequency",
        "File Access Pattern",
      ],
      users: [
        "john.doe@gmail.com",
        "sarah.smith@proton.me",
        "mike.wilson@outlook.com",
        "alice.johnson@yahoo.com",
        "bob.brown@gmail.com",
        "carol.davis@proton.me",
        "david.miller@hotmail.com",
        "emma.garcia@gmail.com",
        "frank.rodriguez@icloud.com",
        "lisa.chen@gmail.com",
        "james.taylor@proton.me",
        "maria.gonzalez@outlook.com",
        "robert.anderson@yahoo.com",
        "jennifer.white@gmail.com",
        "michael.lee@proton.me",
      ],
    },
  ]

  private chatResponses = {
    threats: [
      "I've detected {count} threats in the last hour. The most critical involves {threat}. I've automatically implemented containment measures.",
      "Current threat landscape shows elevated activity from {region}. I'm monitoring {count} suspicious connections.",
      "Analysis complete: {count} threats neutralized, {active} still under investigation. All critical systems remain secure.",
      "Threat intelligence indicates a {type} campaign targeting our sector. I've enhanced monitoring protocols.",
    ],
    status: [
      "All systems operational. Real-time monitoring active across {endpoints} endpoints. Response time: {latency}ms.",
      "Security posture: OPTIMAL. {blocked} threats blocked today. Zero successful breaches detected.",
      "Infrastructure health: 99.9% uptime. AI models updated {time} ago. Threat database current.",
      "Autonomous response systems: ACTIVE. {rules} security rules enforced. {updates} policy updates applied.",
    ],
    general: [
      "Based on current threat intelligence, I recommend {action}. This will enhance our security posture by {percentage}%.",
      "I'm continuously learning from global threat patterns. Recent analysis shows {insight}.",
      "Your security metrics are trending positively. {metric} improved by {percentage}% this week.",
      "I've identified {count} optimization opportunities in your security configuration. Shall I implement them?",
    ],
  }

  static getInstance(): ThreatSimulator {
    if (!ThreatSimulator.instance) {
      ThreatSimulator.instance = new ThreatSimulator()
    }
    return ThreatSimulator.instance
  }

  subscribe(callback: (data: any) => void) {
    this.callbacks.push(callback)
  }

  unsubscribe(callback: (data: any) => void) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback)
  }

  private notify(data: any) {
    this.callbacks.forEach((callback) => callback(data))
  }

  start() {
    if (this.isRunning) return
    this.isRunning = true

    // Generate initial burst of activity
    setTimeout(() => this.generateThreat(), 2000)
    setTimeout(() => this.generateAnomaly(), 4000)
    setTimeout(() => this.updateTrends(), 6000)

    // Set up regular intervals
    setInterval(() => this.generateThreat(), 8000 + Math.random() * 12000) // 8-20s instead of 15-35s
    setInterval(() => this.generateAnomaly(), 15000 + Math.random() * 20000) // 15-35s instead of 25-55s
    setInterval(() => this.updateTrends(), 5000) // 5s instead of 30s for more dynamic charts
  }

  stop() {
    this.isRunning = false
  }

  private generateThreat() {
    const pattern = this.threatPatterns[Math.floor(Math.random() * this.threatPatterns.length)]
    const source = pattern.sources[Math.floor(Math.random() * pattern.sources.length)]
    const description = pattern.descriptions[Math.floor(Math.random() * pattern.descriptions.length)]
    const severity = pattern.severity[Math.floor(Math.random() * pattern.severity.length)]

    const threat = {
      id: Date.now().toString(),
      title: `${pattern.type} from ${source}`,
      level: severity,
      description: description.replace("{source}", source),
      timestamp: "Just now",
    }

    this.notify({
      type: "threat",
      payload: threat,
    })
  }

  private generateAnomaly() {
    const pattern = this.anomalyPatterns[0]
    const user = pattern.users[Math.floor(Math.random() * pattern.users.length)]
    const anomalyType = pattern.types[Math.floor(Math.random() * pattern.types.length)]
    const confidence = 70 + Math.floor(Math.random() * 30) // 70-99%

    const anomaly = {
      user,
      anomalyType,
      confidence,
      lastSeen: "Just now",
      exactTime: new Date().toISOString(),
    }

    this.notify({
      type: "anomaly",
      payload: anomaly,
    })
  }

  private updateTrends() {
    const trends = {
      timestamp: new Date().toISOString(),
      counts: {
        critical: Math.floor(Math.random() * 8), // Increased range
        high: Math.floor(Math.random() * 15) + 2,
        medium: Math.floor(Math.random() * 20) + 5,
        low: Math.floor(Math.random() * 25) + 8,
      },
    }

    this.notify({
      type: "trend",
      payload: trends,
    })
  }

  generateChatResponse(message: string): string {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("threat") || lowerMessage.includes("attack") || lowerMessage.includes("security")) {
      const responses = this.chatResponses.threats
      const response = responses[Math.floor(Math.random() * responses.length)]
      return response
        .replace("{count}", (Math.floor(Math.random() * 10) + 1).toString())
        .replace("{threat}", this.threatPatterns[0].type.toLowerCase())
        .replace("{region}", this.threatPatterns[0].sources[0])
        .replace("{active}", Math.floor(Math.random() * 3).toString())
        .replace(
          "{type}",
          this.threatPatterns[Math.floor(Math.random() * this.threatPatterns.length)].type.toLowerCase(),
        )
    }

    if (lowerMessage.includes("status") || lowerMessage.includes("health") || lowerMessage.includes("system")) {
      const responses = this.chatResponses.status
      const response = responses[Math.floor(Math.random() * responses.length)]
      return response
        .replace("{endpoints}", (Math.floor(Math.random() * 500) + 100).toString())
        .replace("{latency}", (Math.floor(Math.random() * 50) + 20).toString())
        .replace("{blocked}", (Math.floor(Math.random() * 1000) + 500).toString())
        .replace("{time}", Math.floor(Math.random() * 60) + " minutes")
        .replace("{rules}", (Math.floor(Math.random() * 200) + 50).toString())
        .replace("{updates}", Math.floor(Math.random() * 10).toString())
    }

    // General AI responses
    const responses = this.chatResponses.general
    const response = responses[Math.floor(Math.random() * responses.length)]
    return response
      .replace("{action}", "implementing additional network segmentation")
      .replace("{percentage}", (Math.floor(Math.random() * 20) + 10).toString())
      .replace("{insight}", "increased APT activity in the financial sector")
      .replace("{metric}", "threat detection accuracy")
      .replace("{count}", Math.floor(Math.random() * 5 + 1).toString())
  }
}

// Performance metrics simulator
export class PerformanceSimulator {
  static generateMetrics() {
    return {
      threatsBlocked: Math.floor(Math.random() * 1000) + 1247,
      responseTime: (Math.random() * 0.5 + 0.1).toFixed(1),
      uptime: (99.5 + Math.random() * 0.4).toFixed(2),
      detectionRate: (99.0 + Math.random() * 0.9).toFixed(1),
      falsePositives: (Math.random() * 2).toFixed(1),
      activeConnections: Math.floor(Math.random() * 500) + 200,
      dataProcessed: (Math.random() * 100 + 50).toFixed(1) + " GB",
      modelsUpdated: Math.floor(Math.random() * 60) + " minutes ago",
    }
  }
}

// Network status simulator
export class NetworkSimulator {
  private static latency = 42
  private static isConnected = true

  static getStatus() {
    // Simulate occasional network fluctuations
    if (Math.random() < 0.05) {
      // 5% chance
      this.isConnected = !this.isConnected
    }

    if (this.isConnected) {
      this.latency = Math.floor(Math.random() * 80) + 20 // 20-100ms
    }

    return {
      connected: this.isConnected,
      latency: this.latency,
      quality: this.latency < 50 ? "excellent" : this.latency < 100 ? "good" : "poor",
    }
  }
}
