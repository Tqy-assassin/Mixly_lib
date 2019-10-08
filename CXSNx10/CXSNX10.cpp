#if 0
#endif

#include <Arduino.h>
#include <MsTimer2.h>
#include <string.h>
#include <avr/pgmspace.h>
#include <stdlib.h>

#include "CXSNX10.h"
#include "strbuf.h"
#include "iic.h"
#include "stdio.h"
//********************OLED模块***********************
//OLED初始化函数
CXSN_OLED::CXSN_OLED()
{
  I2C_init();
  oleddelay(3000);//初始化之前的延时很重要！
  OLED_WrCmd(0xae);//--turn off oled panel
  OLED_WrCmd(0x00);//---set low column address
  OLED_WrCmd(0x10);//---set high column address
  OLED_WrCmd(0x40);//--set start line address  Set Mapping RAM Display Start Line (0x00~0x3F)
  OLED_WrCmd(0x81);//--set contrast control register
  OLED_WrCmd(0xCF); // Set SEG Output Current Brightness
  OLED_WrCmd(0xa1);//--Set SEG/Column Mapping      0xa0左右反置 0xa1正常
  OLED_WrCmd(0xc8);//Set COM/Row Scan Direction    0xc0上下反置 0xc8正常
  OLED_WrCmd(0xa6);//--set normal display
  OLED_WrCmd(0xa8);//--set multiplex ratio(1 to 64)
  OLED_WrCmd(0x3f);//--1/64 duty
  OLED_WrCmd(0xd3);//-set display offset  Shift Mapping RAM Counter (0x00~0x3F)
  OLED_WrCmd(0x00);//-not offset
  OLED_WrCmd(0xd5);//--set display clock divide ratio/oscillator frequency
  OLED_WrCmd(0x80);//--set divide ratio, Set Clock as 100 Frames/Sec
  OLED_WrCmd(0xd9);//--set pre-charge period
  OLED_WrCmd(0xf1);//Set Pre-Charge as 15 Clocks & Discharge as 1 Clock
  OLED_WrCmd(0xda);//--set com pins hardware configuration
  OLED_WrCmd(0x12);
  OLED_WrCmd(0xdb);//--set vcomh
  OLED_WrCmd(0x40);//Set VCOM Deselect Level
  OLED_WrCmd(0x20);//-Set Page Addressing Mode (0x00/0x01/0x02)
  OLED_WrCmd(0x02);//
  OLED_WrCmd(0x8d);//--set Charge Pump enable/disable
  OLED_WrCmd(0x14);//--set(0x10) disable
  OLED_WrCmd(0xa4);// Disable Entire Display On (0xa4/0xa5)
  OLED_WrCmd(0xa6);// Disable Inverse Display On (0xa6/a7) 
  OLED_WrCmd(0xaf);//--turn on oled panel
  OLED_Fill(0x00);//初始清屏
  OLED_Set_Pos(0,0);
} 
//OLED驱动程序用的延时程序
void CXSN_OLED::oleddelay(unsigned int z)
{
  while(z--);
}
//OLED写数据
void CXSN_OLED::OLED_WrDat(unsigned char IIC_Data)
{
  I2C_Start();
  I2C_SendWrDAdr(0x78);
  I2C_SendDat(0x40);      //write data
  I2C_SendDat(IIC_Data);
  I2C_Stop();
}
//OLED写命令
void CXSN_OLED::OLED_WrCmd(unsigned char IIC_Command)
{
  uchar i=50;
  while(i--)
  {
  	 if(I2C_Start())
	 	break;
  }
  i = 50;
   while(i--)
  {
  	  if(I2C_SendWrDAdr(0x78))    //Slave address,SA0=0
	 	break;
  }
   i = 50;
   while(i--)
  {
  	  if(I2C_SendDat(0x00))   //write command 
	 	break;
  }        
   i = 50;
   while(i--)
  {
  	  if(I2C_SendDat(IIC_Command))   //write command 
	 	break;
  }             
 
  I2C_Stop();
}
//OLED 设置坐标
void CXSN_OLED::OLED_Set_Pos(unsigned char x, unsigned char y) 
{ 
  OLED_WrCmd(0xb0+y);
  OLED_WrCmd(((x&0xf0)>>4)|0x10);
  OLED_WrCmd((x&0x0f)|0x01);
} 
//刷屏函数
void CXSN_OLED::OLED_Fill(unsigned char bmp_dat) 
{
  unsigned char y,x;
  for(y=0;y<8;y++)
  {
    OLED_Set_Pos(0,y);
    for(x=0;x<128;x++)
    {
      OLED_WrDat(bmp_dat);
    }
  }
}
//OLED复位
void CXSN_OLED::OLED_CLS()
{
  unsigned char y,x;
  for(y=0;y<8;y++)
  {
    OLED_WrCmd(0xb0+y);
    OLED_WrCmd(0x01);
    OLED_WrCmd(0x10);
    for(x=0;x<128;x++)
    OLED_WrDat(0);
  }
}
/**************************
功能描述：显示16*16点阵  显示的坐标（x,y），y为页范围0~8  x: 0~127
f:是否取反显示
注意 需要使用的字符需要定义数组F8x16
****************************/
void CXSN_OLED::OLED_P8x16Ch(unsigned char x,unsigned char y,unsigned char N)
{
	unsigned char wm=0;
  unsigned int va=N<<4;

  OLED_Set_Pos(x , y);
  for(wm = 0;wm < 8;wm++)
  {
    OLED_WrDat(pgm_read_byte_near(F8x16 + va));
    va++;
  }
  OLED_Set_Pos(x,y + 1);
  for(wm = 0;wm < 8;wm++)
  {
    OLED_WrDat(pgm_read_byte_near(F8x16 + va));
    va++;
  }   
  
}

/*********************
字符串打印函�?
x:横坐�? 范围0-127
y:纵坐�? 范围0-6
该函数打印ascll码范围如下:

!"#$%&'()*+,-./0123456789:;<=>
?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]
^_`abcdefghijklmnopqrstuvwxyz{|}~

以上图标都可以打印显�?函数使用例子:
oled_puts(0,0,"123abcdfghijklmn6789:;<=>?@ABC'()*Z[\]^_`<=>#$%&");
**********************/
void CXSN_OLED::OLED_Print(unsigned char y,unsigned char x,String str)
{
  unsigned char x1=(x-1)*8,y1=(y-1)*2;
  unsigned int i,j;
  char c;
  j = str.length();
  	for(i=0;i<j;i++)
    {
    		c = str.charAt(i);
        if(x1>120||y1>6)  //判断是否超出屏幕显示范围
        {
            if(y1>=6)
            {
                return ;    //总坐标超出则退出函数
            }
            else
            {
               x1 = 0;      //未超出则纵坐标下移，横坐标清楚
               y1 +=2;
            }
        }
        if(!(c<0x20||c>0x7e))
        {
            OLED_P8x16Ch(x1,y1,c-0x20);    //ascll码最小为空格"0x20" 所有减�?x20就是字库所对应的序
        }
        x1 += 8;   //横坐标加8，因为每个字符横向占�?位显
    }
}
void CXSN_OLED::OLED_Print(unsigned char y,unsigned char x,float f)
{
	
		char Mem[15];
		char *buf = Mem;
		
		
		if ( f - (int) f == 0)
		{
					sprintf(buf,"%d",(int)f);
		}
		else
		{
				dtostrf(f,3,2,buf);
		}

  	String str = buf;
		OLED_Print(y,x,str);

}

//***********************RGB***************************
CXSNX10_WS2812::CXSNX10_WS2812(uint16_t num_leds)
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

void CXSNX10_WS2812::SetRGB(uint8_t _Brightness, uint8_t r, uint8_t g, uint8_t b)
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
  CXSNX10_WS2812::Sync();
  delay(50);
}
void CXSNX10_WS2812::SetRGB(uint8_t _Brightness, uint32_t rgb)
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
  CXSNX10_WS2812::Sync();
  delay(50);
}
uint32_t CXSNX10_WS2812::GetRGB()
{ uint16_t index =0;
	if (index < count_led)
	{
		uint16_t tmp = index * 3;
		return ((uint32_t)(pixels[OFFSET_R(tmp)]) << 16) | (pixels[OFFSET_G(tmp)] << 8) | pixels[OFFSET_B(tmp)];
	}
	return 0;
}
uint8_t CXSNX10_WS2812::GetR()
{ uint16_t index =0;
	if (index < count_led)
	{
		uint16_t tmp = index * 3;
		return pixels[OFFSET_R(tmp)];
	}
	return 0;
}
uint8_t CXSNX10_WS2812::GetG()
{ uint16_t index =0;
	if (index < count_led)
	{
		uint16_t tmp = index * 3;
		return pixels[OFFSET_G(tmp)];
	}
	return 0;
}
uint8_t CXSNX10_WS2812::GetB()
{ uint16_t index =0;
	if (index < count_led)
	{
		uint16_t tmp = index * 3;
		return pixels[OFFSET_B(tmp)];
	}
	return 0;
}
void CXSNX10_WS2812::Sync()
{
	*CXSNX10_WS2812_port_reg |= pinMask; // Enable DDR
	CXSNX10_WS2812_sendarray_mask(pixels, 3 * count_led, pinMask, (uint8_t*)CXSNX10_WS2812_port, (uint8_t*)CXSNX10_WS2812_port_reg);
}
#ifdef RGB_ORDER_ON_RUNTIME
void CXSNX10_WS2812::setColorOrderGRB()   // Default color order
{
	offsetGreen = 0;
	offsetRed = 1;
	offsetBlue = 2;
}

void CXSNX10_WS2812::setColorOrderRGB()
{
	offsetRed = 0;
	offsetGreen = 1;
	offsetBlue = 2;
}

void CXSNX10_WS2812::setColorOrderBRG()
{
	offsetBlue = 0;
	offsetRed = 1;
	offsetGreen = 2;
}
#endif
void  CXSNX10_WS2812::CXSNX10_WS2812_sendarray_mask(uint8_t *data, uint16_t datlen, uint8_t maskhi, uint8_t *port, uint8_t *portreg)
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
			//    :	"r" (curbyte), "I" (_SFR_IO_ADDR(CXSNX10_WS2812_PORTREG)), "r" (maskhi), "r" (masklo)
			: "r" (curbyte), "x" (port), "r" (maskhi), "r" (masklo)
			);
	}

	SREG = sreg_prev;
}

CXSNX10_WS2812::~CXSNX10_WS2812()
{
}
#ifndef ARDUINO
void CXSNX10_WS2812::SetOutput(const volatile uint8_t* port, volatile uint8_t* reg, uint8_t pin)
{
	pinMask = (1 << pin);
	CXSNX10_WS2812_port = port;
	CXSNX10_WS2812_port_reg = reg;
}
#else
void CXSNX10_WS2812::SetOutput(uint8_t pin)
{
	pinMask = digitalPinToBitMask(pin);
	CXSNX10_WS2812_port = portOutputRegister(digitalPinToPort(pin));
	CXSNX10_WS2812_port_reg = portModeRegister(digitalPinToPort(pin));
}
#endif

