---
title: Robotics Projects
authorbox: false
sidebar: false
weight: 6
toc: false
draft: false
---

Robotics is not only part of my research but also where my passion is --- I am a robot enthusiast and I have started building robots since 2009 (when I was a 2nd year undergraduate student). Below is a selection of my robotics projects that were built for research (or just as a hobbist).

---

## Line-Circle Square Filter (2020)

{{<tag-journal>}} Seyed Amir Tafrishi, Xiaotian Dai, and Vahid Esmaeilzadeh Kandjani. ["Line-Circle-Square (LCS): A multilayered geometric filter for edge-based detection"](https://arxiv.org/pdf/2008.09315). Robotics and Autonomous Systems (2020): 103732.
  
\[[Paper](https://arxiv.org/pdf/2008.09315)\] \[[Github](https://github.com/automaticdai/LCS-filter/)\]

The Line–Circle–Square (LCS) filter, claims that mobile robots without a large database for object recognition and highly advanced prediction methods can deal with incoming objects that the camera captures in real-time. The proposed filter applies detection, tracking and learning to each defined expert to extract higher level information for judging scenes without over-calculation. The interactive learning feed between each expert increases the consistency of detected landmarks that works against overwhelming detected features in crowded scenes. Our experts are dependent on trust factors’ covariance under the geometric definitions to ignore, emerge and compare detected landmarks. 

![LCS filter demo](/assets/lcs-filter-demo-2020.png)

▲ Demo of the LCS filter on an autonomous driving dataset

{{< youtube id="hh6B4aF7jDI" autoplay="false" >}}

▲ Video that introduces LCS-filter

---

## Omni Robot for SLAM (2018)

My next step is to build a robot for SLAM and Navigation! I decide to choose ROS as there are some ready-to-use packages, which I think would give me a boost. The main processor is a Raspberry Pi 3 and the low-level controller is a STM32 based control board. The LiDAR is a Slamtec RPLiDAR A1 which costs just about 100 pounds. The camera is a very fast 120 fps PS3 EYE, which is nice for machine vision purpose. I can't fit my Kinect onto this platform as I am not sure it has enough computation power, also converting power is an issue.

![Omni robot for SLAM](/assets/omni-robot-slam-2018.jpg)

▲ Picture of the robot platform. The robot has three omni wheels. On top layer there is a low-cost LiDAR (RPLiDAR-A1) produced by Slamtec. The middle layer contains a high framerate camera and a Raspberry Pi 3. On the bottom layer there is a low-level microcontroller and a motor driver.

{{< youtube id="CJTeLEGHMuI" autoplay="false" >}}

▲ Demo of the RPLiDAR-A1 and Hector Mapping (YouTube)


---

## Line-Circle Filter (2018)

{{<tag-conference>}} Seyed Amir Tafrishi, and Vahid E. Kandjani. ["Line-circle: A geometric filter for single camera edge-based object detection"](https://arxiv.org/pdf/1707.08095). 2017 5th RSI International Conference on Robotics and Mechatronics (ICRoM). IEEE, 2017.

\[[Paper](https://arxiv.org/pdf/1707.08095.pdf)\] \[[Github](https://github.com/automaticdai/LCS-filter/tree/lc-filter)\]

A geometric filter that is able to use machine learning technique as a definition of Trust factor with relation to geometric orientations and constraints. LC filter minimizes the data usage for detection or other applications like SLAM in which prevent the systems from critical over calculations during entrance to overwhelming landmarks. This filter is designed for edge-base detection or advance cameras like event-camera. As another outstanding property, due to two layer expert evaluations, LC filter simply can estimate the incoming objects to the camera with only reliance to vehicle IMU sensor.

![LC filter demo](/assets/lc-filter-lab-demo-2018.gif)

▲ Demo of the LC filter in lab environment


---

## Self-balance Two wheel Robot (2017)

A side project during the summer holiday. The hardware of this self-balance robot is off-the-shelf, which ease myself and make me focus on the software. The system is controlled by a STM32F103 Cortex-M3 microcontroller. The main sensor is a MPU6050 6-axis motion sensor. The attitude estimation is achieved by a complementary filter and a PI controller. As I don't have a model of the system, I can only manually tune the controller parameters, which is crucial to achieve satisfied stability.

![Self-balance robot front view](/assets/self-balance-robot-front-2017.jpg)

▲ Front view of the robot.

![Self-balance robot top view](/assets/self-balance-robot-top-2017.jpg)

▲ Top view of the robot.

---

## Visual Tracking with Arduino and OpenCV on a PC (2016)

![Visual tracking hardware](/assets/visual-tracking-hardware-2016.jpg)

▲ Picture of the visual tracking systems (right - version 1, left - version 2).

![CV object tracking](/assets/cv-object-tracking-2016.jpg)

▲ Vision tracking using a web camera

---

## YM4 FIRA Educational Robot (2015)

[[GitHub](https://github.com/automaticdai/arduino-ym4-robot-lib)]

This is a FIRA form factor robot that is designed for educational purpose. The platform is built by a friend's company: Embedded Dream Studio. I was involved in the Arduino library design and PID controller improvement.

![FIRA educational robot](/assets/fira-educational-robot-2015.jpg)

▲ The robot is only 10 cm * 10 cm * 10 cm. A pound coin is used for comparison of size.

![FIRA robot structure](/assets/fira-robot-structure-2015.jpg)

▲ The robot has a well designed structure. The robot is driven by two differential wheels with PCBs vertical placed on both sides. 4*AA batteries are used to power the platform. The robot has communication to a computer through a nRF24L01 wireless transceiver.

---

## Visual-Based Localization and Tracking of a UGV with a Quadcopter (2014)

{{<tag-thesis>}} Xiaotian Dai. *Visual-Based Localization and Tracking of a UGV with a Quadcopter*. Master Thesis. University of Sheffield. 2014.

{{< youtube id="cwX-hAz2w6M" autoplay="false" >}}

▲ Demo video on YouTube

![UGV quadcopter system diagram](/assets/ugv-quadcopter-system-2014.jpg)

▲ System Diagram

![UGV quadcopter ROS nodes](/assets/ugv-quadcopter-ros-nodes-2014.jpg)

▲ ROS Nodes

![UGV hardware](/assets/ugv-hardware-2014.jpg)

▲ UGV Hardware

![UGV system diagram](/assets/ugv-system-diagram-2014.jpg)

▲ UGV System Diagram

![UGV trajectory in MATLAB](/assets/ugv-trajectory-matlab-2014.jpg)

▲ Trajectory and Control Performance plotted in MATLAB

---

## High maneuverability robot for search and rescue (2014)

This robot won the 2nd prize of ACSE Search and Rescue Competition, University of Sheffield, 2014

{{< youtube id="aMIof2MX1oU" autoplay="false" >}}

▲ Recorded video of the competition

![Search and rescue robot](/assets/search-rescue-robot-2014.jpg)

▲ Picture of the robot platform. Raspberry Pi is used as the main controller and an Arduino-based low-level controller is used to control motors.

---

## Closed-loop Helicopter Control with Matlab and LabVIEW (2014)

This is a course project when I was at the University of Sheffield. A closed-loop controller for a model helicopter need to be firstly developed in MATLAB/Simulink. To simulate the controller with hardware-in-the-loop, NI LabVIEW is used which uses the same control structure and parameters from previous simulation. A Data Acquisition device, myDAQ, is used as an interface to connect LabVIEW to the helicopter hardware. The objective is to model and stabilise the helicopter in real-time subject to external disturbances.

![Helicopter control system](/assets/helicopter-control-2014.jpg)

▲ A Picture of the helicopter stablising system

---

## Autonomous Mobile Robot for Object Avoidance and Environment Sensing (2010)

{{<tag-thesis>}} Xiaotian Dai. "Linux-based Autonomous Mobile Robot for Wireless Environment Sensing". Undergraduate Thesis. 2010.
	
![Ultrasonic sensor array](/assets/ultrasonic-sensor-array-2010.png)

▲ 180° Rotatable Ultrasonic Sensor Array

![Autonomous robot top view](/assets/autonomous-robot-top-2010.jpg)

▲ Top view of the robot. The main chasis is COTS and all others are self-made.

![Autonomous robot CAD design](/assets/autonomous-robot-cad-2010.jpg)

▲ Mechanical design of the robot (CAD using Solidworks)

![Motor driver PCB](/assets/motor-driver-pcb-2010.jpg)

▲ PCB - Dual Channel High Current DC Motor Driver (made from sketch)

![ATmega128 controller PCB](/assets/atmega128-controller-pcb-2010.jpg)

▲ PCB - ATmega128 Robot Controller (made from sketch)

---

## IEEE MicroMouse Maze Competition (2009)

![MicroMouse maze robot](/assets/micromouse-maze-robot-2009.png)

▲ MicroMouse for IEEE Maze Competition. The system is based on an AVR ATMega128 microcontroller.

---

## Underground Coal Mine Search and Rescue Robot (2009) 

![Coal mine rescue robot](/assets/coal-mine-rescue-robot-2009.jpg)

▲ Picture of the search & rescue robot. This robot can transform its form to cope with uneven terrains. This robot is build with a 8051 microcontroller and it transmits camera streaming using 2.4GHz wireless. The mechanical parts are crafted using a laser CNC machine.

---
