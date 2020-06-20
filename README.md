# Spec-Builder


## Installation
```bash
npm install halva-spec-builder
```
## Use Module

  ```bash
  spec-builder -i /path/to/spec.json 
  ```
  
  ```bash
  spec-builder -i /path/to/spec.json -a 100 -b 1152921504606847000
  ```

  ```bash
  spec-builder -i /path/to/spec.json -a 100 -b 1152921504606847000 -m clip organ olive upper oak void inject side suit toilet stick narrow
  ```

  Or use a module TypeScript
  ```javascript
 import { SpecBuilder } from 'halva-spec-builder';

 SpecBuilder.CreateAccounts(100, 1000, 'path/to/spec.json', 'clip organ olive upper oak void inject side suit toilet stick narrow');

 //If there is no mnemonic phrase, it will be generated automatically
 SpecBuilder.CreateAccounts(100, 1000, 'path/to/spec.json');
  ```

## Script Commands

* `yarn test` -- Runs tests.
* `yarn typecheck` -- Checks TypeScript types for correctness. This is disabled during tests for performance reasons.
* `yarn lint` -- Runs linting.
* `yarn format` -- Reformats all of the `.ts` and `.tsx` files with Prettier.
* `yarn build` -- Regenerates `dist` folder that gets included into NPM module.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)