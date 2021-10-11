
Package meant for React Component Authors.

# Installation

```
  yarn add render-and-add-props
```

# Usage

```javascript
const { renderAndAddProps } = require('render-and-add-props');
// Or 
import { renderAndAddProps } from 'render-and-add-props';

const App = ({children}) => {
  return renderAndAddProps(children, { 
    'someMoreProps':  'Hau'
  })
}

```
