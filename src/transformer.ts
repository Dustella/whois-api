const consume = async (stream: ReadableStream) => {
    const reader = stream.getReader()
    while (!(await reader.read()).done) {
      /* NOOP */
    }
  }
  
  export const transform = async (source: Response) => {
    const keys = [] as string[]
    const values = [] as string[]
    const result = {
      icp: {
        register:'',
        mail:'',
        expires:''
      },
      whois:{
        code:'',
        name:'',
        type:'',
        time:''
      },
      dns:{
        ip:'',
      },
    }
    let tmpBuffer = ''
  
    const transfomer = new HTMLRewriter()

      .on('._chinaz-seo-newtc > div > span > .color-63', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.icp.register=(tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })

      .on('._chinaz-seo-newtc > div > span.mr50 > a > .color-63', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.icp.mail = (tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })

      .on('._chinaz-seo-newtc > div > span > a > .color-63', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.icp.expires = (tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })
      .on('._chinaz-seo-newtc > span.mr50 > i > a', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.whois.code = (tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })
      .on('._chinaz-seo-newtc > span#company > i ', {
        text(text) {
          tmpBuffer += text.text.trim()
          if (text.lastInTextNode) {
              result.whois.name = (tmpBuffer.trim().substring(0,tmpBuffer.indexOf('\r')))
              console.log(tmpBuffer)
            tmpBuffer = ''
          }
        },
      })
      .on('._chinaz-seo-newtc > span.mr50 > i ', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.whois.type = (tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })
      .on('._chinaz-seo-newtc > span > i ', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.whois.time = (tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })
      .on('._chinaz-seo-newinfo > div.pb5 > span.mr50 > i > a', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.dns.ip = (tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })
      
      // .on('._chinaz-seo-newtc', {
      //   text(text) {
      //     tmpBuffer += text.text
      //     if (text.lastInTextNode) {
      //       const value = tmpBuffer
      //       values.push(value.trim())
      //       tmpBuffer = ''
      //     }
      //   },
      // })
    await consume(transfomer.transform(source).body!)
    return result
  }