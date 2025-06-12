;(() => {
  var eventHandlers = {}

  var WebApp = {}
  var webAppInitData = ""
  var webAppInitDataUnsafe = {}

  function parseInitData() {
    var hash = window.location.hash.toString()
    var hashParams = {}
    hash = hash
      .substr(1)
      .split("&")
      .forEach((part) => {
        var param = part.split("=")
        if (param[0] && param[1]) {
          hashParams[decodeURIComponent(param[0])] = decodeURIComponent(param[1])
        }
      })

    webAppInitData = hashParams.tgWebAppData || ""
    try {
      webAppInitDataUnsafe = webAppInitData ? JSON.parse(atob(webAppInitData.split("&")[0])) : {}
    } catch (e) {
      webAppInitDataUnsafe = {}
    }
  }

  parseInitData()

  function onEvent(eventName, callback) {
    if (!eventHandlers[eventName]) {
      eventHandlers[eventName] = []
    }
    eventHandlers[eventName].push(callback)
  }

  function offEvent(eventName, callback) {
    if (eventHandlers[eventName]) {
      if (callback) {
        var index = eventHandlers[eventName].indexOf(callback)
        if (index > -1) {
          eventHandlers[eventName].splice(index, 1)
        }
      } else {
        eventHandlers[eventName] = []
      }
    }
  }

  function triggerEvent(eventName, eventData) {
    if (eventHandlers[eventName]) {
      eventHandlers[eventName].forEach((callback) => {
        callback(eventData)
      })
    }
  }

  var mainButtonHeight = 0

  WebApp = {
    initData: webAppInitData,
    initDataUnsafe: webAppInitDataUnsafe,

    ready: () => {
      triggerEvent("ready")
    },

    expand: () => {
      triggerEvent("expand")
    },

    close: () => {
      triggerEvent("close")
    },

    sendData: (data) => {
      if (typeof data !== "string") {
        data = JSON.stringify(data)
      }
      console.log("WebApp sendData:", data)
      triggerEvent("data_sent", { data: data })
    },

    MainButton: {
      text: "CONTINUE",
      color: "#2cab37",
      textColor: "#ffffff",
      isVisible: false,
      isActive: true,

      show: function () {
        this.isVisible = true
        mainButtonHeight = 48
        document.body.style.paddingBottom = mainButtonHeight + "px"
        triggerEvent("main_button_shown")
      },

      hide: function () {
        this.isVisible = false
        mainButtonHeight = 0
        document.body.style.paddingBottom = "0px"
        triggerEvent("main_button_hidden")
      },

      setText: function (text) {
        this.text = text
        triggerEvent("main_button_text_changed")
      },

      onClick: (callback) => {
        onEvent("main_button_pressed", callback)
      },

      offClick: (callback) => {
        offEvent("main_button_pressed", callback)
      },

      enable: function () {
        this.isActive = true
        triggerEvent("main_button_enabled")
      },

      disable: function () {
        this.isActive = false
        triggerEvent("main_button_disabled")
      },
    },

    BackButton: {
      isVisible: false,

      show: function () {
        this.isVisible = true
        triggerEvent("back_button_shown")
      },

      hide: function () {
        this.isVisible = false
        triggerEvent("back_button_hidden")
      },

      onClick: (callback) => {
        onEvent("back_button_pressed", callback)
      },

      offClick: (callback) => {
        offEvent("back_button_pressed", callback)
      },
    },

    HapticFeedback: {
      impactOccurred: (style) => {
        triggerEvent("haptic_impact", { style: style })
      },

      notificationOccurred: (type) => {
        triggerEvent("haptic_notification", { type: type })
      },

      selectionChanged: () => {
        triggerEvent("haptic_selection_changed")
      },
    },
  }

  window.Telegram = {
    WebApp: WebApp,
  }
})()
