---
title: ATAS - Adaptive Task Scheduling Framework for CPS
authorbox: false
sidebar: false
_build:
  list: never
toc: false
---

# ATAS: Adaptive Task Scheduling Framework for CPS

*(2015 - 2018) PhD Student, University of York*

---

## Project Overview

In a Cyber-Physical Control System (CPCS), there is often a hybrid of hard real-time tasks which have stringent timing requirements and soft real-time tasks that are computationally intensive. The task scheduling of such systems is challenging and requires flexible schemes that can meet the timing requirements without being over-conservative.

In this study, an adaptive real-time scheduling framework for CPCS is presented. The adaptive scheduler has a hierarchical structure and it is built on top of a traditional FPS scheduler. The idea of dynamic worst-case execution time is introduced and its cause and methods to identify the existence of a trend are discussed. An adaptation method that uses monitored statistical information to update control task periods is then introduced. Finally, this method is extended by proposing a dual-period model that can switch between multiple operational modes at run-time. The proposed framework can be potentially extended in many aspects and some of these are discussed in the future work. All proposals of this thesis are supported by extensive analysis and evaluations.

![atas](/img/atas.png)

## Key Contributions

### 1. Hierarchical Adaptive Scheduler
- Built on top of traditional Fixed Priority Scheduling (FPS)
- Provides flexibility while maintaining timing guarantees
- Enables adaptation to changing system conditions

### 2. Dynamic Worst-Case Execution Time (WCET)
- Introduces the concept of dynamic WCET analysis
- Provides methods to identify WCET trends
- Enables more accurate timing predictions

### 3. Statistical Adaptation Method
- Uses monitored statistical information
- Updates control task periods based on runtime data
- Improves system efficiency and responsiveness

### 4. Dual-Period Model
- Enables switching between multiple operational modes
- Provides runtime flexibility for different scenarios
- Maintains timing guarantees across mode switches

## Research Challenges Addressed

1. **Mixed Criticality**: Handling both hard and soft real-time tasks
2. **Timing Requirements**: Meeting stringent timing constraints
3. **Flexibility**: Avoiding over-conservative scheduling approaches
4. **Adaptation**: Responding to changing system conditions
5. **Efficiency**: Optimizing resource utilization

## Framework Architecture

The ATAS framework consists of:

- **Hierarchical Structure**: Multi-level scheduling approach
- **FPS Foundation**: Built on proven Fixed Priority Scheduling
- **Adaptation Layer**: Dynamic adjustment mechanisms
- **Statistical Monitoring**: Runtime data collection and analysis
- **Mode Switching**: Dual-period operational modes

## Research Impact

This PhD research has contributed to:
- **Flexible scheduling** approaches for cyber-physical systems
- **Adaptive timing analysis** techniques
- **Statistical monitoring** methods for real-time systems
- **Dual-period models** for operational mode switching

## Publications and Outcomes

The research has resulted in several publications and has influenced subsequent work in:
- Period adaptation of real-time control tasks
- Dual-mode strategies for CPS design
- Flexible and adaptive scheduling frameworks

---

## Related Research

This project contributes to our research focus on:
- Large scale allocation and scheduling for cyber-physical systems
- Flexible, feedback-driven approaches to resource scheduling
- Timing assurance of mixed-criticality systems

---

[← Back to Research](../research)
