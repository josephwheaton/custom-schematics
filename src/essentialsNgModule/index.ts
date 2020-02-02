import { chain, Rule, SchematicContext, Tree, externalSchematic, SchematicsException } from '@angular-devkit/schematics';
import { tsquery } from '@phenomnomnominal/tsquery';
import * as ts from 'typescript';
// import { Change } from '@schematics/angular'

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function essentialsNgModuleAdd(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      externalSchematic('@schematics/angular', 'module', _options),
      // debug(_options),
      essentialsNgModuleUpdate(_options)
    ])(tree, context);
  };
}

/*function debug(_options: any): Rule {
  console.log(`inside debug, in factory before executation: %o`, _options);
  return (tree: Tree, _context: SchematicContext) => {
    console.log(`Tree: %o`);
    console.log(`Context: %o`, _context);

    return tree;
  }
}*/

export function essentialsNgModuleUpdate(_options: any): Rule {
  console.log(`running essentialsNgModuleUpdate with _options: %o`, _options);

  return (tree: Tree, _context: SchematicContext) => {
    const basePath = `/src/app/testing`;

    let ast: ts.SourceFile;
    let { name } = _options;
    let fileSource: string | undefined;

    name = `${basePath}/${name}.module.ts`;

    // console.log(`Tree in current state: ${tree}`, tree);

    if (tree.exists(name)) {
      fileSource = tree.read(name)?.toString();
    } else throw new SchematicsException(`${name} not found in Tree`);

    if (typeof fileSource !== 'undefined' && fileSource.length > 0) {
      ast = tsquery.ast(fileSource);
    } else throw new SchematicsException(`${name} is empty`);

    console.log(`attempting selection`);
    let declarationsArrayNode = tsquery(ast, `Decorator Identifier[name=declarations], Identifier[name=declarations]`);
    console.log(declarationsArrayNode.pop());

    // ? Add a components array (get a handle on all components and insert into array, spread components into declarations)
    let componentsArray = tsquery(ast, `VariableDeclaration Identifier[name=components]`);
    console.log(`componentsArray: `)
    console.log(componentsArray);
    if (componentsArray.length === 0) {
      let toAdd = `
        const components = [

        ];'
      `;


    }

    return tree;
  };
}

function addComonentsArrayChange(context: any, tree: Tree): any {

}