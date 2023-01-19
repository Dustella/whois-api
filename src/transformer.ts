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
        company:"",
        type:'',
        time:''
      },
      dns:{
        ip:'',
      },
    }
    let tmpBuffer = ''
    let companyBuffer= ''
    let personBuffer = ''
  
    const transfomer = new HTMLRewriter()

      .on('._chinaz-seo-newtc > div > span.mr50:first-child > i.color-63', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.icp.register=(tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })

      .on('._chinaz-seo-newtc > div > span.mr50:nth-child(2) > a > i.color-63', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.icp.mail = (tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })

      .on('._chinaz-seo-newtc > div > span:nth-child(1) > a > .color-63', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.icp.expires = (tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })
      .on('._chinaz-seo-newtc > span.mr50 > i.color-2f87c1 > a', {
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
          personBuffer += text.text
          if (text.lastInTextNode) {
            console.log(text.text)
            result.whois.name = (personBuffer.trim())
  
            personBuffer = ''
          }
        },
      })      
      .on('._chinaz-seo-newtc > span#company > i > a ', {
        text(text) {
          companyBuffer += text.text
          if (text.lastInTextNode) {
            console.log(text.text)
            result.whois.company = (companyBuffer.trim())
  
            companyBuffer = ''
          }
        },
      })  
      .on('._chinaz-seo-newtc > span.mr50:nth-child(3) > i.color-63 ', {
        text(text) {
          tmpBuffer += text.text
          if (text.lastInTextNode) {
              result.whois.type = (tmpBuffer.trim())
  
            tmpBuffer = ''
          }
        },
      })
      .on('._chinaz-seo-newtc > span:nth-child(4) > i.color-63 ', {
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