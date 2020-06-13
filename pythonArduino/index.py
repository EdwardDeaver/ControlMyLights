import serial
import time

ser = serial.Serial('/dev/cu.usbmodem14101', 9600, timeout = 1) # ttyACM1 for Arduino board

readOut = 0   #chars waiting from laser range finder

print ("Starting up")
connected = False
commandToSend = 1 # get the distance in mm

while True:
    print ("Writing: ",  commandToSend)
    ser.write(str("#AABBCC").encode())
    time.sleep(1)
    ser.write(str("#AABBCC").encode())

    print ("Attempt to Read")
            
    readOut = ser.readline().decode('ascii')
    time.sleep(1)
    print ("Reading: ", readOut) 
    print ("Restart")
    ser.flush() #flush the buffer
