---
title: Robots
date: 2018-03-09
authorbox: false
sidebar: false
menu: main
toc: false
---

Robotics is not only part of research but also where my passion is. I am a robot enthusiast and I have been building robots since 2009. Below is a selection of my projects that were built for research (or just for fun):

## Omni Robot for SLAM, 2018 -  (still developing)
My next step is to build a robot for SLAM and Navigation! I decide to choose ROS as there are some ready-to-use packages, which I think would give me a boost. The main processor is a Raspberry Pi 3 and the low-level controller is a STM32 based control board. The LiDAR is a Slamtec A1 which costs just about 100 pounds. The camera is a very fast 120 fps PS3 EYE, which is nice for machine vision purpose. I can't fit my Kinect onto this platform as I am not sure it has enough computation power, also converting power is an issue.

![DSC02954](/assets/DSC02954.jpg)

▲Picture of the robot platform. The robot has three omni wheels. On top layer there is a LiDAR produced by Slamtec. The middle layer contains a high framerate camera and a Raspberry Pi 3. On the bottom layer there is a low-level microcontroller and a motor driver.

{{< youtube id="tbpPylPjlzc" autoplay="false" >}}

▲Test of the LiDAR and Hector Mapping


---

## Line-Circle Filter, 2018
\[[Github](https://github.com/automaticdai/LC-filter)\] \[[Paper](https://arxiv.org/pdf/1707.08095.pdf)\] A geometric filter that is able to use machine learning technique as a definition of Trust factor with relation to geometric orientations and constraints. LC filter minimizes the data usage for detection or other applications like SLAM in which prevent the systems from critical over calculations during entrance to overwhelming landmarks. This filter is designed for edge-base detection or advance cameras like event-camera. As another outstanding property, due to two layer expert evaluations, LC filter simply can estimate the incoming objects to the camera with only reliance to vehicle IMU sensor.



![lc-filter](/assets/lc-filter.gif)

---

## Self-balance Two wheel Robot, 2017
A side project during the summer holiday. The hardware of this self-balance robot is off-the-shelf, which ease myself and make me focus on the software. The system is controlled by a STM32F103 Cortex-M3 microcontroller. The main sensor is a MPU6050 6-axis motion sensor. The attitude estimation is achieved by a complementary filter and a PI controller. As I don't have a model of the system, I can only manually tune the controller parameters, which is crucial to achieve satisfied stability.

![DSC04163](/assets/DSC04163.jpg)

▲Front view of the robot.

![DSC04167](/assets/DSC04167.jpg)

▲Top view of the robot.

---

## Visual Tracking with Arduino and OpenCV (on a PC), 2016

![DSC02955](/assets/DSC02955.jpg)

▲Picture of the visual tracking systems (right - version 1, left - version 2).

![cv_object_tracking](/assets/cv_object_tracking.jpg)

▲Screenshot of vision tracking using a web camera

---

## YM4 FIRA Educational Robot, 2015
This is a FIRA form factor robot that is designed for educational purpose. The platform is built by a friend's company: Embedded Dream Studio. I was involved in the Arduino library design and PID controller improvement.

![DSC04170](/assets/DSC04170.jpg)

▲ The robot is only 10 cm * 10 cm * 10 cm. A pound coin is used for comparison of size.

![DSC04171](/assets/DSC04171.jpg)

▲ The robot has a well designed structure. The robot is driven by two differential wheels with PCBs vertical placed on both sides. 4*AA batteries are used to power the platform. The robot has communication to a computer through a nRF24L01 wireless transceiver.

---

## UGV Localization and Tracking using a Quadcopter, 2014

{{< youtube id="cwX-hAz2w6M" autoplay="false" >}}

![uav-1](/assets/uav-1.jpg)

▲System Diagram

![uav-2](/assets/uav-2.jpg)

▲ROS Nodes

![uav-3](/assets/uav-31.jpg)

▲UGV Hardware

![uav-3](/assets/uav-3.jpg)

▲UGV System Diagram

![uav-4](/assets/uav-4.jpg)

▲Trajectory and Control Performance plotted in MATLAB

---

## High maneuverability robot for ACSE Search and Rescue Competition (2nd prize), University of Sheffield, 2014

![DSC01785](/assets/DSC01785.jpg)

▲Picture of the robot platform. Raspberry Pi is used as the main controller and an Arduino-like low-level controller is used to control motors.

{{< youtube id="aMIof2MX1oU" autoplay="false" >}}

---

## Closed-loop Helicopter Control with Matlab and Labview, 2014
This is a course project when I was in the University of Sheffield. A closed-loop controller for a model helicopter need to be firstly developed in MATLAB/Simulink. To simulate the controller with hardware-in-the-loop, NI LabVIEW is used which uses the same control structure and parameters from previous simulation. A Data Acquisition Device, myDAQ, is used as an interface to connect LabVIEW to the helicopter hardware.

![DSC01024](/assets/DSC01024.jpg)

▲A Picture of the Helicopter System

---

## Autonomous Mobile Robot for Object Avoidance and Environment Sensing, 2010

![1526841004394](/assets/1526841004394.png)

▲180° Rotatable Ultrasonic Sensors

![1526841004394](/assets/robot-2.jpg)

▲Top view of the robot

![1526841004394](/assets/robot-3.jpg)

▲Mechanical design of the robot (using Solidworks)

![img](/assets/YFWind-1024x768.jpg)

▲PCB - Dual Channel High Current DC Motor Driver (made from sketch)

![YFSMega](/assets/YFSMega-1024x768.jpg)

▲PCB - ATmega128 Robot Controller (made from sketch)

---

## RoboFish Waterpolo Competition, 2010

{{< youtube id="klyyAdgx8Ww" autoplay="false" >}}

▲RoboFish Waterpolo Competition

{{< youtube id="-pSHwlZhVns" autoplay="false" >}}

▲RoboFish Simulation (multi agents)

---

## IEEE MicroMouse Maze Competition, 2009

![1526841653933](/assets/1526841653933.png)

---

## Coal Mine Underground Search and Rescue Robot, 2009

![img](/assets/123111_0117_9.jpg)

---
