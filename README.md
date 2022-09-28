
<a href="https://youtu.be/Ou1GtHqjWwc"><p align="center"><img src="./.github/ESP32-WebApp.gif" alt="Demo of the application" width="85%"></p></a>
[**See full video demonstration here**](https://youtu.be/Ou1GtHqjWwc)

# ESP32 Web Application Example: ESP-IDF RESTful & Vue 2 Frontend

This repository is a refresher of the [ESP-IDF example](https://github.com/espressif/esp-idf/tree/master/examples/protocols/http_server/restful_server) to use Vue 2, and its UI library Vuetify.

It has been tested and developed on an [ESP32-S3 custom board with 8Mb of flash memory](https://github.com/ArthurFDLR/esp32-s3-darlington-array), but any ESP32 with at least 4Mb of memory should handle this application.

- [ESP32 Web Application Example: ESP-IDF RESTful & Vue 2 Frontend](#esp32-web-application-example-esp-idf-restful--vue-2-frontend)
  - [Overview](#overview)
    - [About mDNS](#about-mdns)
    - [About deploy mode](#about-deploy-mode)
    - [About frontend framework](#about-frontend-framework)
  - [How to use example](#how-to-use-example)
    - [Hardware Required](#hardware-required)
    - [Configure the project](#configure-the-project)
    - [Build and Flash](#build-and-flash)
    - [Extra steps to do for deploying website by semihost](#extra-steps-to-do-for-deploying-website-by-semihost)
  - [Troubleshooting](#troubleshooting)

## Overview

This example mainly introduces how to implement a RESTful API server and HTTP server on ESP32, with a frontend browser UI.

This example designs several APIs to fetch resources as follows:

| API                        | Method | Resource Example                                      | Description                                                                              | Page URL |
| -------------------------- | ------ | ----------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| `/api/v1/system/info`      | `GET`  | {<br />version:"v4.0-dev",<br />cores:2<br />}        | Used for clients to get system information like IDF version, ESP32 cores, etc            | `/`      |
| `/api/v1/blinker/duration`         | `POST`  | {<br />"duration_ms":1000<br />}                                  | Used for clients to get raw temperature data read from sensor                            | `/blinker` |
| `/api/v1/blinker/state` | `POST` | { <br /><t />"state":true<br />} | Used for clients to upload control values to ESP32 in order to control LED’s brightness  | `/blinker` |

**Page URL** is the URL of the webpage which will send a request to the API.

### About mDNS

The IP address of an IoT device may vary from time to time, so it’s impracticable to hard code the IP address in the webpage. By default, we use the `mDNS` to parse the domain name `esp-blinker.local`, so that we can always get access to the web server by this URL no matter what the real IP address behind it. See [here](https://docs.espressif.com/projects/esp-idf/en/latest/api-reference/protocols/mdns.html) for more information about mDNS.

**Notes: mDNS is installed by default on most operating systems or is available as separate package.**

### About deploy mode

In development mode, it would be awful to flash the whole webpages every time we update the html, js or css files. So it is highly recommended to deploy the webpage to host PC via `semihost` technology. Whenever the browser fetch the webpage, ESP32 can forward the required files located on host PC. By this mean, it will save a lot of time when designing new pages.

After developing, the pages should be deployed to one of the following destinations:

* SPI Flash - which is recommended when the website after built is small (e.g. less than 2MB).
* SD Card - which would be an option when the website after built is very large that the SPI Flash have not enough space to hold (e.g. larger than 2MB).

### About frontend framework

Many famous frontend frameworks (e.g. Vue, React, Angular) can be used in this example. Here we just take [Vue](https://vuejs.org/) as example and adopt the [vuetify](https://vuetifyjs.com/) as the UI library.

## How to use example

### Hardware Required

To run this example, you need an ESP32 dev board (e.g. ESP32-WROVER Kit, ESP32-Ethernet-Kit) or ESP32 core board (e.g. ESP32-DevKitC). An extra JTAG adapter might also needed if you choose to deploy the website by semihosting. For more information about supported JTAG adapter, please refer to [select JTAG adapter](https://docs.espressif.com/projects/esp-idf/en/latest/api-guides/jtag-debugging/index.html#jtag-debugging-selecting-jtag-adapter). Or if you choose to deploy the website to SD card, an extra SD slot board is needed.

**Pin Assignment:**

Only if you deploy the website to SD card, then the following pin connection is used in this example.

| ESP32  | SD Card |
| ------ | ------- |
| GPIO2  | D0      |
| GPIO4  | D1      |
| GPIO12 | D2      |
| GPIO13 | D3      |
| GPIO14 | CLK     |
| GPIO15 | CMD     |


### Configure the project

Open the project configuration menu (`idf.py menuconfig`). 

In the `Example Connection Configuration` menu:

* Choose the network interface in `Connect using`  option based on your board. Currently we support both Wi-Fi and Ethernet.
* If you select the Wi-Fi interface, you also have to set:
  * Wi-Fi SSID and Wi-Fi password that your esp32 will connect to.
* If you select the Ethernet interface, you also have to set:
  * PHY model in `Ethernet PHY` option, e.g. IP101.
  * PHY address in `PHY Address` option, which should be determined by your board schematic.
  * EMAC Clock mode, GPIO used by SMI.

In the `Example Configuration` menu:

* Set the pin of the build-in LED (or any pin which has something blinkable connected) in `Blink GPIO number`.
* Set the domain name in `mDNS Host Name` option.
* Choose the deploy mode in `Website deploy mode`, currently we support deploy website to host PC, SD card and SPI Nor flash.
  * If we choose to `Deploy website to host (JTAG is needed)`, then we also need to specify the full path of the website in `Host path to mount (e.g. absolute path to web dist directory)`.
* Set the mount point of the website in `Website mount point in VFS` option, the default value is `/www`.

### Build and Flash

After the webpage design work has been finished, you should compile them by running following commands:

```bash
cd ./front/web-blinker
npm install
npm run build
```

After a while, you will see a `dist` directory which contains all the website files (e.g. html, js, css, images).

Run `idf.py -p PORT flash monitor` to build and flash the project..

(To exit the serial monitor, type ``Ctrl-]``.)

See the [Getting Started Guide](https://docs.espressif.com/projects/esp-idf/en/latest/get-started/index.html) for full steps to configure and use ESP-IDF to build projects.

### Extra steps to do for deploying website by semihost

We need to run the latest version of OpenOCD which should support semihost feature when we test this deploy mode:

```bash
openocd-esp32/bin/openocd -s openocd-esp32/share/openocd/scripts -f board/esp32-wrover-kit-3.3v.cfg
```

## Troubleshooting

1. Error occurred when building example: `...front/web-demo/dist doesn't exit. Please run 'npm run build' in ...front/web-demo`.
   * When you choose to deploy website to SPI flash, make sure the `dist` directory has been generated before you building this example.

(For any technical queries, please open an [issue](https://github.com/espressif/esp-idf/issues) on GitHub. We will get back to you as soon as possible.)
