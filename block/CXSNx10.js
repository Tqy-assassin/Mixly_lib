'use strict';

goog.provide('Blockly.Blocks.X10');

goog.require('Blockly.Blocks');


Blockly.Blocks.X10.HUE = 20;
Blockly.Blocks.X10.HUE_remote= 300;
Blockly.Blocks.X10.HUE_sensor_digital = 180;
Blockly.Blocks.X10.HUE_sensor_analog = 220;
/*端口引脚定义*/
var CXSN_DIGITAL=[["Port1", "A3"],["Port2", "2"],["Port3", "3"],["Port4", "A2"],["Port5", "A1"],["Port6", "A0"]];
var CXSN_DIGITAL_Easy=[["端口一", "A3"],["端口二", "2"],["端口三", "3"],["端口四", "A2"],["端口五", "A1"],["端口六", "A0"]];
var CXSN_trackingIR=[["白", "0"],["黑", "1"]];
var CXSN_KEY=[["Port1", "A3"],["Port2", "2"],["Port3", "3"],["Port4", "A2"],["Port5", "A1"],["Port6", "A0"],["←","11"],["■","12"],["→","13"]];
var CXSN_LEDOUT=[["灭", "HIGH"],["亮", "LOW"]];
var CXSN_LEDPWM=[["Port3","3"]];
var CXSN_BUZZOUT=[["不响", "HIGH"],["响", "LOW"]];
var CXSN_MOS=[["截止", "HIGH"],["导通", "LOW"]];
var CXSN_Relay=[["释放", "HIGH"],["吸合", "LOW"]];
var CXSN_DHT11_TH=[["获取温度", "temperature"],["获取湿度", "humidity"]];
var CXSN_DS18B20_TH=[["摄氏度", "0"],["华氏度", "1"]];
var CXSN_ADC=[["Port1", "A3"],["Port4", "A2"],["Port5", "A1"],["Port6", "A0"]];
var CXSN_Record_Num = [["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"]];
var CXSN_OLED_D=[["1","1"],["2","2"],["3","3"],["4","4"]];
var CXSN_OLED_ROW=[["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"],["7","7"],["8","8"],["9","9"],["10","10"],["11","11"],["12","12"],["13","13"],["14","14"],["15","15"],["16","16"]];
var CXSN_Nixietube_T=[["Port1-T", "A3"],["Port3-T", "3"],["Port4-T", "A2"],["Port5-T", "A1"],["Port6-T", "A0"]];
var CXSN_Nixietube_R=[["Port1-R", "A4"],["Port3-R", "11"],["Port4-R", "9"],["Port5-R", "7"],["Port6-R", "5"]];
var CXSN_VSPD=[["1", "mySerial1"], ["2", "mySerial2"], ["3", "mySerial3"], ["4", "mySerial4"]];
var CXSN_SERVO=[["1","1"],["2","2"],["3","3"]];
var CXSN_SERVO_DIGITAL=[["Port1", "1"],["Port2", "2"],["Port3", "3"],["Port4", "4"],["Port5", "5"],["Port6", "6"]];
var CXSN_PM25=[["Port4", "A2"],["Port5", "A1"],["Port6", "A0"]];
var CXSN_XPMotor=[["Port4", "9"],["Port5", "7"],["Port6", "5"]];
var CXSN_XPMotor_PWM=[["Port4", "9"],["Port6", "5"]];
var CXSN_XPMotor_TH=[["正转", "HIGH"],["反转", "LOW"],["停止", "STOP"]];
var CXSN_XPMotor_TH_PWM=[["正转", "HIGH"],["反转", "LOW"]];
var CXSN_WIFI=[["Port2", "2"]];
var CXSN_WIFI_led=[["灯一", "varR_LED_ONOFF"],["灯二","varR_LED_ONOFF1"],["灯三","varR_LED_ONOFF2"],["MOS一", "varR_PMOS1"],["MOS二","varR_PMOS2"]];
var CXSN_WIFI_rgbparam=[["亮度","varR_xRGB"],["红","varR_xRGB_rad"],["绿", "varR_xRGB_green"],["蓝", "varR_xRGB_blue"]];
var CXSN_WIFI_rgbnum=[["一", "1"],["二","2"]];
var CXSN_WIFI_onoff=[["开", "1"],["关","0"]];
var CXSN_WIFI_readonly=[["模拟值","varW_ADC_1"],["当前温度","varW_Humiture1"],["当前湿度","varW_Humiture2"],["当前空气质量","varW_PM25"],["提醒一","varW_remind1"],["提醒二","varW_remind2"],["提醒三","varW_remind3"],["提醒四","varW_remind4"]];
//入门简易汉化版
/*延时easy*/
Blockly.Blocks.Delay_Easy_S =  {
  init: function() {
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Delay_Easy_S_CON);
    this.appendValueInput('delay_num')
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Delay_Easy_S_CON1);      
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(340);
}
};
/*LED模块easy*/
Blockly.Blocks.LED_Easy = {
  init: function() {
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_LED_YJ_CON)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL_Easy), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_XX)
    .appendTitle(new Blockly.FieldDropdown(CXSN_LEDOUT), "OUT_NUM");       
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(360);
}
};
/**************************************************************************************************************************************/
/*基本模块*/
/*LED模块*/
Blockly.Blocks.LED_CON = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_LED_YJ_CON)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_XX)
    .appendTitle(new Blockly.FieldDropdown(CXSN_LEDOUT), "OUT_NUM");       
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

}
};
/*LEDPWM输出*/
Blockly.Blocks.LED_PWM_CON =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.LED_PWM_A)
    .appendField(new Blockly.FieldDropdown(CXSN_LEDPWM), "PIN")
    .appendTitle(Blockly.LED_PWM_B);
    this.appendValueInput('num1')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*LED调光电位器引脚*/
Blockly.Blocks.LEDPWM_CON_IN = { 
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_SEIN)
    .appendTitle(new Blockly.FieldDropdown(CXSN_ADC), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*LED调光输出引脚*/
Blockly.Blocks.LEDPWM_CON_OUT = {  
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_LEDOUT)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN1"); 
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*按键模块*/
Blockly.Blocks.key_Reading =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_KEY)
    .appendTitle(new Blockly.FieldDropdown(CXSN_KEY), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*电位器模块*/
Blockly.Blocks.RP_Reading =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_RP)
    .appendTitle(new Blockly.FieldDropdown(CXSN_ADC), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*蜂鸣器模块*/
Blockly.Blocks.BUZZ_CON = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_BUZZ_YJ_CON)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_BUZZ_XX)
    .appendTitle(new Blockly.FieldDropdown(CXSN_BUZZOUT), "OUT_NUM");       
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*热释电模块*/
Blockly.Blocks.RSD_Reading =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_RSD)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*DHT11 - 温湿度传感器*/
Blockly.Blocks.DHT11_CON = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_DHT11_PORT)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_DHT11_XX)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DHT11_TH), "PIN1");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setColour(150);
}
};
/*DS18B20传感器*/
Blockly.Blocks.DS18B20_CON = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_DS18B20_PORT)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_DS18B20_XX)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DS18B20_TH), "PIN1");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setColour(150);
}
};
/*水浊检测模块*/
Blockly.Blocks.WaterTurbidity_Reading =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_WaterTurbidity_Reading)
    .appendTitle(new Blockly.FieldDropdown(CXSN_ADC), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*雨滴检测模块*/
Blockly.Blocks.Raindrop_Reading =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Raindrop_Reading)
    .appendTitle(new Blockly.FieldDropdown(CXSN_ADC), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*土壤湿度检测模块*/
Blockly.Blocks.SoilMoisture_Reading =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_SoilMoisture_Reading)
    .appendTitle(new Blockly.FieldDropdown(CXSN_ADC), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*声音传感器*/
Blockly.Blocks.SoundDetection_Reading=  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_SoundDetection)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_KEY);
    this.setColour(100);
}
};
/*红外灰度模块*/
Blockly.Blocks.CXSN_IR_Gray =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_IR_Gray)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*火焰检测D*/
Blockly.Blocks.Flame_Reading_D =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_Flame_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*火焰检测A*/
Blockly.Blocks.Flame_Reading_A =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_Flame_A)
    .appendTitle(new Blockly.FieldDropdown(CXSN_ADC), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*烟雾检测D*/
Blockly.Blocks.Smog_Reading_D =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_Smog_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*烟雾检测A*/
Blockly.Blocks.Smog_Reading_A =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_Smog_A)
    .appendTitle(new Blockly.FieldDropdown(CXSN_ADC), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*RGB模块*/
Blockly.Blocks.CXSNX10_RGB_Port1 = {

  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_Port1)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*RGB模块参数设置*/
Blockly.Blocks.CXSNX10_RGB_Color =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_ld);
    this.appendValueInput("num1", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_R);
    this.appendValueInput('num2')
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_G);
    this.appendValueInput('num3')
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_B);
    this.appendValueInput('num4')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

/*RGB灯带*/
Blockly.Blocks.CXSNX10_RGB_Port2 = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_Port2)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB1);
    this.appendValueInput('num1')
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB2);
    this.appendValueInput('num2')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*RGB灯带位号及灯色*/
Blockly.Blocks.CXSNX10_RGB_Parameter =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_Port2)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_num);
    this.appendValueInput("num1", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_R);
    this.appendValueInput('num2')
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_G);
    this.appendValueInput('num3')
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_B);
    this.appendValueInput('num4')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*MP3播放模块*/
/*MP3端口设置--新款*/
Blockly.Blocks.CXSNX10_MP3_Port =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MP3_Port)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_MP3_Port_A)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*播放*/
Blockly.Blocks.CXSNX10_MP3_Play = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MP3_Play)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_MP3_Play_A);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*暂停*/
Blockly.Blocks.CXSNX10_MP3_Pause = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MP3_Pause)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_MP3_Pause_A);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*上一曲*/
Blockly.Blocks.CXSNX10_MP3_Previous = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MP3_Previous)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_MP3_Previous_A);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*下一曲*/
Blockly.Blocks.CXSNX10_MP3_Next = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MP3_Next)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_MP3_Next_A);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*MP3端口设置--旧款*/
Blockly.Blocks.CXSNX10_JMP3_Port =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MP3_Port)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_MP3_Port_A)            
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*播放*/
Blockly.Blocks.CXSNX10_JMP3_Play = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MP3_Play)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_MP3_Play_A);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*暂停*/
Blockly.Blocks.CXSNX10_JMP3_Pause = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MP3_Pause)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_MP3_Pause_A);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*上一曲*/
Blockly.Blocks.CXSNX10_JMP3_Previous = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MP3_Previous)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_MP3_Previous_A);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*下一曲*/
Blockly.Blocks.CXSNX10_JMP3_Next = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MP3_Next)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_MP3_Next_A);       
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*MOS驱动模块*/
Blockly.Blocks.CXSNX10_MOS_CON = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MOS_CON)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MOS_XX)
    .appendTitle(new Blockly.FieldDropdown(CXSN_MOS), "OUT_NUM");       
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*MOS驱动模块PWM*/
Blockly.Blocks.CXSNX10_MOS_CON_PWM =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_MOS_CON)
    .appendField(new Blockly.FieldDropdown(CXSN_LEDPWM), "PIN")
    .appendTitle(Blockly.CXSN_MOS_XX_PWM);
    this.appendValueInput('num1')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*电机模块*/
/*小颗粒大颗粒电机*/
Blockly.Blocks.XPMotor_CON = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_XPMotor_PORT)
    .appendTitle(new Blockly.FieldDropdown(CXSN_XPMotor), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_XPMotor_XX)
    .appendTitle(new Blockly.FieldDropdown(CXSN_XPMotor_TH), "PIN1");       
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*小颗粒大颗粒电机调速*/
Blockly.Blocks.XPMotor_CON_PWM = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_XPMotor_PORT)
    .appendTitle(new Blockly.FieldDropdown(CXSN_XPMotor_PWM), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_XPMotor_XX_PWM)
    .appendTitle(new Blockly.FieldDropdown(CXSN_XPMotor_TH_PWM), "PIN1")
    .appendTitle(Blockly.CXSN_XPMotor_XX_PWM_NUM);   
    this.appendValueInput('num')
    .setCheck(Number);      
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*电机模块端口设置*/
Blockly.Blocks.CXSNX10_Motor_Port =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Motor_Port)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_Motor_Port_A)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*电机1*/
Blockly.Blocks.CXSNX10_Motor_1 =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Motor1_rpm)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_Motor1_rpm_A);
    this.appendValueInput('num')
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Motor1_Direction);        
    this.appendValueInput('num1')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*电机2*/
Blockly.Blocks.CXSNX10_Motor_2 =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Motor2_rpm)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_Motor2_rpm_A);
    this.appendValueInput('num')
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Motor2_Direction);        
    this.appendValueInput('num1')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*电机模块结束*/
/*舵机模块*/
Blockly.Blocks.CXSNX10_Servo = {
  init: function() {
    this.appendDummyInput("")
    .appendField(Blockly.CXSN_Servo_Port)
    .appendField(new Blockly.FieldDropdown(CXSN_SERVO_DIGITAL), "PIN")
    .appendField(Blockly.CXSN_Servo_Pin)
    .appendField(new Blockly.FieldDropdown(CXSN_SERVO), "PIN1");
    this.appendValueInput('num')
    .setCheck(Number)
    .appendField(Blockly.CXSN_Servo_second);
    this.appendValueInput('num1')
    .setCheck(Number)
    .appendField(Blockly.CXSN_Servo_delay);
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(100);
    this.setHelpUrl('');
}
};
/*舵机模块结束*/
/*环境光检测D*/
Blockly.Blocks.Photosensitive_Reading_D =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_Photosensitive_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*环境光检测A*/
Blockly.Blocks.Photosensitive_Reading_A =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_Photosensitive_A)
    .appendTitle(new Blockly.FieldDropdown(CXSN_ADC), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*pm2.5检测模块*/
Blockly.Blocks.CXSN10_PM25_Port =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_PM25)
    .appendTitle(new Blockly.FieldDropdown(CXSN_PM25), "PIN");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    //this.setTooltip(Blockly.CXSN_PYMR_PM25);/*鼠标放在图形上面显示的注释*/
    this.setColour(200);
}
};
/*---------------------------------------*/
Blockly.Blocks.CXSN10_PM25_Reading =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_READING_PM25)
    .appendTitle(new Blockly.FieldDropdown(CXSN_PM25), "PIN");       
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //this.setTooltip(Blockly.CXSN_PYMR_PM25);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*pm2.5返回函数数据*/
Blockly.Blocks.CXSN10_PM25_return =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle("")
    .appendTitle(new Blockly.FieldTextInput("PMdata"), "VAR");       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    //this.setTooltip(Blockly.CXSN_PYMR_PM25);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*超声波模块*/
Blockly.Blocks.CXSNX10_Ultrasonic_CON = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Ultrasonic_CON)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Ultrasonic_XX);      
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(100);
}
};
/*继电器驱动模块*/
Blockly.Blocks.CXSNX10_Relay_CON = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Relay_CON)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Relay_XX)
    .appendTitle(new Blockly.FieldDropdown(CXSN_Relay), "OUT_NUM");       
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*多路语音模块*/
/*多路语音端口设定*/
Blockly.Blocks.CXSNX10_Record_Port =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Record_Port)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_Record_Port_A)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*开始录音*/
Blockly.Blocks.CXSNX10_Record_Start =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Record_Start)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_Record_Start_A);
    this.appendValueInput('record_num1')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*停止录音*/
Blockly.Blocks.CXSNX10_Record_SuspendRecord = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Record_SuspendRecord)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_Record_SuspendRecord_A);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*开始播放*/
Blockly.Blocks.CXSNX10_Record_Play = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Record_Play)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_Record_Play_A);
    this.appendValueInput('record_num2')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*结束播放*/
Blockly.Blocks.CXSNX10_Record_PlayPause = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Record_PlayPause)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_Record_PlayPause_A);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*多路语音录放模块结束*/
/*OLED/数码显示模块*/
/*oled显示英文字符串*/
Blockly.Blocks.CXSNX10_OLED_EN = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_OLED);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_OLED_D), "PIN1");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_ROW)
    .appendTitle(Blockly.CXSN_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_OLED_ROW), "PIN2");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Place)
    .appendField(Blockly.CXSN_STR); 
    this.appendValueInput('Text')
    .setCheck(String);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*oled显示数字*/
Blockly.Blocks.CXSNX10_OLED_Num = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_OLED);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_OLED_D), "PIN1");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_ROW)
    .appendTitle(Blockly.CXSN_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_OLED_ROW), "PIN2");
    this.appendValueInput('num')
    .setCheck(Number)
    .appendTitle(Blockly.CXSN_Place)
    .appendTitle(Blockly.CXSN_Num);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*oled清屏*/
Blockly.Blocks.CXSNX10_OLED_Eliminate = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_OLED_Eliminate);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*数码管显示数字*/
Blockly.Blocks.CXSNX10_Nixietube_Port1 = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Nixietube_Port)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_Nixietube_Port_A)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Nixietube_Show);
    this.appendValueInput('num')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*数码管倒计时显示*/
Blockly.Blocks.CXSNX10_Nixietube_Port2 = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Nixietube_D1)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_Nixietube_D1_A)
    .appendTitle(new Blockly.FieldDropdown(CXSN_Nixietube_T), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Nixietube_D2)
    .appendTitle(new Blockly.FieldDropdown(CXSN_Nixietube_R), "PIN1");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Nixietube_D3);
    this.appendValueInput('num')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*数码管时钟显示*/
Blockly.Blocks.CXSNX10_Nixietube_Clock = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_D1)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_D2);
    this.appendValueInput('num1')
    .setCheck(Number);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_D3);
    this.appendValueInput('num2')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
Blockly.Blocks.CXSNX10_Clock_Hour_Port =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_Hour_Port)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PINjia");      
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);
}
};
Blockly.Blocks.CXSNX10_Clock_Minute_Port =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_Minute_Port)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PINjian");     
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);
}
};
Blockly.Blocks.CXSNX10_Clock_Setup_Port =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_Setup_Port)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PINstopstar");    
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);
}
};

Blockly.Blocks.CXSNX10_Clock_Hour_Setup= {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_Hour_Setup);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
Blockly.Blocks.CXSNX10_Clock_Minute_Setup= {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_Minute_Setup);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
Blockly.Blocks.CXSNX10_Clock_OK_Setup= {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_OK_Setup);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
Blockly.Blocks.CXSNX10_Clock_Hour_OK= {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_Hour_OK);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
Blockly.Blocks.CXSNX10_Clock_Minute_OK= {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_Minute_OK);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
Blockly.Blocks.CXSNX10_Clock_Setup_OK= {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Clock_Setup_OK);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*遥控器*/
//红外接收模块
Blockly.Blocks.CXSNX10_IR_mini = {
    init: function() {
      this.setColour(Blockly.Blocks.X10.HUE_remote);
      this.appendDummyInput()
      .appendField(Blockly.CXSN_IR_RECEIVE)
      .appendField(new Blockly.FieldTextInput('ir_item'), 'VAR');
      this.appendDummyInput("")
      .appendTitle(Blockly.CXSN_IR_RECEIVE_VAL)
      .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");  
      this.appendStatementInput('DO')
      .appendField(Blockly.CXSN_IR_YES);
      this.appendStatementInput('DO2')
      .appendField(Blockly.CXSN_IR_NO);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
      this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
  },
  getVars: function() {
      return [this.getFieldValue('VAR')]; },
      renameVar: function(oldName, newName) {
          if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};
//红外mini遥控器键值
var CXSN_IR=[  
[{'src': '../../media/cxsnrobot/cxsn_ir/cxsnir_pow.png',         'width': 32, 'height': 32, 'alt': 'cxsnir_pow'},         '0xFFA25D'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_menu.png',        'width': 32, 'height': 32, 'alt': 'cxsnir_menu'},        '0xFFE21D'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_test.png',        'width': 32, 'height': 32, 'alt': 'cxsnir_test'},        '0xFF22DD'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_+.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_+'},           '0xFF02FD'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_back.png',        'width': 32, 'height': 32, 'alt': 'cxsnir_back'},        '0xFFC23D'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_rewind.png',      'width': 32, 'height': 32, 'alt': 'cxsnir_rewind'},      '0xFFE01F'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_play.png',        'width': 32, 'height': 32, 'alt': 'cxsnir_play'},        '0xFFA857'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_fastForward.png', 'width': 32, 'height': 32, 'alt': 'cxsnir_fastForward'}, '0xFF906F'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_0.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_0'},           '0xFF6897'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_-.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_-'},           '0xFF9867'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_c.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_c'},           '0xFFB04F'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_1.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_1'},           '0xFF30CF'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_2.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_2'},           '0xFF18E7'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_3.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_3'},           '0xFF7A85'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_4.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_4'},           '0xFF10EF'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_5.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_5'},           '0xFF38C7'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_6.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_6'},           '0xFF5AA5'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_7.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_7'},           '0xFF42BD'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_8.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_8'},           '0xFF4AB5'],
[{'src': '../../media/CXSNrobot/cxsn_ir/cxsnir_9.png',           'width': 32, 'height': 32, 'alt': 'cxsnir_9'},           '0xFF52AD'],
];
Blockly.Blocks.CXSNX10_IR_val = {
    init: function() {
      this.setColour(Blockly.Blocks.X10.HUE_remote);
      this.appendDummyInput()
      .appendField(Blockly.CXSN_IR_VAL_ZH)
      .appendField(new Blockly.FieldDropdown(CXSN_IR), 'VAL');
      this.setOutput(true, Number);
      this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
  }
};
//红外遥控器键值
var CXSN_RemoteID=[  
[{'src': '../../media/cxsnrobot/cxsn_remote/cxsn_remote_9.png',         'width': 64, 'height': 16, 'alt': 'cxsn_remote_9'},         '0x88'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_10.png',        'width': 64, 'height': 16, 'alt': 'cxsn_remote_10'},        '0x48'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_11.png',        'width': 64, 'height': 16, 'alt': 'cxsn_remote_11'},        '0xC8'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_12.png',        'width': 64, 'height': 16, 'alt': 'cxsn_remote_12'},        '0x28'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_13.png',        'width': 64, 'height': 16, 'alt': 'cxsn_remote_13'},        '0xA8'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_14.png',        'width': 64, 'height': 16, 'alt': 'cxsn_remote_14'},        '0x68'],
];
var CXSN_RemoteVAL=[  
[{'src': '../../media/cxsnrobot/cxsn_remote/cxsn_remote_1.png',        'width': 32, 'height': 32, 'alt': 'cxsn_remote_1'},        'FF857A'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_2.png',        'width': 32, 'height': 32, 'alt': 'cxsn_remote_2'},        'FF45BA'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_3.png',        'width': 32, 'height': 32, 'alt': 'cxsn_remote_3'},        'FFC53A'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_4.png',        'width': 32, 'height': 32, 'alt': 'cxsn_remote_4'},        'FF25DA'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_5.png',        'width': 32, 'height': 32, 'alt': 'cxsn_remote_5'},        'FF8D72'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_6.png',        'width': 32, 'height': 32, 'alt': 'cxsn_remote_6'},        'FF4DB2'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_7.png',        'width': 32, 'height': 32, 'alt': 'cxsn_remote_7'},        'FFCD32'],
[{'src': '../../media/CXSNrobot/cxsn_remote/cxsn_remote_8.png',        'width': 32, 'height': 32, 'alt': 'cxsn_remote_8'},        'FF2DD2'],
];
Blockly.Blocks.CXSNX10_Remote_val = {
    init: function() {
      this.setColour(Blockly.Blocks.X10.HUE_remote);
      this.appendDummyInput()
      .appendField(Blockly.CXSN_Remote_ID)
      .appendField(new Blockly.FieldDropdown(CXSN_RemoteID), 'VAL')
      .appendField(Blockly.CXSN_Remote_VAL)
      .appendField(new Blockly.FieldDropdown(CXSN_RemoteVAL), 'VAL1');
      this.setOutput(true, Number);
      this.setTooltip(Blockly.MIXLY_IR_RECIEVE_TOOLTIP);
  }
};

//ps2遥控接收
/*PS2接收端口*/
Blockly.Blocks.CXSNX10_PS2_Port =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE_remote);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_PS2_Port)
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_PS2_Port_A)
    .appendTitle(new Blockly.FieldDropdown(CXSN_DIGITAL), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*有数据可读吗*/
Blockly.Blocks.CXSNX10_PS2_Read =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE_remote);
    this.appendDummyInput("")
    .appendTitle("")
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_PS2_Read);       
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_Z_PS2_Read);/*鼠标放在图形上面显示的注释*/
}
};
/*读取字符串*/
Blockly.Blocks.CXSNX10_PS2_Reading =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE_remote);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(CXSN_VSPD), "CXSN_Serial")
    .appendTitle(Blockly.CXSN_PS2_Reading);      
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_z_PS2_Reading);/*鼠标放在图形上面显示的注释*/
}
};
/*PS2按键*/
var CXSN_PS2_KEY=[  
[{'src': '../../media/cxsnrobot/cxsn_ps2/cxsn_ps2_up.png',         'width': 32, 'height': 32, 'alt': 'cxsn_ps2_up'},         '"CXA1"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_left.png',       'width': 32, 'height': 32, 'alt': 'cxsn_ps2_left'},       '"CXA3"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_right.png',      'width': 32, 'height': 32, 'alt': 'cxsn_ps2_right'},      '"CXA4"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_down.png',       'width': 32, 'height': 32, 'alt': 'cxsn_ps2_down'},       '"CXA2"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_triangle.png',   'width': 32, 'height': 32, 'alt': 'cxsn_ps2_triangle'},   '"CXB1"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_square.png',     'width': 32, 'height': 32, 'alt': 'cxsn_ps2_square'},     '"CXB3"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_circle.png',     'width': 32, 'height': 32, 'alt': 'cxsn_ps2_circle'},     '"CXB4"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_cross.png',      'width': 32, 'height': 32, 'alt': 'cxsn_ps2_cross'},      '"CXB2"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_select.png',     'width': 32, 'height': 32, 'alt': 'cxsn_ps2_select'},     '"CXC1"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_start.png',      'width': 32, 'height': 32, 'alt': 'cxsn_ps2_start'},      '"CXC2"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_l1.png',         'width': 32, 'height': 32, 'alt': 'cxsn_ps2_l1'},         '"CXL1"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_l2.png',         'width': 32, 'height': 32, 'alt': 'cxsn_ps2_l2'},         '"CXL2"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_r1.png',         'width': 32, 'height': 32, 'alt': 'cxsn_ps2_r1'},         '"CXR1"'],
[{'src': '../../media/CXSNrobot/cxsn_ps2/cxsn_ps2_r2.png',         'width': 32, 'height': 32, 'alt': 'cxsn_ps2_r2'},         '"CXR2"'],
];
Blockly.Blocks.CXSNX10_PS2_Readnum = {
    init: function() {
      this.setColour(Blockly.Blocks.X10.HUE_remote);
      this.appendDummyInput()
      .appendField(Blockly.CXSN_PS2_KEY_VAL)
      .appendField(new Blockly.FieldDropdown(CXSN_PS2_KEY), 'VAL');
      this.setOutput(true, Number);
      this.setTooltip(Blockly.CXSN_z_PS2_KEY_VAL);
  }
};
/*-------------------------------------------------------------------------------------------------------------------------*/   
/*-------------------------------------------------------------------------------------------------------------------------*/   
/*-------------------------------------------------------------------------------------------------------------------------*/   
/*-------------------------------------------------------------------------------------------------------------------------*/   
/*-------------------------------------------------------------------------------------------------------------------------*/   
/*oled显示英文字符串*/
Blockly.Blocks.CXSN_OLED_String = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_OLED);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_OLED_D), "PIN1");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_ROW)
    .appendTitle(Blockly.CXSN_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_OLED_ROW), "PIN2");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_Place)
    .appendField(Blockly.CXSN_STR); 
    this.appendValueInput('Text')
    .setCheck(String);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*oled显示数字*/
Blockly.Blocks.CXSN_OLED_Num = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_OLED);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_OLED_D), "PIN1");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_ROW)
    .appendTitle(Blockly.CXSN_D)
    .appendTitle(new Blockly.FieldDropdown(CXSN_OLED_ROW), "PIN2");
    this.appendValueInput('num')
    .setCheck(Number)
    .appendTitle(Blockly.CXSN_Place)
    .appendTitle(Blockly.CXSN_Num);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*oled清屏*/
Blockly.Blocks.CXSN_OLED_Cls = {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_OLED_Eliminate);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};
/*wifi模块*/
Blockly.Blocks.CXSNX10_wifi_val =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSNX_wifi_val)
    .appendTitle(new Blockly.FieldDropdown(CXSN_WIFI), "PIN");       
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350);
}
};
/*WIFIled*/
Blockly.Blocks.CXSNX10_wifi_onoff =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_wifi_onoff)
    .appendTitle(new Blockly.FieldDropdown(CXSN_WIFI_led), "PIN");    
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_wifi_app)
    .appendTitle(new Blockly.FieldDropdown(CXSN_WIFI_onoff), "PIN1");   
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(350);
}
};
/*WIFIrgb*/
Blockly.Blocks.CXSNX10_wifi_rgb =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_wifi_rgb)
    .appendTitle(new Blockly.FieldDropdown(CXSN_WIFI_rgbparam), "PIN");   
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_wifi_rgbnum)
    .appendTitle(new Blockly.FieldDropdown(CXSN_WIFI_rgbnum), "PIN1");  
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.CXSN_PYMR_RP);/*鼠标放在图形上面显示的注释*/
    this.setColour(350);
}
};
/*wifireadonly*/
Blockly.Blocks.CXSNX10_wifi_readonly =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_wifi_readonly)
    .appendField(new Blockly.FieldDropdown(CXSN_WIFI_readonly), "PIN")
    .appendTitle(Blockly.CXSN_wifi_app);
    this.appendValueInput('num1')
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350);
}
};
/*循迹模块三路端口*/
Blockly.Blocks.CXSNX10_trackingIR_val1 =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSNX_trackingIR_val1)
    .appendTitle(new Blockly.FieldDropdown(CXSN_WIFI), "PIN");       
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(275);
}
};
/*循迹模块三路参数*/
Blockly.Blocks.CXSNX10_trackingIR_1 =  {
  init: function() {
    this.setColour(Blockly.Blocks.X10.HUE);
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSNX_trackingIR_1);
    this.appendDummyInput("")  
    .appendTitle(Blockly.CXSN_RGB_Left)
    .appendTitle(new Blockly.FieldDropdown(CXSN_trackingIR), "PIN1");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_Middle)
    .appendTitle(new Blockly.FieldDropdown(CXSN_trackingIR), "PIN2");
    this.appendDummyInput("")
    .appendTitle(Blockly.CXSN_RGB_Right)
    .appendTitle(new Blockly.FieldDropdown(CXSN_trackingIR), "PIN3");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setColour(275);
}
};
