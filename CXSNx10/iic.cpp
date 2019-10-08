/*********************************************************************
微 雪 电 子   WaveShare   http://www.waveShare.net            
目    的:   建立I2C操作库
目标系统:   基于AVR单片机                                                 
应用软件:   ICCAVR                                                      
版    本:   Version 1.0                                                       
圆版时间:   2005-06-25
开发人员:   SEE
说    明:   若用于商业用途，请保留此段文字或注明代码来源
   深 圳 市 微 雪 电 子 有 限 公 司 保 留 所 有 的 版 权     
*********************************************************************/ 

/*01010101010101010101010101010101010101010101010101010101010101010101
----------------------------------------------------------------------
版本更新记录：

----------------------------------------------------------------------
入口参数说明：

----------------------------------------------------------------------
待定参数说明：

---------------------------------------------------------------------- 
对外变量说明：

----------------------------------------------------------------------
对外程序说明：

----------------------------------------------------------------------
10101010101010101010101010101010101010101010101010101010101010101010*/

#include "iic.h"
#include <avr/io.h> 


/* TWSR values (not bits) */
/* Master */
#define I2C_START    0x08
#define I2C_RESTART    0x10

/* Master Transmitter */
#define I2C_MT_SLA_ACK   0x18
#define I2C_MT_SLA_NACK   0x20
#define I2C_MT_DATA_ACK   0x28
#define I2C_MT_DATA_NACK 0x30
#define I2C_MT_ARB_LOST   0x38

/* Master Receiver */
#define I2C_MR_ARB_LOST   0x38
#define I2C_MR_SLA_ACK   0x40
#define I2C_MR_SLA_NACK   0x48
#define I2C_MR_DATA_ACK   0x50
#define I2C_MR_DATA_NACK 0x58

/* Slave Transmitter */
#define I2C_ST_SLA_ACK    0xA8
#define I2C_ST_ARB_LOST_SLA_ACK 0xB0
#define I2C_ST_DATA_ACK    0xB8
#define I2C_ST_DATA_NACK   0xC0
#define I2C_ST_LAST_DATA   0xC8

/* Slave Receiver */
#define I2C_SR_SLA_ACK     0x60
#define I2C_SR_ARB_LOST_SLA_ACK   0x68
#define I2C_SR_GCALL_ACK    0x70
#define I2C_SR_ARB_LOST_GCALL_ACK 0x78
#define I2C_SR_DATA_ACK     0x80
#define I2C_SR_DATA_NACK    0x88
#define I2C_SR_GCALL_DATA_ACK   0x90
#define I2C_SR_GCALL_DATA_NACK   0x98
#define I2C_SR_STOP      0xA0

/* Misc */
#define I2C_NO_INFO    0xF8
#define I2C_BUS_ERROR   0x00

/*
* The lower 3 bits of TWSR are reserved on the ATmega163.
* The 2 LSB carry the prescaler bits on the newer ATmegas.
*/
#define I2C_STATUS_MASK (_BV(TWS7)|_BV(TWS6)|_BV(TWS5)|_BV(TWS4)|_BV(TWS3))
#define I2C_STATUS   (TWSR & I2C_STATUS_MASK)

/*
* R/~W bit in SLA+R/W address field.
*/
#define I2C_READ   1
#define I2C_WRITE   0

#define I2CStart()    (TWCR=(1<<TWINT)|(1<<TWSTA)|(1<<TWEN))
#define I2CStop()     (TWCR=(1<<TWINT)|(1<<TWSTO)|(1<<TWEN))
#define I2CWaitAck() {while(!(TWCR&(1<<TWINT)));}
#define I2CChkAck() (TWSR&0xf8)      //check ack
#define I2CSendAck() (TWCR|=(1<<TWEA))
#define I2CSendNoAck() (TWCR&=~(1<<TWEA))
#define I2CSendByte(x) {TWDR=(x);TWCR=(1<<TWINT)|(1<<TWEN);} 
#define I2CRcvNckByte() (TWCR=(1<<TWINT)|(1<<TWEN))
#define I2CRcvAckByte() (TWCR=(1<<TWINT)|(1<<TWEN)|(1<<TWEA))

/* For Program */
#define I2C_Stop()   I2CStop()
#define I2C_SendAck() I2CSendAck()
#define I2C_SendNoAck() I2CSendNoAck()
#define I2C_WaitAck() I2CWaitAck()

/* I2C Config */
#define I2C_ERR    0
#define I2C_CRR    1



void I2C_init(void)
{
   TWCR = 1<<TWEN;
   //TWBR = 0x3;
   TWBR = 0x10;	//分频数  越大IIC速度越慢 也就出错率越低
   TWSR = 0;
}


/*--------------------------------------------------------------------
程序名称：I2C Start
程序功能：
注意事项：
提示说明：
输    入：
返    回：
--------------------------------------------------------------------*/
uchar I2C_Start(void)     
{
I2CStart();      
I2CWaitAck();
if( I2CChkAck()!=I2C_START ) 
   return I2C_ERR;
return I2C_CRR;
}
/*--------------------------------------------------------------------
程序名称：I2C ReStart
程序功能：
注意事项：
提示说明：
输    入：
返    回：
--------------------------------------------------------------------*/
uchar I2C_Restart(void)     
{
I2CStart();      
I2CWaitAck();
if( I2CChkAck()!=I2C_RESTART ) 
   return I2C_ERR;
return I2C_CRR;
}
/*--------------------------------------------------------------------
程序名称：I2C(TWI)发送 7位 器件写地址: XXXX XXX0
程序功能：
注意事项：
提示说明：
输    入：
返    回：
--------------------------------------------------------------------*/
uchar I2C_SendWrDAdr(uchar wrDAdr) 
{
I2CSendByte(wrDAdr);    //设置 器件写地址
I2CWaitAck();
if( I2CChkAck()!=I2C_MT_SLA_ACK ) 
   return I2C_ERR;
return I2C_CRR;  
}
/*--------------------------------------------------------------------
程序名称：I2C(TWI)发送 10位 器件写地址: 1111 0XX0, XXXX XXXX
程序功能：
注意事项：
提示说明：兼容 发送 7位 器件写地址: XXXX XXX0
输    入：
返    回：
--------------------------------------------------------------------*/
uchar I2C_SendWrDAdr_(uint wrDAdr) 
{
if( wrDAdr&0xF000 == 0xF000 ) //判断是否为 10位 器件地址
   if( I2C_SendWrDAdr( (uchar)wrDAdr>>8 )==I2C_ERR ) //设置 （高位）器件写地址
    return I2C_ERR;
if( I2C_SendWrDAdr( (uchar)wrDAdr )==I2C_ERR ) //设置 （低位）器件写地址
   return I2C_ERR;
return I2C_CRR;
}
/*--------------------------------------------------------------------
程序名称：I2C(TWI)发送 7位 器件读地址: XXXX XXX1
程序功能：
注意事项：
提示说明：
输    入：
返    回：
--------------------------------------------------------------------*/
uchar I2C_SendRdDAdr(uchar rdDAdr) 
{
I2CSendByte(rdDAdr);    //设置 器件读地址
I2CWaitAck();
if( I2CChkAck()!=I2C_MR_SLA_ACK ) 
   return I2C_ERR;
return I2C_CRR; 
}
/*--------------------------------------------------------------------
程序名称：I2C(TWI)发送 10位 器件读地址: 1111 0XX0, XXXX XXXX
程序功能：
注意事项：
提示说明：
输    入：
返    回：
--------------------------------------------------------------------*/
uchar I2C_SendRdDAdr_(uchar rdDAdr) 
{
if( rdDAdr&0xF000 == 0xF000 ) //判断是否为 10位 器件地址
   if( I2C_SendWrDAdr( (uchar)rdDAdr>>8 )==I2C_ERR ) //设置 （高位）器件读地址
    return I2C_ERR;
if( I2C_SendWrDAdr( (uchar)rdDAdr )==I2C_ERR ) //设置 （低位）器件读地址
   return I2C_ERR;
return I2C_CRR;
}
/*--------------------------------------------------------------------
程序名称：I2C(TWI)发送数据
程序功能：
注意事项：
提示说明：
输    入：
返    回：
--------------------------------------------------------------------*/
uchar I2C_SendDat(uchar configDat) 
{
I2CSendByte(configDat);   
I2CWaitAck();
if( I2CChkAck()!=I2C_MT_DATA_ACK ) 
   return I2C_ERR;
return I2C_CRR; 
}
/*--------------------------------------------------------------------
程序名称：I2C(TWI)接收数据且不产生应答
程序功能：
注意事项：
提示说明：
输    入：
返    回：
--------------------------------------------------------------------*/
uchar I2C_RcvNAckDat(uchar *pRdDat) 
{
I2CRcvNckByte();
I2CWaitAck();
if( I2CChkAck()!=I2C_MR_DATA_NACK )
   return I2C_ERR;
*pRdDat=TWDR;
return I2C_CRR;
}
/*--------------------------------------------------------------------
程序名称：I2C(TWI)接收数据且产生应答
程序功能：
注意事项：
提示说明：
输    入：
返    回：
--------------------------------------------------------------------*/
uchar I2C_RcvAckDat(uchar *pRdDat) 
{
I2CRcvAckByte();     
I2CWaitAck();
if( I2CChkAck()!=I2C_MR_DATA_ACK )
   return I2C_ERR;
*pRdDat=TWDR;
return I2C_CRR;
}
/*--------------------------------------------------------------------
程序名称：I2C(TWI)写器件，写一个数据
程序功能：
注意事项：
提示说明：
输    入：wrDAdr: write device-address 写器件地址
   wordAdr: word address 字地址
   dat: data 数据
返    回：
--------------------------------------------------------------------*/
uchar I2C_Write(uint wrDAdr,uchar wordAdr,uchar dat)
{
if( I2C_Start()==I2C_ERR )
   return I2C_ERR;

if( I2C_SendWrDAdr_(wrDAdr)==I2C_ERR )
   return I2C_ERR;

if( I2C_SendDat(wordAdr)==I2C_ERR )
   return I2C_ERR;

if( I2C_SendDat(dat)==I2C_ERR )
   return I2C_ERR;

I2C_Stop();

return I2C_CRR;
}
/*--------------------------------------------------------------------
程序名称：I2C(TWI)写器件，写N个数据
程序功能：
注意事项：
提示说明：
输    入：wrDAdr: write device-address 写器件地址
   wordAdr: word address 字地址
   *pWrDat: p->write data 写入数据指针
   num: number 写入数据个数
返    回：
--------------------------------------------------------------------*/
//bool I2C_Write_(uint16 wrDAdr,uint8 wordAdr,
//      uint8 *pWrDat,uint8 num)
//{
//
//} 
/*--------------------------------------------------------------------
程序名称：I2C(TWI)读器件，读一个数据
程序功能：
注意事项：
提示说明：
输    入：wrDAdr: write device-address 写器件地址
   wordAdr: word address 字地址
   rdDAdr: read device-address 读器件地址
   *pRdDat: p->read data 读取数据指针
返    回：
--------------------------------------------------------------------*/
uchar I2C_Read(uint wrDAdr,uchar wordAdr,
     uchar rdDAdr,uchar *pRdDat)
{
if( I2C_Start()==I2C_ERR )
   return I2C_ERR;

if( I2C_SendWrDAdr_(wrDAdr)==I2C_ERR )
   return I2C_ERR;

if( I2C_SendDat(wordAdr)==I2C_ERR )
   return I2C_ERR;

if( I2C_Restart()==I2C_ERR )
   return I2C_ERR;

if( I2C_SendRdDAdr(rdDAdr)==I2C_ERR )
   return I2C_ERR;

if( I2C_RcvNAckDat(pRdDat)==I2C_ERR )
   return I2C_ERR;

I2C_Stop();

return I2C_CRR;
}
/*--------------------------------------------------------------------
程序名称：I2C(TWI)读器件，读N个数据
程序功能：
注意事项：
提示说明：
输    入：wrDAdr: write device-address 写器件地址
   wordAdr: word address 字地址
   rdDAdr: read device-address 读器件地址
   *pRdDat: p->read data 读取数据指针
   num: number 读取数据个数
返    回：
--------------------------------------------------------------------*/
uchar I2C_Read_(uint wrDAdr,uchar wordAdr,
      uchar rdDAdr,uchar *pRdDat,uchar num)
{
   uchar i;

if( I2C_Start()==I2C_ERR )
   return I2C_ERR;

if( I2C_SendWrDAdr_(wrDAdr)==I2C_ERR )
   return I2C_ERR;

if( I2C_SendDat(wordAdr)==I2C_ERR )
   return I2C_ERR;

if( I2C_Restart()==I2C_ERR )
   return I2C_ERR;

if( I2C_SendRdDAdr(rdDAdr)==I2C_ERR )
   return I2C_ERR;

for(i=0;i<num-1;i++)
   if( I2C_RcvAckDat(pRdDat+i)==I2C_ERR )
    return I2C_ERR;

if( I2C_RcvNAckDat(pRdDat+i)==I2C_ERR )
    return I2C_ERR;

I2C_Stop();

return I2C_CRR;
}



 
 
