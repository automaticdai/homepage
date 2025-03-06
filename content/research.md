---
title: Research
authorbox: false
sidebar: false
menu: main
weight: 2
toc: false
---

---

## Research Interests

My research is mainly in the domain of real-time embedded systems (RTES), cyber-physical systems (CPS) and autonomous systems (AS). The vision of my research is to work towards adaptive, safe and predictable engineering systems. My main research topics are:

- Real-time systems, including scheduling and allocation on single- and multi-cores, and hardware that is timing predictable;
- Flexible and feedback-based methods for task scheduling in CPS and AS;
- Control-scheduling co-design and design automation of CPS;
- Using Digital Twins for design, verification and optimization of RTES and CPS;
- Network scheduling, from network-on-chip to transportation traffic scheduling;
- Assuring timing and safety of robotic and autonomous systems.

![](/img/wordcloud.png)

*Collaborations:* I am working with academics and companies from UK, US, France, Germany, Portugal and China (mainland, Taiwan and HongKong), and I am open to collaborations related to these topics and fields, addressing open problems and grand challenges both from industry and academia, with a focus on timing and scheduling, and applications in real-time embedded systems, cyber-physical systems and autonomous systems.

---

## Research Projects
### ➤ SCHEME: Safety Critical Harsh Environment Micro-processing Evolution
*(2023 - 2027) Co-I, University of York*  
*Funded by Innovate UK, £2,270,617*

The next generation of aircraft, designed to meet net-zero targets, will require more complex, intelligent, autonomous, and connected systems, and at the heart of those software-enabled systems is the need for a cyber-secure, high-integrity processor.

Microprocessor design and manufacture is complex, and typically commercial off-the-shelf automotive and general-purpose microprocessors are repurposed for aerospace. That approach has issues of obsolescence, complexity and design trade-offs that have long-term cost implications. Recent experience in the automotive industry has also demonstrated how the supply chain for off-the-shelf components can be significantly and adversely affected by global events such as COVID.

Project SCHEME (Safety-Critical Harsh Environment Micro-processing Evolution) will develop a new generation of UK-native, safety critical and cyber-secure microprocessors. Developing a bespoke processor reduces design and through-life costs, ensures security of supply and provides protection from the global issues that face the semiconductor industry.

The project will initially develop a control processor suitable for high-integrity control and monitoring. A manufacturing and support solution will be developed that provides better obsolescence protection than is available from off-the-shelf devices. It will also provide an associated electronics, security and software tooling infrastructure to enable the UK to strengthen its position in high-integrity avionics design and manufacturing.

This project will build UK national resilience in this area and make the processor available not only to aerospace, but in other areas where systems operate in harsh environments. SCHEME will engage with the wider community to identify and pursue exploitation opportunities, including supporting potential adopters with microprocessor trials. The project will put the UK in a position to design and build the low-carbon, intelligent systems that will be critical to society in the future.

The project is partly funded by the UK government agencies, BEIS, ATI, and Innovate UK. Rolls-Royce is joined by TT Electronics, Volant Autonomy, Rapita Systems, Adacore, The Manufacturing Technology Centre, Queen's University Belfast, University of Bristol, University of Sheffield, and University of York.



### ➤ MOCHA: Modelling and Optimising Complex Heterogenous Architectures

*(2019 - 2022) RA, University of York*  
*Funded by Huawei Technologies Co. Ltd, £985,926*

The applications and resources (processors, networks and memory) for real-time systems are becoming ever more complex to understand, control and maintain. This has led to research into building statistical models of systems and adaptive policies based on these statistical models.

The key challenges that emerge are whether the models reflect how the system would behave during operation, how systems should deal with unexpected or rarely occurring scenarios, and then how to optimise systems based on the behaviours of the systems. It is specifically to address the high overheads of current systems and the low cache hit rates that are currently achieved.

![cpc-model](/img/cpc-model.png)

For more information: [\[Project Website\]](https://www.cs.york.ac.uk/rts/mocha/)



### ➤ DEIS: Dependability Engineering Innovation for CPS

*(2018 - 2019) RA, University of York*  
*Funded by EU Horizon 2020, £313,415*

Cyber-Physical-Systems (CPS) provide the potential for vast economic and societal impact in domains such as automotive, health care and home automation. The open and cooperative nature of CPS poses a significant new challenge in assuring dependability. The DEIS project addresses this important and unsolved challenge by developing technologies that enable a science of dependable system integration. Such technologies facilitate the efficient synthesis of components and systems based on their dependability information. The key innovation in the approach of the DEIS project is the concept of Digital Dependability Identity (DDI). A DDI contains all the information that uniquely describes the dependability characteristics of a CPS component. DDIs are used for the integration of components into systems during development as well as for the dynamic integration of systems into systems of systems in the field.

![ode](/img/ode.png)

For more information: [\[Project Website\]](http://www.deis-project.eu/) | [\[DDI Demo Video\]](https://www.youtube.com/watch?v=dlcUkhwhinw&ab_channel=DEISProject-EU)



### ➤ ATAS: Adaptive Task Scheduling Framework for CPS

*(2015 - 2018) PhD Student, University of York*

In a Cyber-Physical Control System (CPCS), there is often a hybrid of hard real-time tasks which have stringent timing requirements and soft real-time tasks that are computationally intensive. The task scheduling of such systems is challenging and requires flexible schemes that can meet the timing requirements without being over-conservative.

In this study, an adaptive real-time scheduling framework for CPCS is presented. The adaptive scheduler has a hierarchical structure and it is built on top of a traditional FPS scheduler. The idea of dynamic worst-case execution time is introduced and its cause and methods to identify the existence of a trend are discussed. An adaptation method that uses monitored statistical information to update control task periods is then introduced. Finally, this method is extended by proposing a dual-period model that can switch between multiple operational modes at run-time. The proposed framework can be potentially extended in many aspects and some of these are discussed in the future work. All proposals of this thesis are supported by extensive analysis and evaluations.

![ode](/img/atas.png)


---

## Research Grants
- Innovate UK, SCHEME - Safety Critical Harsh Environment Micro-processing Evolution, £2.2m, 05/2023-04/2027, Co-I
- ECR Funding, University of York, 6K, 09/2023-09/2026, PI

---

## Research Involvement
Research projects which I was (informally) involved:
- [AAIP: The Assuring Autonomy International Programme](https://www.york.ac.uk/assuring-autonomy/)
- [CyPhyAssure](https://www.cs.york.ac.uk/circus/CyPhyAssure/)
- [FiC: Future factories in the Cloud]((https://research.chalmers.se/en/project/7231))

---

## Industrial Collaborators
- [Rolls Royce](https://www.rolls-royce.com/)
- [Siemens](https://www.siemens.com/)
- [Huawei, Shanghai](https://www.huawei.com/)
- [Rapita Systems](https://www.rapitasystems.com/)
- [Adacore](https://www.adacore.com/)

---

## Open-Source Software
- [dag-gen-rnd: A Randomized Multi-DAG Task Generator for Scheduling and Allocation Research](https://github.com/automaticdai/dag-gen-rnd)
- [DAG Scheduling Simulator on Multiprocessor Systems](https://github.com/automaticdai/research-dag-scheduling-analysis)
- [Fixed Priority Scheduling and Controller Co-Design for TSN](https://github.com/automaticdai/research-sched-tsn)
- [Line-Circle-Square (LCS): A Multilayered Geometric Filter for Edge-Based Detection](https://github.com/automaticdai/LCS-filter)

Please check my [GitHub](https://www.github.com/automaticdai) for more projects.

---
