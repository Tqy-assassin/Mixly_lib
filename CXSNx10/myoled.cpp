#include "myoled.h"
#include "myoledfont.h"
#include "Arduino.h"
void myoled::delay_ms(int ms)
{
  for (int i = 0; i < ms; i++)
  {
    for (int j = 0; j < 1985; j++) NOP;
  }
}
void myoled::LED_Init()
{
  pinMode(A5, OUTPUT);
  pinMode(A4, OUTPUT);

  OLED_WR_Byte(0xAE, OLED_CMD); //--turn off oled panel
  OLED_WR_Byte(0x02, OLED_CMD); //---set low column address
  OLED_WR_Byte(0x10, OLED_CMD); //---set high column address
  OLED_WR_Byte(0x40, OLED_CMD); //--set start line address  Set Mapping RAM Display Start Line (0x00~0x3F)
  OLED_WR_Byte(0x81, OLED_CMD); //--set contrast control register
  OLED_WR_Byte(0xff, OLED_CMD); // Set SEG Output Current Brightness
  OLED_WR_Byte(0xA1, OLED_CMD); //--Set SEG/Column Mapping     0xa0�
  OLED_WR_Byte(0xC8, OLED_CMD); //Set COM/Row Scan Direction   0xc0�
  OLED_WR_Byte(0xA6, OLED_CMD); //--set normal display
  OLED_WR_Byte(0xA8, OLED_CMD); //--set multiplex ratio(1 to 64)
  OLED_WR_Byte(0x3f, OLED_CMD); //--1/64 duty
  OLED_WR_Byte(0xD3, OLED_CMD); //-set display offset  Shift Mapping RAM Counter (0x00~0x3F)
  OLED_WR_Byte(0x00, OLED_CMD); //-not offset
  OLED_WR_Byte(0xd5, OLED_CMD); //--set display clock divide ratio/oscillator frequency
  OLED_WR_Byte(0x80, OLED_CMD); //--set divide ratio, Set Clock as 100 Frames/Sec
  OLED_WR_Byte(0xD9, OLED_CMD); //--set pre-charge period
  OLED_WR_Byte(0xF1, OLED_CMD); //Set Pre-Charge as 15 Clocks & Discharge as 1 Clock
  OLED_WR_Byte(0xDA, OLED_CMD); //--set com pins hardware configuration
  OLED_WR_Byte(0x12, OLED_CMD);
  OLED_WR_Byte(0xDB, OLED_CMD); //--set vcomh
  OLED_WR_Byte(0x40, OLED_CMD); //Set VCOM Deselect Level
  OLED_WR_Byte(0x20, OLED_CMD); //-Set Page Addressing Mode (0x00/0x01/0x02)
  OLED_WR_Byte(0x02, OLED_CMD); //
  OLED_WR_Byte(0x8D, OLED_CMD); //--set Charge Pump enable/disable
  OLED_WR_Byte(0x14, OLED_CMD); //--set(0x10) disable
  OLED_WR_Byte(0xA4, OLED_CMD); // Disable Entire Display On (0xa4/0xa5)
  OLED_WR_Byte(0xA6, OLED_CMD); // Disable Inverse Display On (0xa6/a7)
  OLED_WR_Byte(0xAF, OLED_CMD); //--turn on oled panel
  OLED_WR_Byte(0xAF, OLED_CMD); /*display ON*/
  OLED_Clear();
  OLED_Set_Pos(0, 0);
}
void myoled::IIC_Start()
{
  OLED_SCLK_Set() ;
  OLED_SDIN_Set();
  OLED_SDIN_Clr();
  OLED_SCLK_Clr();
}
void myoled::IIC_Stop()
{
  OLED_SCLK_Set() ;
  OLED_SDIN_Clr();
  OLED_SDIN_Set();
}
void myoled::IIC_Wait_Ack()
{
  OLED_SCLK_Set() ;
  OLED_SCLK_Clr();
}
void myoled::Write_IIC_Byte(unsigned char IIC_Byte)
{
  unsigned char i;
  unsigned char m, da;
  da = IIC_Byte;
  OLED_SCLK_Clr();
  for (i = 0; i < 8; i++)
  {
    m = da;
    m = m & 0x80;
    if (m == 0x80)
    {
      OLED_SDIN_Set();
    }
    else OLED_SDIN_Clr();
    da = da << 1;
    OLED_SCLK_Set();
    OLED_SCLK_Clr();
  }
}
void myoled::Write_IIC_Command(unsigned char IIC_Command)
{
  IIC_Start();
  Write_IIC_Byte(0x78);
  IIC_Wait_Ack();
  Write_IIC_Byte(0x00);
  IIC_Wait_Ack();
  Write_IIC_Byte(IIC_Command);
  IIC_Wait_Ack();
  IIC_Stop();
}
void myoled::Write_IIC_Data(unsigned char IIC_Data)
{
  IIC_Start();
  Write_IIC_Byte(0x78);
  IIC_Wait_Ack();
  Write_IIC_Byte(0x40);
  IIC_Wait_Ack();
  Write_IIC_Byte(IIC_Data);
  IIC_Wait_Ack();
  IIC_Stop();
}
void myoled::OLED_WR_Byte(unsigned dat, unsigned cmd)
{
  if (cmd) {
    Write_IIC_Data(dat);
  }
  else {
    Write_IIC_Command(dat);
  }
}
void myoled::fill_picture(unsigned char fill_Data)
{
  unsigned char m, n;
  for (m = 0; m < 8; m++)
  {
    OLED_WR_Byte(0xb0 + m, 0);
    OLED_WR_Byte(0x00, 0);
    OLED_WR_Byte(0x10, 0);
    for (n = 0; n < 128; n++)
    {
      OLED_WR_Byte(fill_Data, 1);
    }
  }
}
void myoled::OLED_Set_Pos(unsigned char x, unsigned char y)
{
  OLED_WR_Byte(0xb0 + y, OLED_CMD);
  OLED_WR_Byte((((x + 2) & 0xf0) >> 4) | 0x10, OLED_CMD);
  OLED_WR_Byte(((x + 2) & 0x0f), OLED_CMD);
}
/*void myoled::OLED_Display_On(void)
  {
  OLED_WR_Byte(0X8D, OLED_CMD); //SET DCDC����
  OLED_WR_Byte(0X14, OLED_CMD); //DCDC ON
  OLED_WR_Byte(0XAF, OLED_CMD); //DISPLAY ON
  }
  void myoled::OLED_Display_Off(void)
  {
  OLED_WR_Byte(0X8D, OLED_CMD); //SET DCDC����
  OLED_WR_Byte(0X10, OLED_CMD); //DCDC OFF
  OLED_WR_Byte(0XAE, OLED_CMD); //DISPLAY OFF
  }*/
void myoled::OLED_Clear(void)
{
  u8 i, n;
  for (i = 0; i < 8; i++)
  {
    OLED_WR_Byte (0xb0 + i, OLED_CMD);
    OLED_WR_Byte (0x02, OLED_CMD);
    OLED_WR_Byte (0x10, OLED_CMD);
    for (n = 0; n < 128; n++)OLED_WR_Byte(0, OLED_DATA);
  }
}
void myoled::OLED_On(void)
{
  u8 i, n;
  for (i = 0; i < 8; i++)
  {
    OLED_WR_Byte (0xb0 + i, OLED_CMD);
    OLED_WR_Byte (0x02, OLED_CMD);
    OLED_WR_Byte (0x10, OLED_CMD);
    for (n = 0; n < 128; n++)OLED_WR_Byte(1, OLED_DATA);
  }
}
void myoled::OLED_ShowChar(u8 x, u8 y, u8 chr, u8 Char_Size)
{
  unsigned char c = 0, i = 0;
  c = chr - ' ';
  if (x > Max_Column - 1) {
    x = 0;
    y = y + 2;
  }
  if (Char_Size == 16)
  {
    OLED_Set_Pos(x, y);
    for (i = 0; i < 8; i++)
      OLED_WR_Byte(F8X16[c * 16 + i], OLED_DATA);
    OLED_Set_Pos(x, y + 1);
    for (i = 0; i < 8; i++)
      OLED_WR_Byte(F8X16[c * 16 + i + 8], OLED_DATA);
  }
  else {
    OLED_Set_Pos(x, y);
    for (i = 0; i < 6; i++)
      OLED_WR_Byte(F6x8[c][i], OLED_DATA);
  }
}
u32 oled_pow(u8 m, u8 n)
{
  u32 result = 1;
  while (n--)result *= m;
  return result;
}
void myoled::OLED_ShowNum(u8 x, u8 y, u32 num, u8 len, u8 size2)
{
  u8 t, temp;
  u8 enshow = 0;
  for (t = 0; t < len; t++)
  {
    temp = (num / oled_pow(10, len - t - 1)) % 10;
    if (enshow == 0 && t < (len - 1))
    {
      if (temp == 0)
      {
        OLED_ShowChar(x + (size2 / 2)*t, y, ' ', size2);
        continue;
      } else enshow = 1;
    }
    OLED_ShowChar(x + (size2 / 2)*t, y, temp + '0', size2);
  }
}
void myoled::OLED_ShowString(u8 x, u8 y, u8 *chr, u8 Char_Size)
{
  unsigned char j = 0;
  while (chr[j] != '\0')
  { OLED_ShowChar(x, y, chr[j], Char_Size);
    x += 8;
    if (x > 120) {
      x = 0;
      y += 2;
    }
    j++;
  }
}
