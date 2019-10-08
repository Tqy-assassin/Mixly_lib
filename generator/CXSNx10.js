'use strict';

goog.provide('Blockly.Arduino.X10');

goog.require('Blockly.Arduino');

//入门简易汉化版
/*延时easy*/
Blockly.Arduino.Delay_Easy_S = function() {
  var delay_num = Blockly.Arduino.valueToCode(this, 'delay_num', Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  var delay_num1
  delay_num1 = delay_num * 1000;
  var code = 'delay(' + delay_num1 + ');\n';
  return code;
};
/*LED控制easy*/
Blockly.Arduino.LED_Easy = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var modle = this.getTitleValue('OUT_NUM');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);\n  digitalWrite(' + dropdown_pin + ',HIGH);\n'
  var code = 'digitalWrite(' + dropdown_pin + ',' + modle + ');\n';
  return code;
};
/*********************************************************************************************************************************************************************************/
/*LED控制*/
Blockly.Arduino.LED_CON = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var modle = this.getTitleValue('OUT_NUM');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);\ndigitalWrite(' + dropdown_pin + ',HIGH);\n'
  var code = 'digitalWrite(' + dropdown_pin + ',' + modle + ');\n';
  return code;
};
/*LEDpwm*/
Blockly.Arduino.LED_PWM_CON = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var num1 = Blockly.Arduino.valueToCode(this, 'num1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var num;
  if (num1 > 255)
  {
    num1 = 255;
  }
  if (num1 < 1)
  {
    num1 = 0;
  }

  num = 255 - num1;

  var code = 'analogWrite(' + dropdown_pin + ',' + num + ');\n';
  return code;
};
/*LED调光电位器引脚*/
Blockly.Arduino.LEDPWM_CON_IN = function() {
  var dropdown_pin_IN = this.getTitleValue('PIN');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h> '  ;
  Blockly.Arduino.definitions_['define_"record_setup'] = 'int sensorValue=0;';
  var code = 'sensorValue = analogRead(' + dropdown_pin_IN + ');\n';
  return code;
};
/*LED调光输出引脚*/
Blockly.Arduino.LEDPWM_CON_OUT = function() {
  var dropdown_pin_OUT = this.getTitleValue('PIN1');
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin_OUT] = 'pinMode(' + dropdown_pin_OUT + ', OUTPUT);\n'
  + '  digitalWrite(' + dropdown_pin_OUT + ',HIGH);\n'
  var code = 'if(sensorValue>=1000)\n'
  + '{\n'
  + '  digitalWrite(' + dropdown_pin_OUT + ',LOW);\n'
  + '}\n'
  + 'if(sensorValue<20)\n'
  + '{\n'
  + '  digitalWrite(' + dropdown_pin_OUT + ',HIGH);\n'
  + '}\n'
  + 'if(sensorValue>50&&sensorValue<1000)\n'
  + '{\n'
  + '  digitalWrite(' + dropdown_pin_OUT + ',LOW);\n'
  + '  delayMicroseconds(sensorValue);\n'
  + '  digitalWrite(' + dropdown_pin_OUT + ',HIGH);\n'
  + '  delayMicroseconds(1000-sensorValue);\n'
  + '}';
  return code;
};
/*按键模块*/
Blockly.Arduino.key_Reading = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*电位器模块*/
Blockly.Arduino.RP_Reading = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*蜂鸣器模块*/
Blockly.Arduino.BUZZ_CON = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var modle = this.getTitleValue('OUT_NUM');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);\n';
  var code = 'digitalWrite(' + dropdown_pin + ',' + modle + ');\n';
  return code;
};
/*DHT11温湿度模块*/
Blockly.Arduino.DHT11_CON = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var what = this.getTitleValue('PIN1');
  Blockly.Arduino.definitions_['define_dht'] = '#include <dht.h>';
  Blockly.Arduino.definitions_['define_record_1'] = 'dht myDHT_' + dropdown_pin + ';\n';
  var funcName = 'dht_' + dropdown_pin + '_get' + what;
  var code = 'int' + ' ' + funcName + '() \n'
  + '{\n'
  + '  int chk = myDHT_' + dropdown_pin + '.read11(' + dropdown_pin + ');\n'
  + '  int value = myDHT_' + dropdown_pin + '.' + what + ';\n'
  + '  return value;\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName] = code;
  return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
  /*Blockly.Arduino.definitions_['define_record_2']='int dht_'+dropdown_pin+'_get'+what+'()\n'
    +'  {\n'
    +'    int chk = myDHT_'+dropdown_pin+'.read11('+dropdown_pin+');\n'
    +'    int value = myDHT_'+dropdown_pin+'.'+what+';\n'
    +'    return value;\n'
    +'  }\n';
    var code = 'dht_'+dropdown_pin+'_get'+what+'()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];*/
  };
  /*DS18B20传感器*/
  Blockly.Arduino.DS18B20_CON = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var what = this.getTitleValue('PIN1');
    Blockly.Arduino.definitions_['define_OneWire'] = '#include <OneWire.h>';
    Blockly.Arduino.definitions_['define_DallasTemperature'] = '#include <DallasTemperature.h>';
    Blockly.Arduino.definitions_['define_record_1'] = 'OneWire oneWire_' + dropdown_pin + '(' + dropdown_pin + ');\n'
    + 'DallasTemperature sensors_' + dropdown_pin + '(&oneWire_' + dropdown_pin + ');\n'
    + 'DeviceAddress insideThermometer;\n'
    + 'float ds18b20_' + dropdown_pin + '_getTemp(int w) {\n'
    + '  sensors_' + dropdown_pin + '.requestTemperatures();\n'
    + '  if(w==0) {\n'
    + 'return sensors_' + dropdown_pin + '.getTempC(insideThermometer);\n'
    + '  }\n'
    + '  else {\n'
    + 'return sensors_' + dropdown_pin + '.getTempF(insideThermometer);\n'
    + '  }\n'
    + '}\n';
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'sensors_' + dropdown_pin + '.getAddress(insideThermometer, 0);\n'
    + '  sensors_' + dropdown_pin + '.setResolution(insideThermometer, 9);\n';
    var code = 'ds18b20_' + dropdown_pin + '_getTemp(' + what + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  /*水浊检测模块*/
  Blockly.Arduino.WaterTurbidity_Reading = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var code = 'analogRead(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  /*雨滴检测模块*/
  Blockly.Arduino.Raindrop_Reading = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var code = 'analogRead(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  /*土壤湿度检测*/
  Blockly.Arduino.SoilMoisture_Reading = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var code = 'analogRead(' + dropdown_pin + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  /*读声音传感器*/
  Blockly.Arduino.SoundDetection_Reading = function() {
    var dropdown_pin = this.getTitleValue('PIN');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  //Blockly.Arduino.setups_['setup_input_pull_up'+dropdown_pin] = 'digitalWrite('+dropdown_pin+',HIGH);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*红外灰度模块*/
Blockly.Arduino.CXSN_IR_Gray = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*人体感应模块*/
Blockly.Arduino.RSD_Reading = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*火焰检测D*/
Blockly.Arduino.Flame_Reading_D = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*火焰检测A*/
Blockly.Arduino.Flame_Reading_A = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*烟雾检测D*/
Blockly.Arduino.Smog_Reading_D = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*烟雾检测D*/
Blockly.Arduino.Smog_Reading_A = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*色彩输出模块*/
/*RGB模块*/
Blockly.Arduino.CXSNX10_RGB_Port1 = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_CXSN_WS2812'] = 'CXSN_WS2812 RGB(1);';
  Blockly.Arduino.definitions_['define_"CXSNX10Robot'] = '#include "Myrgbx10.h"';
  var code = 'RGB.SetOutput(' + dropdown_pin + ');';
  return code;
};
/*RGB参数设置*/
Blockly.Arduino.CXSNX10_RGB_Color = function() {
  var num1 = Blockly.Arduino.valueToCode(this, 'num1', Blockly.Arduino.ORDER_ATOMIC) || '100';
  if (num1 > 100) {
    num1 = 100;
  };
  var num2 = Blockly.Arduino.valueToCode(this, 'num2', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  if (num2 > 255) {
    num1 = 255;
  };
  var num3 = Blockly.Arduino.valueToCode(this, 'num3', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  if (num3 > 255) {
    num1 = 255;
  };
  var num4 = Blockly.Arduino.valueToCode(this, 'num4', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  if (num4 > 255) {
    num1 = 255;
  };
  var code = 'RGB.SetRGB(' + num1 + ',' + num2 + ',' + num3 + ',' + num4 + ');\n';
  return code;
};
/*RGB灯带端口设置*/
Blockly.Arduino.CXSNX10_RGB_Port2 = function() {
  var num1 = Blockly.Arduino.valueToCode(this, 'num1', Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  var num2 = Blockly.Arduino.valueToCode(this, 'num2', Blockly.Arduino.ORDER_ASSIGNMENT) || '128';
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_"record'] = '#include <FastLED.h> ';
  Blockly.Arduino.definitions_['define_"record_setup' + dropdown_pin] = '#define LED_TYPE WS2812\n#define COLOR_ORDER GRB\n#define NUM_LEDS ' + num1 + '\nuint8_t max_bright = ' + num2 + ';\nCRGB leds[NUM_LEDS];\n';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'LEDS.addLeds<LED_TYPE,' + dropdown_pin + ',COLOR_ORDER>(leds, NUM_LEDS);\n  FastLED.setBrightness(max_bright);\n';
  var code = '';
  return code;
};
/*RGB灯带参数设置*/
Blockly.Arduino.CXSNX10_RGB_Parameter = function() {
  var num1 = Blockly.Arduino.valueToCode(this, 'num1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var num2 = Blockly.Arduino.valueToCode(this, 'num2', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var num3 = Blockly.Arduino.valueToCode(this, 'num3', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var num4 = Blockly.Arduino.valueToCode(this, 'num4', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_"record'] = '#include <FastLED.h> ';
  //Blockly.Arduino.definitions_['define_"record_setup'+dropdown_pin] = '#define LED_TYPE WS2812\n#define COLOR_ORDER GRB\nCRGB leds[NUM_LEDS];\n';
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'LEDS.addLeds<LED_TYPE,'+dropdown_pin+',COLOR_ORDER>(leds, NUM_LEDS);\n  FastLED.setBrightness(max_bright);\n';
  var code = 'leds[' + num1 + ']=CRGB(' + num2 + ',' + num3 + ',' + num4 + ');\nFastLED.show();\n';
  return code;
};

/*MP3模块*/
/*设定端口--新款*/
Blockly.Arduino.CXSNX10_MP3_Port = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h> ';
  Blockly.Arduino.definitions_['define_"record_setup' + dropdown_pin] = 'SoftwareSerial ' + CXSN_Serial + '(A7,' + dropdown_pin + ');';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = '' + CXSN_Serial + '.begin(9600);\n'
  + '  delay(100);\n'
  + '  //音量等级\n'
  + '  ' + CXSN_Serial + '.write(0X7E);\n'
  + '  ' + CXSN_Serial + '.write(0X04);\n'
  + '  ' + CXSN_Serial + '.write(0XAE);\n'
  + '  ' + CXSN_Serial + '.write(0X19);\n'
  + '  ' + CXSN_Serial + '.write(0XCB);\n'
  + '  ' + CXSN_Serial + '.write(0XEF);\n'
  + '  delay(500);\n'
  + '  //顺序播放\n'
  + '  ' + CXSN_Serial + '.write(0X7E);\n'
  + '  ' + CXSN_Serial + '.write(0X04);\n'
  + '  ' + CXSN_Serial + '.write(0XAF);\n'
  + '  ' + CXSN_Serial + '.write(0X02);\n'
  + '  ' + CXSN_Serial + '.write(0XB5);\n'
  + '  ' + CXSN_Serial + '.write(0XEF);\n'
  + '  delay(50);\n'
  + '  //停止播放\n'
  + '  ' + CXSN_Serial + '.write(0X7E);\n'
  + '  ' + CXSN_Serial + '.write(0X03);\n'
  + '  ' + CXSN_Serial + '.write(0XAB);\n'
  + '  ' + CXSN_Serial + '.write(0XAE);\n'
  + '  ' + CXSN_Serial + '.write(0XEF);\n';
  var code = '';
  return code;
};
/*播放*/
Blockly.Arduino.CXSNX10_MP3_Play = function() {
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = ''
  + '    delay(50);\n'
  + '    ' + CXSN_Serial + '.write(0X7E);\n'
  + '    ' + CXSN_Serial + '.write(0X05);\n'
  + '    ' + CXSN_Serial + '.write(0XA2);\n'
  + '    ' + CXSN_Serial + '.write((uint8_t)0X00);\n'
  + '    ' + CXSN_Serial + '.write(0X01);\n'
  + '    ' + CXSN_Serial + '.write(0XA8);\n'
  + '    ' + CXSN_Serial + '.write(0XEF);\n';
  return code;
};
/*暂停*/
Blockly.Arduino.CXSNX10_MP3_Pause = function() {
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = ''
  + '    delay(50);\n'
  + '    ' + CXSN_Serial + '.write(0X7E);\n'
  + '    ' + CXSN_Serial + '.write(0X03);\n'
  + '    ' + CXSN_Serial + '.write(0XAB);\n'
  + '    ' + CXSN_Serial + '.write(0XAE);\n'
  + '    ' + CXSN_Serial + '.write(0XEF);\n';
  return code;
};
/*上一首*/
Blockly.Arduino.CXSNX10_MP3_Previous = function() {
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = ''
  + '    delay(50);\n'
  + '    ' + CXSN_Serial + '.write(0X7E);\n'
  + '    ' + CXSN_Serial + '.write(0X03);\n'
  + '    ' + CXSN_Serial + '.write(0XAD);\n'
  + '    ' + CXSN_Serial + '.write(0XB0);\n'
  + '    ' + CXSN_Serial + '.write(0XEF);';
  return code;
};
/*下一首*/
Blockly.Arduino.CXSNX10_MP3_Next = function() {
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = ''
  + '    delay(50);\n'
  + '    ' + CXSN_Serial + '.write(0X7E);\n'
  + '    ' + CXSN_Serial + '.write(0X03);\n'
  + '    ' + CXSN_Serial + '.write(0XAC);\n'
  + '    ' + CXSN_Serial + '.write(0XAF);\n'
  + '    ' + CXSN_Serial + '.write(0XEF);';
  return code;
};
/*设定端口--旧款*/
Blockly.Arduino.CXSNX10_JMP3_Port = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h> ';
  Blockly.Arduino.definitions_['define_"record_setup' + dropdown_pin] = 'SoftwareSerial ' + CXSN_Serial + ' (A7,' + dropdown_pin + ');';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = '' + CXSN_Serial + '.begin(9600);\n'
  + '  delay(100);\n'
  + '  //切换SD卡\n'
  + '  ' + CXSN_Serial + '.write(0X0A);\n'
  + '  ' + CXSN_Serial + '.write(0X01);\n'
  + '  ' + CXSN_Serial + '.write(0X01);\n'
  + '  ' + CXSN_Serial + '.write(0X0C);\n'
  + '  delay(500);\n'
  + '  //音量等级\n'
  + '  ' + CXSN_Serial + '.write(0X0B);\n'
  + '  ' + CXSN_Serial + '.write(0X01);\n'
  + '  ' + CXSN_Serial + '.write(0X1E);\n'
  + '  ' + CXSN_Serial + '.write(0X2A);\n'
  + '  delay(50);\n'
  + '  //停止播放\n'
  + '  ' + CXSN_Serial + '.write(0X01);\n'
  + '  ' + CXSN_Serial + '.write(0X01);\n'
  + '  ' + CXSN_Serial + '.write(0X02);\n'
  + '  ' + CXSN_Serial + '.write(0X04);\n';
  var code = '';
  return code;
};
/*播放*/
Blockly.Arduino.CXSNX10_JMP3_Play = function() {
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = ''
  + '    delay(50);\n'
  + '    ' + CXSN_Serial + '.write(0X01);\n'
  + '    ' + CXSN_Serial + '.write(0X01);\n'
  + '    ' + CXSN_Serial + '.write((uint8_t)0X00);\n'
  + '    ' + CXSN_Serial + '.write(0X02);\n';
  return code;
};
/*暂停*/
Blockly.Arduino.CXSNX10_JMP3_Pause = function() {
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = ''
  + '    delay(50);\n'
  + '   ' + CXSN_Serial + '.write(0X01);\n'
  + '   ' + CXSN_Serial + '.write(0X01);\n'
  + '   ' + CXSN_Serial + '.write(0X02);\n'
  + '   ' + CXSN_Serial + '.write(0X04);\n';
  return code;
};
/*上一首*/
Blockly.Arduino.CXSNX10_JMP3_Previous = function() {
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = ''
  + '    delay(50);\n'
  + '    ' + CXSN_Serial + '.write(0X01);\n'
  + '    ' + CXSN_Serial + '.write(0X01);\n'
  + '    ' + CXSN_Serial + '.write(0X04);\n'
  + '    ' + CXSN_Serial + '.write(0X06);\n';
  return code;
};
/*下一首*/
Blockly.Arduino.CXSNX10_JMP3_Next = function() {
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = ''
  + '    delay(50);\n'
  + '    ' + CXSN_Serial + '.write(0X01);\n'
  + '    ' + CXSN_Serial + '.write(0X01);\n'
  + '    ' + CXSN_Serial + '.write(0X03);\n'
  + '    ' + CXSN_Serial + '.write(0X05);\n';
  return code;
};
/*MP3模块结束*/
/*MOS驱动模块*/
Blockly.Arduino.CXSNX10_MOS_CON = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var modle = this.getTitleValue('OUT_NUM');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);\n';
  var code = 'digitalWrite(' + dropdown_pin + ',' + modle + ');\n';
  return code;
};
/*MOS驱动模块PWM*/
Blockly.Arduino.CXSNX10_MOS_CON_PWM = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var num1 = Blockly.Arduino.valueToCode(this, 'num1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var num;
  if (num1 > 255)
  {
    num1 = 255;
  }
  if (num1 < 1)
  {
    num1 = 0;
  }

  num = 255 - num1;

  var code = 'analogWrite(' + dropdown_pin + ',' + num + ');\n';
  return code;
};
/*小颗粒大颗粒电机*/
Blockly.Arduino.XPMotor_CON = function() {
  var port = this.getTitleValue('PIN');
  var port1 = this.getTitleValue('PIN1');
  var varTone = port;
  var text;
  var CCW;
  var CW;
  if (port1 == "HIGH") {
    CW = 'HIGH';
    CCW = 'LOW';
  }
  else if (port1 == "LOW") {
    CW = 'LOW';
    CCW = 'HIGH';
  }
  else if (port1 == "STOP") {
    CW = 'HIGH';
    CCW = 'HIGH';
  }
  if (varTone == "9") text = '10';
  else if (varTone == "7") text = '8' ;
  else if (varTone == "5") text =  '6' ;
  Blockly.Arduino.setups_['setup_input_'] = 'pinMode(' + port + ',OUTPUT);\n  pinMode(' + text + ',OUTPUT);\n';
  var code = 'digitalWrite(' + port + ', ' + CW + ');\n'
  + 'digitalWrite(' + text + ', ' + CCW + ');\n'
  return code;
};
/*小颗粒大颗粒电机调速*/
Blockly.Arduino.XPMotor_CON_PWM = function() {
  var port = this.getTitleValue('PIN');
  var port1 = this.getTitleValue('PIN1');
  var num = Blockly.Arduino.valueToCode(this, 'num', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varTone = port;
  var text;
  var CCW;
  var CW;
  if (num > 100)
  {
    num = 100;
  }
  if (num < 1)
  {
    num = 0;
  }
  if (port1 == "HIGH") {
    CW = num * 2.54;
    CCW = 0;
  }
  else if (port1 == "LOW") {
    CW = 0;
    CCW = num * 2.54;
  }
  if (varTone == "9") text = '10';
  else if (varTone == "5") text =  '6' ;
  Blockly.Arduino.setups_['setup_input_'] = 'pinMode(' + port + ',OUTPUT);\n  pinMode(' + text + ',OUTPUT);\n';
  var code = 'analogWrite(' + port + ', ' + CW + ');\n'
  + 'analogWrite(' + text + ', ' + CCW + ');\n'
  return code;
};
/*电机模块*/
Blockly.Arduino.CXSNX10_Motor_Port = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h> ';
  Blockly.Arduino.definitions_['define_"record_setup' + dropdown_pin] = 'SoftwareSerial ' + CXSN_Serial + '(A7,' + dropdown_pin + ');\n';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = '' + CXSN_Serial + '.begin(9600);\n  delay(50);';
  var code = '';
  return code;
};
/*电机1*/
Blockly.Arduino.CXSNX10_Motor_1 = function() {
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  var num = Blockly.Arduino.valueToCode(this, 'num', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var num1 = Blockly.Arduino.valueToCode(this, 'num1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  if (num > 99)
  {
    num = 100;
  }
  if (num < 1)
  {
    num = 0;
  }
  if (num1 > 1)
  {
    num1 = 1;
  }
  if (num1 < 0)
  {
    num1 = 0;
  }
  var code = 'delay(50);\n'
  + '' + CXSN_Serial + '.write(0x5a);\n'
  + '' + CXSN_Serial + '.write(0xa5);\n'
  + '' + CXSN_Serial + '.write((uint8_t)' + num1 + ');\n'
  + '' + CXSN_Serial + '.write((uint8_t)' + num + ');\n';
  return code;
};
/*电机2*/
Blockly.Arduino.CXSNX10_Motor_2 = function() {
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  var num = Blockly.Arduino.valueToCode(this, 'num', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var num1 = Blockly.Arduino.valueToCode(this, 'num1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  if (num > 99)
  {
    num = 100;
  }
  if (num < 1)
  {
    num = 0;
  }
  if (num1 > 1)
  {
    num1 = 1;
  }
  if (num1 < 0)
  {
    num1 = 0;
  }
  var code = 'delay(50);\n'
  + '' + CXSN_Serial + '.write(0x5a);\n'
  + '' + CXSN_Serial + '.write(0xa0);\n'
  + '' + CXSN_Serial + '.write((uint8_t)' + num1 + ');\n'
  + '' + CXSN_Serial + '.write((uint8_t)' + num + ');\n';
  return code;
};
/*电机模块结束*/

/*舵机模块*/
Blockly.Arduino.CXSNX10_Servo = function() {
  var port = this.getTitleValue('PIN');
  var port_a = this.getTitleValue('PIN1');
  var num = Blockly.Arduino.valueToCode(this, 'num', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var num1 = Blockly.Arduino.valueToCode(this, 'num1', Blockly.Arduino.ORDER_ASSIGNMENT) || '1000';
  if (num > 360)
  {
    num = 360;
  }
  if (num < 1)
  {
    num = 0;
  }
  var varTone = port + port_a;
  Blockly.Arduino.definitions_['define_"Servo'] = '#include <Servo.h>';
  var text;
  if (varTone == "11") text = 'A3';
  else if (varTone == "12") text = 'A4' ;
  else if (varTone == "13") text =  'A5' ;
  else if (varTone == "21") text = '2' ;
  else if (varTone == "22") text =  '1' ;
  else if (varTone == "23") text =  '0' ;
  else if (varTone == "31") text = '3' ;
  else if (varTone == "32") text =  '4' ;
  else if (varTone == "33") text = '11' ;
  else if (varTone == "41") text =  'A2' ;
  else if (varTone == "42") text =  '10' ;
  else if (varTone == "43") text =  '9' ;
  else if (varTone == "51") text =  'A1' ;
  else if (varTone == "52") text =  '8' ;
  else if (varTone == "53") text =  '7' ;
  else if (varTone == "61") text =  'A0' ;
  else if (varTone == "62") text =  '6' ;
  else if (varTone == "63") text =  '5' ;
  Blockly.Arduino.definitions_['define_"Servo_setup' + text] = 'Servo servo_' + text + ';';
  Blockly.Arduino.setups_['setup_input_' + text] = 'servo_' + text + '.attach(' + text + ');';
  var code = 'servo_' + text + '.write(' + num + ');\n'
  + 'delay(' + num1 + ');\n';
  return code;
};
/*舵机模块结束*/
/*环境光检测模块D*/
Blockly.Arduino.Photosensitive_Reading_D = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
  var code = 'digitalRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*环境光检测模块A*/
Blockly.Arduino.Photosensitive_Reading_A = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var code = 'analogRead(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*pm2.5检测模块*/
Blockly.Arduino.CXSN10_PM25_Port = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_"record_1'] = '#include <pm25.h>';
  Blockly.Arduino.definitions_['define_"record_2'] = 'CXSNX10_pm25_Sensor pm25;';
  var code = 'pm25.Read_PM2_5(' + dropdown_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.CXSN10_PM25_Reading = function() {
  var port = this.getTitleValue('PIN');
  var varTone = port;
  var text;
  if (varTone == "A2") text = '10';
  else if (varTone == "A1") text = '8' ;
  else if (varTone == "A0") text =  '6' ;
  Blockly.Arduino.definitions_['define_"setup'] = 'int samplingTime=280;\nint deltaTime=40;\nint sleepTime=9680;\n';
  Blockly.Arduino.setups_['setup_input_'] = 'pinMode(' + port + ',INPUT);\n  pinMode(' + text + ',OUTPUT);\n';
  var code = 'digitalWrite(' + text + ', LOW);\n'
  + 'delayMicroseconds(samplingTime);\n'
  + 'PMdata=analogRead(' + port + ');\n'
  + 'delayMicroseconds(deltaTime);\n'
  + 'digitalWrite(' + text + ', HIGH);\n'
  + 'delayMicroseconds(sleepTime);\n';
  return code;
};
/*pm2.5返回数据*/
Blockly.Arduino.CXSN10_PM25_return = function() {
  Blockly.Arduino.definitions_['define_"setup_1'] = 'volatile int PMdata=0;\n';
  var code = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*pm2.5检测模块结束*/
// Ultrasonic 超声波
Blockly.Arduino.CXSNX10_Ultrasonic_CON = function () {
  var port = this.getTitleValue('PIN');
  var port_t;
  var port_e;
  if (port == "A3") port_t = 'A5';
  else if (port == "2") port_t = '1' ;
  else if (port == "3") port_t =  '4' ;
  else if (port == "A2") port_t =  '10' ;
  else if (port == "A1") port_t =  '8' ;
  else if (port == "A0") port_t =  '6' ;

   if (port_t == "A5") port_e = 'A4';
  else if (port_t == "1") port_e = '0' ;
  else if (port_t == "4") port_e =  '11' ;
  else if (port_t == "10") port_e =  '9' ;
  else if (port_t == "7") port_e =  '7' ;
  else if (port_t == "6") port_e =  '5' ;
  
  Blockly.Arduino.setups_['setup_output_' + port_t] = 'pinMode(' + port_t + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + port_e] = 'pinMode(' + port_e + ', INPUT);';
  var funcName = 'checkdistance_' + port_t + '_' + port_e;
  var code = 'float' + ' ' + funcName + '() {\n'
  + '  digitalWrite(' + port_t + ', LOW);\n' 
  + '  delayMicroseconds(2);\n'
  + '  digitalWrite(' + port_t + ', HIGH);\n' 
  + '  delayMicroseconds(10);\n'
  + '  digitalWrite(' + port_t + ', LOW);\n'
  + '  float distance = pulseIn(' + port_e + ', HIGH) / 58.00;\n'
  + '  delay(10);\n' 
  + '  return distance;\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName] = code;
  return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
  }
/*继电器驱动模块*/
Blockly.Arduino.CXSNX10_Relay_CON = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var modle = this.getTitleValue('OUT_NUM');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);\n';
  var code = 'digitalWrite(' + dropdown_pin + ',' + modle + ');\n';
  return code;
};
/*多路语音录放模块*/
/*多路语音端口设定*/
Blockly.Arduino.CXSNX10_Record_Port = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_"record_setup' + dropdown_pin] = 'SoftwareSerial ' + CXSN_Serial + '(A7,' + dropdown_pin + ');\n';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = '' + CXSN_Serial + '.begin(9600);';
  var code = '';
  return code;
};
/*开始录音*/
Blockly.Arduino.CXSNX10_Record_Start = function() {
  //var dropdown_pin = this.getTitleValue('PIN');
  //var CXSN_Record_Num = this.getTitleValue('PIN');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  var record_num1 = Blockly.Arduino.valueToCode(this, 'record_num1', Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  if (record_num1 > 6)
  {
    record_num1 = 6;
  }
  if (record_num1 < 1)
  {
    record_num1 = 1;
  }
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = 'delay(10);\n'
  + '' + CXSN_Serial + '.write(0XFF);\n'
  + '' + CXSN_Serial + '.write(0X55);\n'
  + '' + CXSN_Serial + '.write(0X01);\n'
  + '' + CXSN_Serial + '.write(0X0' + record_num1 + ');\n';
  return code;
};
/*停止录音*/
Blockly.Arduino.CXSNX10_Record_SuspendRecord = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = 'delay(10);\n'
  + '' + CXSN_Serial + '.write(0XFF);\n'
  + '' + CXSN_Serial + '.write(0X55);\n'
  + '' + CXSN_Serial + '.write(0X02);\n';
  return code;
};
/*开始播放*/
Blockly.Arduino.CXSNX10_Record_Play = function() {
  //var dropdown_pin = this.getTitleValue('PIN1');
  //var CXSN_Record_Num = this.getTitleValue('PIN1');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  var record_num2 = Blockly.Arduino.valueToCode(this, 'record_num2', Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  if (record_num2 > 6)
  {
    record_num2 = 6;
  }
  if (record_num2 < 1)
  {
    record_num2 = 1;
  }
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = 'delay(10);\n'
  + '' + CXSN_Serial + '.write(0XFF);\n'
  + '' + CXSN_Serial + '.write(0X55);\n'
  + '' + CXSN_Serial + '.write(0X03);\n'
  + '' + CXSN_Serial + '.write(0X0' + record_num2 + ');\n';
  return code;
};
/*暂停播放*/
Blockly.Arduino.CXSNX10_Record_PlayPause = function() {
  var dropdown_pin = this.getTitleValue('PIN1');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  var code = 'delay(10);\n'
  + '' + CXSN_Serial + '.write(0XFF);\n'
  + '' + CXSN_Serial + '.write(0X55);\n'
  + '' + CXSN_Serial + '.write(0X04);\n';
  return code;
};
/*多路语音录放模块结束*/
/*LED/OLED模块*/
/*oled显示字符串*/
Blockly.Arduino.CXSNX10_OLED_EN = function() {
  var dropdown_pin1 = this.getTitleValue('PIN1');
  var dropdown_pin2 = this.getTitleValue('PIN2');
  var str3 = Blockly.Arduino.valueToCode(this, 'Text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  Blockly.Arduino.definitions_['define_"CXSNRobot'] = '#include "CXSNX10.h"';
  Blockly.Arduino.definitions_['define_CXSN_oled1'] = 'CXSN_OLED OLED;';
  var code = 'OLED.OLED_Print(' + dropdown_pin1 + ',' + dropdown_pin2 + ', ' + str3 + ');\n';
  return code;
};
/*oled显示数字*/
Blockly.Arduino.CXSNX10_OLED_Num = function() {
  var dropdown_pin1 = this.getTitleValue('PIN1');
  var dropdown_pin2 = this.getTitleValue('PIN2');
  var num = Blockly.Arduino.valueToCode(this, 'num', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['define_"CXSNRobot'] = '#include "CXSNX10.h"';
  Blockly.Arduino.definitions_['define_CXSN_oled1'] = 'CXSN_OLED OLED;';
  var code = 'OLED.OLED_Print(' + dropdown_pin1 + ',' + dropdown_pin2 + ', ' + num + ');\n';
  return code;
};
/*oled清屏*/
Blockly.Arduino.CXSNX10_OLED_Eliminate = function() {
  Blockly.Arduino.definitions_['define_"CXSNRobot'] = '#include "CXSNX10.h"';
  Blockly.Arduino.definitions_['define_CXSN_oled1'] = 'CXSN_OLED OLED;';
  var code = 'OLED.OLED_CLS();\n';
  return code;
};
/*数码管显示数字*/
Blockly.Arduino.CXSNX10_Nixietube_Port1 = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>\nint num=0;\nint num1=0;\nint num2=0;\n';
  Blockly.Arduino.definitions_['define_"record_setup' + dropdown_pin] = 'SoftwareSerial ' + CXSN_Serial + '(A7,' + dropdown_pin + ');';
  Blockly.Arduino.setups_['setup_input_'] = '' + CXSN_Serial + '.begin(9600);';
  var aa = Blockly.Arduino.valueToCode(this, 'num', Blockly.Arduino.ORDER_ASSIGNMENT) || '0'; //
  var code = 'num=' + aa + ';\n'
  + 'if(num>9999)\n'
  + '{\n'
  + '  num=9999;\n'
  + '}\n'
  + 'if(num<=0)\n'
  + '{\n'
  + '  num=0;\n'
  + '}\n'
  + 'num1=num>>8;\n'
  + 'num2=num&0x00ff;\n'
  + 'delay(10);\n'
  + '' + CXSN_Serial + '.write(0x5a);\n'
  + '' + CXSN_Serial + '.write(0xa5);\n'
  + '' + CXSN_Serial + '.write(0x01);\n'
  + '' + CXSN_Serial + '.write((uint8_t)num1);\n'
  + '' + CXSN_Serial + '.write((uint8_t)num2);\n'
  + '' + CXSN_Serial + '.write((uint8_t)0x00);\n';
  return code;
};
/*数码管倒计时显示*/
Blockly.Arduino.CXSNX10_Nixietube_Port2 = function() {
  var dropdown_pin = this.getTitleValue('PIN');//发送给单片机
  var dropdown_p = this.getTitleValue('PIN1');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h> ';
  Blockly.Arduino.definitions_['define_"record_setup' + dropdown_pin] = 'SoftwareSerial ' + CXSN_Serial + '(' + dropdown_p + ',' + dropdown_pin + ');';
  Blockly.Arduino.setups_['setup_input_'] = '' + CXSN_Serial + '.begin(9600);';
  var num = Blockly.Arduino.valueToCode(this, 'num', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['define_"record222'] = 'unsigned long timea=0;\nchar dat=0;\nchar serdat=0;';
  if (num > 9999)
  {
    num = 9999;
  }
  if (num <= 0)
  {
    num = 0;
  }
  var num1 = num >> 8;
  var num2 = num & 0x00ff;
  var code = 'delay(10);\n'
  + 'serdat=0;\n'
  + '' + CXSN_Serial + '.write(0x5a);\n'
  + '' + CXSN_Serial + '.write(0xa5);\n'
  + '' + CXSN_Serial + '.write(0x02);\n'
  + '' + CXSN_Serial + '.write((uint8_t)' + num1 + ');\n'
  + '' + CXSN_Serial + '.write((uint8_t)' + num2 + ');\n'
  + '' + CXSN_Serial + '.write((uint8_t)0x01);\n'
  + 'while(serdat==0)\n'
  + '{\n'
  + '  if(' + CXSN_Serial + '.available()>0)\n'
  + '  {\n'
  + '    serdat=' + CXSN_Serial + '.read();\n'
  + '  }\n'
  + '}';
  return code;
};
/*数码管显示时钟*/
Blockly.Arduino.CXSNX10_Nixietube_Clock = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>\nunsigned long timeb=0;\nchar a,b,c;';
  Blockly.Arduino.definitions_['define_"record_setup' + dropdown_pin] = 'SoftwareSerial serial(13,' + dropdown_pin + ');';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'serial.begin(9600);';
  var dropdown_jia = this.getTitleValue('PINjia');
  var dropdown_jian = this.getTitleValue('PINjian');
  var dropdown_stopstar = this.getTitleValue('PINstopstar');
  var num1 = Blockly.Arduino.valueToCode(this, 'num1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var num2 = Blockly.Arduino.valueToCode(this, 'num2', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  if (num1 > 99)
  {
    num1 = 99;
  }
  if (num1 <= 0)
  {
    num1 = 0;
  }

  if (num2 > 99)
  {
    num2 = 99;
  }
  if (num2 <= 0)
  {
    num2 = 0;
  }
  Blockly.Arduino.setups_['setup_input_'] = 'delay(10);\n'
  + '  serial.write(0x5a);\n'
  + '  serial.write(0xa5);\n'
  + '  serial.write(0x03);\n'
  + '  serial.write((uint8_t)' + num1 + ');\n'
  + '  serial.write((uint8_t)' + num2 + ');\n'
  + '  serial.write((uint8_t)0x01);\n'
      + '  timeb=1;\n'; //timeb='+num1+'*3600+'+num2+';
      var code = '';
      return code;
    };
    Blockly.Arduino.CXSNX10_Clock_Hour_Port = function() {
      var dropdown_pin = this.getTitleValue('PINjia');
      Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
      var code = 'digitalRead(' + dropdown_pin + ')\n';
      return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.CXSNX10_Clock_Minute_Port = function() {
      var dropdown_pin = this.getTitleValue('PINjian');
      Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
      var code = 'digitalRead(' + dropdown_pin + ')\n';
      return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.CXSNX10_Clock_Setup_Port = function() {
      var dropdown_pin = this.getTitleValue('PINstopstar');
      Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
      var code = 'digitalRead(' + dropdown_pin + ')\n';
      return [code, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.CXSNX10_Clock_Hour_Setup = function() {
      Blockly.Arduino.definitions_['define_"recor'] = '';
      var code = 'delay(10);\n'
      + 'if(a==0)\n'
      + '{\n'
      + '  serial.write(0x5a);\n'
      + '  serial.write(0xa5);\n'
      + '  serial.write(0x03);\n'
      + '  serial.write((uint8_t)0xff);\n'
      + '  serial.write((uint8_t)0x00);\n'
      + '  serial.write((uint8_t)0x00);\n'
      + '  timeb=0;\n'
      + '  a=1;\n'
      + '}\n';
      return code;
    };
    Blockly.Arduino.CXSNX10_Clock_Minute_Setup = function() {
      Blockly.Arduino.definitions_['define_"record32'] = '';
  //var code = 'delay(100);if(b==0){serial.write(0x5a);serial.write(0xa5);serial.write(0x03);serial.write((uint8_t)0x00);serial.write((uint8_t)0xff);serial.write((uint8_t)0x00);timeb=0;b=1;}\n';
  var code = 'delay(10);\n'
  + 'if(b==0)\n'
  + '{\n'
  + '  serial.write(0x5a);\n'
  + '  serial.write(0xa5);\n'
  + '  serial.write(0x03);\n'
  + '  serial.write((uint8_t)0x00);\n'
  + '  serial.write((uint8_t)0xff);\n'
  + '  serial.write((uint8_t)0x00);\n'
  + '  timeb=0;\n'
  + '  b=1;\n'
  + '}\n';
  return code;
};
Blockly.Arduino.CXSNX10_Clock_OK_Setup = function() {
  Blockly.Arduino.definitions_['define_"edd'] = '';
  //var code = 'delay(100);if(c==0){serial.write(0x5a);serial.write(0xa5);serial.write(0x03);serial.write((uint8_t)0x00);serial.write((uint8_t)0x00);if(timeb==1){serial.write((uint8_t)0x00);timeb=0;}else{serial.write((uint8_t)0x01);timeb=1;}c=1;}\n';
  var code = 'delay(10);\n'
  + 'if(c==0)\n'
  + '{\n'
  + '  serial.write(0x5a);\n'
  + '  serial.write(0xa5);\n'
  + '  serial.write(0x03);\n'
  + '  serial.write((uint8_t)0x00);\n'
  + '  serial.write((uint8_t)0x00);\n'
  + '  if(timeb==1)\n'
  + '  {\n'
  + '    serial.write((uint8_t)0x00);\n'
  + '    timeb=0;\n'
  + '  }\n'
  + '  else{\n'
  + '    serial.write((uint8_t)0x01);\n'
  + '    timeb=1;\n'
  + '  }\n'
  + '  c=1;\n'
  + '}\n';
  return code;
};
Blockly.Arduino.CXSNX10_Clock_Hour_OK = function() {
  Blockly.Arduino.definitions_['define_"recor2'] = '';
  var code = 'a=0;\n';
  return code;
};
Blockly.Arduino.CXSNX10_Clock_Minute_OK = function() {
  Blockly.Arduino.definitions_['define_"reco3332'] = '';
  var code = 'b=0;\n';
  return code;
};
Blockly.Arduino.CXSNX10_Clock_Setup_OK = function() {
  Blockly.Arduino.definitions_['define_"fdf'] = '';
  var code = 'c=0;\n';
  return code;
};

//遥控器---------- 红外遥控 、 PS2-手柄遥控
//红外接收模块
Blockly.Arduino.CXSNX10_IR_mini = function() {
  var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  Blockly.Arduino.definitions_['var_declare' + variable] = 'long ' + variable + ';';
  //var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin = this.getTitleValue('PIN');
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
  Blockly.Arduino.definitions_['var_ir_recv' + dropdown_pin] = 'IRrecv irrecv_' + dropdown_pin + '(' + dropdown_pin + ');\ndecode_results results_' + dropdown_pin + ';\n';
  Blockly.Arduino.setups_['setup_ir_recv_' + dropdown_pin] = 'irrecv_' + dropdown_pin + '.enableIRIn();';
  var code = 'if (irrecv_' + dropdown_pin + '.decode(&results_' + dropdown_pin + '))\n'
  + '{\n'
  + '  ' + variable + '=results_' + dropdown_pin + '.value;\n'
  + '  String type="UNKNOWN";\n'
  + '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n'
  + '  if(results_' + dropdown_pin + '.decode_type>=1&&results_' + dropdown_pin + '.decode_type<=13)\n'
  + '  {\n'
  + '    type=typelist[results_' + dropdown_pin + '.decode_type];\n'
  + '  }\n'
  + branch
  + '  irrecv_' + dropdown_pin + '.resume();\n'
  + '}'
  + 'else {\n'
  + branch2
  + '}\n';
  return code;
};
//红外mini遥控器键值
Blockly.Arduino.CXSNX10_IR_val = function() {
  var code = (this.getFieldValue('VAL'));
  var order = code < 0 ?
  Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
};
//红外遥控器键值
Blockly.Arduino.CXSNX10_Remote_val = function() {
  var code = (this.getFieldValue('VAL'));
  var code1 = (this.getFieldValue('VAL1'));
  var order = (code + code1) < 0 ?
  Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code + code1, order];
};
/*PS2接收*/
Blockly.Arduino.CXSNX10_PS2_Port = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var CXSN_Serial = this.getTitleValue('CXSN_Serial');
  Blockly.Arduino.definitions_['define_"record'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_"record_setup' + dropdown_pin] = 'SoftwareSerial ' + CXSN_Serial + '(' + dropdown_pin + ',13);\n';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = '' + CXSN_Serial + '.begin(9600);';
  var code = '';
  return code;
};
/*有数据可读吗*/
Blockly.Arduino.CXSNX10_PS2_Read = function() {
  //var dropdown_pin = this.getTitleValue('PIN');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'mySerial.available() > 0';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*读取字符串*/
Blockly.Arduino.CXSNX10_PS2_Reading = function() {
  //var dropdown_pin = this.getTitleValue('PIN');
  //Blockly.Arduino.definitions_['define_"Arduino']='#include <Arduino.h>';
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = '';
  var code = 'mySerial.readString()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//PS2按键值
Blockly.Arduino.CXSNX10_PS2_Readnum = function() {
  var code = (this.getFieldValue('VAL'));
  var order = code < 0 ?
  Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
};


/*-------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------*/
/*oled显示字符串*/
Blockly.Arduino.CXSN_OLED_String = function() {
  var dropdown_pin1 = this.getTitleValue('PIN1');
  var dropdown_pin2 = this.getTitleValue('PIN2');
  var str3 = Blockly.Arduino.valueToCode(this, 'Text', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  Blockly.Arduino.definitions_['define_"CXSNRobot'] = '#include "led.c"';
  Blockly.Arduino.definitions_['define_"CXSNRobot1'] = '#include "oledfont.h"';
  Blockly.Arduino.setups_['setup_input_'] = 'LED_Init();\n  OLED_Clear();\n';
  //Blockly.Arduino.definitions_['define_CXSN_oled1'] = 'CXSN_OLED OLED;';
  var code = 'OLED.OLED_Print(' + dropdown_pin1 + ',' + dropdown_pin2 + ', ' + str3 + ',0);\n';
  return code;
};
/*oled显示数字*/
Blockly.Arduino.CXSN_OLED_Num = function() {
  var dropdown_pin1 = this.getTitleValue('PIN1');
  var dropdown_pin2 = this.getTitleValue('PIN2');
  var num = Blockly.Arduino.valueToCode(this, 'num', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['define_"CXSNRobot'] = '#include "CXSNX10.h"';
  Blockly.Arduino.definitions_['define_CXSN_oled1'] = 'CXSN_OLED OLED;';
  var code = 'OLED.OLED_Print(' + dropdown_pin1 + ',' + dropdown_pin2 + ', ' + num + ');\n';
  return code;
};
/*oled清屏*/
Blockly.Arduino.CXSN_OLED_Cls = function() {
  Blockly.Arduino.definitions_['define_"CXSNRobot'] = '#include "CXSNX10.h"';
  Blockly.Arduino.definitions_['define_CXSN_oled1'] = 'CXSN_OLED OLED;';
  var code = 'OLED.OLED_CLS();\n';
  return code;
};

/*wifi模块*/
Blockly.Arduino.CXSNX10_wifi_val = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_CXSN_WS2812'] = 'CXSN_WS2812 RGB(1);';
  Blockly.Arduino.definitions_['define_"CXSNX10Robot'] = '#include "Myrgbx10.h"';
  Blockly.Arduino.definitions_['define_wifi'] = '#include "Gizwits.h"\n'
  + '#include <Wire.h>\n'
  Blockly.Arduino.definitions_['define_wifi_1'] = ''
  + 'Gizwits myGizwits;\n\n'
  + '#define   KEY1              11\n'
  + '#define   KEY2              13\n'
  + '#define   KEY1_SHORT_PRESS  1\n'
  + '#define   KEY1_LONG_PRESS   2\n'
  + '#define   KEY2_SHORT_PRESS  4\n'
  + '#define   KEY2_LONG_PRESS   8\n'
  + '#define   NO_KEY            0\n'
  + '#define   KEY_LONG_TIMER    3\n'
  + 'unsigned long Last_KeyTime = 0;\n\n'
  + 'bool varR_LED_ONOFF;\n'
  + 'bool varR_LED_ONOFF1;\n'
  + 'bool varR_LED_ONOFF2;\n'
  + 'bool varR_PMOS1;\n'
  + 'bool varR_PMOS2;\n'
  + 'unsigned long varR_xRGB1;\n'
  + 'unsigned long varR_yRGB2;\n'
  + 'unsigned long varR_xRGB_rad1;\n'
  + 'unsigned long varR_xRGB_green1;\n'
  + 'unsigned long varR_xRGB_blue1;\n'
  + 'unsigned long varR_yRGB_rad2;\n'
  + 'unsigned long varR_yRGB_green2;\n'
  + 'unsigned long varR_yRGB_blue2;\n\n'
  + 'unsigned long gokit_time_s(void)\n'
  + '{\n'
  + '  return millis() / 1000;\n'
  + '}\n\n'
  + 'char gokit_key1down(void)\n'
  + '{\n'
  + '  unsigned long keep_time = 0;\n'
  + '  if (digitalRead(KEY1) == LOW)\n'
  + '  {\n'
  + '    delay(100);\n'
  + '    if (digitalRead(KEY1) == LOW)\n'
  + '    {\n'
  + '      keep_time = gokit_time_s();\n'
  + '      while (digitalRead(KEY1) == LOW)\n'
  + '     {\n'
  + '      if ((gokit_time_s() - keep_time) > KEY_LONG_TIMER)\n'
  + '        {\n'
  + '          Last_KeyTime = gokit_time_s();\n'
  + '          return KEY1_LONG_PRESS;\n'
  + '        }\n'
  + '    }\n'
  + '    if ((gokit_time_s() - Last_KeyTime) > KEY_LONG_TIMER)\n'
  + '    {\n'
  + '      return KEY1_SHORT_PRESS;\n'
  + '    }\n'
  + '    return 0;\n'
  + ' }\n'
  + '  return 0;\n'
  + '}\n'
  + 'return 0;\n'
  + '}\n\n'
  + 'char gokit_key2down(void)\n'
  + '{\n'
  + '  unsigned long keep_time = 0;\n'
  + '  if (digitalRead(KEY2) == LOW)\n'
  + '  {\n'
  + '    delay(100);\n'
  + '   if (digitalRead(KEY2) == LOW)\n'
  + '   {\n'
  + '     keep_time = gokit_time_s();\n'
  + '      while (digitalRead(KEY2) == LOW)\n'
  + '      {\n'
  + '        if ((gokit_time_s() - keep_time) > KEY_LONG_TIMER)\n'
  + '        {\n'
  + '          Last_KeyTime = gokit_time_s();\n'
  + '          return KEY2_LONG_PRESS;\n'
  + '       }\n'
  + '      }\n'
  + '      if ((gokit_time_s() - Last_KeyTime) > KEY_LONG_TIMER)\n'
  + '      {\n'
  + '        return KEY2_SHORT_PRESS;\n'
  + '      }\n'
  + '     return 0;\n'
  + '    }\n'
  + '    return 0;\n'
  + '  }\n'
  + '  return 0;\n'
  + '}\n\n'
  + 'char gokit_keydown(void)\n'
  + '{\n'
  + '  char ret = 0;\n'
  + '  ret |= gokit_key2down();\n'
  + '  ret |= gokit_key1down();\n'
  + '  return ret;\n'
  + '}\n\n'
  + 'void KEY_Handle(void)\n'
  + '{\n'
  + '  switch (gokit_keydown())\n'
  + '  {\n'
  + '   case KEY1_SHORT_PRESS:\n'
  + '    myGizwits.setBindMode(WIFI_PRODUCTION_TEST);//KEY1_SHORT_PRESS , Production Test Mode\n'
  + '    break;\n'
  + '   case KEY1_LONG_PRESS:\n'
  + '    myGizwits.setBindMode(WIFI_RESET_MODE);//KEY1_LONG_PRESS ,Wifi Reset\n'
  + '   break;\n'
  + '   case KEY2_SHORT_PRESS:\n'
  + '    myGizwits.setBindMode(WIFI_SOFTAP_MODE);//KEY2_SHORT_PRESS Soft AP mode\n'
  + '    RGB.SetOutput(2);\n'
  + '    RGB.SetRGB(100,255,0,0);\n'
  + '   break;\n'
  + '   case KEY2_LONG_PRESS:\n'
  + '    myGizwits.setBindMode(WIFI_AIRLINK_MODE);//KEY2_LONG_PRESS ,AirLink mode\n'
  + '    RGB.SetOutput(2);\n'
  + '    RGB.SetRGB(100,0,255,0);\n'
  + '    break;\n'
  + '   default:\n'
  + '    break;\n'
  + '    }\n'
  + '  }\n';
  Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'myGizwits.begin();\n\n'
  + '  pinMode(KEY1, INPUT_PULLUP);\n'
  + '  pinMode(KEY2, INPUT_PULLUP);\n\n'
  + '  RGB.SetOutput(2);\n'
  + '  RGB.SetRGB(0,0,0,0);\n'
  + '  varR_LED_ONOFF = 0;\n'
  + '  varR_LED_ONOFF1 = 0;\n'
  + '  varR_LED_ONOFF2 = 0;\n'
  + '  varR_PMOS1 = 0;\n'
  + '  varR_PMOS2 = 0;\n'
  + '  varR_xRGB1 = 0;\n'
  + '  varR_yRGB2 = 0;\n'
  + '  varR_xRGB_rad1 = 0;\n'
  + '  varR_xRGB_green1 = 0;\n'
  + '  varR_xRGB_blue1 = 0;\n'
  + '  varR_yRGB_rad2 = 0;\n'
  + '  varR_yRGB_green2 = 0;\n'
  + '  varR_yRGB_blue2 = 0;';
  var code = 'myGizwits.process();\n'
  +'KEY_Handle();\n\n'
  +'if (myGizwits.hasBeenSet(EVENT_xRGB1))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_xRGB1, &varR_xRGB1);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_xRGB_rad1))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_xRGB_rad1, &varR_xRGB_rad1);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_xRGB_green1))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_xRGB_green1, &varR_xRGB_green1);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_xRGB_blue1))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_xRGB_blue1, &varR_xRGB_blue1);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_yRGB2))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_yRGB2, &varR_yRGB2);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_yRGB_rad2))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_yRGB_rad2, &varR_yRGB_rad2);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_yRGB_green2))\n'
  + '{\n'
  + ' myGizwits.read(EVENT_yRGB_green2, &varR_yRGB_green2);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_yRGB_blue2))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_yRGB_blue2, &varR_yRGB_blue2);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_LED_ONOFF))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_LED_ONOFF, &varR_LED_ONOFF);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_LED_ONOFF1))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_LED_ONOFF1, &varR_LED_ONOFF1);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_LED_ONOFF2))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_LED_ONOFF2, &varR_LED_ONOFF2);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_PMOS1))\n'
  + '{\n'
  + '  myGizwits.read(EVENT_PMOS1, &varR_PMOS1);\n'
  + '}\n'
  + 'if (myGizwits.hasBeenSet(EVENT_PMOS2))\n'
  + '{\n'
  + ' myGizwits.read(EVENT_PMOS2, &varR_PMOS2);\n'
  + '}\n'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*wifi off*/
Blockly.Arduino.CXSNX10_wifi_onoff = function() {
  var dropdown_pin1 = this.getTitleValue('PIN');
  var dropdown_pin2 = this.getTitleValue('PIN1');
  var code = '' + dropdown_pin1 + '==' + dropdown_pin2 + '';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*wifi rgb*/
Blockly.Arduino.CXSNX10_wifi_rgb = function() {
  var dropdown_pin1 = this.getTitleValue('PIN');
  var dropdown_pin2 = this.getTitleValue('PIN1');
  var code = '' + dropdown_pin1 + '' + dropdown_pin2 + '';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
/*wifireadonly*/
Blockly.Arduino.CXSNX10_wifi_readonly = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var num1 = Blockly.Arduino.valueToCode(this, 'num1', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var data;
  var text;
  if (dropdown_pin == "varW_ADC_1") text = 'unsigned long';
  else if (dropdown_pin == "varW_Humiture1") text = 'float';
  else if (dropdown_pin == "varW_Humiture2") text =  'float';
  else if (dropdown_pin == "varW_PM25") text =  'unsigned long';
  else if (dropdown_pin == "varW_remind1") text = 'unsigned long';
  else if (dropdown_pin == "varW_remind2") text =  'unsigned long';
  else if (dropdown_pin == "varW_remind3") text = 'unsigned long';
  else if (dropdown_pin == "varW_remind4") text =  'unsigned long';


  if (dropdown_pin == "varW_ADC_1") data='VALUE_ADC_1';
  else if (dropdown_pin == "varW_Humiture1") data='VALUE_Humiture1';
  else if (dropdown_pin == "varW_Humiture2") data='VALUE_Humiture2';
  else if (dropdown_pin == "varW_PM25") data='VALUE_PM25';
  else if (dropdown_pin == "varW_remind1") data='VALUE_remind1';
  else if (dropdown_pin == "varW_remind2") data='VALUE_remind2';
  else if (dropdown_pin == "varW_remind3") data='VALUE_remind3';
  else if (dropdown_pin == "varW_remind4") data='VALUE_remind4';
  
  var code = ''
  +''+ text +' '+ dropdown_pin +' = '+ num1 +';\n'
  +'myGizwits.write('+ data +', '+ dropdown_pin +');\n';
  return code;
};
/*循迹模块三路端口*/

/*循迹模块三路参数*/
Blockly.Arduino.CXSNX10_trackingIR_1 = function() {
  var dropdown_pin1 = this.getTitleValue('PIN1');
  var dropdown_pin2 = this.getTitleValue('PIN2');
  var dropdown_pin3 = this.getTitleValue('PIN3');
  var code = '(sensor[0] == ' + dropdown_pin1 + ') && (sensor[1] == ' + dropdown_pin2 + ') && (sensor[2] == ' + dropdown_pin3 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};