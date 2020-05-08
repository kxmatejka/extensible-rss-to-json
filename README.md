# Extensible rss to json

```
const parser = require('extensible-rss-to-json')
const parser = require('extensible-rss-to-json').forNode
import parser from 'extensible-rss-to-json'

const json = parser('<xml>...</xml>', {
    channelOptions: {
        
    },
    itemOptions: {
        
    }
})
```

- zero dependencies for web (based on DOMParser)
- full customizable

## Validation of feed

https://validator.w3.org/feed/
