import { Logger } from 'cloudwatch-front-logger'
// import StackTrace from 'stacktrace-js'

const accessKeyId = 'AKIAU75IY2KUKRPHYI4M'
const secretAccessKey = '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'
const region = 'us-east-1'
const logGroupName = 'Test-FE'

export const initLogger = () => {
  const logger = new Logger(accessKeyId, secretAccessKey, region, logGroupName)
  // logger.mute()

  logger.install({
    messageFormatter(e, info = { type: 'unknow' }) {
      if (!e.message) {
        return null
      }

      try {
        const dataMessage = JSON.parse(e.message)

        return JSON.stringify({
          message: dataMessage.message,
          timestamp: new Date().getTime(),
          userAgent: window.navigator.userAgent,
          // stack,
          ...info,
        })
      } catch (e) {
        return null
      }
    },
  })
}
