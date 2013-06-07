Modified by MrZetsubou from ais.py courtesy from GPSD

This application cannot work alone, it requires information to be sent from a source, eg. gr-ais. 

Source code of gr-ais can be found on https://github.com/chgans/gr-ais which is forked version of the original gr-ais code, developed by Nick Forster. The original version has issues with the Realtek DVB-T RTL2832 dongle that I am unable to solve, the forked version provided in the link above works well with the Realtek RTL2832 dongle. 

ais_test.py is a modified python application from GPSD's AIS decoder, ais.py, the following changes were made to ais.py:

- Additional code was added to send NMEA encoded AIS messages to www.marinetraffic.com as receiving station data. 

- A Mosquitto client was added into the application in order to publish AIS messages encoded in JSON to the 'winter' server of CEIT under the topic "/uq/ferry/json1". NMEA encoded AIS messages are also published to 'winter' under the topic "/uq/ferry/raws1"

