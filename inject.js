'use strict';

module.exports = function(acorn) {
  var tt = acorn.tokTypes;

  // modified version of parseObj from acorn/src/expression.js
  // with rest/spread code from https://github.com/babel/babylon/blob/master/src/parser/expression.js
  function parseObj(isPattern, refDestructuringErrors) {
    let node = this.startNode(), first = true, propHash = {}
    node.properties = []
    this.next()
    while (!this.eat(tt.braceR)) {
      if (!first) {
        this.expect(tt.comma)
        if (this.afterTrailingComma(tt.braceR)) break
      } else first = false

      let prop = this.startNode(), isGenerator, isAsync, startPos, startLoc
      if (this.options.ecmaVersion >= 6) {
        // code for spread is adapted from babylon parser
        if (this.type === tt.ellipsis) {
          prop = this.parseSpread()
          prop.type = isPattern ? "RestProperty" : "SpreadProperty"
          if (isPattern) prop.value = this.toAssignable(prop.argument, true)
          node.properties.push(prop)
          continue
        }

        prop.method = false
        prop.shorthand = false
        if (isPattern || refDestructuringErrors) {
          startPos = this.start
          startLoc = this.startLoc
        }
        if (!isPattern)
          isGenerator = this.eat(tt.star)
      }

      this.parsePropertyName(prop)
      if (!isPattern && this.options.ecmaVersion >= 8 && !isGenerator && !prop.computed &&
        prop.key.type === "Identifier" && prop.key.name === "async" && this.type !== tt.parenL &&
        this.type !== tt.colon && !this.canInsertSemicolon()) {
        isAsync = true
        this.parsePropertyName(prop, refDestructuringErrors)
      } else {
        isAsync = false
      }
      this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors)
      this.checkPropClash(prop, propHash)
      node.properties.push(this.finishNode(prop, "Property"))
    }
    return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression")
  }

  acorn.plugins.objectRestSpread = function objectRestSpreadPlugin() {
    acorn.Parser.prototype.parseObj = parseObj;
  };

  return acorn;
};
