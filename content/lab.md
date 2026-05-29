---
title: ReFLEX Lab
authorbox: false
sidebar: false
menu: main
weight: 5
toc: false
---

# ReFLEX Lab

![](/img/reflex-lab-logo.jpg)

---

<blockquote style="font-size: 1.5em;">
"Cyber-physical systems, such as autonomous robots and self-driving cars, are becoming integral to modern society, with profound economic and societal implications. Our lab envisions leading the advancement of real-time scheduling and assurance techniques that enable safe, reliable, and adaptive robotics and autonomous systems."  <br>
<footer style="font-size: 0.8em;"> — Dr. Steven Xiaotian Dai, Director of ReFLEX lab</footer>
</blockquote>

---

## Introduction
At Real-Time and Flexible Cyber-Physical Systems (ReFLEX) Lab, we focus on advancing real-time and embedded systems across topics like scheduling on many-core architectures, harnessing digital twins for performance gains, ensuring reliable timing in robotics and AI, verifying long-lived cyber-physical systems, and innovating hardware for real-time and IoT solutions. Typical target systems of the lab include autonomous driving, avionic and aerospace control systems, robotic warehouse, virtual production and transportation. By blending theory and practice, we aim to push the boundaries of computing and deliver safer, more efficient technologies that can serve both industry and society.

Our lab leverages digital twin technology to build real-time virtual replicas of embedded and cyber-physical systems, enabling runtime monitoring, scheduling optimisation, and verification of timing properties. We also develop novel scheduling algorithms and resource allocation strategies for safety-critical platforms, from multi-core processors and networks-on-chip to multi-robot systems and autonomous vehicles.

---

## Our Research

### ➤ Multi-core and mixed-criticality task scheduling and allocation

Scaling real-time guarantees across many-core architectures is a fundamental challenge for next-generation cyber-physical systems. We develop scalable scheduling and allocation frameworks for complex CPS — including 5G/6G base stations and industrial control systems — combining statistical modelling, adaptive policies, and digital-twin-based feedback to manage task dependencies and timing constraints at scale.

For safety-critical avionics, we address the harder problem of mixed-criticality scheduling, where safety-critical and lower-criticality tasks share the same hardware platform. Our SCHEME project develops timing assurance methods for UK-native aerospace microprocessors, targeting task isolation, predictable execution, and next-generation certification requirements.

**Related Projects:**
- SCHEME: Safety Critical Harsh Environment Micro-processing Evolution
- MOCHA: Modelling and Optimising Complex Heterogenous Architectures [[link]](https://www.cs.york.ac.uk/rts/mocha/)



### ➤ Timing assurance of robotics and autonomous systems

Autonomous driving and control platforms must simultaneously satisfy hard real-time deadlines for sensor processing, decision-making, and V2X communication — on shared, resource-constrained hardware. We develop scheduling and resource allocation techniques that provide timing guarantees under multi-core contention, cache interference, and network latency. We also develop criticality-aware multi-robot scheduling frameworks that integrate real-time sensor data to adapt task allocation on the fly, maintaining safety guarantees under operational uncertainty in manufacturing and warehouse environments.

**Related Projects:**
- ATAS: Adaptive Task Scheduling Framework for Cyber-Physical Systems
- Safety-Driven Timing-Predictable and Resource-Efficient Scheduling for Autonomous Systems



### ➤ Digital twins and simulation for robotics and AI

We develop real-time digital twin infrastructure across two complementary domains. Through the DDTwins framework, we address the core industrial challenge — maintaining temporal fidelity between physical and virtual entities under resource constraints — with applications in smart manufacturing and energy systems. Through the RAVEN project and our XR Stories residency, we apply these capabilities to virtual production, building virtual replicas of physical film and television sets coupled with robotic camera platforms for real-time previsualization and autonomous cinematography.

We also investigate differentiable simulation as a tool for training and validating robotic manipulation of deformable objects, where physical modelling accuracy directly impacts real-world performance.

**Related Projects:**
- RAVEN: Real-time Adaptive Virtual-Twin Environment for Next-Generation Robotics in Virtual Production [[link]](https://raven-vp.github.io/)
- DDTwins: An Industrial Digital Twin Framework
- Differentiable Simulators for robotic manipulation of deformable objects

---

## Our Research Team
### Lab PI
- [Dr. Steven Xiaotian Dai](https://www.xiaotiandai.com), University of York, UK

### Research Fellows
- [Dr. Nan Chen](https://scholar.google.co.uk/citations?user=PIjEeDAAAAAJ&hl=en) (2023--2028), *Adaptive Task and Resource Scheduling in Avionics (SCHEME project)*

### PhD Students
- Modie Al Shakarchi (2025--2028), *Real-time Adaptive Digital Twin Robotics for Virtual Production (RAVEN project)*, co-supervisor: Dr. Pengcheng Liu
- Manal Abdelrahman (2023--2026), *An Industrial Digital Twin Framework (DDTwins project)*, co-supervisor: Suresh Perinpanayagam
- Ryan McKenna (2024--2029), *Differentiable Simulators for supporting robotic manipulation of deformable objects*, co-supervisor: Jihong Zhu

Past PhDs:
- [Dr. Jie Zou](https://scholar.google.co.uk/citations?user=unXFDCEAAAAJ&hl=en) (2019--2023), *Safety-Driven Timing-Predictable and Resource-Efficient Scheduling for Autonomous Systems*, co-supervisor: Prof. John McDermid → Research Fellow, University of York

### Academic Visitors
- [Haochun Liang](https://scholar.google.co.uk/citations?hl=en&user=MVZIQVAAAAAJ) (2025--2026), *Real-time containers for Mixed-Criticality Real-Time Systems*, Visiting PhD Student (CSC)

### UG Students
- [Charlie Piper](https://charliepiper.com) (2025/26), *Adaptive Decentralised Coordination Algorithms for Autonomous Robotic Swarms in Planetary Surface Missions* → work leads to a poster

Student interns:
- Jixiang Zhen (2026--), *Digital Twin for Humanoid Robots in Virtual Production*
- Ollie Collett (2026--), *Digital Twin for Humanoid Robots in Virtual Production*

Past students:
- Huzaifa Thakur (2025/26), *Imitation Learning for Humanoid Robot Training*
- Luke Tissiman (2025/26), *Criticality-aware Scheduling and Path Planning for Fault-Tolerant Cooperative Multi-Robot Systems*
- Maciek Racis (2025/26), *People Detection for Autonomous Retail and Smart Refrigeration Systems*
- Wrijurekh Mukherjee (2025/26), *People Detection for Autonomous Retail and Smart Refrigeration Systems*
- Mikolaj Wyrzykowski (2025/26), *Imitation Learning for Humanoid Robot Training*
- Mohamed Eljak (2025/26), *Edge AI for Real-Time Anomaly Detection in Robotic Systems*
- Rosie Kern (2025/26), *Criticality-aware Scheduling and Path Planning for Fault-Tolerant Cooperative Multi-Robot Systems*
- Sam Knight (2025/26), *Embedded GPU Interference Analysis for Real-Time Robotics*
- Chase Mo (2024/25), *Traffic detection for deriving KPIs*
- Dom Decicco (2024/25), *Routerless Network-on-Chip optimization*
- James Sutton (2024/25), *Multi-robot scheduling for warehouses* → *work presented at TAROS'25*
- Phoebe Russell (2024/25), *Traffic control with back-pressure*
- Aron Hogarth (2024/25), *Gamification on High Education studying and learning of programming*
- Riko Puusepp (2024/25), *AR for accelerating learning of programming*
- Dean Kenny (2020/21), *Simulating and improving the scheduling in time-sensitive networks*

### MSc Students
- Zilun Zhang (2025/26), *Randomised DAG generator with AI based few-shot learning* → *work leads to a paper*

Past students:
- Xiyu Fang (2024/25), *Randomised DAG generator for evaluating scheduling performance*
- Zirui Yuan (2022/23), *Simulation and Optimization of Routerless Networks-on-Chips*
- Zhijian Wang (2020/21), *Priority Assignment Algorithms in Multiprocessor Real-Time Systems with Shared Resources*
- Zixun Yu (2020/21), *Smart Intersection Control with Back-Pressure Algorithms* (co-supervised)

### Lab Advisors
- [Prof. Iain Bate](https://www-users.york.ac.uk/~ijb500/) (CS HoD), University of York, UK
- [Prof. FREng. Alan Burns](https://www-users.york.ac.uk/~ab38/), University of York, UK
- [Prof. FREng. John McDermid](https://www.york.ac.uk/computer-science/about/news/50-years/hods/john-mcdermid/) (ISA Director), University of York, UK

---

## Open-Source Projects

Please check our GitHub: [ReFLEX-Lab-York](https://github.com/ReFLEX-Lab-York).

---
