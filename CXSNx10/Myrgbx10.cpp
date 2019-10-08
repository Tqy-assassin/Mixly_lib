#if 0

#endif



#include <Arduino.h>
#include <MsTimer2.h>
#include <string.h>
#include <avr/pgmspace.h>
#include <stdlib.h>

#include "Myrgbx10.h"
#include "strbuf.h"
#include "iic.h"
#include "stdio.h"


//***********************RGB***************************
CXSN_WS2812::CXSN_WS2812(uint16_t num_leds)
{
	count_led = num_leds;

	pixels = (uint8_t*)malloc(count_led * 3);
#ifdef RGB_ORDER_ON_RUNTIME
	offsetGreen = 0;
	offsetRed = 1;
	offsetBlue = 2;
#endif
#ifdef USE_GLOBAL_Brightness
	Brightness = 255;
#endif
}

void CXSN_WS2812::SetRGB(uint8_t _Brightness, uint8_t r, uint8_t g, uint8_t b)
{
  uint16_t index =0;
	if (index < count_led)
	{
		uint16_t tmp = index * 3;
		pixels[OFFSET_R(tmp)] = r;
		pixels[OFFSET_G(tmp)] = g;
		pixels[OFFSET_B(tmp)] = b;
	}
  SetBrightness( _Brightness);
  CXSN_WS2812::Sync();
  delay(50);
}
void CXSN_WS2812::SetRGB(uint8_t _Brightness, uint32_t rgb)
{
    uint16_t index =0;
	if (index < count_led)
	{
		uint16_t tmp = index * 3;
		pixels[OFFSET_R(tmp)] = (rgb >> 16) & 0xFF;
		pixels[OFFSET_G(tmp)] = (rgb >> 8) & 0xFF;
		pixels[OFFSET_B(tmp)] = rgb & 0xFF;
	}
  SetBrightness( _Brightness);
  CXSN_WS2812::Sync();
  delay(50);
}
uint32_t CXSN_WS2812::GetRGB()
{ uint16_t index =0;
	if (index < count_led)
	{
		uint16_t tmp = index * 3;
		return ((uint32_t)(pixels[OFFSET_R(tmp)]) << 16) | (pixels[OFFSET_G(tmp)] << 8) | pixels[OFFSET_B(tmp)];
	}
	return 0;
}
uint8_t CXSN_WS2812::GetR()
{ uint16_t index =0;
	if (index < count_led)
	{
		uint16_t tmp = index * 3;
		return pixels[OFFSET_R(tmp)];
	}
	return 0;
}
uint8_t CXSN_WS2812::GetG()
{ uint16_t index =0;
	if (index < count_led)
	{
		uint16_t tmp = index * 3;
		return pixels[OFFSET_G(tmp)];
	}
	return 0;
}
uint8_t CXSN_WS2812::GetB()
{ uint16_t index =0;
	if (index < count_led)
	{
		uint16_t tmp = index * 3;
		return pixels[OFFSET_B(tmp)];
	}
	return 0;
}


void CXSN_WS2812::Sync()
{
	*PymrModule_WS2812_port_reg |= pinMask; // Enable DDR
	PymrModule_WS2812_sendarray_mask(pixels, 3 * count_led, pinMask, (uint8_t*)PymrModule_WS2812_port, (uint8_t*)PymrModule_WS2812_port_reg);
}

#ifdef RGB_ORDER_ON_RUNTIME
void CXSN_WS2812::setColorOrderGRB()   // Default color order
{
	offsetGreen = 0;
	offsetRed = 1;
	offsetBlue = 2;
}

void CXSN_WS2812::setColorOrderRGB()
{
	offsetRed = 0;
	offsetGreen = 1;
	offsetBlue = 2;
}

void CXSN_WS2812::setColorOrderBRG()
{
	offsetBlue = 0;
	offsetRed = 1;
	offsetGreen = 2;
}
#endif
void  CXSN_WS2812::PymrModule_WS2812_sendarray_mask(uint8_t *data, uint16_t datlen, uint8_t maskhi, uint8_t *port, uint8_t *portreg)
{
	uint8_t curbyte, ctr, masklo;
	uint8_t sreg_prev;

	masklo = ~maskhi & *port;
	maskhi |= *port;
	sreg_prev = SREG;
	cli();

	while (datlen--) {
		curbyte = *data++;
#ifdef USE_GLOBAL_Brightness
		curbyte = (int)((curbyte)*(int)(Brightness)) >> 8;
#endif
		asm volatile(
			"       ldi   %0,8  \n\t"
			"loop%=:            \n\t"
			"       st    X,%3 \n\t"    //  '1' [02] '0' [02] - re
#if (w1_nops&1)
			w_nop1
#endif
#if (w1_nops&2)
			w_nop2
#endif
#if (w1_nops&4)
			w_nop4
#endif
#if (w1_nops&8)
			w_nop8
#endif
#if (w1_nops&16)
			w_nop16
#endif
			"       sbrs  %1,7  \n\t"    //  '1' [04] '0' [03]
			"       st    X,%4 \n\t"     //  '1' [--] '0' [05] - fe-low
			"       lsl   %1    \n\t"    //  '1' [05] '0' [06]
#if (w2_nops&1)
			w_nop1
#endif
#if (w2_nops&2)
			w_nop2
#endif
#if (w2_nops&4)
			w_nop4
#endif
#if (w2_nops&8)
			w_nop8
#endif
#if (w2_nops&16)
			w_nop16
#endif
			"       brcc skipone%= \n\t"    //  '1' [+1] '0' [+2] -
			"       st   X,%4      \n\t"    //  '1' [+3] '0' [--] - fe-high
			"skipone%=:               "     //  '1' [+3] '0' [+2] -

#if (w3_nops&1)
			w_nop1
#endif
#if (w3_nops&2)
			w_nop2
#endif
#if (w3_nops&4)
			w_nop4
#endif
#if (w3_nops&8)
			w_nop8
#endif
#if (w3_nops&16)
			w_nop16
#endif

			"       dec   %0    \n\t"    //  '1' [+4] '0' [+3]
			"       brne  loop%=\n\t"    //  '1' [+5] '0' [+4]
			:	"=&d" (ctr)
			//    :	"r" (curbyte), "I" (_SFR_IO_ADDR(PymrModule_WS2812_PORTREG)), "r" (maskhi), "r" (masklo)
			: "r" (curbyte), "x" (port), "r" (maskhi), "r" (masklo)
			);
	}

	SREG = sreg_prev;
}

CXSN_WS2812::~

CXSN_WS2812()
{
}

#ifndef ARDUINO
void CXSN_WS2812::SetOutput(const volatile uint8_t* port, volatile uint8_t* reg, uint8_t pin)
{
	pinMask = (1 << pin);
	PymrModule_WS2812_port = port;
	PymrModule_WS2812_port_reg = reg;
}
#else
void CXSN_WS2812::SetOutput(uint8_t pin)
{
	pinMask = digitalPinToBitMask(pin);
	PymrModule_WS2812_port = portOutputRegister(digitalPinToPort(pin));
	PymrModule_WS2812_port_reg = portModeRegister(digitalPinToPort(pin));
}
#endif

