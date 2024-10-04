__version__ = "Sentry2 v1.2.1m"
__author__ = "weiyanfengv@gmail.com"
__license__ = "http://unlicense.org"

import ustruct  # pylint: disable=import-error
from time import sleep_ms  # pylint: disable=no-name-in-module

SENTRY_FIRMWARE_VERSION = 0xFF

SENTRY_MAX_RESULT = 9

SENTRY_OK = 0x00
SENTRY_FAIL = 0x01
SENTRY_READ_TIMEOUT = 0x03
SENTRY_CHECK_ERROR = 0x04
SENTRY_UNSUPPORT_PARAM = 0x10
SENTRY_UNKNOWN_PROTOCOL = 0x11

# sentry_reg
kRegDeviceId = 0x01
kRegRestart = 0x03
kRegSensorConfig1 = 0x04
kRegLock = 0x05
kRegCameraConfig1 = 0x10
kRegCameraConfig2 = 0x11
kRegCameraConfig3 = 0x12
kRegCameraConfig4 = 0x13
kRegCameraConfig5 = 0x14
kRegFrameWidthH = 0x1B
kRegFrameWidthL = 0x1C
kRegFrameHeightH = 0x1D
kRegFrameHeightL = 0x1E
kRegFrameCount = 0x1F
kRegVisionId = 0x20
kRegVisionConfig1 = 0x21
kRegVisionConfig2 = 0x22
kRegParamNum = 0x23
kRegParamId = 0x24
kRegVisionStatus1 = 0x2A
kRegVisionStatus2 = 0x2B
kRegVisionDetect1 = 0x30
kRegVisionDetect2 = 0x31
kRegResultNumber = 0x34
kRegResultId = 0x35
kRegReadStatus1 = 0x36
kRegParamValue1H = 0x70
kRegParamValue1L = 0x71
kRegParamValue2H = 0x72
kRegParamValue2L = 0x73
kRegParamValue3H = 0x74
kRegParamValue3L = 0x75
kRegParamValue4H = 0x76
kRegParamValue4L = 0x77
kRegParamValue5H = 0x78
kRegParamValue5L = 0x79
kRegResultData1H = 0x80
kRegResultData1L = 0x81
kRegResultData2H = 0x82
kRegResultData2L = 0x83
kRegResultData3H = 0x84
kRegResultData3L = 0x85
kRegResultData4H = 0x86
kRegResultData4L = 0x87
kRegResultData5H = 0x88
kRegResultData5L = 0x89
kRegSn = 0xD0


# sentry_obj_info
class sentry_obj_info_e:
    kStatus = 1
    kXValue = 2
    kYValue = 3
    kWidthValue = 4
    kHeightValue = 5
    kLabel = 6
    kRValue = 7
    kGValue = 8
    kBValue = 9

# sentry_camera_white_balance
class sentry_camera_white_balance_e:
    kAutoWhiteBalance = 0
    kLockWhiteBalance = 1
    kWhiteLight = 2
    kYellowLight = 3
    kWhiteBalanceCalibrating = 4

# Sentry color label
class color_label_e:
    kColorBlack = 1
    kColorWhite = 2
    kColorRed = 3
    kColorGreen = 4
    kColorBlue = 5
    kColorYellow = 6

# Sentry2 vision
class sentry2_vision_e:
    kVisionColor = 1
    kVisionBlob = 2
    kVisionAprilTag = 3
    kVisionLine = 4
    kVisionLearning = 5
    kVisionCard = 6
    kVisionFace = 7
    kVision20Classes = 8
    kVisionQrCode = 9
    kVisionObjTrack = 10
    kVisionMotionDetect = 11
    kVisionCustom= 12
    kVisionMaxType = 13

# Sentry card label
class sentry2_card_label_e:
    kCardForward = 1
    kCardLeft = 2
    kCardRight = 3
    kCardTurnAround = 4
    kCardPark = 5
    kCardGreenLight = 6
    kCardRedLight = 7
    kCardSpeed40 = 8
    kCardSpeed60 = 9
    kCardSpeed80 = 10
    kCardCheck = 11
    kCardCross = 12
    kCardCircle = 13
    kCardSquare = 14
    kCardTriangle = 15
    kCardPlus = 16
    kCardMinus = 17
    kCardDivide = 18
    kCardEqual = 19
    kCardZero = 20
    kCardOne = 21
    kCardTwo = 22
    kCardThree = 23
    kCardFour = 24
    kCardFive = 25
    kCardSix = 26
    kCardSeven = 27
    kCardEight = 28
    kCardNine = 29

# SentryFactory 20 classes label
class class20_label_e:
    kAirplane = 1
    kBicycle = 2
    kBird = 3
    kBoat = 4
    kBottle = 5
    kBus = 6
    kCar = 7
    kCat = 8
    kChair = 9
    kCow = 10
    kTable = 11
    kDog = 12
    kHorse = 13
    kMotorBike = 14
    kPerson = 15
    kPlant = 16
    kSheep = 17
    kSofa = 18
    kTrain = 19
    kMonitor = 20



LOG_OFF = 60
LOG_CRITICAL = 50
LOG_ERROR = 40
LOG_WARNING = 30
LOG_INFO = 20
LOG_DEBUG = 10
LOG_NOTSET = 0

global __level__
class SentryLogger:
    global __level__
    __level__ = LOG_INFO
    _level_dict = {
        LOG_CRITICAL: "CRIT",
        LOG_ERROR: "ERROR",
        LOG_WARNING: "WARN",
        LOG_INFO: "INFO",
        LOG_DEBUG: "DEBUG",
    }

    def _level_str(self, level):
        l = self._level_dict.get(level)
        if l is not None:
            return l
        return "LVL%s" % level

    def setLevel(self, level):
        global __level__
        __level__ = level

    def isEnabledFor(self, level):
        global __level__
        return level >= __level__

    def log(self, name, level, msg, *args):
        if self.isEnabledFor(level):
            levelname = self._level_str(level)
            msgformat = ["%s.%s:" % (name, levelname)]
            len_arg = len(args)

            if type(msg) == type("str") and len_arg > 0:
                len_msg = msg.count('%')
                if len_msg >= len_arg and len_msg > 0:
                    msgformat.append(msg % args)
                else:
                    msgformat.append(msg)
                    msgformat += args
            else:
                msgformat.append(msg)
                msgformat += args

            print(*msgformat, sep=" ")


class result:
    result_data1 = 0
    result_data2 = 0
    result_data3 = 0
    result_data4 = 0
    result_data5 = 0
    bytestr = ""


class VisionState:
    def __init__(self, vision_type):
        self.vision_type = vision_type
        self.frame = 0
        self.detect = 0
        self.result = []

        for _ in range(SENTRY_MAX_RESULT):
            self.result.append(result())


class SentryI2CMethod:
    """

    """

    def __init__(self, address, communication_port, logger=None):
        self.__mu_address = address
        self.__communication_port = communication_port
        self.__logger = logger

        if address not in communication_port.scan():
            raise ValueError(
                "SentryI2CMethod Init Error!!! address %#x cannot found!" % address)

    def Logger(self, *arg):  # level, format, args
        if self.__logger:
            self.__logger(self.__class__.__name__, *arg)

    def Set(self, reg_address, value):
        data = ustruct.pack("<b", value)
        self.__communication_port.writeto_mem(
            self.__mu_address, reg_address, data)

        self.Logger(LOG_DEBUG, "set-> reg:%#x var:%#x",
                    reg_address, value)

        return SENTRY_OK

    def Get(self, reg_address):
        data = ustruct.pack("<b", reg_address)
        self.__communication_port.writeto(self.__mu_address, data)

        value = self.__communication_port.readfrom(
            self.__mu_address, 1)
        if value:
            self.Logger(LOG_DEBUG, "Get-> reg:%#x var:%#x",
                        reg_address, value[0])
            return (SENTRY_OK, value[0])
        else:
            self.Logger(LOG_ERROR, "Get-> reg:%#x TimeOut!",
                        reg_address)

            return (SENTRY_READ_TIMEOUT, 0)

    def __get_result_data(self, kRegResultDataL, kRegResultDataH):
        err, result_data_tmp1 = self.Get(kRegResultDataL)
        if err:
            return (err, 0)
        err, result_data_tmp2 = self.Get(kRegResultDataH)
        if err:
            return (err, 0)

        return (err, result_data_tmp2 << 8 | result_data_tmp1)

    def Read(self, vision_type, vision_state):
        err = self.Set(kRegVisionId, vision_type)
        if err:
            return (err, vision_state)

        err, vision_state.frame = self.Get(kRegFrameCount)
        if err:
            return (err, vision_state)

        err, vision_state.detect = self.Get(kRegResultNumber)
        if err:
            return (err, vision_state)

        if not vision_state.detect:
            return (SENTRY_OK, vision_state)

        vision_state.detect = SENTRY_MAX_RESULT if SENTRY_MAX_RESULT < vision_state.detect else vision_state.detect

        if sentry2_vision_e.kVisionQrCode == vision_type:
            vision_state.detect = 1

        for i in range(vision_state.detect):
            err = self.Set(kRegResultId, i+1)
            if err:
                return (err, vision_state)

            err, vision_state.result[i].data1 = self.__get_result_data(
                kRegResultData1L, kRegResultData1H)
            if err:
                return (err, vision_state)
            err, vision_state.result[i].data2 = self.__get_result_data(
                kRegResultData2L, kRegResultData2H)
            if err:
                return (err, vision_state)
            err, vision_state.result[i].data3 = self.__get_result_data(
                kRegResultData3L, kRegResultData3H)
            if err:
                return (err, vision_state)
            err, vision_state.result[i].data4 = self.__get_result_data(
                kRegResultData4L, kRegResultData4H)
            if err:
                return (err, vision_state)
            err, vision_state.result[i].data5 = self.__get_result_data(
                kRegResultData5L, kRegResultData5H)
            if err:
                return (err, vision_state)

            if sentry2_vision_e.kVisionQrCode == vision_type:
                vision_state.result[i].bytestr = ""
                for j in range(vision_state.result[i].data5):
                    result_id = int(j / 5 + 2)
                    offset = j % 5
                    if 0 == j % 5:
                        err = self.Set(kRegResultId, result_id)
                        if err:
                            return err, None

                    err, bytec = self.Get(kRegResultData1L + 2 * offset)
                    if err:
                        return err, vision_state
                    vision_state.result[i].bytestr += chr(bytec)

        return (SENTRY_OK, vision_state)

    def SetParam(self, vision_id, param, param_id):
        err = self.Set(kRegVisionId, vision_id)
        if err:
            return err

        err = self.Set(kRegParamId, param_id)
        if err:
            return err

        self.Set(kRegParamValue1H, param[0])
        self.Set(kRegParamValue1L, param[1])
        self.Set(kRegParamValue2H, param[2])
        self.Set(kRegParamValue2L, param[3])
        self.Set(kRegParamValue3H, param[4])
        self.Set(kRegParamValue3L, param[5])
        self.Set(kRegParamValue4H, param[6])
        self.Set(kRegParamValue4L, param[7])
        self.Set(kRegParamValue5H, param[8])
        self.Set(kRegParamValue5L, param[9])

        return SENTRY_OK

class SentryBase:
    """

    """

    def __init__(self,device_id, address=0x60, log_level=LOG_ERROR):
        self.__device_id = device_id
        self.__address = address
        self.__stream = None
        self.__img_w = 0
        self.__img_h = 0
        self.__debug = None
        self.__vision_states = [None]*SENTRY_MAX_RESULT

        self.SetDebug(log_level)

    def Logger(self, *arg):  # level, format, args
        if self.__logger:
            self.__logger(self.__class__.__name__, *arg)

    def SetDebug(self, log_level=LOG_OFF):
        if log_level < LOG_OFF:
            self.__debug = SentryLogger()
            self.__logger = self.__debug.log
            self.__debug.setLevel(log_level)
        else:
            if self.__debug:
                self.__debug.setLevel(LOG_OFF)

    def __SensorLockkReg(self, lock: bool):
        return self.__stream.Set(kRegLock, lock)

    def __SensorStartupCheck(self):
        err_count = 0
        while True:
            err_count += 1
            err, start_up = self.__stream.Get(kRegSensorConfig1)
            if err:
                self.Logger(LOG_ERROR, "SensorStartupCheck error:%d!"%err)
                return err

            if  start_up & 0x01:
                break

            sleep_ms(10)
            if err_count > 200:
                self.Logger(LOG_ERROR, "SensorStartupCheck error!")
                return SENTRY_UNKNOWN_PROTOCOL

        return SENTRY_OK
        
    def __ProtocolVersionCheck(self):
        err_count = 0
        while True:
            err_count += 1
            err, protocol_version = self.__stream.Get(kRegDeviceId)
            if (not err) and protocol_version == self.__device_id:
                break
            if err_count > 3:
                self.Logger(LOG_ERROR, "ProtocolVersionCheck error!")
                return SENTRY_UNKNOWN_PROTOCOL

        return err

    def GetImageShape(self):
        tmp = [0, 0]
        err, tmp[0] = self.__stream.Get(kRegFrameWidthL)
        if err:
            return err
        err, tmp[1] = self.__stream.Get(kRegFrameWidthH)
        if err:
            return err
        self.__img_w = tmp[1] << 8 | tmp[0]
        err, tmp[0] = self.__stream.Get(kRegFrameHeightL)
        if err:
            return err
        err, tmp[1] = self.__stream.Get(kRegFrameHeightH)
        if err:
            return err
        self.__img_h = tmp[1] << 8 | tmp[0]

        return SENTRY_OK

    def rows(self):
        return self.__img_h

    def cols(self):
        return self.__img_w

    def SensorInit(self):

        # Check sensor startup
        err = self.__SensorStartupCheck()
        if err:
            return err
        # Check sentry protocol version
        err = self.__ProtocolVersionCheck()
        if err:
            return err
        # Sensor set default if version is correction.
        err = self.SensorSetDefault()
        if err:
            return err
        # Get sensor image shape.
        err = self.GetImageShape()
        if err:
            return err

        return SENTRY_OK

    def begin(self, communication_port=None):
        if "I2C" == communication_port.__class__.__name__ or "MicroBitI2C" == communication_port.__class__.__name__:
            self.__stream = SentryI2CMethod(
                self.__address, communication_port, logger=self.__logger)
            self.Logger(LOG_INFO, "Begin I2C mode succeed!")
        elif communication_port == None:
            from machine import I2C, Pin  # pylint: disable=import-error
            communication_port = I2C(
                scl=Pin(Pin.P19), sda=Pin(Pin.P20), freq=400000)
            return self.begin(communication_port)

        else:
            return SENTRY_UNSUPPORT_PARAM

        if self.__stream:
            return self.SensorInit()

        return SENTRY_FAIL

    def VisionBegin(self, vision_type):
        err = self.VisionSetStatus(vision_type, True)
        if err:
            return err

        return SENTRY_OK

    def VisionEnd(self, vision_type):
        return self.VisionSetStatus(vision_type, False)

    def GetValue(self, vision_type, object_inf, obj_id=1):
        '''
         Note: when getting the vision status, if the block is true, it will wait until the vision_type result is updated   
        '''
        if object_inf == sentry_obj_info_e.kStatus:
            err = True
            while err:
                err = self.UpdateResult(vision_type)
                sleep_ms(10)  # pylint: disable=undefined-variable

        return self.__read(vision_type, object_inf, obj_id)

    def SetParamNum(self, vision_type, max_num):
        err = self.__stream.Set(kRegVisionId, vision_type)
        if err:
            return err

        err = self.__stream.Set(kRegParamNum, max_num)

        return err

    def SetParam(self, vision_type, param: list, param_id):
        if param_id < 0 or param_id >= SENTRY_MAX_RESULT:
            return SENTRY_FAIL

        params = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for i in range(min(len(param), 5)):
            params[i*2] = param[i] >> 8
            params[i*2+1] = param[i] & 0xff

        return self.__stream.SetParam(vision_type, params, param_id)

    def GetVisionState(self, vision_type):
        if vision_type >= sentry2_vision_e.kVisionMaxType:
            return 0

        return self.__vision_states[vision_type-1]

    def VisionSetStatus(self, vision_type, enable: bool):

        err = self.__stream.Set(kRegVisionId, vision_type)
        if err:
            return err

        err, vision_config_reg_value = self.__stream.Get(
            kRegVisionConfig1)
        if err:
            return err

        status = vision_config_reg_value & 0x01
        if status != enable:
            vision_config_reg_value &= 0xfe
            vision_config_reg_value |= enable & 0x01

            err = self.__stream.Set(
                kRegVisionConfig1, vision_config_reg_value)
            if err:
                return err

        if enable:
            self.__vision_states[vision_type-1] = VisionState(vision_type)

        else:
            self.__vision_states[vision_type-1] = None

    def VisionSetDefault(self, vision_type):

        err = self.__stream.Set(kRegVisionId, vision_type)
        if err:
            return err
        err, vision_config_reg_value = self.__stream.Get(
            kRegVisionConfig1)
        if err:
            return err

        vision_config_reg_value &= 0xfd
        vision_config_reg_value |= 0x01 << 1
        default_setting = (vision_config_reg_value >> 1) & 0x01
        err = self.__stream.Set(kRegVisionConfig1,
                                vision_config_reg_value)
        if err:
            return err

        while default_setting:

            sleep_ms(10)

            err, vision_config_reg_value = self.__stream.Get(
                kRegVisionConfig1)
            if err:
                return err
            default_setting = (vision_config_reg_value >> 1) & 0x01

        return SENTRY_OK

    def VisionGetStatus(self, vision_type):
        err = self.__stream.Set(kRegVisionId, vision_type)
        if err:
            return 0
 
        err, vision_status1 = self.__stream.Get(
            kRegVisionConfig1)

        if err:
            return 0

        return 0x01 & vision_status1

    def UpdateResult(self, vision_type):

        if vision_type >= sentry2_vision_e.kVisionMaxType:
            return 0

        vision_state = self.__vision_states[vision_type-1]

        err, frame = self.__stream.Get(kRegFrameCount)
        if err:
            return err

        if frame == vision_state.frame:
            return SENTRY_FAIL

        while SENTRY_OK != self.__SensorLockkReg(True):
            pass

        try:
            err, vision_state = self.__stream.Read(vision_type, vision_state)
        finally:
            while SENTRY_OK != self.__SensorLockkReg(False):
                pass

        self.__vision_states[vision_type-1] = vision_state

        if err:
            return err

        return SENTRY_OK

    def __read(self, vision_type, object_inf, obj_id):

        if vision_type >= sentry2_vision_e.kVisionMaxType:
            return 0

        vision_state = self.__vision_states[vision_type-1]
        if obj_id < 1 or obj_id >SENTRY_MAX_RESULT or vision_state == None :
            return 0

        obj_id -= 1

        if vision_state.detect <= obj_id:
            return 0

        if object_inf == sentry_obj_info_e.kStatus:
            return vision_state.detect
        elif object_inf == sentry_obj_info_e.kXValue:
            return vision_state.result[obj_id].data1
        elif object_inf == sentry_obj_info_e.kYValue:
            return vision_state.result[obj_id].data2
        elif object_inf == sentry_obj_info_e.kWidthValue:
            return vision_state.result[obj_id].data3
        elif object_inf == sentry_obj_info_e.kHeightValue:
            return vision_state.result[obj_id].data4
        elif object_inf == sentry_obj_info_e.kLabel:
            return vision_state.result[obj_id].data5
        elif object_inf == sentry_obj_info_e.kGValue:
            return vision_state.result[obj_id].data1
        elif object_inf == sentry_obj_info_e.kRValue:
            return vision_state.result[obj_id].data2
        elif object_inf == sentry_obj_info_e.kBValue:
            return vision_state.result[obj_id].data3
        else:
            return 0

    def GetQrCodeValue(self):
        vision_state = self.__vision_states[sentry2_vision_e.kVisionQrCode-1]
        if vision_state == None:
            return ""

        return vision_state.result[0].bytestr

    def SensorSetRestart(self):
        err = self.__stream.Set(kRegRestart, 1)
        if err:
            return err

        return SENTRY_OK

    def SensorSetDefault(self):
        err, sensor_config_reg_value = self.__stream.Get(kRegSensorConfig1)
        if err:
            return err

        sensor_config_reg_value |= 0x08

        err = self.__stream.Set(kRegSensorConfig1,
                                sensor_config_reg_value)
        while True:
            err, sensor_config_reg_value = self.__stream.Get(
                kRegSensorConfig1)
            if err:
                return err

            if not (sensor_config_reg_value & 0x08):
                self.Logger(LOG_INFO, "SensorSetDefault succeed!")
                break

        return err

    def CameraSetAwb(self, awb):

        err, camera_reg_value = self.__stream.Get(
            kRegCameraConfig1)
        if err:
            return err

        white_balance = (camera_reg_value >> 5) & 0x03

        if sentry_camera_white_balance_e.kLockWhiteBalance == awb:
            camera_reg_value &= 0x1f
            camera_reg_value |= (awb & 0x03) << 5
            err = self.__stream.Set(
                kRegCameraConfig1, camera_reg_value)
            if err:
                return err
            while (camera_reg_value >> 7) == 0:
                err, camera_reg_value = self.__stream.Get(
                    kRegCameraConfig1)
                if err:
                    return err

        elif white_balance != awb:
            camera_reg_value &= 0x1f
            camera_reg_value |= (awb & 0x03) << 5
            err = self.__stream.Set(
                kRegCameraConfig1, camera_reg_value)
            if err:
                return err

        return err


class Sentry2(SentryBase):
    SENTRY2_DEVICE_ID = 0x04
    def __init__(self, address=0x60, log_level=LOG_ERROR):
        super().__init__(self.SENTRY2_DEVICE_ID,address,log_level)