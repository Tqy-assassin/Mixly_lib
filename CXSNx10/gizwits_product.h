/**
************************************************************
* @file         gizwits_product.h
* @brief        Header file corresponding to gizwits_product.c (product hardware , software version definitions)
* @author       Gizwits
* @date         2017-08-01
* @version      V03030000
* @copyright    Gizwits
* 
* @note         机智云.只为智能硬件而生
*               Gizwits Smart Cloud  for Smart Products
*               链接|增值ֵ|开放|中立|安全|自有|自由|生态
*               www.gizwits.com
*
***********************************************************/
#ifndef _GIZWITS_PRODUCT_H
#define _GIZWITS_PRODUCT_H

#include <stdint.h>
#include "gizwits_protocol.h"


/**@} */
/**
* MCU Soft Version
*/
#define SOFTWARE_VERSION "03030000"
/**
* MCU Hardware Version
*/
#define HARDWARE_VERSION "03010000"

/**@name Device status data reporting interval time macro definition
* @{
*/
#define REPORT_TIME_MAX 6000 //6S
/**@} */

#pragma pack(1)
typedef struct {
  uint8_t flagWifi_softap:1;
  uint8_t flagWifi_airlink:1;
  uint8_t flagWifi_station:1;
  uint8_t flagWifi_con_router:1;
  uint8_t flagWifi_discon_router:1;
  uint8_t flagWifi_con_m2m:1;
  uint8_t flagWifi_discon_m2m:1;
} wifiStatueFlags_t;

typedef enum
{
  VALUE_LED_ONOFF,
  VALUE_LED_ONOFF1,
  VALUE_LED_ONOFF2,
  VALUE_PMOS1,
  VALUE_PMOS2,
  VALUE_xRGB1,
  VALUE_xRGB_rad1,
  VALUE_xRGB_green1,
  VALUE_xRGB_blue1,
  VALUE_yRGB2,
  VALUE_yRGB_rad2,
  VALUE_yRGB_green2,
  VALUE_yRGB_blue2,
  VALUE_remind1,
  VALUE_remind2,
  VALUE_remind3,
  VALUE_remind4,
  VALUE_ADC_1,
  VALUE_Humiture1,
  VALUE_Humiture2,
  VALUE_PM25,
  VALUE_TYPE_MAX
} VALUE_TYPE_T;
#pragma pack()

void mcuRestart(void);
int32_t uartWrite(uint8_t *buf, uint32_t len);

#endif