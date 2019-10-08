#if 0

#endif

#ifndef CXSNX10_h
#define CXSNX10_h
#endif

#define _CXSNX10_iCloudMemory_BuildENABLE_
#ifndef _CXSNX10_iCloudMemory_BuildENABLE_
#pragma message("Not")
#endif


#include <Arduino.h>
#include "OneWire.h"

#include "iic.h"
#include <avr/interrupt.h>
#include <avr/io.h>
#ifndef F_CPU
#define  F_CPU 16000000UL
#endif
#include <util/delay.h>
#include <stdint.h>
//#include <avr/io.h>  底层IO口寄存器操作库
#define RIGHT 0x1
#define LEFT  0x0
#define R 0x1
#define L  0x0
/*********************RGB**************************/
#define USE_GLOBAL_Brightness

#ifdef RGB_ORDER_ON_RUNTIME
#define OFFSET_R(r) r+offsetRed
#define OFFSET_G(g) g+offsetGreen
#define OFFSET_B(b) b+offsetBlue
#else
// CHANGE YOUR STATIC RGB ORDER HERE
#define OFFSET_R(r) r+1
#define OFFSET_G(g) g
#define OFFSET_B(b) b+2
#endif



#define w_zeropulse   350
#define w_onepulse    900
#define w_totalperiod 1250

		// Fixed cycles used by the inner loop
#define w_fixedlow    3
#define w_fixedhigh   6
#define w_fixedtotal  10

		// Insert NOPs to match the timing, if possible
#define w_zerocycles    (((F_CPU/1000)*w_zeropulse          )/1000000)
#define w_onecycles     (((F_CPU/1000)*w_onepulse    +500000)/1000000)
#define w_totalcycles   (((F_CPU/1000)*w_totalperiod +500000)/1000000)

		// w1 - nops between rising edge and falling edge - low
#define w1 (w_zerocycles-w_fixedlow)
		// w2   nops between fe low and fe high
#define w2 (w_onecycles-w_fixedhigh-w1)
		// w3   nops to complete loop
#define w3 (w_totalcycles-w_fixedtotal-w1-w2)

#if w1>0
#define w1_nops w1
#else
#define w1_nops  0
#endif

		// The only critical timing parameter is the minimum pulse length of the "0"
		// Warn or throw error if this timing can not be met with current F_CPU settings.
#define w_lowtime ((w1_nops+w_fixedlow)*1000000)/(F_CPU/1000)
#if w_lowtime>550
#error "Light_CXSNX10_WS2812: Sorry, the clock speed is too low. Did you set F_CPU correctly?"
#elif w_lowtime>450
		#warning "Light_CXSNX10_WS2812: The timing is critical and may only work on CXSNX10_WS2812B, not on CXSNX10_WS2812(S)."
			#warning "Please consider a higher clockspeed, if possible"
#endif

#if w2>0
#define w2_nops w2
#else
#define w2_nops  0
#endif

#if w3>0
#define w3_nops w3
#else
#define w3_nops  0
#endif

#define w_nop1  "nop      \n\t"
#define w_nop2  "rjmp .+0 \n\t"
#define w_nop4  w_nop2 w_nop2
#define w_nop8  w_nop4 w_nop4
#define w_nop16 w_nop8 w_nop8
//********************????************************

#define bin2bcd(val)   val + 6 * (val / 10) 
#define bcd2bin(val)   val - 6 * (val >> 4)

#define BEFORE 1
#define BEHIND 0

#define uint8_t	unsigned char
#define uint16_t	unsigned int


//********************OLED模块**********************
class CXSN_OLED 
{
	public:
			CXSN_OLED();
				static void oleddelay(unsigned int z);
				static void OLED_WrDat(unsigned char IIC_Data);
				static void OLED_WrCmd(unsigned char IIC_Command);		
				static void OLED_CLS();
				static void OLED_Fill(unsigned char bmp_dat);
				static void OLED_Set_Pos(unsigned char x, unsigned char y);
				static void OLED_P8x16Ch(unsigned char x,unsigned char y,unsigned char N);
				static void OLED_Print(unsigned char,unsigned char,String);
				static void OLED_Print(unsigned char,unsigned char,float);
				
	private:
};
class CXSNX10_StringCmp
{
	public:
		static void SetString(String str);
		static String GetString();
		static bool Compare_StringEqual(String str);
		static bool Compare_IncludeString(String str);
		
		static int Content_StringInt_ToInt(String String_part, bool position);
		static String Content_StringString_ToString(String String_part, bool position);
	private:
		static String string;
};
//#ifdef _CXSNX10_iCloudMemory_BuildENABLE_
//*******************************************************
/*class CXSNX10_ElectroniccompassandThreeAxis
{
public:
	static void Initial();
	static int XYZandHeading_display(uint8_t ZXY);
	static double XYZandHeading_display_H();
private:
	static unsigned char xyz[7];

};*/

class CXSNX10_WS2812
{
public:
	CXSNX10_WS2812(uint16_t num_led);
	~CXSNX10_WS2812();

#ifndef ARDUINO
	void SetOutput(const volatile uint8_t* port, volatile uint8_t* reg, uint8_t pin);
#else
	void SetOutput(uint8_t pin);
#endif


	uint32_t GetRGB();
	uint8_t  GetR();
	uint8_t  GetG();
	uint8_t  GetB();
	uint8_t  GetH(uint16_t index);
	uint8_t  GetS(uint16_t index);
	uint8_t  GetV(uint16_t index);
	void SetRGB(uint8_t _Brightness, uint32_t rgb);
	void SetRGB(uint8_t _Brightness, uint8_t r, uint8_t g, uint8_t b);
#ifdef USE_GLOBAL_Brightness
	
	void SetBrightness(uint8_t _Brightness)
	{
		Brightness = _Brightness;
	}
	uint8_t GetBrightness()
	{
		return Brightness;
	}
#endif


	void Sync();

#ifdef RGB_ORDER_ON_RUNTIME
	void setColorOrderRGB();
	void setColorOrderGRB();
	void setColorOrderBRG();
#endif

private:
	uint16_t count_led;
	uint8_t *pixels;
#ifdef USE_GLOBAL_Brightness
	uint8_t Brightness;
#endif
	void CXSNX10_WS2812_sendarray_mask(uint8_t *array, uint16_t length, uint8_t pinmask, uint8_t *port, uint8_t *portreg);

	const volatile uint8_t *CXSNX10_WS2812_port;
	volatile uint8_t *CXSNX10_WS2812_port_reg;
	uint8_t pinMask;

#ifdef RGB_ORDER_ON_RUNTIME
	uint8_t offsetRed;
	uint8_t offsetGreen;
	uint8_t offsetBlue;
#endif
};



