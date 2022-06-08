#ifndef WifiSerialBridge_h
#define WifiSerialBridge_h

#include "ReelTwo.h"
#include "core/SetupEvent.h"
#include "core/AnimatedEvent.h"
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>

/**
  * \ingroup wifi
  *
  * \class WifiSerialBridgeBase
  *
  * \brief Base template of automatic forwarder from i2c to CommandEvent
  *
  * Create an instance of this template to automatically forward i2c string commands to CommandEvent.
  * A convenience type of I2CReceiver is provided that uses the default buffer size of 32 bytes. Only
  * a single instance of I2CReceiver should be created per sketch.
  *
  * \code
  * #include "wifi/WifiSerialBridge.h"
  *
  * WifiSerialBridge wifiSerialBridge(2000);
  * \endcode
  *
  * To support more than one client (for example) use:
  *
  * \code
  * WifiSerialBridgeBase<2> wifiSerialBridge(2000);
  * \endcode
  *
  */
template<unsigned maxClients = 1>
class WifiSerialBridgeBase : public WiFiServer, public WifiAccess::Notify, public AnimatedEvent
{
public:
    WiFiClient fClients[maxClients];

    /** \brief Constructor
      *
      * Only a single instance of WifiSerialBridge should be created per sketch.
      *
      * \param port the port number of this service
      */
    WifiSerialBridgeBase(HardwareSerial& serial, WifiAccess &wifiAccess, uint16_t port = 2000) :
        WiFiServer(port),
        fSerial(serial)
    {
        wifiAccess.addNotify(this);
    }

    void setEnabled(bool enabled)
    {
        fEnabled = enabled;
    }

    bool enabled()
    {
        return fEnabled;
    }

    virtual void wifiConnected(WifiAccess& access) override
    {
        DEBUG_PRINTLN("WifiSerialBridgeBase.wifiConnected");
        if (!fStarted)
        {
            begin();
            fStarted = true;
        }
    }

    virtual void wifiDisconnected(WifiAccess& access) override
    {
        DEBUG_PRINTLN("WifiSerialBridgeBase.wifiDisconnected");
        for (unsigned i = 0; i < maxClients; i++)
        {
            if (fClients[i])
            {
                fClients[i].stop();
            }
        }
    }

    /**
      * Dispatch any received i2c event to CommandEvent
      */
    virtual void animate() override
    {
        unsigned i;
        if (!enabled())
            return;
        //check if there are any new clients
        if (hasClient())
        {
            for (i = 0; i < maxClients; i++)
            {
                //find free/disconnected spot
                if (!fClients[i] || !fClients[i].connected())
                {
                    if (fClients[i])
                        fClients[i].stop();
                    fClients[i] = available();
                    if (!fClients[i])
                        DEBUG_PRINTLN("available broken");
                    DEBUG_PRINT("New client: ");
                    DEBUG_PRINT(i); DEBUG_PRINT(' ');
                    DEBUG_PRINTLN(fClients[i].remoteIP());
                    break;
                }
            }
            if (i >= maxClients)
            {
                //no free/disconnected spot so reject
                available().stop();
            }
        }
        //check clients for data
        for (i = 0; i < maxClients; i++)
        {
            if (fClients[i] && fClients[i].connected())
            {
                if (fClients[i].available())
                {
                    //get data from the telnet client and push it to the UART
                    while (fClients[i].available())
                    {
                        char ch = fClients[i].read();
                        fClients[i].write(ch);
                        fSerial.write(ch);
                    }
                }
            }
            else
            {
                if (fClients[i])
                {
                    fClients[i].stop();
                }
            }
        }
    }

private:
    HardwareSerial& fSerial;
    bool fStarted = false;
    bool fEnabled = true;
};

/**
  * \ingroup wifi
  *
  * \class WifiSerialBridge
  *
  * \brief Default instantiation of automatic forwarder from wifi to Serial
  *
  * Default instantiation of WifiSerialBridgeBase with max clients of 1.
  *
  * \code
  * #include "wifi/WifiSerialBridge.h"
  *
  * WifiSerialBridge wifiSerialBridge(2000);
  * \endcode
  *
  */
typedef WifiSerialBridgeBase<> WifiSerialBridge;
#endif
