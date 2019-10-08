#ifndef __PM25_H_
#define __PM25_H_

#include <Arduino.h>

class CXSNX10_pm25_Sensor
{
	public:
			static float Read_PM2_5(int pin);
	private:
};

#endif