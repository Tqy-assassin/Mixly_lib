/**
************************************************************
* @file         gizwits_product.c
* @brief        Control protocol processing and platform related hardware initialization
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
#include <stdio.h>
#include <string.h>
#include "gizwits_product.h"
#include "gizwits_protocol.h"

/**@name Gizwits Interface
* @{
*/

extern dataPoint_t currentDataPoint;
attrFlags_t attrFlags;
extern wifiStatueFlags_t wifiStatueFlags;

/**@name Gizwits User Interface
* @{
*/

/**
* @brief Event handling interface

* Description:

* 1. Users can customize the changes in WiFi module status

* 2. Users can add data points in the function of event processing logic, such as calling the relevant hardware peripherals operating interface

* @param [in] info: event queue
* @param [in] data: protocol data
* @param [in] len: protocol data length
* @return NULL
* @ref gizwits_protocol.h
*/
int8_t gizwitsEventProcess(eventInfo_t *info, uint8_t *data, uint32_t len)
{
  uint8_t i = 0;
  dataPoint_t *dataPointPtr = (dataPoint_t *)data;
  moduleStatusInfo_t *wifiData = (moduleStatusInfo_t *)data;
  protocolTime_t *ptime = (protocolTime_t *)data;

  if((NULL == info) || (NULL == data))
  {
    return -1;
  }

  for(i=0; i<info->num; i++)
  {
    switch(info->event[i])
    {
      case EVENT_LED_ONOFF:
        currentDataPoint.valueLED_ONOFF = dataPointPtr->valueLED_ONOFF;
        attrFlags.flagLED_ONOFF = 1;
        break;
      case EVENT_LED_ONOFF1:
        currentDataPoint.valueLED_ONOFF1 = dataPointPtr->valueLED_ONOFF1;
        attrFlags.flagLED_ONOFF1 = 1;
        break;
      case EVENT_LED_ONOFF2:
        currentDataPoint.valueLED_ONOFF2 = dataPointPtr->valueLED_ONOFF2;
        attrFlags.flagLED_ONOFF2 = 1;
        break;
      case EVENT_PMOS1:
        currentDataPoint.valuePMOS1 = dataPointPtr->valuePMOS1;
        attrFlags.flagPMOS1 = 1;
        break;
      case EVENT_PMOS2:
        currentDataPoint.valuePMOS2 = dataPointPtr->valuePMOS2;
        attrFlags.flagPMOS2 = 1;
        break;


      case EVENT_xRGB1:
        currentDataPoint.valuexRGB1 = dataPointPtr->valuexRGB1;
        attrFlags.flagxRGB1 = 1;
        //user handle
        break;
      case EVENT_xRGB_rad1:
        currentDataPoint.valuexRGB_rad1 = dataPointPtr->valuexRGB_rad1;
        attrFlags.flagxRGB_rad1 = 1;
        //user handle
        break;
      case EVENT_xRGB_green1:
        currentDataPoint.valuexRGB_green1 = dataPointPtr->valuexRGB_green1;
        attrFlags.flagxRGB_green1 = 1;
        //user handle
        break;
      case EVENT_xRGB_blue1:
        currentDataPoint.valuexRGB_blue1 = dataPointPtr->valuexRGB_blue1;
        attrFlags.flagxRGB_blue1 = 1;
        //user handle
        break;
      case EVENT_yRGB2:
        currentDataPoint.valueyRGB2 = dataPointPtr->valueyRGB2;
        attrFlags.flagyRGB2 = 1;
        //user handle
        break;
      case EVENT_yRGB_rad2:
        currentDataPoint.valueyRGB_rad2 = dataPointPtr->valueyRGB_rad2;
        attrFlags.flagyRGB_rad2 = 1;
        //user handle
        break;
      case EVENT_yRGB_green2:
        currentDataPoint.valueyRGB_green2 = dataPointPtr->valueyRGB_green2;
        attrFlags.flagyRGB_green2 = 1;
        //user handle
        break;
      case EVENT_yRGB_blue2:
        currentDataPoint.valueyRGB_blue2 = dataPointPtr->valueyRGB_blue2;
        attrFlags.flagyRGB_blue2 = 1;
        //user handle
        break;


      case WIFI_SOFTAP:
        wifiStatueFlags.flagWifi_softap = 1;
        break;
      case WIFI_AIRLINK:
        wifiStatueFlags.flagWifi_airlink = 1;
        break;
      case WIFI_STATION:
        wifiStatueFlags.flagWifi_station = 1;
        break;
      case WIFI_CON_ROUTER:
        wifiStatueFlags.flagWifi_con_router = 1;
        break;
      case WIFI_DISCON_ROUTER:
        wifiStatueFlags.flagWifi_discon_router = 1;
        break;
      case WIFI_CON_M2M:
        wifiStatueFlags.flagWifi_con_m2m = 1;
        break;
      case WIFI_DISCON_M2M:
        wifiStatueFlags.flagWifi_discon_m2m = 1;
        break;
      case WIFI_RSSI:
        break;
      case TRANSPARENT_DATA:
        break;
      case WIFI_NTP:

        //GIZWITS_LOG("WIFI_NTP : [%d-%d-%d %02d:%02d:%02d][%d] \n",ptime->year,ptime->month,ptime->day,ptime->hour,ptime->minute,ptime->second,ptime->ntp);

        break;
      default:
        break;
    }
  }

  return 0;
}




/**
* @brief MCU Restart

* @param none
* @return none
*/
void mcuRestart(void)
{

}
