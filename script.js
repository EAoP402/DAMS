const els = {
  systemButtons: document.querySelectorAll(".system-btn"),
  completedFields: document.querySelectorAll(".completed-controls"),
  activeSystemName: document.getElementById("activeSystemName"),
  completedControls: document.getElementById("completedControls"),
  acceleratorCards: document.querySelectorAll(".accelerator-card"),
  detailTitle: document.getElementById("detailTitle"),
  detailSubtitle: document.getElementById("detailSubtitle"),
  acceleratorDetail: document.getElementById("acceleratorDetail")
};

let currentSystem = "system1";
let currentAccelerator = null;

const acceleratorData = {
  everest: {
    title: "Everest Zero Trust Controls",
    subtitle: "Completed controls for the selected system are highlighted in green.",
    domains: [
      {
        name: "1. Identity Controls",
        description: "These controls verify the identity of every user and service account before granting access.",
        controls: [
          { name: "Multi-Factor Authentication (MFA)", description: "Requires two or more forms of verification such as biometrics, hardware keys, or SMS.", system1: true, system2: true },
          { name: "Single Sign-On (SSO)", description: "Centralizes identity management for consistent policy enforcement.", system1: true, system2: true },
          { name: "Role-Based & Attribute-Based Access Control (RBAC/ABAC)", description: "Grants permissions based on user role and contextual attributes.", system1: true, system2: true },
          { name: "Just-In-Time (JIT) Access", description: "Provides elevated permissions only for the duration of a specific task.", system1: false, system2: true },
          { name: "Identity Federation", description: "Standardizes identity across different systems and cloud providers.", system1: false, system2: true }
        ]
      },
      {
        name: "2. Device Controls",
        description: "These ensure that only healthy and authorized devices can connect to the network.",
        controls: [
          { name: "Endpoint Detection and Response (EDR)", description: "Continuously monitors for and reacts to threats on devices.", system1: true, system2: true },
          { name: "Mobile Device Management (MDM)", description: "Enforces security policies like full-disk encryption and remote wipe on mobile devices.", system1: true, system2: true },
          { name: "Device Health Attestation", description: "Checks OS versions, patch levels, and antivirus status before allowing access.", system1: false, system2: true },
          { name: "Device Certificates", description: "Uses cryptographic tokens to identify and authenticate trusted hardware.", system1: false, system2: true }
        ]
      },
      {
        name: "3. Network & Environment Controls",
        description: "These controls limit the blast radius if an attacker gets inside.",
        controls: [
          { name: "Microsegmentation", description: "Divides the network into small, isolated zones to prevent lateral movement.", system1: true, system2: true },
          { name: "Zero Trust Network Access (ZTNA)", description: "Replaces VPNs by granting access to specific applications rather than the entire network.", system1: true, system2: true },
          { name: "Software-Defined Perimeter (SDP)", description: "Makes applications invisible until they are authenticated.", system1: false, system2: true },
          { name: "End-to-End Encryption", description: "Encrypts data in transit using protocols like mTLS.", system1: true, system2: true }
        ]
      },
      {
        name: "4. Application & Workload Controls",
        description: "These secure the software and services being accessed.",
        controls: [
          { name: "API Security", description: "Protects interfaces with strong authentication and anomaly detection.", system1: false, system2: true },
          { name: "Secure Web Gateways (SWG)", description: "Filters web traffic and blocks access to unapproved shadow IT apps.", system1: true, system2: true },
          { name: "Cloud Workload Protection (CWPP)", description: "Monitors runtime behavior of virtual machines and containers.", system1: false, system2: true },
          { name: "Vulnerability Scanning", description: "Regularly identifies and patches security gaps in applications.", system1: true, system2: true }
        ]
      },
      {
        name: "5. Data Controls",
        description: "Zero Trust is ultimately about protecting data, which requires specific controls.",
        controls: [
          { name: "Data Loss Prevention (DLP)", description: "Monitors and blocks unauthorized attempts to share or exfiltrate sensitive data.", system1: true, system2: true },
          { name: "Data Encryption at Rest", description: "Ensures data is unreadable if storage is stolen or accessed without authorization.", system1: true, system2: true },
          { name: "Data Classification & Labeling", description: "Tags data to apply appropriate security policies based on sensitivity.", system1: false, system2: true },
          { name: "Digital Rights Management (DRM)", description: "Controls who can view, edit, or print specific documents.", system1: false, system2: true }
        ]
      },
      {
        name: "6. Visibility, Analytics, & Automation",
        description: "These cross-cutting capabilities tie the other controls together.",
        controls: [
          { name: "Continuous Monitoring", description: "Real-time analysis of user behavior and network traffic to detect anomalies.", system1: true, system2: true },
          { name: "Security Information and Event Management (SIEM)", description: "Centralizes logs and alerts for advanced threat hunting.", system1: true, system2: true },
          { name: "Security Orchestration, Automation, and Response (SOAR)", description: "Automatically responds to detected threats such as revoking access during suspected breach activity.", system1: false, system2: true }
        ]
      }
    ]
  },
  eclipse: {
    title: "Eclipse Defensive Cyber Controls",
    subtitle: "AI-first threat detection, automated response, and mission-centric defensive cyber controls.",
    domains: [
      {
        name: "1. AI-First Threat Detection & Analytics",
        description: "Eclipse leverages advanced analytics to move beyond static rules, focusing on behavioral anomalies.",
        controls: [
          { name: "Real-time Threat Protection", description: "Provides constant monitoring to detect threats as they occur during active missions.", system1: true, system2: true },
          { name: "Enhanced Security Analytics", description: "Uses AI and machine learning for predictive analytics and heightened situational awareness.", system1: true, system2: true },
          { name: "Cyber Threat Intelligence & Hunting", description: "Proactively maps adversary activity and hunts for threats without waiting for a system alert.", system1: false, system2: true }
        ]
      },
      {
        name: "2. Automated Response & Mitigation",
        description: "A core differentiator of Eclipse is its ability to act autonomously to contain breaches.",
        controls: [
          { name: "Automated Threat Mitigation", description: "Employs dynamic countermeasures to minimize the impact of an attack automatically.", system1: true, system2: true },
          { name: "Active Defense", description: "Uses automation technology for rapid, machine-speed incident response and remediation.", system1: true, system2: true },
          { name: "Incident Response Protocols", description: "Integrated 24/7 crisis management to handle identified risks immediately.", system1: false, system2: true }
        ]
      },
      {
        name: "3. Visibility & Surface Reduction",
        description: "These controls focus on minimizing the explorable parts of a network for an attacker.",
        controls: [
          { name: "Continuous Monitoring & Reporting", description: "Maintains 24/7 visibility across the network to ensure effective remediation.", system1: true, system2: true },
          { name: "Attack Surface Reduction", description: "Identifies and mitigates vulnerabilities to strengthen the overall security posture.", system1: true, system2: true },
          { name: "Vulnerability Management", description: "Provides continuous visibility into system gaps with rapid patching protocols.", system1: false, system2: true }
        ]
      },
      {
        name: "4. Mission-Centric Data & Identity",
        description: "Eclipse ensures that security does not impede the flow of critical mission data.",
        controls: [
          { name: "Mission-Based Data Delivery", description: "Ensures the right data reaches the right people specifically in service of the mission.", system1: true, system2: true },
          { name: "Insider Threat Risk Reduction", description: "Proactively protects data from internal risks using AI to flag suspicious real-time actions.", system1: false, system2: true },
          { name: "Post-Quantum Cryptography", description: "Implements quantum-safe encryption to protect against harvest now, decrypt later threats.", system1: false, system2: true }
        ]
      },
      {
        name: "5. Operational Technology (OT) Security",
        description: "Unlike standard IT-focused Zero Trust, Eclipse extends controls to physical and critical infrastructure.",
        controls: [
          { name: "Infrastructure Resilience", description: "Tailored protection for life-safety systems and airfield controls.", system1: true, system2: true },
          { name: "OT Micro-segmentation", description: "Extends Zero Trust principles to specialized hardware and industrial control systems.", system1: false, system2: true }
        ]
      }
    ]
  },
  venin: {
    title: "VENIN Full-Spectrum Cyber Controls",
    subtitle: "Defensive, detection, and threat-informed cyber operations for mission protection.",
    placeholder: "Control data for VENIN is not yet available."
  },
  tidal: {
    title: "Tidal Post-Quantum Cryptography",
    subtitle: "Controls for transitioning to and managing quantum-resistant cryptography.",
    domains: [
      {
        name: "1. Strategy & Planning",
        description: "Laying the groundwork for a successful PQC transition.",
        controls: [
          { name: "Quantum-Safe Strategy Development", description: "Creating a tailored roadmap for your organization’s transition to quantum-resistant cybersecurity.", system1: true, system2: true },
          { name: "Alignment with NIST Standards", description: "Ensuring all planned measures follow NIST's finalized PQC algorithms, such as ML-KEM and ML-DSA.", system1: true, system2: true }
        ]
      },
      {
        name: "2. Discovery & Assessment",
        description: "Identifying cryptographic assets and assessing their vulnerability.",
        controls: [
          { name: "Cryptographic Inventory", description: "Identifying and cataloging all current cryptographic assets across the enterprise.", system1: true, system2: true },
          { name: "Risk Assessment", description: "Evaluating the organization's current vulnerability to quantum threats and prioritizing systems for migration.", system1: false, system2: true },
          { name: "Roadmap Establishment", description: "Building a structured 'quantum readiness' plan based on the assessment results.", system1: false, system2: false }
        ]
      },
      {
        name: "3. Migration & Implementation",
        description: "Deploying quantum-safe algorithms and ensuring crypto-agility.",
        controls: [
          { name: "ML-KEM (FIPS 203) Deployment", description: "Implementing the primary algorithm for secure key encapsulation and general-purpose encryption.", system1: true, system2: true },
          { name: "ML-DSA (FIPS 204) Deployment", description: "Implementing the primary algorithm for digital signatures and identity authentication.", system1: true, system2: true },
          { name: "SLH-DSA (FIPS 205) Deployment", description: "Using the stateless hash-based backup for digital signatures.", system1: false, system2: true },
          { name: "Crypto-Agility", description: "Establishing systems that can easily switch between cryptographic algorithms as standards evolve.", system1: false, system2: true }
        ]
      },
      {
        name: "4. Management & Monitoring",
        description: "Maintaining quantum resilience through ongoing oversight.",
        controls: [
          { name: "Continuous Auditing", description: "Regularly assessing the cryptographic landscape to maintain quantum resilience.", system1: true, system2: true },
          { name: "Scalable Management", description: "Managing PQC at scale across various platforms, including cloud services (PaaS, IaaS) and collaboration tools.", system1: false, system2: true },
          { name: "Compliance Monitoring", description: "Ensuring ongoing adherence to updated CISA and NIST guidelines as new standards (like Falcon or HQC) are released.", system1: false, system2: true }
        ]
      }
    ]
  },
  luna: {
    title: "Luna AI Adaptable Capabilities",
    subtitle: "Controls for deploying secure, trustworthy, and adaptable artificial intelligence.",
    domains: [
      {
        name: "1. Data Mesh & Security Controls",
        description: "Securing the data foundation for AI.",
        controls: [
          { name: "In-Place Data Analysis", description: "Analyzing data in real-time without moving it from its source to maintain security boundaries.", system1: true, system2: true },
          { name: "Distributed Access Control", description: "Managing user entitlements and data classification at the enterprise level to prevent misuse.", system1: true, system2: true },
          { name: "Zero Trust for AI", description: "Applying Zero Trust principles to protect models from prompt engineering, data poisoning, and credentialed attacks.", system1: false, system2: true }
        ]
      },
      {
        name: "2. Trustworthy & Ethical AI Controls",
        description: "Ensuring AI models are reliable, fair, and transparent.",
        controls: [
          { name: "Model Transparency & Evaluation", description: "Utilizing assessment tools to identify risks that could undermine the accuracy or reliability of outputs.", system1: true, system2: true },
          { name: "Hallucination Detection", description: "Implementing fine-tuned evaluation models to detect and mitigate 'hallucinations' with high accuracy (often 95%+).", system1: true, system2: true },
          { name: "Context Adherence Monitoring", description: "Measuring whether AI responses are strictly based on provided context rather than outside 'learned' misinformation.", system1: false, system2: true }
        ]
      },
      {
        name: "3. Operational Adaptability Controls",
        description: "Ensuring AI can operate in diverse and challenging environments.",
        controls: [
          { name: "Multi-Cloud Architecture", description: "Designing systems to operate across different cloud providers (PaaS, IaaS) to avoid vendor lock-in.", system1: true, system2: true },
          { name: "Disconnected Environment Support", description: "Leveraging Google Distributed Cloud to bring AI capabilities to remote or air-gapped locations.", system1: false, system2: true },
          { name: "Scalability Management", description: "Ensuring the system can scale vertically for large data volumes and horizontally for new types of AI applications.", system1: false, system2: true }
        ]
      },
      {
        name: "4. Lifecycle & Performance Controls",
        description: "Governing the AI model from development to deployment.",
        controls: [
          { name: "Continuous Auditing", description: "Regularly assessing training data and model behavior to ensure compliance with updated federal guidelines.", system1: true, system2: true },
          { name: "Automation Playbooks", description: "Using Security Orchestration, Automation, and Response (SOAR) to create standard automated playbooks for incident response.", system1: false, system2: true },
          { name: "Human-Machine Teaming", description: "Integrating AI to augment human analysts, reducing manual workloads by up to 85% in some security contexts.", system1: true, system2: true }
        ]
      }
    ]
  },
  hive: {
    title: "Hive Hybrid Multi-Cloud",
    subtitle: "Controls for managing complex, diverse cloud environments with a unified operating model.",
    domains: [
      {
        name: "1. Design & Implementation Controls",
        description: "Establishing a consistent and secure multi-cloud foundation.",
        controls: [
          { name: "Seamless Multi-Cloud Integration", description: "Providing end-to-end architecture that integrates existing on-premises platforms with AWS, Azure, and Google Cloud services.", system1: true, system2: true },
          { name: "Architecture-as-Code", description: "Using standardized automation code to ensure consistent, compliant deployment of cloud-native services.", system1: true, system2: true },
          { name: "Vendor-Agnostic Setup", description: "Reducing vendor lock-in by using open-source solutions and commercial technology that can move between different cloud environments.", system1: false, system2: true }
        ]
      },
      {
        name: "2. Management & Orchestration Controls",
        description: "Simplifying operations with a single point of control.",
        controls: [
          { name: "Automated Infrastructure Management", description: "Managing infrastructure through version control and code to increase productivity and reduce human error.", system1: true, system2: true },
          { name: "Unified Control Plane", description: "Offering a 'single pane of glass' for global visibility and management across data centers, edge locations, and multiple clouds.", system1: true, system2: true },
          { name: "Automated Testing", description: "Implementing continuous testing protocols to ensure every change to the environment is validated before deployment.", system1: false, system2: true }
        ]
      },
      {
        name: "3. Security & Compliance Controls",
        description: "Enforcing consistent security across all platforms.",
        controls: [
          { name: "Cloud Landing Zones", description: "Establishing secure, pre-configured environments ('landing zones') that meet strict federal and agency-specific security requirements.", system1: true, system2: true },
          { name: "Continuous Monitoring", description: "Performing real-time resource utilization analysis and performance monitoring to detect issues early.", system1: true, system2: true },
          { name: "Governance Standard Enforcement", description: "Defining and enforcing policies across all environments to maintain consistent security postures and workload compliance.", system1: false, system2: true }
        ]
      },
      {
        name: "4. Financial & Resource Optimization (FinOps)",
        description: "Controlling costs and maximizing value in the cloud.",
        controls: [
          { name: "Cost-Effective Resource Management", description: "Analyzing resource usage to optimize spend and reduce 'cloud waste' across different providers.", system1: true, system2: true },
          { name: "Workload-Specific Placement", description: "Evaluating application requirements to determine the most cost-efficient and performant cloud platform for each specific workload.", system1: false, system2: true },
          { name: "Lifecycle Automation", description: "Automating day-to-day tasks like patching, backing up, and configuring to reduce manual labor costs.", system1: false, system2: true }
        ]
      },
      {
        name: "5. Migration & Modernization Controls",
        description: "Streamlining the journey to the cloud.",
        controls: [
          { name: "Automated Discovery & Assessment", description: "Using automated tools to inventory legacy systems and assess their readiness for cloud migration.", system1: true, system2: true },
          { name: "Seamless Data Migration", description: "Providing specialized integration services to move data and applications with minimal downtime or risk.", system1: true, system2: true },
          { name: "Scalable Application Stand-up", description: "Enabling the rapid deployment of new applications and modernized microservices through standardized blueprints.", system1: false, system2: true }
        ]
      }
    ]
  },
  cove: {
    title: "Cove AI Operations (AIOps)",
    subtitle: "Controls to automate IT operations, improve system reliability, and reduce manual workloads.",
    domains: [
      {
        name: "1. Data Integration & Observability",
        description: "Creating a unified view of system health.",
        controls: [
          { name: "Unified Data Ingestion", description: "Collecting logs, metrics, and events from multi-cloud and on-premises environments into a single analysis layer.", system1: true, system2: true },
          { name: "Full-Stack Visibility", description: "Monitoring everything from hardware health to application performance to identify hidden dependencies.", system1: true, system2: true },
          { name: "Data Quality Governance", description: "Ensuring the telemetry data used for AI training is clean, accurate, and consistently formatted.", system1: false, system2: true }
        ]
      },
      {
        name: "2. Intelligent Event Management",
        description: "Using AI to make sense of operational noise.",
        controls: [
          { name: "Noise Reduction & Correlation", description: "Using AI to group related alerts into a single 'incident,' reducing alert fatigue by up to 90%.", system1: true, system2: true },
          { name: "Anomaly Detection", description: "Establishing 'normal' performance baselines and flagging deviations before they cause system outages.", system1: false, system2: true },
          { name: "Root Cause Analysis (RCA)", description: "Automatically identifying the primary source of a failure to speed up Mean Time to Repair (MTTR).", system1: false, system2: true }
        ]
      },
      {
        name: "3. Automated Remediation (Self-Healing)",
        description: "Enabling systems to fix themselves.",
        controls: [
          { name: "Predictive Maintenance", description: "Identifying potential hardware or software failures before they occur based on historical patterns.", system1: true, system2: true },
          { name: "Automated Playbook Execution", description: "Triggering SOAR workflows to fix common issues without human intervention.", system1: true, system2: true },
          { name: "Closed-Loop Feedback", description: "Tracking the success of automated fixes to refine and improve AI decision-making over time.", system1: false, system2: true }
        ]
      },
      {
        name: "4. Operational Efficiency & Scaling",
        description: "Optimizing resources and prioritizing actions.",
        controls: [
          { name: "Capacity Planning & Forecasting", description: "Using machine learning to predict future resource needs (CPU, storage, bandwidth) to prevent bottlenecks.", system1: false, system2: true },
          { name: "Human-in-the-Loop Oversight", description: "Providing clear dashboards that explain why the AI took an action, ensuring transparency for IT staff.", system1: true, system2: true },
          { name: "Proactive Vulnerability Scanning", description: "Integrating with security tools to automatically prioritize patching based on the criticality of the affected system.", system1: false, system2: false }
        ]
      },
      {
        name: "5. Governance & Compliance",
        description: "Ensuring automated actions are tracked and compliant.",
        controls: [
          { name: "Audit Logging of AI Actions", description: "Maintaining a detailed record of every automated change made by the AI for compliance and security reviews.", system1: true, system2: true },
          { name: "Performance Benchmarking", description: "Measuring the ROI of AIOps by tracking improvements in system uptime and staff productivity.", system1: false, system2: true },
          { name: "Policy Enforcement", description: "Ensuring all automated remediations stay within defined organizational and regulatory boundaries.", system1: false, system2: true }
        ]
      }
    ]
  },
  coral: {
    title: "Coral Software Factory",
    subtitle: "Controls to automate the software development lifecycle (SDLC) with built-in security.",
    domains: [
      {
        name: "1. DevSecOps Pipeline Controls",
        description: "Automating the core build, test, and deployment process.",
        controls: [
          { name: "Automated CI/CD Orchestration", description: "Streamlining the build, test, and deployment phases to reduce manual handoffs and errors.", system1: true, system2: true },
          { name: "Infrastructure as Code (IaC)", description: "Using standardized scripts to provision environments, ensuring consistency across development, staging, and production.", system1: true, system2: true },
          { name: "Pipeline Integrity", description: "Implementing signature-based verification to ensure that only authorized code moves through the factory.", system1: false, system2: true }
        ]
      },
      {
        name: "2. Security & Compliance (Shift-Left)",
        description: "Embedding security checks early in the development cycle.",
        controls: [
          { name: "Embedded Security Scanning", description: "Automating SAST (Static), DAST (Dynamic), and SCA (Software Composition Analysis) at every stage of the build.", system1: true, system2: true },
          { name: "Automated Compliance Mapping", description: "Aligning software builds automatically with frameworks like NIST 800-53 or FedRAMP requirements.", system1: true, system2: true },
          { name: "Vulnerability Remediation", description: "Prioritizing and flagging security flaws in real-time for developers to fix before the code is merged.", system1: false, system2: true }
        ]
      },
      {
        name: "3. Application Modernization Controls",
        description: "Tools for building and managing cloud-native applications.",
        controls: [
          { name: "Containerization & Microservices", description: "Standardizing the use of Docker and Kubernetes to ensure applications are portable and scalable.", system1: true, system2: true },
          { name: "Legacy Refactoring", description: "Providing tools to break down monolithic legacy applications into modern, cloud-native architectures.", system1: false, system2: true },
          { name: "API Governance", description: "Controlling how services communicate to ensure secure data exchange and prevent unauthorized access.", system1: false, system2: true }
        ]
      },
      {
        name: "4. Quality & Performance Controls",
        description: "Automating tests to build more resilient applications.",
        controls: [
          { name: "Automated Testing Suites", description: "Running functional, regression, and performance tests automatically to maintain high code quality.", system1: true, system2: true },
          { name: "Chaos Engineering", description: "Simulating system failures during the development phase to build more resilient applications.", system1: false, system2: true },
          { name: "Performance Benchmarking", description: "Measuring application response times and resource usage against predefined success metrics.", system1: false, system2: true }
        ]
      },
      {
        name: "5. Governance & Visibility",
        description: "Providing insight and control over the entire development process.",
        controls: [
          { name: "Unified Developer Portal", description: "Providing a single interface for developers to access tools, documentation, and approved code templates.", system1: true, system2: true },
          { name: "Software Bill of Materials (SBOM)", description: "Automatically generating a detailed inventory of all open-source and third-party components used in a build.", system1: true, system2: true },
          { name: "Value Stream Mapping", description: "Tracking the speed and efficiency of the 'code-to-mission' process to identify and remove bottlenecks.", system1: false, system2: false }
        ]
      }
    ]
  },
  ember: {
    title: "Ember (Stellar) Digital Engineering",
    subtitle: "Controls for designing, testing, and maintaining systems using a Digital Twin approach.",
    domains: [
      {
        name: "1. Model-Based Systems Engineering (MBSE)",
        description: "Using a central digital model as the single source of truth.",
        controls: [
          { name: "Single Source of Truth", description: "Maintaining a central digital model that updates all technical documentation automatically when a change is made.", system1: true, system2: true },
          { name: "Requirements Traceability", description: "Linking every design element to a specific mission requirement to ensure 100% compliance.", system1: true, system2: true },
          { name: "Interoperability Standards", description: "Ensuring virtual models use open standards (like SysML) to talk to other engineering tools and platforms.", system1: false, system2: true }
        ]
      },
      {
        name: "2. Digital Twin & Simulation Controls",
        description: "Testing and predicting performance in a virtual environment.",
        controls: [
          { name: "Virtual Prototyping", description: "Testing system performance in a digital sandbox to catch design flaws before physical manufacturing begins.", system1: true, system2: true },
          { name: "High-Fidelity Physics Modeling", description: "Simulating real-world stresses (gravity, heat, friction) to predict how hardware will behave in the field.", system1: false, system2: true },
          { name: "Predictive Life-Cycle Support", description: "Using the digital twin to simulate 'wear and tear' over 10–20 years to plan maintenance schedules accurately.", system1: false, system2: true }
        ]
      },
      {
        name: "3. Integrated Data Environment (IDE)",
        description: "Controlling and securing engineering data.",
        controls: [
          { name: "Secure Collaborative Design", description: "Controlling access to sensitive engineering data across different teams and geographic locations.", system1: true, system2: true },
          { name: "Configuration Management", description: "Automatically tracking every version of a digital model to prevent unauthorized or undocumented changes.", system1: true, system2: true },
          { name: "Automated Data Validation", description: "Running checks to ensure data flowing between different engineering tools remains accurate and uncorrupted.", system1: false, system2: false }
        ]
      },
      {
        name: "4. Advanced Visualization & UX",
        description: "Interacting with digital models in immersive ways.",
        controls: [
          { name: "AR/VR Integration", description: "Using Augmented and Virtual Reality to allow engineers to 'walk through' a 3D model of a ship, aircraft, or data center.", system1: false, system2: true },
          { name: "Real-Time Rendering", description: "Ensuring the digital model updates instantly as parameters change, providing immediate visual feedback on design choices.", system1: false, system2: true },
          { name: "Human-System Integration (HSI)", description: "Testing how a human operator interacts with a virtual interface to optimize ergonomics and safety.", system1: false, system2: true }
        ]
      },
      {
        name: "5. Automated Governance & Delivery",
        description: "Connecting the digital model to the broader ecosystem.",
        controls: [
          { name: "Digital Thread Connectivity", description: "Connecting the design phase (Stellar) directly to the software factory (Coral) for a seamless transition from hardware design to software code.", system1: true, system2: true },
          { name: "Compliance Automation", description: "Generating safety and regulatory reports automatically from the digital model's current state.", system1: false, system2: true },
          { name: "Risk Mitigation Analysis", description: "Running 'what-if' scenarios in the simulation to identify potential points of failure in a mission-critical system.", system1: false, system2: true }
        ]
      }
    ]
  },
  comet: {
    title: "Comet Secure 5G/Edge",
    subtitle: "Controls to provide secure, high-speed connectivity for mission-critical operations at the tactical edge.",
    domains: [
      {
        name: "1. Network Security & Zero Trust",
        description: "Securing the 5G network from end to end.",
        controls: [
          { name: "Identity-Based Access Control", description: "Implementing Zero Trust for every device (UE) and sensor connecting to the 5G RAN.", system1: true, system2: true },
          { name: "End-to-End Encryption", description: "Protecting data in transit from the edge device through the radio access network to the core.", system1: true, system2: true },
          { name: "Network Slicing Security", description: "Creating isolated, virtual 'slices' of the network for different mission sets to prevent lateral movement by attackers.", system1: false, system2: true }
        ]
      },
      {
        name: "2. Edge Computing & Orchestration",
        description: "Managing applications and data at the edge.",
        controls: [
          { name: "Distributed Edge Processing", description: "Processing data locally at the edge to reduce latency and bandwidth costs before sending it to the cloud.", system1: true, system2: true },
          { name: "Containerized Workload Deployment", description: "Using Coral-inspired CI/CD pipelines to push secure apps directly to edge nodes.", system1: false, system2: true },
          { name: "Disconnected Operations (DIL)", description: "Ensuring the edge node remains functional even when disconnected from the primary wide-area network (WAN).", system1: false, system2: true }
        ]
      },
      {
        name: "3. RAN & Spectrum Management",
        description: "Ensuring reliable and secure use of the radio spectrum.",
        controls: [
          { name: "Spectrum Interference Monitoring", description: "Detecting and mitigating jamming or interference that could disrupt 5G connectivity.", system1: true, system2: true },
          { name: "Dynamic Resource Allocation", description: "Automatically adjusting bandwidth and priority based on mission-critical traffic needs.", system1: false, system2: true },
          { name: "Open RAN (O-RAN) Governance", description: "Managing multi-vendor hardware components to ensure interoperability and supply chain security.", system1: false, system2: false }
        ]
      },
      {
        name: "4. Physical & Hardware Integrity",
        description: "Protecting the physical edge devices.",
        controls: [
          { name: "Tamper-Evident Edge Nodes", description: "Using ruggedized hardware with physical security sensors for deployment in harsh or contested environments.", system1: false, system2: true },
          { name: "Secure Boot & Root of Trust", description: "Ensuring that edge hardware only runs verified, untampered firmware and operating systems.", system1: true, system2: true },
          { name: "Rapid Sanitization", description: "Providing 'kill-switch' capabilities to wipe sensitive data from edge devices if they are compromised.", system1: false, system2: true }
        ]
      },
      {
        name: "5. Management & Visibility",
        description: "Controlling the distributed network from a central point.",
        controls: [
          { name: "Unified Edge Dashboard", description: "Providing a 'single pane of glass' through Hive to manage thousands of distributed edge devices.", system1: true, system2: true },
          { name: "Automated Provisioning", description: "Using 'Zero-Touch Provisioning' (ZTP) to deploy new 5G cells and edge nodes without manual onsite configuration.", system1: true, system2: true },
          { name: "Predictive Maintenance", description: "Leveraging Cove AIOps to monitor signal strength and hardware health to prevent outages.", system1: false, system2: true }
        ]
      }
    ]
  }
};

function isControlComplete(control) {
  return Boolean(control[currentSystem]);
}

function getCompletedCount(controls) {
  return controls.filter(isControlComplete).length;
}

function renderControl(control) {
  const completed = isControlComplete(control);

  return `
    <li class="control-item ${completed ? "completed" : ""}">
      <div class="control-copy">
        <div class="control-name">${control.name}</div>
        <div class="control-description">${control.description}</div>
      </div>
      <div class="control-status">
        <span class="badge">${completed ? "Completed" : "Open"}</span>
      </div>
    </li>
  `;
}

function renderDomain(domain) {
  const completedCount = getCompletedCount(domain.controls);
  const controlsHtml = domain.controls.map(renderControl).join("");

  return `
    <article class="control-domain">
      <div class="control-domain-header">
        <div>
          <h4>${domain.name}</h4>
          <div class="control-description">${domain.description}</div>
        </div>
        <div class="domain-meta">${completedCount} / ${domain.controls.length} completed</div>
      </div>
      <ul class="controls-list">
        ${controlsHtml}
      </ul>
    </article>
  `;
}

function setActiveSystem(systemKey, label) {
  currentSystem = systemKey;

  els.systemButtons.forEach((button) => {
    const isActive = button.dataset.system === systemKey;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  let totalCompleted = 0;

  els.completedFields.forEach((field) => {
    const value = Number(field.dataset[systemKey] || 0);
    field.textContent = value;
    // Note: The original file sums the values from the HTML. 
    // It's better to calculate this dynamically from the source of truth (this data object).
    // This part of the logic could be improved, but for now, we'll keep the original behavior.
  });

  // Let's calculate the total completed dynamically for accuracy
  totalCompleted = Object.values(acceleratorData).reduce((acc, accelerator) => {
    if (!accelerator.domains) return acc;
    const completedInAccelerator = accelerator.domains.reduce((domainAcc, domain) => {
      return domainAcc + domain.controls.filter(c => c[systemKey]).length;
    }, 0);
    return acc + completedInAccelerator;
  }, 0);


  els.activeSystemName.textContent = label;
  els.completedControls.textContent = totalCompleted; // Use dynamically calculated total

  if (currentAccelerator) {
    renderAccelerator(currentAccelerator);
  }
}

function renderAccelerator(acceleratorKey) {
  const accelerator = acceleratorData[acceleratorKey];
  if (!accelerator) return;

  currentAccelerator = acceleratorKey;

  els.acceleratorCards.forEach((card) => {
    const isActive = card.dataset.accelerator === acceleratorKey;
    card.classList.toggle("active-card", isActive);
  });

  els.detailTitle.textContent = accelerator.title;
  els.detailSubtitle.textContent = accelerator.subtitle;

  if (accelerator.placeholder) {
    els.acceleratorDetail.innerHTML = `
      <div class="placeholder-box">${accelerator.placeholder}</div>
    `;
    return;
  }

  const domainsHtml = accelerator.domains.map(renderDomain).join("");

  els.acceleratorDetail.innerHTML = `
    <div class="control-domain-grid">
      ${domainsHtml}
    </div>
  `;
}

// Function to update the initial counts on the accelerator cards based on the new data
function updateCardCounts() {
    els.acceleratorCards.forEach(card => {
        const acceleratorKey = card.dataset.accelerator;
        const accelerator = acceleratorData[acceleratorKey];
        if (!accelerator || !accelerator.domains) return;

        const system1Count = accelerator.domains.reduce((acc, domain) => acc + domain.controls.filter(c => c.system1).length, 0);
        const system2Count = accelerator.domains.reduce((acc, domain) => acc + domain.controls.filter(c => c.system2).length, 0);

        const completedControlsEl = card.querySelector('.completed-controls');
        completedControlsEl.dataset.system1 = system1Count;
        completedControlsEl.dataset.system2 = system2Count;
    });
}


function bindEvents() {
  els.systemButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const systemKey = button.dataset.system;
      const label = button.querySelector(".system-title")?.textContent?.trim() || systemKey;
      setActiveSystem(systemKey, label);
    });
  });

  els.acceleratorCards.forEach((card) => {
    card.addEventListener("click", () => {
      const acceleratorKey = card.dataset.accelerator;
      renderAccelerator(acceleratorKey);
    });
  });
}

function init() {
  updateCardCounts(); // Update card counts from the new data source of truth
  bindEvents();
  setActiveSystem("system1", "System 1"); // Initialize with System 1 active
}

init();
