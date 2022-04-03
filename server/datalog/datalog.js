const { createLogger, format, transports, level} = require('winston');
const path = require('path');
const filename = path.join('log','loghistory');
const book = createLogger({
    format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
      ),
      transports:[
        new transports.Console({
            level:'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.level} : ${info.message}`
                )
              )
            }),
        new transports.Console({
            level:'error',
            format: format.combine(
                    format.colorize(),
                    format.printf(
                      info => `${info.timestamp} ${info.level} : ${info.message}`
                    )
                  )
                }),
        new transports.File({
                filename,
                level:'info',
                    format: format.combine(
                    format.printf(
                        info => `${info.timestamp} ${info.level} : ${info.message}`
                        )
                    )
        }), 
    ]
})
module.exports = {book}; 